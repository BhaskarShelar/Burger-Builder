import React, { Component } from 'react';
import Aux from '../../hoc/Aus';
import Classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: true
    }
    sideDrawerClosed = () => {
        this.setState({ showSideDrawer: false });
    }

    render() {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosed} />
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
export default Layout;