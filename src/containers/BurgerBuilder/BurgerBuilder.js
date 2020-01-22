import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/AuxFolder/Aus";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Model/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axiosOrder";
import Spinner from "../../components/UI/Model/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
import * as actionType from "../../store/actions";

class BurgerBuilder extends Component {
  // constructor(props){
  //     super(props);
  //     this.state={...};
  // }
  state = {
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    // console.log(this.props);
    // axios.get('https://react-burger-56951.firebaseio.com/ingredtents.json')
    //     .then(response => {
    //         this.setState({ ingredtents: response.data });
    //         // console.log(this.state.ingredtents);
    //     })
    //     .catch(error => {
    //         this.setState({ error: true });
    //     });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  addIntgredientHandler = type => {
    const oldCount = this.state.ingredtents[type];
    const updateCount = oldCount + 1;
    const updatedIntegredients = {
      ...this.state.ingredtents
    };
    updatedIntegredients[type] = updateCount;
    const priceAddition = "";
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredtents: updatedIntegredients });
    this.updatePurchaseState(updatedIntegredients);
  };
  removeIntgredientHandler = type => {
    const oldCount = this.state.ingredtents[type];
    if (oldCount <= 0) return;
    const updateCount = oldCount - 1;
    const updatedIntegredients = {
      ...this.state.ingredtents
    };
    updatedIntegredients[type] = updateCount;
    const priceAddition = "";
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({ totalPrice: newPrice, ingredtents: updatedIntegredients });
    this.updatePurchaseState(updatedIntegredients);
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
    // const queryParam = [];
    // for (let i in this.state.ingredtents) {
    //   queryParam.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredtents[i])
    //   );
  };
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            totalPrice={this.props.price}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredtents={this.props.ings}
          totalPrice={this.props.price}
          purcaseCanceled={this.purchaseCancelHandler}
          purcaseContinue={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.ingredtents,
    price: state.totalPrice
  };
};
const mapDispatchToProps = disptach => {
  return {
    onIngredientAdded: ingName =>
      disptach({ type: actionType.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: ingName =>
      disptach({ type: actionType.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
