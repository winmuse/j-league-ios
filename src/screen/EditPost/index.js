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

import { TouchableOpacity } from 'react-native-gesture-handler';
import { call } from 'react-native-reanimated';
import RNFetchBlob from "rn-fetch-blob";;

const screenWidth = global.w;
const screenHeight = global.h;
let saveTxt = global.NewPostDraft[global.Lang];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: {
                tag: '',
                tagsArray: global.tagsArray,
            },
            tagsColor: '#fff',
            tagsText: '#fff',
            content: global.Content,
            contentStatus: global.PostContentTxt[global.Lang],
            contentLen: '0/140',
            mediaRes: global.SelMediaRes,
            savePre: false,
            saveOk: false,
        };
        call

    }


    updateTagState = (state) => {
        this.setState({
            tags: state
        })
    };

    render() {
        const postContent = (props, statue) => {

            if (statue == 1) saveTxt = global.NewPostPost[global.Lang];

            global.Content = this.state.content;


            global.SelHashTagRes = this.state.tags.tagsArray;
            console.log("FF", "OK");

            let draftPost = new Object();

            draftPost.comments = [];
            draftPost.content = global.Content;

            draftPost.tags = [];

            for (let i = 0; i < global.DefHashTagRes.length; i++) {
                draftPost.tags.push(global.DefHashTagRes[i]);
            }

            for (let i = 0; i < global.SelHashTagRes.length; i++) {
                draftPost.tags.push(global.SelHashTagRes[i]);
            }

            draftPost.status = statue;

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

            draftPost.id = global.SelPostID;

            global.SelSnsRes.map((val, index) => {
                let sns = new Object();
                sns.sns = val.type;
                sns.id = val.id;
                targets.push(sns);
            })

            draftPost.targets = targets;

            
            this.setState({ savePre: true });

            RNFetchBlob.config({
                trusty: true
            }).fetch('POST', global.host + '/api/update_post?token=' + global.Token, {
                'Content-Type': 'application/json',
                'Transfer-Encoding': 'Chunked'
            }, JSON.stringify(draftPost))
                .then(res => res.json())
                .then(function (res) {
                    
                })
                .catch((errorMessage, statusCode) => {
                    console.log("FFFFFF", errorMessage)
                })

        }



        const mediaUrl = (props) => {
            global.RePostList = true;
            props.navigation.navigate('Main');
        }
        const Credential = (props) => {
            props.navigation.navigate('Credential', { SelMenu: 'EditPost' });
        }

        const mediaDel = (props, selid) => {

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


            let len = "";
            let con = txt.content;

            console.log("DDw", con.length);

            if (con.length > 0) {

                len = con.length + "/140";
                con = '';

            } else {

                len = "0/140";
                con = global.PostContentTxt[global.Lang];

            }

            if (txt.content.length < 140) {

                this.setState({ contentLen: len });
                this.setState({ content: txt.content });
                this.setState({ contentStatus: con });
            }
        }

        let snsstatus = global.PostSnsTxt[global.Lang];

        if (global.SelSnsRes.length > 0) snsstatus = "";

        return (
            <View style={styles.container}>
                {
                    this.state.savePre == true ?
                        <View style={{
                            width: screenWidth, height: screenHeight, backgroundColor: 'hsla(187,0%,0%,.9)', zIndex: 9999999,
                            position: "absolute", left: 0, top: 0, paddingTop: screenHeight / 4 - 80 * global.hs, alignItems: "center"
                        }}>
                            
                                <View style={{ width: screenWidth - 40, height: screenHeight / 2, backgroundColor: "#FFF", alignItems: "center", justifyContent: "center" }}>
                                    <Image source={require('../../img/done.png')} style={{ width: 135 * global.ws, height: 95 * global.ws }} />
                                    <Text style={{ marginTop: 50 * global.hs, marginBottom: 50 * global.hs, fontSize: 18 * global.hs, }}>{saveTxt}</Text>

                                    <Button
                                        title={global.NewPostGoPage[global.Lang]}
                                        titleStyle={{ fontSize: 16 * global.hs, color: "#EA1B23", fontWeight: "bold" }}
                                        buttonStyle={{
                                            height: 50 * global.hs, marginLeft: 10 * global.ws, backgroundColor: '#FFF', borderWidth: 2, borderColor: "#EA1B23", color: "#EA1B23",
                                            borderRadius: 25 * global.hs, width: (screenWidth - 100 * global.ws) / 2
                                        }}
                                        onPress={() => { global.RePostList = true; this.props.navigation.navigate('Main', { selMenu: 'Media' }); }}
                                    />

                                </View>
                        </View>
                        :
                        <View></View>
                }
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { mediaUrl(this.props) }} >
                        <Image source={require('../../img/ClosePost.png')} style={styles.ico32} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ height: global.h - 135 * global.hs }}>
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

                        <View style={{ width: 30 * global.ws }}>
                            <TouchableOpacity onPress={() => { Credential(this.props) }} >
                                <Image source={require('../../img/add.jpg')} style={{ width: 32 * global.ws, height: 32 * global.ws, marginRight: 10 * global.ws }} />
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
                                                    style={{ flex: 1, alignItems: "flex-end", paddingRight: 10 * global.ws, paddingTop: 10 * global.h }} >

                                                    <TouchableOpacity onPress={() => { mediaDel(this.props, val.id) }}>
                                                        <Image source={require('../../img/images.jpg')} style={{ width: 30 * global.ws, height: 30 * global.hs, borderRadius: 15 * global.ws }}
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

                    <Text style={{ fontSize: 16 * global.hs, marginLeft: 15 * global.ws }}>{global.DefaultTagMenu[global.Lang]}</Text>
                    <View style={styles.defTag}>

                        {
                            global.DefHashTagRes.map((val, index) => {
                                return (
                                    <Text style={styles.defTagTxt}>{val}</Text>
                                )

                            })
                        }

                    </View>

                    <View style={styles.customContainer}>
                        <TagInput
                            updateState={this.updateTagState}
                            tags={this.state.tags}
                            placeholder={"#" + global.Hashtag[global.Lang]}
                            label={global.Hashtag[global.Lang]}
                            labelStyle={{ color: '#000', fontSize: 16 * global.hs }}
                            //   leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText} />}
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
                    <View style={{ marginLeft: 15 * global.ws, marginTop: 10 * global.hs }}>
                        <Text style={{ fontSize: 16 * global.hs }}>定型テキスト</Text>
                        <View style={{
                            marginTop: 5 * global.hs, borderColor: '#CCC', borderWidth: 1, width: screenWidth - 30 * global.ws,
                            backgroundColor: "#FFFFFF", height: 80
                        }}>

                        </View>
                    </View>
                </ScrollView>
                <View style={styles.btnView}>
                    <Button
                        title={global.PostSave[global.Lang]}
                        color="red"
                        titleStyle={{ fontSize: 18 * global.hs }}
                        buttonStyle={{
                            height: 50 * global.hs, backgroundColor: '#EA1B23',
                            borderRadius: 25 * global.hs, width: (screenWidth - 100 * global.ws) / 2
                        }}
                        onPress={() => { postContent(this.props, 1) }}
                    />
                    <Button
                        title={global.Draft[global.Lang]}
                        color="red"
                        titleStyle={{ fontSize: 18 * global.hs }}
                        buttonStyle={{
                            height: 50 * global.hs, marginLeft: 10 * global.ws, backgroundColor: '#000', borderWidth: 1, borderColor: "#FFF",
                            borderRadius: 25 * global.hs, width: (screenWidth - 100 * global.ws) / 2
                        }}
                        onPress={() => { postContent(this.props, 0) }}
                    />
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    txtArea: { width: screenWidth - 40 * global.ws, marginLeft: 5 * global.ws, marginBottom: 10 * global.ws, backgroundColor: "#EEE" },

    container: {
        flex: 1,
    },

    btnView: { height: 65 * global.hs, backgroundColor: "#000", width: screenWidth, flexDirection: "row", justifyContent: "center", alignItems: "center" },

    btn: {
        height: 50 * global.hs, marginLeft: 15 * global.ws, backgroundColor: '#EA1B23', marginTop: 10 * global.hs, borderRadius: 20 * global.hs,
        width: screenWidth - 30 * global.ws
    },
    snsView: {
        backgroundColor: "#FFF", height: 55 * global.hs, marginTop: 20 * global.hs, marginBottom: 5 * global.hs, paddingTop: 5 * global.hs, paddingRight: 10 * global.hs,
        paddingLeft: 10 * global.ws, borderColor: '#CCC', borderWidth: 1, width: screenWidth - 30 * global.ws, marginLeft: 15 * global.ws, flexDirection: "row",
        alignItems: "center"
    },
    snsList: { flexDirection: "row", flex: 1, marginLeft: 2 * global.ws, height: 30 * global.hs, borderRadius: 5 * global.ws, padding: 3 * global.ws },
    mediaView: {
        borderColor: '#CCC', borderWidth: 1,
        backgroundColor: "#FFF", marginBottom: 15 * global.hs, width: screenWidth - 30 * global.ws, marginLeft: 15 * global.ws
    },
    mediaList: {
        height: 190 * global.hs, width: screenWidth - 40 * global.ws, padding: 5 * global.hs, flexGrow: 1,
        flexDirection: 'row', flexWrap: 'wrap'
    },
    media: { width: 180 * global.ws, height: 180 * global.hs, backgroundColor: "#000", borderWidth: 1, borderColor: "#fff" },
    defTag: {
        width: screenWidth - 30 * global.ws, marginLeft: 15 * global.ws, borderColor: '#CCC', borderWidth: 1, backgroundColor: "#FFF", marginBottom: 15,
        padding: 10, flexDirection: "row"
    },
    defTagTxt: {
        backgroundColor: "#EEE", height: 35 * global.hs, textAlign: "center", paddingTop: 5 * global.hs, fontSize: 14 * global.hs
        , borderRadius: 5 * global.hs, borderColor: "#CCC", width: 100 * global.ws, borderRadius: 20 * global.hs, marginTop: 5 * global.hs
    },
    ico25: { width: 25 * global.ws, height: 25 * global.hs },
    ico32: { width: 32 * global.ws, height: 32 * global.hs },
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
        padding: 3 * global.hs,
    },
    tag: {
        backgroundColor: "#EEE",
        height: 35 * global.hs,
        borderWidth: 0
    },
    tagText: {
        color: "#000"
    },
});
