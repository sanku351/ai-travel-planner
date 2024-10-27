import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, {useLayoutEffect, useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; 
import { useFirebase } from './../components/Context/FirebaseContext'; // Use the context

const SignUp = () => {
  const navigation = useNavigation();
  const { auth } = useFirebase(); // Access auth from context
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [fullName,setFullName]=useState();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    const onCreateAccount=()=>{
      if(!email&&!password&&!fullName)
      {
        ToastAndroid.show('Please enter all details',ToastAndroid.LONG);
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    // Update the user's profile with the full name
    await updateProfile(user, { displayName: fullName });
    ToastAndroid.show('Account created successfully',ToastAndroid.LONG);
    navigation.navigate('SignIn');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage);
    ToastAndroid.show(errorMessage, ToastAndroid.LONG); // Show error message to user
    // ..
  });
  }
  return (
    <SafeAreaView className="bg-white flex-1 relative">
      <View className="p-4 mt-8 bg-white">
        <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}>
          <Ionicons name="arrow-back" size={30} color="#0B646B" />
        </TouchableOpacity>
        <Text className="text-[30px] font-bold mt-5 text-center text-[#0B646B]">Create Account</Text>
        <View className="px-2 mt-4">
          <Text className="text-[18px] mt-5 text-[#0B646B]">Full Name</Text>
          <TextInput style={styles.input} placeholder='Enter Full Name'
          onChangeText={(value)=>setFullName(value)}/>
        </View>
        <View className="px-2 mt-4">
          <Text className="text-[18px] text-[#0B646B]">Email</Text>
          <TextInput style={styles.input} placeholder='Enter Email'
          onChangeText={(value)=>setEmail(value)}/>
        </View>
        <View className="px-2 mt-4">
          <Text className="text-[18px] text-[#0B646B]">Password</Text>
          <TextInput style={styles.input} placeholder='Enter Password' onChangeText={(value)=>setPassword(value)}/>
        </View>
        <TouchableOpacity onPress={onCreateAccount} style={{padding:20,backgroundColor:'#0B646B',borderRadius:15,marginTop:50,marginStart:10,marginEnd:10,borderWidth:1}}>
          <Text style={{color:'white',textAlign:'center',fontSize:16}}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{padding:20,backgroundColor:'#ffffff',borderRadius:15,marginTop:20,marginStart:10,marginEnd:10,borderWidth:1}} onPress={()=>navigation.navigate("SignIn")}>
          <Text className="color-[black] text-center text-[16px]">SignIn</Text>
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
    //borderColor:"#3C6072"
  }
})

export default SignUp