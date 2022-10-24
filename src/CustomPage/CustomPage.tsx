import React from 'react'
import cl from './CustomPage.module.css'

// any error pages & home page
type props = {
    children: JSX.Element
    svg: JSX.Element
}

export const CustomPage: React.FC<props> = ({ children, svg }) => {
    return (
        <div className={cl.pageWrapper}>
            <div className={cl.wrapper}>
                {svg}
                <div className={cl.textWrapper}>
                    {children}
                </div>
            </div>
        </div>
    )
}
