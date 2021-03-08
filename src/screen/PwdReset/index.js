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


        if (txt.length != 8) {
            setPassInput(global.ResetPass[global.Lang]);
        } else {
            setPassInput('');
        }

        SetPass(txt);
    }

    function onSetConfirmPass(txt) {

        if (pass != txt) {
            SetConfirmPassInput(global.ConfirmPass[global.Lang]);
        }
        else {
            SetConfirmPassInput('');
        }
        SetConfirmPass(txt);
    }

    function passrest(props) {

        if (confirmpass.length != 8) {
            return false;
        }
        if (confirmpass != pass) {
            return false
        }

        const data = {
            "token": global.Token,
            "password": confirmpass
        }
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />

            <SafeAreaView>
                <ScrollView>
                    <View style={styles.body}>

                        <Text style={{
                            color: '#333', fontWeight: 'bold', fontSize: 16 * global.c,
                            marginTop: 30 * global.c, marginBottom: 20 * global.c, marginLeft: 30 * global.c
                        }}>
                            {global.Pass[global.Lang]}
                        </Text>
                        <TextInput style={styles.inputTxt}

                            underlineColorAndroid="transparent"

                            placeholder={global.ResetPassTxt[global.Lang]}

                            placeholderTextColor="#CCC"
                            onChangeText={(text) => onSetPass(text)}
                            value={pass}
                            secureTextEntry={true}
                            autoCapitalize="none" />

                        <Text style={styles.txt}>{passLength}</Text>

                        <TextInput style={styles.inputTxt}
                            underlineColorAndroid="transparen"

                            placeholder={global.ConfirmPassTxt[global.Lang]}

                            placeholderTextColor="#CCC"
                            onChangeText={(text) => onSetConfirmPass(text)}
                            value={confirmpass}
                            secureTextEntry={true}
                            autoCapitalize="none" />

                        <Text style={styles.txt}>{passConfirm}</Text>

                        <View style={styles.loginBtn}>
                            <Button
                                title={global.RestPassBtn[global.Lang]}
                                color="red"
                                titleStyle={{ fontSize: 18 * global.c }}
                                buttonStyle={{ height: 50 * global.c, backgroundColor: 'red', borderRadius: 5 * global.c }}
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
    txt: { color: "#FF0000", marginLeft: 30 * global.c },
    inputTxt: {

        width: screenWidth - 60 * global.c,
        height: 52 * global.c,
        backgroundColor: '#FFF',
        fontSize: 16 * global.c,
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
