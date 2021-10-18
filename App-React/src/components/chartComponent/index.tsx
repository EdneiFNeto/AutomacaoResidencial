import React, {useEffect, useState, useContext} from 'react';
import {Container, TitleChart} from './style';

import {VictoryLine, VictoryChart, VictoryTheme} from 'victory-native';
import firestore from '@react-native-firebase/firestore';
import AuthContext from '../../contexts/auth';

const ChartComponent: React.FC = () => {
  const [data, setData] = useState<object[]>([]);
  const {getUserAsyncStorage} = useContext(AuthContext);
  const [email, setEmail] = useState<string | null>();
  const [facebookId, setFacebookId] = useState<string | null>();

  useEffect(() => {
    async function getUser() {
      await getUserAsyncStorage().then(user => {
        const jsonUser = JSON.parse(user as string);
        setEmail(jsonUser.email);
        setFacebookId(jsonUser.id);
      });
    }

    async function getHistoryKwh() {
      try {
        await firestore()
          .collection('history_kwh')
          .doc(`${email}`)
          .collection(`${facebookId}`)
          .get()
          .then(res => {
            let array: object[] = [];
            res.forEach(dataRes => {
              array.push({x: dataRes.data().kwh, y: dataRes.data().value});
            });

            setData(array);
          });
      } catch (error) {
        console.error(error);
      }
    }
    getHistoryKwh();
    getUser();
  }, [getUserAsyncStorage, email, facebookId]);

  return (
    <Container>
      {data.length > 0 && (
        <>
          <TitleChart>Chart Consumo de energia </TitleChart>
          <VictoryChart width={350} theme={VictoryTheme.material}>
            <VictoryLine
              style={{
                data: {stroke: '#39A5C7'},
                parent: {border: '1px solid #ccc'},
              }}
              animate={{
                duration: 2000,
                onLoad: {duration: 1000},
              }}
              data={data}
              labels={({datum}) => datum.y}
            />
          </VictoryChart>
        </>
      )}

      {data.length === 0 && <TitleChart>Empty data Chart </TitleChart>}
    </Container>
  );
};

export default ChartComponent;
