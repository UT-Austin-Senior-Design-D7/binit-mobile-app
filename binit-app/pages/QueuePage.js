import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import styled from 'styled-components'
import { Surface } from "@react-native-material/core";
import TinderCard from 'react-tinder-card'

const Card = styled.View`
    position: absolute;
    top:80px;
    left: 12%;
    background-color: black;
    width: 100%;
    max-width: 300px;
    height: 500px;
    shadow-color: black;
    shadow-opacity: 0.1;
    shadow-radius: 20px;
    border-radius: 20px;
    resize-mode: cover;
`

const CardImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 20px;
`

const CardTitle = styled.Text`
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    margin-top: 15px;
    color: #fff;
    background-color: #000;
    padding: 10px;
    font-size: 28px;
    text-align: center;
    shadow-color: black;
    shadow-opacity: 0.1;
    shadow-radius: 20px;
    `

export default function QueuePage() {
  const data = [
    {
      name: 'recycle',
      key: '456',
      img: require('../assets/water_bottle.jpg')
    },
    {
      name: 'trash',
      key: 'abc',
      img: require('../assets/mask.jpg')
    },
    {
      name: 'recycle',
      key: '123',
      img: require('../assets/wrapper.jpg')
    },
  ]
  const onSwipe = (direction) => {
    if (direction === 'left') { // prediction was wrong
      Alert.prompt("Classification was wrong", "Enter the correct bin",  (correction) => console.log(`Item was actually ${correction}`)
    )
    }
    if (direction === 'right') { // prediction was right
      Alert.alert(title='Classification was correct!')
    }
  }
  
  
  return (
    <View style={styles.container}>
      {data.map((entry)=> 
        <TinderCard style={styles.card} key={entry.key} onSwipe={onSwipe} preventSwipe={['up', 'down']}>
          <Card>
              <CardImage source={entry.img}/>
              <CardTitle>Prediction: {entry.name}</CardTitle>
           </Card>
        </TinderCard>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#005a96',
  },
});
