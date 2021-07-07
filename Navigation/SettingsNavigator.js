import React from 'react';
import { createStackNavigator } from "@react-navigation/stack"

import '../Screens/Settings/Settings';
import { Settings } from 'react-native';

const Stack = createStackNavigator();

function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    )
}

export default function SettingsNavigator() {
    return <MyStack />
}