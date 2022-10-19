import React, { useEffect, memo } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchWord, selectResult } from '../slice/resultSlice'
import { selectResultStatus, selectResultError } from '../slice/resultSlice';
import { useParams } from 'react-router-dom';


import cl from './result.module.css'
import { Meanings } from './Meanings';
import { Phonetics } from './Phonetics';
import { Loader } from '../UI/Loader';
import { NotFoundPage } from '../notFoundPage/NotFoundPage';

export const uid = () => `f${(~~(Math.random() * 1e8)).toString(16)}`;


export const ResultPage = memo(() => {
    const results = useAppSelector(selectResult)
    const status = useAppSelector(selectResultStatus)
    const error = useAppSelector(selectResultError)
    const dispatch = useAppDispatch()
    const { word } = useParams()



    useEffect(() => {
        dispatch(fetchWord(word))
    }, [word])

    console.log(results);

    if (status === 'pending') {
        return (
            <Loader />
        )
    }
    if (error) {
        return (
            <NotFoundPage
                children={
                    <div>
                        {error.map(err => {
                            return (
                                <div style={{ padding: '20px 40px' }} key={uid()}>{err}</div>
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
        </div>
        // </Container>
        // </section>

    )
})
