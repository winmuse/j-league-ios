

import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../login';
import Main from '../main';
import NewPost from '../NewPost';
import NewPostSave from '../NewPostSave';
import Credential from '../Credential';
import EditPost from '../EditPost';
import FindPost from '../FindPost';
import Instagram from '../Instagram';


const commonDefaultNavigationOptions = {
  headerBackTitle: 'Back',
  headerStyle: {
    backgroundColor: '#fff',
    elevation: 0,
    borderBottomWidth: 0
  },
  headerTintColor: '#000',
  headerTitleStyle: {    
    alignSelf: 'center',
    textAlign: "center",
    justifyContent: 'center',
    flex: 1,
  }
};

const WelcomeStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false
      }
    },
   

    Instagram: {
      screen: Instagram,
      navigationOptions: {
        headerShown: false
      }
    },
    FindPost: {
      screen: FindPost,
      navigationOptions: {
        headerShown: false
      }
    },
    Main: {
      screen: Main,
      navigationOptions: {
        headerShown: false
      }
    },
    NewPost: {
      screen: NewPost,
      navigationOptions: {
        headerShown: false
      }
    },
    EditPost: {
      screen: EditPost,
      navigationOptions: {
        headerShown: false
      }
    },
    NewPostSave: {
      screen: NewPostSave,
      navigationOptions: {
        headerShown: false
      }
    },
    Credential: {
      screen: Credential,
      navigationOptions: {
        headerShown: false
      }
    },
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: commonDefaultNavigationOptions
  }
);


const AppSwitchStack = createSwitchNavigator(
  {
    Welcome: WelcomeStack
  },
  {
    initialRouteName: 'Welcome'
  }
);

export default createAppContainer(AppSwitchStack);
