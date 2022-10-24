import React from 'react'
import { Input } from './../input/Input';
import { Container, Toolbar } from '@mui/material';



export const NavBar = () => {

    return (
        <Container maxWidth='lg'>
            <Toolbar style={{ padding: 0 }}>
                <Input />
            </Toolbar>
        </Container>

    )
}
