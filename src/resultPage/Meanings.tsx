import React, { FC, memo } from 'react'
import { uid } from './ResultPage';

type props = {
    meaning: {
        partOfSpeech: string;
        definitions: {
            definition: string;
            example: string;
            synonyms?: string[] | undefined;
            antonyms?: string[] | undefined;
        }[];
    }
}

export const Meanings: FC<props> = memo(({ meaning }) => {
    return (
        <>
            <h1>{meaning.partOfSpeech}</h1>
            <div>
                {meaning.definitions.map(def => (
                    <div key={uid()}>
                        <div><b>Definition: </b>{def.definition}</div>
                        <div>
                            <b>Example: </b>
                            {!!def.example ? `${def.example}.` : <b>absent</b>}
                        </div>
                        <div>
                            <b>Synonyms: </b>
                            {!!def.synonyms?.length ? `${def.synonyms.toString()}.` : <b>absent</b>}
                        </div>
                        <div>
                            <b>Antonyms: </b>
                            {!!def.antonyms?.length ? `${def.antonyms.toString()}.` : <b>absent</b>}
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
        </>
    )
}
)