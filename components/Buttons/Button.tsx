import Colors from '@/constants/Colors'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

type Props = {
    buttonColor: string,
    textColor: string,
    content: string
}

const Button = ({ buttonColor, textColor, content }: Props) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]}>
            <Text style={[styles.text, { color: textColor }]}>{content}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        padding: 8,
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
    },
})