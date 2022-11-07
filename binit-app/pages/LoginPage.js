import { StatusBar } from 'expo-status-bar';
import { Alert, Image, StyleSheet, Text, View, Pressable, TextInput, Modal } from 'react-native';
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { propTypes } from 'react-tinder-card';
import * as RootNavigation from '../RootNavigation';


async function RegisterUser(user, password) {
  const res = await fetch(`https://binitdatabase.tk/login/${user}/${password}`)
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
    
  }
  async function handleRegister(e) {
    // register will require NAME, EMAIL, PASSWORD, HOUSEHOLD SIZE, LOCATION, DEVICE ID
    const token = await RegisterUser(username, password)
    
    if (token['data'] === 1) {
      console.log("registered user successfully")
    }
    else {
      Alert.alert("Invalid credentials. Please try again.")
    }

  }
  return (
    <View style={styles.container}>
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
        value={password}
      />
      
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
      <Pressable style={styles.button}>
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
  }
});
