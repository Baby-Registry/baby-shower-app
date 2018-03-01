import React from "react";
import axios from "axios";
import variables from "./config.js";
import Qs from 'qs';
import ProductCard from "./productCard.js";

class Data extends React.Component {
    constructor() {
        super();
        this.state = {
            search: "",
            categories:"",
            searchResults:[],
            imageResults:{},
            pageNumber:1
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.moreResults = this.moreResults.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        const searchInput = this.state.search;
        this.setState({
            categories: searchInput
        })

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
                    tags: searchInput,
                    keywords: searchInput,
                    category: searchInput,
                    limit: 9,
                    page: this.state.pageNumber
                },
                proxyHeaders: {
                    'header_params': 'value'
                },
                xmlToJSON: false
            }
        }).then(({ data }) => {
            this.setState({
                searchResults: data.results
            })
        });
    }
    handleCategory(e) {
        // console.log(e.target.value);
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    moreResults() {
        this.setState({
            pageNumber: this.state.pageNumber + 1
        })
    }
    
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
                    tags: this.state.search,
                    keywords: this.state.search,
                    category: this.state.categories,
                    limit:9,
                    page: this.state.pageNumber
                },
                proxyHeaders: {
                    'header_params': 'value'
                },
                xmlToJSON: false
            }
        }).then(({ data }) => {
            this.setState({
                searchResults:data.results
            })
        });
    }

    render() {
        return (
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
                    {this.state.searchResults.map((value) => {
                        return <ProductCard data={value} key={value.listing_id}/>
                    })}
                </div>
                <button onClick={this.moreResults}>More Results</button>
            </section>
        )
    }
}

export default Data;