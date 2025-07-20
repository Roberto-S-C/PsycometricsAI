import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    Icon: React.ComponentType<{ size?: number; color?: string }>;
    content: string;
    buttonColor: string;
    disabled?: boolean;
    onPress?: () => void; // Add onPress prop
};

const SendButton = ({ Icon, content, buttonColor, disabled, onPress }: Props) => (
    <TouchableOpacity
        style={[
            styles.button,
            { backgroundColor: disabled ? Colors.lightGrey : buttonColor },
        ]}
        disabled={disabled}
        onPress={onPress} // Handle button press
    >
        <View style={styles.iconWrapper}>
            <Icon size={24} color={disabled ? Colors.darkGrey : Colors.creamWhite} />
        </View>
        <Text style={[styles.content, { color: disabled ? Colors.darkGrey : Colors.creamWhite }]}>
            {content}
        </Text>
    </TouchableOpacity>
);

export default SendButton;

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 8,
        position: 'relative',
    },
    content: {
        fontSize: 24,
    },
});