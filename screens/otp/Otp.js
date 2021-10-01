// LIBS
import React, { useState, useEffect } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";

// React Native Components
import { View, Text } from "react-native";

// AuthLayout
import { AuthLayout } from "../";

// CONSTANTS
import { COLORS, FONTS, SIZES } from "../../constants";

// Core Components
import { TextButton } from "../../components";

const Otp = ({ navigation }) => {
  // States
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthLayout
      title="OTP Authentication"
      subTitle="An authentication code has been to youssef@email.com"
      titleContainerStyle={{
        marginTop: SIZES.padding * 2,
      }}
    >
      {/* OTP Inputs */}
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
        }}
      >
        <OTPInputView
          pinCount={4}
          style={{
            width: "100%",
            height: 65,
          }}
          codeInputFieldStyle={{
            width: 65,
            height: 65,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
            color: COLORS.black,
            ...FONTS.h3,
          }}
          onCodeFilled={(code) => {
            console.log(code);
          }}
        />

        {/* Countdown Timer */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: SIZES.padding,
          }}
        >
          <Text
            style={{
              color: COLORS.darkGray,
              ...FONTS.body3,
            }}
          >
            Didn't recieve code?
          </Text>

          <TextButton
            label={`Resend (${timer}s)`}
            disabled={timer === 0 ? false : true}
            containerButtonStyle={{
              marginLeft: SIZES.radius,
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            onPress={() => {
              setTimer(60);
              console.log("RESEND CODE");
            }}
          />
        </View>
      </View>

      {/* Footer */}
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          height: SIZES.height / 3,
        }}
      >
        <TextButton
          label="Continue"
          containerButtonStyle={{
            height: 50,
            backgroundColor: COLORS.primary,
            alignItems: "center",
            borderRadius: SIZES.radius,
          }}
          onPress={() => console.log("Continue")}
        />
        <View
          style={{
            marginTop: SIZES.padding,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.darkGray,
              ...FONTS.body3
            }}
          >By Signin up, you agree to our.</Text>
          <TextButton 
            label="Terms and Conditions"
            containerButtonStyle={{
              backgroundColor: null
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.body3
            }}
            onPress={() => console.log("TnC")}
          />
        </View>
      </View>
    </AuthLayout>
  );
};

export default Otp;
