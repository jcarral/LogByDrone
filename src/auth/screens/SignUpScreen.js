import React from 'react';
import { Link } from 'react-router-dom';

export const SignUpScreen = ({ handleChangeText, handleSignUp, values }) => (
  <div className="card bg-light mb-3 headerAdjusting mx-auto borderPad">
    <div className="card-header text-center">Registro</div>
    <div className="form-group">
      <label htmlFor="username">Nombre</label>
      <input
        type="text"
        className="form-control"
        id="username"
        placeholder="Nombre de usuario"
        onChange={(e) => handleChangeText(e.target.value, 'name')}
        value={values.name}
      />
    </div>
    <div className="form-group">
      <label htmlFor="orgname">Nombre de organización</label>
      <input
        type="text"
        className="form-control"
        id="orgname"
        placeholder="Nombre de la organización"
        onChange={(e) => handleChangeText(e.target.value, 'groupName')}
        value={values.groupName}
      />
    </div>
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
        id="pwd"
        placeholder="Contraseña"
        onChange={(e) => handleChangeText(e.target.value, 'password')}
        value={values.password}
      />
    </div>
    <div className="form-group">
      <label htmlFor="rePwd">Contraseña</label>
      <input
        type="password"
        className="form-control"
        id="rePwd"
        placeholder="Contraseña"
        onChange={(e) => handleChangeText(e.target.value, 'repeatPassword')}
        value={values.repeatPassword}
      />
    </div>
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => handleSignUp()}
    >
      Registrarse
    </button>

  <Link to='/'> Inicio </Link>
  </div>
);
