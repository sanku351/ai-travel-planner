import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { EmailLogo, GoogleLogo, HeroImage } from '../assets'
import { useNavigation } from '@react-navigation/native'

const Explore = () => {
  const navigation=useNavigation();
  useEffect(()=>{
    navigation.setOptions({
      headerShown:false

    })
  },[])
  return (
    <View className="flex-1 bg-white items-center justify-center p-5">
      {/* Logo */}
      <View className="mb-10">
        <Image source={HeroImage} className="w-24 h-24"/>
      </View>
      {/* Title */}
      <Text className="text-black text-xl text-center mb-5">
        Sign in to start planning your trip.
      </Text>
      {/* Terms of Use */}
      <Text className="text-black text-sm text-center mb-10">
        By proceeding, you agree to out {' '}
        <Text className="underline">Terms of use</Text> and confirm you have read our {' '}
        <Text className="underline">Privacy and Cookie Statement {' '}</Text>.
      </Text>
      {/* Google Sign In Button */}
      <TouchableOpacity className="flex-row items-center bg-[#0B646B] py-3 px-8 rounded-full mb-5">
        <Image source={GoogleLogo} className="w-10 h-10 mr-3"/>
        <Text className="text-black text-base">Continue with Google</Text>
      </TouchableOpacity>
      {/* Email Sign In Button */}
      <TouchableOpacity onPress={()=>navigation.navigate('SignIn')} className="flex-row items-center bg-white py-3 px-8 rounded-full mb-5">
        <Image source={EmailLogo} className="w-5 h-5 mr-3"/>
        <Text className="text-black text-base">Continue with Email</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Explore