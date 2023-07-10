'use client';

import { Footer, RankingHeader, RankingTable } from '~/components';
import * as S from './Main.styled';
import { StreamerPlayerData } from '~/app/api/route';

interface MainProps {
  data: StreamerPlayerData[];
}

const Main = ({ data }: MainProps) => {
  return (
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
