import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { Pressable, StyleSheet,Text,View,ActivityIndicator,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunity } from "./navigation/TabBarIcon";
import { useSession } from "@/context/userContext";

interface QueryDataProps {
  apiFunction: (page: number, token:string|undefined) => Promise<any>;
  renderData: (data: any) => React.ReactNode; // Add renderData prop
}

const QueryData: React.FC<QueryDataProps> = ({ apiFunction, renderData }) => {
  const [page, setPage] = useState(0);
  const {session} = useSession();
  const token = session?.user.token;
  const { isLoading, isError, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['signals', page],
    queryFn: () => apiFunction(page,token),
    placeholderData: keepPreviousData,
    refetchInterval: 600000, // Refetch every 10 minutes (600000 milliseconds)
  });

  if (isLoading) {
    return (
      <View style={[styles.serverResponse,]}>
         <ActivityIndicator size="large" color="#0000ff" />
        {/* <Text style={[styles.errResText]}>Loading...</Text> */}
      </View>
    );
  }

  if(isError) {
    console.error("Error fetching past signals:", error);
    return (
      <View style={[styles.serverResponse,]}>
        <Text style={[styles.errResText]}>
          Unable to display signals. Please try again later.
        </Text>
      </View>
    );
  }

  if(!data) {
    return (
      <View style={[styles.serverResponse,]}>
          <Text style={[styles.errResText]}>
            No response from server. Please try again later.
          </Text>
      </View>
    );
  }

  if (data.status === 'failed') {
    return (
      <View style={[styles.serverResponse,]}>
        <Text style={[styles.errResText]}>{data.message}</Text>
      </View>
  );
  }

  const hasSignals = data.status === 'success' && data.signals.length > 0;

  return (
    <ScrollView contentContainerStyle={[styles.scrollView]}>
      {hasSignals ? (
        <>
        {renderData(data)}
          <View style={[styles.paginationHolder]}>
            <Text style={[styles.text]}>Current Page: {page + 1}</Text>
            <View style={styles.buttonHolder}>
              <Pressable
                style={styles.btn}
                onPress={() => setPage((old) => Math.max(old - 1, 0))}
                disabled={page === 0}
              >
                <LinearGradient
                  colors={page !== 0?
                    [ '#27AE60','#2471A3',]:['#aaaaaa','#cccccc']}
                  style={page !== 0?[styles.gradient]:[styles.gradient,{opacity:0.5}]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  >
                 <Text style={[styles.btnTxt]}>Previous</Text>
              </LinearGradient>
              </Pressable>
              <Pressable
                style={styles.btn}
                onPress={() => {
                  if (!isPlaceholderData && data.hasMore) {
                    setPage((old) => old + 1);
                  }
                }}
                disabled={isPlaceholderData || !data?.hasMore}
              >
                <LinearGradient
                  colors={isPlaceholderData || data?.hasMore?
                    [ '#27AE60','#2471A3',]:['#aaaaaa','#cccccc']}
                  style={isPlaceholderData || data?.hasMore
                    ?[styles.gradient]:[styles.gradient,{opacity:0.5}]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  >
                 <Text style={[styles.btnTxt]}>
                  {isPlaceholderData || data?.hasMore?'Next':
                  <MaterialCommunity name={'cancel'} size={24} color={'#e74c3c'}/>
                  }
                  </Text>
              </LinearGradient>
              </Pressable>
            </View>
            <Text style={[styles.text]}>{isFetching ? 'Loading...' : null}</Text>
          </View>
        </>
      ) : (
        <View style={[styles.serverResponse,]}>
        <Text style={[styles.errResText]}>
          There was an issue fetching signals. Please try again later.
        </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView:{
    minHeight:'100%',
    padding:5,
    // borderColor:'red',
    // borderWidth:1,
    backgroundColor:'#121212',
  },
  mainContainer:{
    backgroundColor:'#121212',
    borderColor:'blue',
    height:'100%',
    borderWidth:1,
    padding:5
  },
  btnTxt:{
    color:'#fff',
    fontWeight:'600'
  },
  gradient:{
    flex:1, 
    borderRadius:10,
    width:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonHolder: {
    flexDirection:'row',
    marginTop: 10,
    width:'100%',
    justifyContent:'space-between',
    alignItems:'center'
  },
  btn: {
    marginTop:5,
    // marginBottom:5,
    width:'45%',
    color: 'white',
    borderWidth:1,
    borderColor:'transparent',
    height: 40,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center'
  },
  text: {
    color: '#fff',
    opacity:0.6
  },
  serverResponse: {
   flex:1,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderColor:'transparent',
    backgroundColor:'#121212'
  },
  errResText:{
    color:'#e74c3c',
    fontSize:20,
    fontWeight:'600',
    textAlign:'center'
  },
  paginationHolder: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:2,
    // borderColor:'blue',
    backgroundColor:'#121212'
  },
  
});

export default QueryData;
