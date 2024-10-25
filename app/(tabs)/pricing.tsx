import React, { useState, useEffect, useCallback } from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,
  StatusBar,Pressable,ActivityIndicator,Platform,
} from 'react-native';
import { pricingAPI, initializePayment } from '@/APIs';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation } from '@tanstack/react-query';
import { useSession } from '@/context/userContext';
import { IoniconsTabBarIcon } from '@/components/navigation/TabBarIcon';
import * as WebBrowser from 'expo-web-browser';

function SubscriptionScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [amounts, setAmounts] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const { session } = useSession();

  const email = session?.user.email;
  const token = session?.user.token;

  const fetchPrices = async () => {
    try {
      const data = await pricingAPI();
      setAmounts(data.price);
      setError(null); // Clear any previous errors
    } catch (err: any) {
      console.error('fetch price error:', err);
      setError('There was an issue getting price details, Please try again later.');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, [email]);

  const handleOpenWebBrowserPayment = async (url: string) => {
    try {
      const result = await WebBrowser.openBrowserAsync(url);
      if (result.type === 'dismiss' || result.type === 'cancel') {
        setLoading(false); // Reset loading state or perform other cleanup
      }
    } catch (error) {
      console.error('Error opening browser:', error);
      setError('Something went wrong. Please try again.'); // Set error message
    }
  };

  const mutation = useMutation({
    // mutationFn: initializePayment,
    mutationFn: (packageDetails: any) => {
      return initializePayment(packageDetails, token);
    },
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: async(data) => {
      setLoading(false);
      if (data.status === 'failed') {
        setError('There was an issue trying to initialize payment. Please try again later.');
      } else if (data.status === 'success' && data.authorization_url){
        await handleOpenWebBrowserPayment(data.authorization_url)
      }
    },
    onError: (error) => {
      setLoading(false);
      setError('Unable to process payment at this time. Please try again later.');
      console.error('payment error:', error);
    },
  });

  const handleSelect = useCallback(
    (packageDetails: any) => {
      setSelectedPlan(packageDetails.plan);
      mutation.mutate(packageDetails);
    },
    [mutation]
  );

  const resetError = () => {
    setError(null);
    setSelectedPlan(null);
    setIsFetching(true); // Set fetching state to true
    fetchPrices(); // Re-fetch the prices
  };

  if (isFetching) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{minHeight:'100%'}}>
        <View style={styles.container}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
             <Pressable onPress={resetError}
             style={[styles.button]}>
             <Text style={[styles.btnTxt]}>Back to Pricing</Text>
             </Pressable>
            </View>
          ) : (
            <View style={styles.pricingContentWrapper}>
              {['basic', 'standard', 'premium', 'supreme'].map((plan) => {
                const gradientColors:any = {
                  basic: ['#030101', '#7CE67C', '#FFFFFF'],
                  standard: ['#030101', '#FFA500', '#FFFFFF'],
                  premium: ['#030101', '#FF0000', '#FFFFFF'],
                  supreme: ['#030101', '#9900FF', '#FFFFFF'],
                };

                return (
                  <LinearGradient
                    key={plan}
                    colors={gradientColors[plan]}
                    style={[styles.planContainer,styles.shadow]}
                    locations={[0.5,1,0.8]}
                    end={{x: 0.1, y: 0.2 }}
                    start={{ x:0, y: 0.7}}
                  >
                    <Text style={styles.planTitle}>{plan.charAt(0).toUpperCase() + plan.slice(1)}</Text>
                    <View>
                      <Text style={styles.priceAmount}>
                      ₦{parseFloat(amounts[plan].amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        <Text style={[styles[`${plan}Span` as StyleKeys]]}>/mon</Text>
                      </Text>
                    </View>
                    {/* <View>
                      <Text style={styles.priceAmount}>
                      ${parseFloat(amounts[plan].amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        <Text style={[styles[`${plan}Span` as StyleKeys]]}>/mon</Text>
                      </Text>
                    </View> */}
                    <View style={styles.pricePackageBox}>
                      <View style={styles.pricePackageContent}>
                        {plan === 'basic' && <>
                        <View>
                        <View style={[styles.markGood]}>
                          <IoniconsTabBarIcon name={'checkmark-sharp'} color={'#7CE67C'} size={24}/>
                          <Text style={[styles.markGoodText]}>Forex Signals</Text>
                        </View>
                        <View style={[styles.markGood]}>
                          <IoniconsTabBarIcon name={'close-sharp'} color={'#FF0000'} size={24}/>
                          <Text style={[styles.markBadText]}>Stock Signals</Text>
                        </View>
                        <View style={[styles.markGood]}>
                          <IoniconsTabBarIcon name={'close-sharp'} color={'#FF0000'} size={24}/>
                          <Text style={[styles.markBadText]}>Crypto Signals</Text>
                        </View>
                        <View style={[styles.markGood]}>
                          <IoniconsTabBarIcon name={'close-sharp'} color={'#FF0000'} size={24}/>
                          <Text style={[styles.markBadText]}>Live Analysis</Text>
                        </View>
                        </View>
                        </>}
                        {plan === 'standard' && <>
                          <View>
                        <View style={[styles.markGood]}>
                          <IoniconsTabBarIcon name={'checkmark-sharp'} color={'#7CE67C'} size={24}/>
                          <Text style={[styles.markGoodText]}>Forex Signals</Text>
                        </View>
                        <View style={[styles.markGood]}>
                          <IoniconsTabBarIcon name={'checkmark-sharp'} color={'#7CE67C'} size={24}/>
                          <Text style={[styles.markGoodText]}>Stock Signals</Text>
                        </View>
                        <View style={[styles.markGood]}>
                          <IoniconsTabBarIcon name={'close-sharp'} color={'#FF0000'} size={24}/>
                          <Text style={[styles.markBadText]}>Crypto Signals</Text>
                        </View>
                        <View style={[styles.markGood]}>
                          <IoniconsTabBarIcon name={'close-sharp'} color={'#FF0000'} size={24}/>
                          <Text style={[styles.markBadText]}>Live Analysis</Text>
                        </View>
                        </View>
                        </>}
                        {plan === 'premium' && <>
                          <View>
                        <View style={[styles.markGood]}>
                          <IoniconsTabBarIcon name={'checkmark-sharp'} color={'#7CE67C'} size={24}/>
                          <Text style={[styles.markGoodText]}>Forex Signals</Text>
                        </View>
                        <View style={[styles.markGood]}>
                          <IoniconsTabBarIcon name={'checkmark-sharp'} color={'#7CE67C'} size={24}/>
                          <Text style={[styles.markGoodText]}>Stock Signals</Text>
                        </View>
                        <View style={[styles.markGood]}>
                          <IoniconsTabBarIcon name={'checkmark-sharp'} color={'#7CE67C'} size={24}/>
                          <Text style={[styles.markGoodText]}>Crypto Signals</Text>
                        </View>
                        <View style={[styles.markGood]}>
                          <IoniconsTabBarIcon name={'close-sharp'} color={'#FF0000'} size={24}/>
                          <Text style={[styles.markBadText]}>Live Analysis</Text>
                        </View>
                        </View>
                        </>}
                        {plan === 'supreme' && <>
                          <View>
                        <View style={[styles.markGood]}>
                          <IoniconsTabBarIcon name={'checkmark-sharp'} color={'#7CE67C'} size={24}/>
                          <Text style={[styles.markGoodText]}>Forex Signals</Text>
                        </View>
                        <View style={[styles.markGood]}>
                          <IoniconsTabBarIcon name={'checkmark-sharp'} color={'#7CE67C'} size={24}/>
                          <Text  style={[styles.markGoodText]}>Stock Signals</Text>
                        </View>
                        <View style={[styles.markGood]}>
                          <IoniconsTabBarIcon name={'checkmark-sharp'} color={'#7CE67C'} size={24}/>
                          <Text  style={[styles.markGoodText]}>Crypto Signals</Text>
                        </View>
                        <View style={[styles.markGood]}>
                          <IoniconsTabBarIcon name={'checkmark-sharp'} color={'#7CE67C'} size={24}/>
                          <Text style={[styles.markGoodText]}>Live Analysis</Text>
                        </View>
                        </View>
                        </>}
                      </View>
                      {email ? (
                        <Pressable
                        onPress={() => handleSelect({ plan, email, amount: amounts[plan].amount })}
                        disabled={loading && selectedPlan === plan}
                        style={loading && selectedPlan === plan?[styles.isDisabled]:[styles.button]}
                        >
                          <Text style={[styles.btnTxt]}
                          >{loading && selectedPlan === plan?<ActivityIndicator size="small" color="#0000ff" /> 
                          : 'Select'}</Text>
                        </Pressable>
                      ) : null}
                    </View>
                  </LinearGradient>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SubscriptionScreen;

type StyleKeys = keyof typeof styles;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: '#f5f5f5',
    backgroundColor:'#121212'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#121212'
  },
  errorContainer: {
    minHeight:'100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontWeight:'500',
    color:'#FF0000',
    marginBottom: 16,
    textAlign: 'center',
  },
  pricingContentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shadow:{
    ...Platform.select({
      ios:{
        shadowColor: '#000',
        shadowOffset:{width:1,height:2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android:{
        shadowColor: '#000',
        elevation:3,
      }
    })
  },
  planContainer: {
    width:'90%',
    marginBottom:10,
    marginTop:10,
    borderRadius: 8,
    padding: 16,
    borderWidth:1,
    borderColor:'transparent',
  },
  planTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:20,
    color:'#fff',
    backgroundColor: '#030101',
    borderBottomRightRadius: 50,
    textAlign: 'center',
  },
  priceAmount: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'right',
    fontWeight:'600',
  },
  priceSpan: {
    fontSize: 14,
    color: '#888',
  },
  basicSpan: {
    color: '#7CE67C',
  },
  standardSpan: {
    color: '#FFA500',
  },
  premiumSpan: {
    color: '#FF0000',
  },
  supremeSpan: {
    color: '#9900FF',
  },
  pricePackageBox: {
    marginTop: 8,
  },
  pricePackageContent: {
    marginBottom: 16,
  },
  markGood:{
    flexDirection:'row',
    // justifyContent:'space-between',
    alignContent:'center',
    alignItems:'center',
    marginBottom: 4,
  },
  markBad:{
    flexDirection:'row',
    // justifyContent:'space-between',
    alignContent:'center',
    alignItems:'center',
    marginBottom: 4,
  },
  markGoodText:{
    fontWeight:'500',
    color:'#7CE67C',
    justifyContent:'center'
  },
  markBadText:{
    fontWeight:'500',
    color:'#FF0000',
    justifyContent:'center'
  },
  btnTxt:{
    color:'#fff',
    fontWeight:'500',
    textAlign:'center',
  },
  button:{
    // backgroundColor:'#00BFFF',
    backgroundColor:'#2C2D2D',
    borderRadius:5,
    padding:8,
    justifyContent:'center',
    alignItems:'center'
  },
  isDisabled:{
    backgroundColor:'#aaaaaa',
    justifyContent:'center',
    alignItems:'center',
    opacity:0.5,
    padding:8,
    borderRadius:5,
  },
});


