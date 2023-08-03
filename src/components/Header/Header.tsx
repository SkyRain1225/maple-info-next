'use client';
import dayjs from 'dayjs';
import { useMemo, useState, useEffect } from 'react';
import { RefreshButton } from '~/components';
import * as S from './Header.styled';
import Image from 'next/image';

const Header = ({ time }: { time: number }) => {
  const [diffTime, setDiffTime] = useState<string>();

  const memoizedDiffTime = useMemo(() => {
    const timeForToday = (time: number) => {
      const today = dayjs();
      const timeValue = dayjs(time);

      const betweenTime = Math.floor(today.diff(timeValue, 'minute'));
      if (betweenTime < 1) return '방금전';
      if (betweenTime < 60) {
        return `${betweenTime}분전`;
      }

      const betweenTimeHour = Math.floor(betweenTime / 60);
      if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
      }

      const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
      if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
      }

      return `${Math.floor(betweenTimeDay / 365)}년전`;
    };

    return timeForToday(time);
  }, [time]);

  useEffect(() => {
    setDiffTime(memoizedDiffTime);
  }, [memoizedDiffTime]);

  return (
    <S.Container>
      <div className="left_content">
        <Image
          className="logo_img"
          src="https://ssl.nexon.com/s2/game/maplestory/renewal/common/logo.png"
          alt="logo"
          width={120}
          height={58}
        />
        <div className="title">스트리머 하이퍼 버닝 캐릭터 랭킹</div>
      </div>

      <div className="right_content">
        <RefreshButton diffTime={diffTime} />

        <div className="update_time">마지막 업데이트: {diffTime}</div>
      </div>
    </S.Container>
  );
};

export default Header;
