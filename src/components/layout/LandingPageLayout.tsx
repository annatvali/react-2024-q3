import { ReactNode, FC } from 'react';
import Footer from './Footer';
import Header from './Header';

interface LandingPageLayoutProps {
  children: ReactNode;
}

const LandingPageLayout: FC<LandingPageLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto">{children}</div>
      <Footer />
    </>
  );
};

export default LandingPageLayout;
