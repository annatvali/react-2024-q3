import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPageLayout from './layout/LandingPageLayout';
import Home from './routes/Home';
import AboutUs from './routes/AboutUs';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
