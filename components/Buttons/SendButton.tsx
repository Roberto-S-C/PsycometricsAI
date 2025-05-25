import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    Icon: React.ComponentType<{ size?: number; color?: string }>;
    content: string;
    buttonColor: string;
};

const SendButton = ({ Icon, content, buttonColor }: Props) => (
    <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]}>
        <View style={styles.iconWrapper}>
            <Icon size={24} color={Colors.creamWhite} />
        </View>
        <Text style={styles.content}>{content}</Text>
    </TouchableOpacity>
);

export default SendButton;

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 8,
        position: 'relative',
    },
    iconWrapper: {
        position: 'absolute',
        left: 6,
        justifyContent: 'center',
    },
    content: {
        fontSize: 24,
        color: Colors.creamWhite,
    }
});