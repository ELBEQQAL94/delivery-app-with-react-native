// LIBS
import React, { useState } from "react";

// React Native Components
import { View, Text, TouchableOpacity, Image } from "react-native";

// AuthLayout
import { AuthLayout } from "../";

// Core Components
import { FormInput, CustomSwitch, TextButton, TextWithIconButton } from "../../components";

// CONSTANTS
import { COLORS, FONTS, SIZES, icons } from "../../constants";

// Utils
import { utils } from "../../utils";

const SignIn = ({ navigation }) => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveMe, setSaveMe] = useState(false);

  const isEnablingSignIn = () => email !== "" && emailError === "" && password !== "";

  return (
    <AuthLayout
      title="Let's Sign You In"
      subTitle="Welcome back, you've been missed"
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
                source={email === "" || (email !== "" && emailError === "") ? icons.correct : icons.cross}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: email === "" ? COLORS.green : (email !== "" && emailError === "") ? COLORS.green : COLORS.red,
                }}
              />
            </View>
          }
        />

        <FormInput
          label="Password"
          secureTextEntry={!showPassword}
          autoCompleteType="password"
          containerStyle={{
              marginTop: SIZES.radius
          }}
          onChange={(value) => setPassword(value)}
          appendComponent={
              <TouchableOpacity
                style={{
                    width: 40,
                    alignItems: "flex-end",
                    justifyContent: "center"
                }}
                onPress={() => setShowPassword(!showPassword)}
              >
                  <Image 
                    source={ showPassword ? icons.eye_close : icons.eye }
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: COLORS.gray
                    }}
                  />
              </TouchableOpacity>
          }
        />

        {/* Save me & Forgot Password */}
        <View
            style={{
                flexDirection: "row",
                marginTop: SIZES.radius,
                justifyContent: "space-between"
            }}
        >
            <CustomSwitch 
                value={saveMe}
                onChange={(value) => setSaveMe(value)}
            />

            <TextButton 
                label="Forgot Password?"
                containerButtonStyle={{
                    backgroundColor: null
                }}
                labelStyle={{
                    color: COLORS.gray,
                    ...FONTS.body4
                }}
                onPress={() => navigation.navigate("ForgotPassword")}
            />
        </View>

        {/* Sign In */}
        <TextButton 
            label="Sign In"
            disabled={isEnablingSignIn() ? false : true}
            containerButtonStyle={{
                height: 55,
                alignItems: "center",
                marginTop: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: isEnablingSignIn() ? COLORS.primary : COLORS.transparentPrimray
            }}
            onPress={() => console.log("Submit")}
        />

        {/* Sign Up */}
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
            }}
        >
            <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>Don't have an account?</Text>
            <TextButton 
                label="Sign Up"
                containerButtonStyle={{
                    backgroundColor: null,
                    marginLeft: 3,
                }}
                labelStyle={{
                    color: COLORS.primary,
                    ...FONTS.h3
                }}
                onPress={() => navigation.navigate("SignUp")}
            />
        </View>
      </View>

      {/* Footer */}
      <View>
        <TextWithIconButton 
            label="Continue With Facebook"
            containerStyle={{
                height: 50,
                alignItems: "center",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.blue,
            }}
            icon={icons.fb}
            iconPosition="LEFT"
            iconStyle={{
                tintColor: COLORS.white
            }}
            labelStyle={{
                marginLeft: SIZES.radius,
                color: COLORS.white
            }}
            onPress={() => console.log("FB")}
        />

        <TextWithIconButton 
            label="Continue With Google"
            containerStyle={{
                height: 50,
                alignItems: "center",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                marginTop: SIZES.radius
            }}
            icon={icons.google}
            iconPosition="LEFT"
            iconStyle={{
                tintColor: COLORS.green
            }}
            labelStyle={{
                marginLeft: SIZES.radius,
            }}
            onPress={() => console.log("GOOGLE")}
        />
      </View>

    </AuthLayout>
  );
};

export default SignIn;
