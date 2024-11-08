import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import { useQuery } from '@tanstack/react-query';
import { fetchYearlyData } from '@/APIs';
import { useSession } from '@/context/userContext';
import { OcticonsTabBarIcon } from './navigation/TabBarIcon';
import { MotiView,} from 'moti';

export default function TradingSignalsChart() {
  // const [view, setView] = useState<string | []>([]);
  const [loss, setLoss] = useState<number>();
  const [profit, setProfit] = useState<number>();
  const [isSelected, setIsSelected] = useState<string>('yearly');
  const { session } = useSession();
  const token = session?.user.token;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['yearly-signals'],
    queryFn: () => fetchYearlyData(token),
  });

  // Calculate yearly profit/loss percentages
  const totalCompletedYear = data?.signals.reduce((acc: number, month: any) => acc + month.completed, 0) || 0;
  const totalClosedYear = data?.signals.reduce((acc: number, month: any) => acc + month.closed, 0) || 0;
  const totalFinishedYear = totalCompletedYear + totalClosedYear;

  const totalProfitYear = data?.signals.reduce((acc: number, month: any) => acc + month.profit, 0) || 0;
  const totalLossYear = data?.signals.reduce((acc: number, month: any) => acc + month.loss, 0) || 0;

  const yearlyPercentageProfit = totalFinishedYear ? (totalProfitYear / totalFinishedYear) * 100 : 0;
  const yearlyPercentageLoss = totalFinishedYear ? (totalLossYear / totalFinishedYear) * 100 : 0;

  useEffect(() => {
    setIsSelected('yearly');
    setProfit(yearlyPercentageProfit);
    setLoss(yearlyPercentageLoss);
  }, [data]);

  if (isLoading || isFetching) {
    return (
      <MotiView style={styles.skeletonItem}>
        <MotiView style={styles.skeletonHeader} />
        <MotiView style={styles.skeletonSubheader} />
        <MotiView
          style={styles.skeletonChart}
          from={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 800,
            loop: true,
          }}
        />
      </MotiView>
    );
  }

  if (error) {
    return (
      <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[styles.subtitle, { textAlign: 'center' }]}>Something went wrong</Text>
      </View>
    );
  }

  if (!data || !Array.isArray(data.signals) || data?.signals?.length === 0) {
    return (
      <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[styles.subtitle, { textAlign: 'center' }]}>
            No data available to display.
        </Text>
      </View>
    );
  }

  const inputData = data?.signals?.map((item: any) => ({
    value: item.signals,
    label:item.month
  }));

  const yearlyData = () => {
    setIsSelected('yearly');
    setLoss(yearlyPercentageLoss);
    setProfit(yearlyPercentageProfit);
  };

  const monthlyData = () => {
    const currentMonth = data.signals.slice(-1);
    const totalCurrentMonthFinishedTrade = currentMonth[0].completed + currentMonth[0].closed;
    const currentMonthPercentageProfit = (currentMonth[0].profit / totalCurrentMonthFinishedTrade) * 100;
    const currentMonthPercentageLoss = (currentMonth[0].loss / totalCurrentMonthFinishedTrade) * 100;

    setIsSelected('monthly');
    setLoss(isNaN(currentMonthPercentageLoss)?0:currentMonthPercentageLoss);
    setProfit(isNaN(currentMonthPercentageProfit)?0:currentMonthPercentageProfit);
  };

  return (
    <View style={{ padding: 10, flex: 1,}}>
      <Text style={[styles.title]}>Performance</Text>
      <View style={[styles.yearlyMonthlyHolder]}>
        <Pressable onPress={yearlyData}>
          <Text style={isSelected === 'yearly' ? [styles.isSelected, styles.subtitle] : styles.subtitle}>Yearly</Text>
        </Pressable>
        <Pressable onPress={monthlyData}>
          <Text style={isSelected === 'monthly' ? [styles.isSelected, styles.subtitle] : styles.subtitle}>Monthly</Text>
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <OcticonsTabBarIcon name="triangle-up" size={35} color="#7CE67C" />
        <Text style={{ color: '#fff', marginLeft: 5, fontSize: 12, fontWeight: 'bold' }}>{`Profit: + ${profit}%`}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <OcticonsTabBarIcon name="triangle-down" size={35} color='#FF0000' />
        <Text style={{ color: '#fff', marginLeft: 5, fontSize: 12, fontWeight: 'bold' }}>{`Loss: - ${loss}%`}</Text>
      </View>
      <Pressable style={styles.chartContainer}>
        <LineChart
          areaChart
          curved
          data={inputData}
          color="#07BAD1"
          yAxisTextStyle={{ color: 'lightgray' }}
          xAxisLabelTextStyle={{ color: 'lightgray' }}
          hideDataPoints
          startFillColor={'rgb(84,219,234)'}
          endFillColor={'#fff'}
          startOpacity={0.4}
          endOpacity={0.1}
          rulesColor="gray"
          rulesType='solid'
          yAxisColor="lightgray"
          xAxisColor="lightgray"
          isAnimated
          height={250}
          animateOnDataChange
          animationDuration={1000}
          onDataChangeAnimationDuration={300}
          noOfSections={3}
          adjustToWidth={true}
          showScrollIndicator={true}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
    width: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#fff',
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  yearlyMonthlyHolder: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  isSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#7CE67C',
  },
  skeletonItem: {
    height: 300,
    marginBottom: 10,
    marginTop: 10,
  },
  skeletonHeader: {
    width: '60%',
    height: 20,
    backgroundColor: '#1e1e1e',
    marginBottom: 10,
  },
  skeletonSubheader: {
    width: '40%',
    height: 15,
    backgroundColor: '#1e1e1e',
    marginBottom: 10,
  },
  skeletonChart: {
    height: 200,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
  },
});


