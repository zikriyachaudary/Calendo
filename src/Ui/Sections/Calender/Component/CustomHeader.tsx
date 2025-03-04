import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppColors, AppImages, normalized} from '../../../../Utils/AppConstants';

const CustomHeader = (props: any) => {
  return (
    <View style={styles.mainCont}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          props?.onLeftIconPress();
        }}>
        <Image
          source={AppImages.menu}
          style={styles.icon}
          tintColor={AppColors.white.white}
        />
      </TouchableOpacity>
      <Text style={styles.header}>Hello Nourman!</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          props?.onRightIconPress();
        }}>
        <Image
          source={AppImages.notification}
          style={styles.icon}
          tintColor={AppColors.themeColor.dark}
        />
        <View style={styles.unread} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  mainCont: {
    height: normalized(40),
    marginHorizontal: normalized(15),
    marginBottom: normalized(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: normalized(18),
    fontWeight: '700',
    color: AppColors.white.white,
  },
  icon: {
    width: normalized(30),
    height: normalized(30),
    resizeMode: 'contain',
  },
  unread: {
    width: normalized(10),
    height: normalized(10),
    borderRadius: normalized(10 / 2),
    backgroundColor: AppColors.themeColor.light,
    position: 'absolute',
    right: normalized(3),
  },
});
