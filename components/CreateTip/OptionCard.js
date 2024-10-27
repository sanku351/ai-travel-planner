import { View, Text } from 'react-native'
import React from 'react'

const OptionCard = ({option,selectedOption}) => {
  return (
    <View className={`p-6 flex-row justify-between bg-gray-200 rounded-md ${selectedOption?.id === option?.id ? 'border-2 border-black':''}`}>
      <View>
        <Text className="text-[18px] font-bold">{option.title}</Text>
        <Text className="text-[16px] font-medium text-[#808080]">{option.desc}</Text>
      </View>
      <Text className="text-[25px]">{option.icon}</Text>
      
    </View>
  )
}

export default OptionCard

