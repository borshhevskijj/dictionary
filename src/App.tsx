import React, { memo } from 'react';
import { HomePage } from './homePage/HomePage';
import { ResultPage } from './resultPage/ResultPage';
import { Route, Routes, useNavigate } from "react-router-dom"
import { Input } from './homePage/Input'
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setInputValue, selectInputValue } from './slice/inputValueSlice';
import { NotFoundPage } from './notFoundPage/NotFoundPage'
import { Button, AppBar, Toolbar } from '@mui/material';




function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const inputValue = useAppSelector(selectInputValue)


  return (
    <div style={{ paddingTop: 65 }} className="App">
      <AppBar
        color='default'
      // style={{ marginBottom: 264 }}
      >
        <Toolbar>
          <Input />
          <Button color='primary' variant='contained' onClick={() => { inputValue && navigate(`/result/${inputValue}`) }}>отправить</Button>
          <Button color='primary' variant='outlined' onClick={() => { navigate('/'); dispatch(setInputValue('')) }}>вернуться на главную</Button>

        </Toolbar>
        {/* <br /> */}
      </AppBar>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path={`/result/:word`} element={<ResultPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>


    </div>
  );
}

export default memo(App);
