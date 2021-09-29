// LIBS
import React from 'react';

// React Native Components
import {
    View, Text
} from 'react-native';

// CONSTANTS
import { FONTS } from "../../constants";

const Header = ({ containerStyle, title, rightComponent, leftComponent }) => {
    return (
        <View style={{
            flexDirection: "row",
            ...containerStyle
        }}>
            {/* Left */}
            {leftComponent}
            {/* Title */}
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Text style={{...FONTS.h3}}>{title}</Text>
            </View>
            {/* Right */}
            {rightComponent}
        </View>
    )
}

export default Header;