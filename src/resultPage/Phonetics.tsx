import React, { FC, useState } from 'react'
import { ResultValue } from './../slice/resultSlice';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';


type props = {
    results: ResultValue[]
}

type audio = {
    text: string
    audio: string
}
export const Phonetics: FC<props> = ({ results }) => {
    const findValidUrl = () => {
        return results.map(result => (
            result.phonetics.find(item => (
                item.audio !== ''
            ))?.audio
        ))
    }
    const findValidUrlResult = findValidUrl()[0]

    return (
        <>
            <h1>Word: {results[0].word}</h1>

            <div>
                {results.find(res => res.phonetic !== '')?.phonetic}
                {
                    !!findValidUrlResult &&
                    <audio
                        controls
                        src={findValidUrlResult}
                    ></audio>
                }
            </div>
        </>
    )
}
