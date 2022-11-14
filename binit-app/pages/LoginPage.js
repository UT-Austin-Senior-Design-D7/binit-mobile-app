import { StatusBar } from 'expo-status-bar';
import { Alert, Image, StyleSheet, Text, View, Pressable, TextInput, Modal } from 'react-native';
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { propTypes } from 'react-tinder-card';
import * as RootNavigation from '../RootNavigation';


async function RegisterUser(user, pass, email, size, location, deviceId) {
  const res = await fetch(`https://binitdatabase.tk/register/${user}/${pass}/${email}/${size}/${location}/${deviceId}`)
  .then((response) => response.json())
  .catch(error => {console.log(error)})

  return res
}

async function LoginUser(user, password) {
  const res = await fetch(`https://binitdatabase.tk/login/${user}/${password}`)
  .then((response) => response.json())
  .catch(error => {console.log(error)})

  return res
}

export default function LoginPage({setToken, setUser}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [regUsername, setRegUsername] = useState('');
  const [email, setEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [size, setSize] = useState('');
  const [location, setLocation] = useState('');
  const [deviceId, setDeviceId] = useState(0);


  async function handleSubmit(e) {
    const token = await LoginUser(username, password)

    if (token['data'] === 1) {
      console.log("successfully logged in")
      setUser(username)
      setToken(token)
    }
    else {
      setToken(0)
      Alert.alert("Incorrect login credentials. Please try again.")
    }
  }

  async function showRegisterModal() {
    setModalVisible(true);
  }

  async function hideRegisterModal() {
    setModalVisible(false);
  }

  async function handleRegister(e) {
    // register will require NAME, EMAIL, PASSWORD, HOUSEHOLD SIZE, LOCATION, DEVICE ID
    
    const token = await RegisterUser(regUsername, email, regPassword, size, location, deviceId)
    
    if (token['data'] === 1) {
      Alert.alert("Registered! Please proceed to login.")
      hideRegisterModal();
    }
    else {
      Alert.alert("Something went wrong. Please try again.")
    }

  }
  return (
    <View style={styles.container}>
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalView}>
            <Text style={styles.header}>Register</Text>
            <Text style={styles.text}>Username</Text>
            <TextInput
            style={styles.input}
            onChangeText={setRegUsername}
            value={regUsername}
            />
            <Text style={styles.text}>Email</Text>
            <TextInput
            style={styles.input}
            onChangeText={setEmail}
            keyboardType={'email-address'}
            value={email}
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
            style={styles.input}
            onChangeText={setRegPassword}
            secureTextEntry={true}
            value={regPassword}
            />
            <Text style={styles.text}>Household Size</Text>
            <TextInput
            style={styles.input}
            onChangeText={setSize}
            keyboardType={'numeric'}
            value={size}
            />
            <Text style={styles.text}>Location</Text>
            <TextInput
            style={styles.input}
            onChangeText={setLocation}
            value={location}
            />
            <Text style={styles.text}>Device Id</Text>
            <TextInput
            style={styles.input}
            onChangeText={setDeviceId}
            value={deviceId}
            />
            <Pressable style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
          </View>
        </Modal>
        <Image source={require('../assets/binit-white.png')} style={styles.image}/>
        <Text style={styles.header}>Login</Text>
        <Text style={styles.text}>Username</Text>
        <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />

      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry={true}
        value={password}
      />
      
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={showRegisterModal}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#005a96',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    fontSize: 60,
    letterSpacing: 2,
    color: 'white',
    
    
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: '90%',
    padding: 10,
    color: 'white',
    borderColor: 'white',
    borderRadius: 12,
  },
  text: {
    fontFamily: 'Avenir', 
    color: "white",
    alignSelf: 'left',
    marginLeft: 22,
    fontSize: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '50%',
    elevation: 3,
    backgroundColor: 'white',
    margin: 10
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#28a1d8',
  },
  image: {
    width: 200,
    height: 80,
    position: 'absolute',
    top: 20,
    right: 0,
    marginTop: 30
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#005a96"
  },
  modalView: {
    margin: 20,
    padding: 1,
    marginTop: 40,
    backgroundColor: "#5297c4",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
