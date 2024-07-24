import React,{useState} from 'react';
import { Text, View, StyleSheet, TextInput, 
  SafeAreaView, ScrollView, KeyboardAvoidingView, Platform,
  Pressable} from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import { useForm, Controller } from 'react-hook-form';
import { Link, useRouter } from 'expo-router';
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from '@/context/userContext';
import { LinearGradient } from 'expo-linear-gradient';
import GoogleSignIn from '@/components/google_oauth2';

const formSchema = z.object({
email: z.string().email('Please enter a valid email'),
password: z.string().min(5, 'Password must be at least 8 characters'),
});

export default function LoginScree(){
  const [errorMessage, setErrorMessage] = useState('');
  const [disableButton, setDisableButton] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const { signIn } = useSession();
  const router = useRouter();
  const {handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {email: '',password: ''},
    resolver: zodResolver(formSchema),
  });

    const onSubmit = async (data: { email: string; password: string }) => {
    setDisableButton(true);
    const error = await signIn(data);
    if (error) {
      setErrorMessage(error);
      setDisableButton(false);
    } else {
      setErrorMessage('');
      setDisableButton(false);
      router.replace('../(tabs)');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       style={[styles.safeArea]}
       >

<ScrollView contentContainerStyle={[styles.safeArea]}>
      <View style={[styles.container]}>
        <View style={[styles.headerContainer]}>
          <Text style={[styles.signInTitle]}>Sign In</Text>
        </View>
        <View style={[styles.inputParentContainer]}>
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
      <View style={[styles.errorMsgView,styles.pwForgotView]}>
            <View style={[{width:'45%'}]}>
              {errors.password && <Text style={[styles.formErrorMsg]}>This field is required.</Text>}
            </View>
            <Pressable style={[{alignItems:'flex-end'}]}>
            <Link href={'/forgotPassword'}>
              <Text style={[styles.maskedText,]}>Forgot Password</Text>
            </Link>
            </Pressable>
      </View>
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
          <Text style={[styles.buttonText]}>Sign In</Text>
          </LinearGradient>
      </Pressable>
      </View>
    <Pressable style={[styles.googleWrapper]}>
      <View style={[styles.signInOption]}>
        <View style={{borderTopWidth:1,borderTopColor:'#2471A3', width:'25%'}}></View>
        <Text style={[styles.labelText]}>Or sign in with</Text>
        <View style={{borderTopWidth:1,borderTopColor:'#2471A3', width:'25%'}}></View>
      </View>
      <Pressable style={[styles.google]}>
        <GoogleSignIn/>
        {/* <Text style={{color:'white'}}>Google</Text> */}
      </Pressable>
        <Pressable style={[styles.linkToOtherPage]}>
            <Text style={[styles.linkToOtherPageText]}>Don't have an account?</Text>
            <Link href={'/register'}>
                <Text style={[styles.linkToOtherPageText,{marginLeft:10,color:'#27AE60'}]}>Sign Up</Text>
            </Link>
        </Pressable>
    </Pressable>
    </View>
    </ScrollView>
      </KeyboardAvoidingView>
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
    flex: 1,
    padding:10,
    backgroundColor: '#000000',
    justifyContent:'space-evenly',
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
    // flex:4,
    borderWidth:1,
    borderColor:'transparent',
    marginTop:7,
    marginBottom:25,
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
    fontWeight:'bold',
    color: '#27AE60', // This color will be masked by the gradient
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




// // login.tsx
// import React, { useState } from 'react';
// import { Text, View, StyleSheet, TextInput, SafeAreaView,
//    ScrollView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
// import Octicons from '@expo/vector-icons/Octicons';
// import { useForm, Controller } from 'react-hook-form';
// import { Link, useRouter } from 'expo-router';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useSession } from '@/context/userContext';
// import { LinearGradient } from 'expo-linear-gradient';

// const formSchema = z.object({
//   email: z.string().email('Please enter a valid email'),
//   password: z.string().min(5, 'Password must be at least 8 characters'),
// });

// export default function LoginScreen() {
//   const [errorMessage, setErrorMessage] = useState('');
//   const [disableButton, setDisableButton] = useState(false);
//   const [hidePassword, setHidePassword] = useState(true);
//   const { signIn } = useSession();
//   const router = useRouter();
//   const { handleSubmit, control, formState: { errors } } = useForm({
//     defaultValues: { email: '', password: '' },
//     resolver: zodResolver(formSchema),
//   });

//   const onSubmit = async (data: { email: string; password: string }) => {
//     setDisableButton(true);
//     const error = await signIn(data);
//     if (error) {
//       setErrorMessage(error);
//       setDisableButton(false);
//     } else {
//       setErrorMessage('');
//       router.push('/somewhere'); // Redirect to some page after successful login
//     }
//   };

//   return (
//     <SafeAreaView style={[styles.safeArea]}>
//       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[styles.safeArea]}>
//         <ScrollView contentContainerStyle={[styles.safeArea]}>
//           <View style={[styles.container]}>
//             <View style={[styles.headerContainer]}>
//               <Text style={[styles.signInTitle]}>Sign In</Text>
//             </View>
//             <View style={[styles.inputParentContainer]}>
//               <View style={[styles.errorMsgView]}>
//                 <Text style={[styles.errMsg]}>{errorMessage ? errorMessage : null}</Text>
//               </View>
//               <View style={[styles.labelView]}><Text style={[styles.labelText]}>Email</Text></View>
//               <Pressable style={[styles.inputWrapper]}>
//                 <Controller
//                   control={control}
//                   render={({ field: { onChange, onBlur, value } }) => (
//                     <TextInput
//                       textContentType='emailAddress'
//                       autoCapitalize='none'
//                       placeholder='example@gmail.com'
//                       style={styles.input}
//                       onBlur={onBlur}
//                       onChangeText={value => onChange(value)}
//                       value={value}
//                     />
//                   )}
//                   name="email"
//                   rules={{ required: true }}
//                 />
//               </Pressable>
//               <View style={[styles.errorMsgView]}>
//                 {errors.email && <Text style={[styles.formErrorMsg]}>This field is required</Text>}
//               </View>
//               <View style={[styles.labelView]}><Text style={[styles.labelText]}>Password</Text></View>
//               <Pressable style={[styles.inputWrapper]}>
//                 <Controller
//                   control={control}
//                   render={({ field: { onChange, onBlur, value } }) => (
//                     <TextInput
//                       textContentType='password'
//                       autoCapitalize='none'
//                       secureTextEntry={hidePassword}
//                       placeholder='password'
//                       style={styles.input}
//                       onBlur={onBlur}
//                       onChangeText={value => onChange(value)}
//                       value={value}
//                     />
//                   )}
//                   name="password"
//                   rules={{ required: true }}
//                 />
//                 <Pressable style={{ marginLeft: 280 }} onPress={() => setHidePassword(!hidePassword)}>
//                   <Octicons name={hidePassword ? 'eye-closed' : 'eye'} size={22} />
//                 </Pressable>
//               </Pressable>
//               <View style={[styles.errorMsgView]}>
//                 {errors.password && <Text style={[styles.formErrorMsg]}>This field is required</Text>}
//               </View>
//             </View>
//             <Pressable disabled={disableButton} onPress={handleSubmit(onSubmit)} style={[styles.loginButton, disableButton && styles.buttonDisabled]}>
//               <LinearGradient colors={['#64b5f6', '#2196f3']} style={[styles.gradientButton]}>
//                 <Text style={[styles.buttonText]}>Sign In</Text>
//               </LinearGradient>
//             </Pressable>
//             <View style={[styles.forgotPasswordContainer]}>
//               <Link href={{ pathname: '/password-reset' }} style={[styles.forgotPasswordLink]}>Forgot Password?</Link>
//             </View>
//             <View style={[styles.registerContainer]}>
//               <Text style={[styles.registerText]}>Don’t have an account? </Text>
//               <Link href={{ pathname: '/signup' }} style={[styles.registerLink]}>Sign Up</Link>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1 },
//   container: { flex: 1, padding: 20 },
//   headerContainer: { marginBottom: 30 },
//   signInTitle: { fontSize: 24, fontWeight: 'bold' },
//   inputParentContainer: { marginBottom: 20 },
//   errorMsgView: { marginBottom: 10 },
//   errMsg: { color: 'red' },
//   labelView: { marginBottom: 5 },
//   labelText: { fontSize: 16, fontWeight: 'bold' },
//   inputWrapper: { flexDirection: 'row', alignItems: 'center' },
//   input: { flex: 1, borderBottomWidth: 1, borderColor: '#ddd', paddingVertical: 5 },
//   formErrorMsg: { color: 'red' },
//   loginButton: { marginTop: 20, borderRadius: 5 },
//   buttonDisabled: { opacity: 0.5 },
//   gradientButton: { padding: 15, alignItems: 'center', borderRadius: 5 },
//   buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   forgotPasswordContainer: { marginTop: 20, alignItems: 'center' },
//   forgotPasswordLink: { color: '#2196f3' },
//   registerContainer: { marginTop: 20, flexDirection: 'row', justifyContent: 'center' },
//   registerText: { fontSize: 16 },
//   registerLink: { color: '#2196f3' },
// });



