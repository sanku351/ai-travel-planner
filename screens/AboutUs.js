import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AboutUs = () => {
  const navigation = useNavigation();
  useEffect(()=>{
    navigation.setOptions({
        headerTintColor:'#0B646B'
    })
  },[])
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <Text className="text-[16px] text-gray-800 mb-4">
          Welcome to our app! We are committed to helping you have the best travel experiences by offering innovative and user-friendly tools.
        </Text>

        <Text className="text-[16px] text-gray-800 mb-4">
          Our app allows you to plan trips, explore new destinations, and ensure you have everything you need for a smooth travel experience. 
          Whether you're a seasoned traveler or just getting started, our goal is to make travel easier and more enjoyable for you.
        </Text>

        <Text className="text-[16px] text-gray-800 mb-4">
          We are a team of passionate individuals who love travel and technology. Our mission is to empower travelers with modern tools and insights that make planning stress-free and fun. 
          We constantly update and improve our features to meet your needs, ensuring you get the best experience possible.
        </Text>

        <Text className="text-[16px] text-gray-800 mb-4">
          If you have any questions, suggestions, or feedback, feel free to contact us! We're always here to help.
        </Text>

        <View className="mt-6">
          <Text className="font-bold text-[#0B646B] text-[20px] mb-2">Contact Information</Text>
          <Text className="text-[16px] text-gray-800">Email: support@tripgenie.ai</Text>
          <Text className="text-[16px] text-gray-800">Phone: +91 9870377508</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AboutUs;
