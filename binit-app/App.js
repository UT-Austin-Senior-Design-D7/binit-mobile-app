import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfilePage from './pages/ProfilePage';
import { NavigationContainer } from '@react-navigation/native';
import QueuePage from './pages/QueuePage';
import { Ionicons, AntDesign } from '@expo/vector-icons';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Profile" useLegacyImplementation screenOptions={styles.drawer}>
        <Drawer.Screen name="Profile" component={ProfilePage} options={styles.profile}/>
        <Drawer.Screen name="Queue" component={QueuePage} options={styles.queue}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawer: {
    drawerStyle: {
      backgroundColor: "#4bb0d1",
    },
    drawerActiveBackgroundColor: '#fff',
    drawerLabelStyle: {
      color: 'black',
      fontSize: '20px',

    },
    drawerType: 'slide'
  },
  profile: {
    drawerIcon: ({focused, size}) => (
              <Ionicons
                 name="person"
                 size={size}
                 color={focused ? '#000' : '#000'}
              />
    )
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
