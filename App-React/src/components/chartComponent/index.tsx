import React, {useEffect, useState, useContext} from 'react';
import {Container, TitleChart} from './style';
import firestore from '@react-native-firebase/firestore';
import AuthContext from '../../contexts/auth';
import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
  ChartDataPoint,
} from 'react-native-responsive-linechart';

import ProgressComponent from '../../components/progressComponent';
interface DataJSON {
  email: string;
  facebookId: string;
}

const ChartComponent: React.FC = () => {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const {getUserAsyncStorage} = useContext(AuthContext);
  const [visibility, setVisibility] = useState<boolean>(true);
  const styledChart = {height: 230, width: '100%'};

  useEffect(() => {
    async function getUser() {
      await getUserAsyncStorage().then(async user => {
        const jsonUser = JSON.parse(user as string);
        await getHistoryKwh({email: jsonUser.email, facebookId: jsonUser.id});
      });
    }

    async function getHistoryKwh(dataJson: DataJSON) {
      await firestore()
        .collection('history_kwh')
        .doc(`${dataJson.email}`)
        .collection(`${dataJson.facebookId}`)
        .limit(11)
        .get()
        .then(res => {
          let array: ChartDataPoint[] = [];
          res.forEach((dataRes, index) => {
            array.push({x: index, y: dataRes.data().chain});
          });

          array.unshift();
          setData(array);
          setVisibility(false);
        })
        .catch(error => {
          setVisibility(false);
          console.error(error);
        });
    }

    getUser();
  }, [getUserAsyncStorage]);

  return (
    <Container>
      {visibility && <ProgressComponent />}

      {data.length > 0 && (
        <>
          <TitleChart>Chart Consumo de energia </TitleChart>

          <Chart
            style={styledChart}
            data={data}
            padding={{left: 40, bottom: 20, right: 20, top: 20}}>
            <VerticalAxis
              tickCount={5}
              theme={{labels: {formatter: v => v.toFixed(2)}}}
            />
            <HorizontalAxis tickCount={5} />
            <Area
              theme={{
                gradient: {
                  from: {color: '#39A5C7'},
                  to: {color: '#39A5C7', opacity: 0.4},
                },
              }}
            />
            <Line
              theme={{
                stroke: {color: '#39A5C7', width: 2},
                scatter: {default: {width: 4, height: 4, rx: 2}},
              }}
            />
          </Chart>
        </>
      )}

      {data.length === 0 && <TitleChart>Empty data Chart </TitleChart>}
    </Container>
  );
};

export default ChartComponent;
