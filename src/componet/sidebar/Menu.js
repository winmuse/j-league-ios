import React from 'react';

import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import Styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Flag from 'react-native-flags';
import '../../config/global.js'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#000',
    padding: 20,
  },

  menuView: {
    width: windowWidth,
    backgroundColor: "#000",
  },

  avatarContainer: {
    marginBottom: 20 * global.hs,
    marginTop: 30 * global.hs,
    width: windowWidth,
    alignItems: "center"
  },
  avatar: {
    width: 250 * global.ws,
    height: 70 * global.ws,
    flex: 1,
    marginBottom: 10 * global.ws
  },
  name: {
    position: 'absolute',
    left: 70 * global.ws,
    top: 20 * global.ws,
  },
  item: {
    fontSize: 18 * global.hs,
    fontWeight: '300',
    paddingTop: 14 * global.ws,
    color: '#C6C6CA',
    borderBottomWidth: 1,
  },
});

const image = require('../../img/sitelogo.png');
const menuImg = require('../../img/close.png');
const min = require('../../img/min.png');

export default function Menu({ onItemSelected, toggle, navigation }) {

  const [isEn, setLang] = React.useState(0);
  const [lang, setLangSel] = React.useState(1);


  const changeLang = (props) => {
    setLang(isEn == 0 ? 1 : 0);
    setLangSel(isEn == 0 ? 0 : 1);

    global.Lang = lang;
  }
  

  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.menuView}>
        <View>
          <TouchableOpacity onPress={() => toggle()}>
            <Image source={menuImg} style={{ width: 32 * global.ws, height: 32 * global.ws}}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={image}
          />
          <Text style={styles.name}>Your name</Text>
          <Text style={{ color: "#fff", fontSize: 20 * global.ws }}>{global.UserName} player welcome!</Text>
        </View>

        <View style={{ flexDirection: "row" }} >

          <Flag code={global.LangFlag[isEn]} size={32} style={{}} />
          <Text style={[styles.item, { paddingTop: 5 * global.hs }]} onPress={() => changeLang()}> {global.Languge[lang]}</Text>

        </View>

        <Text

          onPress={() => onItemSelected('Songs')}
          style={styles.item}
        >
          {global.Media[isEn]}
        </Text>
        <Text
          onPress={() => onItemSelected('PostList')}
          style={styles.item}
        >
          {global.Post[isEn]}
        </Text>
        <Text
          onPress={() => onItemSelected('SnsAcnt')}
          style={styles.item}
        >
          {global.Sns[isEn]}
        </Text>
        <Text

          style={styles.item}
        >
          {global.Profile[isEn]}
        </Text>
        <Text
          onPress={() => onItemSelected('PwdReset')}
          style={[styles.item, , { marginLeft: 30 * global.ws }]}
        >
          ー {global.Password[isEn]}
        </Text>
        <Text
          onPress={() => onItemSelected('PhoneReset')}
          style={[styles.item, , { marginLeft: 30 * global.ws }]}
        >
          ー {global.Phone[isEn]}
        </Text>
        <Text
          onPress={() => onItemSelected('Policy')}
          style={styles.item}
        >
          {global.Policy[isEn]}
        </Text>
        <Text
          onPress={() => onItemSelected('Terms')}
          style={styles.item}
        >
          {global.Terms[isEn]}
        </Text>
        <TouchableOpacity
          onPress={() => { navigation.navigate('Login') }}
        >
          <Text
            style={styles.item}
          >
            {global.Log[isEn]}
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView >
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
