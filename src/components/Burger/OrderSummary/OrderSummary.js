import React from 'react';
import Aux from '../../../hoc/Aus';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSumamry = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span> :
                    {props.ingredients[igKey]}
            </li>;
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSumamry}
            </ul>
            <p><strong> Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout </p>
            <Button btnType="Danger" clicked={props.purcaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purcaseContinue}>CONTINUE</Button>
        </Aux>
    )

};
export default orderSummary;