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
            guestArray:[]

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
        this.guestSelection = this.guestSelection.bind(this);
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
        })
        this.dataCall(this.state.search, this.state.categories, this.state.pageNumber);
    }

    handleCategory(e) {
        const newCategory = e.target.value;
        this.setState({
            [e.target.name]:newCategory
        })
        this.dataCall(this.state.search, this.state.categories, this.state.pageNumber);
    }

    lessResults () {
        const newPageNumber = this.state.pageNumber - 1;
        this.setState({
            pageNumber: newPageNumber
        });
        this.dataCall(this.state.search, this.state.categories, this.state.pageNumber);
    }

    moreResults() {
        const newPageNumber = this.state.pageNumber + 1;
        this.setState({
            pageNumber: newPageNumber
        });
        this.dataCall(this.state.search, this.state.categories, this.state.pageNumber);
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
                    limit: 5
                },
                xmlToJSON: false
            }
        }).then(({ data }) => {
            this.setState({
                searchResults: data.results
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
        const removeItemArray = Array.from(this.state.selectionArray);
        const filteredremoveArray = removeItemArray.filter((value) => {
            return value.listing_id !== index;
        })
        this.setState({
            selectionArray:filteredremoveArray
        })
    }
    
    saveRegistry () {
        const dbRef = firebase.database().ref(`/Users/${this.props.location.userId}/events/${this.props.location.eventId}/items`);
        const copySelectionArray = Array.from(this.state.selectionArray);

        //need to add USER ID and EVENT ID props to make dynamic
        //need to push items as originally empty objects

        dbRef.set(copySelectionArray);
    }

    // guestSelection() {
    //     const dbRef = firebase.database().ref(`/Users/${this.props.location.userId}/events/${this.props.location.eventId}/items`);
    //     const copySelectionArray = Array.from(this.state.selectionArray);

    //     dbRef.set();
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
                    limit: 5
                },
                xmlToJSON: false
            }
        }).then(({ data }) => {
            this.setState({
                searchResults:data.results
            })
        });

        const dbRef = firebase.database().ref(`/Users/${this.props.location.userId}/events/${this.props.location.eventId}/items`);
        const copySelectionArray = [];
        dbRef.on("value", (res) => {
            res.val().map((value) => {
                copySelectionArray.push(value);
            })
        console.log(copySelectionArray);
            //pulled data from database for guest - need to move it into state and map to screen
        })
    }

    render() {
        const hostOrNot = this.props.location.isHost;
        return (
                hostOrNot === true ?
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
                        <div>
                            {/* for host */}
                            {this.state.selectionArray.map((value) => {
                                return (
                                    <RegistryList selection={value} key={value.listing_id} remove={this.removefromRegistry} />
                                )
                            })}
                            <button onClick={this.saveRegistry}>Save</button>
                        </div>
                    </section>
            :
                    <div>
                        {/* for guest */}
                        {this.state.selectionArray.map((value) => {
                            return (
                                <RegistryList selection={value} key={value.listing_id} remove={this.removefromRegistry} />
                            )
                        })}
                        <button>Purchase</button>
                    </div>
                 )   
            }
}

export default RegistryPage;