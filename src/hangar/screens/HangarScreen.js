import React from 'react';

export const HangarScreen = ({ children, tab, handleChangeTab }) => (
  <div>
    Aquí va todo lo gordo
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
