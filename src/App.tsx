import { useCallback } from "react";
import { Route, Routes, useLocation } from 'react-router-dom';
import { loadFull } from 'tsparticles'
import Particles from 'react-tsparticles';
import type { ISourceOptions, Engine } from "tsparticles-engine";
import './i18n/config';

import About from './containers/about';
import ContactsComponent from './containers/contacts';
import Portfolio from './containers/portfolio';
import Home from './components/home';
import NavBar from './components/navBar';
import Theme from './components/theme';
import Footer from './components/footer';
import particlesConfig from './tsparticlesConfig/backgroundMaskParticlesConfig.json';

import './App.scss';
import './variables.scss';

const App = ()=> {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const renderParticles = useLocation().pathname === '/';

  return (
    <div className="App">
      {/* particles js */}
      { renderParticles
        && <Particles id="particles" options={particlesConfig as ISourceOptions} init={particlesInit} />
      }
      {/* navbar component */}
      <div className="App__navbar-wrapper">
        <NavBar />
      </div>
      {/* main page content */}
      <div className="App__main-content-wrapper">
        <Theme />
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/portfolio' element={<Portfolio />} />
          <Route path='/contacts' element={<ContactsComponent />} />
        </Routes>
      </div>
      <div className="App__footer-wrapper">
        <Footer />
      </div>
    </div>
  );
}

export default App;
