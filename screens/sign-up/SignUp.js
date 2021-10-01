// LIBS
import React, { useState } from "react";

// React Native Components
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

// AuthLayout
import { AuthLayout } from "../";

// CONSTANTS
import { COLORS, FONTS, SIZES, icons } from "../../constants";

// Core Components
import {
  FormInput,
  CustomSwitch,
  TextButton,
  TextWithIconButton,
} from "../../components";

// Utils
import { utils } from "../../utils";

const SignUp = ({ navigation }) => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isEnablingSignUp = () => 
    email !== "" && emailError === "" && password !== "" && passwordError === "" && username !== "" && usernameError === "";

  return (
    <AuthLayout
      title="Getting Started"
      subTitle="Create an account to continue!"
      titleContainerStyle={{
        marginTop: SIZES.radius,
      }}
    >
      {/* Form Input and Sign Up */}
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding,
        }}
      >
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

        <FormInput
          label="Username"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          onChange={(value) => {
            setUsername(value);
          }}
          errorMessage={usernameError}
          appendComponent={
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                source={
                  username === "" || (username !== "" && usernameError === "")
                    ? icons.correct
                    : icons.cross
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    username === ""
                      ? COLORS.green
                      : username !== "" && usernameError === ""
                      ? COLORS.green
                      : COLORS.red,
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
            marginTop: SIZES.radius,
          }}
          onChange={(value) => {
            utils.validatePassword(value, setPasswordError);
            setPassword(value);
          }}
          errorMessage={passwordError}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                source={showPassword ? icons.eye_close : icons.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gray,
                }}
              />
            </TouchableOpacity>
          }
        />

        {/* Sign up & Sign In */}
        <TextButton 
          label="Sign Up"
          disabled={isEnablingSignUp() ? false : true}
          containerButtonStyle={{
            height: 55,
            alignItems: "center",
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnablingSignUp() ? COLORS.primary : COLORS.transparentPrimray
          }}
          onPress={() => navigation.navigate("Otp")}
        />

        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <Text
            style={{
              color: COLORS.darkGray,
              ...FONTS.body3
            }}
          >
            Already have an account?
          </Text>
          <TextButton 
            label="Sign In"
            containerButtonStyle={{
              backgroundColor: null
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3
            }}
            onPress={() => navigation.goBack()}
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

export default SignUp;
