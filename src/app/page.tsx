import { Main } from '~/components';

import { getStreamersData } from './api/route';

export const revalidate = 60 * 60;

const Home = async () => {
  const data = await getStreamersData();

  return <Main data={data} />;
};

export default Home;
