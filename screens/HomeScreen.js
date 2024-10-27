import { View, Text, SafeAreaView , Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import { Cartoon, HeroImage } from '../assets';

const HomeScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);
  return (
    <SafeAreaView className="bg-white flex-1 relative">
        {/* First section */}
        <View className="flex-row px-6 mt-12 items-center space-x-2">
            <View className="w-28 h-14 bg-black rounded-xl items-center justify-center">
                <Text className="text-[#00BCC9] text-4xl font-semibold">Trip</Text>
            </View>
            <Text className="text-[2A2B4B] text-3xl font-semibold">Genie</Text>
        </View>
        {/* Second section */}
        <View className="px-6 mt-5 space-y-3">
            <Text className="text-[#3C6072] text-[42px]">Enjoy the trip with </Text>
            <Text className="text-[#0B646B] text-[38px]">Good Moments</Text>
            <Text className="text-[#3C602] text-base">Discover your next adventures effortlessly. Personalized iternaries at your fingertips. Travel smarter with AI driven insights.</Text>
        </View>
        { /* Third Section*/ }
        <View className="w-[400px] h-[400px] bg-[#0B646B] rounded-full absolute bottom-36 -right-36"></View>
        <View className="w-[400px] h-[400px] bg-[#E99265] rounded-full absolute -bottom-28 -left-36"></View>
        {/* Fourth Section */}
        <View className="flex-1 relative items-center justify-center">
            <Animatable.Image animation="fadeIn" easing="ease-in-out"
            source={HeroImage} className="w-full h-full object-cover mt-8"/>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")} className="absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#0B646B] rounded-full items-center justify-center">
                <Animatable.View animation="pulse" easing="ease-in-out" iterationCount={"infinite"} className="w-20 h-20 items-center justify-center rounded-full bg-[#0B646B]">
                    <Text className="text-gray-50 text-[36px] font-semibold">GO</Text>
                </Animatable.View>
            </TouchableOpacity>
        </View>
        
    </SafeAreaView>
    
  )
}

export default HomeScreen