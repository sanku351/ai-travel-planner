import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const StartNewTripCard = () => {
  const navigation = useNavigation();
  return (
    <View className="p-4 mt-18 flex items-center gap-5">
        <Ionicons name='location-sharp' size={30} color="black"/>
      <Text className="text-[25px] font-medium text-[#0B646B]">No Trips Plan Yet </Text>
      <Text className="text-[25px] font-thin text-[gray] text-center">Looks like its time to plan a new travel experiene ! Get Started below </Text>
      <TouchableOpacity onPress={()=>navigation.navigate("SearchPlace")} style={{padding:20,backgroundColor:'#0B646B',borderRadius:15,marginTop:20,marginStart:5,marginEnd:5,borderWidth:1}}>
        <Text className="text-[#ffffff] text-[18px] font-medium">Start a new trip</Text>
      </TouchableOpacity>
    </View>
  )
}

export default StartNewTripCard