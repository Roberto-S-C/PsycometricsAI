import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#064D69' }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Reports',
                }}
            />
            <Tabs.Screen
                name="candidates"
                options={{
                    title: 'Candidates',
                }}
            />
            <Tabs.Screen
                name="generate"
                options={{
                    title: 'Generate',
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                }}
            />
        </Tabs>
    );
}