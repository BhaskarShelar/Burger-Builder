import React, { Component } from 'react';
import Aux from '../../../hoc/AuxFolder/Aus';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    componentWillUpdate(){
        console.log("order Summary WIll update");
    }    
    render() {
    const ingredientSumamry = Object.keys(this.props.ingredients)
    .map(igKey => {
        return <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span> :
                {this.props.ingredients[igKey]}
        </li>;
    });     
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSumamry}
                </ul>
                <p><strong> Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout </p>
                <Button btnType="Danger" clicked={this.props.purcaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purcaseContinue}>CONTINUE</Button>
            </Aux>
        )
    }
}  
 
export default OrderSummary;