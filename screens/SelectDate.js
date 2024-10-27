import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import CalendarPicker from "react-native-calendar-picker";
import { CreateTripContext } from '../components/Context/CreateTripContext'
import moment from 'moment';

const SelectDate = () => {
    const navigation = useNavigation();
    const [startDate,setStartDate]=useState();
    const [endDate,setEndDate]=useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle:''
        })
    },[])

    const onDateChange=(date,type)=>{
        console.log(date,type)
        if(type=='START_DATE')
        {
            setStartDate(moment(date))
        }
        else
        {
            setEndDate(moment(date))
        }
    }

    const onDateSelectionContinue=()=>{
        if(!startDate&&!endDate)
        {
            ToastAndroid.show('Please select start and end date',ToastAndroid.LONG)
            return;
        }
        const totalNoOfDays=endDate.diff(startDate,'days');
        console.log(totalNoOfDays+1);
        setTripData({
          ...tripData,
          startDate:startDate,
          endDate:endDate,
          totalNoOfDays:totalNoOfDays+1
        });
        navigation.navigate('SelectBudget');
    }
  return (
    <View className="p-5 pt-24 mt-18">
      <Text className="font-bold text-[35px] mt-2 text-[#0B646B]">Travel Dates</Text>
      <View className="mt-8">
        <CalendarPicker onDateChange={onDateChange} allowRangeSelection={true} minDate={new Date()} maxRangeDuration={8} />
      </View>
      <TouchableOpacity onPress={onDateSelectionContinue} className="p-5 bg-[#0B646B] rounded-md mt-8">
        <Text className="text-center text-[#ffffff] font-medium text-[20px]">Continue</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectDate