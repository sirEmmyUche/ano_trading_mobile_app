import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { pricingAPI, initializePayment } from '@/APIs';
import { useMutation } from '@tanstack/react-query';
import CustomScrollView from '@/components/CustomScrollView';
import { useSession } from '@/context/userContext';

function SubscriptionScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [amounts, setAmounts] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const headerBackgroundColor = { light: '#A1CEDC', dark: '#1D3D47' };
  const {session} = useSession();

  const email = session?.user.email

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

  const mutation = useMutation({
    mutationFn: initializePayment,
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      setLoading(false);
      if (data.status === 'failed') {
        setError('There was an issue trying to initialize payment. Please try again later.');
      } else if (data.status === 'success' && data.authorization_url) {
        Linking.openURL(data.authorization_url);
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
      <CustomScrollView headerBackgroundColor={headerBackgroundColor}>
        <View style={styles.container}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <Button title="Back to Pricing" onPress={resetError} />
            </View>
          ) : (
            <View style={styles.pricingContentWrapper}>
              {['basic', 'standard', 'premium', 'supreme'].map((plan) => (
                <View key={plan} style={styles.planContainer}>
                  <Text style={styles.planTitle}>{plan.charAt(0).toUpperCase() + plan.slice(1)}</Text>
                  <Text style={styles.priceAmount}>
                    NGN{amounts[plan].amount} <Text style={styles.priceSpan}>/mon</Text>
                  </Text>
                  <View style={styles.pricePackageBox}>
                    <View style={styles.pricePackageContent}>
                      {plan === 'basic' && <>
                        <Text style={styles.markGood}>Forex Signals</Text>
                        <Text style={styles.markBad}>Stock Signals</Text>
                        <Text style={styles.markBad}>Crypto Signals</Text>
                        <Text style={styles.markBad}>Live Training</Text>
                      </>}
                      {plan === 'standard' && <>
                        <Text style={styles.markGood}>Forex Signals</Text>
                        <Text style={styles.markGood}>Stock Signals</Text>
                        <Text style={styles.markBad}>Crypto Signals</Text>
                        <Text style={styles.markBad}>Live Training</Text>
                      </>}
                      {plan === 'premium' && <>
                        <Text style={styles.markGood}>Forex Signals</Text>
                        <Text style={styles.markGood}>Stock Signals</Text>
                        <Text style={styles.markGood}>Crypto Signals</Text>
                        <Text style={styles.markBad}>Live Training</Text>
                      </>}
                      {plan === 'supreme' && <>
                        <Text style={styles.markGood}>Forex Signals</Text>
                        <Text style={styles.markGood}>Stock Signals</Text>
                        <Text style={styles.markGood}>Crypto Signals</Text>
                        <Text style={styles.markGood}>Live Training</Text>
                      </>}
                    </View>
                    {email ? (
                      <Button
                        title={loading && selectedPlan === plan ? 'Processing...' : 'Select'}
                        onPress={() => handleSelect({ plan, email, amount: amounts[plan].amount })}
                        disabled={loading && selectedPlan === plan}
                      />
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
          )}
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
      </CustomScrollView>
    </SafeAreaView>
  );
}

export default SubscriptionScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'red',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gold',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  pricingContentWrapper: {
    flex: 1,
  },
  planContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceAmount: {
    fontSize: 18,
    marginBottom: 8,
  },
  priceSpan: {
    fontSize: 14,
    color: '#888',
  },
  pricePackageBox: {
    marginTop: 8,
  },
  pricePackageContent: {
    marginBottom: 16,
  },
  markGood: {
    color: 'green',
    marginBottom: 4,
  },
  markBad: {
    color: 'red',
    marginBottom: 4,
  },
});


// import React, {useState,useEffect,useCallback} from 'react'
// import {View, Text, StyleSheet, SafeAreaView, Button,
//     Linking, ActivityIndicator, ScrollView} from 'react-native';
// import { pricingAPI, initializePayment } from '@/APIs';
// import { useMutation } from '@tanstack/react-query';
// import CustomScrollView from '@/components/CustomScrollView';


// function SubscriptionScreen(){
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
//     const [amounts, setAmounts] = useState<any>(null);
//     const [isFetching, setIsFetching] = useState(true);
//     const headerBackgroundColor = { light: '#A1CEDC', dark: '#1D3D47' };

//     // const isUser = useUserStore();
//     const email = 'user@mail.com'

//     useEffect(() => {
//         const fetchPrices = async () => {
//           try {
//             const data = await pricingAPI();
//             setAmounts(data.price);
//           } catch (err:any) {
//             console.error('fetch price error:', err)
//             setError('There was an issue getting price details, Please try again later.');
//           } finally {
//             setIsFetching(false);
//           }
//         };
//         fetchPrices();
//       }, [email]); //email should be added as the dependecy

//       console.log('the new amounts',amounts)

//       const mutation = useMutation({
//         mutationFn: initializePayment,
//         onMutate: () => {
//           setLoading(true);
//           setError(null);
//         },
//         onSuccess: (data) => {
//           setLoading(false);
//           if (data.status === 'failed') {
//             setError('There was an issue trying to initialize payment. Please try again later.');
//           } else if (data.status === 'success' && data.authorization_url) {
//             Linking.openURL(data.authorization_url);
//           }
//         },
//         onError: (error) => {
//           setLoading(false);
//           setError('Unable to process payment at this time. Please try again later.');
//           console.error('payment error:', error);
//         },
//       });
    
//       const handleSelect = useCallback((packageDetails:any) => {
//         setSelectedPlan(packageDetails.plan);
//         mutation.mutate(packageDetails);
//       }, [mutation]);
    
//       const resetError = () => {
//         setError(null);
//         setSelectedPlan(null);
//       };

//       if (isFetching) {
//         return (
//           <View style={styles.loaderContainer}>
//             <ActivityIndicator size="large" color="#0000ff" />
//           </View>
//         );
//       }


//     return(
//         <SafeAreaView style={styles.safeArea}>
//         <CustomScrollView headerBackgroundColor={headerBackgroundColor}>
//         <View style={styles.container}>
//       {error ? (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>{error}</Text>
//           <Button title="Back to Pricing" onPress={resetError} />
//         </View>
//       ) : (
//         <View style={styles.pricingContentWrapper}>
//           {['basic', 'standard', 'premium', 'supreme'].map((plan) => (
//             <View key={plan} style={styles.planContainer}>
//               <Text style={styles.planTitle}>{plan.charAt(0).toUpperCase() + plan.slice(1)}</Text>
//               <Text style={styles.priceAmount}>
//                 NGN{(amounts[plan].amount)} <Text style={styles.priceSpan}>/mon</Text>
//               </Text>
//               <View style={styles.pricePackageBox}>
//                 <View style={styles.pricePackageContent}>
//                   {plan === 'basic' && <>
//                     <Text style={styles.markGood}>Forex Signals</Text>
//                     <Text style={styles.markBad}>Stock Signals</Text>
//                     <Text style={styles.markBad}>Crypto Signals</Text>
//                     <Text style={styles.markBad}>Live Training</Text>
//                   </>}
//                   {plan === 'standard' && <>
//                     <Text style={styles.markGood}>Forex Signals</Text>
//                     <Text style={styles.markGood}>Stock Signals</Text>
//                     <Text style={styles.markBad}>Crypto Signals</Text>
//                     <Text style={styles.markBad}>Live Training</Text>
//                   </>}
//                   {plan === 'premium' && <>
//                     <Text style={styles.markGood}>Forex Signals</Text>
//                     <Text style={styles.markGood}>Stock Signals</Text>
//                     <Text style={styles.markGood}>Crypto Signals</Text>
//                     <Text style={styles.markBad}>Live Training</Text>
//                   </>}
//                   {plan === 'supreme' && <>
//                     <Text style={styles.markGood}>Forex Signals</Text>
//                     <Text style={styles.markGood}>Stock Signals</Text>
//                     <Text style={styles.markGood}>Crypto Signals</Text>
//                     <Text style={styles.markGood}>Live Training</Text>
//                   </>}
//                 </View>
//                 {email ? (
//                   <Button
//                     title={loading && selectedPlan === plan ? 'Processing...' : 'Select'}
//                     onPress={() => handleSelect({ plan, email, amount: amounts[plan].amount })}
//                     disabled={loading && selectedPlan === plan}
//                   />
//                 ) : null}
//               </View>
//             </View>
//           ))}
//         </View>
//       )}
//       {loading && <ActivityIndicator size="large" color="#0000ff" />}
//     </View>
//         </CustomScrollView>
//         </SafeAreaView>
//     )
// }

// export default SubscriptionScreen

// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//       },
//     container: {
//       flex: 1,
//       padding: 16,
//       backgroundColor: '#fff',
//       borderWidth:1,
//       borderColor:'red'
//     },
//     loaderContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     errorContainer:{
//         flex:1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       borderWidth:1,
//       borderColor:'gold'
//     },
//     errorText: {
//       color: 'red',
//       marginBottom: 16,
//       textAlign:'center'
//     },
//     pricingContentWrapper: {
//       flex: 1,
//     },
//     planContainer: {
//       marginBottom: 16,
//       padding: 16,
//       borderWidth: 1,
//       borderColor: '#ddd',
//       borderRadius: 8,
//     },
//     planTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginBottom: 8,
//     },
//     priceAmount: {
//       fontSize: 18,
//       marginBottom: 8,
//     },
//     priceSpan: {
//       fontSize: 14,
//       color: '#888',
//     },
//     pricePackageBox: {
//       marginTop: 8,
//     },
//     pricePackageContent: {
//       marginBottom: 16,
//     },
//     markGood: {
//       color: 'green',
//       marginBottom: 4,
//     },
//     markBad: {
//       color: 'red',
//       marginBottom: 4,
//     },
//   });