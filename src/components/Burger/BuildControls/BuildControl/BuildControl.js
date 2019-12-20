import React from 'react';
import Classes from './BuildControl.module.css';

const buildControl=(props) =>(
    <div className={Classes.BuildControl}> 
        <div className={Classes.Label}>{props.label}</div>
        <button className={Classes.Less} onClick={props.remove}
        disabled={props.disabled} >Less</button>
        <button className={Classes.More} onClick={props.added} 
        >More</button>
    </div>
);

export default buildControl;