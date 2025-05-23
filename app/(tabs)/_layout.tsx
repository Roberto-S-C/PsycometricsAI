import { Ionicons } from '@expo/vector-icons';
import { Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
    return (
        <Tabs 
            screenOptions={
                { 
                    tabBarActiveTintColor: '#064D69',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => { /* handle press */ }} style={{ marginRight: 16 }}>
                            <Ionicons name="notifications-outline" size={24} color="#064D69" />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: { color: '#73D5E4' },
                    headerTitle: 'Psycometrics AI',
                    headerTitleAlign: 'center',
                }
            }>
            
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Reports',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="pie-chart" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="candidates"
                options={{
                    title: 'Candidates',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="generate"
                options={{
                    title: 'Generate',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-add-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}