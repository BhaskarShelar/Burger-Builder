import React from 'react';
import Classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredtents)
        .map(igKey => {
            return [...Array(props.ingredtents[igKey])]
                .map((_, i) => {
                 return  <BurgerIngredients key={igKey + i} type={igKey} />
                });
        })
        .reduce((arr,el)=>{
             return arr.concat(el)
            },[]);
 
        if(transformedIngredients.length==0)
        {
            transformedIngredients=<p>Please start adding ingrerdients</p>
        }
        console.log(transformedIngredients);

    return (
        <div className={Classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    )
};

export default burger;  