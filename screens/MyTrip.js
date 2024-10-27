import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../components/MyTrip/StartNewTripCard';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useFirebase } from '../components/Context/FirebaseContext';
import UserTripList from '../components/MyTrip/UserTripList';

const MyTrip = () => {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth, db } = useFirebase();
  const user = auth.currentUser;
  const navigation = useNavigation();

  const GetMyTrips = () => {
    setLoading(true);
    const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });
      setUserTrips(trips);
      setLoading(false);
    });

    return unsubscribe;
  };

  useEffect(() => {
    let unsubscribe;
    if (user) {
      unsubscribe = GetMyTrips();
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 relative">
        <View className="p-4 mt-1 bg-white">
          <View className="flex-row items-center justify-between">
            {/* Text must be wrapped inside <Text> */}
            <Text className="font-bold text-[30px] text-[#0B646B]">My Trips</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SearchPlace")}>
              <Ionicons name="add-circle" size={50} color="#0B646B" />
            </TouchableOpacity>
          </View>

          {/* Render loading indicator */}
          {loading && <ActivityIndicator size="large" color="#0B646B" />}

          {/* Conditional rendering for trips */}
          {userTrips?.length === 0 ? (
            <StartNewTripCard />  // No trips yet
          ) : (
            <UserTripList userTrips={userTrips} />  // Show user trips
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MyTrip;
