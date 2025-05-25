import FilterButton from '@/components/Buttons/FilterButton'
import SortButton from '@/components/Buttons/SortButton'
import CandidatePreview from '@/components/Candidates/CandidatePreview'
import SearchBar from '@/components/SearchBar'
import { globalStyles } from '@/styles/globalStyles'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

const candidates = () => {
  return (
    <View style={globalStyles.screen}>
      <View style={globalStyles.container}>

        <View style={{ alignItems: 'center', marginTop: 8 }}>
          <SearchBar />
        </View>

        <View style={styles.buttonsContainer}>
          <SortButton />
          <FilterButton />
        </View>

        <FlatList
          data={Candidates}
          renderItem={({ item }) => <CandidatePreview key={item.id} candidate={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />} // 12px vertical space
          contentContainerStyle={{ alignItems: 'center' }}
        />
      </View>

    </View>

  )
}

export default candidates

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
    gap: 5
  },
})

let Candidates = [
  {
    id: 1,
    name: 'John Doe',
    score: 90.92,
    testDate: '05/23/2025'
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 28,
    score: 30.8,
    testDate: '05/23/2025'
  },
  {
    id: 3,
    name: 'Jane Smith',
    age: 28,
    score: 30.8,
    testDate: '05/23/2025'
  },
  {
    id: 4,
    name: 'Jane Smith',
    age: 28,
    score: 30.8,
    testDate: '05/23/2025'
  },
  {
    id: 5,
    name: 'Jane Smith',
    age: 28,
    score: 30.8,
    testDate: '05/23/2025'
  },
  {
    id: 6,
    name: 'Jane Smith',
    age: 28,
    score: 30.8,
    testDate: '05/23/2025'
  },
  {
    id: 7,
    name: 'Jane Smith',
    age: 28,
    score: 30.8,
    testDate: '05/23/2025'
  },
  {
    id: 8,
    name: 'Jane Smith',
    age: 28,
    score: 30.8,
    testDate: '05/23/2025'
  },
  {
    id: 9,
    name: 'Jane Smith',
    age: 28,
    score: 30.8,
    testDate: '05/23/2025'
  },
  {
    id: 10,
    name: 'Jane Smith',
    age: 28,
    score: 30.8,
    testDate: '05/23/2025'
  },
  {
    id: 11,
    name: 'Roberto Sánchez',
    age: 28,
    score: 30.8,
    testDate: '05/23/2025'
  },
]