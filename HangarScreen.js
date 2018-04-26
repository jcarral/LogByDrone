import React from 'react';
import { Button } from 'reactstrap';
import {MainNavBar} from '../../mainNavbarLogged';
import '../../styles/headerAdjusting.css';

export const HangarScreen = ({ children, tab, handleChangeTab, handleLogout }) => (
  <div className="headerAdjusting">
    Aquí va todo lo gordo
    <Button color='danger' onClick={() => handleLogout()}> Salir </Button>
    <div>
      Aqui unos tabs guarros
      <button onClick={() => handleChangeTab(0, 'tab')}> Vuelos </button>
      <button onClick={() => handleChangeTab(1, 'tab')}> Drones </button>
      <button onClick={() => handleChangeTab(2, 'tab')}> Pilotos </button>
    </div>
    <div>
      { children }
    </div>
  </div>
);
