import React from 'react';
import { Alert } from 'reactstrap';
export const WarningAlert = ({ children }) => (
  <Alert color='warning'>
    { children }
  </Alert>
);
