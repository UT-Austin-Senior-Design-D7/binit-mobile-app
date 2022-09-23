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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
