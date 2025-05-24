import Colors from '@/constants/Colors'
import { globalStyles } from '@/styles/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const FilterButton = () => {
    return (
        <View>
            <TouchableOpacity style={globalStyles.controlButton}>
                <Ionicons
                    style={{ color: Colors.darkGrey }}
                    name="options-outline" size={24} color="black"
                />
                <Text style={{ color: Colors.darkGrey }}>Filter</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FilterButton