import React, {Component} from 'react';

const filtering = (lista, field, filter) => {
  let tablaFiltrada;

  switch (field) {
  case 'name':
    tablaFiltrada=lista.filter( item =>item.name.includes(filter))
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

    break;
  case 'type':
    tablaFiltrada=lista.filter( item =>item.type.includes(filter))
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
    break;
  case 'weight':
    tablaFiltrada=lista.filter( item =>item.weight.includes(filter))
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
    break;
  case 'size':
    tablaFiltrada=lista.filter( item =>item.size.includes(filter))
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
    break;
  default:
    //'error';//TODO mejorar
}
return tablaFiltrada;
};

export {filtering};
