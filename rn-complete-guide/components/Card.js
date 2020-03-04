import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
};

const styles = StyleSheet.create({

    card: {
        shadowColor: '#000000', // solo ios
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 5, // solo android
        padding: 20,
        borderRadius: 17
    }

})

export default Card