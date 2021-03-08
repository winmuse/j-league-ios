/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import RNFetchBlob from "rn-fetch-blob";
import {

    StyleSheet,
    ScrollView,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image

} from 'react-native';
import Video from 'react-native-video';
import VideoComponent from '../../componet/video';
import { Button } from 'react-native-elements';

import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';

let screenWidth = global.w;
let screenHeight = global.h;

let mediaSize = 137 * global.ws;

const App = (props) => {

    if (screenWidth > 412) mediaSize = screenWidth / 3; else mediaSize = 137 * global.ws;

    const [dataArr, setdataArr] = React.useState([]);

    let item_s = [];

    const [items, setItems] = useState([]);

    const [setErr, onSetErr] = useState(false);
    const [selErr, onSelErr] = useState(false);
    const [loadOk, setLoadOk] = useState(false);


    const [playUrl, onSetPlayUrl] = useState('');
    const [ext, onSetExtension] = useState('mp4');
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        setLoadOk(true);
        RNFetchBlob.config({
            trusty: true
        }).fetch('GET', global.host + '/api/credential/all?token=' + global.Token, {

            'Authorization': global.Token,

        })
            .then(res => res.json())
            .then(function (res) {
                global.SnsRes = res;
            })
            .catch((errorMessage, statusCode) => {
            })

        RNFetchBlob.config({

            trusty: true

        }).fetch('GET', global.host + '/api/default_tags?token=' + global.Token, {

            'Authorization': global.Token,

        })
            .then(res => res.json())
            .then(function (res) {
                global.DefHashTagRes = res;
            })
            .catch((errorMessage, statusCode) => {
            })

        //Get Media Section
        RNFetchBlob.config({

            trusty: true

        }).fetch('GET', global.host + '/api/search_media?opt_keyword=&opt_date=&opt_player=&opt_page=0&opt_size=210&token=' + global.Token, {
            'Authorization': global.Token,
        })
            .then(res => res.json())
            .then(function (res) {
                setdataArr(res);
                setLoadOk(false);
                for (var index = 0; index < res.length; index++) {
                    item_s[index] = false;
                }

                setItems(item_s);
                global.MediaRes = res;
            })
            .catch((errorMessage, statusCode) => {
                setLoadOk(false);
            })


        RNFetchBlob.config({

            trusty: true

        }).fetch('GET', global.host + '/api/ig_credential?token=' + global.Token, {

            'Authorization': global.Token,

        })
            .then(res => res.json())
            .then(function (res) {
                global.igInfo = res;
            })
            .catch((errorMessage, statusCode) => {
            })

        RNFetchBlob.config({
            trusty: true
        }).fetch('GET', global.host + '/api/post_list?token=' + global.Token, {

            'Authorization': global.Token,

        })
            .then(res => res.json())
            .then(function (res) {
                global.PostList = res;

            })
            .catch((errorMessage, statusCode) => {

            })

        RNFetchBlob.config({
            trusty: true
        }).fetch('GET', global.host + '/api/player_list?token=' + global.Token, {

            'Authorization': global.Token,

        })
            .then(res => res.json())
            .then(function (res) {
                global.PlayList = res;
            })
            .catch((errorMessage, statusCode) => {

            })

    }, []);


    if (global.opt_keyword != 'A&B' || global.opt_date != 'A&B' || global.opt_player != 'A&B') {
        setLoadOk(true);
        let url = global.host + '/api/search_media?opt_keyword=' + global.opt_keyword + '&opt_date=' + global.opt_date + '&opt_player='
            + global.opt_player + '&opt_page=0&opt_size=30&token=' + global.Token;

        RNFetchBlob.config({

            trusty: true

        }).fetch('GET', url, {

            'Authorization': global.Token,

        })
            .then(res => res.json())
            .then(function (res) {
                setdataArr(res);
                setLoadOk(false);
                for (var index = 0; index < res.length; index++) {
                    item_s[index] = false;
                }

                setItems(item_s);


                global.MediaRes = res;


                console.log("FFF", global.MediaRes);

            })
            .catch((errorMessage, statusCode) => {
                setLoadOk(false);
            })

        global.opt_keyword = 'A&B';
        global.opt_date = 'A&B';
        global.opt_player = 'A&B';
    }

    const changeStatus = (index, val) => {

        for (var i = 0; i < items.length; i++) {
            if (i !== index)
                item_s[i] = items[i];
            else
                item_s[i] = val;
        }

        setItems(item_s);
        onSetErr(false);
        onSelErr(false);
    }

    let errCnt = 0;
    const postContent = (props) => {

        global.SelMediaRes = [];

        let flag = 0;

        for (var i = 0; i < items.length; i++) {
            if (items[i] == true) {

                flag = 1;

                global.SelMediaRes.push(global.MediaRes[i]);

                errCnt++;

                if (errCnt > 1 && global.MediaRes[i].extension == "mp4") {

                    onSetErr(true);

                    return false;
                }
            }
        }
        if (flag > 0) {

            props.navigation.navigate('NewPost', { SelSnsRes: global.SelSnsRes });

        } else {
            onSelErr(true);
        }

    }
    function mediaUrl(props, url, index, extension) {
        changeStatus(index, true);

        onSetPlayUrl(url);
        onSetExtension(extension);
    }
    //viedo component
    return (
        <View style={styles.container}>

            <View style={{ height: screenHeight - 200 * global.hs }}></View>
            { loadOk == true ?
                <View style={{
                    width: screenWidth, height: screenHeight, backgroundColor: 'hsla(187,0%,0%,.9)', zIndex: 9999,
                    position: "absolute", left: 0, top: 0, paddingTop: screenHeight / 4 - 80 * global.hs, alignItems: "center"
                }}>
                    {loadOk == true ?
                        <View style={{ width: screenWidth - 40, height: screenHeight / 2 -100, alignItems: "center", justifyContent: "center" }}>
                            <Image source={require('../../img/loading.gif')} style={{ width: 70 * global.ws, height: 70 * global.ws }} />
                        </View>
                        :
                        <View></View>
                    }
                </View>
                :
                <View></View>

            }
            {
                playUrl === "" ?
                    <ScrollView style={{ position: "absolute", height: screenHeight - 160 * global.hs, backgroundColor: "#EEE" }}>

                        <View style={styles.body}>
                            {
                                setErr == true ?

                                    <View style={{ width: global.w, height: 40, justifyContent: "center", backgroundColor: "#FF0000" }}>
                                        <Text style={{ fontSize: 16, color: "#FFF", marginLeft: 10 }}>動画は1試合で1本しか投稿できません。</Text>
                                    </View>


                                    : selErr == true ?

                                        <View style={{ width: global.w, height: 40, justifyContent: "center", backgroundColor: "#FF0000" }}>
                                            <Text style={{ fontSize: 16, color: "#FFF", marginLeft: 10 }}>メディアを確認してください。</Text>
                                        </View>

                                        :
                                        <View style={{ position: "absolute" }}></View>
                            }
                            {

                                dataArr.map((val, index) => {

                                    return (
                                        <TouchableOpacity onPress={() => { mediaUrl(props, val.extension == "mp4" ? val.video_url: val.source_url, index, val.extension) }} >
                                            <View style={styles.mediaView}>

                                                {
                                                    val.extension === "mp4" ?
                                                        <ImageBackground source={{ uri: unescape(decodeURIComponent(val.thumb_url)) }}
                                                            style={{ flex: 1, alignItems: "flex-end", paddingRight: 10 * global.hs, paddingTop: 10 * global.hs }} >

                                                            <CircleCheckBox
                                                                checked={items[index]}
                                                                onToggle={(checked) => changeStatus(index, checked)}
                                                            />


                                                            <Image source={require('../../img/play.png')} style={{
                                                                width: 42 * global.c, height: 42 * global.c, marginRight: global.c * 35,
                                                                borderRadius: 21 * global.c, marginTop: global.c * 15, opacity: 0.5
                                                            }} />

                                                        </ImageBackground>

                                                        :

                                                        <ImageBackground source={{ uri: unescape(decodeURIComponent(val.thumb_url)) }}
                                                            style={{ flex: 1, alignItems: "flex-end", paddingRight: 10 * global.hs, paddingTop: 10 * global.hs }} >

                                                            <CircleCheckBox

                                                                checked={items[index]}
                                                                onToggle={(checked) => changeStatus(index, checked)}
                                                            />

                                                        </ImageBackground>
                                                }

                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView >
                    :
                    <View style={{ height: screenHeight - 200 * global.hs, width: global.w, position: "absolute" }}>
                        <TouchableOpacity onPress={() => { onSetPlayUrl('') }} >
                            <Image source={require('../../img/ClosePost.png')} style={{
                                width: 42 * global.c, height: 42 * global.c, marginLeft: global.c * 20,
                                borderRadius: 21 * global.c, marginTop: global.c * 15, marginBottom: 10
                            }} />
                        </TouchableOpacity>

                        <View style={{ width: screenWidth, padding: 0, height: screenHeight - 200 * global.hs }}>
                            {ext == "mp4" ?
                                <Video
                                    onFullScreen={true}
                                    source={{ uri: playUrl }}
                                    style={{ top:global.w*9/16/2, width: global.w, height: global.w*9/16, backgroundColor: "#000" }}
                                    autoplay={true}
                                    resizeMode={'cover'}
                                />
                                :
                                <ImageBackground source={{ uri: (unescape(decodeURIComponent(playUrl))) }}
                                    style={{ top:global.w*9/16/2, width: global.w,height:global.w*9/16}} 
                                >
                                                    
                                </ImageBackground>
                                
                            }
                        </View>


                    </View>
            }
            <View style={styles.btnView}>
                <Button
                    title={global.Post[global.Lang]}
                    color="red"
                    titleStyle={{ fontSize: 17 }}
                    buttonStyle={styles.btn}
                    onPress={() => { postContent(props) }}
                />

            </View>


        </View >
    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#000"

    },
    body: {

        width: screenWidth,
        flexDirection: "row",
        flexWrap: 'wrap',
        flex: 1
    },
    mediaView: {
        width: mediaSize, height: mediaSize, backgroundColor: "#000", borderWidth: 1, borderColor: "#fff"
    },
    // btnView: {
    //     height: 75 * global.hs, alignItems: "center", backgroundColor: "#000", justifyContent: "center", width: screenWidth
    // },
    // btn: {
    //     height: 45 * global.hs, backgroundColor: '#EA1B23', borderRadius: 20, width: screenWidth - 30 * global.ws
    // }
    btnView: { height: 65 * global.hs, alignItems: "center", backgroundColor: "#000", width: screenWidth, justifyContent: "center" ,marginBottom:20},
    btn: { height: 45 * global.hs, backgroundColor: '#EA1B23', borderRadius: 20 * global.hs, width: screenWidth - 30 * global.ws },

});

export default App;
