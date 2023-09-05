import styles from "../style/Common.module.css"
import Image from "next/image";
import {useMedia} from "react-use";
import {useEffect, useState} from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import _, {random} from "underscore";
import getRelatedCards from "./getRelatedCards";

const Intro = () => {
    const setStep = useStoreActions(actions => actions.setStep);
    const theme = useStoreState(state => state.theme);
    const difficulty = useStoreState(state => state.difficulty);
    const setTheme = useStoreActions((actions) => actions.setTheme);
    const setDifficulty = useStoreActions((actions) => actions.setDifficulty);
    const setArrCards = useStoreActions(actions => actions.setArrCards);
    const [selectedTheme, setSelectedTheme] = useState(-1);
    const [selectedDiff, setSelectedDiff] = useState(0);
    const handleClickTheme = (divNum) => {
        setSelectedTheme(divNum);
    };
    const handleClickDiff = (divNum) => {
        setSelectedDiff(divNum);
    };

    useEffect(()=>{
        if(theme != null){
            let arr = [];
            let arrRes = [];
            getRelatedCards(theme).then((data) => {
                    arrRes = Array.from(data);
                    for(let i=0; i< arrRes.length; i++){
                        arr.push(arrRes[i]);
                    }
                    setArrCards(arr);
                },
                (error) => {
                    console.log(error); // вывести ошибку
                    setTheme(null);
                    setArrCards([]);
                })
        }
    }, [theme])
    useEffect(() => {
        if (theme != null && difficulty != null) {
            setTimeout(()=>{
                setStep('game');
            }, 500)
        }
    }, [theme, difficulty]);

    function handleThemeSelect(theme) {
        setTheme(theme);
    }

    function handleDifficultySelect(difficulty) {
        setDifficulty(difficulty);
    }

    const isMobile = useMedia("(max-width: 480px)")
    const isIPad = useMedia("(max-width: 820px)")

    const arrTheme = ['Animals', /*'History', */'Famous people', 'Trees & Plants', 'Architecture'/*, 'Cities', 'Food & Beverages', 'Cars', 'Composers', 'Movies'*/];
    return (
        <div style={{
            padding: isMobile ? 10 : 45,
            width: "100%",
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
        }}>
            <div className={styles.introHeader}>
                Hi, welcome to the Memory Game
            </div>

            <div className={styles.categories}>
                <h3>Choose a topic to start the game</h3>
                <div className={styles.blocks + (selectedTheme == 0 ? ' ' + styles.activeTheme : '')} style={{
                    paddingTop: isMobile ? 9 : isIPad ? 10 : 10,
                }} onClick={() => {
                    handleClickTheme(0);
                    handleThemeSelect(arrTheme[_.random(0, arrTheme.length - 1)]);
                }}>
                    <Image src={`/memory_game/images/random.png`} alt={""} width={29} height={29}/>
                </div>
                <div className={styles.blocks + (selectedTheme == 1 ? ' ' + styles.activeTheme : '')} id={'btn-theme'} onClick={() => {
                    handleClickTheme(1);
                    handleThemeSelect('Animals');

                }}>
                    <p>🦕 Animals</p>
                </div>
                <div className={styles.blocks + (selectedTheme == 2 ? ' ' + styles.activeTheme : '')} id={'btn-theme'} onClick={() => {
                    /*handleThemeSelect('History');
                    handleClickTheme(2);*/

                }}>
                    <p> 👑 History </p>
                </div>
                <div className={styles.blocks + (selectedTheme == 3 ? ' ' + styles.activeTheme : '')} id={'btn-theme'} onClick={() => {
                    handleThemeSelect('Famous people');
                    handleClickTheme(3);

                }}>
                    <p> 🎩 Famous people</p>
                </div>
                <div className={styles.blocks + (selectedTheme == 4 ? ' ' + styles.activeTheme : '')} id={'btn-theme'} onClick={() => {
                    handleThemeSelect('Trees & Plants');
                    handleClickTheme(4);

                }}>
                    <p> 🌿 Trees & Plants </p>
                </div>
                <div className={styles.blocks + (selectedTheme == 5 ? ' ' + styles.activeTheme : '')} id={'btn-theme'} onClick={() => {
                    handleThemeSelect('Architecture');
                    handleClickTheme(5);

                }}>
                    <p> 🏛 Architecture </p>
                </div>
                <div className={styles.blocks + ' ' + styles.grey} id={'btn-theme'} onClick={() => {
                   // handleThemeSelect('Cities');

                }}>
                    <p> 🌃 Cities </p>
                </div>
                <div className={styles.blocks + ' ' + styles.grey} id={'btn-theme'} onClick={() => {
                   // handleThemeSelect('Food & Beverages');

                }}>
                    <p> 🍣 Food & Beverages </p>
                </div>
                <div className={styles.blocks + ' ' + styles.grey} id={'btn-theme'} onClick={() => {
                   // handleThemeSelect('Cars');

                }}>
                    <p> 🚙 Cars </p>
                </div>
                <div className={styles.blocks + ' ' + styles.grey} id={'btn-theme'} onClick={() => {
                   // handleThemeSelect('Composers');

                }}>
                    <p>🎻 Composers </p>
                </div>
                <div className={styles.blocks + ' ' + styles.grey} id={'btn-theme'} onClick={() => {
                   // handleThemeSelect('Movies');

                }}>
                    <p> 🎥 Movies </p>
                </div>
            </div>

            <div className={styles.difficult}>
                <h3>Difficulty level</h3>
                <div className={styles.blocks + (selectedDiff == 1 ? ' ' + styles.activeTheme : '')} id={'btn-diff'} onClick={() => {
                    handleDifficultySelect('Easy');
                    handleClickDiff(1);
                }}>
                    <p>Easy</p>
                </div>
                <div className={styles.blocks + (selectedDiff == 2 ? ' ' + styles.activeTheme : '')} id={'btn-diff'} onClick={() => {
                    handleDifficultySelect('Medium');
                    handleClickDiff(2)

                }}>
                    <p> Medium </p>
                </div>
                <div className={styles.blocks + (selectedDiff == 3 ? ' ' + styles.activeTheme : '')} id={'btn-diff'} onClick={() => {
                    handleDifficultySelect('Hard');
                    handleClickDiff(3)
                }}>
                    <p> Hard </p>
                </div>
                <div className={styles.blocks + (selectedDiff == 4 ? ' ' + styles.activeTheme : '')} id={'btn-diff'} onClick={() => {
                    handleDifficultySelect('Pro');
                    handleClickDiff(4)
                }}>
                    <p> Pro </p>
                </div>
            </div>
        </div>
    )
}
export default Intro;