// import React, { useState,useEffect } from 'react';
// import { View, Text,StyleSheet,Pressable} from 'react-native';
// import { LineChart } from "react-native-gifted-charts";
// import { useQuery } from '@tanstack/react-query';
// import { fetchYearlyData } from '@/APIs';
// import { useSession } from '@/context/userContext';
// import { OcticonsTabBarIcon } from './navigation/TabBarIcon';
// import {MotiView,MotiText} from 'moti';
// import { types } from '@babel/core';

// export default function TradingSignalsChart(){
//   const [view, setView] = useState<string|[]>([]);
//   const [loss, setLoss] = useState<number>();
//   const [profit, setProfit] = useState<number>();
//   const [isSelected, setIsSelected] = useState<string>('yearly');
//   const {session} = useSession();
//   const token = session?.user.token;

//   const {data, isLoading, isFetching, error} = useQuery({
//     queryKey:['yearly-signals'], 
//     queryFn: ()=> fetchYearlyData(token)
//   });

//   useEffect(()=>{
//     setIsSelected('yearly')
//       if(yearlyPercentageProfit == Number.NaN || yearlyPercentageLoss == Number.NaN
//         || !yearlyPercentageProfit || !yearlyPercentageLoss
//       ){
//         setLoss(0);
//         setProfit(0)
//       }else{
//         setLoss(yearlyPercentageLoss);
//         setProfit(yearlyPercentageProfit)
//       }
//   },[])

//   if(isLoading){
//     return(
//       <MotiView  style={styles.skeletonItem}>
//         <MotiText/>
//         <MotiText/>
//         <MotiView
//           from={{ opacity: 0.5,
//             backgroundColor: '#1e1e1e',
//         }}
//           animate={{ opacity: 1,
//             backgroundColor: '#1e1e1e',
//          }}
//           transition={{
//             type: 'timing',
//             duration: 800,
//             loop: true,
//           }}
//         />
//       </MotiView>
//         // <Text>isFetching...</Text>
//     )
//   }

//   if(isFetching){
//     return(
//       <MotiView  style={styles.skeletonItem}>
//         <MotiText/>
//         <MotiText/>
//         <MotiView
//           from={{ opacity: 0.5,
//             backgroundColor: '#1e1e1e',
//         }}
//           animate={{ opacity: 1,
//             backgroundColor: '#1e1e1e',
//          }}
//           transition={{
//             type: 'timing',
//             duration: 800,
//             loop: true,
//           }}
//         />
//       </MotiView>
//         // <Text>isFetching...</Text>
//     )
//   }

//   if(error){
//     return(
//       <View style={{height:200, justifyContent:'center',alignItems:'center'}}>
//         <Text style={[styles.subtitle,{textAlign:'center'}]}>Something went wrong</Text>
//       </View>
//     )
//   }
  
//   if (!data || !Array.isArray(data.signals) || data?.signals?.length=== 0) {
//     return <Text>No data available to display</Text>;
//   }

//     const inputData = data?.signals?.map((item: any) => ({
//     // label: item.month,
//     value: item.signals,
//   }))

// const currentMonth = data.signals.slice(-1);
// const totalCurrentMonthFinishedTrade = currentMonth[0].completed + currentMonth[0].closed;
// const currentMonthPercentageProfit = (currentMonth[0].profit / totalCurrentMonthFinishedTrade) * 100;
// const currentMonthPercentageLoss = (currentMonth[0].loss / totalCurrentMonthFinishedTrade) * 100;

// const totalCompletedYear = data.signals.reduce((acc:number, month:any) => acc + month.completed, 0);
// const totalClosedYear = data.signals.reduce((acc:number, month:any) => acc + month.closed, 0);
// const totalFinishedYear = totalCompletedYear + totalClosedYear;

