import React from 'react';
import {Text, StyleSheet, Dimensions, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '~/constants/Colors';

export const GradientButton = (props) => {

    const {title, onPress, colors, gradientDisabled} = props

    return (
        <TouchableOpacity onPress={onPress} >
            <LinearGradient
            colors={gradientDisabled ? [colors, colors] : colors}
            useAngle={true}
            angle={90}
            style={styles.button}
            >
                <Text style={styles.buttonText} >{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        height: 50,
        marginVertical: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: -0.41,
        color: 'white'
    }
});
