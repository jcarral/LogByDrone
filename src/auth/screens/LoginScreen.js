import React from 'react';

export const LoginScreen = ({ handleLogin, handleChangeText, values }) => (
  <form>
    <div className="card bg-light mb-3 headerAdjusting mx-auto borderPad">
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
      <a
        className="btn btn-primary"
        onClick={() => handleLogin()}
      >
        Iniciar Sesion
      </a>
    </div>
  </form>
);
