import { Text, Spacer, Surface } from "@react-native-material/core";
import { Dimensions, TouchableHighlight, StyleSheet, View, Image } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from 'react';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';


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

const config = {
  hasXAxisBackgroundLines: false,
  xAxisLabelStyle: {
    position: 'left',
    fontSize: 18,
    color: '#28a1d8'
  },
  yAxisLabelStyle: {
    fontSize: 16,
    color: '#28a1d8'
  },
};



export default function ProfilePage(props) {
  const [weekly, setWeekly] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [last_month, setLastMonth] = useState(0);
  const [waste_log, setWasteLog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getTotals(username) {
    await fetch(`https://binitdatabase.tk/${username}/weekly_total`)
    .then((response) => response.json())
    .then((res) => setWeekly(res['data']))
    .catch(error => {console.log(error)})
  
    await fetch(`https://binitdatabase.tk/${username}/monthly_total`)
    .then((response) => response.json())
    .then((res) => setMonthly(res['data']))
    .catch(error => {console.log(error)})
    
    await fetch(`https://binitdatabase.tk/${username}/last_month_total`)
    .then((response) => response.json())
    .then((res) => setLastMonth(res['data']))
    .catch(error => {console.log(error)})

    await fetch(`https://binitdatabase.tk/${username}/waste_log_weekly`)
    .then((response) => response.json())
    .then((res) => setWasteLog(res['list']))
    .catch(error => {console.log(error)})

  }
  

  useEffect(() => {
    getTotals(props.user);
    setIsLoading(false);
  })

  if (isLoading) {
    return (
      <Text>Loading</Text>
    )
  }

  return (
    <View style={styles.container} >
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* <Text style={{textAlign: 'center', marginTop: 5, fontWeight: 'bold', color: 'white'}}>{text}</Text> */}
            {/* <Image source={{uri: ``}} style={{height: 200, width: 200}}/> */}
            <Text style={styles.header}>Your trash this week</Text>
            <TouchableHighlight style = {styles.circle} >
              <Text>
                <Text style={styles.circleText}>{weekly} </Text>
                <Text style={styles.circleTextSmall}>items </Text>
              </Text>
            </TouchableHighlight>
            <Spacer/>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
              <Text variant="h5" style={styles.h5}>My Piles   </Text>
              <Text variant="h5" style={styles.h5Light}>this month</Text>
            </View>
            <View>
            <VerticalBarGraph
              data={[10, 20]}
              labels={['This Month', 'Last Month']}
              width={375}
              height={300}
              barRadius={5}
              barColor={'white'}
              barWidthPercentage={0.15}
              baseConfig={config}
              style={styles.chart}
            />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
            <Text variant="h5" style={styles.h5}>Trash Log</Text>
            <Text variant="h5" style={styles.h5Light}>this month</Text>
          </View>
            {waste_log.map((entry)=>
              <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'center'}} key={entry.key}>
                <Surface elevation={7} category="medium" style={styles.surface}>
                <Text key={entry.date} style={{alignSelf: 'flex-start', left: 20, top: 5, fontSize: 30, color: '#91d2ff', textTransform: 'capitalize'}}>
                  {entry.type}
                </Text>
                <Text style={{ alignSelf: 'flex-end', right: 10, bottom: 35, fontSize: 14, color: '#28a2da',}}>
                  tossed {entry.date.substring(0, 12)}
                </Text>
              </Surface>
              </View>
            )}
            <Spacer/>
            <Text></Text><Text></Text><Text></Text><Text></Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    marginBottom: 30,
    marginTop: 8,
    marginLeft: 7,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    backgroundColor: '#005388',
    width: 375,
    height: 340,
    shadowOpacity: 0.2,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#005a96',
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
    marginBottom: 10,
    fontSize: 20,
    letterSpacing: 3,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Avenir',
    textTransform: 'uppercase'
  },
  h5Light: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    marginBottom: 10, 
    letterSpacing: 3,
    marginTop: 50,
    fontSize: 20,
    marginLeft: 60, 
    fontWeight: 'bold',
    textTransform: 'uppercase', 
    fontFamily: 'Avenir', 
    color: "#28a1d8"
  },
  header: {
    textAlign: 'center', 
    marginTop: 5, 
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    fontSize: 18,
    letterSpacing: 2,
    color: 'white',
    textTransform: 'uppercase'
  },
  text: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 30,
    margin: 5,
    color: 'white',
  },
  circle: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    marginTop: 20,
    backgroundColor:'#0D87C0',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowColor: 'black'
  },
  circleText: {
    fontSize: 95, 
    textAlign: 'center', 
    color: 'white',
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  circleTextSmall: {
    fontSize: 30, 
    textAlign: 'center', 
    color: 'white',
    flexWrap: 'wrap'
  },
  surface: {
    width: '90%', 
    height: 70, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#005388",
    margin: 8
  }
});
