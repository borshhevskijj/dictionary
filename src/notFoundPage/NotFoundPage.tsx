import React, { FC } from 'react'
import cl from './NotFoundPage.module.css'
import { Image } from './Image.jsx'


type props = {
    children: JSX.Element
}
export const NotFoundPage: FC<props> = ({ children }) => {
    return (
        <div className={cl.pageWrapper}>
            <div className={cl.wrapper}>
                <Image />
                <div className={cl.textWrapper}>
                    {children}
                </div>
            </div>
        </div>
    )
}
