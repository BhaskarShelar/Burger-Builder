import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from "./ContactData.module.css";
import axios from '../../../axiosOrder';
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading:false
    }
   
    orderHandler=(event) =>{
        event.preventDefault();
        console.log(this.props);
         this.setState({ loading: true });
         console.log('this is ingredtents',this.props.ingredtents);
        const order = {
            ingredients:this.props.ingredtents,
            price: this.props.price,
            customer: {
                name: 'bhaskar shelar',
                address: {
                    street: 'shelar road',
                    zipCode: 414101,
                    country: 'India'
                },
                email: 'test@test.com'
            },
            delivery: 'super fast'
        };
        axios.post('\orders.json', order).then(response => {
            this.setState({ loading: false });
        }).catch(error => {
            this.setState({ loading: false });
        });
    }

    render() {
        return (
            <div className={classes.ConatctData}>
                <h3>Enter your Contact Data</h3>
                <form>
                    <input type="email" className={classes.Input} name="email" placeholder='your Mail' />
                    <input type="text" className={classes.Input} name="street" placeholder='your street' />
                    <input type="text" className={classes.Input} name="postalCode" placeholder='your postalCode' />
                    <input type="text" className={classes.Input} name="name" placeholder='your Name' />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;