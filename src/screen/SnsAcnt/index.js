import React, { useState, useEffect } from 'react';

import {
    StyleSheet,
    ScrollView,
    View,
    Alert,
    Text,
    Image,
    NativeModules,
    TouchableOpacity,
    Linking,
} from 'react-native';

import { Button } from 'react-native-elements';

import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

import images from './images/imagesBase64';
import pdfBase64 from './images/pdfBase64';


// import RNReactNativeSharingWinstagram from 'react-native-sharing-winstagram';
import CameraRoll from '@react-native-community/cameraroll';
// import InstagramShare from '@react-native-social-share/instagram';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Dimensions } from 'react-native';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { and } from 'react-native-reanimated';
// import InstagramLogin from 'react-native-instagram-login';

const { RNTwitterSignIn } = NativeModules
const Constants = {
    //Dev Parse keys
    TWITTER_COMSUMER_KEY: "eK4vtVo7i50URVzkiFpeOhMjo",
    TWITTER_CONSUMER_SECRET: "79UXgTM0CaiKv3lvOSBgyB3Xq5fk1EZoodMf4XyoCNCBRNvV1V"
}


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

var type = "";
var id = "";

const App = (props) => {

    const [snsRes, setSnsRes] = useState(global.SnsRes);

    const [savePre, setSavePre] = useState(false);
    const [saveOk, setSaveOk] = useState(false);


    const GetInformationFromToken = (accessToken) => {

        const parameters = {
            fields: {
                string: 'id, name, first_name, email, picture.type(large), quotes',
            },
        };
        const myProfileRequest = new GraphRequest(
            '/me',
            { accessToken, parameters: parameters },
            (error, myProfileInfoResult) => {
                if (error) {

                    console.log('login info has error: ' + error);

                } else {
                    console.log('login info : ' ,accessToken);
                    var data = { "user_id": global.UserId, "provider_id": myProfileInfoResult.id, "account_name": myProfileInfoResult.name, "name": myProfileInfoResult.first_name, "avatar": myProfileInfoResult.picture.data.url, "token": accessToken, "access_token": accessToken };
                    // console.log('login info : ' ,data);
                    RNFetchBlob.config({
                        trusty: true
                    }).fetch('POST', global.host + '/api/save-fb-account?token=' + global.Token, {
                        'Authorization': global.Token,
                        'Content-Type': 'application/json',
                        'Transfer-Encoding': 'Chunked'
                    }, JSON.stringify(data))
                        .then(response => response.json())
                        .then(function (response) {
                            console.log(JSON.stringify(response.data));
                            RNFetchBlob.config({
                                trusty: true
                            }).fetch('GET', global.host + '/api/credential/all?token=' + global.Token, {
                    
                                'Authorization': global.Token,
                    
                            })
                                .then(res => res.json())
                                .then(function (res) {
                    
                                    global.SnsRes = res;
                                    setSnsRes(res);
                                })
                                .catch((errorMessage, statusCode) => {
                                    console.log("catch--------------->!", errorMessage);
                                })
                        })
                        .catch(function (error) {
                            console.log("FFFFFFFF",error);
                        });
                }
            },
        );
        new GraphRequestManager().addRequest(myProfileRequest).start();
    };


    const loginFacebook = async (props) => {
        console.log("123123132");
        LoginManager.logInWithPermissions(['public_profile', 'publish_actions', 'email', 'manage_pages', 'pages_show_list', 'publish_pages'])
        // LoginManager.logInWithPermissions(['public_profile', 'user_friends', 'email', 'user_about_me', 'user_actions.books', 'user_actions.fitness', 'user_actions.music', 'user_actions.news', 'user_actions.video', 'user_birthday', 'user_education_history', 'user_events', 'user_games_activity', 'user_hometown', 'user_likes', 'user_location', 'user_managed_groups', 'user_photos', 'user_posts', 'user_relationships', 'user_relationship_details', 'user_religion_politics', 'user_tagged_places', 'user_videos', 'user_website', 'user_work_history', 'read_custom_friendlists', 'read_insights', 'read_audience_network_insights', 'read_page_mailboxes', 'manage_pages', 'publish_pages', 'publish_actions', 'rsvp_event', 'pages_show_list', 'pages_manage_cta', 'pages_manage_instant_articles', 'ads_read', 'ads_management', 'business_management', 'pages_messaging', 'pages_messaging_subscriptions', 'pages_messaging_payments', 'pages_messaging_phone_number']) 
            .then((result) => {

                if (result.isCancelled) {

                    // console.log(">>>>>>>>>>", global.SnsRes);

                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {

                            console.log("access token--->>>>>>>>",data);
                            const accessToken = data.accessToken.toString();
                            GetInformationFromToken(accessToken);
                        }
                    )
                }
            })
            .catch(error => {
                console.log("QQQQQQQ");
            })
    }


    const loginTwitter = async (props) => {

        console.log("aaaaaaaaaaaTTTTTTTT");

        RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
        RNTwitterSignIn.logIn()
            .then(loginData => {

                const { authToken, authTokenSecret } = loginData
                if (authToken && authTokenSecret) {
                    console.log(authToken)
                    console.log(">>>>>",loginData);
                    var data = { "user_id": global.UserId, "provider_id": loginData.userID, "account_name": loginData.userName, "name": loginData.userName, "avatar": "a", "token": "non", "authToken": authToken, "authTokenSecret": authTokenSecret };

                    RNFetchBlob.config({
                        trusty: true
                    }).fetch('POST', global.host + '/api/save-tw-account?token=' + global.Token, {
                        'Authorization': global.Token,
                        'Content-Type': 'application/json',
                        'Transfer-Encoding': 'Chunked'
                    }, JSON.stringify(data))
                        .then(response => response.json())
                        .then(function (response) {
                            console.log(JSON.stringify(response.data));
                            RNFetchBlob.config({
                                trusty: true
                            }).fetch('GET', global.host + '/api/credential/all?token=' + global.Token, {
                    
                                'Authorization': global.Token,
                    
                            })
                                .then(res => res.json())
                                .then(function (res) {
                    
                                    global.SnsRes = res;
                                    setSnsRes(res);
                                })
                                .catch((errorMessage, statusCode) => {
                                    console.log("catch--------------->!", errorMessage);
                                })
                        })
                        .catch((errorMessage, statusCode) => {
                            console.log("catch--------------->!", errorMessage);
                        })

                } else {
                    console.log("!authToken")
                }
            })
            .catch(error => {

                alert(error);
            })
    }
    const checkIfPackageIsInstalled = async () => {
        const { isInstalled } = await Share.isPackageInstalled('Instagram');

        Alert.alert(
            `Package: Instagram`,
            `${isInstalled ? 'Installed' : 'Not Installed'}`,
        );
    };

    const deleteCredential = async (type1, id1) => {
        setSavePre(true);
        type = type1;
        id = id1;
    }
    const deleteCredentialOk = async () => {
        console.log("aaaaa-", type, id);
        setSavePre(false);

        RNFetchBlob.config({
            trusty: true
        }).fetch('GET', global.host + '/api/credential/remove/' + type + '/' + id + '?token=' + global.Token, {
            'Authorization': global.Token,
        })
            .then(res => res.json())
            .then(function (res) {
                let vals = [];
                snsRes.map((val, index) => {
                    if (val.id === id && val.type === type) {

                    }
                    else {
                        vals.push(val);
                        console.log("bbbb", val.type, val.id);
                    }
                    setSnsRes(vals);
                })
                setSaveOk(true);
            })
            .catch((errorMessage, statusCode) => {

            })
    }
    const deleteCredentialCancel = async () => {
        setSavePre(false);
        setSaveOk(false);
    }
    const [token, setToken] = useState('');

    const setIgToken = async (data) => {
        console.log('data', data);
        setToken(data.access_token);
    }

    return (
        <>
            <View style={styles.container}>
                {savePre == true ?
                    <View style={{
                        width: screenWidth, height: screenHeight, backgroundColor: 'hsla(187,0%,0%,.9)', zIndex: 9999,
                        position: "absolute", left: 0, top: 0, paddingTop: screenHeight / 4 - 80 * global.hs, alignItems: "center"
                    }}>
                        <View style={{ width: screenWidth - 40, height: screenHeight / 2, backgroundColor: "#FFF", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ marginTop: 50 * global.hs, marginBottom: 50 * global.hs, fontSize: 18 * global.hs }}>{global.DeleteCredential[global.Lang]}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <Button
                                    title={global.DeleteCredentialYes[global.Lang]}
                                    titleStyle={{ fontSize: 16 * global.hs, color: "#FFF", fontWeight: "bold" }}
                                    buttonStyle={{
                                        height: 50 * global.hs, marginLeft: 10 * global.ws, backgroundColor: '#EA1B23', borderWidth: 2, borderColor: "#EA1B23", color: "#EA1B23",
                                        borderRadius: 25 * global.hs, width: (screenWidth - 100 * global.ws) / 2
                                    }}
                                    onPress={() => { deleteCredentialOk() }}
                                />
                                <Button
                                    title={global.DeleteCredentialCancel[global.Lang]}
                                    titleStyle={{ fontSize: 16 * global.hs, color: "#EA1B23", fontWeight: "bold" }}
                                    buttonStyle={{
                                        height: 50 * global.hs, marginLeft: 10 * global.ws, backgroundColor: '#FFF', borderWidth: 2, borderColor: "#EA1B23", color: "#EA1B23",
                                        borderRadius: 25 * global.hs, width: (screenWidth - 100 * global.ws) / 2
                                    }}
                                    onPress={() => { deleteCredentialCancel() }}
                                />
                            </View>
                        </View>

                    </View>
                    :
                    <View></View>
                }

                {saveOk == true ?
                    <View style={{
                        width: screenWidth, height: screenHeight, backgroundColor: 'hsla(187,0%,0%,.9)', zIndex: 9999,
                        position: "absolute", left: 0, top: 0, paddingTop: screenHeight / 4 - 80 * global.hs, alignItems: "center"
                    }}>
                        <View style={{ width: screenWidth - 40, height: screenHeight / 2, backgroundColor: "#FFF", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ marginTop: 50 * global.hs, marginBottom: 50 * global.hs, fontSize: 18 * global.hs }}>{global.DeleteCredentialResult[global.Lang]}</Text>

                            <Button
                                title={global.DeleteCredentialCancel[global.Lang]}
                                titleStyle={{ fontSize: 16 * global.hs, color: "#FFF", fontWeight: "bold" }}
                                buttonStyle={{
                                    height: 50 * global.hs, marginLeft: 10 * global.ws, backgroundColor: '#EA1B23', borderWidth: 2, borderColor: "#EA1B23", color: "#EA1B23",
                                    borderRadius: 25 * global.hs, width: (screenWidth - 100 * global.ws) / 2
                                }}
                                onPress={() => { deleteCredentialCancel() }}
                            />
                        </View>

                    </View>
                    :
                    <View></View>
                }
                <ScrollView style={styles.body}>

                    {
                        snsRes.map((val, index) => {

                            return (
                                <View style={styles.snsList}>
                                    <View style={{ width: 50 * global.c, marginLeft: 20 * global.c }}>
                                        {val.type === "twitter" ?
                                            <Image source={require('../../img/icon-twitter-circle.png')} style={styles.ico40} />
                                            : val.type === "instagram" ?
                                                <Image source={require('../../img/icon-instagram-circle.png')} style={styles.ico40} />
                                                : val.type === "facebook" ?
                                                    <Image source={require('../../img/icon-facebook-circle.png')} style={styles.ico40} />
                                                    : <Text>???</Text>
                                        }
                                    </View>
                                    <Text style={{ fontSize: 18 * global.c, width: screenWidth - 180 * global.c }}>@{val.account_name}</Text>
                                    <TouchableOpacity onPress={() => { deleteCredential(val.type, val.id) }}>
                                        <Image style={{ width: 30 * global.c, height: 30 * global.c, marginRight: 20 * global.c }} source={require('../../img/del.png')} />
                                    </TouchableOpacity >
                                </View>
                            )
                        })
                    }
                    <View style={[styles.loginBtn, { flexDirection: "row", backgroundColor: '#009FF2', borderRadius: 5 * global.c }]}>

                        <Image style={{ width: 32 * global.c, height: 32 * global.c, marginLeft: 10 * global.c, marginTop: 10 * global.c }} source={require('../../img/icon-twitter-circle.png')} />

                        <Button
                            title="Connect to twitter"
                            color="red"
                            titleStyle={{ fontSize: 20 * global.c }}
                            buttonStyle={{ height: 50 * global.c, backgroundColor: '#009FF2', borderRadius: 5, width: screenWidth - 120 * global.c }}
                            onPress={() => { loginTwitter(props) }}
                        />


                    </View>
                    <View style={[styles.loginBtn, { flexDirection: "row", backgroundColor: '#0073F2', borderRadius: 5 * global.c }]}>
                        <Image style={{ width: 32 * global.c, height: 32 * global.c, marginLeft: 10 * global.c, marginTop: 10 * global.c }} source={require('../../img/icon-facebook-circle.png')} />
                        <Button
                            title="Connect to facebook"
                            color="red"
                            titleStyle={{ fontSize: 20 * global.c }}
                            buttonStyle={{ height: 50 * global.c, backgroundColor: '#0073F2', borderRadius: 5, width: screenWidth - 120 * global.c }}
                            onPress={() => { loginFacebook(props) }}
                        />
                    </View>
                </ScrollView>
            </View>


        </>
    );
};

const logWidth = 270 * global.c;
const loghight = 220 * global.c;

const styles = StyleSheet.create({
    ico40: { width: 40 * global.c, height: 40 * global.c },
    snsList: {
        marginTop: 3 * global.c, height: 70 * global.c, flexDirection: "row", justifyContent: "space-between",
        backgroundColor: "#FFF", width: screenWidth - 60 * global.c, marginLeft: 30 * global.c, alignItems: 'center', flex: 1
    },

    scrollView: {
        backgroundColor: Colors.lighter,
    },

    body: {
        backgroundColor: "#EEE",
        width: screenWidth,
        height: screenHeight,
        paddingTop: 20 * global.c
    },

    engine: {
        position: 'absolute',
        right: 0,
    },

    loginBtn: {
        marginTop: 25 * global.c,
        width: screenWidth - 60 * global.c,
        marginLeft: 30 * global.c
    },

});

export default App;
