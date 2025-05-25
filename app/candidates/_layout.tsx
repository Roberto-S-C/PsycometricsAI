import Colors from '@/constants/Colors'
import { Stack } from 'expo-router'
import React from 'react'

const CandidatesLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "Candidate",
          headerTitleAlign: "center",
          headerTintColor: Colors.lightBlue,
        }}
      />
    </Stack>
  )
}

export default CandidatesLayout