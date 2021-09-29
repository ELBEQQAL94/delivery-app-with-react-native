import React, { useState, useEffect, useRef } from "react";

// React Native Components
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
} from "react-native";

// Core Components
import IconButton from "../icon-button/IconButton";
import TowPointSlider from "../two-point-slider/TowPointSlider";
import TextButton from "../text-button/TextButton";
import TextIconButton from "../text-icon-button/TextIconButton";

// CONSTANTS
import { FONTS, COLORS, SIZES, constants, icons } from "../../constants";

const Section = ({ containerStyle, title, children }) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
        ...containerStyle,
      }}
    >
      <Text style={{ ...FONTS.h3 }}>{title}</Text>
      {children}
    </View>
  );
};

const FilterModal = ({ isVisible, onClose }) => {
  // Animation Initial Values
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 570],
  });

  // States
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [ratings, setRatings] = useState("");
  const [tags, setTags] = useState("");

  const renderDistance = () => {
    return (
      <Section title="Distance">
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TowPointSlider
            values={[3, 10]}
            min={1}
            max={10}
            postfix="km"
            onValuesChange={(values) => console.log("values: ", values)}
          />
        </View>
      </Section>
    );
  };

  const renderDeliveryTime = () => {
    return (
      <Section
        title="Delivery Time"
        containerStyle={{
          marginTop: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
          }}
        >
          {constants.delivery_time.map((time, index) => (
            <TextButton
              key={`delivery-time-${index}`}
              label={time.label}
              labelStyle={{
                color: time.id === deliveryTime ? COLORS.white : COLORS.gray,
                ...FONTS.body3,
              }}
              containerButtonStyle={{
                width: "30%",
                height: 50,
                margin: 5,
                alignItems: "center",
                borderRadius: SIZES.base,
                backgroundColor:
                  time.id === deliveryTime ? COLORS.primary : COLORS.lightGray2,
              }}
              onPress={() => setDeliveryTime(time.id)}
            />
          ))}
        </View>
      </Section>
    );
  };

  const renderPricingRange = () => (
    <Section title="Pricing Range">
      <View
        style={{
          alignItems: "center",
        }}
      >
        <TowPointSlider
          values={[10, 50]}
          min={1}
          max={100}
          prefix="$"
          postfix=""
          onValuesChange={(values) => console.log("values: ", values)}
        />
      </View>
    </Section>
  );

  const renderRatings = () => (
    <Section
      title="Ratings"
      containerStyle={{
        marginTop: 40,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: SIZES.radius,
        }}
      >
        {constants.ratings.map((rating, index) => (
          <TextIconButton
            key={`Ratings-${index}`}
            label={rating.label}
            labelStyle={{
              color: rating.id === ratings ? COLORS.white : COLORS.gray,
              ...FONTS.body3,
            }}
            containerStyle={{
              flex: 1,
              alignItems: "center",
              height: 50,
              margin: 5,
              alignItems: "center",
              borderRadius: SIZES.base,
              backgroundColor:
              rating.id === ratings ? COLORS.primary : COLORS.lightGray2,
            }}
            icon={icons.star}
            iconStyle={{
                tintColor: rating.id === ratings ? COLORS.white : COLORS.gray
            }}
            onPress={() => setRatings(rating.id)}
          />
        ))}
      </View>
    </Section>
  );

  const renderTags = () => (
    <Section
    title="Tags"
    containerStyle={{
      marginTop: 40,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: SIZES.radius,
      }}
    >
      {constants.tags.map((tag, index) => (
        <TextButton
          key={`Tags-${index}`}
          label={tag.label}
          labelStyle={{
            color: tag.id === tags ? COLORS.white : COLORS.gray,
            ...FONTS.body3,
          }}
          containerButtonStyle={{
            height: 50,
            margin: 5,
            paddingHorizontal: SIZES.padding,
            alignItems: "center",
            borderRadius: SIZES.base,
            backgroundColor:
            tag.id === tags ? COLORS.primary : COLORS.lightGray2,
          }}
          onPress={() => setTags(tag.id)}
        />
      ))}
    </View>
  </Section>
  );

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.transparentBlack7,
        }}
      >
        {/* Transparent Background */}
        <TouchableWithoutFeedback onPress={() => setShowFilterModal()}>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              top: 0,
              left: 0,
              right: 0,
            }}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            top: modalY,
            width: "100%",
            height: "100%",
            padding: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ flex: 1, ...FONTS.h3, fontSize: 18 }}>
              Filter Your Search
            </Text>
            <IconButton
              containerStyle={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              icon={icons.cross}
              iconStyle={{
                tintColor: COLORS.gray2,
              }}
              onPress={() => setShowFilterModal(false)}
            />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 250,
            }}
          >
            {/* Distance */}
            {renderDistance()}

            {/* Delivery Time */}
            {renderDeliveryTime()}

            {/* Pricing Range */}
            {renderPricingRange()}

            {/* Ratings */}
            {renderRatings()}

            {/* Tags */}
            {renderTags()}

          </ScrollView>

          {/* Apply Filter Button */}
          <View
            style={{
                position: "absolute",
                bottom: 150,
                left: 0,
                right: 0,
                height: 110,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.radius,
                backgroundColor: COLORS.white
            }}
          >
              <TextButton 
                label="Apply Filter"
                containerButtonStyle={{
                    height: 50,
                    backgroundColor: COLORS.primary,
                    borderRadius: SIZES.base,
                }}
                onPress={() => console.log("Apply Filter")}
              />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;
