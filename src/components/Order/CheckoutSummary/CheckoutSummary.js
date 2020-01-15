import React from "react";
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.module.css';
import Button from '../../UI/Button/Button';
const checkoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1>we hope it teste well!</h1>
            <div style={{ width: "100%",  margin: "auto" }}>
                <Burger ingredients={props.ingredtents} />
            </div>
            <Button clicked={props.checkoutCancelled}
                btnType="Danger">CANCEL</Button>
            <Button clicked={props.checkoutContinued}
                btnType="Success">CONTINUE</Button>
        </div>
    )
}
export default checkoutSummary;