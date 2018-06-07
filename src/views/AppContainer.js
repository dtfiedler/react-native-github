import React from 'react';
import {Text, View, StyleSheet, TabBarIOS, NavigatorIOS } from 'react-native';
import Feed from './Feed';
import Search from './Search';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Settings from './Settings';

class AppContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab: "feed"
        }
    }
    componentDidMount(){
        //this.onLogout = this.onLogout.bind(this);
    }
    onLogout(){
        console.log('logging out');
        if (this.props.onLogout){
            this.props.onLogout();
        }
    }
    render() {
        return (           
            <TabBarIOS style={styles.container}>
                 <Icon.TabBarItemIOS
                    title="Feed"
                    selected={this.state.selectedTab == 'feed'}
                    onPress={() => this.setState({selectedTab: 'feed'})}
                    iconName="list"
                    >
                    <NavigatorIOS 
                        style={{flex: 1}}
                        initialRoute={{
                            component: Feed,
                            title: "Feed"
                        }}>
                    </NavigatorIOS>
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS                    
                    title="Search"
                    selected={this.state.selectedTab == 'search'}
                    onPress={() => this.setState({selectedTab: 'search'})}
                    iconName="search">
                    <NavigatorIOS 
                        style={{flex: 1}}
                        initialRoute={{
                            component: Search,
                            title: "Search"
                        }}>
                    </NavigatorIOS>
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    title="Settings"
                    selected={this.state.selectedTab == 'saved'}
                    onPress={() => this.setState({selectedTab: 'saved'})}
                    iconName="settings">
                    <Settings onLogout={this.onLogout.bind(this)}/>
                </Icon.TabBarItemIOS>
            </TabBarIOS>
        )
    }
}

var styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

module.exports = AppContainer;