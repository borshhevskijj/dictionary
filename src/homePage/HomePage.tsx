import cl from './homePage.module.css'
import { CustomPage } from '../CustomPage/CustomPage'
import { WritingSvg } from '../Images/WritingSvg'


export const HomePage = () => {
    return (
        <CustomPage
            svg={<WritingSvg />}
            children={
                <>
                    <h1 className={cl.title}>Dictionary</h1>
                    <h2 className={cl.subTitle}>Explains the lexical meaning of words</h2>
                </>
            } />
    )
} 
