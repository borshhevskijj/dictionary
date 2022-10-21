import React from 'react'
import cl from './CustomPage.module.css'
import { Image } from './Image.jsx'

// any error pages & home page
type props = {
    children: JSX.Element

}

export const CustomPage: React.FC<props> = ({ children }) => {
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
