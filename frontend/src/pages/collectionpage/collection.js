import axios from 'axios';
import NavComp from '../../components/navcomp';
import sty from './collection.module.css';


const Collection = () => {
    const reloadIcon = <i class="fa-solid fa-rotate-right"></i>
    const warningIcon = <i class="fa-solid fa-triangle-exclamation"></i>
    const updateDB = () => {
        console.log('Updating the database');
        try{
        const res = axios.get('/update');
        console.log(res);
        }catch(err){    
            if (err.response.status === 429){
                console.log("You have exceeded the 1 request in 5 minutes limit!")
            }
            console.error("Error while updating database!" , err);
        }
    };
    const collectData = () => {
        console.log('Collecting data');
        try{
        const res = axios.get('/collect');
        console.log(res);
        }catch(err){    
            console.error("Error while collecting data!" , err);
        }
    }

    return (
        <div className={sty.main}>
            <NavComp/>
            <div className={sty.page}>
                <div className={sty.collectcontainer}>
                        <div className={sty.c_info}>
                            <h1>Collection</h1>
                            <p>
                                The Data collection is a rigurous process in which the site utilizes the public nature of Chick-Fil-A's design and web structure
                                to its advantage. It scans the site for keys, these keys are buttons, links, or text and then it executes an action based on that. 
                                It automatically navigates to the reports page, downloads the reports, and then uploads them to the database.
                                Where I serve the data here (PRIVATELY) for you to view, otherwise there is mocke data provided.
                            </p>
                            <iframe src="https://giphy.com/embed/SpopD7IQN2gK3qN4jS" width="480" height="307" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/website-SpopD7IQN2gK3qN4jS"></a></p>
                        </div>
                        <span className={sty.warn}>{warningIcon}</span>
                        <p className={sty.warning}>
                            Quick warning! You can only collect data if the wesbite has new data. 
                            Do not expect to click the update button and then new data appear. 
                            It also takes time. If at first it does not work, refresh. 
                            If there is nothing there, then there is no new data.
                        </p>
                        <span className={sty.warn}>{warningIcon}</span>
                        <div className={sty.c_button}>
                            <h3>Update Database</h3>
                            <button className={sty.buttons} onClick={updateDB}>{reloadIcon}</button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Collection;