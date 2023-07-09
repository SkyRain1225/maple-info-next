import { Main } from '~/components';

import { getStreamersData } from './api/route';

export const revalidate = 'force-cache';

const Home = async () => {
  const jsonData = await getStreamersData();

  return <Main jsonData={jsonData} />;
};

export default Home;
