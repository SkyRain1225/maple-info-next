'use client';
import React from 'react';

import * as S from './RefreshButton.styled';

const RefreshButton = ({ time }: { time: number }) => {
  const formattedTime = new Date(time).getTime();
  const nowTime = new Date().getTime();

  const timeDiff = new Date(nowTime - formattedTime).getSeconds();

  return <S.Container>{timeDiff}</S.Container>;
};

// nowtime - time = 계산 후 표기.
// Button클릭시 새로고침. (1 분전) 등 표기처리.

export default RefreshButton;
