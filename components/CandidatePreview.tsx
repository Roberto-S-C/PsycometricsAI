import Colors from '@/constants/Colors'
import { globalStyles } from '@/styles/globalStyles'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
    candidate: {
        id: number
        name: string
        score: number
        testDate: string
    }
}

const Candidate = ({candidate}: Props) => {
  return (
    <View style={globalStyles.border}>
        <Text style={styles.name}>{candidate.name}</Text>
        <View style={styles.info}>
            <Text style={styles.infoText}>Score: {candidate.score}</Text>
            <Text style={styles.infoText}>{candidate.testDate}</Text>
        </View> 
    </View>
  )
}

export default Candidate

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.lightBlue,
    },
    info: 
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 5,
    },
    infoText: {
        fontSize: 16,
        color: Colors.darkGrey
    }
})


