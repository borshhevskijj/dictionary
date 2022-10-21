import cl from './homePage.module.css'
import { CustomPage } from '../CustomPage/CustomPage'

export const HomePage = () => {
    return (
        <CustomPage children={
            <>
                <h1 className={cl.title}>Dictionary</h1>
                <h2 className={cl.subTitle}>Explains the lexical meaning of words</h2>
            </>
        } />
    )
} 
