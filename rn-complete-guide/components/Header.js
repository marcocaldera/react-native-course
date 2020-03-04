import React from 'react'
import { View, Text, StyleSheet } from "react-native";
import TitleText from "../components/TitleText";
import Colors from '../constants/colors'

const Header = props => {
    return (
        <View style={styles.header}>
            <TitleText>{props.title}</TitleText>
            {/* <Text style={styles.headerTitle}>{props.title}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 100,
        paddingTop: 30,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }

})

export default Header