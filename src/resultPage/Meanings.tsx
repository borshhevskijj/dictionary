import React, { FC } from 'react'

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

export const Meanings: FC<props> = ({ meaning }) => {
    return (
        <>
            <h1>{meaning.partOfSpeech}</h1>
            <div>
                {meaning.definitions.map(def => (
                    <>
                        <div>{def.definition}</div>
                        {!!def.example && <b>Example: {def.example}</b>}
                        {!!def.antonyms?.length &&
                            <div>
                                <b>Antonyms:</b>
                                <span> {def.antonyms.toString()} </span>
                            </div>
                        }
                        {!!def.synonyms?.length &&
                            <div>
                                <b>Synonyms:</b>
                                <span> {def.synonyms.toString()}</span>
                            </div>
                        }
                        <hr />
                    </>
                ))}
            </div>


        </>
    )
}
