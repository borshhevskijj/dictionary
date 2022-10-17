import React, { useEffect, memo } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchWord, selectResult } from '../slice/resultSlice'
import { selectResultStatus, selectResultError } from '../slice/resultSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';


import cl from './result.module.css'
import { Meanings } from './Meanings';
import { Phonetics } from './Phonetics';

export const uid = () => `f${(~~(Math.random() * 1e8)).toString(16)}`;


export const ResultPage = memo(() => {
    const results = useAppSelector(selectResult)
    const status = useAppSelector(selectResultStatus)
    const error = useAppSelector(selectResultError)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { word } = useParams()



    useEffect(() => {
        dispatch(fetchWord(word))
    }, [word])


    if (status === 'pending') {
        return (
            <div className={cl.loaderContainer}>
                <CircularProgress className={cl.loader} />
            </div>
        )
    }
    if (error) {
        return (
            <div>
                {error.map(err => {
                    return (
                        <div key={uid()}>{err}</div>
                    )
                })}
            </div>
        )
    }
    return (
        <section className={cl.resultPageWrapper}>
            <section>
                {results.length &&
                    <Phonetics results={results} />
                }
            </section>

            {results.length && results.map(result => (
                result.meanings.map(meaning => (
                    <section className={cl.MeaningsAndDefenitionsWrapper} key={uid()}>
                        <Meanings meaning={meaning} />
                    </section>
                ))
            ))
            }
        </section>

    )
})
