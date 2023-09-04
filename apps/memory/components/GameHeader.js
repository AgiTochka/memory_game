import {useStoreActions, useStoreState} from "easy-peasy"
import {useMedia} from "react-use"
import styles from "../style/Common.module.css"

const GameHeader = () => {
    const isMobile = useMedia("(max-width: 480px)")
    const isIPad = useMedia("(max-width: 820px)")
    const theme = useStoreState(state => state.theme);
    const playerName = useStoreState(state => state.username);
    const score = useStoreState(state => state.score);
    const scorePC = useStoreState(state => state.scorePC);
    const setStep = useStoreActions(actions => actions.setStep);
    const setTheme = useStoreActions((actions) => actions.setTheme);
    const setDifficulty = useStoreActions((actions) => actions.setDifficulty);
    const setScore = useStoreActions((actions) => actions.setScore);
    const setScorePC = useStoreActions((actions) => actions.setScorePC);
    const setMove = useStoreActions((actions) => actions.setMove);
    const setGameOver = useStoreActions(actions => actions.setGameOver);

    //const category = "Architecture"
    const textCategory = "Well, "
    const player1 = {
        name: "You",
        count: score,
    }
    const player2 = {
        name: "Computer",
        count: scorePC,
    }

    const handleClose = () =>{
        setTheme(null);
        setDifficulty(null);
        setScore(0);
        setScorePC(0);
        setMove(true);
        setStep('intro');
        setGameOver(false);

    }
    return (
        <div className={styles.largeText}
             style={{
                 display: "flex",
                 flexWrap: "wrap",
                 justifyContent: "space-between",
                 alignContent: "center",
                 alignItems: "center",
                 marginBottom: isMobile ? 10 : 40,
                 paddingLeft: 25,
             }}>
            <div className={styles.largeText} style={{
                fontSize: isMobile ? "20px" : isIPad ? "45px" : "60px",
                width: isMobile ? "75%" : isIPad ? "75%" : "50%",
            }}>
                {textCategory}<b>{theme}</b>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                order: isMobile || isIPad ? 1 : 0,
                width: isMobile ? "100%" : "",
            }}>
                <div className={styles.player}>
                    <span style={{
                        textAlign: "left",
                        color: "#005E72",
                        fontSize: isMobile ? 10 : 20,
                        marginRight: isMobile ? 5 : 12,
                    }
                    }>{player1.name}</span>
                    <span style={{
                        textAlign: "right",
                        fontSize: isMobile ? 10 : 20,
                    }}>{player1.count}</span>
                </div>
                <div className={styles.player}>
                    <span style={{
                        textAlign: "left",
                        color: '#005E72',
                        fontSize: isMobile ? 10 : 20,
                        marginRight: isMobile ? 6 : 12,
                    }
                    }>{player2.name}</span>
                    <span style={{
                        textAlign: "right",
                        fontSize: isMobile ? 10 : 20,

                    }}>{player2.count}</span>
                </div>
            </div>
            <div className={styles.quit} onClick={()=>{handleClose()}}>
                {isMobile ? "X" : "QUIT"}
            </div>
        </div>
    )
}

export default GameHeader
