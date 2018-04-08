import React from 'react';
import { EmptyList } from '../../components';

export const Pilots = ({ items, handleAddPilot, handleChangeText, pilotName, error }) => {
  return (
    <div>
      { error 
      && <div> {error} </div> 
      }
      <CreatePilot
        handleAddPilot={handleAddPilot}
        pilotName={pilotName}
        handleChangeText={handleChangeText}
      />
      {
        (!items || items.length === 0)
        && <EmptyList type={'pilotos'} />
      }
      {
        items
        && items.length > 0
        && <PilotList items={items} />
      }
     
    </div>
  );
};

export const CreatePilot = ({ handleAddPilot, pilotName, handleChangeText }) => (
  <div>
    <input
      type="text"
      className="form-control"
      placeholder="Nombre del nuevo piloto"
      onChange={(e) => handleChangeText(e.target.value, 'pilotName')}
      value={pilotName}
    />
    <button
      onClick={() => handleAddPilot()}
    >
      Añadir
    </button>
  </div>
);

const PilotList = ({ items }) => (
  <div>
    {items.map((pilot, i) => (<div key={i}> {pilot.name} </div>))}
  </div>
);

export const EditPilot = () => {

};

export const PilotDetail = () => {

};
