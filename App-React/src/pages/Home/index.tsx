import React, {useEffect, useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  Container,
  DigitalBg,
  TitleConsumo,
  TitleValue,
  TitleKWH,
  InfoDigital,
  TitleInfo,
  TitleDate,
  TitleDateInfo,
  Flag,
  TextFlag,
  ContainerDigital,
  TitleInfoMonth,
  ViewTabBar,
  TouchableOpacityTabBar,
  TextTabBar,
} from './style';

import AuthContext from '../../contexts/auth';
import bgDigital from '../../assets/bg-digital.png';
import ShapeComponent from '../../components/shapeComponent';
import StatusBarComponent from '../../components/StatusBarComponent';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Alert} from 'react-native';

const Tab = createBottomTabNavigator();
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import {User} from '../../model/User';
import {RootStackParamList} from '../../type';
import ChartComponent from '../../components/chartComponent';
import {useDispatch, useSelector} from 'react-redux';
import {NoteState} from '../../store/consumptionReduce';

function LogoutComponent() {
  return (
    <Container>
      <ShapeComponent />
    </Container>
  );
}

function GraphComponent() {
  return <ChartComponent />;
}

function DigialScreen() {
  const [myconsumption, setConsumption] = useState<Consumpotion | null>(null);
  const {getUserAsyncStorage} = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
      await getUserAsyncStorage()
        .then(userStorage => {
          if (userStorage !== null) {
            const user = JSON.parse(userStorage) as User;
            if (user !== null) {
              const authRequest: AuthCommandRequest = {
                command: 'on',
                emailRequest: user.email,
                facebookIdRequest: String(user.id),
              };
              getAPI(authRequest);
            } else {
              console.log('Not exists users');
            }
          }
        })
        .catch(error => console.log('getUserAsyncStorage Error', error));
    }

    async function getAPI(authRequest: AuthCommandRequest) {
      await api
        .post('/start', authRequest)
        .then(result => {
          if (result.status === 200) {
            reader();
          }
        })
        .catch(error => console.error('getAPI Error', `${error}`));
    }

    async function reader() {
      await database()
        .ref('/consumption_kwth')
        .on('child_changed', snapshot => {
          setConsumption(snapshot.val());
        });
    }

    getUser();
  }, [getUserAsyncStorage, dispatch]);

  return (
    <Container>
      <ShapeComponent />
      <ContainerDigital>
        <DigitalBg source={bgDigital} resizeMode="cover">
          <TitleConsumo>Consumption</TitleConsumo>
          <TitleValue>
            {myconsumption !== null ? myconsumption.kwh : '00,00'}{' '}
          </TitleValue>
          <TitleKWH>KWH</TitleKWH>
        </DigitalBg>

        <InfoDigital>
          <TitleInfoMonth>Month</TitleInfoMonth>
          <TitleInfo>
            R$ {myconsumption !== null ? myconsumption.value : '00,00'}
          </TitleInfo>
          <TitleDate>Date</TitleDate>
          <TitleDateInfo>
            {myconsumption !== null ? myconsumption.date_time : '00/00'}
          </TitleDateInfo>
          <Flag>
            <Icon size={24} name="flag" color="yellow" />
            <TextFlag>Yellow card</TextFlag>
          </Flag>
        </InfoDigital>
      </ContainerDigital>
    </Container>
  );
}

function MyTabBar({state, descriptors, navigation}) {
  type SigninScreenProp = StackNavigationProp<RootStackParamList, 'Signin'>;
  const nav = useNavigation<SigninScreenProp>();
  const {saveUserAsyncStorage} = useContext(AuthContext);

  return (
    <ViewTabBar>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        let iconName = '';
        if (index === 0) {
          iconName = 'pie-chart';
        } else if (index === 1) {
          iconName = 'zap';
        } else {
          iconName = 'power';
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }

          if (index === 2) {
            showDialo();
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        function showDialo() {
          Alert.alert('Warnning', 'Logout is App?', [
            {text: 'Cancel', style: 'cancel', onPress: () => {}},
            {
              text: 'Confirm',
              style: 'default',
              onPress: () => {
                logoutApp();
              },
            },
          ]);
        }

        async function logoutApp() {
          await api
            .get('/stop')
            .then(async result => {
              if (result.status === 200) {
                await saveUserAsyncStorage(null);
                nav.navigate('Signin');
              }
            })
            .catch(error => console.error('Error', `${error}`));
        }

        return (
          <TouchableOpacityTabBar
            key={index}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Icon
              name={iconName}
              size={24}
              color={isFocused ? '#39A5C7' : '#C4C4C4'}
            />
            <TextTabBar
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color: isFocused ? '#39A5C7' : '#222',
                fontStyle: 'normal',
                fontFamily: isFocused ? 'Roboto-medium' : 'Roboto-Thin',
              }}>
              {label}
            </TextTabBar>
          </TouchableOpacityTabBar>
        );
      })}
    </ViewTabBar>
  );
}

const Home: React.FC = () => {
  return (
    <>
      <StatusBarComponent />
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        initialRouteName="Digital"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Digital') {
              iconName = focused ? 'zap' : 'zap';
            } else if (route.name === 'Graph') {
              iconName = focused ? 'pie-chart' : 'pie-chart';
            } else {
              iconName = focused ? 'power' : 'power';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#39A5C7',
          tabBarInactiveTintColor: '#C4C4C4',
        })}>
        <Tab.Screen
          name="Graph"
          component={GraphComponent}
          options={{
            headerShown: false,
            tabBarItemStyle: {
              paddingBottom: 5,
              shadowColor: '#ffffff',
            },
          }}
        />
        <Tab.Screen
          name="Digital"
          component={DigialScreen}
          options={{
            headerShown: false,
            tabBarItemStyle: {
              paddingBottom: 5,
            },
          }}
        />
        <Tab.Screen
          name="Logout"
          component={LogoutComponent}
          options={{
            headerShown: false,
            tabBarItemStyle: {
              paddingBottom: 5,
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Home;
