import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import { useQuery } from '@tanstack/react-query';
import { fetchYearlyData } from '@/APIs';
import { useSession } from '@/context/userContext';
// // Function to fetch monthly data
// const fetchMonthlyData = async () => {
//   const response = await axios.get('/api/monthly-signals');
//   return response.data.map((item, index) => ({ value: item.value, label: ${index + 1} }));
// };


export default function TradingSignalsChart(){
  const [view, setView] = useState<string|[]>([]);
  const {session} = useSession();
  const token = session?.user.token;

  const {data, isLoading, isFetching, error} = useQuery({
    queryKey:['yearly-signals',], 
    queryFn: ()=> fetchYearlyData(token)
});

const inputData = [{
    label: data?.signals.map((item:any)=>item.month),
    value: data?.signals.map((item:any)=>item.forex)
}]

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
        {view === 'monthly' ? 'Total Signals Sent This Month' : 'Total Signals Sent This Year'}
      </Text>
      <LineChart
        areaChart
        data={inputData}
        height={300}
        startFillColor="rgba(29, 139, 241, 0.5)"
        endFillColor="rgba(29, 139, 241, 0.1)"
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
        <Button title="Monthly" onPress={() => setView('monthly')} />
        <Button title="Yearly" onPress={() => setView('yearly')} />
      </View>
    </View>
  );
};

