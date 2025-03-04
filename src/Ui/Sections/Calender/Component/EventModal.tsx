import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  AppColors,
  AppImages,
  normalized,
  ScreenSize,
} from '../../../../Utils/AppConstants';

const EventModal = (props: any) => {
  return (
    <Modal
      visible={props?.modalVisible}
      transparent={true}
      animationType="fade">
      <View style={styles.modalView}>
        <View style={styles.innerView}>
          <Text style={styles.modalTitle}>Event Details</Text>
          <Text style={styles.modalText}>{props?.event}</Text>
          <TouchableOpacity
            onPress={() => props?.onClose()}
            style={styles.closeButton}>
            <Image source={AppImages.close} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EventModal;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  innerView: {
    width: ScreenSize.width - normalized(40),
    height: normalized(200),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalized(10),
    borderWidth: 1,
    borderColor: AppColors.themeColor.dark,
    backgroundColor: 'rgba(60, 63, 67,0.8)',
  },
  modalTitle: {
    color: AppColors.white.white,
    fontSize: normalized(18),
    fontWeight: 'bold',
  },
  modalText: {
    color: AppColors.white.white,
    fontSize: normalized(16),
    marginVertical: normalized(10),
  },
  closeButton: {
    width: normalized(32),
    height: normalized(32),
    borderRadius: normalized(35 / 2),
    borderWidth: 1,
    borderColor: AppColors.white.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: normalized(10),
    left: normalized(10),
  },
  closeIcon: {
    width: normalized(15),
    height: normalized(15),
    resizeMode: 'contain',
    tintColor: AppColors.white.white,
  },
});
