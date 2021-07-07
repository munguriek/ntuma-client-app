import React, {useEffect, useState, useContext} from 'react';
import {Text, View, Button} from 'react-native';
import { Item, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from '../../../Shared/Form/FormContainer';
import Input from '../../../Shared/Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AuthGlobal from "../../../Context/store/AuthGlobal";

import {connect} from 'react-redux';
const Checkout = (props) =>{
    const context = useContext(AuthGlobal)

    const [orderItems, setOrderItems] = useState();
    const [homeAddress, setHomeAddress] = useState();
    const [orderNotes, setOrderNotes] = useState();
    const [phone, setPhone] = useState();
    const [deliveryTime, setDeliveryTime] = useState();
    const [user, setUser] = useState();

    useEffect(()=>{
        setOrderItems(props.cartItems)
        if(context.stateUser.isAuthenticated) {
            setUser(context.stateUser.user.sub)
        } else {
            props.navigation.navigate("Cart");
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please Login to Checkout",
                text2: ""
            });
        }

        return()=>{
            setOrderItems();
        }
    }, [])

    const checkOut = () => {
        console.log("orders", orderItems)
        let order = {
            dateOrdered: Date.now(),
            orderItems,
            phone,
            homeAddress: homeAddress,
            orderNotes: orderNotes,
            deliveryTime: deliveryTime,
            status: "3",
            user,
        }

        props.navigation.navigate("Payment", {order: order })
    }


    return(
        <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
        >
        <FormContainer
        title={"Delivery Address"}
        >
        <Input
                    placeholder={"Phone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                   <Input
                    placeholder={"Delivery Address"}
                    name={"homeAddress"}
                    value={homeAddress}
                    onChangeText={(text) => setHomeAddress(text)}
                />
                   <Input
                    placeholder={"Delivery Note"}
                    name={"orderNotes"}
                    value={orderNotes}
                    onChangeText={(text) => setOrderNotes(text)}
                />
                   <Input
                    placeholder={"Schedule Time & Date"}
                    name={"deliveryTime"}
                    value={deliveryTime}
                    onChangeText={(text) => setDeliveryTime(text)}
                />
                <View style={{ width: '80%', alignItems: "center" }}>
                    <Button title="Confirm" onPress={() => checkOut()}/>
                </View>
        </FormContainer>
        
        </KeyboardAwareScrollView>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}


export default connect(mapStateToProps)(Checkout);