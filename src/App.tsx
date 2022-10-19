import React, { memo } from 'react';
import { HomePage } from './homePage/HomePage';
import { ResultPage } from './resultPage/ResultPage';
import { Route, Routes, useNavigate } from "react-router-dom"
import { Input } from './homePage/Input'
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setInputValue, selectInputValue } from './slice/inputValueSlice';
import { NotFoundPage } from './notFoundPage/NotFoundPage'
import { Button, AppBar, Toolbar, Container } from '@mui/material';




function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const goToHome = () => {
    navigate('/')
    dispatch(setInputValue(''))
  }


  return (
    <Container maxWidth='lg' className="App" style={{ paddingTop: 56 }}>
      <AppBar
        color='default'
      >
        <Toolbar>
          <Input />
          <Button
            color='info'
            size='small'
            variant='text'
            onClick={() => goToHome()} >GO TO HOMEPAGE</Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path={`/result/:word`} element={<ResultPage />} />
        <Route path='*' element={<NotFoundPage children={<div>Such a page does not exist</div>} />} />
      </Routes>
    </Container>

    // </div>
  );
}

export default memo(App);
