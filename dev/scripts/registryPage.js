import React from "react";
import axios from "axios";
import variables from "./config.js";
import Qs from 'qs';
import ProductCard from "./productCard.js";
import RegistryList from "./registryList.js";
import RegistryGuest from "./registryPageGuest.js";

class RegistryPage extends React.Component {
    constructor() {
        super();
        this.state = {
            search: "",
            categories:"",
            searchResults:[],
            imageResults:{},
            pageNumber:1,
            listingaddButton:false,
            selectionArray:[],
            keys:[]

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.moreResults = this.moreResults.bind(this);
        this.lessResults = this.lessResults.bind(this);
        this.addtoRegistry = this.addtoRegistry.bind(this);
        this.removefromRegistry = this.removefromRegistry.bind(this);
        this.saveRegistry = this.saveRegistry.bind(this);
        this.dataCall = this.dataCall.bind(this);
        this.purchaseItem = this.purchaseItem.bind(this);
        // this.savePurchases = this.savePurchases.bind(this);
        this.unpurchaseItem = this.unpurchaseItem.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const searchResults = this.state.search;
        this.setState({
            search:searchResults
        }, () => {
            this.dataCall(this.state.search, this.state.categories, this.state.pageNumber);
        });
    }

    handleCategory(e) {
        const newCategory = e.target.value;
        this.setState({
            categories:newCategory
        }, () => {
            this.dataCall(this.state.search, this.state.categories, this.state.pageNumber);
        });
    }

    lessResults () {
        const newPageNumber = this.state.pageNumber - 1;
        this.setState({
            pageNumber: newPageNumber
        }, () => {
            this.dataCall(this.state.search, this.state.categories, this.state.pageNumber);
        });
    }

    moreResults() {
        const newPageNumber = this.state.pageNumber + 1;
        this.setState({
            pageNumber: newPageNumber
        }, () => {
            this.dataCall(this.state.search, this.state.categories, this.state.pageNumber);
        });
    }

    dataCall(searchResults, categories, pageNumber) {
        axios({
            method: 'GET',
            url: 'http://proxy.hackeryou.com',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                reqUrl: `${variables.apiURL}/listings/active`,
                params: {
                    api_key: `${variables.apiKey}`,
                    tags: searchResults,
                    keywords: searchResults,
                    categories: categories,
                    page:pageNumber,
                    limit: 6
                },
                xmlToJSON: false
            }
        }).then(({ data }) => {
            this.setState({
                searchResults: data.results,
            })
        });
    }

    addtoRegistry (id) {
        const selectedItem = id;
        const cumulselectionArray = Array.from(this.state.selectionArray);
        cumulselectionArray.push(selectedItem);
        this.setState({
            selectionArray:cumulselectionArray
        })
    }

    removefromRegistry (index) {
        console.log(index);
        const removeItemArray = Array.from(this.state.selectionArray);
        const filteredremoveArray = removeItemArray.filter((value) => {
            return value.listing_id !== index;
        })
        this.setState({
            selectionArray:filteredremoveArray
        })

        const key = this.state.keys;
        const newKeys = Array.from(key);

        if(key.length > 0) {
            newKeys.splice(index, 1);
    
            this.setState({
                keys:newKeys
            })
        }
    
    }
    
    saveRegistry () {
        const dbRef = firebase.database().ref(`/Users/6uJ8PI3dsqPcqRgK3h6ZJ93Z2D02/events/-L6ruERZmSa7MbPjSGUJ/items`);
        const copySelectionArray = Array.from(this.state.selectionArray);
        const newKeys = this.state.keys;
        
        const keysArray = copySelectionArray.map((value) => {
            return value.listing_id;
        }); 

        this.setState({
            keys:keysArray,
            selectionArray:copySelectionArray
        })

        dbRef.remove();
        //pushing selected items into firebase, but the unique ID is custom (listing ID)
        for(let i = 0; i < keysArray.length ; i = i + 1) {
            dbRef.child(keysArray[i]).set(copySelectionArray[i]);
            dbRef.child(keysArray[i]).update({"purchase":false});
        }
    }

    purchaseItem(index) {
        const dbRef = firebase.database().ref(`/Users/6uJ8PI3dsqPcqRgK3h6ZJ93Z2D02/events/-L6ruERZmSa7MbPjSGUJ/items/${index}`); 
        dbRef.update({"purchase":true});
    }


    unpurchaseItem(index) {
        const dbRef = firebase.database().ref(`/Users/6uJ8PI3dsqPcqRgK3h6ZJ93Z2D02/events/-L6ruERZmSa7MbPjSGUJ/items/${index}`);
        dbRef.update({ "purchase": false });
    }

