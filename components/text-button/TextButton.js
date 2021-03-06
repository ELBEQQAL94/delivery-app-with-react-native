// LIBS
import React from "react";

// React Native Components
import { TouchableOpacity, Text } from "react-native";

// CONSTANTS
import { FONTS, COLORS } from "../../constants";

const TextButton = ({ label, labelStyle, containerButtonStyle, onPress, disabled }) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
                ...containerButtonStyle
            }}
            disabled={disabled}
            onPress={onPress}
        >
            <Text style={{ color: COLORS.white, ...FONTS.h3, ...labelStyle }}>{label}</Text>
        </TouchableOpacity>
    )
};

export default TextButton;