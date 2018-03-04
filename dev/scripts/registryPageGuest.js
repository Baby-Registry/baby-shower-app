import React from "react";

const RegistryGuest = (props) => {
    return (
        <div>
            <img src={props.data.imageURL} alt="" />
            <h2>{this.props.selection.title}</h2>
            <h3>{`Price: ${this.props.selection.currency_code} ${this.props.selection.price}`}</h3>
            <h3>{`Quantity: ${this.props.selection.quantity} remaining`}</h3>
            <a href={`${this.props.selection.url}`}>Link to Item</a>
        </div>
    )
}

export default RegistryGuest;