    // savePurchases () {
    //     console.log("hello");
    //     dbRef.on("value", (res) => {
    //         console.log(res.val());
    //         const results = res.val();

    //         for (let key in results) {
    //             copySelectionArray.push(results[key]);
    //         }

    //         this.setState({
    //             selectionArray: copySelectionArray
    //         })
    //     })
    // }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://proxy.hackeryou.com',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                reqUrl: `${variables.apiURL}/listings/active`,
                params: {
                    api_key: `${variables.apiKey}`,
                    limit: 6
                },
                xmlToJSON: false
            }
        }).then(({ data }) => {
            this.setState({
                searchResults:data.results
            })
        });


        const dbRef = firebase.database().ref(`/Users/6uJ8PI3dsqPcqRgK3h6ZJ93Z2D02/events/-L6ruERZmSa7MbPjSGUJ/items`);
        dbRef.on("value", (res) => {
            const copySelectionArray = [];
            console.log(res.val());
            const results = res.val();
            
            for(let key in results) {
                copySelectionArray.push(results[key]);
            }
            console.log(`here is the copySelectionArray: ${copySelectionArray}`);
            this.setState({
                selectionArray:copySelectionArray
            })
            console.log(`here is the selectionArray: ${this.state.selectionArray}`);
        })
    }

    render() {
        const host = this.props.location.isHost;
        return ( 
            <div>  

                {true ?
                    <section>
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="search">Search</label>
                            <input type="text" id="search" value={this.state.search} onChange={this.handleChange} />
                            <input type="submit" value="submit" />
                        </form>
                        <form>
                            <label htmlFor="accessories">Accessories</label>
                            <input type="radio" name="categories" id="accessories" value="accessories" onChange={this.handleCategory} checked={this.state.categories === "accessories"}/>

                            <label htmlFor="bath_and_beauty">Bath and Beauty</label>
                            <input type="radio" name="categories" id="bath_and_beauty" value="bath_and_beauty" onChange={this.handleCategory} checked={this.state.categories === "bath_and_beauty"}/>

                            <label htmlFor="children">Children</label>
                            <input type="radio" name="categories" id="children" value="children" onChange={this.handleCategory} checked={this.state.categories === "children"}/>

                            <label htmlFor="clothing">Clothing</label>
                            <input type="radio" name="categories" id="clothing" value="clothing" onChange={this.handleCategory} checked={this.state.categories === "clothing"}/>

                            <label htmlFor="dolls_and_miniatures">Dolls and Miniatures</label>
                            <input type="radio" name="categories" id="dolls_and_miniatures" value="dolls_and_miniatures" onChange={this.handleCategory} checked={this.state.categories === "dolls_and_miniatures"}/>

                            <label htmlFor="everything_else">Miscellaneous</label>
                            <input type="radio" name="categories" id="everything_else" value="everything_else" onChange={this.handleCategory} checked={this.state.categories === "everything_else"}/>

                            <label htmlFor="patterns">Patterns</label>
                            <input type="radio" name="categories" id="patterns" value="patterns" onChange={this.handleCategory} checked={this.state.categories === "patterns"}/>

                            <label htmlFor="quilts">Quilts</label>
                            <input type="radio" name="categories" id="quilts" value="quilts" onChange={this.handleCategory} checked={this.state.categories === "quilts"}/>

                            <label htmlFor="toys">Toys</label>
                            <input type="radio" name="categories" id="toys" value="toys" onChange={this.handleCategory} checked={this.state.categories === "toys"}/>
                        </form>
                        <div>
                            {this.state.pageNumber >= 2
                                ?
                                <div>
                                    <button onClick={this.lessResults}>Back</button>
                                    <button onClick={this.moreResults}>Next</button>
                                </div>
                                :
                                <button onClick={this.moreResults}>Next</button>}
                        </div>
                        <div>
                            {this.state.searchResults.map((value) => {
                                return <ProductCard data={value} key={value.listing_id} add={this.addtoRegistry}/>
                            })}
                        </div>
                        <div className="SelectedItems">
                            {this.state.selectionArray.map((value) => {
                                return (
                                    <RegistryList selection={value} key={value.listing_id} remove={this.removefromRegistry}/>
                                )
                            })}
                            <button onClick={this.saveRegistry}>Save</button>
                        </div>
                    </section>
                
                :
                
                    <div>
                        <React.Fragment>
                            {this.state.selectionArray.map((value) => {
                                return (
                                    <RegistryGuest selection={value} key={value.listing_id} purchase={this.purchaseItem} taken={value.purchase} unpurchase={this.unpurchaseItem}/>
                                )
                            })}
                            {/* <button onClick={this.savePurchases}>Save Purchases</button> */}
                        </React.Fragment>
                    </div>
                }
            </div> 
            )   
        }
}

export default RegistryPage;