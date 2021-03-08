/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    ScrollView,
    View,
    TextInput,
    TouchableOpacity,
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

    const [pass, SetPass] = useState(global.igInfo.ig_credential.account_name);
    const [confirmpass, SetConfirmPass] = useState(global.igInfo.ig_credential.ig_password);

    const [saveFg, SetSave] = useState(false);

    const [passLength, setPassInput] = useState('');
    const [passConfirm, SetConfirmPassInput] = useState('');

    //The confirmation password is invalid, The password field is required
    function onSetPass(txt) {
        SetPass(txt);
    }

    function onSetConfirmPass(txt) {

        SetConfirmPass(txt);
    }

    function passrest(props) {

        if (pass.length == 0) {
            return false;
        }
        if (confirmpass == 0) {
            // alert("")         
            return false;
        }


        global.igInfo.ig_credential.account_name = pass;
        global.igInfo.ig_credential.ig_password = confirmpass;

        const data = {
            "token": global.Token,
            "email": pass,
            "password": confirmpass,
        }

        RNFetchBlob.config({
            trusty: true
        }).fetch('POST', global.host + '/api/save-ig-account', {
            'Content-Type': 'application/json',
            'Transfer-Encoding': 'Chunked'
        }, JSON.stringify(data))
            .then(res => res.json())
            .then(function (res) {
                SetSave(true);
            })
            .catch((errorMessage, statusCode) => {
                alert("Password reset isn't complete!");
            })
    }
    const mediaUrl = (props) => {
        props.navigation.navigate('Main');
    }
    return (
        <>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => { mediaUrl(props) }} >
                    <Image source={require('../../img/ClosePost.png')} style={styles.ico32} />
                </TouchableOpacity>
            </View>

            <ScrollView>

                <View style={styles.body}>
                    {
                        saveFg === true ?
                            <View style={{
                                backgroundColor: "#23D160", width: screenWidth - 60 * global.c, marginLeft: 30, height: 60, borderRadius: 5,
                                paddingLeft: 10, marginTop: 30, alignItems: "flex-end", paddingTop: 5
                            }}>
                                <TouchableOpacity onPress={() => { SetSave(false) }} >
                                    <Image source={require('../../img/igclose.png')} style={{ marginRight: 10 }} />
                                </TouchableOpacity>
                                <Text style={{ color: "#FFF", fontSize: 16, alignItems: "flex-start", width: screenWidth - 80 * global.c }}>
                                    global.InstagramSaveOk[global.Lang]
                                </Text>
                            </View>
                            :
                            <View></View>
                    }
                    <Text style={{
                        color: '#333', fontWeight: 'bold', fontSize: 18 * global.c,
                        marginTop: 30 * global.c, marginBottom: 10 * global.c, marginLeft: 30 * global.c,
                    }}>
                        Instagram ID
                        </Text>
                    <TextInput style={styles.inputTxt}

                        underlineColorAndroid="transparent"

                        placeholder={global.ResetPassTxt[global.Lang]}

                        placeholderTextColor="#CCC"
                        onChangeText={(text) => onSetPass(text)}
                        value={pass}

                        autoCapitalize="none" />

                    <Text style={styles.txt}>{global.RequiredTxt[global.Lang]}</Text>

                    <Text style={{
                        color: '#333', fontWeight: 'bold', fontSize: 18 * global.c,
                        marginTop: 30 * global.c, marginBottom: 10 * global.c, marginLeft: 30 * global.c
                    }}>
                        PASSWORD
                        </Text>

                    <TextInput style={styles.inputTxt}
                        underlineColorAndroid="transparen"

                        placeholder={global.ConfirmPassTxt[global.Lang]}

                        placeholderTextColor="#CCC"
                        onChangeText={(text) => onSetConfirmPass(text)}
                        value={confirmpass}

                        autoCapitalize="none" />

                    <Text style={styles.txt}>{global.RequiredTxt[global.Lang]}</Text>

                    <View style={styles.loginBtn}>
                        <Button
                            title={global.InstagramSave[global.Lang]}
                            color="red"
                            titleStyle={{ fontSize: 18 * global.c }}
                            buttonStyle={{ height: 50 * global.c, backgroundColor: 'red', borderRadius: 5 * global.c }}
                            onPress={() => { passrest(props) }}
                        />
                    </View>

                </View>
            </ScrollView>

        </>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: 10 * global.hs,
        paddingHorizontal: 10 * global.hs,
        width: '100%',
        height: 70 * global.hs,
        backgroundColor: '#000',
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: 'center'
    },
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    body: {
        backgroundColor: "#eee",
        width: screenWidth,
        height: screenHeight,

    },
    txt: { color: "#000", marginLeft: 30 * global.c, marginTop: 5 },
    inputTxt: {

        width: screenWidth - 60 * global.c,
        height: 52 * global.c,
        //marginTop: 10,
        backgroundColor: '#FFF',
        fontSize: 18 * global.c,
        borderColor: '#d0d0d0',
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 4 * global.c,
        paddingBottom: 10 * global.c,
        paddingLeft: 10 * global.c,
        marginLeft: 30 * global.c
    },


    loginBtn: {
        marginTop: 15,
        width: screenWidth - 60,
        height: 100,
        marginLeft: 30
    },

});

export default App;
