import React, { useState } from 'react';
import QueryData from './queryData'
import { StyleSheet, Image, ViewStyle, Pressable, View, Text, 
  Platform,
  ScrollView, SafeAreaView, StatusBar} from 'react-native';
import { statusColor } from '../constants/statusColor'
import { IoniconsTabBarIcon, MaterialTabBarIcon, OcticonsTabBarIcon } from './navigation/TabBarIcon'

interface LiveSignalProps {
  signalAPI: (page: number) => Promise<any>; 
}
const LiveSignal = ({ signalAPI }: LiveSignalProps) => {
  const [filter, setFilter] = useState('all');
  const renderData = (data: any) => {
    const filteredSignals = filter === 'all' ? data.signals : 
    data.signals.filter((signal: any) => signal.status === filter);

    return (
      <ScrollView>
      <View style={[styles.parentContainer]}>
        <View style={styles.filterContainer}>
          <Pressable onPress={() => setFilter('all')} style={styles.filterButton}>
            <MaterialTabBarIcon name="select-all" size={24} color={filter === 'all' ? 'orange' : 'white'} />
            <Text>All</Text>
          </Pressable>
          <Pressable onPress={() => setFilter('pending')} style={styles.filterButton}>
            <MaterialTabBarIcon name="pending" size={24} color={filter === 'pending' ? 'orange' : 'white'} />
            <Text>Pending</Text>
          </Pressable>
          <Pressable onPress={() => setFilter('active')} style={styles.filterButton}>
            <MaterialTabBarIcon name="notifications-active" size={24} color={filter === 'active' ? 'orange' : 'white'} />
            <Text>Active</Text>
          </Pressable>
          <Pressable onPress={() => setFilter('completed')} style={styles.filterButton}>
            <OcticonsTabBarIcon name="issue-closed" size={24} color={filter === 'completed' ? 'orange' : 'white'} />
            <Text>Completed</Text>
          </Pressable>
          <Pressable onPress={() => setFilter('closed')} style={styles.filterButton}>
            <IoniconsTabBarIcon name="stop-circle-outline" size={30} color={filter === 'closed' ? 'orange' : 'white'} />
            <Text>Closed</Text>
          </Pressable>
          <Pressable onPress={() => setFilter('deleted')} style={styles.filterButton}>
            <MaterialTabBarIcon name="delete" size={24} color={filter === 'deleted' ? 'orange' : 'white'} />
            <Text>Deleted</Text>
          </Pressable>
        </View>
        {filteredSignals.map((signal: any) => (
          <View key={signal._id} style={[styles.card,styles.boxShadow]}>
            <View style={[styles.signalChartParent,styles.boxShadow]}>
              <View style={[styles.imageBox]}>
                <Image source={{ uri: `${signal.signalChart.before}` }}
                  style={[styles.image]}
                  resizeMode='stretch'
                />
              </View>
            </View>
            <View style={[styles.cardContentView]}>
              <Text style={[styles.text]}>Market:</Text>
              <Text style={[styles.cardContentText,styles.text]}>{signal.marketType}</Text>
            </View>
            <View style={[styles.cardContentView]}>
              <Text style={[styles.text]}>Name:</Text>
              <Text style={[styles.cardContentText,styles.text]}>{signal.instrumentName}</Text>
            </View>
            <View style={[styles.cardContentView]}>
              <Text style={[styles.text]}>Symbol:</Text>
              <Text style={[styles.cardContentText,,styles.text,{ textTransform: 'uppercase' }]}>
                {signal.instrumentSymbol}</Text>
            </View>
            <View style={[styles.cardContentView]}>
              <Text style={[styles.text]}>Execution Type:</Text>
              <Text style={signal.executionType === 'buy limit' || signal.executionType === 'buy stop' ?
                [styles.cardContentText, { color: '#28ce30' }] : [styles.cardContentText, { color: '#e73c7e' }]}>
                {signal.executionType}</Text>
            </View>
            <View style={[styles.cardContentView]}>
              <Text style={[styles.text]}>Status:</Text>
              <Text style={[styles.cardContentText, {color:'#fff',fontWeight:'400'},
                statusColor(signal.status) as ViewStyle
              ]}>{signal.status}</Text>
            </View>
            <View style={[styles.cardContentView]}>
              <Text style={[styles.text]}>First entry:</Text>
              <Text style={[styles.cardContentText,styles.text]} selectable={true}>
                {signal.entryPrice.price.firstEntryPrice}</Text>
            </View>
            <View style={[styles.cardContentView]}>
              <Text style={[styles.text]}>Second entry:</Text>
              <Text style={[styles.cardContentText,styles.text]} selectable={true}>
                {signal.entryPrice.price.secondEntryPrice}</Text>
            </View>
            <View style={[styles.cardContentView]}>
              <Text style={[styles.text]}>First take profit:</Text>
              <Text style={[styles.cardContentText,styles.text]} selectable={true}>
                {signal.takeProfit.target.tp1}</Text>
            </View>
            <View style={[styles.cardContentView]}>
              <Text style={[styles.text]}>Second take profit:</Text>
              <Text style={[styles.cardContentText,styles.text]} selectable={true}>
                {signal.takeProfit.target.tp2}</Text>
            </View>
            <View style={[styles.cardContentView]}>
              <Text style={[styles.text]}>Final take profit:</Text>
              <Text style={[styles.cardContentText,styles.text]} selectable={true}>
                {signal.takeProfit.target.finalTp}</Text>
            </View>
            <View style={[styles.cardContentView]}>
              <Text style={[styles.text]}>Stop loss:</Text>
              <Text style={[styles.cardContentText,styles.text]} selectable={true}>
                {signal.stopLoss}</Text>
            </View>
            <View style={[styles.cardContentView]}>
              <Text style={[styles.text]}>Note:</Text>
              <Text style={[styles.cardContentText,styles.text]}>{signal.note}</Text>
            </View>
          </View>
        ))}
      </View>
      </ScrollView>
     
    );
  };

  return (
    <QueryData apiFunction={signalAPI} renderData={renderData} />
  );
};

export default LiveSignal;

const styles = StyleSheet.create({
  safeArea:{
    // flex:1,
    marginTop:StatusBar.currentHeight
  },
  parentContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor:'#121212',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  filterButton: {
    alignItems: 'center',
  },
  signalChartParent: {
    width: '100%',
    // height:100,
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 10,
    marginBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height:100,
  },
  imageBox: {
    borderColor: 'transparent',
    borderWidth: 1,
    width: '100%',
    height: 120,
    alignItems: 'center',
    justifyContent:'center',
    padding:10
  },
  card: {
    width: '90%',
    margin:4,
    padding: 10,
    borderWidth:1,
    borderColor:'transparent'
  },
  boxShadow:{
    ...Platform.select({
      ios:{
    shadowColor: "#cccccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 1,
      },
      android:{
        shadowColor: "#cccccc",
        elevation:3,
      }
    })
  },
  cardContentView: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  cardContentText: {
    marginLeft: 5,
  },
  text: {
    color: '#fff',
    opacity:0.6
  }
});


