import React, { useEffect, memo } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchWord } from '../slice/resultSlice'
import { setInputValue } from '../slice/inputValueSlice';
import { selectResult } from '../slice/resultSlice';
import { useParams, useLocation } from 'react-router-dom';


import cl from './result.module.css'
import { Meanings } from './Meanings';
import { Phonetics } from './Phonetics';
import { Loader } from '../UI/Loader'
import { CustomPage } from '../CustomPage/CustomPage';

export const uid = () => `f${(~~(Math.random() * 1e8)).toString(16)}`;


export const ResultPage = memo(() => {
    const { error, status, results } = useAppSelector(selectResult)
    const dispatch = useAppDispatch()
    const { word } = useParams()
    const { pathname } = useLocation()


    useEffect(() => {
        dispatch(fetchWord(word))
        dispatch(setInputValue(word!))
        sessionStorage.setItem('word', word!)
    }, [word])


    if (status === 'pending') {
        return (
            <Loader />
        )
    }
    if (error) {
        return (
            <CustomPage
                children={
                    <div>
                        {error.map(err => {
                            return (
                                <div style={{ padding: '20px 0' }} key={uid()}>{err}</div>
                            )
                        })}
                    </div>
                }
            />
        )
    }


    return (
        <div style={{ paddingBottom: 56 }}>
            <section>
                {!!results.length &&
                    <Phonetics results={results} />
                }
            </section>

            {!!results.length && results.map(result => (
                result.meanings.map(meaning => (
                    <section className={cl.MeaningsAndDefenitionsWrapper} key={uid()}>
                        <Meanings meaning={meaning} />
                    </section>
                ))
            ))
            }
        </div>
    )
})
