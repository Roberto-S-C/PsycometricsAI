import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';
import React from 'react';

const CandidatesLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="whatsapp" // Specify the name of the screen (e.g., index for the default route)
        options={{
          headerTitle: "Send WhatsApp",
          headerTitleAlign: "center",
          headerTintColor: Colors.lightBlue,
        }}
      />
    </Stack>
  );
};

export default CandidatesLayout;