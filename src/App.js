import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Container from './components/Container';
import Header from './components/Header';
import LikeList from './pages/LikeList';
import Home from './pages/Home';

const App = () => {
  return (
    <Container>
      <Header />

      <Switch>
        <Route path='/likelist' component={LikeList} />
        <Route path='/' component={Home} />
      </Switch>
    </Container>
  );
};

export default App;
