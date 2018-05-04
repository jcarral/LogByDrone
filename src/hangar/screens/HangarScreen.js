import React from 'react';
import { Button } from 'reactstrap';
import {MainNavBar} from '../../mainNavbarLogged';
import '../../styles/headerAdjusting.css';
import {Link} from 'react-router-dom';

export const HangarScreen = ({ children, tab, handleChangeTab, handleLogout }) => (

  <div className="headerAdjusting">
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  < Link to='/' className="navbar-brand" >NEmpresa</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
  <ul className="navbar-nav">
    <li className="nav-item">
      <label className="nav-link" onClick={() => handleChangeTab(0, 'tab')}> Vuelos </label>
    </li>
    <li className="nav-item">
      <label className="nav-link" onClick={() => handleChangeTab(1, 'tab')}> Drones </label>
    </li>
    <li className="nav-item">
      <label className="nav-link" onClick={() => handleChangeTab(2, 'tab')}> Pilotos </label>
    </li>
    <li className="nav-item">
      <label className="nav-link" onClick={() => handleChangeTab(3, 'tab')}> Filtrar </label>
    </li>
  </ul>
  <ul className="navbar-nav">
    <li className="nav-item">
      <button className="btn btn-danger my-2 my-sm-0"  onClick={() => handleLogout()}>Salir</button>
    </li>
  </ul>
  </div>
</nav>
    <div>
      { children }
    </div>
  </div>
);
