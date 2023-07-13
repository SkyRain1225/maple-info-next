'use client';

import { Footer, RankingHeader, RankingTable, RefreshButton } from '~/components';
import * as S from './Main.styled';
import { GetStreamersDataReturnValue } from '~/app/api/route';

interface MainProps {
  data: GetStreamersDataReturnValue;
}

const Main = ({ data: { data, time } }: MainProps) => {
  return (
    <S.Container>
      <RefreshButton time={time} />

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
          guild={item.guild}
          vote={item.vote}
          rankingVariation={item.rankingVariation}
          expPercent={item.expPercent}
        />
      ))}
      <Footer />
    </S.Container>
  );
};

export default Main;
