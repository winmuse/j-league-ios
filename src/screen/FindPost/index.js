import React, { useState, useEffect, Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Image,
    Text,
    PixelRatio

} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import '../../config/global.js';
import { Button } from 'react-native-elements';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox';
import { Calendar}  from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';

const screenWidth = Dimensions.get('window').width;
const image = require('../../img/sitelogo.png');
const menuImg = require('../../img/close.png');

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

function actuatedNormalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

const App = (props) => {
    const [date, setDate] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [keyword, setKeyword] = useState('');
    const calender = React.createRef();
    const [swipeToClose, setswipeToClose] = React.useState(false);
    const [pickerdata,setPickerdata]=React.useState([]);

    function FindPage(props, flag) {
        if (flag == 1) {
            global.opt_keyword = keyword;
            global.opt_date = date;
            global.opt_player = selectedValue;
        }
        props.navigation.navigate('Main', { SelKeyword: keyword });
    }

    const handleChangedate=(day)=>{
        let yy=day.year;
        let mm=day.month;
        let dd=day.day;
        setDate(`${dd}-${mm}-${yy}`)
        calender.current.close();
    }

    useEffect(()=>{
        let data=[]
        let i=0
        let key=''
        global.PlayList.map((val,index)=>{
            console.log("---",val.user.name);
            if(index===0)
                key=val.user_id
            let originObj={label:'',value:''}
            originObj.value=val.user_id
            originObj.label=val.user.name
            data.push(originObj)
        })
        setPickerdata(data)
        setSelectedValue(key)
    },[])

    return (

        <View style={styles.container}>

            <ScrollView >

                <View style={styles.menuView}>
                    <View>
                        <TouchableOpacity onPress={() => { FindPage(props, 0) }}>
                            <Image source={menuImg} style={{ width: 32, height: 32 }} onPress={() => { FindPage(props, 0) }}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={image} />
                    </View>
                    <Text style={styles.menu}>{global.FindPlay[global.Lang]}</Text>

                    <View style={{
                        flexDirection: 'row', width: global.w - 40 * global.hs, height: 52 * global.hs, marginRight: '1%', backgroundColor: 'hsla(0,0%,100%,.3)',
                        padding: '1%', alignItems: 'center', borderColor: '#ecf0f4', borderWidth: 0.5, borderRadius: 5,
                        color: "#FFF"
                    }}>
                        <DropDownPicker
                            items={pickerdata}
                            defaultValue={selectedValue}
                            containerStyle={{height: 40,width:'100%',backgroundColor:'rgb(77,77,77)'}}
                            style={{backgroundColor: 'rgb(77,77,77)',borderColor:'rgb(77,77,77)'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            labelStyle={{color:'#fff',fontSize:16}}
                            dropDownStyle={{backgroundColor: 'rgb(77,77,77)'}}
                            onChangeItem={item => setSelectedValue(item.value)}
                        />
                    </View>

                    <Text style={styles.menu}>{global.FindKey[global.Lang]}</Text>

                    <View style={{
                        flexDirection: 'row', width: global.w - 40 * global.hs, height: 52 * global.hs, backgroundColor: 'hsla(0,0%,100%,.3)',
                        alignItems: 'center', borderColor: '#ecf0f4', borderWidth: 0.5, borderRadius: 5, fontSize: 20, paddingLeft: 15,
                        color: "#FFF", zIndex:-1
                    }}>
                        <Icon name="search" size={25} color="#FFF" style={{ marginRight: 15 }} />
                        <TextInput icon="person-add" placeholder={global.FindKeySel[global.Lang]} placeholderTextColor="#AAAAAA" style={{ fontSize: 16, color: "#FFF" }}
                            onChangeText={(text) => setKeyword(text)}
                            value={keyword}
                        >
                        </TextInput>
                    </View>

                    <Text style={styles.menu}>{global.FindDate[global.Lang]}</Text>
                    
                        <View style={{
                            flexDirection: 'row', width: global.w - 40 * global.hs, height: 52 * global.hs, backgroundColor: 'hsla(0,0%,100%,.3)',
                            alignItems: 'center', borderColor: '#ecf0f4', borderWidth: 0.5, borderRadius: 5, fontSize: 20, paddingLeft: 15,
                            color: "#FFF", justifyContent: "space-between"
                        }}>
                            <TouchableOpacity
                                onPress={() => { calender.current.open(); }}
                                style={styles.calenderbtn_container}
                            >
                                <Icon name="calendar" size={25} color="#FFF" style={{ marginRight: 15 }} />
                                <Text style={styles.datetextstyle}>{date?date:'キーワードで検索'}</Text>
                            </TouchableOpacity>
                            <Icon name="close" size={25} color="#FFF" style={{ marginRight: 15 }} onPress={() => { setDate('') }} />
                        </View>
                </View>

            </ScrollView>
            <Modal
                ref={calender}
                swipeToClose={swipeToClose}
                position={"bottom"}
                style={{ height: actuatedNormalize(300), borderTopEndRadius: 10, borderTopStartRadius: 10 }}
            >
                <View style={{ margin: actuatedNormalize(15), marginBottom: actuatedNormalize(30) }}>
                    <View style={styles.calendercontainer}>
                        <Calendar
                            current={new Date()}
                            minDate={'2012-05-10'}
                            maxDate={'2050-05-30'}
                            onDayPress={(day) => { handleChangedate(day) }}
                        />
                    </View>
                </View>
            </Modal>
            <View style={styles.btnView}>
                <Button
                    title={global.FindPost[global.Lang]}
                    color="red"
                    titleStyle={{ fontSize: 20 }}
                    buttonStyle={styles.btn}
                    onPress={() => { FindPage(props, 1) }}
                />
            </View>
        </View >
    )
}

export default App;

const styles = StyleSheet.create({
    menuView: {
        padding: 20
    },
    menu: { color: "#FFF", fontSize: 18, marginBottom: 10, marginTop: 15,zIndex:-1 },
    calenderbtn_container:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center'
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 30,
        width: screenWidth,
        //marginLeft: 30,
        alignItems: "center"
    },
    avatar: {
        width: 280,
        height: 75,
        flex: 1,
        marginBottom: 10
    },
    container: {
        flex: 1,
        backgroundColor: "#000"
    },

    btnView: {
        height: 65, alignItems: "center", backgroundColor: "#000",
        width: screenWidth, flexDirection: "row",
        justifyContent: 'center'
    },
    calendercontainer:{
        backgroundColor:'#fff'
    },
    datetextstyle:{
        color:'#fff',
        textAlign:'left',
        fontSize:16
    },
    btn: { height: 50, backgroundColor: '#EA1B23', marginBottom: 30, borderRadius: 20, width: screenWidth - 30 },
    ico40: { width: 40, height: 40 },


    textInput: {
        height: 40,
        borderColor: '#CCC', borderWidth: 1,

        marginTop: 8,
        borderRadius: 5,
        padding: 3,
    },


});
