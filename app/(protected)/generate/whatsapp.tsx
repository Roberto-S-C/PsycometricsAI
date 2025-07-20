import Button from '@/components/Buttons/Button';
import Colors from '@/constants/Colors';
import { globalStyles } from '@/styles/globalStyles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Linking, StyleSheet, Text, TextInput, View } from 'react-native';
import * as yup from 'yup';

// Validation schema using yup
const schema = yup.object({
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10,15}$/, 'Phone number must be 10 to 15 digits')
    .required('Phone number is required'),
  message: yup.string().required('Message is required'),
});

type FormData = {
  phoneNumber: string;
  message: string;
};

const SendWhatsApp = () => {
  const { code } = useLocalSearchParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: '',
      message: `Here is your test code: ${code}\n\nPlease use this link to access the test: https://psycometrics-web.vercel.app/`,
    },
  });

  const handleSendWhatsApp = async (data: FormData) => {
    const { phoneNumber, message } = data;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen) {
      console.error('Unable to open WhatsApp. Please ensure it is installed on your device.');
      return;
    }

    Linking.openURL(url);
  };

  return (
    <View style={globalStyles.screen}>
      <View style={styles.container}>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, errors.phoneNumber && styles.inputError]}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={value}
                onChangeText={onChange}
              />
              {errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="message"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textAreaInput, errors.message && styles.inputError]}
                placeholder="Enter message"
                value={value}
                onChangeText={onChange}
                multiline={true}
                textAlignVertical="top"
              />
              {errors.message && (
                <Text style={styles.errorText}>{errors.message.message}</Text>
              )}
            </View>
          )}
        />
        <View style={{ width: '70%' }}>
          <Button
            buttonColor={Colors.darkBlue}
            textColor={Colors.creamWhite}
            content="Send Message"
            onPress={handleSubmit(handleSendWhatsApp)} // Use handleSubmit for validation
          />
        </View>
      </View>
    </View>
  );
};

export default SendWhatsApp;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '90%',
    gap: 20,
    margin: 20,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    borderRadius: 8,
    padding: 10,
    fontSize: 20,
    color: Colors.darkBlue,
  },
  textAreaInput: {
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    borderRadius: 8,
    padding: 10,
    minHeight: 300,
    textAlignVertical: 'top',
    fontSize: 18,
    color: Colors.darkBlue,
  },
  inputError: {
    borderColor: Colors.red, // Highlight input with red border on error
  },
  errorText: {
    color: Colors.red,
    fontSize: 14,
    marginTop: 5,
  },
});