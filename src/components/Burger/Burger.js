import React from 'react';
import Classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger=(props) =>{
    return(
        <div className={Classes.Burger}>
            <BurgerIngredients type = "bread-top"/>
            <BurgerIngredients type = "cheese"/>
            <BurgerIngredients type = "meat"/>
            <BurgerIngredients type = "bacon"/>
            <BurgerIngredients type = "bread-bottom"/>
        </div>
    )
};

export default burger;  