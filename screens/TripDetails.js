import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Linking, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Import your fallback image
import fallbackImage from '../assets/placeholder.jpg';

const fetchUnsplashImage = async (query) => {
  const accessKey = process.env.EXPO_PUBLIC_UNSPLASH_API_KEY;
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`);
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

const TripDetails = () => {
  const navigation = useNavigation();
  const [updatedHotelOptions, setUpdatedHotelOptions] = useState([]);
  const [updatedTravelPlan, setUpdatedTravelPlan] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    });
  }, []);

  const route = useRoute();
  const params = route.params || {};
  const { tripData: rawTripData, tripPlan: rawTripPlan } = params;

  let parsedTripData = {};
  let parsedTripPlan = {};

  try {
    parsedTripData = typeof rawTripData === 'string' ? JSON.parse(rawTripData) : rawTripData || {};
  } catch (error) {
    console.error('Error parsing tripData:', error);
  }

  try {
    parsedTripPlan = typeof rawTripPlan === 'string' ? JSON.parse(rawTripPlan) : rawTripPlan || {};
  } catch (error) {
    console.error('Error parsing tripPlan:', error);
  }

  const { locationInfo, travelerCount, startDate, endDate, totalNoOfDays, budget } = parsedTripData;
  const { flightDetails, hotelOptions, travelPlan } = parsedTripPlan;

  useEffect(() => {
    const updateImages = async () => {
      if (hotelOptions) {
        const updatedHotels = await Promise.all(
          hotelOptions.map(async (hotel) => {
            const imageUrl = await fetchUnsplashImage(hotel.hotelName);
            return { ...hotel, hotelImageUrl: imageUrl || hotel.hotelImageUrl };
          })
        );
        setUpdatedHotelOptions(updatedHotels);
      }

      if (travelPlan) {
        const updatedPlan = await Promise.all(
          travelPlan.map(async (plan) => {
            const imageUrl = await fetchUnsplashImage(plan.placeName);
            return { ...plan, placeImageUrl: imageUrl || plan.placeImageUrl };
          })
        );
        setUpdatedTravelPlan(updatedPlan);
      }
    };

    updateImages();
  }, [hotelOptions, travelPlan]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const ImageWithFallback = ({ source, style, accessibilityLabel }) => {
    const [imageError, setImageError] = useState(false);

    return (
      <Image
        source={imageError ? fallbackImage : { uri: source }}
        style={style}
        accessibilityLabel={accessibilityLabel}
        onError={() => setImageError(true)}
      />
    );
  };

  // const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

  return (
    <ScrollView style={styles.container}>
      <ImageWithFallback
        source={locationInfo?.photoUrl}
        style={styles.headerImage}
        accessibilityLabel={`Image of ${locationInfo?.name || 'destination'}`}
      />
      <Text style={styles.title}>{locationInfo?.name || 'Trip Details'}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trip Overview</Text>
        <Text className="font-medium text-[#527283] text-[13px]">Travelers : <Text className="font-bold text-[14px] ">{travelerCount?.title || 'Not specified'} ({travelerCount?.people || 'Not specified'})</Text></Text>
        <Text className="font-medium text-[#527283] text-[13px] mt-1">Start Date : <Text className="font-bold text-[14px]">{formatDate(startDate)}</Text></Text>
        <Text className="font-medium text-[#527283] text-[13px] mt-1">End Date : <Text className="font-bold text-[#527283] text-[14px]">{formatDate(endDate)}</Text></Text>
        <Text className="font-medium text-[#527283] text-[13px] mt-1">Duration : <Text className="font-bold text-[#527283] text-[14px]">{totalNoOfDays ? `${totalNoOfDays} days` : 'Not specified'}</Text></Text>
        <Text className="font-medium text-[#527283] text-[13px] mt-1">Budget : <Text className="font-bold text-[#527283] text-[14px]">{budget || 'Not specified'}</Text></Text>
      </View>

      {flightDetails && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✈️ Flight Details</Text>
          <Text className="font-medium text-[#527283] text-[13px]">Airline : <Text className="font-bold text-[14px]">{flightDetails.airline || 'Not specified'}</Text></Text>
          <Text className="font-medium text-[#527283] text-[13px] mt-1">Flight : <Text className="font-bold text-[14px]">{flightDetails.flightNumber || 'Not specified'}</Text></Text>
          <Text className="font-medium text-[13px] text-[#527283] mt-1">Price : <Text className="font-bold text-[#527283] text-[14px]">{flightDetails.price || 'Not specified'}</Text></Text>
          {flightDetails.bookingUrl && (
            <Text style={styles.link} onPress={() => Linking.openURL(flightDetails.bookingUrl)}>
              Book Flight
            </Text>
          )}
        </View>
      )}

      {updatedHotelOptions && updatedHotelOptions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏨 Hotel Options</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {updatedHotelOptions.map((hotel, index) => (
              <View key={index} style={styles.hotelCard}>
                <ImageWithFallback
                  source={hotel.hotelImageUrl}
                  style={styles.hotelImage}
                  accessibilityLabel={`Image of ${hotel.hotelName || 'hotel'}`}
                />
                <Text style={styles.hotelName}>{hotel.hotelName || 'Hotel name not available'}</Text>
                <View className="flex-row justify-between">
                <Text className="font-medium text-[14px] mt-1 text-[#527283]">💰 {hotel.price || 'Price not available'}</Text>
                <Text className="font-medium text-[14px] mt-1 text-[#527283]">⭐ {hotel.rating || 'Not rated'}</Text>
                </View>
                
                <Text numberOfLines={3} ellipsizeMode="tail" className="mt-1 font-medium text-[13px] text-[#527283]">{hotel.description || 'Description not available'}</Text>
                <Text numberOfLines={2} ellipsizeMode="tail" className="mt-1 font-medium text-[13px] text-[#527283]">Address : <Text className="font-bold text-[13px]">{hotel.hotelAddress || 'Address not available'}</Text></Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {updatedTravelPlan && updatedTravelPlan.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏕️ Plan Details</Text>
          {updatedTravelPlan.map((plan, index) => (
            <View key={index} style={styles.planCard}>
              <Text style={styles.planDay}>Day {plan.day || index + 1}</Text>
              <ImageWithFallback
                source={plan.placeImageUrl}
                style={styles.placeImage}
                accessibilityLabel={`Image of ${plan.placeName || 'place'}`}
              />
              <Text style={styles.placeName}>{plan.placeName || 'Place name not available'}</Text>
              <Text className="font-medium text-[13px] text-[#527283] mt-1">{plan.time || 'Time not specified'}</Text>
              <Text numberOfLines={3} ellipsizeMode="tail" className="font-medium text-[13px] text-[#527283] mt-1">{plan.placeDetails || 'Details not available'}</Text>
              <Text className="font-medium text-[13px] text-[#527283] mt-1">Ticket : <Text className="font-bold text-[14px] text-[#527283]">{plan.ticketPricing || 'Pricing not available'}</Text></Text>
              <Text className="font-medium text-[13px] text-[#527283] mt-1">Time to travel : <Text className="font-bold text-[14px] text-[#527283]">{plan.timeToTravel || 'Not specified'}</Text></Text>
            </View>
          ))}
        </View>
      )}
      {/* Map Section */}
      {updatedTravelPlan && updatedTravelPlan.length > 0 && (
        <View style={styles.mapSection}>
          <Text style={styles.sectionTitle}>🗺️ Map of Locations</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: parseFloat(locationInfo.coordinates.lat),
              longitude: parseFloat(locationInfo.coordinates.lon),
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {updatedHotelOptions && updatedHotelOptions.map((hotel, index) => (
              <Marker
                key={`hotel-${index}`}
                coordinate={{
                  latitude: parseFloat(hotel.geoCoordinates.split(',')[0]),
                  longitude: parseFloat(hotel.geoCoordinates.split(',')[1]),
                }}
                title={hotel.hotelName}
                description={hotel.description}
                pinColor="red"
              />
            ))}

            {updatedTravelPlan && updatedTravelPlan.map((place, index) => (
              <Marker
                key={`place-${index}`}
                coordinate={{
                  latitude: parseFloat(place.geoCoordinates.split(',')[0]),
                  longitude: parseFloat(place.geoCoordinates.split(',')[1]),
                }}
                title={place.placeName}
                description={place.placeDetails}
                pinColor="green"
              />
            ))}
          </MapView>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#fff',
    color: '#0B646B'
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0B646B'
  },
  hotelCard: {
    width: width * 0.7,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 8,
  },
  hotelImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B646B'
  },
  planCard: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 8,
  },
  planDay: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0B646B'
  },
  placeImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B646B'
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  mapSection: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: 300,
  },
});

export default TripDetails;