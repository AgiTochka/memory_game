import GameHeader from "./GameHeader"
import {useEffect, useState} from "react";
import {action, useStoreActions, useStoreState} from "easy-peasy";
import Cards from "./Cards";
import {useMedia} from "react-use";
import _ from "underscore";

const Game = () => {
    const gameOver = useStoreState(state => state.gameOver);
    const arrCards = useStoreState(state => state.arrCards);
    const addScore = useStoreState(state => state.addScore);

    const isMobile = useMedia("(max-width: 480px)")
    const isIPad = useMedia("(max-width: 820px)")

    const [counter, setCounter] = useState(0);
    let arr = [];

    arr = JSON.parse(JSON.stringify(arrCards))
    for (let i = 0; i < arrCards.length; i++) {
        arr.push(arrCards[i]);
    }
    const [arrState, setarrState] = useState(_.shuffle(arr));
    return (
        <div style={{
            position: "relative",
            width: "100%",
            height:"100%",
            cursor: `url("/memory_game/images/cursor.cur"), url("/memory_game/images/cursor1.cur"), pointer`,
        }} onClick={() => {
            setCounter(counter + 1)
        }}>
            {gameOver && <div style={{
                position: "absolute",
                top: "45%",
                left: "42%",
                background: "white",
                fontSize: "35px",
                padding: "25px",
                textAlign: "center",
                fontFamily: "'SFRounded', sans-serif",
                color: "#055E71",
                letterSpacing: "-3px",
                border: "3px solid #005E72",
                zIndex: "12",
                borderRadius: "15px",
            }}>
                Game Over!
            </div>}
            <GameHeader/>
            {addScore && <div style={{
                position: "absolute",
                top: isMobile ? "48%" : "47%",
                left: isMobile ? "33%" : "45%",
                background: "white",
                fontSize: "35px",
                padding: "10px 25px",
                textAlign: "center",
                fontFamily: "'SFRounded', sans-serif",
                color: "#055E71",
                letterSpacing: "-3px",
                border: "2px solid #005E72",
                zIndex: "10",
                borderRadius: "15px",
                transform: `rotate(-10deg)`
            }}>
                +50
            </div>}

            <div style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                margin: "auto",
                justifyContent: "space-around"
            }}>
                <Cards arrCards={arrState} setarrState={setarrState}/>


            </div>
        </div>

    )
}

export default Game
