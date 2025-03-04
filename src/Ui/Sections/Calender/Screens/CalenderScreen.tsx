import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppStyles} from '../../../../Utils/AppStyles';
import {
  AppColors,
  AppHorizontalMargin,
  AppImages,
  eventsList,
  normalized,
  ScreenProps,
} from '../../../../Utils/AppConstants';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import CustomHeader from '../Component/CustomHeader';
import {BASE_URL} from '../../../../Network/Urls';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setEvents, setIsLoader} from '../../../../Redux/Reducers/AppReducers';
import {AppRootStore} from '../../../../Redux/store/AppStore';
import EventModal from '../Component/EventModal';

const CalenderScreen = (props: ScreenProps) => {
  const [currentTime, setCurrentTime] = useState(moment().format('hh:mm:ss A'));
  const [currentDate, setCurrentDate] = useState(
    moment().format('ddd MMM DD YYYY'),
  );
  const dispatch = useDispatch();
  const events = useSelector(
    (state: AppRootStore) => state.SliceReducer.events,
  );
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format('hh:mm:ss A'));
      setCurrentDate(moment().format('ddd, MMM DD YYYY'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      dispatch(setIsLoader(true));
      const response = await axios.get(BASE_URL + 'events');
      let eventData = response.data.reduce((acc: any, event: any) => {
        acc[event.date] = {
          marked: true,
          selectedColor: AppColors.themeColor.dark,
          dotColor: AppColors.white.white,
          details: event.details,
        };
        return acc;
      }, {});
      let today = moment().format('YYYY-MM-DD');
      eventData[today] = {
        selected: true,
        marked: eventData[today]?.marked || false,
        selectedColor: AppColors.themeColor.dark,
        dotColor: AppColors.white.white,
        details: eventData[today]?.details || 'No events today',
      };
      dispatch(setEvents(eventData));
      dispatch(setIsLoader(false));
    } catch (error) {
      console.error('Error fetching events:', error);
      dispatch(setIsLoader(false));
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: AppColors.black.bg}}>
      <StatusBar
        animated={true}
        backgroundColor={AppColors.black.bg}
        barStyle={'light-content'}
        showHideTransition={'fade'}
      />
      <SafeAreaView />
      {Platform.OS == 'android' && Platform.Version == 35 && (
        <View style={{height: normalized(50)}} />
      )}
      <CustomHeader onLeftIconPress={() => {}} onRightIconPress={() => {}} />

      <FlatList
        data={[1, 2, 3]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainCont}
        renderItem={({item, index}) => {
          return index == 0 ? (
            <View style={styles.timeCont}>
              <Text style={styles.officeTxt}>Office Time</Text>
              <Text style={styles.time}>{currentTime}</Text>
              <Text style={styles.date}>{currentDate}</Text>
              <View style={styles.innerCont}>
                <View>
                  <Text style={styles.heading}>Check In</Text>
                  <Text style={styles.normalTxt}>10:54 am</Text>
                </View>
                <View>
                  <Text style={{...styles.heading, alignSelf: 'flex-end'}}>
                    Work Time
                  </Text>
                  <Text style={styles.normalTxt}>3 hrs & 40 mints</Text>
                </View>
              </View>
              <View style={styles.innerCont}>
                <View>
                  <Text style={styles.heading}>Check Out</Text>
                  <Text style={styles.normalTxt}>--:--:--</Text>
                </View>
                <View>
                  <Text style={{...styles.heading, alignSelf: 'flex-end'}}>
                    Break Time
                  </Text>
                  <Text style={styles.normalTxt}>Unable to calculate</Text>
                </View>
              </View>
            </View>
          ) : index == 1 ? (
            <View style={styles.itemCont}>
              {eventsList.map((item, index) => (
                <View key={index} style={styles.boxCont}>
                  <View style={styles.itemInnerCont}>
                    <Image
                      source={item?.icon}
                      style={styles.icon}
                      tintColor={item?.tintColor}
                    />
                    <Text style={styles.titleTxt}>{item?.value}</Text>
                  </View>
                  <Text style={styles.titleTxt}>{item?.title}</Text>
                </View>
              ))}
            </View>
          ) : index == 2 ? (
            <Calendar
              onDayPress={day => {
                if (events[day.dateString]) {
                  setSelectedEvent(events[day.dateString].details);
                  setModalVisible(true);
                }
              }}
              style={{
                height: normalized(360),
                borderRadius: normalized(10),
                minWidth: '100%',
                marginBottom: normalized(30),
              }}
              monthFormat={'MMMM yyyy'}
              theme={{
                calendarBackground: AppColors.black.common,
                textSectionTitleColor: AppColors.randomColors.blue,
                selectedDayTextColor: AppColors.white.white,
                todayTextColor: AppColors.white.white,
                dayTextColor: AppColors.white.white,
                textDisabledColor: AppColors.grey.light,
                monthTextColor: AppColors.white.white,
                textDayFontSize: normalized(12),
                textMonthFontSize: normalized(16),
                textMonthFontWeight: '600',
                arrowColor: AppColors.white.white,
              }}
              markedDates={events}
            />
          ) : null;
        }}
      />

      <TouchableOpacity activeOpacity={0.7} style={styles.dotIconCont}>
        <Image
          source={AppImages.dots}
          style={styles.dotIcon}
          tintColor={AppColors.white.white}
        />
      </TouchableOpacity>

      {modalVisible && (
        <EventModal
          onClose={() => setModalVisible(false)}
          event={selectedEvent}
        />
      )}
    </View>
  );
};

export default CalenderScreen;

const styles = StyleSheet.create({
  mainCont: {
    marginHorizontal: AppHorizontalMargin,
    gap: normalized(15),
    alignItems: 'center',
  },
  timeCont: {
    backgroundColor: AppColors.themeColor.dark,
    width: '100%',
    borderRadius: normalized(10),
    alignItems: 'center',
    padding: normalized(10),
  },
  officeTxt: {
    color: AppColors.white.white,
    fontSize: normalized(14),
  },
  time: {
    color: AppColors.white.white,
    fontSize: normalized(16),
    fontWeight: '700',
    marginVertical: normalized(3),
  },
  date: {
    color: AppColors.white.white,
    fontSize: normalized(14),
  },
  innerCont: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: normalized(10),
  },
  heading: {
    color: AppColors.white.white,
    fontSize: normalized(14),
    fontWeight: '600',
  },
  normalTxt: {
    color: AppColors.white.white,
    fontSize: normalized(14),
  },
  icon: {
    width: normalized(25),
    height: normalized(25),
    resizeMode: 'contain',
    margin: normalized(5),
  },
  boxCont: {
    backgroundColor: AppColors.black.common,
    borderRadius: normalized(10),
    height: normalized(100),
    width: normalized(167),
    padding: normalized(15),
    justifyContent: 'space-between',
  },
  itemCont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: normalized(10),
    justifyContent: 'space-between',
  },
  itemInnerCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTxt: {
    color: AppColors.white.white,
    fontSize: normalized(12),
    fontWeight: '600',
  },

  dotIcon: {
    width: normalized(30),
    height: normalized(30),
    resizeMode: 'contain',
  },
  dotIconCont: {
    width: normalized(45),
    height: normalized(45),
    borderRadius: normalized(60),
    backgroundColor: AppColors.themeColor.dark,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: normalized(30),
    right: normalized(10),
  },
});
