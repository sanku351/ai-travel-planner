import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import { SelectBudgetOptions } from '../components/Constant/Options';
import OptionCard from '../components/CreateTip/OptionCard';
import { CreateTripContext } from '../components/Context/CreateTripContext';

const SelectBudget = () => {
    const navigation=useNavigation();
    const [selectedOption, setSelectedOption] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle:''
        })
    },[])
    useEffect(()=>{
      selectedOption&&setTripData({
        ...tripData,
        budget:selectedOption?.title
      })
    },[selectedOption])
    const onClickContinue=()=>{
      if(!selectedOption)
      {
        ToastAndroid.show('Select Your Budget',ToastAndroid.LONG);
        return ;
      }
      navigation.navigate("ReviewTrip");
    }
  return (
    <View className="p-5 pt-24 mt-18">
      <Text className="font-bold text-[35px] mt-2 text-[#0B646B]">Budget</Text>
      <View className="mt-5">
        <Text className="font-bold text-[22px] text-[#0B646B]">Choose spending habits for your trip</Text>
        <FlatList
        data={SelectBudgetOptions}
        renderItem={({item,index})=>(
            <TouchableOpacity onPress={()=>setSelectedOption(item)} className="my-4">
                <OptionCard option={item} selectedOption={selectedOption} />
            </TouchableOpacity>
        )}
        />
      </View>
    <TouchableOpacity onPress={()=>onClickContinue()} className="p-5 bg-[#0B646B] rounded-md mt-4">
        <Text className="text-center text-[#ffffff] font-medium text-[20px]">Continue</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectBudget