import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import { useQuery } from '@tanstack/react-query';
import { fetchYearlyData } from '@/APIs';
import { useSession } from '@/context/userContext';
import { OcticonsTabBarIcon } from './navigation/TabBarIcon';
import { MotiView } from 'moti';

export default function TradingSignalsChart() {
  const [dataState, setDataState] = useState({
    loss: 0,
    profit: 0,
    isProfit: 0,
    isLoss: 0,
    isCompleted: 0,
    isClosed: 0,
    pending: 0,
    active: 0,
    isSelected: 'yearly'
  });

  const { session } = useSession();
  const token = session?.user.token;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['yearly-signals'],
    queryFn: () => fetchYearlyData(token),
  });

  const totalCompletedYear = data?.signals.reduce((acc:number, month:any) => acc + month.completed, 0) || 0;
  const totalClosedYear = data?.signals.reduce((acc:number, month:any) => acc + month.closed, 0) || 0;
  const totalFinishedYear = totalCompletedYear + totalClosedYear;
  const totalProfitYear = data?.signals.reduce((acc:number, month:any) => acc + month.profit, 0) || 0;
  const totalLossYear = data?.signals.reduce((acc:number, month:any) => acc + month.loss, 0) || 0;

  const yearlyPercentageProfit = totalFinishedYear ? (totalProfitYear / totalFinishedYear) * 100 : 0;
  const yearlyPercentageLoss = totalFinishedYear ? (totalLossYear / totalFinishedYear) * 100 : 0;

  useEffect(() => {
    setDataState(prevState => ({
      ...prevState,
      isSelected: 'yearly',
      profit: yearlyPercentageProfit,
      loss: yearlyPercentageLoss,
      isProfit: totalProfitYear,
      isClosed: totalClosedYear,
      isCompleted: totalCompletedYear,
      isLoss: totalLossYear,
      pending: data?.signals.reduce((acc:number, month:any) => acc + month.pending, 0) || 0,
      active: data?.signals.reduce((acc:number, month:any) => acc + month.active, 0) || 0,
    }));
  }, [data]);

  if (isLoading) {
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

  if (!data || !Array.isArray(data.signals) || data.signals.length === 0) {
    return (
      <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[styles.subtitle, { textAlign: 'center' }]}>
          No data available to display.
        </Text>
      </View>
    );
  }

  const inputData = data.signals.map((item:any) => ({
    value: item.signals,
    label: item.month
  }));

  const setYearlyData = () => {
    setDataState(prevState => ({
      ...prevState,
      isSelected: 'yearly',
      loss: yearlyPercentageLoss,
      profit: yearlyPercentageProfit,
      isProfit: totalProfitYear,
      isLoss: totalLossYear,
      isClosed: totalClosedYear,
      isCompleted: totalCompletedYear,
      pending: data?.signals.reduce((acc:number, month:any) => acc + month.pending, 0) || 0,
      active: data?.signals.reduce((acc:number, month:any) => acc + month.active, 0) || 0,
    }));
  };

  const setMonthlyData = () => {
    const currentMonth = data.signals.slice(-1)[0];
    const totalCurrentMonthFinishedTrade = currentMonth.completed + currentMonth.closed;
    const currentMonthPercentageProfit = (currentMonth.profit / totalCurrentMonthFinishedTrade) * 100 || 0;
    const currentMonthPercentageLoss = (currentMonth.loss / totalCurrentMonthFinishedTrade) * 100 || 0;

    setDataState({
      ...dataState,
      isSelected: 'monthly',
      loss: currentMonthPercentageLoss,
      profit: currentMonthPercentageProfit,
      isProfit: currentMonth.profit,
      isLoss: currentMonth.loss,
      isClosed: currentMonth.closed,
      isCompleted: currentMonth.completed,
      pending: currentMonth.pending,
      active: currentMonth.active,
    });
  };

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <Text style={styles.title}>Performance</Text>
      <View style={styles.toggleContainer}>
        <Pressable onPress={setYearlyData}>
          <Text style={dataState.isSelected === 'yearly' ? styles.selectedText : styles.subtitle}>Yearly</Text>
        </Pressable>
        <Pressable onPress={setMonthlyData}>
          <Text style={dataState.isSelected === 'monthly' ? styles.selectedText : styles.subtitle}>Monthly</Text>
        </Pressable>
      </View>
      <View style={styles.profitLossContainer}>
        <View style={styles.iconTextContainer}>
          <OcticonsTabBarIcon name="triangle-up" size={35} color="#7CE67C" />
          <Text style={styles.iconText}>{`Profit: + ${dataState.profit}%`}</Text>
        </View>
        <View style={styles.iconTextContainer}>
          <OcticonsTabBarIcon name="triangle-down" size={35} color="#FF0000" />
          <Text style={styles.iconText}>{`Loss: - ${dataState.loss}%`}</Text>
        </View>
      </View>
      <Pressable style={styles.chartContainer}>
        <Text style={styles.subtitle}>Signals/month</Text>
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
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>
          {`NB: Profit, loss, and graph are calculated relative to completed and closed signals, excluding ongoing active or pending trades. Completed: ${dataState.isCompleted} closed: ${dataState.isClosed} active: ${dataState.active} pending: ${dataState.pending} profit: ${dataState.isProfit} loss: ${dataState.isLoss}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
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
  selectedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#7CE67C',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: '50%',
    alignItems:'center'

  },
  profitLossContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '65%',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  noteContainer: {
    backgroundColor: '#1e1e1e',
    marginTop: 5,
    padding: 10,
  },
  noteText: {
    color: '#fff',
    opacity: 0.4,
    fontStyle: 'italic',
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
