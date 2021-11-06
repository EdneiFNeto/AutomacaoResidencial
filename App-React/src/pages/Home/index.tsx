import React, {useEffect, useState, useContext, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';

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
  ContainerDigital,
  TitleInfoMonth,
  ViewTabBar,
  TouchableOpacityTabBar,
  TextTabBar,
  ContainerPotencyAndChain,
  TitlePotenceChain,
  TitleInfoPotenceChain,
  DigitalPotence,
  DigitalChain,
  TitleInfoRealTimeValue,
} from './style';

import AuthContext from '../../contexts/auth';
import bgDigital from '../../assets/bg-digital.png';
import bgDigitalGreen from '../../assets/bg-digital-green.png';
import bgDigitalYellow from '../../assets/bg-digital-yellow.png';
import bgDigitalRed from '../../assets/bg-digital-red.png';

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
import {AuthCommandRequest} from '../../model/AuthCommandRequest';
import {Consumpotion} from '../../model/Consumpotion';
import {Preferences} from '../../model/Preferences';
import {StackNavigationProp} from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';

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
  const currenteDate = format(new Date(), 'yyyy-MM-dd');
  const dateActual = format(new Date(), 'dd/MM/yyyy');

  const [myconsumption, setConsumption] = useState<Consumpotion | null>(null);
  const [email, setEmail] = useState<string>();
  const {getUserAsyncStorage, getPreferences} = useContext(AuthContext);
  const [statusBgDigitalKwh, setStatusBgDigitalKwh] = useState(bgDigital);
  const [statusBgDigitalPotency, setStatusBgDigitalPotency] = useState(
    bgDigital,
  );

  const [statusBgDigitalChain, setStatusBgDigitalChain] = useState(bgDigital);
  const [totalMont, setTotalMont] = useState<number>(0);

  useEffect(() => {
    async function getLastDataHistory(user: User): Promise<void> {
      const history = await firestore()
        .collection('history_kwh')
        .doc(user.email)
        .collection(user.id as string)
        .get();

      const query = await history.query
        .orderBy('created_at', 'desc')
        .limit(1)
        .get();

      const map = query.docs.map(res => {
        return res.data();
      });

      setTotalMont(map[0].total);
    }

    async function getPreferencesStorage(): Promise<Preferences> {
      const myPreferences = await getPreferences();
      return JSON.parse(myPreferences as string) as Preferences;
    }

    async function getUser() {
      await getUserAsyncStorage()
        .then(async userStorage => {
          if (userStorage !== null) {
            const user = JSON.parse(userStorage) as User;
            const {tarrif, flag} = await getPreferencesStorage();
            if (user !== null) {
              const authRequest: AuthCommandRequest = {
                command: 'on',
                email: user.email,
                facebookId: String(user.id),
                tariff: tarrif,
                flag,
                userToken: user.token,
              };

              setEmail(user.email);
              getLastDataHistory(user);

              await getAPI(authRequest);
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
            updateDigital();
          }
        })
        .catch(error => console.error('getAPI Error', `${error.message}`));
    }

    function updateDigitalKwh(value: number) {
      if (value <= 10.0) {
        setStatusBgDigitalKwh(bgDigitalGreen);
      } else if (value >= 11.0 && value <= 20.0) {
        setStatusBgDigitalKwh(bgDigitalYellow);
      } else {
        setStatusBgDigitalKwh(bgDigitalRed);
      }
    }

    function updateDigitalPotency(value: number) {
      if (value <= 1000) {
        setStatusBgDigitalPotency(bgDigitalGreen);
      } else if (value >= 1001 && value <= 2000) {
        setStatusBgDigitalPotency(bgDigitalYellow);
      } else {
        setStatusBgDigitalPotency(bgDigitalRed);
      }
    }

    function updateDigitalChain(value: number) {
      if (value <= 10) {
        setStatusBgDigitalChain(bgDigitalGreen);
      } else if (value >= 11 && value <= 30) {
        setStatusBgDigitalChain(bgDigitalYellow);
      } else {
        setStatusBgDigitalChain(bgDigitalRed);
      }
    }

    function updateDigital() {
      database()
        .ref('/consumption_kwt')
        .on('child_changed', snapshot => {
          if (
            snapshot.val().date_time === currenteDate &&
            snapshot.val().email === email &&
            email !== undefined
          ) {
            updateDigitalKwh(snapshot.val().kwh);
            updateDigitalPotency(snapshot.val().potency);
            updateDigitalChain(snapshot.val().chain);
            setConsumption(snapshot.val());
          }
        });
    }

    getUser();
  }, [getUserAsyncStorage, currenteDate, email, getPreferences]);

  return (
    <Container>
      <ShapeComponent />
      <ContainerDigital>
        <DigitalBg source={statusBgDigitalKwh} resizeMode="cover">
          <TitleConsumo>Consumo em KWH</TitleConsumo>
          <TitleValue>
            {myconsumption !== null
              ? Number(myconsumption.kwh).toFixed(5)
              : '00,00'}{' '}
          </TitleValue>
          <TitleKWH>KWH</TitleKWH>
        </DigitalBg>

        <InfoDigital>
          <TitleInfoMonth>Total Mes</TitleInfoMonth>
          <TitleInfo>
            R${' '}
            {myconsumption !== null
              ? Number(myconsumption.total + totalMont).toFixed(7)
              : '00,00'}
          </TitleInfo>

          <TitleInfoRealTimeValue>Consumo (R$)</TitleInfoRealTimeValue>
          <TitleInfo>
            R${' '}
            {myconsumption !== null
              ? Number(myconsumption.total).toFixed(7)
              : '00,00'}
          </TitleInfo>

          <TitleDate>Data</TitleDate>
          <TitleDateInfo>{dateActual}</TitleDateInfo>
          {myconsumption !== null && (
            <Flag>
              <Icon
                size={22}
                name="flag"
                color={String(myconsumption?.flag).toLowerCase()}
              />
              <TitleInfo>
                {' '}
                (R${Number(myconsumption.tariff).toFixed(2)})
              </TitleInfo>
            </Flag>
          )}
        </InfoDigital>
      </ContainerDigital>

      <ContainerPotencyAndChain>
        <DigitalPotence source={statusBgDigitalPotency} resizeMode="cover">
          <TitlePotenceChain>Potencia</TitlePotenceChain>
          <TitleInfoPotenceChain>
            {myconsumption !== null
              ? `${Number(myconsumption.potency)} (W)`
              : '00 (W)'}{' '}
          </TitleInfoPotenceChain>
        </DigitalPotence>

        <DigitalChain source={statusBgDigitalChain} resizeMode="cover">
          <TitlePotenceChain>Corrente</TitlePotenceChain>
          <TitleInfoPotenceChain>
            {myconsumption !== null
              ? `${Number(myconsumption.chain).toFixed(2)} (A)`
              : '00,00 (A)'}{' '}
          </TitleInfoPotenceChain>
        </DigitalChain>
      </ContainerPotencyAndChain>
    </Container>
  );
}

function MyTabBar({state, descriptors, navigation}) {
  type SigninScreenProp = StackNavigationProp<
    RootStackParamList,
    'SplashScreen'
  >;
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
          await saveUserAsyncStorage(null)
            .then(async () => {
              stopApi();
              nav.push('SplashScreen');
            })
            .catch(error => console.error('Error', error));
        }

        async function stopApi() {
          await api
            .get('/stop')
            .then(async result => console.log('result', result.data))
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
