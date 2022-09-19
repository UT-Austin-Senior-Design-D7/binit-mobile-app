import { Text, Spacer } from "@react-native-material/core";
import { Dimensions, TouchableHighlight, StyleSheet, View, VirtualizedList } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "@rneui/themed";
import { useEffect, useState } from 'react';


const db = [
  {
    item: 'plastic',
    time: 'today',
    key: 'db0b93ef-b396-42b8-916a-6e213defe344'
  },
  {
    item: 'trash',
    time: '2 days ago',
    key: '8ef8fe62-e906-46f1-901f-4a7df3e4055c'
  },
  {
    item: 'compost',
    time: '3 days ago',
    key: '3825e5d7-982e-40f9-a19d-898694cea1f8'
  },
  {
    item: 'compost',
    time: '3 days ago',
    key: '351da514-2acb-11ed-a261-0242ac120002'
  },
  {
    item: 'compost',
    time: '3 days ago',
    key: '425cb80a-2acb-11ed-a261-0242ac120002'
  },
  {
    item: 'compost',
    time: '3 days ago',
    key: '4a6e846a-2acb-11ed-a261-0242ac120002'
  }
]

export default function ProfilePage() {
  const [text, setText] = useState();
  useEffect(() => {
    fetch('https://dummyjson.com/products/1')
    .then(res => res.json())
    .then((result) => {
      setText(result.description)
    })
  })
 
  return (
    <View style={styles.container} >
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Text style={styles.header} variant="h3">Waste Tracker</Text>
            <Text style={{textAlign: 'center', marginTop: 5, fontWeight: 'bold'}}>{text}</Text>
            {/* <Text style={{textAlign: 'center', marginTop: 5, fontWeight: 'bold'}}>Your trash this week</Text> */}
            <TouchableHighlight style = {styles.circle} >
              <Text style={{fontSize: 30, textAlign: 'center'}}>81 unique items!</Text>
            </TouchableHighlight>
            <Spacer/>
            <Text variant="h5" style={styles.h5}>Trash Log</Text>
            
            <Divider style={{ width: "90%", marginLeft: 20, margin: 10 }} color="#000" width={1.5} orientation="horizontal"/>

            {db.map((entry)=>
              <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'space-between'}}>
              <Text key={entry.key} style={{textAlign: 'left', marginLeft: 20,  fontSize: 20}}>
                {entry.item}
              </Text>
              <Text style={{textAlign: 'right', marginRight: 20,  fontSize: 20}}>
                tossed {entry.time}
              </Text>
              </View>
            )}
            <Spacer/>
            <Text variant="h5" style={styles.h5}>Monthly Totals</Text>
            <Divider style={{ width: "90%", marginLeft: 20, margin: 10 }} color="#000" width={1.5} orientation="horizontal"/>
            <Text style={styles.text}>Plastic: 24</Text>
            <Text style={styles.text}>Waste: 51</Text>
            <Text style={styles.text}>Compost: 16</Text>
            <Spacer/>
            <Spacer/>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 20}}>Keep up the great work!</Text>
            <Text></Text><Text></Text><Text></Text><Text></Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#4bb0d1',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'flex-end',
    
  },
  scrollView: {
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    marginBottom: '50%'
  },
  h5: {
    textAlign: 'left', 
    marginLeft: 20,
    marginTop: 50,
    fontWeight: 'bold',
  },
  header: {
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 30,
    margin: 5
  },
  circle: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    marginTop: 20,
    backgroundColor:'#497ecc',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowColor: 'black'
  }
});
