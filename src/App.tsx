import React, { memo } from 'react';
import { HomePage } from './homePage/HomePage';
import { ResultPage } from './resultPage/ResultPage';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { CustomPage } from './CustomPage/CustomPage'
import { AppBar, Toolbar, Container, Button } from '@mui/material';
import { NavBar } from './navBar/NavBar';

import { Input } from './input/Input';
import { useAppDispatch } from './app/hooks';
import { setInputValue } from './slice/inputValueSlice';





function App() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()


  const goToHome = () => {
    if ((pathname !== '/')) {
      dispatch(setInputValue(''))
      return navigate('/')
    }
    return
  }


  return (

    <Container maxWidth='lg' className="App" style={{ paddingTop: 56 }}>
      <AppBar color='default'>
        <NavBar />
      </AppBar>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path={`/result/:word`} element={<ResultPage />} />
        <Route path='*' element={<CustomPage children={<div>Such a page does not exist</div>} />} />
      </Routes>
    </Container>

  );
}

export default memo(App);
