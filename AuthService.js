import fetch from 'node-fetch';
import buffer from 'buffer';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';

const authKey = 'auth';
const userKey = 'user';

class AuthService {
    getAuthInfo(callback){
        AsyncStorage.multiGet([authKey, userKey], (error, value) => {
            if (error){
                return callback(error)
            }
            if(!value){
                return callback()
            }
            var zippedObj = _.fromPairs(value);
            if(!zippedObj[authKey]){
                return callback();
            }
            var authInfo = {
                header: {
                   'Authorization': 'Basic ' + zippedObj[authKey]
                },
                user: JSON.parse(zippedObj[userKey])
            }
            return callback(null, authInfo);
        })
    }
    login(credentials, callback){
        var b = new buffer.Buffer(`${credentials.username}:${credentials.password}`);
        var encodedAuth = b.toString('base64');
        var options = {
            headers: {
                'Authorization': 'Basic ' + encodedAuth
            }
        }
        fetch('https://api.github.com/user', options)
            .then(response => {
                if (response.status >= 200 && response.status <= 300){
                    return response.json();
                }
            
                throw {
                    badCredentials: response.status == 401,
                    unknownError: response.status != 401
                }
            })
            .then(json => {
                var jsonString = JSON.stringify(json);
                AsyncStorage.multiSet([
                    [authKey, encodedAuth],
                    [userKey, jsonString]
                ], (error) => {
                    if (error){
                        throw error
                    }
                    return callback({success: true});
                })
            })
            .catch(error => {
                console.log("Error:", error)
                return callback(error);
            })
    }
}

module.exports = new AuthService;