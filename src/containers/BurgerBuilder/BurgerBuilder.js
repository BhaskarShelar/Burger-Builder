import React, { Component } from "react";
import Aux from '../../hoc/AuxFolder/Aus';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Model/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrder';
import Spinner from '../../components/UI/Model/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props);
    //     this.state={...};
    // }
    state = {
        ingredtents: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false

    }
    componentDidMount() {
        console.log(this.props);
        axios.get('https://react-burger-56951.firebaseio.com/ingredtents.json')
            .then(response => {
                this.setState({ ingredtents: response.data });
                console.log(this.state.ingredtents);
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }


    addIntgredientHandler = (type) => {
        const oldCount = this.state.ingredtents[type];
        const updateCount = oldCount + 1;
        const updatedIntegredients = {
            ...this.state.ingredtents
        };
        updatedIntegredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredtents: updatedIntegredients });
        this.updatePurchaseState(updatedIntegredients);

    }
    removeIntgredientHandler = (type) => {

        const oldCount = this.state.ingredtents[type];
        if (oldCount <= 0)
            return;
        const updateCount = oldCount - 1;
        const updatedIntegredients = {
            ...this.state.ingredtents
        };
        updatedIntegredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({ totalPrice: newPrice, ingredtents: updatedIntegredients });
        this.updatePurchaseState(updatedIntegredients);

    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        
        const queryParam = [];
        for (let i in this.state.ingredtents) {
            queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredtents[i]));
        }
        queryParam.push('price='+this.state.totalPrice);
        const queryString = queryParam.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.state.ingredtents) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredtents} />
                    <BuildControls
                        ingredientAdded={this.addIntgredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        totalPrice={this.state.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredtents={this.state.ingredtents}
                totalPrice={this.state.totalPrice}
                purcaseCanceled={this.purchaseCancelHandler}
                purcaseContinue={this.purchaseContinueHandler} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}


export default withErrorHandler(BurgerBuilder, axios);