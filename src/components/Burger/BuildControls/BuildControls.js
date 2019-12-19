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
        {controls.map(ctr=>(
            <BuildControl key={ctr.label} label={ctr.label} />
        ))}
    </div>
);

export default buildControls;