/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 *  */
import React, { useState, useEffect } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    TextInput,
    Image,
    StatusBar,
    Text
} from 'react-native';


import { Button } from 'react-native-elements';
import RNFetchBlob from "rn-fetch-blob";
import '../../config/global.js'

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Dimensions } from 'react-native';


let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

global.w = screenWidth;
global.h = screenHeight;

global.c = global.w / 411.3;

global.ws = global.w / 411;
global.hs = global.h / 748;


const App = (props) => {


    const [user, SetUserName] = useState('');
    const [pass, SetPassword] = useState('');


    const [userStatus, SetUserStatue] = useState('');
    const [passStatus, SetPassStatue] = useState('');

    const [loginErr, SetLoginErr] = useState(true);

    useEffect(() => {
        var RNFS = require('react-native-fs');
        console.log(">>>> reading");
        var path = RNFS.DocumentDirectoryPath + '/test.txt';
        RNFetchBlob.fs.readFile(path, 'utf8')
        .then(function (res) {
        // handle the data ..
            res = JSON.parse(res);
            SetUserName(res.email);
            SetPassword(res.password);
            pre_login(props, res.email, res.password);
        })

    }, []);
    function pre_login(props, email, password) {

        const data = {
            "email": email,
            "password": password
        }
        RNFetchBlob.config({
            trusty: true
        }).fetch('POST', global.host + '/api/login', {
            'Content-Type': 'application/json',
            'Transfer-Encoding': 'Chunked'
        }, JSON.stringify(data))
            .then(res => res.json())
            .then(function (res) {

                global.UserId = res.id;
                global.UserCreatedAt = res.user.created_at;
                global.UserEmail = res.user.email;
                global.VerifyEmail = res.user.email_verified_at;
                global.UserName = res.user.name;
                global.EeName = res.user.name_en;
                global.PlayNo = res.user.player_no;
                global.UserStatus = res.user.status;
                global.UserUpdatedAt = res.user.updated_at;
                global.Pincode = res.pincode;
                global.SkipSMS = res.skip_sms;
                global.Token = res.token;
                global.AssToken = res.access_token; //+ "| used";
                props.navigation.navigate('Main', { selMenu: 'Media' });
            })
            .catch((errorMessage, statusCode) => {
            })

    }
    function login(props) {


        const data = {
            "email": user,
            "password": pass
        }
        RNFetchBlob.config({
            trusty: true
        }).fetch('POST', global.host + '/api/login', {
            'Content-Type': 'application/json',
            'Transfer-Encoding': 'Chunked'
        }, JSON.stringify(data))
            .then(res => res.json())
            .then(function (res) {

                var RNFS = require('react-native-fs');
 
                // create a path you want to write to
                // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
                // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
                var path = RNFS.DocumentDirectoryPath + '/test.txt';
                
                // write the file
                RNFS.writeFile(path, JSON.stringify(data), 'utf8')
                .then((success) => {
                    console.log('FILE WRITTEN!');
                })
                .catch((err) => {
                    console.log(err.message);
                });
                
                global.UserId = res.id;
                global.UserCreatedAt = res.user.created_at;
                global.UserEmail = res.user.email;
                global.VerifyEmail = res.user.email_verified_at;
                global.UserName = res.user.name;
                global.EeName = res.user.name_en;
                global.PlayNo = res.user.player_no;
                global.UserStatus = res.user.status;
                global.UserUpdatedAt = res.user.updated_at;
                global.Pincode = res.pincode;
                global.SkipSMS = res.skip_sms;
                global.Token = res.token;
                global.AssToken = res.access_token;
                props.navigation.navigate('Main', { selMenu: 'Media' });
            })
            .catch((errorMessage, statusCode) => {
                SetLoginErr(false);
            })

    }

    function onSetUserName(text) {

        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (text.length == 0) {
            SetUserStatue('identityは必須項目です');
        } else if (!pattern.test(text)) {
            SetUserStatue('identityは有効なメールアドレスではありません');
        } else {
            SetUserStatue('');
        }
        SetLoginErr(true);
        SetUserName(text);
    }

    function onSetPassword(text) {

        if (text.length == 0) {

            SetPassStatue('passwordは必須項目です');

        } else if (text.length != 8) {

            SetPassStatue('passwordは8文字以上でなければなりません');

        } else {
            SetPassStatue('');
        }

        SetPassword(text);
        SetLoginErr(true);
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            {
                loginErr === false ?
                    <View style={{ position: "absolute", zIndex: 99999, justifyContent: "center", flex: 1, borderWidth: 1, backgroundColor: "#EA1B23", height: 40 }}>
                        <Text style={{ marginLeft: 10, fontSize: 16, color: "#FFF", width: global.w }}>メールアドレスまたはパスワードが無効です</Text>
                    </View>
                    :
                    <View></View>
            }
            <SafeAreaView>
                <ScrollView style={styles.scrollView} contentInsetAdjustmentBehavior="automatic">

                    <View style={styles.body}>

                        <Image style={styles.logImg} source={require('../../img/furoshiki-logo.png')} />

                        <TextInput style={styles.inputTxt}
                            underlineColorAndroid="transparent"
                            placeholder={global.LoginEmail[global.Lang]}
                            placeholderTextColor="#FFF"
                            onChangeText={(text) => onSetUserName(text)}
                            value={user}
                            autoCapitalize="none" />

                        <Text style={{ color: "#FF0000", fontSize: 14, marginTop: 5, width: (global.w - 50) * global.hs }}>{userStatus}</Text>

                        <TextInput style={styles.inputTxt}
                            underlineColorAndroid="transparent"
                            placeholder={global.LoginPass[global.Lang]}
                            placeholderTextColor="#FFF"
                            secureTextEntry={true}
                            onChangeText={(text) => onSetPassword(text)}
                            value={pass}
                            autoCapitalize="none" />

                        <Text style={{ color: "#FF0000", fontSize: 14, marginTop: 5, width: (global.w - 50) * global.hs }}>{passStatus}</Text>

                        <View style={styles.loginBtn}>
                            <Button
                                title={global.LoginBtn[global.Lang]}
                                color="red"
                                titleStyle={{ fontSize: 20 * global.hs }}
                                buttonStyle={{ height: 52 * global.hs, backgroundColor: '#EA1B23', borderRadius: 5 * global.hs }}
                                onPress={() => { login(props) }}
                            />
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

let logWidth = 270 * global.hs;
let loghight = 220 * global.hs;
const styles = StyleSheet.create({

    scrollView: {
        backgroundColor: Colors.lighter,
    },
    body: {
        backgroundColor: "#777",
        width: global.w,
        height: global.h,
        justifyContent: "center",
        alignItems: "center",
    },
    logImg: {
        width: logWidth,
        height: loghight,
        marginBottom: 10
    },

    inputTxt: {

        width: global.w - 50 * global.hs,
        height: 52 * global.hs,
        backgroundColor: 'hsla(0,0%,100%,.3)',
        fontSize: 20 * global.hs,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 4 * global.hs,
        justifyContent: "center",
        paddingLeft: 10 * global.hs,
    },

    loginBtn: {
        marginTop: 15 * global.hs,
        width: global.w - 50 * global.ws,
        height: 100 * global.hs,
        marginBottom: 70 * global.hs,
    },

});

export default App;
