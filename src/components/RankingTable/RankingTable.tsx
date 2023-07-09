'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import * as S from './RankingTable.styled';
import { RankingNumber } from '~/components';

export interface RankingTableProps {
  number: number;
  streamer: string;
  nickname: string;
  avatar: string;
  server: string;
  job: string;
  level: string;
  exp: string;
  guild: string;
  vote: string;
  expinfo: any;
  rankingVariation?: number;
}

const RankingTable = ({
  number,
  streamer,
  nickname,
  avatar,
  server,
  job,
  level,
  exp,
  guild,
  vote,
  expinfo,
  rankingVariation,
}: RankingTableProps) => {
  const [expPercentage, setExpPercentage] = useState();

  useEffect(() => {
    if (level && expinfo) {
      const levels = parseInt(level.replace('Lv.', ''));
      const expResult = expinfo[levels].replace(/,/g, '');
      setExpPercentage(expResult);
    }
  }, [level, expinfo]);

  return (
    <S.Container>
      <div className="ranking_number">
        {number} <RankingNumber rankingVariation={rankingVariation ?? 0} />
      </div>
      <div className="left_info">
        <div className="user_avatar">
          {avatar ? (
            <Image className="avatar_img" src={avatar} alt="캐릭터 BG" width={170} height={170} />
          ) : (
            <div />
          )}
        </div>

        <div className="user_info">
          <div className="streamer">{streamer}</div>
          <div className="user_nickname">
            {server ? (
              <Image className="user_server" src={server} alt="캐릭터 BG" width={14} height={14} />
            ) : (
              <div />
            )}
            {nickname}
          </div>
          <div>{job}</div>
        </div>
      </div>
      <div>{level}</div>
      <div className="user_exp">
        ({((parseInt(exp) / parseInt(expPercentage!)) * 100).toFixed(2)}%)
      </div>
      <div>{vote}</div>
      <div>{guild}</div>
    </S.Container>
  );
};

export default RankingTable;
