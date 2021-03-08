/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
 
} from 'react-native';
import { WebView } from 'react-native-webview';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Dimensions } from 'react-native';



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const App = (props) => {
    return (
        <>        
            <SafeAreaView>
                <ScrollView style={styles.scrollView}>
                    <WebView source={{ uri: 'https://auth.jleague.jp/contents/privacypolicy.html' }} style={styles.body} />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const logWidth = 270;
const loghight = 220;
const styles = StyleSheet.create({

    scrollView: {
        backgroundColor: Colors.lighter,
    },
    body: {
        backgroundColor: "#eee",
        width: screenWidth,
        height: screenHeight * 6,

    },



    engine: {
        position: 'absolute',
        right: 0,
    },


});

export default App;
