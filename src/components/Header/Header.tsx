'use client';
import React, { useEffect } from 'react';

import * as S from './Header.styled';
import { RefreshButton } from '~/components';
import dayjs from 'dayjs';

const Header = ({ time }: { time: number }) => {
  const test = dayjs(time).format('YYYY-MM-DD | HH:mm:ss');
  useEffect(() => {
    const elapsedTime = (date: string) => {
      const before = dayjs(time).format('YYYY-MM-DD | HH:mm:ss');
    };
    // elapsedTime(formattedDate);
  });
  const now = dayjs().format('YYYY-MM-DD | HH:mm:ss');
  return (
    <S.Container>
      마지막 업데이트:
      <time dateTime="2016-10-25" suppressHydrationWarning />
      <RefreshButton time={time} />
    </S.Container>
  );
};

export default Header;
