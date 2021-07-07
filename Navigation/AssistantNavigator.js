import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Orders from "../Screens/Assistant/Orders"
import Products from "../Screens/Assistant/Products"
import ProductForm from "../Screens/Assistant/ProductForm"
import Categories from "../Screens/Assistant/Categories"

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Products"
                component={Products}
                options={{
                    title: "Products"
                }}
            />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="ProductForm" component={ProductForm} />
        </Stack.Navigator>
    )
}
export default function AssistantNavigator() {
    return <MyStack />
}