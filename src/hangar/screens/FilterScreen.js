import React, {Component} from 'react';
import { Button, Table } from 'reactstrap';
import {sortTable} from '../../functions/sortTables'
import {filtering} from '../../functions/filtering'

const Filtro = ({ lista , filter ,  handleChangeFilter }) => {
  lista = [
    {
      name : 'aa',
      type : 'aa',
      weight : '1',
      size : '12x12'
    },
    {
      name : 'aa',
      type : 'aa',
      weight : '2',
      size : '12x12'
    },
    {
      name : 'bb',
      type : 'cc',
      weight : '1',
      size : '12x12'
    },
    {
      name : 'cc',
      type : 'cc',
      weight : '1',
      size : '12x12'
    },
    {
      name : 'dd',
      type : 'dd',
      weight : '1',
      size : '12x12'
    },
    {
      name : 'adda',
      type : 'adda',
      weight : '1',
      size : '12x12'
    }
  ]
  console.log(1,lista);
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
