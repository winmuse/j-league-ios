import React, { Component, useState } from 'react';

import {

    StyleSheet,
    View,
    Image,
    Text,

} from 'react-native';

import '../../config/global.js';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import Video from 'react-native-video';
import RNFetchBlob from "rn-fetch-blob";
import Share from 'react-native-share';
import Clipboard from '@react-native-community/clipboard'

import CameraRoll from "@react-native-community/cameraroll";

const mainColor = '#3ca897';


const screenWidth = global.w;
const screenHeight = global.h;

let mediaWidth = (screenWidth - 75 * global.ws) / 2
let saveTxt = global.NewPostDraft[global.Lang];

const App = (props) => {


    const [savePre, setSavePre] = useState(false);
    const [saveOk, setSaveOk] = useState(false);

    const [loadOk, setLoadOk] = useState(false);

    let SelPostRes = [];



    let index = 0;

    for (let i = 0; i < global.SelSnsRes.length; i++) {
        for (let j = 0; j < global.SelMediaRes.length; j++) {

            let selpost = [global.SelSnsRes[i], global.SelMediaRes[j]];
            SelPostRes.push(selpost);
            index++;
        }

    }


    global.SelPostRes = SelPostRes;

    const mediaUrl = (props) => {

        props.navigation.navigate('NewPost', { SelSnsRes: global.SelSnsRes });
    }
    const draftContent = (props) => {

        saveTxt = global.NewPostPost[global.Lang];
        setSavePre(true);


        let draftPost = new Object();

        draftPost.comments = [];
        draftPost.content = global.Content.content;

        draftPost.tags = [];
        for (let i = 0; i < global.DefHashTagRes.length; i++) {
            draftPost.tags.push(global.DefHashTagRes[i]);
        }
        for (let i = 0; i < global.SelHashTagRes.length; i++) {
            draftPost.tags.push(global.SelHashTagRes[i]);
        }

        draftPost.status = 0;

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes();

        draftPost.publish = year + "-" + month + "-" + date + " " + hours + ":" + min;

        let medias = [];
        global.SelMediaRes.map((val, index) => {
            medias.push(val.id);
        })

        draftPost.medias = medias;

        let targets = [];

        global.SelSnsRes.map((val, index) => {
            let sns = new Object();
            sns.sns = val.type;
            sns.id = val.id;
            targets.push(sns);
        })

        draftPost.targets = targets;
        console.log("FFFFFF", draftPost)
        RNFetchBlob.config({
            trusty: true
        }).fetch('POST', global.host + '/api/new_post?token=' + global.Token, {
            'Content-Type': 'application/json',
            'Transfer-Encoding': 'Chunked'
        }, JSON.stringify(draftPost))
            .then(res => res.json())
            .then(function (res) {
                setSaveOk(true);
            })
            .catch((errorMessage, statusCode) => {

            })

    }

    const postContent = (props) => {
        setLoadOk(true);
        saveTxt = global.NewPostPost[global.Lang];
        let sourceUrl = "";
        setSavePre(true);

        let instagramUrls = [];
        let instagramcount = 0;
        let draftPost = new Object();

        draftPost.comments = [];
        draftPost.content = global.Content.content;

        let clipboardString = global.Content.content+"\n";
        draftPost.tags = [];
        for (let i = 0; i < global.DefHashTagRes.length; i++) {
            draftPost.tags.push(global.DefHashTagRes[i]);
            clipboardString+=global.DefHashTagRes[i] + " ";
        }
        for (let i = 0; i < global.SelHashTagRes.length; i++) {
            draftPost.tags.push(global.SelHashTagRes[i]);
            clipboardString+=global.SelHashTagRes[i] + " ";
        }
        Clipboard.setString(clipboardString);
        draftPost.status = 1;

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes();

        draftPost.publish = year + "-" + month + "-" + date + " " + hours + ":" + min;

        let medias = [];

        global.SelMediaRes.map((val, index) => {
            medias.push(val.id);

        })

        draftPost.medias = medias;

        let targets = [];

        global.SelSnsRes.map((val, index) => {
            let sns = new Object();
            sns.sns = val.type;
            sns.id = val.id;

            if (val.type === "instagram") {
                global.SelMediaRes.map((val, index) => {
                    console.log("url111--->",val.video_url);
                    RNFetchBlob
                        .config({
                            fileCache: true,
                            appendExt:val.extension,
                        })
                        .fetch('GET', (val.extension === "mp4" ? val.video_url : val.source_url), {
                        })
                        .then((res) => {
                            console.log("path333--->",res.path());
                            if (val.extension === "mp4") {
                                CameraRoll.save(res.path(), 'video')
                                .then(result => {
                                    console.log("cameraroll--->",result);
                                    setLoadOk(false);
                                    setSaveOk(true);
                                    const shareOptions = {
                                        social: Share.Social.INSTAGRAM,
                                        url: result,
                                        type: `video/${val.extension}`, //file.extension contains the extension of the file
                                    };
                                    try {
                                        const ShareResponse = Share.shareSingle(shareOptions);
                                    } catch (error) {
                                        console.log('Error =>', error);
                                        setLoadOk(false);
                                    }
                                })
                                .catch((err) => {
                                    console.log("camera_error--->",err);
                                    setLoadOk(false);
                                    alert("failed post");
                                });
                            }
                            else {
                                res.readFile("base64")
                                .then(resF => {
                                    console.log("base64--->",resF);
                                    setLoadOk(false);
                                    setSaveOk(true);
                                    const shareOptions = {
                                        social: Share.Social.INSTAGRAM,
                                        url: `data:image/${val.extension};base64,${resF}`,
                                        type: `image/${val.extension}`,
                                    };
                                    try {
                                        const ShareResponse = Share.shareSingle(shareOptions);
                                    } catch (error) {
                                        console.log('Error =>', error);
                                        setLoadOk(false);
                                        alert("failed post");
                                    }
                                });
                            }
                        })
                        .catch((errorMessage, statusCode) => {
                            console.log("RNFetchBlob--->",errorMessage);
                            setLoadOk(false);
                            alert("failed post");
                        })
                })
            }
            
            targets.push(sns);
            
        })

        draftPost.targets = targets;

        RNFetchBlob.config({
            trusty: true
        }).fetch('POST', global.host + '/api/new_post?token=' + global.Token, {
            'Content-Type': 'application/json',
            'Transfer-Encoding': 'Chunked'
        }, JSON.stringify(draftPost))
            .then(res => res.json())
            .then(function (res) {
                if(loadOk == false)
                    setSaveOk(true);
            })
            .catch((errorMessage, statusCode) => {
                console.log(errorMessage);
                setSaveOk(true);
            })
    }

    return (

        <View style={styles.container}>
            { savePre == true ?
                <View style={{
                    width: screenWidth, height: screenHeight, backgroundColor: 'hsla(187,0%,0%,.9)', zIndex: 9999,
                    position: "absolute", left: 0, top: 0, paddingTop: screenHeight / 4 - 80 * global.hs, alignItems: "center"
                }}>
                    {saveOk == true ?
                        <View style={{ width: screenWidth - 40, height: screenHeight / 2, backgroundColor: "#FFF", alignItems: "center", justifyContent: "center" }}>
                            <Image source={require('../../img/done.png')} style={{ width: 135 * global.ws, height: 95 * global.ws }} />
                            <Text style={{ marginTop: 50 * global.hs, marginBottom: 50 * global.hs, fontSize: 18 * global.hs }}>{saveTxt}</Text>

                            <Button
                                title={global.NewPostGoPage[global.Lang]}
                                titleStyle={{ fontSize: 16 * global.hs, color: "#EA1B23", fontWeight: "bold" }}
                                buttonStyle={{
                                    height: 50 * global.hs, marginLeft: 10 * global.ws, backgroundColor: '#FFF', borderWidth: 2, borderColor: "#EA1B23", color: "#EA1B23",
                                    borderRadius: 25 * global.hs, width: (screenWidth - 100 * global.ws) / 2
                                }}
                                onPress={() => { global.RePostList = true; props.navigation.navigate('Main', { selMenu: 'Media' }); }}
                            />

                        </View>
                        :
                        <View></View>
                    }
                    {loadOk == true ?
                        <View style={{ width: screenWidth - 40, height: screenHeight / 2+150, alignItems: "center", justifyContent: "center" }}>
                            <Image source={require('../../img/loading.gif')} style={{ width: 70 * global.ws, height: 70 * global.ws }} />
                        </View>
                        :
                        <View></View>
                    }
                </View>
                :
                <View></View>

            }

            <View style={styles.header}>

                <TouchableOpacity onPress={() => { mediaUrl(props) }} >
                    <Image source={require('../../img/ClosePost.png')} style={styles.ico32} />
                </TouchableOpacity>
            </View>


            <ScrollView style={styles.sView} horizontal={true}>

                {
                    global.SelSnsRes.map((val, index) => {

                        return (
                            <View style={styles.mView}>

                                <View style={styles.snsIfView}>
                                    <View style={{ flexDirection: "row", width: (screenWidth - 40) * global.ws, }}>
                                        {   
                                            val.type === "twitter" ?
                                            <>
                                                {
                                                    val.avatar === "" ?
                                                    <Image source={require('../../img/avatar.png')} style={styles.avarta40} />
                                                    :
                                                    <Image source={{ uri: val.avatar }} style={styles.avarta40} />
                                                }
                                                <View style={styles.sns}>
                                                    <Text style={{ fontSize: 13 * global.hs }}>{val.name}</Text>
                                                    <Text style={{ fontSize: 12 * global.hs }}>@{val.account_name}</Text>
                                                </View>
                                                <Image source={require('../../img/icon-twitter-circle.png')} style={styles.ico40} />
                                            </>

                                            : val.type === "instagram" ?
                                                <>
                                                {
                                                    val.avatar === "" || val.avatar === null?
                                                    <Image source={require('../../img/avatar.png')} style={styles.avarta40} />
                                                    :
                                                    <Image source={{ uri: val.avatar }} style={styles.avarta40} />
                                                }
                                                    <View style={styles.snsInstagram}>
                                                        <Text style={{ fontSize: 15 * global.hs }}>@{val.account_name}</Text>
                                                    </View>
                                                    <Image source={require('../../img/icon-instagram-circle.png')} style={styles.ico40} />
                                                </>
                                                : val.type === "facebook" ?
                                                    <>
                                                    {val.avatar === "" ?
                                                        <Image source={require('../../img/avatar.png')} style={styles.avarta40} />
                                                        :
                                                        <Image source={{ uri: val.avatar }} style={styles.avarta40} />
                                                    }
                                                       <View style={styles.sns}>
                                                            <Text style={{ fontSize: 13 * global.hs }}>{val.name}</Text>
                                                            <Text style={{ fontSize: 12 * global.hs }}>@{val.account_name}</Text>
                                                        </View>
                                                        <Image source={require('../../img/icon-facebook-circle.png')} style={styles.ico40} />
                                                    </>
                                                    : <>
                                                    {val.avatar === "" ?
                                                        <Image source={require('../../img/avatar.png')} style={styles.avarta40} />
                                                        :
                                                        <Image source={{ uri: val.avatar }} style={styles.avarta40} />
                                                    }

                                                        <Image source={{ uri: val.avatar }} style={styles.avarta40} />
                                                        <View style={styles.sns}>
                                                            <Text style={{ fontSize: 13 * global.hs }}>{val.name}</Text>
                                                            <Text style={{ fontSize: 12 * global.hs }}>@{val.account_name}</Text>
                                                        </View>
                                                        <Image source={require('../../img/icon-instagram-circle.png')} style={styles.ico40} />
                                                    </>
                                        }

                                    </View>
                                </View>
                                <ScrollView>
                                    <View style={{ flexDirection: "row", flexWrap: "wrap", width: (screenWidth - 60) }}>
                                        {
                                            global.SelMediaRes.map((col, row) => {
                                                return (
                                                    col.extension === "mp4" ?
                                                        <Video
                                                            onFullScreen={true}
                                                            source={{ uri: col.video_url }}
                                                            style={{ width: (screenWidth - 30), height: (screenWidth - 40) * 0.75, backgroundColor: "#000", marginBottom:20 }}
                                                            autoplay={true}
                                                            muted={true}
                                                            resizeMode={'cover'}
                                                            poster={col.thumb_url}
                                                        />
                                                        :
                                                        <Image source={{ uri: col.source_url }} style={styles.media} resizeMode={'cover'} />                                                //source={require('../../img/123.mp4')}

                                                )
                                            })
                                        }
                                    </View>
                                
                                    <View style={{ padding: 10 * global.ws }}>
                                        <Text style={{ fontSize: 18 * global.hs }}>{global.Content.content}</Text>
                                    </View>

                                    <View style={styles.hasTagView}>
                                        {
                                            global.DefHashTagRes.map((val, index) => {

                                                return (
                                                    <View style={styles.hasTag}>
                                                        <Text style={{ fontSize: 16 * global.hs }}> #{val} </Text>
                                                    </View>
                                                )
                                            })
                                        }
                                        {
                                            global.SelHashTagRes.map((val, index) => {

                                                return (
                                                    <View style={styles.hasTag}>
                                                        <Text style={{ fontSize: 16 * global.hs }}> #{val} </Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </ScrollView>
                            </View>
                        )

                    })
                }
            </ScrollView>


            <View style={styles.btnView}>
                <Button
                    title={global.PostSave[global.Lang]}
                    color="red"
                    titleStyle={{ fontSize: 20 * global.hs }}
                    buttonStyle={{
                        height: 50 * global.hs, backgroundColor: '#EA1B23',
                        borderRadius: 25 * global.hs, width: ((screenWidth - 50) * global.ws) / 2
                    }}
                    onPress={() => { postContent(props) }}
                />
                <Button
                    title={global.Draft[global.Lang]}
                    color="red"
                    titleStyle={{ fontSize: 20 * global.hs }}
                    buttonStyle={{
                        height: 50 * global.hs, marginLeft: 10 * global.ws, backgroundColor: '#000', borderWidth: 1, borderColor: "#FFF",
                        borderRadius: 25 * global.hs, width: ((screenWidth - 50) * global.ws) / 2
                    }}
                    onPress={() => { draftContent(props) }}
                />
            </View>
        </View >
    );

}

const styles = StyleSheet.create({
    btnView: {
        height: 65 * global.hs, alignItems: "center", backgroundColor: "#000",
        width: screenWidth, flexDirection: "row",
        justifyContent: 'center'
    },
    ico32: { width: 32 * global.ws, height: 32 * global.ws },
    avarta40: { width: 40 * global.ws, height: 40 * global.ws, borderRadius: 20 * global.ws ,borderWidth:1},
    ico40: { width: 40 * global.ws, height: 40 * global.ws },

    sView: {
        backgroundColor:'#FFFFFF',
    },

    mView: {
        width: (screenWidth-15), marginLeft:15, marginTop:20
    },
    snsIfView: { width: (screenWidth - 30), marginBottom: 10 * global.hs, height: 45 * global.hs},

    sns: { marginLeft: 10, width: (screenWidth - 120)},
    snsInstagram: { marginLeft: 10, marginTop:5, width: (screenWidth - 120)},

    media: {
        width: (screenWidth - 30), height: ((screenWidth - 40) * global.ws) * 0.75,
        backgroundColor: "#000", borderWidth: 1, borderColor: "#CCC",
        marginBottom: 20
    },

    container: {
        flex: 1,
    },
    hasTagView: { padding: 10 * global.ws, flexDirection: "row", marginRight: 10 * global.ws, flexWrap: "wrap", height: 150 * global.hs },
    hasTag: { backgroundColor: "#CCC", padding: 5 * global.ws, marginBottom: 10 * global.hs, marginRight: 10 * global.ws, borderRadius: 15 * global.ws },
    header: {
        padding: 20 * global.ws,
        width: screenWidth,
        height: 70 * global.hs,
        backgroundColor: '#000',
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: 'center'
    },


});
export default App;