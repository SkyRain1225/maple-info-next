'use client';
import React from 'react';

import * as S from './RankingNumber.styled';
import Image from 'next/image';

const RankingNumber = ({ rankingVariation }: { rankingVariation: number }) => {
  let color;
  if (rankingVariation < 0) {
    color = '#497fda';
  } else if (rankingVariation > 0) {
    color = '#da4949';
  } else {
    color = 'grey';
  }

  return (
    <S.Container color={color}>
      {rankingVariation > 0 && (
        <Image
          src="https://ssl.nexon.com/s2/game/maplestory/renewal/common/up.png"
          alt="up-img"
          width={6}
          height={8}
        />
      )}
      {rankingVariation < 0 && (
        <Image
          src="https://ssl.nexon.com/s2/game/maplestory/renewal/common/down.png"
          alt="down-img"
          width={6}
          height={8}
        />
      )}
      <p>{rankingVariation === 0 ? '-' : rankingVariation}</p>
    </S.Container>
  );
};

export default RankingNumber;
