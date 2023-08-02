'use client';
import React from 'react';

import * as S from './RefreshButton.styled';

import axios from 'axios';

const RefreshButton = ({ diffTime }: { diffTime: string | undefined }) => {
  const refresh = async () => {
    await axios.get('/api');
    location.reload();
  };
  if (diffTime === '방금전') {
    return <S.Disabled>갱신불가</S.Disabled>;
  }
  return <S.Container onClick={refresh}>정보갱신</S.Container>;
};

export default RefreshButton;
