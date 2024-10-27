import { View, Text, Image, SafeAreaView } from 'react-native'
import React, {useEffect, useContext, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { TripLoading } from '../assets';
import { CreateTripContext } from '../components/Context/CreateTripContext';
import { AI_PROMPT } from '../components/Constant/Options';
import { chatSession } from '../config/PlacesModel';
import { doc, setDoc } from 'firebase/firestore';
import { useFirebase } from './../components/Context/FirebaseContext';

const GenerateTrip = () => {
    const navigation=useNavigation();
    const { auth, db } = useFirebase();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        navigation.setOptions({
            headerShown:false,
            headerTransparent:true,
            headerTitle:''
        })
    },[])
    useEffect(()=>{
        GenerateAiTrip()
    },[])
    const GenerateAiTrip=async()=>{
        setLoading(true);
        const FINAL_PROMPT=AI_PROMPT
        .replace('{location}',tripData?.locationInfo?.name)
        .replace('{totalDays}',tripData.totalNoOfDays)
        .replace('{totalNight}',tripData.totalNoOfDays-1)
        .replace('{traveler}',tripData.travelerCount?.title)
        .replace('{budget}',tripData.budget)
        .replace('{totalDays}',tripData.totalNoOfDays)
        .replace('{totalNight}',tripData.totalNoOfDays-1);
        console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    setLoading(false)
    const userEmail = auth.currentUser?.email; // Get the user's email
    const tripResp=JSON.parse(result.response.text());
    const docId=(Date.now()).toString();
    const res=await setDoc(doc(db,"UserTrips",docId), {
        userEmail:userEmail,
        tripPlan:tripResp, // AI Result
        tripData:JSON.stringify(tripData), // User Selection Data
        //location:tripData?.locationInfo?.name,
        //travelers:tripData?.travelerCount?.title,
        docId:docId
    })
        navigation.navigate('MyTrip')
    }
  return (
    <SafeAreaView className="flex-1 relative">
        <View className="mt-10 h-full bg-white">
            <Text className="font-bold text-[35px] mt-6 text-center text-[#0B646B]">Please Wait ...</Text>
            <Text className="font-bold text-[22px] text-center mt-4 text-[#0B646B]">We are working on your dream trip</Text>
            <Image source={TripLoading} className="mt-16 w-full h-200" />
            <Text className="font-thin text-[20px] mt-10 text-center">Do not go back</Text>
        </View>
    </SafeAreaView>
  )
}

export default GenerateTrip