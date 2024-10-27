import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import { SelecttravelesList } from '../components/Constant/Options'
import OptionCard from '../components/CreateTip/OptionCard'
import { CreateTripContext } from '../components/Context/CreateTripContext'
const SelectTraveler = () => {
    const navigation = useNavigation();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const [selectedTraveler,setSelectedTraveler]=useState();
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle:''
        })
    },[])

    useEffect(()=>{
      setTripData({...tripData,
        travelerCount:selectedTraveler
      })
    },[selectedTraveler])
    const onClickContinue=()=>{
      if(!selectedTraveler)
      {
        ToastAndroid.show('Select Traveler',ToastAndroid.LONG);
        return ;
      }
      navigation.navigate("SelectDate");
    }
  return (
    <View className="p-5 pt-24 mt-18">
      <Text className="text-[35px] font-bold mt-2 text-[#0B646B]">Who's Traveling</Text>
      <View className="mt-5">
        <Text className="font-bold text-[23px] text-[#0B646B]">Choose your traveles</Text>
        <FlatList
            data={SelecttravelesList}
            renderItem={({item,index})=>(
                <TouchableOpacity onPress={()=>setSelectedTraveler(item)} className="my-4">
                    <OptionCard option={item} selectedOption={selectedTraveler} />
                </TouchableOpacity>
            )}
        />
      </View>
      <TouchableOpacity onPress={()=> onClickContinue()} className="p-5 bg-[#0B646B] rounded-md mt-4">
        <Text className="text-center text-[#ffffff] font-medium text-[20px]">Continue</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectTraveler 