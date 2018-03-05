import React from "react";
import variables from "./config.js";
import axios from "axios";
import Qs from 'qs';

class RegistryGuest extends React.Component {
    constructor() {
        super();
        this.state = {
            imgURL: ""
        }
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
                reqUrl: `${variables.apiURL}/listings/${this.props.selection.listing_id}/images`,
                params: {
                    api_key: `${variables.apiKey}`
                },
                xmlToJSON: false
            }
        }).then(({ data }) => {
            const results = data;
            this.setState({
                imageURL: data.results[0].url_fullxfull
            })
        })
    }
    render() {
        return(
            <React.Fragment>
                <img src={this.state.imageURL} alt="" />
                <h2>{this.props.selection.title}</h2>
                <h3>{`Price: ${this.props.selection.currency_code} ${this.props.selection.price}`}</h3>
                <h3>{`Quantity: ${this.props.selection.quantity} remaining`}</h3>
                <a href={`${this.props.selection.url}`}>Link to Item</a>
                {this.props.taken ?
                    <h3>Already Taken!</h3>
                    :
                    <button onClick={() => this.props.purchase(this.props.selection.listing_id)}>Purchase</button>
                }
            </React.Fragment>
        )
    }

}

export default RegistryGuest;