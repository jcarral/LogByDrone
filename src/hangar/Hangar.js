import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPilot, getHangar, addDrone, parseFlight, deleteItem } from './hangar.actions';
import { logout } from '../auth';
import { HangarScreen, Pilots, Flights, Drones } from './screens';
import { LoadingTab } from '../components';
import { Validator } from '../utils';

import {Filter} from './screens/FilterScreen';
// TABS:
const FLIGHTS = 0;
const DRONES = 1;
const PILOTS = 2;
const FILTER = 3;

class HangarContainer extends Component{

  state = {
    tab: 0,
    pilotName: '',
    droneName: '',
    droneWeight: 0,
    droneSize: '',
    droneType: '',
    file: null,
    flightName: '',
    flightPilot: {},
    flightDrone: {},
  };

  componentWillMount = () => {
    const { groupId, getHangarAction } = this.props;
    if(groupId){
      getHangarAction(groupId);
    }
  }

  handleAddPilot = () => {
    const { pilotName } = this.state;
    const { addPilotAction, groupId } = this.props;
    if(Validator.isName(pilotName)){
      addPilotAction(
        {
          name: pilotName,
          date: new Date().getTime(),
        },
        groupId
      );
    }
  };

  handleAddDrone = () => {
    const {
      droneName,
      droneSize,
      droneWeight,
      droneType,
    } = this.state;
    const { addDroneAction, groupId } = this.props;

    if(
      Validator.isName(droneName)
      && Validator.isName(droneType)
    ){
      addDroneAction({
        name: droneName,
        size: droneSize,
        weight: droneWeight,
        type: droneType,
        date: new Date().getTime(),
      }, groupId);
    }
  }

  handleAddFlight = () => {
    const {
      file,
      flightName,
      flightDrone,
      flightPilot,
    } = this.state;
    const {flights, drones} = this.props;
    let drone = Object.assign({}, flightDrone);
    let pilot = Object.assign({}, flightPilot);
    const { addFlightAction } = this.props;
    if (Object.keys(drone).length === 0){
      drone = {
        name: drones[0].name,
        key: drones[0].key,
      };
    }
    if (Object.keys(pilot).length === 0) {
      pilot = {
        name: flights[0].name,
        key: flights[0].key,
      };
    }

    addFlightAction(file, {
      drone,
      pilot,
      name: flightName,
    });

  }

  handleChangeText = (text, key) => {
    let tmpState = {};
    tmpState[key] = text;
    this.setState(Object.assign({}, this.state, tmpState));
  };

  handleAddFile = (e) => {
    this.setState({ file: e.target.files[0]});
  }

  handleSelect = (key, type, attribute) => {
    const { drones, pilots } = this.props;
    let tmpState = {};
    console.log(key, type, attribute, drones, )
    //tmpState[attribute] = (type === 'drones')? drones[key] : pilots[key];
    if(type === 'drones'){
      console.log(drones[key]);
      tmpState[attribute] = {
        key: drones[key].key,
        name: drones[key].name,
        i: key,
      };
    }else if(type === 'pilots'){
      console.log(pilots[key]);
      tmpState[attribute] = {
        key: pilots[key].key,
        name: pilots[key].name,
        i: key,
      };
    }
    this.setState(Object.assign({}, this.state, tmpState));
  };

  handleLogout = async () => {
    const { logoutAction, history } = this.props;
    await logoutAction();
    history.push('/');
  }

  handleDelete = (type, key) => {
    const { deleteItemAction } = this.props;
    deleteItemAction(type, key);
  };

  render(){
    const {
      pilots,
      flights,
      drones,
      updateErrors,
      loading,
    } = this.props;
    const {
      tab,
      pilotName,
      droneName,
      droneSize,
      droneWeight,
      droneType,
      file,
      flightPilot,
      flightDrone,
      flightName,
    } = this.state;
    const tabComponents = [
      <Flights
        items={flights}
        handleAddFlight={this.handleAddFlight}
        handleAddFile={this.handleAddFile}
        file={file}
        pilots={pilots}
        drones={drones}
        flightName={flightName}
        handleChangeText={this.handleChangeText}
        handleSelect={this.handleSelect}
        flightPilot={flightPilot}
        flightDrone={flightDrone}
        handleDelete={this.handleDelete}
      />,
      <Drones
        items={drones}
        handleChangeText={this.handleChangeText}
        handleAddDrone={this.handleAddDrone}
        values={{
          droneName,
          droneSize,
          droneWeight,
          droneType
        }}
        error={updateErrors.drones}
        handleDelete={this.handleDelete}
      />,
      <Pilots
        items={pilots}
        handleAddPilot={this.handleAddPilot}
        handleChangeText={this.handleChangeText}
        pilotName={pilotName}
        error={updateErrors.pilots}
        handleDelete={this.handleDelete}
      />,
      <Filter
        items={drones}
      />,
    ];

    return (
      <HangarScreen
        handleChangeTab={this.handleChangeText}
        handleLogout={this.handleLogout}
      >
        {
          loading
          && (<LoadingTab />)
        }
        {
          !loading
          && tabComponents[tab]
        }
      </HangarScreen>
    );
  }
}

const mapStateToProps = (state, action) => ({
  groupId: state.auth.groupId,
  pilots: state.hangar.pilots,
  drones: state.hangar.drones,
  flights: state.hangar.flights,
  updateErrors: state.hangar.updateErrors,
  loading: state.hangar.loading,
});

const mapDispatchToProps = dispatch => ({
  getHangarAction: (groupId) => dispatch(getHangar(groupId)),
  addPilotAction: (pilotData, groupId) => dispatch(addPilot(pilotData, groupId)),
  addDroneAction: (droneData, groupId) => dispatch(addDrone(droneData, groupId)),
  addFlightAction: (file, data) => dispatch(parseFlight(file, data)),
  logoutAction: () => dispatch(logout()),
  deleteItemAction: (type, key) => dispatch(deleteItem(type, key)),
});

export const Hangar = connect(mapStateToProps, mapDispatchToProps)(HangarContainer);
