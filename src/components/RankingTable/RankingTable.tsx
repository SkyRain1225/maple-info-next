'use client';

import Image from 'next/image';

import * as S from './RankingTable.styled';
import { RankingNumber } from '~/components';
import { StreamerPlayerData } from '~/app/api/route';

export interface RankingTableProps extends StreamerPlayerData {
  number: number;
}

const RankingTable = ({
  number,
  streamer,
  nickname,
  avatar,
  server,
  job,
  level,
  guild,
  vote,
  rankingVariation,
  expPercent,
}: RankingTableProps) => {
  if (!job) {
    return (
      <S.Container>
        <div className="ranking_number">
          {number} <RankingNumber rankingVariation={rankingVariation ?? 0} />
        </div>
        <div className="left_info">
          <div className="error_user_avatar">
            {avatar ? (
              <Image className="avatar_img" src={avatar} alt="캐릭터 BG" width={170} height={170} />
            ) : (
              <div />
            )}
          </div>

          <div className="user_info">
            <div className="streamer">{streamer}</div>
            <div className="user_nickname">
              <div />
            </div>
          </div>
        </div>
        <div />
        <div className="error_notice">
          {nickname} 캐릭터의 정보를 불러올 수 없습니다. <br />
          닉네임이 바뀌었다면 제보해주세요.
        </div>
        <div />
        <div />
      </S.Container>
    );
  }
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
          <div className="user_job">{job}</div>
        </div>
      </div>
      <div>{level}</div>
      <div className="user_exp">({expPercent}%)</div>
      <div>{vote}</div>
      <div>{guild}</div>
    </S.Container>
  );
};

export default RankingTable;
