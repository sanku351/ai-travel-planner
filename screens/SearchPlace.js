import { View, Text, SafeAreaView, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useLayoutEffect, useState, useContext, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CreateTripContext } from '../components/Context/CreateTripContext';

export default function SearchPlace() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchTimeout = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTintColor: '#0B646B'
    });
  }, [navigation]);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchPlaces = async (searchQuery) => {
    if (!searchQuery) return;
    await delay(1000); // Wait for 1 second before making a new request
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json`, {
        headers: {
          'User-Agent': 'travel/1.0.0' // Replace with your app name and version
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      console.error('Error fetching places:', error);
      setError(`Error fetching places: ${error.message}`);
      Alert.alert('Error', 'Failed to fetch places. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUnsplashImages = async (city) => {
    const accessKey = process.env.EXPO_PUBLIC_UNSPLASH_API_KEY;
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&client_id=${accessKey}`);
      const data = await response.json();
      if (data.results.length > 0) {
        return data.results[0].urls.regular;
      }
      return null;
    } catch (error) {
      console.error('Error fetching images from Unsplash:', error);
      return null;
    }
  };

  const handlePlaceSelect = async (item) => {
    setSelectedPlace(item);
    setQuery(item.display_name);
    setPlaces([]);

    const imageUrl = await fetchUnsplashImages(item.display_name);

    setTripData({
      ...tripData,
      locationInfo: {
        name: item.display_name,
        coordinates: {
          lat: item.lat,
          lon: item.lon,
        },
        photoUrl: imageUrl,
      },
    });
    navigation.navigate("SelectTraveler");
  };

  return (
    <SafeAreaView className="flex-1 relative bg-white">
      <View className="p-5 pt-20 bg-white">
        <View className="flex-row items-center bg-white mx-2 rounded-xl py-4 px-4 mt-4 shadow-s" style={{ elevation: 5 }}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Search for a place"
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              clearTimeout(searchTimeout.current);
              searchTimeout.current = setTimeout(() => fetchPlaces(text), 300);
            }}
            accessibilityLabel="Search for a place"
          />
        </View>

        {isLoading && <Text className="p-4">Loading...</Text>}
        {error && <Text className="p-4 text-red-500">{error}</Text>}

        {places.length > 0 && (
          <FlatList
            data={places}
            keyExtractor={(item) => item.place_id?.toString() || item.osm_id?.toString()} // Handle potential missing place_id
            renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={() => handlePlaceSelect(item)}
                accessibilityRole="button"
                accessibilityLabel={`Select ${item.display_name}`}
              >
                <Text className="py-2 px-4 border-b border-gray-200">{item.display_name}</Text>
              </TouchableOpacity>
            )}
            style={{ marginTop: 10 }}
          />
        )}

        {selectedPlace && (
          <View className="p-4">
            <Text className="text-lg font-bold text-[#0B646B]">Selected Place:</Text>
            <Text>{selectedPlace.display_name}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}