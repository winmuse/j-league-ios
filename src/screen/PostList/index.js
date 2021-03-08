import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

import { Tab, Tabs } from "native-base";
import { BaseColor } from "@config";

import '../../config/global.js';
import { ScrollView } from 'react-native-gesture-handler';
import Video from 'react-native-video';
import RNFetchBlob from "rn-fetch-blob";
import Moment from 'moment';

let screenWidth = global.w;
let screenHeight = global.h;
const TAB_PROPS = {
    tabBarOptions: {
        labelStyle: {
            fontSize: 20 * global.c,
            margin: 0,
            padding: 0,
        },
    },
    tabStyle: { width: "100%", backgroundColor: BaseColor.whiteColor },
    activeTabStyle: {
        width: "100%", backgroundColor: BaseColor.whiteColor, borderBottomColor: "#EA1B23",
        borderBottomWidth: 3 * global.c
    },

    textStyle: { color: BaseColor.blackColor, fontSize: 18 * global.c },
    activeTextStyle: { color: "#EA1B23", fontSize: 18 * global.c }

};


const App = (props) => {

    if (screenWidth > 412) mediaSize = screenWidth / 3; else mediaSize = 137 * global.ws;
    const [PostList, setPostList] = useState([]);
    const [loadOk, setLoadOk] = useState(false);

    if (global.RePostList == true) {

        RNFetchBlob.config({
            trusty: true
        }).fetch('GET', global.host + '/api/post_list?token=' + global.Token, {

            'Authorization': global.Token,

        })
            .then(res => res.json())
            .then(function (res) {

                global.PostList = res;
                setPostList(res);

            })
            .catch((errorMessage, statusCode) => {

            })

        global.RePostList = false;
    }

    useEffect(() => {
        setLoadOk(true);
        RNFetchBlob.config({
            trusty: true
        }).fetch('GET', global.host + '/api/post_list?token=' + global.Token, {

            'Authorization': global.Token,

        })
            .then(res => res.json())
            .then(function (res) {
                setLoadOk(false);
                global.PostList = res;
                setPostList(res);
            })
            .catch((errorMessage, statusCode) => {
                setLoadOk(false);
            })

    }, []);


    function edit(val, props) {

        global.EditPosRes = val;
        global.SelSnsRes = [];
        let items = val.providers;

        for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < global.SnsRes.length; j++) {
                if (global.SnsRes[j].id == items[i].credential_id) {
                    global.SelSnsRes.push(global.SnsRes[j]);
                }
            }
        }
        global.SelMediaRes = val.medias;
        global.tagsArray = [];

        for (let i = 1; i < val.tags.length; i++) {
            global.tagsArray.push(val.tags[i].name);
        }

        global.Content = val.description;
        global.SelPostID = val.id;
        props.navigation.navigate('EditPost');

    }

    function renderTab1() {

        return (

            <ScrollView style={styles.rander} >
                
                {

                    PostList.privates ?

                        PostList.privates.map((val, index) => {

                            return (
                                <>
                                    <TouchableOpacity onPress={() => { edit(val, props) }} >
                                        <View style={styles.postView} >
                                            <View>
                                                <View style={{ flexDirection: "row", }}>
                                                    {
                                                        val.providers.map((res, num) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        res.sns === "twitter" ?
                                                                            <>
                                                                                <Image source={require('../../img/icon-twitter-circle.png')} style={styles.snsImg} />
                                                                            </>

                                                                            : res.sns === "instagram" ?
                                                                                <>
                                                                                    <Image source={require('../../img/icon-instagram-circle.png')} style={styles.snsImg} />
                                                                                </>
                                                                                : res.sns === "facebook" ?
                                                                                    <>
                                                                                        <Image source={require('../../img/icon-facebook-circle.png')} style={styles.snsImg} />
                                                                                    </>
                                                                                    : <>
                                                                                        <Image source={require('../../img/icon-instagram-circle.png')} style={styles.snsImg} />
                                                                                    </>
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }

                                                </View>
                                                <View style={{ width: screenWidth - 200 * global.c, flexWrap: "wrap" }}>
                                                    <Text style={{ fontSize: 14 * global.c, width: '100%' }}>{val.description}</Text>
                                                    <Text style={{ fontSize: 12 * global.c, width: '100%', marginTop: 5 }}>投稿予定日時 : {Moment(val.created_at).format('YYYY.MM.DD HH.MM')}</Text>
                                                </View>
                                            </View>
                                            {//
                                                val.medias.length>0 ?
                                                val.medias[0].extension === "MP4" ?
                                                    <Video
                                                        onFullScreen={true}
                                                        source={{ uri: val.medias[0].video_url }}
                                                        style={styles.media}
                                                        autoplay={false}
                                                        muted={true}
                                                        resizeMode={'cover'}
                                                    />
                                                    :
                                                    <Image source={{ uri: val.medias[0].thumb_url }} style={styles.media} />
                                                :
                                                <Image source={{ uri: "" }} style={styles.media} />
                                            }
                                        </View>
                                    </TouchableOpacity>
                                </>
                            )
                        })
                        : <Text></Text>

                }
            </ScrollView>

        );
    }


    function renderTab2() {
        return (
            <ScrollView style={styles.rander} >
                {
                    PostList.publics ?
                        PostList.publics.map((val, index) => {
                            return (
                                <>
                                    <View style={styles.postView}>
                                        <View>
                                            <View style={{ flexDirection: "row", }}>
                                                {
                                                    val.providers.map((res, num) => {
                                                        return (
                                                            <>
                                                                {
                                                                    res.sns === "twitter" ?
                                                                        <>
                                                                            <Image source={require('../../img/icon-twitter-circle.png')} style={styles.snsImg} />
                                                                        </>

                                                                        : res.sns === "instagram" ?
                                                                            <>
                                                                                <Image source={require('../../img/icon-instagram-circle.png')} style={styles.snsImg} />
                                                                            </>
                                                                            : res.sns === "facebook" ?
                                                                                <>
                                                                                    <Image source={require('../../img/icon-facebook-circle.png')} style={styles.snsImg} />
                                                                                </>
                                                                                : <>
                                                                                    <Image source={require('../../img/icon-instagram-circle.png')} style={styles.snsImg} />
                                                                                </>
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }

                                            </View>
                                            <View style={{ width: screenWidth - 200 * global.c, flexWrap: "wrap", }}>
                                                <Text style={{ fontSize: 16 * global.c, width: '100%' }}>{val.description}</Text>
                                                <Text style={{ fontSize: 12 * global.c, width: '100%', marginTop: 5 }}>投稿予定日時 : {Moment(val.created_at).format('YYYY.MM.DD HH.MM')}</Text>
                                            </View>
                                        </View>{
                                            val.medias.length>0 ?
                                            val.medias[0].extension === "MP4" ?
                                                <Video
                                                    onFullScreen={true}
                                                    source={{ uri: val.medias[0].video_url }}
                                                    style={styles.media}
                                                    autoplay={false}
                                                    muted={true}
                                                    resizeMode={'cover'}
                                                />
                                                :
                                                <Image source={{ uri: val.medias[0].thumb_url }} style={styles.media} />
                                            :
                                            <Image source={{ uri: "" }} style={styles.media} />
                                        }
                                    </View>
                                </>
                            )
                        })
                        : <Text></Text>
                }
            </ScrollView>
        );
    }



    return (
        <View>
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
            <Tabs tabBarUnderlineStyle={{ backgroundColor: "#EA1B23", borderRadius: 3 * global.c, height: 3 * global.c }}>
                <Tab heading={global.DraftTxt[global.Lang]} {...TAB_PROPS} >
                    {renderTab1()}
                </Tab>
                <Tab heading={global.PostTxt[global.Lang]} {...TAB_PROPS}>
                    {renderTab2()}
                </Tab>
            </Tabs>
        </View>
    );
}



const styles = StyleSheet.create({
    topButton: {
        height: 40 * global.c,
        flex: 1 * global.c,
        borderRadius: 2 * global.c,
    },
    topButtonText: {
        color: BaseColor.grayColor,
        fontSize: 15 * global.c,
        fontWeight: 'bold'
    },
    activeBtn: {
        borderBottomColor: "#EA1B23",
        borderBottomWidth: 3 * global.c
    },
    body: { backgroundColor: "#EEE", height: global.h - 75 * global.c },

    postView: {
        backgroundColor: "#FFF", width: screenWidth - 40 * global.c, padding: 15 * global.c, marginBottom: 10 * global.c,
        flexDirection: "row", justifyContent: "center",
    },
    media: { width: 130 * global.c, height: 100 * global.c, backgroundColor: "#000", borderWidth: 1, borderColor: "#fff", marginLeft: 10 * global.c },
    snsImg: {
        width: 25 * global.c, height: 25 * global.c, borderRadius: 12 * global.c, marginRight: 10 * global.c
    },
    rander: {
        flex: 1, backgroundColor: "#EEE" 
        //padding: 20 * global.c, height: global.h - 75 * global.c
    }
});
export default App;