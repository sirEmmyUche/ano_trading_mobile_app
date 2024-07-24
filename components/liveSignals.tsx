import React, { useState } from 'react';
import QueryData from './queryData'
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { StyleSheet, Image, ViewStyle, Pressable } from 'react-native';
import { statusColor } from '../constants/statusColor'
import { useShadowColor } from './useShadowBox';
import { IoniconsTabBarIcon, MaterialTabBarIcon, OcticonsTabBarIcon } from './navigation/TabBarIcon'

interface LiveSignalProps {
  signalAPI: (page: number) => Promise<any>; 
}

const LiveSignal = ({ signalAPI }: LiveSignalProps) => {
  const shadowStyle = useShadowColor();
  const [filter, setFilter] = useState('all');

  const renderData = (data: any) => {
    const filteredSignals = filter === 'all' ? data.signals : 
    data.signals.filter((signal: any) => signal.status === filter);

    return (
      <ThemedView style={[styles.parentContainer]}>
        <ThemedView style={styles.filterContainer}>
          <Pressable onPress={() => setFilter('all')} style={styles.filterButton}>
            <MaterialTabBarIcon name="select-all" size={24} color={filter === 'all' ? 'orange' : 'white'} />
            <ThemedText>All</ThemedText>
          </Pressable>
          <Pressable onPress={() => setFilter('pending')} style={styles.filterButton}>
            <MaterialTabBarIcon name="pending" size={24} color={filter === 'pending' ? 'orange' : 'white'} />
            <ThemedText>Pending</ThemedText>
          </Pressable>
          <Pressable onPress={() => setFilter('active')} style={styles.filterButton}>
            <MaterialTabBarIcon name="notifications-active" size={24} color={filter === 'active' ? 'orange' : 'white'} />
            <ThemedText>Active</ThemedText>
          </Pressable>
          <Pressable onPress={() => setFilter('completed')} style={styles.filterButton}>
            <OcticonsTabBarIcon name="issue-closed" size={24} color={filter === 'completed' ? 'orange' : 'white'} />
            <ThemedText>Completed</ThemedText>
          </Pressable>
          <Pressable onPress={() => setFilter('closed')} style={styles.filterButton}>
            <IoniconsTabBarIcon name="stop-circle-outline" size={30} color={filter === 'closed' ? 'orange' : 'white'} />
            <ThemedText>Closed</ThemedText>
          </Pressable>
          <Pressable onPress={() => setFilter('deleted')} style={styles.filterButton}>
            <MaterialTabBarIcon name="delete" size={24} color={filter === 'deleted' ? 'orange' : 'white'} />
            <ThemedText>Deleted</ThemedText>
          </Pressable>
        </ThemedView>
        {filteredSignals.map((signal: any) => (
          <ThemedView key={signal._id} style={[styles.card, shadowStyle]}>
            <ThemedView style={[styles.signalChartParent]}>
              <ThemedView style={[styles.imageBox,]}>
                <Image source={{ uri: `https://e497-105-112-219-148.ngrok-free.app/${signal.signalChart.chart.before}` }}
                  style={[styles.image]}
                />
              </ThemedView>
            </ThemedView>
            <ThemedView style={[styles.cardContentView]}>
              <ThemedText>Market:</ThemedText>
              <ThemedText style={[styles.cardContentText]}>{signal.marketType}</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.cardContentView]}>
              <ThemedText>Name:</ThemedText>
              <ThemedText style={[styles.cardContentText]}>{signal.instrumentName}</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.cardContentView]}>
              <ThemedText>Symbol:</ThemedText>
              <ThemedText style={[styles.cardContentText, { textTransform: 'uppercase' }]}>
                {signal.instrumentSymbol}</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.cardContentView]}>
              <ThemedText>Execution Type:</ThemedText>
              <ThemedText style={signal.executionType === 'buy limit' || signal.executionType === 'buy stop' ?
                [styles.cardContentText, { color: '#28ce30' }] : [styles.cardContentText, { color: '#e73c7e' }]}>
                {signal.executionType}</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.cardContentView]}>
              <ThemedText>Status:</ThemedText>
              <ThemedText type='defaultSemiBold' style={[styles.cardContentText,
                statusColor(signal.status) as ViewStyle
              ]}>{signal.status}</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.cardContentView]}>
              <ThemedText>First entry:</ThemedText>
              <ThemedText style={[styles.cardContentText]} selectable={true}>
                {signal.entryPrice.price.firstEntryPrice}</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.cardContentView]}>
              <ThemedText>Second entry:</ThemedText>
              <ThemedText style={[styles.cardContentText]} selectable={true}>
                {signal.entryPrice.price.secondEntryPrice}</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.cardContentView]}>
              <ThemedText>First take profit:</ThemedText>
              <ThemedText style={[styles.cardContentText]} selectable={true}>
                {signal.takeProfit.target.tp1}</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.cardContentView]}>
              <ThemedText>Second take profit:</ThemedText>
              <ThemedText style={[styles.cardContentText]} selectable={true}>
                {signal.takeProfit.target.tp2}</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.cardContentView]}>
              <ThemedText>Final take profit:</ThemedText>
              <ThemedText style={[styles.cardContentText]} selectable={true}>
                {signal.takeProfit.target.finalTp}</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.cardContentView]}>
              <ThemedText>Stop loss:</ThemedText>
              <ThemedText style={[styles.cardContentText]} selectable={true}>
                {signal.stopLoss}</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.cardContentView]}>
              <ThemedText>Note:</ThemedText>
              <ThemedText style={[styles.cardContentText]}>{signal.note}</ThemedText>
            </ThemedView>
          </ThemedView>
        ))}
      </ThemedView>
    );
  };

  return (
    <QueryData apiFunction={signalAPI} renderData={renderData} />
  );
};

export default LiveSignal;

const styles = StyleSheet.create({
  parentContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'transparent',
    flexDirection: 'column',
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
    height:100,
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    marginBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    // height:'100%',
    flex:1,
    // aspectRatio:1,
    resizeMode: 'contain',
  },
  imageBox: {
    borderColor: 'yellow',
    borderWidth: 1,
    width: '70%',
    height: '100%',
    alignItems: 'center'
  },
  card: {
    borderWidth: 1,
    width: '100%',
    margin: 20,
  },
  cardContentView: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  cardContentText: {
    marginLeft: 5,
  },
});


