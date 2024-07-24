import React, {useRef,useEffect} from 'react';
import QueryData from '@/components/queryData';
import { getPastSignals } from '@/APIs';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, Image, ViewStyle, ScrollView,Animated} from 'react-native';
import {statusColor} from '../constants/statusColor'
import { useShadowColor} from './useShadowBox'; //style={[styles.parentContainer,]}

const PastSignal: React.FC = () => {
  const shadowStyle = useShadowColor();
  const scrollX = useRef(new Animated.Value(-10)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    const scrollAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scrollX, {
          toValue: 1, // scroll value to the end
          duration: 20000, // duration to scroll to the end
          useNativeDriver: false,
        }),
        Animated.timing(scrollX, {
          toValue: 0, // reset scroll value to the start
          duration: 0, // instant reset
          useNativeDriver: false,
        }),
      ])
    );

    scrollAnimation.start();

    return () => scrollAnimation.stop();
  }, [scrollX]);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      scrollViewRef.current?.scrollTo({
        x: value * 1000, // adjust this value to match the scroll width
        animated: false,
      });
    });

    return () => scrollX.removeAllListeners();
  }, [scrollX]);


  const renderData = (data:any) => (
    <Animated.ScrollView 
    ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      contentContainerStyle={styles.contentContainer}
    >
      {data.signals.map((signal:any) => (
        <ThemedView key={signal._id} style={[styles.card,shadowStyle]}>
          <ThemedView style={[styles.signalChartParent,shadowStyle]}>
            <ThemedView style={[styles.signalChartChild]}>
              <ThemedView style={[styles.imageBox,shadowStyle]}>
              <Image source={{uri:`https://e497-105-112-219-148.ngrok-free.app/${signal.signalChart.chart.before}`}}
              style={[styles.image]}
              // resizeMode='contain'
              />
              </ThemedView>
              <ThemedView>
                <ThemedText type='defaultSemiBold' style={{color:'#e73c7e'}}>Before</ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedView  style={[styles.signalChartChild]}>
            <ThemedView style={[styles.imageBox,shadowStyle]}>
              <Image source={{uri:`https://e497-105-112-219-148.ngrok-free.app/${signal.signalChart.chart.after}`}}
              style={[styles.image]}
              // resizeMode='contain'
              />
            </ThemedView>
            <ThemedView>
            <ThemedText type='defaultSemiBold' style={{color:'#28ce30'}}>After</ThemedText>
            </ThemedView>
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
            <ThemedText style={[styles.cardContentText,{textTransform:'uppercase',}]}>
              {signal.instrumentSymbol}</ThemedText>
          </ThemedView>
          <ThemedView style={[styles.cardContentView]}>
            <ThemedText>Execution Type:</ThemedText>
            <ThemedText style={signal.executionType==='buy limit' || signal.executionType==='buy stop'? 
              [styles.cardContentText,{color:'#28ce30'}]:[styles.cardContentText,{color:'#e73c7e'}]}>
              {signal.executionType}</ThemedText>
          </ThemedView>
          <ThemedView style={[styles.cardContentView]}>
            <ThemedText>Status:</ThemedText>
            <ThemedText type='defaultSemiBold'style={[styles.cardContentText,
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
            <ThemedText>Outcome:</ThemedText>
            <ThemedText style={signal.signalOutcome==='loss'?[
              styles.cardContentText,{color:'#e73c7e'}]:[styles.cardContentText,{color:'#28ce30'}]}
            >{signal.signalOutcome}</ThemedText>
          </ThemedView>
          <ThemedView style={[styles.cardContentView]}>
            <ThemedText>Note:</ThemedText>
            <ThemedText style={[styles.cardContentText]}>{signal.note}</ThemedText>
          </ThemedView>
        </ThemedView>
      ))}
    </Animated.ScrollView>
  );

  return (
    <QueryData apiFunction={getPastSignals} renderData={renderData} />
  );
};

export default PastSignal;

const styles = StyleSheet.create({
  contentContainer: {
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    borderWidth:1,
    borderColor:'orange'
  },
  signalChartParent:{
    width:'100%',
    borderWidth:1,
    // borderColor:'red',
    padding:10,
    // height:400,
    marginBottom:'5%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  signalChartChild:{
    width:'50%',
  },
  card:{
    borderWidth:1,
    borderColor:'green',
    width:'50%',
    margin:20,
  },
  cardContentView:{
    flexDirection:'row',
    alignItems:'flex-start'
  },
  cardContentText:{
    marginLeft:5,
  },
  image: {
    maxWidth:'100%',
    // width: 400,
    height:'100%',
    aspectRatio: 1,
    resizeMode:'center',
  },
  imageBox: {
    // borderColor: 'yellow',
    borderWidth: 1,
    marginBottom:'2%',
    width:'90%',
    height:100, // Set a fixed height for images
    alignItems:'center'
  },
})