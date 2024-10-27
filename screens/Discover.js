import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, Image, TextInput, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Attractions, Avatar, HeroImage, Hotels, Oops, Restaurants, Splash } from '../assets';
import MenuContainer from '../components/MenuContainer';
import { FontAwesome } from '@expo/vector-icons';
import ItemCardContainer from '../components/ItemCardContainer';
import { getPlacesData } from '../api';
import { debounce } from 'lodash';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Discover = () => {
  const navigation = useNavigation();
  const [type, setType] = useState("restaurants");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [bl_lat, setBl_lat] = useState(null);
  const [bl_lng, setBl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type);
      setMainData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchPlaces = useCallback(async (searchQuery) => {
    if (!searchQuery) {
      setPlaces([]);
      return;
    }
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=5`, {
        headers: {
          'User-Agent': 'TravelApp/1.0' // Replace with your actual app name and version
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      console.error('Error fetching places:', error);
      Alert.alert('Error', 'Failed to fetch places. Please try again later.');
    }
  }, []);

  const debouncedFetchPlaces = useCallback(
    debounce(async (searchQuery) => {
      await delay(1000); // Wait for 1 second before making a new request
      fetchPlaces(searchQuery);
    }, 300),
    [fetchPlaces]
  );

  const handlePlaceSelect = useCallback((item) => {
    setQuery(item.display_name);
    setPlaces([]);

    if (item.boundingbox) {
      const [south, north, west, east] = item.boundingbox.map(Number);
      setBl_lat(south);
      setTr_lat(north);
      setBl_lng(west);
      setTr_lng(east);
      console.log("Southwest Coordinates:", { latitude: south, longitude: west });
      console.log("Northeast Coordinates:", { latitude: north, longitude: east });
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-8 pt-12">
        <View>
          <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
          <Text className="text-[#527283] text-[36px]">the beauty today</Text>
        </View>
        <View className="w-12 h-12 bg-gray-400 rounded-3xl overflow-hidden">
          <Image source={Splash} className="w-full h-full object-cover" />
        </View>
      </View>

      <View className="mx-4 mt-8">
        <View className="flex-row items-center bg-white rounded-xl py-1 px-4 shadow-s" style={{ elevation: 5 }}>
          <TextInput
            className="flex-1 h-12 text-base"
            placeholder="Search"
            placeholderTextColor="#6B7280"
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              debouncedFetchPlaces(text);
            }}
          />
        </View>
        {places.length > 0 && (
          <FlatList
            data={places}
            keyExtractor={(item) => item.place_id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="py-2 px-4 border-b border-gray-200"
                onPress={() => handlePlaceSelect(item)}
              >
                <Text className="text-base">{item.display_name}</Text>
              </TouchableOpacity>
            )}
            className="mt-2 bg-white rounded-xl shadow-lg"
          />
        )}
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
      ) : (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-row items-center justify-between px-8 mt-8">
            <MenuContainer
              key="hotels"
              title="Hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key="attractions"
              title="Attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key="restaurants"
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          <View className="px-4 mt-8">
            <View className="flex-row items-center justify-between">
              <Text className="text-[#2C7379] text-[28px] font-bold">Top Tips</Text>
              <TouchableOpacity className="flex-row items-center space-x-2">
                <Text className="text-[#A0C4C7] text-[20px] font-bold">Explore</Text>
                <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7" />
              </TouchableOpacity>
            </View>

            <View className="flex-row flex-wrap justify-evenly mt-8">
              {mainData?.length > 0 ? (
                mainData.map((data, i) => (
                  <ItemCardContainer
                    key={i}
                    imageSrc={
                      data?.photo?.images?.medium?.url ||
                      "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
                    }
                    title={data?.name}
                    location={data?.location_string}
                    data={data}
                  />
                ))
              ) : (
                <View className="w-full h-[400px] items-center justify-center space-y-8">
                  <Image source={Oops} className="w-32 h-32 object-cover" />
                  <Text className="text-2xl text-[#428288] font-semibold">
                    Oops... No Data Found
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;