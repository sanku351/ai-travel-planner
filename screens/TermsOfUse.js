import React, { useEffect } from 'react';
import { Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TermsOfUse = () => {
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
          By using this app, you agree to the following terms of use...
        </Text>

        <Text className="font-bold text-[20px] text-[#0B646B] mb-2">User Responsibilities</Text>
        <Text className="text-[16px] text-gray-800 mb-4">
          As a user, you are responsible for keeping your account information secure and for the actions taken in your account.
        </Text>

        {/* Add more content as necessary */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsOfUse;
