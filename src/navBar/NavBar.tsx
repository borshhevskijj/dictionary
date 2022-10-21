import React from 'react'
import { Input } from './../input/Input';
import { Button, Container, Toolbar } from '@mui/material';
import { useAppDispatch } from '../app/hooks';
import { setInputValue } from '../slice/inputValueSlice';
import { useNavigate, useLocation } from "react-router-dom"



export const NavBar = () => {
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
        <Container maxWidth='lg'>
            <Toolbar
                style={{ padding: 0 }}
            >
                <Input />
                <Button
                    color='info'
                    size='small'
                    variant='text'
                    onClick={() => goToHome()} >
                    GO TO HOMEPAGE</Button>
            </Toolbar>
        </Container>

    )
}
