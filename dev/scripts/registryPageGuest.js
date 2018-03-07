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
            url: 'https://proxy.hackeryou.com',
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
                imageURL: data.results[0].url_170x135
            })
        })
    }
    render() {
        return(
            <div className="guestCard">
                <React.Fragment>
                    <div className="guestCardImage">
                        <img src={this.state.imageURL} alt="" />
                    </div>
                    <div className="guestCardDesc">
                        <h3>{this.props.selection.title}</h3>
                        <h4>{`Price: ${this.props.selection.currency_code} ${this.props.selection.price}`}</h4>
                        <h4>{`Quantity: ${this.props.selection.quantity} remaining`}</h4>
                        <a href={`${this.props.selection.url}`}>Link to Item</a>
                        {this.props.taken ?
                            <React.Fragment>
                                <h3 className="beenPurchased">Already Taken!</h3>
                                <button onClick={() => this.props.unpurchase(this.props.selection.listing_id)}>Remove from Purchase List</button>
                            </React.Fragment>
                            :
                            <button onClick={() => this.props.purchase(this.props.selection.listing_id)}>Add to Purchase List</button>
                        }
                    </div>
                </React.Fragment>
            </div>
        )
    }

}

export default RegistryGuest;