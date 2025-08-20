import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routeConfig from './router/index';

import 'antd/dist/reset.css';

function App() {
  return (
    <>
      <RouterProvider router={routeConfig} />
    </>
  );
}

export default App;
