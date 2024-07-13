import { memo } from 'react';
import { Outlet } from 'react-router';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

const LandingPageLayout = memo(() => {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
});

export default LandingPageLayout;
