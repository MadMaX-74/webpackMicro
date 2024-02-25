import React from 'react';
import classes from './App.module.scss'
import {Outlet} from "react-router-dom";

export function App() {
  return (
    <div data-testid={'App.DataTestId'}>
      Hello World
      <button className={classes.button}>Click</button>
      <Outlet />
    </div>
  );
}
