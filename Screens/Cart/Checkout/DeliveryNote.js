import React from 'react';
import {View, Dimensions, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import * as actions from "../../Redux/Actions/cartActions";

import {
    Container,
    Text,
    Left,
    Right,
    H1,
    ListItem,
    Thumbnail,
    Body,
  } from "native-base";
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from "react-native-vector-icons/FontAwesome";
import CartItem from './CartItem';


var { height, width } = Dimensions.get("window");


const Cart = (props) =>{
    let total = 0
    props.cartItems.forEach((cart) =>{
        return (total += cart.product.price);
    })
    return(
        <>
            {props.cartItems.length?(
                <Container>
                    <H1 style={{alignSelf: "center"}}>Thanks from Ntuma</H1>
                    {props.cartItems.map(data =>{
                        return(
                            <ListItem
                            style={styles.listItem}
                            key={Math.random()}
                            avatar
                            >
                                <Left>
                                    <Thumbnail
                                    source={{uri: data.product.image ? 
                                        data.product.image : 'https://lh3.googleusercontent.com/proxy/Eu6kB2gR925dP2KQsU-xOLTiCg48P8Ig0lhEdsKEtOr3XoeQJso2Mx2NjqIa6y766AGEwR1jj49Zuxx_8ET-9KtAsfyAhtn9bESdq-Kjspq9T7JOQm2h_eQ'}}
                                    />
                                </Left>
                                <Body style={styles.body}>
                                        <Left>
                                            <Text>{data.product.name}</Text>
                                        </Left>
                                        <Right>
                                            <Text>UGX {data.product.price}</Text>
                                        </Right>
                                </Body>
                            </ListItem>
                        )
                    })}
                    <View style={styles.bottomContainer}>
                        <Left>
                            <Text style={styles.price}> UGX {total}</Text>
                        </Left>
                        <Right>
                            <Button title="Clear" onPress={()=>props.clearCart()} />
                        </Right>
                        <Right>
                            <Button title="Confirm" onPress={()=> props.navigation.navigate('Checkout')} />
                        </Right>
                    </View>
                </Container>
            ):(
                <Container style={styles.emptyContainer}>
                    <Text>Thanks for shopping with us</Text>
                    <Text>A Market Assistant will deliver your order</Text>
                </Container>
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
      cartItems: cartItems,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      clearCart: () => dispatch(actions.clearCart()),
      removeFromCart: (item) => dispatch(actions.removeFromCart(item))
      }
  }
  

const styles = StyleSheet.create({
    emptyContainer: {
      height: height,
      alignItems: "center",
      justifyContent: "center",
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        elevation: 20
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: 'red'
    },
    hiddenContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      flexDirection: 'row'
    },
    hiddenButton: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingRight: 25,
      height: 70,
      width: width / 1.2
    }
  });

  export default connect(mapStateToProps, mapDispatchToProps)(DeliveryNote);