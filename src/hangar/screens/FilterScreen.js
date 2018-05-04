import React, {Component} from 'react';
import { Button, Table } from 'reactstrap';
import {sortTable} from '../../functions/sortTables'
import {filtering} from '../../functions/filtering'

const Filtro = ({ lista = [], filter = '', field = '',  handleChangeFilter, handleChangeField }) => {

  return (
    <div>
    <input
      type='text'
      placeholder='Filtro'
      onChange={(e) => handleChangeFilter(e.target.value)}
    />

    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th onClick={() => handleChangeField('name')}>Nombre del drone</th>
          <th onClick={() => handleChangeField('type')}>Tipo de drone</th>
          <th onClick={() => handleChangeField('weight')}>Peso del drone</th>
          <th onClick={() => handleChangeField('size')}>Tamaño del drone </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filtering(lista, field, filter)}
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
      filter: '',
      field: '',
    }

  }
  handleChangeField = value => this.setState({ field:value });

  handleChangeFilter = value => this.setState({ filter:value });



  render() {
  	const { filter = '', items = [], field='' } = this.state;
    return (
      <div>
        <h2>Todos:</h2>
         <Filtro lista={items} filter={filter} field={field}  handleChangeFilter={this.handleChangeFilter} handleChangeField={this.handleChangeField}/>
      </div>
    )
  }
}

export {Filter}
