import React, {useRef,useEffect} from 'react';
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPastSignals } from '@/APIs';
import { StyleSheet, Image, View, Text,ViewStyle, ScrollView,Pressable} from 'react-native';
import {statusColor} from '../constants/statusColor'


export default function PastSignal(){
  const { isLoading, isError, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['signals',],
    queryFn:getPastSignals,
    placeholderData: keepPreviousData,
    refetchInterval: 600000, // Refetch every 10 minutes (600000 milliseconds)
  });
  if (isLoading) {
    return (
      <View style={[styles.serverResponse,]}>
        <Text style={{textAlign:'center'}}>Loading...</Text>
      </View>
    );
  }

  if(isError) {
    console.error("Error fetching past signals:", error);
    return (
      <View style={[styles.serverResponse,]}>
        <Text style={{textAlign:'center',color:'red'}}>
          Unable to display past trades. Please try again later.
        </Text>
      </View>
    );
  }

  if(!data) {
    return (
      <View style={[styles.serverResponse,]}>
          <Text style={{textAlign:'center',color:'red'}}>
            No response from server. Please try again later.
          </Text>
      </View>
    );
  }

  if (data.status === 'failed') {
    return (
      <View style={[styles.serverResponse,]}>
        <Text style={{textAlign:'center',color:'red'}}>{data.message}</Text>
      </View>
  );
  }

  const hasSignals = data.status === 'success' && data.signals.length > 0;

  return(
    <Pressable  style={[styles.border]}>   
      {
        hasSignals?(
          <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          >
            {data.signals.map((signal:any) => (
              <View key={signal._id} style={[styles.card,styles.boxShadow]}>
                <View style={[styles.signalChartParent,styles.border]}>
                  <View style={[styles.signalChartChild,styles.border]}>
                    <View style={[styles.imageBox,]}>
                    <Image source={{uri:`${signal.signalChart.before}`}}
                      style={[styles.image]}
                      // resizeMode='contain'
                    />
                    </View>
                    <View>
                      <Text style={{color:'#e73c7e'}}>Before</Text>
                    </View>
                  </View>
                  <View  style={[styles.signalChartChild]}>
                  <View style={[styles.imageBox,]}>
                    <Image source={{uri:`${signal.signalChart.after}`}}
                    style={[styles.image]}
                    // resizeMode='contain'
                    />
                  </View>
                  <View>
                  <Text style={{color:'#28ce30'}}>After</Text>
                  </View>
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
                  <Text style={[styles.cardContentText,styles.text,{textTransform:'uppercase',}]}>
                    {signal.instrumentSymbol}</Text>
                </View>
                <View style={[styles.cardContentView]}>
                  <Text style={[styles.text]}>Execution Type:</Text>
                  <Text style={signal.executionType==='buy limit' || signal.executionType==='buy stop'? 
                    [styles.cardContentText,{color:'#28ce30'}]:[styles.cardContentText,{color:'#e73c7e'}]}>
                    {signal.executionType}</Text>
                </View>
                <View style={[styles.cardContentView]}>
                  <Text style={[styles.text]}>Status:</Text>
                  <Text style={[styles.cardContentText,
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
                  <Text style={[styles.text]}>Outcome:</Text>
                  <Text style={signal.signalOutcome==='loss'?[
                    styles.cardContentText,{color:'#e73c7e'}]:[styles.cardContentText,{color:'#28ce30'}]}
                  >{signal.signalOutcome}</Text>
                </View>
                <View style={[styles.cardContentView]}>
                  <Text style={[styles.text]}>Note:</Text>
                  <Text style={[styles.cardContentText,styles.text]}>{signal.note}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        ):(
          <View style={[styles.serverResponse,]}>
          <Text style={{textAlign:'center'}}>
            There was an issue fetching past signals. Please try again later.
          </Text>
          </View>
        )
      }
    </Pressable>
  )
    
};

// export default PastSignal;

const styles = StyleSheet.create({
  border:{
    borderWidth:1,
    borderColor:'red'
  },
  boxShadow:{
    shadowColor:"#cccccc",
    shadowOffset:{width:-3, height:3},
    shadowOpacity:1,
    shadowRadius:1,
    elevation:5,
  },
  contentContainer: {
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    width:'100%',
    padding:50,
    borderWidth:1,
    borderColor:'orange',
  },
  serverResponse:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
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
    // borderWidth:1,
    // borderColor:'green',
    width:'90%',
    margin:20,
    padding:10
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
  text:{
    color:'#fff'
  }
})