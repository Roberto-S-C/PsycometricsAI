import Colors from '@/constants/Colors'
import { globalStyles } from '@/styles/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const SortButton = () => {
  return (
    <TouchableOpacity style={globalStyles.controlButton}>
        <Ionicons 
            style={{color: Colors.darkGrey}} 
            name="swap-vertical-outline" size={24} color="black" 
        />
        <Text style={{color: Colors.darkGrey}}>Sort by</Text>
    </TouchableOpacity>
  )
}

export default SortButton