import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
//import { auth } from '../config/FirebaseConfig';
import { useFirebase } from '../components/Context/FirebaseContext';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const navigation=useNavigation();
  const { auth } = useFirebase(); // Use the hook to access auth
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  useEffect(()=>{
    navigation.setOptions({
      headerShown:false
    })
  },[])
  const onSignIn=()=>{
    if(!email&&!password)
    {
      ToastAndroid.show('Please enter email & password',ToastAndroid.LONG)
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    ToastAndroid.show('SignIn Successful',ToastAndroid.LONG);
    navigation.navigate('Main');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode)
    if(errorCode=='auth/invalid-credential')
    {
      ToastAndroid.show('Invalid Credentials',ToastAndroid.LONG);
    }
  });

  }
  return (
    <SafeAreaView className="bg-white flex-1 relative">
    <View className="p-4 mt-8 bg-white">
      <Text className="text-[30px] font-bold mt-5 text-start text-[#0B646B]">Let's Sign In</Text>
      <Text className="text-[30px] font-thin mt-4">Welcome Back</Text>
      <Text className="text-[25px] font-bold mt-5 text-[#0B646B]">You've been missed !</Text>
      <View className="px-2 mt-8">
        <Text className="text-[18px] text-[#0B646B]">Email</Text>
        <TextInput style={styles.input}placeholder='Enter Email' onChangeText={(value)=>setEmail(value)}/>
      </View>
      <View className="px-2 mt-4">
        <Text className="text-[18px] text-[#0B646B]">Password</Text>
        <TextInput secureTextEntry={true} style={styles.input}placeholder='Enter Password'onChangeText={(value)=>setPassword(value)}/>
      </View>
      <TouchableOpacity onPress={onSignIn}style={{padding:20,borderRadius:15,backgroundColor:'#0B646B',marginTop:50,marginStart:10,marginEnd:10,borderWidth:1}}>
        <Text className="text-[16px] text-[#ffffff] text-center">Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}style={{padding:20,backgroundColor:'#ffffff',borderRadius:15,marginTop:20,marginStart:10,marginEnd:10,borderWidth:1}}>
          <Text className="color-[black] text-center text-[16px]">SignUp</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input:{
    marginTop:5,
    padding:15,
    borderWidth:1, 
    borderRadius:15,
  }
})

export default SignIn