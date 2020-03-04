import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = props => {
    // Usando {...props} posso mettere tutte le proprietà ufficiale del text input direttamente da dove lo uso (in quanto
    // potrebbero essere specifiche per un determinato caso)
    return <TextInput {...props} style={{ ...styles.input, ...props.style }} />
};

const styles = StyleSheet.create({

    input: {
        height: 30,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 10
    }

})

export default Input;

