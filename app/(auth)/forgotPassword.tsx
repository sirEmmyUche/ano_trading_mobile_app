import React,{useState} from 'react';
import { Text, View, StyleSheet, TextInput, 
  SafeAreaView, ScrollView,
  Pressable,
  StatusBar} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Link,} from 'expo-router';
import { forgotPassword } from '@/APIs';
import { useMutation } from '@tanstack/react-query';
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view'


const formSchema = z.object({
email: z.string().email('Please enter a valid email'),
});

// type FormData = {
//   email: string
//   password: string
// }

export default function FogotPasswordScreen(){
  const [errorMessage, setErrorMessage] = useState('');
  const [disableButton, setDisableButton] = useState(false)
  const {handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {email:''},
    resolver: zodResolver(formSchema),
  });

    const mutation = useMutation({
    mutationFn:(formData:{email:string})=>forgotPassword(formData),
    onSuccess: async (data) => {
      if(!data){
        setErrorMessage('No response from server. Please try again later.');
        setDisableButton(false)
      }
      if(data.success && data.status ==='success') {
        setErrorMessage(data.message || 'A message has been sent to the email address.');
        setDisableButton(false)
      } else {
        // Show error message
        setErrorMessage(data.message || 'There was an issue. Please try again later.');
        setDisableButton(false)
      }
    },
    onError:(error) => {
      console.error('forgot password mutation error:', error)
      setErrorMessage('Something went wrong. Please try again later.');
      setDisableButton(false)
    },
  });


  const onSubmit = (data:{email:string}) => {
    setDisableButton(true)
      mutation.mutate(data);
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <ScrollView contentContainerStyle={[styles.safeArea]}>
      <View style={[styles.container]}>
        <View style={[styles.headerContainer]}>
          <Text style={[styles.signInTitle]}>Forgot Password</Text>
        </View>
        <View style={[styles.inputParentContainer]}>
          <View>
          <View style={{marginBottom:20, marginTop:20}}>
              <Text style={[{color:'white'}]}>Enter the email associated with your account and
              we'll send an email instructions on how to reset your password.
              </Text>
          </View>
          <View style={[styles.errorMsgView]}>
            <Text style={[styles.errMsg]}>{errorMessage?errorMessage:null}</Text>
          </View>
          <View style={[styles.labelView]}><Text style={[styles.labelText]}>Email</Text></View>
          <Pressable style={[styles.inputWrapper]}>
          <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
              <TextInput
                textContentType='emailAddress' 
                autoCapitalize='none'
                placeholder='example@gmail.com'
                style={styles.input}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="email"
            rules={{ required: true, }}
          />
          </Pressable>
          <View style={[styles.errorMsgView]}>
              {errors.email && <Text style={[styles.formErrorMsg]}>This field is required</Text>}
          </View>
          </View>
          <View>
          <Pressable
            style={[styles.button]}
            disabled={disableButton}
            onPress={handleSubmit(onSubmit)}
            >
              <LinearGradient
              colors={!disableButton?[ '#27AE60','#2471A3',]:['#aaaaaa','#cccccc']}
              style={!disableButton?[styles.gradient]:[styles.gradient,{opacity:0.5}]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              >
              <Text style={[styles.buttonText]}>Continue</Text>
              </LinearGradient>
          </Pressable>
          <Pressable style={[styles.linkToOtherPage]}>
            <Link href={'/login'}>
                <Text style={[styles.linkToOtherPageText,]}>Sign In</Text>
            </Link>
          </Pressable>
          <MaskedView
            style={{ flex: 1,flexDirection:'row',height:100,}} 
            maskElement={
              <View
                style={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth:1,
                  borderColor:'red'
                }}>
                <Text style={{fontSize:20,color:'white'}}>My name is checking whether it is working?</Text>
              </View>
            }
            >
            <LinearGradient
                colors={['red', 'blue', 'green']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{ flex: 1 }}/>
            </MaskedView>
          </View>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signInOption:{
    justifyContent:'space-around',
    flexDirection:'row',
    alignItems:'center'
  },
  safeArea:{
    flex:1,
    marginTop:StatusBar.currentHeight
  },
  container: {
    flex: 1,
    padding:10,
    backgroundColor: '#000000',
  },
  headerContainer:{
    flex:1,
    borderWidth:1,
    borderColor:'transparent',
    marginTop:7,
    marginBottom:7,
    alignItems:'baseline',
    justifyContent:'flex-end',
  },
  inputParentContainer:{
    flex:4,
    borderWidth:1,
    borderColor:'transparent',
    marginTop:7,
    marginBottom:7,
    justifyContent:'space-between'
  },
  signInTitle:{
    color:'#fff',
    fontSize:30,
    fontWeight: 'bold',
  },
  errorMsgView:{
    // marginTop:3,
    marginBottom:5,
    borderWidth:1,
    borderColor:'transparent'
  },
  errMsg:{
    color:'#e73c7e',
    textAlign:'center',
    fontSize: 16,
    lineHeight: 24,
  },
  formErrorMsg:{
      color:'#e73c7e',
      fontSize: 15,
      lineHeight: 24,
      textAlign:'left',
  },
  labelView: {
    marginTop:3,
    marginBottom:3,
  },
  labelText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  inputWrapper:{
    borderWidth:1,
    marginTop:5,
    marginBottom:5
  },
  input: {
    backgroundColor: '#010101',
    borderWidth:1,
    borderColor:'#fff',
    opacity:0.3,
    fontSize:20,
    color:'#fff',
    height: 40,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    marginTop:5,
    width:'100%',
    color: '#fff',
    height: 40,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    color:'#fff',
    textAlign:'center',
    fontSize:20,
    fontWeight: 'bold',
  },
  gradient:{
    flex:1, 
    borderRadius:10,
    width:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  maskedView:{
    flex:1,
    flexDirection:'row',
    height:'100%',
  },
  maskedText: {
    fontSize: 16,
    color: 'transparent', // This color will be masked by the gradient
  },
  linkToOtherPage:{
    marginTop:15,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  linkToOtherPageText:{
    color:'#27AE60',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  }

});


