'use client';
import React from 'react';

import * as S from './RefreshButton.styled';
import dayjs from 'dayjs';
import { getStreamersData } from '~/app/api/route';

const RefreshButton = ({ time }: { time: number }) => {
  const formattedDate = dayjs(time).format('YYYYMMDDHHmmss');
  const nowTime = dayjs(time).format('YYYYMMDDHHmmss');

  return <S.Container onClick={getStreamersData}>정보갱신</S.Container>;
};

export default RefreshButton;
