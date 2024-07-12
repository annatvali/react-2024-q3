import { PureComponent } from 'react';
import { Outlet } from 'react-router';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

export default class LandingPageLayout extends PureComponent {
  render() {
    return (
      <>
        <Header />
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
        <Footer />
      </>
    );
  }
}
