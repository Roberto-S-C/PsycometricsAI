import Button from '@/components/Buttons/Button';
import ProgressChartComponent from '@/components/Charts/ProgressChart';
import Colors from '@/constants/Colors';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Candidate = () => {
  return (
    <SafeAreaView style={[globalStyles.screen, { flex: 1 }]}>
      <View style={styles.container}>
        <Text style={styles.title}>Tadeo Méndez</Text>

        <View>
          <View style={styles.infoContainer}>
            <Text style={styles.age}>Age: 21</Text>
            <View style={styles.contact}>
              <Ionicons name="mail-outline" size={24} color={Colors.darkGrey} />
              <Text style={styles.contactInfo}>tadeo@gmail.com</Text>
            </View>
            <View style={styles.contact}>
              <Ionicons name="call-outline" size={24} color={Colors.darkGrey} />
              <Text style={styles.contactInfo}>+52 3313462018</Text>
            </View>

            <View style={styles.contact}>
              <Image
                source={require('@/assets/images/icons/gender.png')}
                style={{ width: 24, height: 24, marginRight: 6 }}
                resizeMode="contain"
              />
              <Text style={styles.candidateInfo}>Male</Text>
            </View>
            <Text style={styles.candidateInfo}>Completed: 05/25/2025</Text>

          </View>
        </View>

        <View>
          <ProgressChartComponent />
        </View>

        <View style={styles.buttons}>
          <View style={{ flex: 1 }}>
            <Button
              content='Accept'
              buttonColor={Colors.white}
              textColor={Colors.lightBlue}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              content='Discard'
              buttonColor={Colors.red}
              textColor={Colors.white}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Candidate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    width: '95%',
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    gap: 10,
  },
  contactInfo: {
    marginLeft: 5,
    fontSize: 18,
    color: Colors.darkBlue,
  },
  candidateInfo: {
    marginLeft: 5,
    fontSize: 18,
    color: Colors.darkGrey,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.darkBlue,
    marginBottom: 8,
  },
  age: {
    fontSize: 18,
    color: Colors.darkGrey,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
  },
})