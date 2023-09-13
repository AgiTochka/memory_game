import {useState} from "react";
import {random} from "underscore";
import styles from "../style/Common.module.css";
import {useMedia} from "react-use";

const Card = (props) => {
    const [rotation, setRotation] = useState(random(-2, 2));
    const isMobile = useMedia("(max-width: 480px)")
    const isIPad = useMedia("(max-width: 820px)")

    const handleClick = (card, id) =>{
        props.handleChoice(card, id);
    }

    return (
        <div style={{
            display: "flex",
            flexBasis: isMobile ? "33%" : isIPad ? "25%" : "16.66%",
            width: isMobile ? "87px" : isIPad ? "135px" : "167px",
            height: isMobile ? "132px" : isIPad ?  "195px" : "244px",
            marginBottom: isMobile ? "18px" : isIPad ? "25px" : "50px",
        }}>
            <div className={styles.card}
                 style={{
                     transform: `rotate(${rotation}deg)`,
                 }}
                 onClick={() => {
                     if (!props.item.open && props.move) {
                         handleClick(props.item, props.id);
                     } else {
                         console.log("cards open ");
                     }

                 }}>
                <div
                    style={{
                        backgroundImage: `url("${"/memory_game/images/moroccan-flower.png"}")`,
                        boxShadow: "0px 2px 11px rgba(0, 0, 0, 0.06), 0px 1px 4px rgba(0, 0, 0, 0.25)",
                        backgroundSize: "cover",
                        margin: "auto",
                        textAlign: "center",
                        transform: props.item.open ? "perspective(1000px) rotateY(180deg)" : "perspective(1000px) rotateY(0deg)"
                    }}>
                </div>
                <div style={{
                    bacground: "#fff",
                    backgroundImage: `url("${"/memory_game"+props.item.url}")`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    boxShadow: "0px 2px 11px rgba(0, 0, 0, 0.06), 0px 1px 4px rgba(0, 0, 0, 0.25)",
                    margin: "auto",
                    textAlign: "center",
                    transform: props.item.open ? "perspective(1000px) rotateY(0deg)" : "perspective(1000px) rotateY(-180deg)"
                }} className={styles.cardBg + (props.flagOpen ? ' ' + styles.openTrue : '')}>
                    <div style={{
                        margin: isMobile ? "103% 9% 15px 9%" : isIPad ? "100% 6% 15px 6%" : "109% 6% 15px 6%",
                        padding: isMobile ? "3px 0 0px 0": isIPad ? "7px 0 3px 0" : "7px 0 3px 0",
                    }} className={styles.cardContent}>
                        <b>{props.item.name}<br/>
                            <span>{props.item.description}</span> </b>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;