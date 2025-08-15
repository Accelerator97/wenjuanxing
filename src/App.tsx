import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routeConfig from './router/index';

function App() {
  return (
    <>
      <RouterProvider router={routeConfig} />
    </>
  );
}

export default App;
