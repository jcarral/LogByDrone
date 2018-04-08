import React from 'react';
import { EmptyList } from '../../components';
import { Table, Button } from 'reactstrap';

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
    <Button
      onClick={() => handleAddPilot()}
    >
      Añadir
    </Button>
  </div>
);

const PilotList = ({ items }) => (
  <Table>
    <thead>
      <tr>
        <th>#</th>
        <th>Nombre del piloto</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {items.map((pilot, i) => (
        <tr>
          <th> {i} </th>
          <th> {pilot.name ||  ''} </th>
          <th> <Button> Ver sus vuelos </Button> </th>
          <th> <Button> Borrar </Button> </th>
        </tr>
      )
      )}
    </tbody>
  </Table>
);

export const EditPilot = () => {

};

export const PilotDetail = () => {

};
