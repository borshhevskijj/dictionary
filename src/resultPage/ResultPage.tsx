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
    console.log(results);


    return (
        <section className={cl.resultPageWrapper}>
            {!!results.length &&
                <>
                    <div className={cl.searchingWord}>Search by word: <strong>{results[0].word}</strong></div>
                    <h1 className={cl.title}>Meanings &amp; Defenitions:</h1>
                    <hr />
                </>
            }


            <div className={cl.MeaningsAndDefenitionsWrapper}>
                {!!results.length && results.map(result => {
                    return (
                        <div key={uid()}>
                            {result.meanings.map((item) => {
                                return (
                                    <section className={cl.MeaningsAndDefenitions} key={uid()}>
                                        <h1 className={cl.partOfSpeech} key={uid()}>Part Of Speech: {item.partOfSpeech}</h1>
                                        <>
                                            <h2>Definitions:</h2>
                                            {item.definitions.map((definition) => {
                                                return (
                                                    <ul>
                                                        <>
                                                            <li key={uid()}>{definition.definition}</li>
                                                        </>
                                                    </ul>
                                                )
                                            })}
                                            {item.definitions.map((definition) => {
                                                return (
                                                    <>
                                                        {(!!definition.synonyms?.length) ??
                                                            <article className={cl.synonyms} >
                                                                <h1>Synonyms:</h1>
                                                                <ul>
                                                                    {(!!definition.synonyms) ??
                                                                        definition.synonyms?.map(synonym => {
                                                                            return (
                                                                                <li key={uid()}>{synonym}</li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </article>
                                                        }
                                                        {(!!definition.antonyms) ??
                                                            <article className={cl.antonyms}>
                                                                <h1>Antonyms:</h1>
                                                                <ul>
                                                                    {definition.antonyms?.map(antonym => {
                                                                        return (
                                                                            <li key={uid()}>{antonym}</li>
                                                                        )
                                                                    })}
                                                                </ul>
                                                            </article>
                                                        }
                                                    </>
                                                )
                                            })}
                                            <hr />
                                        </>
                                    </section>
                                )
                            })}
                            <section className={cl.phoneticsWrapper}>
                                {!!result.phonetics.length &&
                                    <>
                                        <div>
                                            <h1>pronunciation: </h1>
                                            <div>{result.phonetics[0].text}</div>
                                        </div>
                                        <ul>

                                            {result.phonetics.map((phonetic) => {
                                                return (
                                                    <li key={uid()}>
                                                        <audio
                                                            controls
                                                            src={phonetic.audio}>
                                                        </audio>
                                                    </li>
                                                )
                                            })}

                                        </ul>
                                    </>
                                }
                            </section>
                            <hr />
                        </div>)
                })}
            </div>


        </section>

    )
})
