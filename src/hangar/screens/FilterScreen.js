import React, {Component} from 'react';
import { Button, Table } from 'reactstrap';
import {sortTable} from '../../functions/sortTables'
import {filtering} from '../../functions/filtering'

const Filtro = ({ lista , filter ,  handleChangeFilter }) => {

  return (
    <div>
    <input
      type='text'
      placeholder='Filtro'
      onChange={(e) => handleChangeFilter(e.target.value,0)}
      value={filter[0]}
    />
    <input
      type='text'
      placeholder='Filtro'
      onChange={(e) => handleChangeFilter(e.target.value,1)}
      value={filter[1]}
    />
    <input
      type='text'
      placeholder='Filtro'
      onChange={(e) => handleChangeFilter(e.target.value,2)}
      value={filter[2]}
    />
    <input
      type='text'
      placeholder='Filtro'
      onChange={(e) => handleChangeFilter(e.target.value,3)}
      value={filter[3]}
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
        {filtering(lista, filter)}
      </tbody>
    </Table>
  </div>
  );
};



class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    	items: [],
      filter: ["","","",""],
    }
  }

  handleChangeFilter = (value,i) => {
    let auxFilter = this.state.filter.slice();
    auxFilter[i]=value;
    this.setState({ filter:auxFilter });
  }



  render() {
  	const { filter = '', items = []} = this.state;
    return (
      <div>
        <h2>Filtros:</h2>
         <Filtro lista={items} filter={filter} handleChangeFilter={this.handleChangeFilter} handleChangeField={this.handleChangeField}/>
      </div>
    )
  }
}

export {Filter}