// const totalProfitYear = data.signals.reduce((acc:number, month:any) => acc + month.profit, 0);
// const totalLossYear = data.signals.reduce((acc:number, month:any) => acc + month.loss, 0);

// const yearlyPercentageProfit = (totalProfitYear / totalFinishedYear) * 100;
// const yearlyPercentageLoss = (totalLossYear / totalFinishedYear) * 100;

// const yearlyData = ()=>{
//   setIsSelected('yearly');
//   if(yearlyPercentageProfit == Number.NaN || yearlyPercentageProfit == Number.NaN
//     || !yearlyPercentageProfit || !yearlyPercentageLoss
//   ){
//     setLoss(0);
//     setProfit(0)
//   }else{
//     setLoss(yearlyPercentageLoss);
//     setProfit(yearlyPercentageProfit);
//   }
// }

// const monthlyData = ()=>{
//   setIsSelected('monthly')
//   if(currentMonthPercentageProfit == Number.NaN || currentMonthPercentageLoss == Number.NaN
//     || ! currentMonthPercentageProfit  || ! currentMonthPercentageLoss
//   ){
//     setLoss(0);
//     setProfit(0)
//   }else{
//     setLoss(currentMonthPercentageLoss);
//     setProfit(currentMonthPercentageProfit);
//   }
// }

//   return (
//     <View style={{ padding: 10, flex: 1 }}>
//       <Text style={[styles.title]}>Performance</Text>
//       <View style={[styles.yearlyMonthlyHolder]}>
//         <Pressable onPress={()=>yearlyData()}>
//           <Text style={isSelected==='yearly'?[styles.isSelected,styles.subtitle]:[styles.subtitle]}>Yearly</Text>
//         </Pressable>
//         <Pressable onPress={()=>monthlyData()}>
//           <Text style={isSelected==='monthly'?[styles.isSelected,styles.subtitle]:[styles.subtitle]}>Monthly</Text>
//         </Pressable>
//       </View>
//       <View style={{width:'50%',flexDirection:'row', alignItems:'center',}}>
//         <OcticonsTabBarIcon name="triangle-down" size={35} color='#FF0000' />
//         <Text style={{color:'#fff',marginLeft:5, fontSize:12,fontWeight:'bold', }}>
//           {`Loss: - ${loss}%`}
//         </Text> 
//       </View>
//       <View style={{width:'50%',flexDirection:'row', alignItems:'center',}}>
//         <OcticonsTabBarIcon name="triangle-up" size={35} color="#7CE67C" />
//         <Text style={{color:'#fff',marginLeft:5, fontSize:12,fontWeight:'bold', }}>
//           {`Profit: + ${profit}%`}
//         </Text>
//       </View>
//       <Pressable style={[styles.c]}>
//         <LineChart
//         areaChart
//         curved
//         data={inputData}
//         color="#07BAD1"
//         yAxisTextStyle={{color: 'lightgray'}}
//         xAxisLabelTextStyle={{color:'lightgray'}}
//         hideDataPoints
//         startFillColor={'rgb(84,219,234)'}
//         endFillColor={'#fff'}
//         startOpacity={0.4}
//         endOpacity={0.1}
//         rulesColor="gray"
//         rulesType='solid'
//         yAxisColor="lightgray"
//         xAxisColor="lightgray"
//         isAnimated
//         height={250}
//         animateOnDataChange
//         animationDuration={1000}
//         onDataChangeAnimationDuration={300}
//         noOfSections={3}
//         adjustToWidth={true}
//         showScrollIndicator={true}
//         />
//       </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     c:{ backgroundColor: '#1e1e1e', 
//         borderRadius: 10, 
//         padding: 10, 
//         marginVertical: 20,
//         width:'100%'
//     },
//     title: {
//       // textAlign: 'center',
//       fontSize:30,
//       fontWeight:'bold',
//       marginTop: 10,
//       marginBottom: 10,
//       color:'#fff',
//     },
//     subtitle: {
//       // textAlign:'center',
//       marginTop: 10,
//       marginBottom: 10,
//       color:'#fff',
//       fontSize:16,
//       fontWeight:'bold',
//     },
//     yearlyMonthlyHolder:{
//       width:'50%',
//       flexDirection:'row',
//       alignItems:'center',
//       justifyContent:'space-between'
//     },
//   isSelected:{
//     borderBottomWidth:2,
//     borderBottomColor:'#7CE67C'
//   },
//   skeletonItem: {
//     height:300,
//     // backgroundColor: '1e1e1e',
//     // borderRadius: 8,
//     marginBottom:10,
//     marginTop:10,
//   },
// })


