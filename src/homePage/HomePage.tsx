import React from 'react'
import { Image } from '../notFoundPage/Image';
// import cl from '../notFoundPage/NotFoundPage.module.css'
import cl from './homePage.module.css'
import { NotFoundPage } from '../notFoundPage/NotFoundPage'

export const HomePage = () => {
    return (
        <NotFoundPage children={
            <>
                <h1 className={cl.title}>Dictionary</h1>
                <h2 className={cl.subTitle}>Explains the lexical meaning of words</h2>
            </>
        } />
    )
} 
