import {useStoreActions, useStoreState} from "easy-peasy";
import {useEffect, useRef, useState} from "react";
import Card from "./Card";
import _, {forEach, random, sample, findIndex} from "underscore";

const Cards = (props) => {
    const choiceOne = useStoreState(state => state.choiceOne);
    const setChoiceOne = useStoreActions(actions => actions.SetChoiceOne);
    const setChoiceTwo = useStoreActions(actions => actions.SetChoiceTwo);
    const choiceTwo = useStoreState(state => state.choiceTwo);
    const memory = useStoreState(state => state.memory);
    const setMemory = useStoreActions(actions => actions.setMemory);

    const score = useStoreState(state => state.score);
    const setScore = useStoreActions(actions => actions.setScore);
    const setScorePC = useStoreActions(actions => actions.setScorePC);
    const scorePC = useStoreState(state => state.scorePC);
    const difficulty = useStoreState(state => state.difficulty);
    const move = useStoreState(state => state.move);
    const setMove = useStoreActions(actions => actions.setMove);
    const gameOver = useStoreState(state => state.gameOver);
    const setGameOver = useStoreActions(actions => actions.setGameOver);
    const setAddScore = useStoreActions(actions => actions.setAddScore);
    const [moveAI, setMoveAI] = useState(false);
    let diffParam = 0;
    if (difficulty == 'Medium') {
        diffParam = 3;
    } else if (difficulty == 'Hard') {
        diffParam = 4;
    } else if (difficulty == 'Pro') {
        diffParam = 5;
    } else {
        diffParam = 2;
    }
    let refIndexInMemory = useRef(0);
    let [flagTrueOpen, setFlagTrueOpen] = useState(Array(12).fill(false));
    let refIndexOpen = useRef(null);

    const handleChoice = (card, index) => {
        if (!gameOver) {
            choiceOne !== null ? setChoiceTwo(card) : setChoiceOne(card);
            card.open = true;
            props.setarrState([...props.arrCards]);
            if (index !== undefined) {
                addInMemory(index);
            }
        }
    }
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            if (choiceOne.id === choiceTwo.id) {
                refIndexOpen.curent = choiceOne.id;
                if (move) {
                    setAddScore(true);
                    setTimeout(() => {
                        setAddScore(false);
                    }, 450);
                    setScore(score + 50);
                    resetTurn();
                    delInMemory();
                } else {
                    setScorePC(scorePC + 50);
                    resetTurn();
                    delInMemory();
                }

            } else {
                resetTurn();
                setTimeout(() => {
                    choiceOne.open = false;
                    choiceTwo.open = false;
                    props.setarrState([...props.arrCards]);
                }, 1000)
            }
        }
    }, [choiceOne, choiceTwo]);

    useEffect(() => {
        for (let i = 0; i < props.arrCards.length; i++) {
            if (props.arrCards[i].id == refIndexOpen.curent) {
                flagTrueOpen[i] = true;
                setFlagTrueOpen([...flagTrueOpen]);
            }
        }
    }, [refIndexOpen, props.arrCards]);

    const resetTurn = () => {
        setMove(!move);
        setMoveAI(false);
        setChoiceOne(null);
        setChoiceTwo(null);

    }

    useEffect(() => {
        if (!move && !moveAI) {
            setTimeout(() => {
                movePC();
            }, 1000);
        }
    }, [move]);

    useEffect(() => {
        if (!move && moveAI) {
            movePC();
        }
    }, [move, moveAI]);

    useEffect(() => {
        let f = true;
        for (let i = 0; i < props.arrCards.length; i++) {
            if (!props.arrCards[i].open) {
                f = false;
            }
        }
        if (f) {
            setGameOver(true);
        }
    }, [props.arrCards,]);

    const addInMemory = (index) => {
        let flag = true;
        if (memory.length !== 0) {
            for (let i = 0; i < memory.length; i++) {
                if (memory[i] == index) {
                    flag = false;
                }
            }
        }
        if (flag) {
            if (memory.length < diffParam) {
                memory.push(index);
            } else {
                memory[refIndexInMemory.current] = index;
                refIndexInMemory.current++;
                if (refIndexInMemory.current >= diffParam) {
                    refIndexInMemory.current = 0;
                }
            }
        }
        setMemory([...memory]);
    }

    const delInMemory = () => {
        let newMemory = [];
        memory.forEach(element => {
            if (!props.arrCards[element].open) {
                newMemory.push(element);
            }
        });
        setMemory(newMemory);
    }

    const checkInMemory = (param, id) => {
        if (param == 1 && id) {
            for (let i = 0; i < memory.length; i++) {
                if (props.arrCards[memory[i]].id == props.arrCards[id].id && memory[i] != id) {
                    setTimeout(() => {
                        setChoiceTwo(props.arrCards[memory[i]]);
                        props.arrCards[memory[i]].open = true;
                        props.setarrState([...props.arrCards]);
                    }, 500)
                    return true;
                }
            }
            return false;
        }
        let i = 0;
        while (i < memory.length) {
            for (let j = i + 1; j < memory.length; j++) {
                if (props.arrCards[memory[i]].id == props.arrCards[memory[j]].id) {
                    setTimeout(() => {
                        setChoiceTwo(props.arrCards[memory[i]]);
                        props.arrCards[memory[i]].open = true;
                        props.setarrState([...props.arrCards]);
                        setTimeout(() => {
                            setChoiceOne(props.arrCards[memory[j]]);
                            props.arrCards[memory[j]].open = true;
                            props.setarrState([...props.arrCards]);
                        })
                    }, 500)
                    return true;
                }
            }
            i++;
        }
        return false;
    }
    const openRandom = () => {
        let closeCard = [];
        let indexCard = [];
        props.arrCards.map((card, index) => {
            if (!card.open) {
                closeCard.push(card);
                indexCard.push(index);
            }
        });
        let example = _.sample(closeCard);
        handleChoice(example, indexCard[_.indexOf(closeCard, example)]);
        return indexCard[_.indexOf(closeCard, example)];
    }

    const movePC = () => {
        let checkParam = 0;
        let endMove = false;
        let id;
        endMove = checkInMemory(checkParam);
        if (!endMove && !move) {
            setTimeout(() => {
                checkParam++;
                id = openRandom();
                if (!moveAI) {
                    endMove = checkInMemory(checkParam, id);
                } else {
                    endMove = true;
                }
                if (!endMove) {
                    setMoveAI(true);
                }
            }, 500);
        }
    }

    return props.arrCards.map((item, index) => {
        /*if (item.id == refIndexOpen.curent) {
            flagTrueOpen[index] = true;
            setFlagTrueOpen([...flagTrueOpen]);
            console.log(flagTrueOpen);
        }*/
        return <Card key={index} id={index} item={item} move={move} flagOpen={flagTrueOpen[index]}
                     handleChoice={handleChoice}></Card>
    })
}

export default Cards;