import React, { Component } from "react";
import Aux from '../../hoc/Aus';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Model/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
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
        ingredtents: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable:false,
        purchasing:false
        
    }
    updatePurchaseState(ingredients){
         
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });

        console.log(this.state.purchasable);
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
        if(oldCount<=0)
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
    render() {
        const disableInfo={...this.state.ingredtents};
        for(let key in disableInfo)
        {
            disableInfo[key]=disableInfo[key]<=0;
        }
        return (
            <Aux>

                <Modal show={this.state.purchasing}> 
                    <OrderSummary ingredients={this.state.ingredtents}/>
                </Modal>
                <Burger ingredtents={this.state.ingredtents} />
                <BuildControls 
                 ingredientAdded={this.addIntgredientHandler}  
                 ingredientRemove={this.removeIntgredientHandler}
                 disabled={disableInfo}
                 purchasable={this.state.purchasable}
                 ordered={this.purchaseHandler}
                 price={this.state.totalPrice}/>
            </Aux>
        );
    }
}


export default BurgerBuilder;