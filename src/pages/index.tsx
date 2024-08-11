import { useRouter } from 'next/router';
import { useEffect } from 'react';
import HomeLayout from '../components/HomeLayout';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.pageId) {
      router.push('/page/1');
    }
  }, [router]);

  if (!router.query.pageId) {
    return <div>Redirecting...</div>;
  }

  return <HomeLayout />;
};

export default Home;
