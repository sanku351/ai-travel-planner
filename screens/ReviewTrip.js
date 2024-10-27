import { View, Text, TouchableOpacity } from 'react-native'
import React, {useEffect, useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateTripContext } from '../components/Context/CreateTripContext';
import moment from 'moment';

const ReviewTrip = () => {
    const navigation=useNavigation();
    const { tripData, setTripData } = useContext(CreateTripContext);
    useEffect(()=>{
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle:''
        })
    },[])
  return (
    <View className="p-5 pt-24 mt-18">
      <Text className="font-bold text-[35px] mt-2 text-[#0B646B]">ReviewTrip</Text>
      <View className="mt-5">
        <Text className="font-bold text-[22px] text-[#0B646B]">Before generating your trip , please review your selection</Text>
        {/* Destination Info */}
        <View className="pt-8 flex-row gap-4">
          <Text className="text-[28px]">📍</Text>
        {/*<Ionicons name="location-sharp" size={34} color="black" />8*/}
        <View>
            <Text className="font-thin text-[20px]">Destination</Text>
            <Text className="font-medium text-[20px]">{tripData?.locationInfo?.name}</Text>
        </View>
        </View>
        {/* Date Info */}
        <View className="pt-8 flex-row gap-4">
        <Text className="text-[28px]">🗓️</Text>
        <View>
            <Text className="font-thin text-[20px]">Travel Date</Text>
            <Text className="font-medium text-[20px]">
                {moment(tripData?.startDate).format(' DD MMM ')
                +"To"+
                moment(tripData?.endDate).format(' DD MMM ')}
                ({tripData?.totalNoOfDays} days)
            </Text>
        </View>
        </View>
        {/* Traveler Info */}
        <View className="pt-8 flex-row gap-4">
        <Text className="text-[28px]">🚃</Text>
        <View>
            <Text className="font-thin text-[20px]">Who is Traveling</Text>
            <Text className="font-medium text-[20px]">
                {tripData?.travelerCount?.title}
            </Text>
        </View>
        </View>
        {/* Budget Info */}
        <View className="pt-8 flex-row gap-4">
        <Text className="text-[28px]">💰</Text>
        <View>
            <Text className="font-thin text-[20px]">Budget</Text>
            <Text className="font-medium text-[20px]">
                {tripData?.budget}
            </Text>
        </View>
        </View>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('GenerateTrip')} className="p-5 bg-[#0B646B] rounded-md mt-12">
        <Text className="text-center text-[#ffffff] font-medium text-[20px]">Build My Trip</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ReviewTrip