import React from 'react'
import { View, Text, StyleSheet, Platform } from "react-native";
import TitleText from "../components/TitleText";
import Colors from '../constants/colors'

const Header = props => {
    return (
        <View style={{
            ...styles.headerBase,
            ...Platform.select({
                ios: styles.headerIOS,
                android: styles.headerAndroid
            })
        }}>
            <TitleText style={styles.title} >{props.title}</TitleText>
            {/* <Text style={styles.headerTitle}>{props.title}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 100,
        paddingTop: 30,
        // backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        alignItems: 'center',
        justifyContent: 'center',
        // borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
        // borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    headerAndroid: {
        backgroundColor: Colors.primary
    },
    headerTitle: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    },
    title: {
        color: Platform.OS === 'ios' ? Colors.primary : 'white'
    }

})

export default Header