import React from 'react';
import {Image, Text, View, ListView, StyleSheet, TabBarIOS, ActivityIndicator, TouchableHighlight} from 'react-native';
import moment from 'moment';
import _ from 'lodash';
const authService = require('./AuthService');
const config = require('./config');
const width = '100%';
class PushPayload extends React.Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged:(r1, r2) => r1 != r2
        })

        this.state = {
            dataSource: ds.cloneWithRows([]),
            pushEvent: props.pushEvent
        }
    }

    componentDidMount(){
        this.fetchCommits();
    }

    fetchCommits(){
        authService.getAuthInfo((error, authInfo) => {
            var url = this.state.pushEvent.commits_url.replace('{/sha}', '')
            var options = {
                headers: authInfo.headers
            }
            fetch(url, options)
            .then(response => response.json())
            .then(responseData => {
                var commits = _.sortBy(responseData, 'updated_at');
                commits = commits.reverse();
                console.log(commits);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(commits),
                    showProgress: false
                })
            }).catch(error => {
                throw error
            })
        })
    }
    renderRow(rowData){
        return (
            <View style={styles.row}>
                <Text><Text style={styles.bold}>{rowData.sha.slice(0, 6)}</Text> - {rowData.commit.message}</Text> 
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Image 
                    source={{uri: this.state.pushEvent.owner.avatar_url}}
                    style={styles.avatar_url}
                />
                <Text style={{paddingTop: 10, alignSelf: 'center'}}>
                    Updated {moment(this.state.pushEvent.updated_at).fromNow()}
                </Text>
                 <ListView style={{paddingTop: 60}}
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
        paddingTop: 80
    },
    row: {
        flex: 1, 
        flexDirection: 'row',
        padding: 20,
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 14
    }
})

module.exports = PushPayload;