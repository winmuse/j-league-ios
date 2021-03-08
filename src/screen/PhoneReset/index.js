/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    TextInput,
    StatusBar,
    Text,

} from 'react-native';
import { Button } from 'react-native-elements';
import '../../config/global.js';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import RNFetchBlob from "rn-fetch-blob";

import { Dimensions } from 'react-native';



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const App = (props) => {

    const [pass, SetPass] = useState('');
    const [confirmpass, SetConfirmPass] = useState('');


    const [passLength, setPassInput] = useState('');
    const [passConfirm, SetConfirmPassInput] = useState('');

    //The confirmation password is invalid, The password field is required
    function onSetPass(txt) {


        if (txt.length != 11) {
            setPassInput(global.ResetPhone[global.Lang]);
        } else {
            setPassInput('');
        }



        SetPass(txt.replace(/[^0-9]/g, ''));
    }

    function onSetConfirmPass(txt) {

        if (pass != txt) {
            SetConfirmPassInput(global.ConfirmPhone[global.Lang]);
        }
        else {
            SetConfirmPassInput('');
        }
        SetConfirmPass(txt.replace(/[^0-9]/g, ''));
    }

    function passrest(props) {

      
        if (confirmpass.length != 11) {
            return false;
        }
        if (confirmpass != pass) {
            // alert("")         
            return false
        }

        const data = {
            "token": global.Token,
            "mobile": confirmpass
        }
        //furoshikiforath //pass12341
        RNFetchBlob.config({
            trusty: true
        }).fetch('POST', global.host + '/api/change_mobile', {
            'Content-Type': 'application/json',
            'Transfer-Encoding': 'Chunked'
        }, JSON.stringify(data))
            .then(res => res.json())
            .then(function (res) {
            })
            .catch((errorMessage, statusCode) => {
                alert("Password reset isn't complete!");
            })

    }

    return (
        <>
            <StatusBar barStyle="dark-content" />

            <SafeAreaView>
                <ScrollView>
                    <View style={styles.body}>

                        <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 16 * global.hs, marginTop: 30 * global.hs, marginBottom: 20 * global.hs, marginLeft: 30 * global.hs }}>
                            {global.PhoneTitle[global.Lang]}
                        </Text>

                        <TextInput style={styles.inputTxt}

                            underlineColorAndroid="transparent"

                            placeholder={global.ResetPhoneTxt[global.Lang]}

                            placeholderTextColor="#CCC"
                            onChangeText={(text) => onSetPass(text)}
                            value={pass}
                            keyboardType='numeric'
                            autoCapitalize="none" />

                        <Text style={styles.txt}>{passLength}</Text>

                        <TextInput style={styles.inputTxt}
                            underlineColorAndroid="transparen"

                            placeholder={global.ConfirmPhoneTxt[global.Lang]}

                            placeholderTextColor="#CCC"
                            onChangeText={(text) => onSetConfirmPass(text)}
                            value={confirmpass}
                            keyboardType='numeric'
                            autoCapitalize="none" />

                        <Text style={styles.txt}>{passConfirm}</Text>

                        <View style={styles.loginBtn}>
                            <Button
                                title={global.RestPhoneBtn[global.Lang]}
                                color="red"
                                titleStyle={{ fontSize: 18 * global.hs }}
                                buttonStyle={{ height: 50 * global.hs, backgroundColor: 'red', borderRadius: 5 * global.hs }}
                                onPress={() => { passrest(props) }}
                            />
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({

    scrollView: {
        backgroundColor: Colors.lighter,
    },
    body: {
        backgroundColor: "#eee",
        width: screenWidth,
        height: screenHeight,

    },
    txt: { color: "#FF0000", marginLeft: 30 * global.hs },
    inputTxt: {

        width: screenWidth - 60 * global.hs,
        height: 52 * global.hs,
        backgroundColor: '#FFF',
        fontSize: 16 * global.hs,
        borderColor: '#d0d0d0',
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 4 * global.hs,
        paddingBottom: 10 * global.hs,
        paddingLeft: 10 * global.hs,
        marginLeft: 30 * global.hs
    },


    loginBtn: {
        marginTop: 15 * global.hs,
        width: screenWidth - 60 * global.ws,
        height: 100 * global.hs,
        marginLeft: 30 * global.ws
    },

});

export default App;
