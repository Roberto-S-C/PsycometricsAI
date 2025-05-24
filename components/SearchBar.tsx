import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={24} color="#DDDDDD" />
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#C1C1C1"
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DDDDDD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#C1C1C1',
    paddingVertical: 4,
  },
})