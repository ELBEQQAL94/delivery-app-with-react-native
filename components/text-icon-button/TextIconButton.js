// LIBS
import React from "react";

// React Native Components
import { TouchableOpacity, Image, Text } from "react-native";

// CONSTANTS
import { FONTS, COLORS } from "../../constants";

const TextIconButton = ({
  label,
  labelStyle,
  containerStyle,
  icon,
  iconStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Text style={{ ...FONTS.body3, ...labelStyle }}>{label}</Text>
      <Image
        source={icon}
        style={{
            marginLeft: 5,
            width: 20,
            height: 20,
            tintColor: COLORS.black,
          ...iconStyle,
        }}
      />
    </TouchableOpacity>
  );
};

export default TextIconButton;
