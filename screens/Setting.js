import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Modal, Alert, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../config/FirebaseConfig';

export default function Setting() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTitle: '',
    });

    // Set up a listener for auth state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleResetPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(user.email);
      Alert.alert('Password reset link sent to your email!');
    } catch (error) {
      console.error('Error resetting password: ', error);
      Alert.alert('Error sending password reset link.');
    }
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Are you sure?',
      'Do you really want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: handleDeleteAccount, // Only delete if the user confirms
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteAccount = async () => {
    try {
      await auth.currentUser.delete();
      navigation.navigate('SignIn');
      Alert.alert('Account deleted successfully!');
    } catch (error) {
      console.error('Error deleting account: ', error);
      Alert.alert('Error deleting account. Please sign in again before deleting.');
    }
  };

  const getDisplayName = () => {
    if (user) {
      return user.displayName || user.email.split('@')[0] || 'User';
    }
    return 'Guest';
  };

  return (
    <SafeAreaView className="flex-1 relative">
      <View className="p-4 mt-10 bg-white">
        <View className="flex-row items-center justify-between">
          <Text className="font-bold text-[30px] text-[#0B646B]">Account</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="person-circle" size={50} color="#0B646B" />
          </TouchableOpacity>
        </View>
      </View>

      {user ? (
        <View className="p-4 mt-2 bg-white">
          <Text className="text-2xl font-bold mb-4 text-[#0B646B]">
            Welcome, {getDisplayName()}
          </Text>

          {/* FAQ Section */}
          <View className="p-4 mt-1 bg-white flex-row justify-between">
            <Text className="font-bold text-[20px] text-[#0B646B]">FAQ</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FAQ')} className="flex-row items-center mt-2">
              <Ionicons name="chevron-forward" size={20} color="#0B646B" />
            </TouchableOpacity>
          </View>

          {/* About Us */}
          <View className="p-4 mt-1 bg-white flex-row justify-between">
            <Text className="font-bold text-[20px] text-[#0B646B]">About Us</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AboutUs')} className="flex-row items-center mt-2">
              <Ionicons name="chevron-forward" size={20} color="#0B646B" />
            </TouchableOpacity>
          </View>

          {/* Privacy Policy */}
          <View className="p-4 mt-1 bg-white flex-row justify-between">
            <Text className="font-bold text-[20px] text-[#0B646B]">Privacy Policy</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')} className="flex-row items-center mt-2">
              <Ionicons name="chevron-forward" size={20} color="#0B646B" />
            </TouchableOpacity>
          </View>

          {/* Terms of Use */}
           <View className="p-4 mt-1 bg-white flex-row justify-between">
            <Text className="font-bold text-[20px] text-[#0B646B]">Terms of Use</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TermsOfUse')} className="flex-row items-center mt-2">
              <Ionicons name="chevron-forward" size={20} color="#0B646B" />
            </TouchableOpacity>
          </View>

          {/* Sign Out, Reset Password, Delete Account Icons */}
          <View className="flex-row items-center justify-between p-4 mt-4 bg-white">
            <TouchableOpacity
              onPress={handleSignOut}
              style={{ flex: 1, padding: 20, borderRadius: 15, backgroundColor: '#0B646B', marginRight: 10, borderWidth: 1 }}
            >
              <Text className="text-[#ffffff] text-center text-[16px]">Sign Out</Text>
            </TouchableOpacity>

            {/* Reset Password Icon */}
            <TouchableOpacity /*onPress=handleResetPassword*/ style={{ marginRight: 10 }}>
              <Ionicons name="key-outline" size={30} color="#0B646B" />
            </TouchableOpacity>

            {/* Delete Account Icon */}
            <TouchableOpacity onPress={confirmDeleteAccount}>
              <Ionicons name="trash-outline" size={30} color="#FF5C5C" />
            </TouchableOpacity>
          </View>

        </View>
      ) : (
        <View className="p-4">
          <Text className="text-lg">Please log in to view your account information.</Text>
        </View>
      )}

      {/* Modal for User Info */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-[#808080] bg-opacity-50">
          <View className="w-80 p-4 bg-white rounded-lg">
            <Text className="text-2xl font-bold mb-4">User Info:</Text>
            {user ? (
              <>
                <Text className="text-[16px]">Email: {user.email}</Text>
                {user.displayName && <Text>Name: {user.displayName}</Text>}
                {user.phoneNumber && <Text>Phone: {user.phoneNumber}</Text>}
                <Text className="text-[15px] mt-2">User ID: {user.uid}</Text>
              </>
            ) : (
              <Text>No user information available.</Text>
            )}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-4 p-2 bg-[#0B646B] rounded"
            >
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
