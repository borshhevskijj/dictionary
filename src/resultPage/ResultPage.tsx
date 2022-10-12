import React, { useEffect, memo } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchWord, selectResult } from '../slice/resultSlice'
import { selectResultStatus, selectResultError } from '../slice/resultSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import cl from './result.module.css'

const uid = () => `f${(~~(Math.random() * 1e8)).toString(16)}`;


export const ResultPage = memo(() => {
    const results = useAppSelector(selectResult)
    const status = useAppSelector(selectResultStatus)
    const error = useAppSelector(selectResultError)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { word } = useParams()


    useEffect(() => {
        if (error) {
            setTimeout(() => {
                navigate('/')
            }, 0);
            alert('Что-то пошло не так. Вы будете перенаправленны на главную страницу!')
        }
    }, [error])

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
        return <div>{error} error...</div>
    }



    return (
        <>
            {!!results.length &&
                <h1>Search by word: {results[0].word}</h1>
            }

            <h1>Meanings &amp; Defenitions:</h1>
            <hr />

            <section>
                {!!results.length && results.map(result => {
                    return (
                        <div key={uid()}>
                            {result.meanings.map((item) => {
                                return (
                                    <div className={cl.container} key={uid()}>
                                        <div key={uid()}>Part Of Speech: {item.partOfSpeech}</div>
                                        <>
                                            <h2>definitions:</h2>
                                            {item.definitions.map((definition) => {
                                                return (
                                                    <ul>
                                                        <li key={uid()}>{definition.definition}</li>
                                                    </ul>
                                                )
                                            })}
                                            {item.definitions.map((definition) => {
                                                return (
                                                    <div key={uid()}>
                                                        <ul>
                                                            {(!!definition.synonyms?.length) ??
                                                                <h2>Synonyms:</h2> ??
                                                                definition.synonyms?.map(synonym => {
                                                                    return (
                                                                        <li key={uid()}>{synonym}</li>
                                                                    )
                                                                })
                                                            }
                                                            {(!!definition.antonyms?.length) ??
                                                                <h2>Antonyms:</h2>
                                                                ??
                                                                definition.antonyms?.map(antonym => {
                                                                    return (
                                                                        <li key={uid()}>{antonym}</li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                )
                                            })}
                                            <hr />
                                        </>
                                    </div>
                                )
                            })}
                            <div className={cl.container}>
                                {!!result.phonetics.length &&
                                    <h2>pronunciation: </h2> &&
                                    <div> {result.phonetics[0].text} </div>
                                }
                                {!!result.phonetics.length && result.phonetics.map((phonetic) => {
                                    return (
                                        <div key={uid()}>
                                            <ul>
                                                {!!phonetic.audio &&
                                                    <li key={uid()}>
                                                        <audio
                                                            controls
                                                            src={phonetic.audio}>
                                                        </audio>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div>
                            <hr />
                        </div>)
                })}
            </section>


        </>

    )
})
