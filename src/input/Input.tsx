import React, { useEffect, useState, memo } from 'react'
import { useAppDispatch } from '../app/hooks';
import { setInputValue, selectInputValue } from '../slice/inputValueSlice';
import { useAppSelector } from "../app/hooks"

import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Alert, Zoom, Button } from '@mui/material';
import cl from './input.module.css'

export const Input = memo(() => {
    const inputValue = useAppSelector(selectInputValue)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isEmpty, setIsEmpty] = useState(false)
    const { pathname } = useLocation()

    useEffect(() => {
        if (inputValue === '') {
            dispatch(setInputValue(sessionStorage.getItem('word')!))
        }
    }, [])

    const submit = () => {
        if (pathname === `/result/${inputValue}`) {
            return
        }
        if (inputValue.trim()) {
            setIsEmpty(false)
            return navigate(`/result/${inputValue}`)
        }
        setIsEmpty(true)
    }

    const warning = () => {
        setTimeout(() => {
            setIsEmpty(false)
        }, 4000);
    }

    if (isEmpty) {
        warning()
    }

    const onPressEnterOnInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            submit()
        }
    }

    const goToHome = () => {
        if ((pathname !== '/')) {
            dispatch(setInputValue(''))
            sessionStorage.removeItem('word')
            navigate('/')
        }
    }

    return (
        <>
            <TextField
                color={isEmpty ? 'error' : 'primary'}
                variant='outlined'
                className={cl.input}
                size='small'
                label='search...'
                type="text"
                value={inputValue}
                error={!!isEmpty}
                onChange={e => dispatch(setInputValue(e.target.value))}
                onKeyDown={e => onPressEnterOnInput(e as React.KeyboardEvent<HTMLInputElement>)}
            />
            <Zoom in={isEmpty}>
                <Alert className={cl.alertBox} severity="error">Input is invalid, type the word!</Alert>
            </Zoom>
            <Button
                sx={{ marginRight: 2, marginLeft: 2 }}
                color='info'
                size='medium'
                variant='contained'
                onClick={() => submit()}
            >SUBMIT</Button>

            <Button
                color='info'
                size='small'
                variant='text'
                onClick={() => goToHome()}
            >GO TO HOMEPAGE</Button>
        </>
    )
})
