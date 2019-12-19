import React,{ Component } from "react";
import Aux from '../../hoc/Aus';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component{
    
    // constructor(props){
    //     super(props);
    //     this.state={...};
    // }
    state={
        ingredtents:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        }
    }
    render(){
        return(
            <Aux>
                <Burger ingredtents ={this.state.ingredtents}/>
                <BuildControls />
            </Aux>
        );
    }
}


export default BurgerBuilder;