import React, { Component, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ImageBackground,
    TextInput,

} from 'react-native';

import '../../config/global.js';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import TagInput from 'react-native-tags-input';
import { ScrollView } from 'react-native-gesture-handler';

import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { call } from 'react-native-reanimated';

const screenWidth = global.w;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: {
                tag: '',
                tagsArray: []
            },
            tagsColor: '#fff',
            tagsText: '#fff',
            content: '',
            contentStatus: global.PostContentTxt[global.Lang],
            contentLen: '0/140',
            mediaRes: global.SelMediaRes,

            instaCheck: false,

        };
        call

    }


    updateTagState = (state) => {
        this.setState({
            tags: state
        })
    };

    render() {


        const postContent = (props) => {


            global.Content = this.state.content;


            if (global.SelSnsRes.length < 1) {
                alert(global.SnsOk[global.Lang]);
                return false;
            }

            let flag = 0;

            for (var i = 0; i < global.SelSnsRes.length; i++) {

                if (global.SelSnsRes[i].type == "instagram") {
                    flag = 1;
                }

            }

            if (global.Content.length < 1) {
                alert(global.ContentOk[global.Lang]);
                return false;
            }



            if (this.state.mediaRes.length < 1) {
                alert("Check the media.");
                return false;
            }

            global.SelHashTagRes = this.state.tags.tagsArray;

            props.navigation.navigate('NewPostSave');
        }

        const mediaUrl = (props) => {
            props.navigation.navigate('Main');
        }
        const Credential = (props) => {
            this.setState({ instaCheck: false });
            props.navigation.navigate('Credential', { SelMenu: 'NewPost' });
        }

        const mediaDel = (props, selid) => {

            this.setState({ instaCheck: false });
            let res = [];

            global.SelMediaRes.map((val, index) => {

                if (val.id != selid) {
                    res.push(val);
                }
            })
            global.SelMediaRes = res;


            this.setState({ mediaRes: res });
        }

        const contetnChange = (txt) => {

            this.setState({ instaCheck: false });
            let len = "";
            let con = txt.content;

            if (con.length > 0) {

                len = con.length + "/140";
                con = '';

            } else {

                len = "0/140";
                con = global.PostContentTxt[global.Lang];

            }


            if (txt.content.length < 140) {

                this.setState({ contentLen: len });
                this.setState({ content: txt });
                this.setState({ contentStatus: con });
            }

        }

        let snsstatus = global.PostSnsTxt[global.Lang];

        if (global.SelSnsRes.length > 0) snsstatus = "";

        return (


            <View style={styles.container}>
                {
                    this.state.instaCheck === true ?

                        <View style={{ width: global.w, height: 60, justifyContent: "center", backgroundColor: "#FF0000", zIndex: 9999, position: "absolute" }}>
                            <TouchableOpacity onPress={() => { this.setState({ instaCheck: false }) }} >
                                <Text style={{ fontSize: 16, color: "#FFF", marginLeft: 10 }}>{global.NewPostIgMsg[global.Lang]}</Text>
                            </TouchableOpacity>
                        </View>

                        :
                        <View style={{ position: "absolute" }}></View>
                }
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { mediaUrl(this.props) }} >
                        <Image source={require('../../img/ClosePost.png')} style={styles.ico25} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ height: global.h - 135 * global.hs, backgroundColor: "#EEEEEE" }}>
                    <View style={styles.snsView}>
                        <View style={{ width: screenWidth - 80 * global.ws, flexDirection: "row", flex: 1 }}>
                            {

                                global.SelSnsRes.length === 0 ? <Text>{global.PostSnsSelTxt[global.Lang]}</Text>
                                    :
                                    global.SelSnsRes.map((val, index) => {

                                        return (
                                            <View style={styles.snsList}>
                                                {val.type === "twitter" ?
                                                    <Image source={require('../../img/icon-twitter-circle.png')} style={styles.ico25} />
                                                    : val.type === "instagram" ?
                                                        <Image source={require('../../img/icon-instagram-circle.png')} style={styles.ico25} />
                                                        : val.type === "facebook" ?
                                                            <Image source={require('../../img/icon-facebook-circle.png')} style={styles.ico25} />
                                                            : <Text>???</Text>
                                                }
                                                <Text style={{ fontSize: 16 * global.hs }}> @{val.account_name}</Text>
                                            </View>
                                        );
                                    })
                            }
                        </View>

                        <View style={{ width: 30 }}>
                            <TouchableOpacity onPress={() => { Credential(this.props) }} >
                                <Image source={require('../../img/add.jpg')} style={{ width: 25 * global.hs, height: 25 * global.hs, marginRight: 10 * global.ws, marginTop:-10 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ marginLeft: 15 * global.ws, color: "#FF3860" }}>{snsstatus}</Text>

                    <View style={styles.mediaView}>
                        <ScrollView style={styles.mediaList}
                            horizontal={true}
                        >
                            {
                                this.state.mediaRes.length === 0 ? <Text></Text>
                                    :
                                    this.state.mediaRes.map((val, index) => {

                                        return (

                                            <View style={styles.media}>

                                                <ImageBackground source={{ uri: unescape(decodeURIComponent(val.thumb_url)) }}
                                                    style={{ flex: 1, alignItems: "flex-end", paddingRight: 10, paddingTop: 10 }} >

                                                    <TouchableOpacity onPress={() => { mediaDel(this.props, val.id) }}>
                                                        <Image source={require('../../img/images.jpg')} style={{ width: 20 * global.hs, height: 20 * global.hs, borderRadius: 15 * global.hs, marginTop:-10,marginRight:-10 }}
                                                        >
                                                        </Image>

                                                    </TouchableOpacity>
                                                </ImageBackground>

                                            </View>
                                        )
                                    })
                            }
                        </ScrollView>
                        <TextInput style={styles.txtArea}
                            multiline={true} numberOfLines={3} placeholder={global.ContentMenu[global.Lang] + "(Placeholder）"}
                            onChangeText={(text) => contetnChange({ content: text })}
                            value={this.state.content} maxLength={140}
                        >
                        </TextInput>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 * global.hs }}>
                            <Text style={{ color: "#FF3860", marginLeft: 5 * global.ws }}> {this.state.contentStatus}</Text>
                            <Text style={{ marginRight: 5 * global.ws }}>{this.state.contentLen}</Text>
                        </View>
                    </View>

                    <Text style={{ fontSize: 14 * global.hs, marginLeft: 20 * global.ws , marginBottom: 20 * global.ws}}>{global.DefaultTagMenu[global.Lang]}</Text>
                    <View style={styles.defTag}>

                        {
                            global.DefHashTagRes.map((val, index) => {
                                return (
                                    <Text style={styles.defTagTxt}>{val}</Text>
                                )
                            })
                        }

                    </View>
                    <Text style={{ fontSize: 14 * global.hs, marginLeft: 20 * global.ws , marginBottom: 20 * global.ws}}>{global.Hashtag[global.Lang]}</Text>
                    <View style={styles.customContainer}>
                        <TagInput
                            updateState={this.updateTagState}
                            tags={this.state.tags}
                            placeholder={"#" + global.Hashtag[global.Lang]}
                            // label={global.Hashtag[global.Lang]}
                            labelStyle={{ color: '#000', fontSize: 16 * global.hs }}
                            leftElementContainerStyle={{ marginLeft: 3 * global.ws }}
                            containerStyle={{ width: global.w - 40 * global.ws }}
                            inputContainerStyle={[styles.textInput]}
                            inputStyle={{ color: this.state.tagsText, fontSize: 16 * global.hs }}
                            onFocus={() => this.setState({ tagsColor: '#fff', tagsText: '#000' })}
                            onBlur={() => this.setState({ tagsColor: '#fff', tagsText: '#000' })}
                            autoCorrect={false}
                            tagStyle={styles.tag}
                            tagTextStyle={styles.tagText}

                            keysForTag={', '} />
                    </View>
                    <View style={{ marginLeft: 15 * global.ws, marginTop: 10 * global.hs , marginTop: 20 * global.ws}}>
                        <Text style={{ fontSize: 14 * global.hs , marginBottom: 20 * global.ws}}>定型テキスト</Text>
                        <View style={{
                            marginTop: 5 * global.hs, borderColor: '#CCC', borderWidth: 1, width: screenWidth - 30 * global.ws,
                            backgroundColor: "#FFFFFF", height: 50, marginBottom: 230, marginBottom: 20 * global.ws
                        }}>

                        </View>
                    </View>
                </ScrollView>
                <View style={styles.btnView}>
                    <Button
                        title={global.PostCheck[global.Lang]}
                        color="red"
                        titleStyle={{ fontSize: 17 * global.hs }}
                        buttonStyle={styles.btn}
                        onPress={() => { postContent(this.props) }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    txtArea: { width: screenWidth - 40 * global.ws, height: 120 * global.hs, paddingHorizontal:15 * global.ws , paddingTop: 15 * global.ws , marginLeft: 5 * global.ws, marginBottom: 10 * global.hs, backgroundColor: "#EEE" },

    btnView: { height: 65 * global.hs, alignItems: "center", backgroundColor: "#000", width: screenWidth, justifyContent: "center" ,marginBottom:20},
    btn: { height: 45 * global.hs, backgroundColor: '#EA1B23', borderRadius: 20 * global.hs, width: screenWidth - 30 * global.ws },
    snsView: {
        backgroundColor: "#FFF", height: 55 * global.ws, marginTop: 20 * global.hs, marginBottom: 5 * global.hs, paddingTop: 5 * global.hs, paddingRight: 10 * global.ws,
        paddingLeft: 10, borderColor: '#fff', borderWidth: 1, width: screenWidth - 30, marginLeft: 15, flexDirection: "row",
        alignItems: "center",
    },

    container: {
        flex: 1,
        backgroundColor: "#000"

    },

    snsList: { flexDirection: "row", flex: 1, marginLeft: 2 * global.ws, height: 30 * global.hs, borderRadius: 5 * global.hs, padding: 3 * global.hs },
    mediaView: {
        borderColor: '#CCC', borderWidth: 1,
        backgroundColor: "#FFF", marginBottom: 15 * global.hs, width: screenWidth - 30 * global.ws, marginLeft: 15 * global.ws
    },

    mediaList: {
        height: 190 * global.hs, width: screenWidth - 40 * global.ws, padding: 5 * global.hs, flexGrow: 1,
        flexDirection: 'row', flexWrap: 'wrap'
    },

    media: { width: (screenWidth - 40 * global.ws) / 2, height: (screenWidth - 40 * global.ws) / 2, backgroundColor: "#000", borderWidth: 1, borderColor: "#fff" },

    defTag: {
        width: screenWidth - 30 * global.ws, marginLeft: 15 * global.hs, borderColor: '#CCC', borderWidth: 1, backgroundColor: "#FFF", marginBottom: 15,
        padding: 10 * global.hs, flexDirection: "row"
    },
    defTagTxt: {
        backgroundColor: "#EEE", height: 25 * global.hs, textAlign: "center", paddingTop: 5 * global.hs, fontSize: 14 * global.hs
        , borderColor: "#CCC", width: 100 * global.ws, marginTop: 5 * global.hs, borderRadius: 5 * global.hs, 
    },
    ico25: { width: 25 * global.ws, height: 25 * global.ws },
    ico32: { width: 32 * global.ws, height: 32 * global.ws },
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
    customContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#FFF",
        width: screenWidth - 30 * global.ws, marginLeft: 15 * global.ws,
        borderColor: '#CCC', borderWidth: 1,
    },
    textInput: {
        height: 40 * global.hs,
        borderColor: '#CCC', borderWidth: 1,
        marginTop: 8 * global.hs,
        borderRadius: 5 * global.hs,
    },
    tag: {
        backgroundColor: "#EEE",
        height: 35,
        borderWidth: 0
    },
    tagText: {
        color: "#000"
    },
});
