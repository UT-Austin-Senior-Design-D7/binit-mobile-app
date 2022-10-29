import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from './RootNavigation.js';

import QueuePage from './pages/QueuePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

const Drawer = createDrawerNavigator();


export default function App(props) {
  const [token, setToken] = useState(0);
  const [user, setUser] = useState();

  return (

    <NavigationContainer ref={navigationRef}>
      {token === 0 ? (
        <LoginPage setToken={setToken} setUser={setUser}/>
      ): (
        <Drawer.Navigator initialRouteName="Profile" useLegacyImplementation screenOptions={styles.drawer}>
          <Drawer.Screen name="Profile" component={ProfilePage} options={styles.profile}/>
          <Drawer.Screen name="Queue" component={QueuePage} options={styles.queue}/>
        </Drawer.Navigator>
      )}
      
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    headerTitleStyle: {
      color: '#005a96',
      fontFamily: 'Avenir',
      fontWeight: 'bold'
    }
  },
  drawer: {
    drawerStyle: {
      backgroundColor: "#0D87C0",
    },
    drawerActiveBackgroundColor: '#fff',
    drawerLabelStyle: {
      color: 'black',
      fontSize: '20px',

    },
    drawerType: 'slide',
    headerStyle: {
      backgroundColor: '#005a96',
      shadowRadius: 0,
      shadowOffset: {
        height: 0
      }
    },
    headerTitleStyle: {
      color: 'white',
      fontFamily: 'Avenir',
      fontWeight: 'bold'
    }
  },
  profile: {
    drawerIcon: ({focused, size}) => (
              <Ionicons
                 name="person"
                 size={size}
                 color={focused ? '#000' : '#000'}
              />
    ),
    headerTitle: 'Home',
  },
  queue: {
    drawerIcon: ({focused, size}) => (
              <AntDesign 
                 name="profile"
                 size={size}
                 color={focused ? '#000' : '#000'}
              />
    )
  }

});
