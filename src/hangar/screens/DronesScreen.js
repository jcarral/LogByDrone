import React from 'react';
import { EmptyList } from '../../components';

const droneSizes = [
  '12x12',
  '24x24',
  '48x48',
  '96x96',
];

export const Drones = ({ items, handleAddDrone, handleChangeText, values, error }) => {
  return (
    <div>
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
        <DroneList items={items} />
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
    <button
      onClick={() => handleAddDrone()}
    >
      Añadir drone
    </button>
  </div>
);

const DroneList = ({ items }) => (
  <div>
    {items.map((drone, i) => (<div key={i}> { drone.name }, { drone.type } </div>))}
  </div>
);
