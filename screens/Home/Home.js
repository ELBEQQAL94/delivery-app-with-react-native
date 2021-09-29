// LIBS
import React, { useState, useEffect } from "react";

// React Native Components
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from "react-native";

// CONSTANTS
import { FONTS, SIZES, COLORS, icons, dummyData } from "../../constants";

// Core Components
import { HorizontalFoodCard, VerticalFoodCard, FilterModal } from "../../components";

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.body3,
            }}
          >
            Show all
          </Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectedMenuType, setSelectedMenuType] = useState(1);
  const [menuList, setMenuList] = useState([]);
  const [recommends, setRecommends] = useState([]);
  const [popular, setPopular] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleChangeCategory = (categoryId, menuTypeId) => {
    let selectedRecommend = dummyData.menu.find(
      (menu) => menu.name === "Recommended"
    );
    let popular = dummyData.menu.find((menu) => menu.name === "Popular");
    let selectedMenu = dummyData?.menu.find(
      (menuType) => menuType.id === menuTypeId
    );
    setPopular(
      popular.list.filter((menu) => menu.categories.includes(categoryId))
    );
    setRecommends(
      selectedRecommend.list.filter((menu) =>
        menu.categories.includes(categoryId)
      )
    );
    setMenuList(
      selectedMenu.list.filter((menu) => menu.categories.includes(categoryId))
    );
  };

  useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, []);

  const renderSearch = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray2,
        }}
      >
        {/* ICON */}
        <Image
          source={icons.search}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.black,
          }}
        />

        {/* TEXT INPUT */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            marginBottom: -5,
            ...FONTS.body3,
          }}
          placeholder="search food..."
        />

        {/* FILTER ICON */}
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Image
            source={icons.filter}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderMenuTypes = () => {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 30,
          marginBottom: 20,
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                marginLeft: SIZES.padding,
                marginRight:
                  index === dummyData.menu.length - 1 ? SIZES.padding : 0,
              }}
              onPress={() => {
                setSelectedMenuType(item.id);
                handleChangeCategory(selectedCategoryId, item.id);
              }}
            >
              <Text
                style={{
                  color:
                    selectedMenuType === item.id
                      ? COLORS.primary
                      : COLORS.black,
                  ...FONTS.h3,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const renderPopularSection = () => {
    return (
      <Section
        title="Popular Near You"
        onPress={() => console.log("Show all popular")}
      >
        <FlatList
          data={popular}
          keyExtractor={(item) => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index }) => (
            <VerticalFoodCard
              containerStyle={{
                marginLeft: index === 0 ? SIZES.padding : 18,
                marginRight:
                  index === popular.length - 1 ? SIZES.padding : 0,
                paddingRight: SIZES.radius,
                alignItems: "center",
              }}
              imageStyle={{
                marginTop: 35,
                height: 150,
                width: 150,
              }}
              item={item}
              onPress={() => console.log("VerticalFoodCard")}
            />
          )}
        />
      </Section>
    );
  };

  const renderRecommendedSection = () => {
    return (
      <Section
        title="Recommended"
        onPress={() => console.log("Show all recommended")}
      >
        <FlatList
          data={recommends}
          keyExtractor={(item) => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index }) => (
            <HorizontalFoodCard
              containerStyle={{
                width: SIZES.width * 0.85,
                height: 180,
                marginLeft: index === 0 ? SIZES.padding : 18,
                marginRight:
                  index === recommends.length - 1 ? SIZES.padding : 0,
                paddingRight: SIZES.radius,
                alignItems: "center",
              }}
              imageStyle={{
                marginTop: 35,
                height: 150,
                width: 150,
              }}
              item={item}
              onPress={() => console.log("HorizontalFoodCard")}
            />
          )}
        />
      </Section>
    );
  };

  const renderFoodCategories = () => {
      return (
          <FlatList 
            data={dummyData.categories}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
                <TouchableOpacity style={{ 
                    flexDirection: "row",
                    height: 55,
                    marginTop: SIZES.padding,
                    marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                    marginRight: index === dummyData.categories.length - 1 ? SIZES.padding : 0,
                    paddingHorizontal: 8,
                    borderRadius: SIZES.radius,
                    backgroundColor: selectedCategoryId === item.id ? COLORS.primary : COLORS.lightGray2 
                }}
                onPress={() => {
                    setSelectedCategoryId(item.id);
                    handleChangeCategory(item.id, selectedMenuType)
                }}
                >
                    <Image source={item.icon} style={{ 
                        marginTop: 5,
                        height: 50,
                        width: 50
                    }}/>
                    <Text style={{
                        color: selectedCategoryId === item.id ? COLORS.white : COLORS.darkGray,
                        alignSelf: "center",
                        marginRight: SIZES.base,
                        ...FONTS.h3
                    }}>{item.name}</Text>
                </TouchableOpacity>
            )}
          />
      );
  };

  const deliveryToSection = () => {
    return (
        <View style={{
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,

        }}>
            <Text style={{
                color: COLORS.primary,
                ...FONTS.body3
            }}>DELIVERY TO</Text>
            <TouchableOpacity style={{
                flexDirection: "row",
                marginTop: SIZES.base,
                alignItems: "center",
            }}>
                <Text style={{ ...FONTS.h3 }}>{dummyData.myProfile.address}</Text>
                <Image source={icons.down_arrow} style={{
                    marginLeft: SIZES.base,
                    height: 20,
                    width: 20
                }}/>
            </TouchableOpacity>
        </View>
    )
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* SEARCH */}
      {renderSearch()}


      {showFilterModal && <FilterModal 
        isVisible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      />}

      {/* LIST */}
      <FlatList
        data={menuList}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {deliveryToSection()}
            {renderFoodCategories()}
            {renderPopularSection()}
            {renderRecommendedSection()}
            {renderMenuTypes()}
          </View>
        }
        renderItem={(data, index) => {
          return (
            <HorizontalFoodCard
              containerStyle={{
                height: 130,
                alignItems: "center",
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.radius,
              }}
              imageStyle={{
                marginTop: 20,
                height: 110,
                width: 110,
              }}
              item={data.item}
              onPress={() => console.log("HorizontalFoodCard")}
            />
          );
        }}
        ListFooterComponent={
            <View style={{ height: 200 }}/>
        }
      />
    </View>
  );
};

export default Home;
