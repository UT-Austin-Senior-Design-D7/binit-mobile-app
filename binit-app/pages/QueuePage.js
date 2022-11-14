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

export default function QueuePage({user}) {
  const [text, setText] = useState('foo');
  const [cards, setCards] = useState([]);

  async function correctPrediction(id, correction) {
    console.log(`sending correction ${correction}`)
    const res = await fetch(`https://binitdatabase.tk/classify/${id}/${correction}`)
    .then((response) => response.json())
    .catch(error => {console.log(error)})
  
    return res
  }


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
  
  const onSwipe = (id, prediction, direction) => {
    console.log(id);
    if (direction === 'left') { // prediction was wrong
      console.log(`set id to ${id}`)
      Alert.alert(
        "Classification was wrong", 
        "", 
        [
          {
            text: 'Trash',
            onPress: () => correctPrediction(id, 0)
          },
          {
            text: 'Recycle',
            onPress: () => correctPrediction(id, 1)
          },
          {
            text: 'Compost',
            onPress: () => correctPrediction(id, 2)
          },
          {
            text: 'Cancel',
            onPress: () => console.log("correction was canceled")
          }
        ],
        {cancelable: true})
    }
    if (direction === 'right') { // prediction was right
      correctPrediction(id, prediction)
      Alert.alert(title='Classification was correct!')
    }
  }
  
  async function getCards() {
    await fetch(`https://binitdatabase.tk/${user}/unclassified`)
    .then((response) => response.json())
    .then((result) => {
      setCards(result['list'])
    })
    .catch(error => {console.log(error)})

  }
    useEffect(() => {
      getCards()
    })
 

  return (
    <View style={styles.container}>
      {cards.map((entry)=> 
        <TinderCard style={styles.card} key={entry.id} onSwipe={(direction) => onSwipe(entry.id, entry.prediction, direction)} preventSwipe={['up', 'down']}>
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
