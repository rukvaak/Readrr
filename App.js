import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen   from './components/logincomponent';
import SigninScreen from './components/signincomponent';
import SignupScreen from './components/signupcomponent';
import LanguageScreen from './components/langcomponent';
import CategoriesScreen from './components/category';
import MaintabScreen from './components/bottomtab';
import SettingScreen from './components/settings';
import drawernavigation from './components/drawernavigation';
import { createDrawerNavigator,useIsDrawerOpen,DrawerNavigationOptions } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
const navigator = createStackNavigator(
  {
   Login:LoginScreen,
   Signin:SigninScreen,
   Signup:SignupScreen,
   Language:LanguageScreen,
   Category:CategoriesScreen,
   settings:SettingScreen,
   navigating:drawernavigation,
   Screns: MaintabScreen,
  },
  {
    initialRouteName: 'Screns',
  }
);

const AppContainer = createAppContainer(navigator);
export default AppContainer;

const Drawer = createDrawerNavigator();

const drawernavigator = () =>{
  return(
    <NavigationContainer>
    <Drawer.Navigator initialRouteName= {settings} >
      <Drawer.Screen name="Home" component={settings} />
     {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} />*/}
    </Drawer.Navigator>
  </NavigationContainer>
  )
}