
import React,{useState} from 'react';
import { Text, View, StyleSheet, TextInput, 
  SafeAreaView, ScrollView,
  Pressable} from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import { useForm, Controller } from 'react-hook-form';
import { Link, useRouter } from 'expo-router';
// import { logIn } from '@/APIs';
import { signUp } from '@/APIs';
import { useMutation } from '@tanstack/react-query';
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
// import {useAuth, storeData,} from '@/context/userContext';
import { LinearGradient } from 'expo-linear-gradient';
import GoogleSignIn from '@/components/google_oauth2';


const formSchema = z.object({
email: z.string().email('Please enter a valid email'),
password: z.string().min(5, 'Password must be at least 8 characters'),
});

// type FormData = {
//   email: string
//   password: string
// }

export default function SignUpScree(){
  const [errorMessage, setErrorMessage] = useState('');
  const [disableButton, setDisableButton] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  // const { user, setUser,} = useAuth();
  const router = useRouter();
  const {handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {email:'',password:'',firstName:'',lastName:''},
    resolver: zodResolver(formSchema),
  });

    const mutation = useMutation({
    mutationFn:(formData:{firstName:string, lastName:string,
      email:string,password:string})=>signUp(formData),
    onSuccess: async (data) => {
      if(!data){
        setErrorMessage('No response from server. Please try again later.');
        setDisableButton(false)
      }
      if(data.success && data.status ==='success') {
        // Navigate to the home screen on successful login
        //store user details
        // setUser(data.user);
        // await storeData(data.user)
        setDisableButton(false)
        router.replace('/(tabs)/index')
      } else {
        // Show error message
        setErrorMessage(data.message || 'Sign up failed. Please try again later.');
        setDisableButton(false)
      }
    },
    onError:(error) => {
      console.error('sign up mutation error:', error)
      setErrorMessage('Unable to sign up. Please try again later.');
      setDisableButton(false)
    },
  });
 

  // const onChange = arg => {
  //   return {
  //     value: arg.nativeEvent.text,
  //   };
  // };

  // console.log('form errors:', errors);

  const onSubmit = (data:{firstName:string, lastName:string,
    email:string,password:string}) => {
    console.log('form details:',data);
    setDisableButton(true)
      mutation.mutate(data);
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <ScrollView contentContainerStyle={[styles.safeArea]}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <View style={[styles.headerContainer]}>
          <Text style={[styles.signInTitle]}>Sign Up</Text>
        </View>
        <View style={[styles.inputParentContainer]}>
          <View style={[styles.errorMsgView]}>
              <Text style={[styles.errMsg]}>{errorMessage?errorMessage:null}</Text>
          </View>
        <View style={[styles.labelView]}><Text style={[styles.labelText]}>First Name</Text></View>
      <Pressable style={[styles.inputWrapper]}>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            textContentType='name' 
            autoCapitalize='none'
             placeholder='Jon'
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="firstName"
        rules={{ required: true, }}
      />
      </Pressable>
        <View style={[styles.labelView]}><Text style={[styles.labelText]}>Last Name</Text></View>
      <Pressable style={[styles.inputWrapper]}>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            textContentType='name' 
            autoCapitalize='none'
             placeholder='Doe'
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="lastName"
        rules={{ required: true, }}
      />
      </Pressable>
        {/* <View style={[styles.errorMsgView]}>
            {errors.lastName && <Text style={[styles.formErrorMsg]}>This field is required</Text>}
        </View> */}
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
      <View style={[styles.labelView]}><Text style={[styles.labelText]}>Password</Text></View>
      <Pressable style={[styles.inputWrapper,styles.passwordPressable]}>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            textContentType='password'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry = {hidePassword}
            style={[styles.input, styles.passwordInput]}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="password"
        rules={{ required: true }}
      />
      <Pressable style={[styles.eye]}
        onPress={()=>setHidePassword(!hidePassword)}>
        <Octicons name={hidePassword?'eye-closed':'eye'} size={25} color={'#2471A3'}/>
      </Pressable>
      </Pressable>
      <View style={[styles.errorMsgView]}>
          {errors.password && <Text style={[styles.formErrorMsg]}>This field is required</Text>}
      </View>
      <Pressable
        style={[styles.button]}
        // disabled={disableButton}
        onPress={handleSubmit(onSubmit)}
        >
          <LinearGradient
           colors={!disableButton?[ '#27AE60','#2471A3',]:['#aaaaaa','#cccccc']}
           style={!disableButton?[styles.gradient]:[styles.gradient,{opacity:0.5}]}
           start={{ x: 0, y: 0.5 }}
           end={{ x: 1, y: 0.5 }}
           >
          <Text style={[styles.buttonText]}>Sign Up</Text>
          </LinearGradient>
      </Pressable>
      </View>
    <Pressable style={[styles.googleWrapper]}>
      <View style={[styles.signInOption]}>
        <View style={{borderTopWidth:1,borderTopColor:'#2471A3', width:'25%'}}></View>
        <Text style={[styles.labelText]}>Or sign up with</Text>
        <View style={{borderTopWidth:1,borderTopColor:'#2471A3', width:'25%'}}></View>
      </View>
      <Pressable style={[styles.google]}>
        <GoogleSignIn/>
        {/* <Text style={{color:'white'}}>Google</Text> */}
      </Pressable>
        <Pressable style={[styles.linkToOtherPage]}>
            <Text style={[styles.linkToOtherPageText]}>Have an account?</Text>
            <Link href={'/login'}>
                <Text style={[styles.linkToOtherPageText,{marginLeft:10,color:'#27AE60'}]}>Sign In</Text>
            </Link>
        </Pressable>
    </Pressable>
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
    backgroundColor: '#000000',
  },
  container: {
    // flex: 1,
    // height:'100%',
    padding:10,
    backgroundColor: '#000000',
  },
  headerContainer:{
    // flex:1,
    height:100,
    borderWidth:1,
    borderColor:'transparent',
    marginTop:7,
    marginBottom:7,
    alignItems:'baseline',
    justifyContent:'flex-end',
  },
  inputParentContainer:{
    // flex:5,
    borderWidth:1,
    borderColor:'transparent',
    marginTop:7,
    marginBottom:7,
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
  pwForgotView:{
    width:'100%', 
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
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
  passwordPressable:{
    flexDirection:'row',
    alignItems:'center'
  },
  passwordInput:{
    width:'100%',
    paddingRight:20
  },
  eye:{
    position:'absolute',
    right:0
  },
  input: {
    backgroundColor: '#010101',
    borderWidth:1,
    // borderColor:'#27AE60',
    borderColor:'#2471A3',
    // borderColor: '#666666',
    color:'#666666',
    height: 40,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    marginTop:5,
    // marginBottom:5,
    width:'100%',
    color: 'white',
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
  googleWrapper:{
    // flex:2,
    borderWidth:1,
    borderColor:'transparent',
    justifyContent:'flex-end',
  },
  google:{
    marginTop:15,
    justifyContent:'center',
    alignItems:'center'
  },
  linkToOtherPage:{
    marginTop:15,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  linkToOtherPageText:{
    color: '#fff',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  }

});


