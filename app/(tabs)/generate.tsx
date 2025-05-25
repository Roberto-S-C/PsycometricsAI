import Button from '@/components/Buttons/Button'
import SendButton from '@/components/Buttons/SendButton'
import Colors from '@/constants/Colors'
import { globalStyles } from '@/styles/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const generate = () => {
  return (
    <View style={globalStyles.screen}>
      <View style={globalStyles.container}>
        <Text style={styles.title}>Candidate's Test Code</Text>
        <Text style={styles.code}>A B 5 6 C 7</Text>
        <Text style={styles.warning}>Don't send this code to multiple applicants</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <SendButton
          Icon={() => <Ionicons name="mail-outline" size={35} color={Colors.creamWhite} />}
          content="Send Email"
          buttonColor={Colors.darkBlue}
        />
        <SendButton
          Icon={() => <Ionicons name="logo-whatsapp" size={35} color={Colors.creamWhite} />}
          content="Send Whatsapp"
          buttonColor={Colors.green}
        />
        <Button content='New Code' buttonColor={Colors.white} textColor={Colors.lightBlue} />
      </View>
    </View>
  )
}

export default generate

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 2,
    alignItems: 'center',
    width: '95%',
    gap: 10,
  },
  title: {
    fontSize: 30,
    color: Colors.darkGrey,
  },
  code: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.darkBlue,
  },
  warning: {
    fontSize: 12,
    color: Colors.red,
  }
});