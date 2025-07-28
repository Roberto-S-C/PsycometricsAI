import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";

const CandidatesLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "Candidate Details",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: Colors.lightBlue,
          },
          headerTintColor: Colors.lightBlue,
        }}
      />
      <Stack.Screen
        name="resume"
        options={{
          headerTitle: "Candidate CV",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: Colors.lightBlue,
          },
          headerTintColor: Colors.lightBlue,
        }}
      />
    </Stack>
  );
};

export default CandidatesLayout;