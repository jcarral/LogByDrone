import React from 'react';
import {Link} from 'react-router-dom';
//TODO borrar?
export const MainNavBarLogged = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
	  < Link to='/' className="navbar-brand" >NEmpresa</Link>
	  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		<span className="navbar-toggler-icon"></span>
	  </button>
	  <div className="collapse navbar-collapse" id="navbarNav">
		<ul className="navbar-nav">
		  <li className="nav-item">
        < Link to='/' className="nav-link" >Vuelos</Link>
		  </li>
		  <li className="nav-item">
        < Link to='/' className="nav-link" >Drones</Link>
		  </li>
      <li className="nav-item">
        < Link to='/' className="nav-link" >Pilotos</Link>
		  </li>
		</ul>
	  </div>
	</nav>
  );
};
