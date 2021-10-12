import React, {useEffect, useState, useContext} from 'react';

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
} from './style';

import AuthContext from '../../contexts/auth';
import bgDigital from '../../assets/bg-digital.png';
import ShapeComponent from '../../components/shapeComponent';
import StatusBarComponent from '../../components/StatusBarComponent';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import database from '@react-native-firebase/database';

import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import {User} from '../../model/User';

function LogoutComponent() {
  return (
    <Container>
      <ShapeComponent />
    </Container>
  );
}

function GraphComponent() {
  return (
    <Container>
      <ShapeComponent />
    </Container>
  );
}
interface Consumpotion {
  data: string;
  date_time: string;
  kwh: number;
  value: number;
}

interface AuthCommandRequest {
  command: string;
  emailRequest: string;
  facebookIdRequest: string;
}

function DigialScreen() {
  const [consumption, setConsumption] = useState<Consumpotion | null>(null);
  const {getUserAsyncStorage} = useContext(AuthContext);

  useEffect(() => {
    async function getUser() {
      await getUserAsyncStorage()
        .then(userStorage => {
          if (userStorage !== null) {
            const user = JSON.parse(userStorage) as User;
            const authRequest: AuthCommandRequest = {
              command: 'on',
              emailRequest: user.email,
              facebookIdRequest: String(user.id),
            };
            getAPI(authRequest);
          }
        })
        .catch(error => console.log('Error', error));
    }

    async function getAPI(authRequest: AuthCommandRequest) {
      await api
        .post('/start', authRequest)
        .then(result => {
          if (result.status === 200) {
            reader();
          }
        })
        .catch(error => console.error('Error', `${error}`));
    }

    async function reader() {
      await database()
        .ref('/consumption_kwth')
        .on('child_changed', snapshot => {
          console.log('A new node has been added', snapshot.val());
          setConsumption(snapshot.val());
        });
    }

    getUser();
  }, [getUserAsyncStorage]);

  return (
    <Container>
      <ShapeComponent />
      <ContainerDigital>
        <DigitalBg source={bgDigital} resizeMode="cover">
          <TitleConsumo>Consumption</TitleConsumo>
          <TitleValue>
            {consumption !== null ? consumption.kwh : '00,00'}{' '}
          </TitleValue>
          <TitleKWH>KWH</TitleKWH>
        </DigitalBg>

        <InfoDigital>
          <TitleInfoMonth>Month</TitleInfoMonth>
          <TitleInfo>
            R$ {consumption !== null ? consumption.value : '00,00'}
          </TitleInfo>
          <TitleDate>Date</TitleDate>
          <TitleDateInfo>
            {consumption !== null ? consumption.date_time : '00/00'}
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

const Home: React.FC = () => {
  return (
    <>
      <StatusBarComponent />
      <Tab.Navigator
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
