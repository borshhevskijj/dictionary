import React, { useEffect, useState, memo } from 'react'
import { useAppDispatch } from '../app/hooks';
import { setInputValue, selectInputValue } from '../slice/inputValueSlice';
import { useAppSelector } from "../app/hooks"
import { fetchWord } from '../slice/resultSlice'

import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Alert, Zoom, Button } from '@mui/material';
import cl from './input.module.css'

export const Input = memo(() => {
    const inputValue = useAppSelector(selectInputValue)
    // const [value, setValue] = useState(inputValue ?? '')
    const [value, setValue] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isEmpty, setIsEmpty] = useState(false)
    const { pathname } = useLocation()

    // useEffect(() => {
    //     sessionStorage.setItem('word', value)
    // }, [value])

    useEffect(() => {
        if (value === '') {
            setValue(sessionStorage.getItem('word')!)
        }
    }, [value])




    // const submit = () => {
    //     if (pathname === `/result/${value}`) {
    //         return false
    //     }
    //     if (value.trim()) {
    //         setIsEmpty(false)
    //         return navigate(`/result/${value}`)
    //     }
    //     setIsEmpty(true)
    // }

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

    const onPressEnterOnInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // dispatch(fetchWord(value))
            // submit()
            // navigate(`/result/${value}`)
            submit()
        }
    }

    return (
        <>
            <TextField
                color={isEmpty ? 'error' : 'primary'}
                variant='outlined'
                size='small'
                label='search...'
                type="text"
                value={value}
                error={!!isEmpty}
                onChange={e => setValue(e.target.value)}
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
        </>
    )
})
