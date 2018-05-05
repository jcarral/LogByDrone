import React, {Component} from 'react';

const filtering = (lista, filter) => {
  let tablaFiltrada;
  console.log(2,lista);
    tablaFiltrada=lista
    .filter( item =>item.name.includes(filter[0]))
    .filter( item =>item.type.includes(filter[1]))
    .filter( item =>item.weight.includes(filter[2]))
    .filter( item =>item.size.includes(filter[3]))
    .map((drone, i) => (
      <tr>
        <td> {i} </td>
        <td> { drone.name || ''} </td>
        <td> { drone.type || ''} </td>
        <td> { drone.weight || 0} </td>
        <td> { drone.size || ''}</td>
      </tr>
      )
    )
console.log(3,tablaFiltrada);
return tablaFiltrada;
};

export {filtering};
