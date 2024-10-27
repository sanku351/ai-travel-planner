import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const PrivacyPolicy = () => {
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
          At Our App, we take your privacy seriously. This Privacy Policy explains what data we collect, how we use it, and how we protect your information.
        </Text>

        <Text className="font-bold text-[20px] text-[#0B646B] mb-2">Information Collection</Text>
        <Text className="text-[16px] text-gray-800 mb-4">
          We collect information that you provide to us directly, such as your name, email address, and other profile details.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
