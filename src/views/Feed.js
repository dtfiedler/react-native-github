import React from 'react';
import {Image, Text, View, ListView, StyleSheet, TabBarIOS, ActivityIndicator, TouchableHighlight} from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import PushPayload from './PushPayload';
import AuthService from '../providers/AuthService';
import config from '../../config';

class Feed extends React.Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged:(r1, r2) => r1 != r2
        })

        this.state = {
            dataSource: ds.cloneWithRows([]),
            showProgress: true
        }
    }

    componentDidMount(){
        this.fetchFeed();
    }

    fetchFeed(){
        AuthService.getAuthInfo((error, authInfo) => {
            var url = config.github.baseURL + '/users/' + authInfo.user.login+ '/repos'
            var options = {
                headers: authInfo.header
            }
            fetch(url, options)
            .then(response => response.json())
            .then(responseData => {
                var feedItems = _.sortBy(responseData, 'updated_at');
                feedItems = feedItems.reverse();
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(feedItems),
                    showProgress: false
                })
            }).catch(error => {
                throw error
            })
        })
    }
    pressRow(rowData){
        this.props.navigator.push({
            title: "Details",
            component: PushPayload,
            passProps: {
                pushEvent: rowData
            }
        })
    }
    renderRow(rowData, sectionID, rowID){
        return (
            <TouchableHighlight underlayColor="#D7D7D7"
                onPress={() => this.pressRow(rowData)}>
            <View style={styles.row}>   
                <Image
                    style={styles.avatar}
                    source={{uri: rowData.owner.avatar_url}}
                />
                <View style={{padding: 20}}>
                    <Text style={{fontWeight: 'bold'}}>{rowData.name}</Text>
                    <Text>{rowData.full_name}</Text>
                    <Text>Updated {moment(rowData.updated_at).fromNow()}</Text>
                </View>
            </View>
            </TouchableHighlight>
        )
    }
    render() {
        if (this.state.showProgress){
            return (
                <View style={styles.loader}>
                <ActivityIndicator 
                    animating={true}
                    size="large"
                    />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1, 
        paddingTop: 60
    },
    row: {
        flex: 1, 
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'contain'
    }
})

module.exports = Feed;