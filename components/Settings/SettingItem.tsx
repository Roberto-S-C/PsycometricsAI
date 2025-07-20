import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
    Icon: React.ComponentType<{ size?: number; color?: string }>;
    title: string;
    iconSize?: number;
    iconColor?: string;
    onPress?: () => void; // Add onPress as an optional prop
};

const SettingItem = ({ Icon, title, iconSize = 30, iconColor = Colors.darkGrey, onPress }: Props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Icon size={iconSize} color={iconColor} />
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

export default SettingItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        width: '100%',
    },
    title: {
        marginLeft: 12,
        fontSize: 20,
        color: Colors.darkGrey,
    },
});