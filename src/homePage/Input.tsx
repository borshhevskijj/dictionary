import React, { useEffect, useState, memo } from 'react'
import { useAppDispatch } from '../app/hooks';
import { setInputValue, selectInputValue } from '../slice/inputValueSlice';
import { useAppSelector } from "../app/hooks"
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Alert, Zoom } from '@mui/material';
import cl from './input.module.css'

export const Input = memo(() => {
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
    }, [])



    const submit = () => {
        if (inputValue) {
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
        <>
            <TextField
                color={isEmpty ? 'error' : 'primary'}
                variant='outlined'
                size='small'
                label='search...'
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                error={!!isEmpty}
            />
            {/* {isEmpty && */}
            <Zoom in={isEmpty}>
                <Alert className={cl.alertBox} severity="error">This is an error alert — check it out!</Alert>
            </Zoom>
            {/* } */}
            <Button color='primary' variant='contained' onClick={() => submit()}>SUBMIT</Button>
        </>
    )
})
