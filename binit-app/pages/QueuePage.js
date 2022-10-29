import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Alert, Image } from 'react-native';
import styled from 'styled-components'
import { useEffect, useState } from 'react';

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
  const [text, setText] = useState('foo');
  const [cards, setCards] = useState([]);

  const options = [
    {
      text: 'Plastic',
      onPress: () => console.log("corrected to Plastic!")
    },
    {
      text: 'Trash',
      onPress: () => console.log("corrected to Trash!")
    },
    {
      text: 'Compost',
      onPress: () => console.log("corrected to Compost!")
    },
    {
      text: 'Cancel',
      onPress: () => console.log("correction was canceled")
    }
  ]

  function convertPrediction(prediction) {
    switch (prediction) {
      case 0:
        return "Trash"
      case 1:
        return "Recycle"
      case 2:
        return "Compost"
    }

  }
  
  const onSwipe = (direction) => {
    if (direction === 'left') { // prediction was wrong
      Alert.alert("Classification was wrong", "", options, {cancelable: true})
    }
    if (direction === 'right') { // prediction was right
      Alert.alert(title='Classification was correct!')
    }
  }
  
    useEffect(() => {
    fetch('https://binitdatabase.tk/rushi/unclassified')
    .then((response) => response.json())
    .then((result) => {
      setCards(result.list)
    })
    
  })
 

  return (
    <View style={styles.container}>
      {cards.map((entry)=> 
        <TinderCard style={styles.card} key={entry.id} onSwipe={onSwipe} preventSwipe={['up', 'down']}>
          <Card>
              <Image source={{ uri: `https://binitdatabase.tk/download_by_name/${entry.filename}` }} style={{width: '100%', height: '100%', overflow: 'hidden', borderRadius: '20px'}}/>
              <CardTitle>Prediction: {convertPrediction(entry.prediction)}</CardTitle>
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
