import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "What is TripGenie?",
      answer: "Imagine having a personal travel agent in your pocket, available anytime, anywhere. That's what TripGenie offers: a user-friendly service to 'plan my trip', crafting bespoke itineraries at no cost. Enjoy tailored, effortless trip planning with just a click. This is achieved through our advanced AI travel planner that builds personalized travel experiences."
    },
    {
      question: "Is TripGenie free to use?",
      answer: "Yes, TripGenie is a free planning tool (at least for now 🤭). Our AI travel planner is designed to provide high-quality service without any cost."
    },
    {
      question: "How does TripGenie create personalized recommendations?",
      answer: "TripGenie curates personalized recommendations by taking into account your unique preferences, tastes, and travel requirements, ensuring that every aspect of your trip is tailored to meet your specific needs. The travel planner AI algorithm is key to building these customized experiences."
    },
    {
      question: "Where can I receive support for using TripGenie?",
      answer: "If you require assistance or have questions about using TripGenie, feel free to send us an email at support@tripgenie.ai. Our team is ready to help you build the perfect trip with our AI travel planner."
    }
  ];

  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SafeAreaView className="bg-white flex-1 p-4">
      <Text className="text-2xl font-bold text-[#0B646B] mb-4 text-center">Frequently Asked Questions</Text>
      {faqs.map((faq, index) => (
        <View key={index} className="mb-4">
          <TouchableOpacity 
            onPress={() => toggleAnswer(index)} 
            className="flex-row justify-between items-center border-b border-gray-300 p-4"
          >
            <Text className="text-lg text-[#0B646B]">{faq.question}</Text>
            <Ionicons 
              name={expandedIndex === index ? "chevron-down" : "chevron-forward"} 
              size={20} 
              color="#0B646B" 
            />
          </TouchableOpacity>
          {expandedIndex === index && (
            <View className="p-4 bg-gray-100 rounded-lg">
              <Text className="text-md text-gray-700">{faq.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </SafeAreaView>
  );
};

export default FAQ;
