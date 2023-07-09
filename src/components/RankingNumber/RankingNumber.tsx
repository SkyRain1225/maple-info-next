'use client';
import React from 'react';

import * as S from './RankingNumber.styled';

const RankingNumber = ({ rankingVariation }: { rankingVariation: number }) => {
  let color;
  if (rankingVariation > 0) {
    color = 'green';
  } else if (rankingVariation < 0) {
    color = 'red';
  } else {
    color = 'grey';
  }
  return <S.Container color={color}>{rankingVariation}</S.Container>;
};

export default RankingNumber;
