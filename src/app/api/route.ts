import axios from 'axios';
import members from '~/assets/members.json';
import expInfo from '~/assets/exp.json';
import { load } from 'cheerio';
import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import dayjs from 'dayjs';

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

interface StreamerRankData {
  streamer?: string;
  rank?: number;
}

export const GET = async () => {
  const data = await getStreamersData();
  return NextResponse.json(data);
};

export const getStreamersData = async () => {
  console.log('getStreamersData!');

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
