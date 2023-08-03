import axios from 'axios';
import members from '~/assets/members.json';
import expInfo from '~/assets/exp.json';
import { load } from 'cheerio';
import { NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion, WithId } from 'mongodb';

import { revalidatePath } from 'next/cache';

export interface GetStreamersDataReturnValue {
  time: number;
  data: StreamerPlayerData[];
}

export interface StreamerPlayerData {
  streamer: string;
  nickname: string;
  avatar?: string;
  server?: string;
  job?: string;
  level?: number;
  expPercent?: number;
  guild?: string;
  vote?: string;
  rankingVariation?: number;
}

interface RankingHistory {
  streamer: string;
  rank: number;
  rankingVariation: number;
}

type RankingHistoryCollectionItem = WithId<{
  list: RankingHistory[];
}>;

const client = new MongoClient(process.env.MONGODB_CODE, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const rankingHistoryCollection = client.db('maple-info').collection('ranking-history');

export const dynamic = 'force-dynamic';

export const GET = async () => {
  revalidatePath('/');
  return NextResponse.json({ revalidated: true, now: Date.now() });
};

export const getStreamersData = async (): Promise<GetStreamersDataReturnValue> => {
  const promises = Object.entries(members).map(([streamer, nickname]) => {
    return new Promise<StreamerPlayerData>(async resolve => {
      try {
        const { data } = await axios.get(
          `https://maplestory.nexon.com/N23Ranking/World/Total?c=${nickname}`,
        );

        const $ = load(data);
        const avatar = $('.search_com_chk > .left > .char_img > img').attr('src');
        const server = $('.search_com_chk > .left > dl > dt > a > img').attr('src');
        const job = $('.search_com_chk > .left > dl > dd').text();
        const level = +$('.search_com_chk > td:eq(2)').text().replace('Lv.', '');
        const exp = +$('.search_com_chk > td:eq(3)').text().replaceAll(',', '');
        const guild = $('.search_com_chk > td:eq(5)').text();
        const vote = $('.search_com_chk > td:eq(4)').text();
        const expPercent = +((exp / expInfo[level - 1]) * 100).toFixed(2);

        resolve({
          streamer,
          nickname,
          avatar,
          server,
          job,
          level,
          expPercent,
          guild,
          vote,
        });
      } catch {
        resolve({
          streamer,
          nickname,
        });
      }
    });
  });

  const data = await Promise.all(promises);

  data.sort((b, a) => {
    if (!a.level) return -1;
    if (!b.level) return 1;

    if (a.level === b.level) {
      return a.expPercent! - b.expPercent!;
    }

    return a.level - b.level;
  });

  // 현재 크롤링 된 데이터 기반 순위 (랭킹 변동 데이터 제외)
  const newRankingHistoryList = data.map(({ streamer }, i) => ({ streamer, rank: i + 1 }));

  // 저장된 이전 순위
  const prevData = await rankingHistoryCollection.findOne<RankingHistoryCollectionItem>();

  let prevRankingHistoryList = prevData?.list;

  // prev 데이터랑 new 데이터랑 비교 후 boolean 반환
  const isEqual = prevRankingHistoryList
    ? prevRankingHistoryList.every(
        (value, index) => value.streamer === newRankingHistoryList[index].streamer,
      )
    : false;

  // 순위가 변동된 경우 모든 스트리머를 map 돌려서 해당 스트리머의 이전 랭킹 정보를 검색
  // 만약 이전 랭킹 정보가 있다면 이전 랭킹과 현재 랭킹를 빼서 랭킹 변동 사항을 저장
  if (!isEqual) {
    const insertList = newRankingHistoryList.map(newItem => {
      let rankingVariation = 0;

      if (prevRankingHistoryList) {
        const prev = prevRankingHistoryList.find(({ streamer }) => streamer === newItem.streamer);
        if (prev) rankingVariation = prev.rank - newItem.rank;
      }

      return {
        ...newItem,
        rankingVariation,
      };
    });

    await rankingHistoryCollection.replaceOne(
      {
        _id: {
          $eq: prevData?._id,
        },
      },
      {
        list: insertList,
      },
      {
        upsert: true,
      },
    );

    prevRankingHistoryList = insertList;
  }

  data.forEach(item => {
    const rankingHistory = prevRankingHistoryList?.find(
      ({ streamer }) => streamer === item.streamer,
    );
    item.rankingVariation = rankingHistory?.rankingVariation || 0;
  });

  return {
    time: new Date().getTime(),
    data,
  };
};
