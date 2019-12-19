import React from 'react';
import Aux from '../../hoc/Aus';
import Classes from './Layout.module.css';

const layout = (props) => (
    <Aux>
    <div>Toolbar,SideDrawer,Backdrop</div>
    <main className={Classes.Content}>
        {props.children}
    </main>
    </Aux>
);

export default layout;