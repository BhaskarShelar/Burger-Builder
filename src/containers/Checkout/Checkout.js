import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'; 
import { Route } from 'react-router-dom';

class Checkout extends Component {
    state = {
        ingredtents:null,
        totalPrice:0
    }
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredtent = {};
        let price=0;
        
        for ( let param of query.entries() ) {
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredtent[param[0]] = +param[1];
            }
        }
        this.setState({ ingredtents: ingredtent ,totalPrice:price });
     
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
      
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredtents={this.state.ingredtents}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                    path={this.props.match.path + '/contact-data'}
                    render={() =>(<ContactData ingredtents={this.state.ingredtents} price={this.state.totalPrice}/>)}
                      /> 
            </div>
        )
    }
}

export default Checkout;