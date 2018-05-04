import React from 'react';
import { EmptyList } from '../../components';
import { Button, Table } from 'reactstrap';

import {MainNavBar} from '../../mainNavbarLogged';
import '../../styles/headerAdjusting.css';
import {sortTable} from '../../functions/sortTables'
import {filterType} from '../../functions/filterType'

const droneSizes = [
  '12x12',
  '24x24',
  '48x48',
  '96x96',
];

export const Drones = ({ items, handleAddDrone, handleChangeText, values, error, handleDelete }) => {
  return (
    <div className="headerAdjusting">
      {
        error
        && ( <div> { error } </div>) //TODO: usar component alerta
      }
      <CreateDrone
        handleChangeText={handleChangeText}
        handleAddDrone={handleAddDrone}
        values={values}
      />
      {
        (!items || items.length === 0)
        && (<EmptyList type={'drones'} />)
      }
      {
        (items && items.length > 0)
        && <DroneList items={items} handleDelete={handleDelete}/>
      }
    </div>
  );
};

const CreateDrone = ({ handleChangeText, values, handleAddDrone}) => (
  <div>
    <input
      type='text'
      placeholder='Tipo de drone'
      onChange={(e) => handleChangeText(e.target.value, 'droneType')}
      value={values.droneType}
    />
    <input
      type='text'
      placeholder='Nombre del drone'
      onChange={(e) => handleChangeText(e.target.value, 'droneName')}
      value={values.droneName}
    />
    <input
      type='number'
      placeholder='Peso del drone'
      onChange={(e) => handleChangeText(e.target.value, 'droneWeight')}
      value={values.droneWeight}
    />
    <select
      value={values.droneSize}
      onChange={(e) => handleChangeText(e.target.value, 'droneSize')}
    >
      {
        droneSizes.map((size, i) => (
            <option key={i} value={size}> {size} </option>
          )
        )
      }
    </select>
    <Button
      onClick={() => handleAddDrone()}
    >
      Añadir drone
    </Button>

  </div>
);




const DroneList = ({ items, handleDelete }) => (
  <Table>
    <thead>
      <tr>
        <th onClick={sortTable(0)} >#</th>
        <th onClick={sortTable(1)}>Nombre del drone</th>
        <th onClick={sortTable(2)}>Tipo de drone</th>
        <th onClick={sortTable(3)}>Peso del drone</th>
        <th onClick={sortTable(4)}>Tamaño del drone </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {items.map((drone, i) => (
        <tr>
          <td> {i} </td>
          <td> { drone.name || ''} </td>
          <td> { drone.type || ''} </td>
          <td> { drone.weight || 0} </td>
          <td> { drone.size || ''}</td>
          <td> <Button color='danger' onClick={() => handleDelete('drones', drone.key)}> Borrar </Button> </td>
        </tr>
        )
      )}
    </tbody>

  </Table>
);
