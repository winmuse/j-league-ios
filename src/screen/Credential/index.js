import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Image,
    Text,

} from 'react-native';

import '../../config/global.js';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';


const screenWidth = global.w;


const App = (props) => {

    let item_s = [];
    const [items, setItems] = useState([]);

    useEffect(() => {

        console.log(">>>>", global.SelSnsRes);

        for (var index = 0; index < global.SnsRes.length; index++) {
                item_s[index] = false;
        }

        setItems(item_s);
    }, []);

    const changeStatus = (index, val) => {

        for (var i = 0; i < items.length; i++) {
            if (i !== index)
                item_s[i] = items[i];
            else
                item_s[i] = val;
        }
        setItems(item_s);
    }

    const postContent = (props) => {

        global.SelSnsRes = [];

        let flag = 0;
        for (var i = 0; i < items.length; i++) {
            if (items[i] == true) {

                global.SelSnsRes.push(global.SnsRes[i]);
                flag = 1;
            }
        }
        console.log("fff", props.navigation.getParam('SelMenu'));

        props.navigation.navigate(props.navigation.getParam('SelMenu'), { SelSnsRes: global.SelSnsRes });
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>

                <TouchableOpacity onPress={() => { postContent(props) }} >
                    <Image source={require('../../img/ClosePost.png')} style={{ width: 32 * global.ws, height: 32 * global.ws }} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ height: global.h - 135 * global.hs, backgroundColor: "#EEEEEE" }}>
                {

                    global.SnsRes.map((val, index) => {

                        return (
                            <View style={styles.snsView}>
                                <View style={{ width: 50, marginLeft: 20 }}>
                                    {val.type === "twitter" ?
                                        <Image source={require('../../img/icon-twitter-circle.png')} style={styles.ico30} />
                                        : val.type === "instagram" ?
                                            <Image source={require('../../img/icon-instagram-circle.png')} style={styles.ico30} />
                                            : val.type === "facebook" ?
                                                <Image source={require('../../img/icon-facebook-circle.png')} style={styles.ico30} />
                                                : <Text>???</Text>
                                    }
                                </View>
                                <Text style={{ fontSize: 15 * global.hs, width: screenWidth - 180 * global.hs, marginLeft:-10 }}>@{val.account_name}</Text>

                                <View style={{ width: 30 * global.ws, marginRight: 20 * global.ws }}>
                                    <CircleCheckBox
                                        style={{ width: 20, height:20}}
                                        checked={items[index]}
                                        onToggle={(checked) => changeStatus(index, checked)}
                                    />

                                </View>

                            </View>
                        )
                    })
                }


            </ScrollView>
            <View style={styles.btnView}>
                <Button
                    title={global.CredentialSave[global.Lang]}
                    color="red"
                    titleStyle={{ fontSize: 17 * global.hs }}
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
    btnView: { height: 65 * global.hs, alignItems: "center", backgroundColor: "#000", width: screenWidth, justifyContent: "center" ,marginBottom:20},
    btn: { height: 45 * global.hs, backgroundColor: '#EA1B23', borderRadius: 20 * global.hs, width: screenWidth - 30 * global.ws },

    ico30: { width: 30, height: 30 },
    snsView: {
        marginTop: 3 * global.hs, height: 70 * global.hs, flexDirection: "row", justifyContent: "space-between",
        backgroundColor: "#FFF", width: screenWidth - 40 * global.ws, marginLeft: 20 * global.ws, alignItems: 'center', flex: 1
    },
    header: {
        paddingVertical: 10 * global.ws,
        paddingHorizontal: 20 * global.ws,
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
        width: screenWidth - 30, marginLeft: 15 * global.ws,
        borderColor: '#CCC', borderWidth: 1,
    },
    textInput: {
        height: 40 * global.hs,
        borderColor: '#CCC', borderWidth: 1,

        marginTop: 8 * global.hs,
        borderRadius: 5 * global.hs,
        padding: 3 * global.ws,
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

export default App;