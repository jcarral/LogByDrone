import React from 'react';
import {Link} from 'react-router-dom';

export const MainNavBar = (props) => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
	  < Link to='/' className="navbar-brand" >NEmpresa</Link>
	  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		<span className="navbar-toggler-icon"></span>
	  </button>
	  <div className="collapse navbar-collapse" id="navbarNav">
		<ul className="navbar-nav">
		  <li className="nav-item">
			< Link to='/login' className="nav-link" >Iniciar Sesion</Link>
		  </li>
		  <li className="nav-item">
			< Link to='/signup' className="nav-link">Registro</Link>
		  </li>
		</ul>
	  </div>
	</nav>
  <div className="headerAdjusting"><br/></div>
  </div>
  );
};
