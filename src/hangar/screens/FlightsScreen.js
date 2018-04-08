import React from 'react';
import { EmptyList, WarningAlert } from '../../components';

export const Flights = ({
  items,
  handleAddFlight,
  handleAddFile,
  file,
  pilots,
  drones,
  handleChangeText,
  flightName,
  flightPilot,
  flightDrone,
  handleSelect
}) => {
  return (
    <div>
      {
        (!items || items.length === 0)
        && (<EmptyList type={'vuelos'} />)
      }
      {
        pilots.length === 0
        && drones.length === 0
        && (<WarningAlert> Por favor añade antes FlightUploadal menos un piloto y un drone </WarningAlert>)
      }
      {
        pilots.length === 0
        && drones.length > 0
        && (<WarningAlert> Por favor introduce antes al menos un piloto </WarningAlert>)
      }
      {
        pilots.length > 0
        && drones.length === 0
        && (<WarningAlert> Por favor introduce antes al menos un drone </WarningAlert>)
      }
      {
        pilots.length > 0
        && drones.length > 0
        && (
          <FlightUpload
            handleAddFile={handleAddFile}
            handleAddFlight={handleAddFlight}
            file={file}
            drones={drones}
            pilots={pilots}
            handleChangeText={handleChangeText}
            flightName={flightName}
            flightDrone={flightDrone}
            flightPilot={flightPilot}
            handleSelect={handleSelect}
          />
        )
      }
      {
        (items && items.length > 0)
        && (<FlightList items={items}/>)
      }
    </div>
  );
};

const FlightList = ({ items }) => (
  <div>
    { items.map((flight, i) => <div key={i}> {flight.name} {flight.drone.name} {flight.pilot.name} </div>)}
    </div>
);

const FlightUpload = ({
  handleAddFile,
  handleAddFlight,
  file,
  flightName,
  pilots,
  drones,
  handleChangeText,
  flightPilot,
  flightDrone,
  handleSelect
  }) => 
(
    <div className="file-container">
      <div className="file-drop-area">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre del vuelo"
          onChange={(e) => handleChangeText(e.target.value, 'flightName')}
          value={flightName}
        />
        <select
          value={
            (flightDrone !== '')?
              flightDrone.i
              : ((drones && drones.length > 0)? 0 : '')
            }
          onChange={(e) => handleSelect(e.target.value, 'drones', 'flightDrone')}
        >
          {
            drones.map((drone, i) => (
              <option key={i} value={i}> {drone.name} </option>
            )
            )
          }
        </select>
        <select
          value={
            (flightPilot !== '') ?
              flightPilot.i
              : ((pilots && pilots.length > 0) ? 0 :  '')
          }
          onChange={(e) => handleSelect(e.target.value, 'pilots', 'flightPilot')}
        >
          {
            pilots.map((pilot, i) => (
              <option key={i} value={i}> {pilot.name} </option>
            )
            )
          }
        </select>
        <span className="fake-btn">Selecciona fichero</span>
        {
          !file
          && <span className="file-msg js-set-number">&nbsp; o suéltalo aquí. </span>
        }
        {
          file
          && < span className="file-msg js-set-number">&nbsp; {file.path} </span>
        }

        <input className="file-input" type="file" onChange={handleAddFile} />
      </div>
      <button
        type='button'
        onClick={() => handleAddFlight()}
      >
      Añadir vuelo
      </button>
    </div>
);
