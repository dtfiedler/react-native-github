import React from 'react';
import {Text, View, StyleSheet, TabBarIOS, NavigatorIOS } from 'react-native';
import Feed from './Feed';

class AppContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab: "feed"
        }
    }
    render() {
        return (           
            <TabBarIOS style={styles.container}>
                 <TabBarIOS.Item
                    title="Feed"
                    selected={this.state.selectedTab == 'feed'}
                    onPress={() => this.setState({selectedTab: 'feed'})}>
                    <NavigatorIOS 
                        style={{flex: 1}}
                        initialRoute={{
                            component: Feed,
                            title: "Feed"
                        }}>
                    </NavigatorIOS>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Search"
                    selected={this.state.selectedTab == 'search'}
                    onPress={() => this.setState({selectedTab: 'search'})}>
                    <Text>Tab 1</Text>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Saved"
                    selected={this.state.selectedTab == 'saved'}
                    onPress={() => this.setState({selectedTab: 'saved'})}>
                    <Text>Tab 1</Text>
                </TabBarIOS.Item>
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