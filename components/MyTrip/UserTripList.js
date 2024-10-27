import { View, Image, Text, TouchableOpacity, ScrollView,Alert } from 'react-native';
import React, {useEffect} from 'react';
import { PlaceHolder } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { deleteDoc, doc } from 'firebase/firestore';
import { useFirebase } from '../Context/FirebaseContext';
const UserTripList = ({ userTrips }) => {
  const { db } = useFirebase(); // Get access to Firebase
  const navigation = useNavigation();
  useEffect(()=>{
    navigation.setOptions({
      headerShown:false,
      headerTransparent:false
    })
  },[])
  // Function to handle deleting a trip
  const handleDeleteTrip = async (docId) => {
    try {
      // Show a confirmation dialog before deleting
      Alert.alert(
        "Delete Trip",
        "Are you sure you want to delete this trip?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Delete", onPress: async () => {
              await deleteDoc(doc(db, 'UserTrips', docId)); // Delete trip from Firestore
              Alert.alert("Success", "Trip has been deleted.");
            }
          }
        ]
      );
    } catch (error) {
      console.error("Error deleting trip:", error);
      Alert.alert("Error", "Failed to delete trip.");
    }
  };
  return (
    <View contentContainerStyle={{ paddingBottom: 20 }}>
      {userTrips.map((trip) => {
        let tripData;
        // Attempt to parse tripData safely
        try {
          tripData = JSON.parse(trip.tripData);
        } catch (error) {
          console.error("Error parsing tripData:", error);
          tripData = {}; // Fallback to an empty object on error
        }
        // Format startDate if it's available
        const formattedStartDate = tripData?.startDate
          ? new Date(tripData.startDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : 'Start date not available';
        // Determine the image source
        const imageSource = tripData?.locationInfo?.photoUrl
          ? { uri: tripData.locationInfo.photoUrl } 
          : PlaceHolder;

        return (
          <View key={trip.docId} className="mt-4">
            <Image source={imageSource} className="w-full h-72 object-cover rounded-lg" />
            <View>
              <Text className="font-medium text-[24px] mt-2 px-2">
                {tripData?.locationInfo?.name || 'Location not available'}
              </Text>
              <View className="flex-row justify-between">

              <Text className="font-medium text-[16px] px-2 mt-2">
                {formattedStartDate}
              </Text>
              <Text className="text-gray-600 text-[16px] px-2 mt-2">
                {tripData?.travelerCount?.title || 'Traveler info not available'}
              </Text>
              </View>
              <View className="flex-row items-center justify-between px-2 mt-3">
                {/* See Your Plan button */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('TripDetails', { tripData: trip.tripData, tripPlan: trip.tripPlan })}
                  className="p-5 bg-[#0B646B] rounded-md flex-1"
                >
                  <Text className="text-center text-[#ffffff] font-medium text-[20px]">
                    See Your Plan
                  </Text>
                </TouchableOpacity>

                {/* Small Delete Icon */}
                <TouchableOpacity
                  onPress={() => handleDeleteTrip(trip.docId)} // Handle deletion
                  style={{ marginLeft: 10 }} // Add some margin for spacing
                >
                  <Ionicons name="trash-outline" size={30} color="#ff0000" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default UserTripList;
