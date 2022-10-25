import React, { memo } from 'react';
import { HomePage } from './homePage/HomePage';
import { ResultPage } from './resultPage/ResultPage';
import { Route, Routes } from "react-router-dom"
import { CustomPage } from './CustomPage/CustomPage'
import { AppBar, Container } from '@mui/material';
import { NavBar } from './navBar/NavBar';
import { MachineLearning } from './Images/MachineLearning';

function App() {

  return (

    <Container maxWidth='lg' className="App" style={{ paddingTop: 56 }}>
      <AppBar color='default'>
        <NavBar />
      </AppBar>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path={`/result/:word`} element={<ResultPage />} />
        <Route path='*'
          element={
            <CustomPage
              svg={<MachineLearning />}
              children={<div>Such a page does not exist</div>}
            />}
        />
      </Routes>
    </Container>

  );
}

export default memo(App);
