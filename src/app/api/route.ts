import axios from 'axios';
import members from '~/assets/members.json';
import { load } from 'cheerio';
import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import dayjs from 'dayjs';

interface StreamerPlayerData {
  streamer: string;
  nickname: string;
  avatar?: string;
  server?: string;
  job?: string;
  level?: string;
  exp?: string;
  guild?: string;
  vote?: string;
  rankingVariation?: number;
}

interface StreamerRankData {
  streamer?: string;
  rank?: number;
}

export const GET = async () => {
  const debugStartTime = new Date().getTime();

  const data = await getStreamersData();

  console.log('duration:', new Date().getTime() - debugStartTime);

  return NextResponse.json(data);
};

export const getStreamersData = async () => {
  console.log('hihi');
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
        const level = $('.search_com_chk > td:eq(2)').text();
        const exp = $('.search_com_chk > td:eq(3)').text();
        const guild = $('.search_com_chk > td:eq(5)').text();
        const vote = $('.search_com_chk > td:eq(4)').text();

        resolve({
          streamer,
          nickname,
          avatar,
          server,
          job,
          level,
          exp,
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
    if (!a.level) return 0;
    if (!b.level) return 1;

    const levelA = parseInt(a.level.replace('Lv.', ''));
    const levelB = parseInt(b.level.replace('Lv.', ''));

    if (levelA === levelB) {
      const expA = parseInt(a.exp!.replace(/,/g, ''));
      const expB = parseInt(b.exp!.replace(/,/g, ''));
      return expA - expB;
    }

    return levelA - levelB;
  });

  const date = dayjs().format('YYYY-MM-DD');

  const historyDate = await kv.get('history.date');

  let historyList: StreamerRankData[];

  if (historyDate !== date) {
    const newHistoryList = data.map(({ streamer }, i) => ({ streamer, rank: i + 1 }));
    await kv.set('history.date', date);
    await kv.set('history.list', newHistoryList);

    historyList = newHistoryList;
  } else {
    historyList = (await kv.get('history.list')) as StreamerRankData[];

    data.map(item => {
      const historyItem = historyList.find(({ streamer }) => streamer === item.streamer);

      if (historyItem) {
        item.rankingVariation =
          historyItem.rank! - data.findIndex(({ streamer }) => streamer === item.streamer) - 1;
      }
    });
  }

  return data;
};
