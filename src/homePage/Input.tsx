import React, { useEffect, useState, memo } from 'react'
import { useAppDispatch } from '../app/hooks';
import { setInputValue, selectInputValue } from '../slice/inputValueSlice';
import { useAppSelector } from "../app/hooks"
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Alert, Zoom, Container } from '@mui/material';
import cl from './input.module.css'

export const Input = () => {
    const inputValue = useAppSelector(selectInputValue)
    const [value, setValue] = useState('' || localStorage.getItem('word')!)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isEmpty, setIsEmpty] = useState(false)

    useEffect(() => {
        localStorage.setItem('word', value)
    }, [value])

    useEffect(() => {
        if (value === '') {
            setValue(localStorage.getItem('word')! && '')
        }
    }, [value])

    const submit = () => {
        if (inputValue.trim()) {
            setIsEmpty(false)
            return navigate(`/result/${inputValue}`)
        }
        setIsEmpty(true)
    }

    useEffect(() => {
        dispatch(setInputValue(value))
    }, [submit])


    const warning = () => {
        setTimeout(() => {
            setIsEmpty(false)
        }, 4000);
    }

    if (isEmpty) {
        warning()
    }

    return (
        <Container maxWidth='lg'>
            <TextField
                className={cl.input}
                color={isEmpty ? 'error' : 'primary'}
                variant='outlined'
                size='small'
                label='search...'
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                error={!!isEmpty}
            />
            <Zoom in={isEmpty}>
                <Alert className={cl.alertBox} severity="error">Input is invalid, type the word!</Alert>
            </Zoom>
            <Button sx={{ marginRight: 2, marginLeft: 2 }}
                color='info'
                size='medium'
                variant='contained'
                onClick={() => submit()}
            >SUBMIT</Button>
        </Container>
    )
}
