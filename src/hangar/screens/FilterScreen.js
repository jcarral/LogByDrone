import React, {Component} from 'react';
import { Button, Table } from 'reactstrap';
import {filtering} from '../../functions/filtering'
import { EmptyList } from '../../components';

export const FilterScreen = ({ items , droneFilter , handleChangeDroneFilter }) => {
  return (

    <div>
    <h2>Filtros:</h2>
    {
      (!items || items.length === 0)
      && (<EmptyList type={'vuelos'} />)
    }
    {
      (items && items.length > 0)
      && <FilteredDroneList items={items} handleChangeDroneFilter={handleChangeDroneFilter} droneFilter={droneFilter}/>
    }
  </div>
  );
};

const FilteredDroneList = ({ items, droneFilter, handleChangeDroneFilter}) => (
  <div>
    <input
      type='text'
      placeholder='Filtro nombre'
      onChange={(e) => handleChangeDroneFilter(e.target.value,0)}
      value={droneFilter[0]}
    />
    <input
      type='text'
      placeholder='Filtro tipo'
      onChange={(e) => handleChangeDroneFilter(e.target.value,1)}
      value={droneFilter[1]}
    />
    <input
      type='text'
      placeholder='Filtro peso'
      onChange={(e) => handleChangeDroneFilter(e.target.value,2)}
      value={droneFilter[2]}
    />
    <input
      type='text'
      placeholder='Filtro tamaño'
      onChange={(e) => handleChangeDroneFilter(e.target.value,3)}
      value={droneFilter[3]}
    />

    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre del drone</th>
          <th>Tipo de drone</th>
          <th>Peso del drone</th>
          <th>Tamaño del drone </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filtering(items, droneFilter)}
      </tbody>
    </Table>
  </div>
);
