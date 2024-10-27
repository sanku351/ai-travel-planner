import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Discover from './screens/Discover';
import SignUp from './screens/SignUp'
import SignIn from './screens/SignIn';
import ItemScreen from './screens/ItemScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTrip from './screens/MyTrip';
import Setting from './screens/Setting';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchPlace from './screens/SearchPlace';
import SelectTraveler from './screens/SelectTraveler';
import SelectDate from './screens/SelectDate';
import SelectBudget from './screens/SelectBudget';
import { CreateTripProvider } from './components/Context/CreateTripContext';
import ReviewTrip from './screens/ReviewTrip';
import GenerateTrip from './screens/GenerateTrip';
import { FirebaseProvider } from './components/Context/FirebaseContext'; // Import the Firebase provider
import TripDetails from './screens/TripDetails';
import Explore from './screens/Explore';
import FAQ from './screens/FAQ';
import AboutUs from './screens/AboutUs';
import TermsOfUse from './screens/TermsOfUse';
import PrivacyPolicy from './screens/PrivacyPolicy';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return(
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator screenOptions={{tabBarStyle:{position:'absolute',bottom:0}}}>
      <Tab.Screen name="MyTrip" component={MyTrip} options={{tabBarIcon:() => (
        <Ionicons name="location-sharp" size={24} color="black" />
      ),}}/>
      <Tab.Screen name="Discover" component={Discover} options={{tabBarIcon:() => (
        <Ionicons name="globe-sharp" size={24} color="black" />
      ),}}/>
      <Tab.Screen name="Setting" component={Setting} options={{tabBarIcon:() => (
        <Ionicons name="settings-sharp" size={24} color="black" />
      ),}}/>
    </Tab.Navigator>
    </SafeAreaView>
     
  );
}


export default function App() {
    return (
    <FirebaseProvider>
    <CreateTripProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name='ItemScreen' component={ItemScreen} />
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SearchPlace" component={SearchPlace} />
        <Stack.Screen name="SelectTraveler" component={SelectTraveler} />
        <Stack.Screen name="SelectDate" component={SelectDate} />
        <Stack.Screen name="SelectBudget" component={SelectBudget} />
        <Stack.Screen name="ReviewTrip" component={ReviewTrip} />
        <Stack.Screen name="GenerateTrip" component={GenerateTrip} />
        <Stack.Screen name="TripDetails" component={TripDetails} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </CreateTripProvider>
    </FirebaseProvider>
  );
}

