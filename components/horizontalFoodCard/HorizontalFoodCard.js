// LIBS
import React from "react";

// React Native Components
import { Text, View, TouchableOpacity, Image } from "react-native";

// CONSTANTS
import { COLORS, FONTS, icons, SIZES } from "../../constants";

const HorizontalFoodCard = ({ containerStyle, imageStyle, item, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle
      }}
    >

      {/* IMAGE */}
      <Image source={item.image} style={imageStyle} />

      {/* INFO */}
      <View style={{
        flex: 1
      }}>
        <Text style={{ ...FONTS.h3, fontSize: 17 }}>
          {item.name}
        </Text>

        <Text style={{ color: COLORS.darkGray2, ...FONTS.body4}}>
          {item.description}
        </Text>

        <Text style={{ marginTop: SIZES.base, ...FONTS.h2 }}>
          ${item.price}
        </Text>
      </View>

      {/* CALORIES */}
      <View style={{
        flexDirection: "row",
        position: "absolute",
        top: 5,
        right: SIZES.radius
      }}>
        <Image source={icons.calories} style={{
          width: 30,
          height: 30
        }} />
        <Text style={{ color: COLORS.PRIMARY, ...FONTS.body5}}>{item.calories} Calories</Text>
      </View>

    </TouchableOpacity>
  );
};

export default HorizontalFoodCard;
