import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Home } from "./Home/Home";
import { CreatePoint } from "./Point/CreatePoint";

const Routers: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/cadastro" element={ <CreatePoint /> } />
      </Routes>
    </Router>
  );
}

export default Routers;