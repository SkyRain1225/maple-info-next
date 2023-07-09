'use client';

import React, { useEffect, useState } from 'react';
import { Footer, RankingHeader, RankingTable } from '~/components';
import * as S from './Main.styled';
import { ThemeProvider } from 'styled-components';
import { theme } from '~/styles/themes';
import ExpData from '~/assets/exp.json';

interface IFetchData {
  streamer: string;
  nickname: string;
  avatar: string;
  server: string;
  job: string;
  level: string;
  exp: string;
  guild: string;
  vote: string;
  jsonData?: any;
  rankingVariation?: number;
}

type IExpData = Record<string, string>;

const Main = ({ jsonData }: any) => {
  const [data, setData] = useState<IFetchData[]>([]);
  const [expinfo, setExpInfo] = useState<IExpData>();

  useEffect(() => {
    const fetchExp = async () => {
      try {
        setExpInfo(ExpData);
      } catch (error) {
        console.error('Error: fetching exp failed');
      }
    };
    fetchExp();

    const fetchData = async () => {
      try {
        const sortedData = jsonData.sort((b: IFetchData, a: IFetchData) => {
          const levelA = parseInt(a.level.replace('Lv.', ''));
          const levelB = parseInt(b.level.replace('Lv.', ''));

          if (levelA === levelB) {
            const expA = parseInt(a.exp.replace(/,/g, ''));
            const expB = parseInt(b.exp.replace(/,/g, ''));
            return expA - expB;
          }

          return levelA - levelB;
        });

        setData(sortedData);
      } catch (error) {
        console.error('Error: fetching data failed');
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <S.Container>
        <RankingHeader />
        {data.map((item, index) => (
          <RankingTable
            number={index + 1}
            key={item.nickname}
            streamer={item.streamer}
            nickname={item.nickname}
            avatar={item.avatar}
            server={item.server}
            job={item.job}
            level={item.level}
            exp={item.exp.replace(/,/g, '')}
            guild={item.guild}
            vote={item.vote}
            expinfo={expinfo}
            rankingVariation={item.rankingVariation}
          />
        ))}
        <Footer />
      </S.Container>
    </ThemeProvider>
  );
};

export default Main;
