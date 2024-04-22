import sy from "./feedstyles.module.css";
import { useState } from "react";
import { motion } from "framer-motion";


const FeedObject = ({aT, a, q, f, o, date}) => {
    const icon4 = <i class="fa-solid fa-caret-down"></i>
    const [isToggled, setToggled] = useState(false);

    const variants = {
        start: { y: 0 },
        trigger: { y: 100}
    }

    const toggleAnim = () => {setToggled(!isToggled)}

    return (
        <div>
        <motion.div
        initial="start"
        animate={isToggled ? "trigger" : "start"}
        variants={variants}
        transition={{ duration: 1 }}
        >
            <div className={sy.box}>
                <div className={sy.title}>
                    <h1>{aT}</h1>
                </div>
                <div className={sy.info}>
                    <p>{o}</p>
                    <p>{date}</p>
                    <p>{a}</p>
                </div>
                <div className={sy.text}>
                    <h1>Question</h1>
                    <p>{q}</p>
                </div>
                <div className={sy.text}>
                    <h1>Finding</h1>
                    <p>{f}</p>
                </div>
            </div>
        </motion.div>
        <div className={sy.arrow}>
            <button onClick={toggleAnim}>{icon4}</button>
        </div>
    </div>
    )
}
export default FeedObject;  