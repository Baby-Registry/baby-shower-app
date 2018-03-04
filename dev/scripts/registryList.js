import React from "react";
import variables from "./config.js";
import axios from "axios";
import Qs from 'qs';

class RegistryList extends React.Component {
    constructor() {
        super();
        this.state = {
            imgURL:""
        }
    }
    componentDidMount () {
        axios({
            method: 'GET',
            url: 'http://proxy.hackeryou.com',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                reqUrl: `${variables.apiURL}/listings/${this.props.selection.listing_id}/images`,
                params: {
                    api_key: `${variables.apiKey}`
                },
                xmlToJSON: false
            }
        }).then(({ data }) => {
            const results = data;
            this.setState({
                imageURL:data.results[0].url_fullxfull
            })
        })
    }
    render () {
        return (
            <div>
                <img src={this.state.imageURL} alt="" />
                <h2>{this.props.selection.title}</h2>
                <h3>{`Price: ${this.props.selection.currency_code} ${this.props.selection.price}`}</h3>
                <h3>{`Quantity: ${this.props.selection.quantity} remaining`}</h3>
                <a href={`${this.props.selection.url}`}>Link to Item</a>
                <button onClick={() => this.props.remove(this.props.selection.listing_id)}>Remove Item</button>
            </div>
        )
    }
}

export default RegistryList;