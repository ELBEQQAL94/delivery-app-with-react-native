// LIBS
import React, { useState } from "react";

// React Native Components
import { View, Text, TouchableOpacity, Image } from "react-native";

// AuthLayout
import { AuthLayout } from "../";

// CONSTANTS
import { COLORS, SIZES, icons } from "../../constants";

// Core Components
import {
  FormInput,
  CustomSwitch,
  TextButton,
  TextWithIconButton,
} from "../../components";

// Utils
import { utils } from "../../utils";

const ForgotPassword = ({ navigation }) => {
  // States
  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");

  const isEnablingRecoverPassword = () => email !== "" && emailError === "";

  return (
    <AuthLayout
      title="Password Recovery"
      subTitle="Please enter your email address to recover your password"
      titleContainerStyle={{
        marginTop: SIZES.padding * 2,
      }}
    >
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding,
        }}
      >
        {/* Form Inputs */}
        <FormInput
          label="Email"
          keyboardType="email-address"
          autoCompleteType="email"
          onChange={(value) => {
            utils.validateEmail(value, setEmailError);
            setEmail(value);
          }}
          errorMessage={emailError}
          appendComponent={
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                source={
                  email === "" || (email !== "" && emailError === "")
                    ? icons.correct
                    : icons.cross
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    email === ""
                      ? COLORS.green
                      : email !== "" && emailError === ""
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />

        {/* Sign In */}
        <TextButton
          label="Send Email"
          disabled={isEnablingRecoverPassword() ? false : true}
          containerButtonStyle={{
            height: 55,
            alignItems: "center",
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnablingRecoverPassword()
              ? COLORS.primary
              : COLORS.transparentPrimray,
          }}
          onPress={() => navigation.goBack()}
        />
      </View>
    </AuthLayout>
  );
};

export default ForgotPassword;
