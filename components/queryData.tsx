import { useQuery, keepPreviousData,useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Pressable, StyleSheet,Text,View,ActivityIndicator,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunity } from "./navigation/TabBarIcon";
import { useSession } from "@/context/userContext";

interface QueryDataProps {
  apiFunction: (page: number, token:string|undefined, status:string) => Promise<any>;
  renderData: (data: any) => React.ReactNode; // Add renderData prop
}

const QueryData: React.FC<QueryDataProps> = ({ apiFunction, renderData }) => {
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState<string>('') //statusType
  const [isSelected,setIsSelected] = useState(status)
  const {session} = useSession();
  const token = session?.user.token;
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error, isFetching, isPlaceholderData, } = useQuery({
    queryKey: ['signals', page,],
    queryFn: () => apiFunction(page,token,status),
    // staleTime: 0,
    placeholderData: keepPreviousData,
    refetchInterval: 600000, // Refetch every 10 minutes (600000 milliseconds)
  });

  if (isLoading) {
    return (
      <View style={[styles.serverResponse,]}>
         <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if(isError) {
    console.error("Error fetching live signals:", error);
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

  if(data.status === 'failed') {
    return (
      <View style={[styles.serverResponse,]}>
        <Text style={[styles.errResText]}>
          {data.message ||'There was an issue fetching signals. Please try again later.'}
        </Text>
      </View>
  );
  }

  const handleFilterChange = async (newFilter:string) => {
    setPage(0) // Setting it to 0 will ensure that all filter pages starts from page 1. 
    //This is good as it will remove the breaking issue 
    //( for instance if filter "All" is at the end page,
    // moving to "Pending" won't render any data even though there was data. 
    //So, setting the page to 0 will help fix it. 
    //However, the drawback to this is that each filter page will start at 0. 
    //Meaning that if a user is at page 5 in "All" before moving to "pending," 
    //on coming back to the "All" 
    //they will have to start all the way from page 1 again.
    setStatus(newFilter);
   queryClient.removeQueries({ queryKey: ['signals'],}) // type: 'inactive'
   await queryClient.refetchQueries({ queryKey: ['signals'],}) //type: 'active'
  };
  
  const hasSignals = data?.status === 'success' && 
  Array.isArray(data.signals) && data.signals.length > 0;


  return (
    <ScrollView contentContainerStyle={[styles.scrollView]}>
      {
        data.status === 'success' && (
          <>
            <View style={[styles.filterStatusContainer]}>
                <View style={{marginRight:10,alignItems:'center',}}>
                  <Text style={{color:'#fff', fontSize:18, fontWeight:'bold'}}>Filters:</Text>
                </View>
                <ScrollView  horizontal={true}
                  contentContainerStyle={{alignItems:'center',}}>
                <Text style={isSelected !==''?
                  [styles.filterStatusText]:[styles.isSelectedfilterStatusText]} 
                  onPress={()=>{
                    setIsSelected('');
                    handleFilterChange('')}}>
                  All
                </Text>
                <Text style={isSelected !=='pending'?
                  [styles.filterStatusText]:[styles.isSelectedfilterStatusText]} 
                  onPress={()=>{
                    setIsSelected('pending');
                    handleFilterChange('pending')}}>
                  Pending
                </Text>
                <Text style={isSelected !=='active'?
                  [styles.filterStatusText]:[styles.isSelectedfilterStatusText]} 
                  onPress={()=>{
                    setIsSelected('active');
                    handleFilterChange('active')}}>
                  Active
                </Text>
                <Text style={isSelected !=='deleted'?
                  [styles.filterStatusText]:[styles.isSelectedfilterStatusText]} 
                  onPress={()=>{
                  setIsSelected('deleted')
                    handleFilterChange('deleted')}}>
                  Deleted
                </Text>
                <Text style={isSelected !=='closed'?
                  [styles.filterStatusText]:[styles.isSelectedfilterStatusText]} 
                  onPress={()=>{
                    setIsSelected('closed');
                    handleFilterChange('closed')}}>
                  Closed
                </Text>
                <Text style={isSelected !=='completed'?
                  [styles.filterStatusText]:[styles.isSelectedfilterStatusText]} 
                  onPress={()=>{
                    setIsSelected('completed');
                    handleFilterChange('completed')}}>
                  Completed
                </Text>
                </ScrollView>
              </View>
              {
                data.status === 'success' && data.signals.length === 0 &&
                (
                  <View style={[styles.serverResponse,]}>
                    <Text style={[styles.errResText]}>{data.message}</Text>
                </View>
                )
              }
        </>
        )
      }
      {hasSignals && (
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
       ) 
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterStatusContainer:{
    flexDirection:'row', 
    justifyContent:'space-between',
    width:'100%',
    marginBottom:10,
    //  borderWidth:2,
    // borderColor:'blue',
  },
  filterStatusText:{
    fontSize:16,
    fontWeight:'bold',
    color:'#fff',
    opacity:0.5,
    marginLeft:10,
    marginRight:10
  },
  isSelectedfilterStatusText:{
    fontSize:16,
    fontWeight:'bold',
    color:'#fff',
    opacity:1,
    marginLeft:10,
    marginRight:10,
    borderBottomWidth:2,
    borderColor:'#7CE67C'
  },
  scrollView:{
    minHeight:'100%',
    padding:5,
    // borderColor:'red',
    // borderWidth:1,
    backgroundColor:'#121212',
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
