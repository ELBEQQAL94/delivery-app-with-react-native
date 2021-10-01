// LIBS
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

// React Native Components
import { View, Text, Image, SafeAreaView,  ScrollView } from "react-native";

// CONSTANTS
import { COLORS, FONTS, images, SIZES } from "../../constants";

const AuthLayout = ({ title, subTitle, titleContainerStyle, children }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: SIZES.padding,
        backgroundColor: COLORS.white,
      }}
    >
      <ScrollView
        // keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // flex: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* App Icon */}
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            source={images.logo_02}
            resizeMode="contain"
            style={{
              height: 100,
              width: 200,
            }}
          />
        </View>

        {/* Title && SubTitle */}
        <View
          style={{
            marginTop: SIZES.padding,
            ...titleContainerStyle,
          }}
        >
          <Text style={{ textAlign: "center", ...FONTS.h2 }}>{title}</Text>
          <Text
            style={{
              textAlign: "center",
              color: COLORS.darkGray,
              marginTop: SIZES.base,
              ...FONTS.body3
            }}
          >
            {subTitle}
          </Text>
        </View>

        {/* Content */}
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthLayout;
