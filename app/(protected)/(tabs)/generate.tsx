import Button from '@/components/Buttons/Button';
import SendButton from '@/components/Buttons/SendButton';
import Colors from '@/constants/Colors';
import { globalStyles } from '@/styles/globalStyles';
import { sendEmail } from '@/utils/sendEmail';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

const Generate = () => {
  const [code, setCode] = useState('0 0 0 0 0 0'); // Default code
  const [isCodeGenerated, setIsCodeGenerated] = useState(false); // Track if a code has been generated
  const [loading, setLoading] = useState(false); // Track loading state for the "New Code" button

  const handleGenerateCode = async () => {
    console.log('Button pressed: handleGenerateCode called'); // Debugging log
    setLoading(true); // Show loading state for the button
    try {
      // Retrieve the JWT from AsyncStorage
      console.log('Retrieving token from AsyncStorage...');
      const tokenString = await AsyncStorage.getItem('tokens');
      if (!tokenString) throw new Error('No token found');

      const { data } = JSON.parse(tokenString); // Parse the token
      const accessToken = data.access; // Extract the access token
      console.log('Token retrieved:', accessToken);

      // Make the POST request to generate a new code
      console.log('Sending POST request to generate code...');
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/hrs/generate-code/`,
        {}, // No body is required for this request
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the JWT as a Bearer Token
          },
        }
      );

      console.log('Response received:', response.data); // Debugging log
      // Update the code and enable the buttons
      setCode(response.data.candidate.code);
      setIsCodeGenerated(true);
      console.log('Code updated:', response.data.candidate.code);
    } catch (error) {
      console.error('Error generating code:', error);
      Alert.alert('Error', 'Failed to generate a new code. Please try again.');
    } finally {
      setLoading(false); // Hide loading state for the button
      console.log('Loading state set to false');
    }
  };

  const handleSendEmail = async () => {
    try {
      await sendEmail(code);
    } catch (error) {
      Alert.alert('Error', 'Unable to send email. Please try again.');
    }
  };

  return (
    <View style={globalStyles.screen}>
      <View style={globalStyles.container}>
        <Text style={styles.title}>Candidate's Test Code</Text>
        <Text style={styles.code}>{code}</Text>
        <Text style={styles.warning}>Don't send this code to multiple applicants</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <SendButton
          Icon={() => <Ionicons name="mail-outline" size={35} color={Colors.creamWhite} />}
          content="Send Email"
          buttonColor={Colors.darkBlue}
          disabled={!isCodeGenerated} // Disable until a code is generated
          onPress={handleSendEmail} // Call the email handler
        />
        <SendButton
          Icon={() => <Ionicons name="logo-whatsapp" size={35} color={Colors.creamWhite} />}
          content="Send Whatsapp"
          buttonColor={Colors.green}
          disabled={!isCodeGenerated} // Disable until a code is generated
          onPress={() => router.push(`/generate/whatsapp?code=${encodeURIComponent(code)}`)} // Pass the code as a query parameter
        />
        <Button
          content={loading ? 'Generating...' : 'New Code'}
          buttonColor={Colors.white}
          textColor={Colors.lightBlue}
          onPress={handleGenerateCode} // Pass the function to handle button press
          disabled={loading} // Disable the button while loading
        />
      </View>

    </View>
  );
};

export default Generate;

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 2,
    alignItems: 'center',
    width: '75%',
    gap: 10,
  },
  title: {
    fontSize: 30,
    color: Colors.darkBlue,
  },
  code: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.lightBlue,
  },
  warning: {
    color: Colors.red,
    fontSize: 14,
    marginTop: 5,
  },
});