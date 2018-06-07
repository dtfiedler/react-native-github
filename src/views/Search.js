import React from 'react';
import {TextInput, Text, View, ListView, StyleSheet, TabBarIOS, ActivityIndicator, TouchableHighlight} from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Octicons';
import AuthService from '../providers/AuthService';
import config from '../../config';

class Search extends React.Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged:(r1, r2) => r1 != r2
        })

        this.state = {
            dataSource: ds.cloneWithRows([]),
            showProgress: false,
            searchQuery: ''
        }

        //this.searchRepos = this.searchRepos.bind(this);
    }

    searchRepos(){
        this.setState({showProgress: true});
        AuthService.getAuthInfo((error, authInfo) => {
            var url = config.github.baseURL + '/search/repositories?q=' + encodeURIComponent(this.state.searchQuery)
            var options = {
                headers: authInfo.header
            }
            fetch(url, options)
            .then(response => response.json())
            .then(responseData => {
                var repositories = responseData.items;
                var repos = _.sortBy(repositories, 'stargazers_count');
                repos = repos.reverse();
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(repos),
                    repositories: repos
                })
            }).catch(error => {
                throw error
            }).finally(() => {
                this.setState({showProgress: false});
            })
        })
    }
    renderRow(rowData, sectionID, rowID){
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold'}}>{rowData.full_name}</Text>
                <View style={styles.row}> 
                    <View style={styles.repoCell}>
                        <Icon style={styles.repoCellIcon} name="star"/>
                        <Text style={styles.repoCellLabel}>{rowData.stargazers_count}</Text>
                    </View>
                    <View style={styles.repoCell}>
                        <Icon style={styles.repoCellIcon} name="repo-forked"/>
                        <Text style={styles.repoCellLabel}>{rowData.forks}</Text>
                    </View>
                    <View style={styles.repoCell}>
                        <Icon style={styles.repoCellIcon} name="issue-opened"/>
                        <Text style={styles.repoCellLabel}>{rowData.open_issues}</Text>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={{paddingTop:70, flex: 1}}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Search for repos..." 
                    onChangeText={(text) => this.setState({searchQuery: text})}
                    returnKeyType="search"
                    clearButtonMode='always'
                    onSubmitEditing={this.searchRepos.bind(this)}
                    autoCapitalize={false}
                />
                <Text style={{fontSize: 18, padding: 10, fontWeight: 'bold'}}>Results:</Text>
                { this.state.showProgress && <ActivityIndicator 
                    animating={this.state.showProgress}
                    size="large"
                    style={{paddingTop: 20}}/>
                }
                <ListView
                    contentInset={{
                        top: -75
                    }}
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
        padding: 20,
        paddingBottom: 10,
        borderColor: '#D7D7D7',
        borderBottomWidth: 1
    },
    row: {
        flex: 1, 
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        justifyContent: 'space-between'
    },
    repoCell: {
        width: 50,
        alignItems: 'center'
    },
    repoCellIcon: {
        height: 30,
        width: 30,
        textAlign: 'center',
    },
    repoCellLabel: {
        textAlign: 'center'
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 40,
        margin: 10,
        backgroundColor: 'white',
        height: 40,
        paddingLeft: 10,
        shadowColor: "#D7D7D7",
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 0,
        }
    }
})

module.exports = Search;