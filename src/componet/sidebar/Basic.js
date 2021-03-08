import React from 'react';

import {

  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import SideMenu from 'react-native-side-menu-over';

import styles from './style';
import Menu from './Menu';
import Media from '../../screen/Media';
import PostList from '../../screen/PostList';
import SnsAcnt from '../../screen/SnsAcnt';
import PwdReset from '../../screen/PwdReset';
import PhoneReset from '../../screen/PhoneReset';
import Policy from '../../screen/Policy';
import Terms from '../../screen/Terms';
import Instagrm from '../../screen/Instagram';

const image = require('../../img/menu.png');

const Basic = (props) => {
  const [isOpen, setIsopen] = React.useState(false);
  const [selectedItem, setSelecteItem] = React.useState(props.screen);

  const toggle = () => {
    setIsopen(!isOpen)
  }

  const updateMenuState = (isOpen) => {
    setIsopen(isOpen)
  }

  const onMenuItemSelected = (item) => {
    global.RePostList = true;
    setIsopen(false);
    setSelecteItem(item);
  }

  const findPost = (props) => {
    global.RePostList = true;
    props.navigation.navigate('FindPost');
  }

  const menu = <Menu onItemSelected={onMenuItemSelected} toggle={toggle} navigation={props.navigation} />;

  return (
    <SideMenu
      menu={menu}
      openMenuOffset={global.w}
      isOpen={isOpen}
      onChange={isOpen => updateMenuState(isOpen)}
    >
      <View
        style={styles.header}
      >
        <TouchableOpacity onPress={toggle}>
          <Image source={image} style={{ width: 32 * global.ws, height: 32 * global.ws }} />
        </TouchableOpacity>

        <Image source={require('../../img/sitelogo.png')} style={{ width: 190 * global.ws, height: 50 * global.ws, marginTop: 10 * global.ws }} />

        <TouchableOpacity onPress={() => { findPost(props) }}>
          <Image source={require('../../img/serach.png')} style={{ width: 32 * global.ws, height: 32 * global.ws }} />
        </TouchableOpacity>

      </View>

      <View style={styles.container}>
        {
          selectedItem === "Media" ?
            <Media navigation={props.navigation} />
            : selectedItem === "PostList" ?
              <PostList navigation={props.navigation} />
              : selectedItem === "SnsAcnt" ?
                <SnsAcnt navigation={props.navigation} />
                : selectedItem === "PwdReset" ?
                  <PwdReset navigation={props.navigation} />
                  : selectedItem === "PhoneReset" ?
                    <PhoneReset navigation={props.navigation} />
                    : selectedItem === "Policy" ?
                      <Policy navigation={props.navigation} />
                      : selectedItem === "Terms" ?
                        <Terms navigation={props.navigation} />
                        : selectedItem === "Instagrm" ?
                          <Instagrm navigation={props.navigation} />
                          : <Media navigation={props.navigation} />
        }
      </View>
    </SideMenu>
  );
}


export default Basic;