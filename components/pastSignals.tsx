import React, { useState } from 'react';
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPastSignals } from '@/APIs';
import { StyleSheet, Image, View, Text, ViewStyle, Pressable, Dimensions } from 'react-native';
import { statusColor } from '../constants/statusColor';
import Carousel from 'react-native-reanimated-carousel';

export default function PastSignal() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['signals'],
    queryFn: getPastSignals,
    placeholderData: keepPreviousData,
    refetchInterval: 600000, // Refetch every 10 minutes (600000 milliseconds)
  });

  const [isAutoPlay, setIsAutoPlay] = useState(true);

  if (isLoading) {
    return (
      <View style={[styles.serverResponse]}>
        <Text style={{ textAlign: 'center' }}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    console.error("Error fetching past signals:", error);
    return (
      <View style={[styles.serverResponse]}>
        <Text style={{ textAlign: 'center', color: 'red' }}>
          Unable to display past trades. Please try again later.
        </Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={[styles.serverResponse]}>
        <Text style={{ textAlign: 'center', color: 'red' }}>
          No response from server. Please try again later.
        </Text>
      </View>
    );
  }

  if (data.status === 'failed') {
    return (
      <View style={[styles.serverResponse]}>
        <Text style={{ textAlign: 'center', color: 'red' }}>{data.message}</Text>
      </View>
    );
  }

  const hasSignals = data.status === 'success' && data.signals.length > 0;
  const windowWidth = Dimensions.get('window').width;

  return (
    <Pressable style={[styles.border]}>
      {hasSignals ? (
        <Carousel
          loop={true}
          mode={'parallax'}
          autoPlay={isAutoPlay} 
          autoPlayInterval={3000}
          width={windowWidth}
          height={450} // Adjust height based on your card height
          data={data.signals}
          scrollAnimationDuration={1000}
          pagingEnabled={true} // Snap to each item after scroll
          snapEnabled={true} // Ensure snapping
          onScrollEnd={() => setIsAutoPlay(true)} // Restart auto-play after scrolling
          onScrollBegin={() => setIsAutoPlay(false)} // Pause auto-play during user interaction
          renderItem={({ item: signal }) => (
            <View key={signal._id} style={[styles.card, styles.boxShadow]}>
              <View style={[styles.signalChartParent, styles.border]}>
                <View style={[styles.signalChartChild, styles.border]}>
                  <View style={[styles.imageBox]}>
                    <Image source={{ uri: `${signal.signalChart.before}` }} style={[styles.image]} />
                  </View>
                  <View>
                    <Text style={{ color: '#e73c7e' }}>Before</Text>
                  </View>
                </View>
                <View style={[styles.signalChartChild]}>
                  <View style={[styles.imageBox]}>
                    <Image source={{ uri: `${signal.signalChart.after}` }} style={[styles.image]} />
                  </View>
                  <View>
                    <Text style={{ color: '#28ce30' }}>After</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.cardContentView]}>
                <Text style={[styles.text]}>Market:</Text>
                <Text style={[styles.cardContentText, styles.text]}>{signal.marketType}</Text>
              </View>
              <View style={[styles.cardContentView]}>
                <Text style={[styles.text]}>Name:</Text>
                <Text style={[styles.cardContentText, styles.text]}>{signal.instrumentName}</Text>
              </View>
              <View style={[styles.cardContentView]}>
                <Text style={[styles.text]}>Symbol:</Text>
                <Text style={[styles.cardContentText, styles.text, { textTransform: 'uppercase' }]}>
                  {signal.instrumentSymbol}
                </Text>
              </View>
              <View style={[styles.cardContentView]}>
                <Text style={[styles.text]}>Execution Type:</Text>
                <Text style={
                  signal.executionType === 'buy limit' || signal.executionType === 'buy stop'
                    ? [styles.cardContentText, { color: '#28ce30' }]
                    : [styles.cardContentText, { color: '#e73c7e' }]
                }>
                  {signal.executionType}
                </Text>
              </View>
              <View style={[styles.cardContentView]}>
                <Text style={[styles.text]}>Status:</Text>
                <Text style={[styles.cardContentText, statusColor(signal.status) as ViewStyle]}>
                  {signal.status}
                </Text>
              </View>
              <View style={[styles.cardContentView]}>
                <Text style={[styles.text]}>First entry:</Text>
                <Text style={[styles.cardContentText, styles.text]} selectable={true}>
                  {signal.entryPrice.price.firstEntryPrice}
                </Text>
              </View>
              <View style={[styles.cardContentView]}>
                <Text style={[styles.text]}>Second entry:</Text>
                <Text style={[styles.cardContentText, styles.text]} selectable={true}>
                  {signal.entryPrice.price.secondEntryPrice}
                </Text>
              </View>
              <View style={[styles.cardContentView]}>
                <Text style={[styles.text]}>Outcome:</Text>
                <Text style={signal.signalOutcome === 'loss'
                  ? [styles.cardContentText, { color: '#e73c7e' }]
                  : [styles.cardContentText, { color: '#28ce30' }]
                }>
                  {signal.signalOutcome}
                </Text>
              </View>
              <View style={[styles.cardContentView]}>
                <Text style={[styles.text]}>Note:</Text>
                <Text style={[styles.cardContentText, styles.text]}>{signal.note}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={[styles.serverResponse]}>
          <Text style={{ textAlign: 'center' }}>
            There was an issue fetching past signals. Please try again later.
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: 'red'
  },
  boxShadow: {
    shadowColor: "#cccccc",
    shadowOffset: { width: -3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
  },
  serverResponse: {
    width: '100%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signalChartParent: {
    width: '100%',
    borderWidth: 1,
    padding: 10,
    marginBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signalChartChild: {
    width: '50%',
  },
  card: {
    width: '90%',
    margin: 20,
    padding: 10,
    borderWidth:1,
    borderColor:'green'
  },
  cardContentView: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  cardContentText: {
    marginLeft: 5,
  },
  image: {
    maxWidth: '100%',
    height: '100%',
    aspectRatio: 1,
    resizeMode: 'center',
  },
  imageBox: {
    borderWidth: 1,
    marginBottom: '2%',
    width: '90%',
    height: 100,
    alignItems: 'center'
  },
  text: {
    color: '#fff'
  }
});

