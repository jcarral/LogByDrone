import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/cardStyling.css';
import {MainNavBar} from '../../mainNavbar';
import '../../styles/headerAdjusting.css';

export const LoginScreen = ({ handleLogin, handleChangeText, values }) => (

  <div>
	<div className="card bg-light mb-3 headerAdjusting mx-auto borderPad width-35rem card-border-pad headerAdjusting">
		<form>

			<div className="card-header text-center">Iniciar Sesion</div>
			<div className="form-group">
			  <label htmlFor="email">Email</label>
			  <input
				type="email"
				className="form-control"
				aria-describedby="emailHelp"
				placeholder="Introduzca su email"
				onChange={(e) => handleChangeText(e.target.value, 'email')}
				value={values.email}
			  />
			</div>
			<div className="form-group">
			  <label htmlFor="pwd">Contraseña</label>
			  <input
				type="password"
				className="form-control"
				placeholder="Contraseña"
				onChange={(e) => handleChangeText(e.target.value, 'password')}
				value={values.password}
			  />
			</div>
			<button
			  className="btn btn-primary"
			  onClick={() => handleLogin()}
			  type='button'
			>
			  Iniciar Sesion
		  </button>

		</form>
		<Link to='/signup'> Registrarse </Link>
	</div>

  </div>
);
