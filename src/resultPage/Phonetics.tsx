import React, { FC } from 'react'
import { ResultValue } from './../slice/resultSlice';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import cl from './phonetic.module.css'


type props = {
    results: ResultValue[]
}
type phoneticsTextOrAudio = 'text' | 'audio'


export const Phonetics: FC<props> = ({ results }) => {
    const findValidValue = (value: phoneticsTextOrAudio) => {
        return results.map(result => (
            result.phonetics.find(item => (
                !!item[value]
            ))
        ))
    }
    const validText = results.find(res => res.phonetic !== '')?.phonetic ?? findValidValue('text')[0]?.text
    const validAudio = findValidValue('audio')[0]?.audio
    const audio = new Audio(validAudio)


    return (
        <>
            <h1 className={cl.title}>Word: {results[0].word}</h1>
            <div className={cl.phonetic}>
                <span className={cl.phoneticText}>{`[ ${validText} ]`} </span>
                {
                    !!validAudio &&
                    <span className={cl.phoneticAudio}>
                        <VolumeUpIcon onClick={() => audio.play()} />
                    </span>
                }
            </div>
        </>
    )
}
