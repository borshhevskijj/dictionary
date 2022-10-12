import React, { useEffect, useState, memo } from 'react'
import { useAppDispatch } from '../app/hooks';
import { setInputValue, selectInputValue } from '../slice/inputValueSlice';
import { useAppSelector } from "../app/hooks"
import { useNavigate } from 'react-router-dom';
import { Button, FilledInput, Typography, TextField } from '@mui/material';


export const Input = memo(() => {
    // const inputValue = useAppSelector(selectInputValue)
    const [value, setValue] = useState('')
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setInputValue(value))
    }, [value])




    return (
        <>
            <TextField
                color='primary'
                variant='standard'
                label='search...'
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}

            // error={!value}
            // helperText={value ? 'done' : 'somthing went wrong:('}
            />
            {/* <Button color='primary' variant='contained' onClick={() => { navigate(`/result/${inputValue}`) }}>отправить</Button> */}
        </>
    )
})
