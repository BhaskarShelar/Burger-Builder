import React from 'react';
import Classes from './BuildControl.module.css';
import BuildControl from "./BuildControl/BuildControl";

const controls=[
    {label:'salad',type:'salad'},
    {label:'meat',type:'meat'},
    {label:'cheese',type:'cheese'},
    {label:'bacon',type:'bacon'}
];
const buildControls=(props) =>(
    <div className={Classes.BuildControls}> 
    <p>Current Price :<strong>{props.price.toFixed(2)}</strong> Rs</p>
        {controls.map(ctr=>(
            <BuildControl 
             key={ctr.label}n
             label={ctr.label} 
             added={() =>props.ingredientAdded(ctr.type)}
             remove ={()=>props.ingredientRemove((ctr.type))}
             disabled={props.disabled[ctr.type]}/>
        ))}
        <button  className={Classes.OrderButton}
        disabled={!props.purchasable} 
        onClick={props.ordered}
        >ORDER NOW</button>
    </div>
);


export default buildControls;