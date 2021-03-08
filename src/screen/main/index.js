/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';

import {

  Colors,

} from 'react-native/Libraries/NewAppScreen';
import { Dimensions } from 'react-native';
import Sidebar from '../../componet/sidebar/Basic';
import '../../config/global.js'


const App = (props) => {


  const [screen, setScreen] = useState(props.navigation.getParam('selMenu'));


  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{ backgroundColor: "red" }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}

        >
          <View style={styles.body}>
            <Sidebar navigation={props.navigation} screen={screen} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};



const styles = StyleSheet.create({

  scrollView: {
    backgroundColor: "red",
    height: global.h,

  },

  body: {
    backgroundColor: Colors.lighter,
    width: global.w,
    height: global.h,
  },

});

export default App;
