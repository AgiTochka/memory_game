import {
    createStore,
    StoreProvider,
    action,
    useStoreState,
} from "easy-peasy"
import Game from "./components/Game"
import Intro from "./components/Intro";
import {useMedia} from "react-use";


const store = createStore({
    theme: null,
    difficulty: null,
    username: null,
    score: 0,
    scorePC: 0,
    move: true,
    gameOver: false,
    choiceOne: null,
    choiceTwo: null,
    addScore: false,
    memory: [],
    arrCards: [],
    setAddScore: action((state, payload) => {
        state.addScore = payload;
    }),
    setArrCards: action((state, payload) => {
        state.arrCards = payload;
    }),
    setMemory: action((state, payload) => {
        state.memory = payload;
    }),
    SetChoiceOne: action((state, payload) => {
        state.choiceOne = payload;
    }),
    SetChoiceTwo: action((state, payload) => {
        state.choiceTwo = payload;
    }),
    setGameOver: action((state, payload) => {
        state.gameOver = payload;
    }),
    setMove: action((state, payload) => {
        state.move = payload;
    }),
    setTheme: action((state, payload) => {
        state.theme = payload;
    }),
    setDifficulty: action((state, payload) => {
        state.difficulty = payload;
    }),
    setUsername: action((state, payload) => {
        state.username = payload;
    }),
    setScore: action((state, payload) => {
        state.score = payload;
    }),
    setScorePC: action((state, payload) => {
        state.scorePC = payload;
    }),
    step: "intro", // intro | game | outro
    setStep: action((state, payload) => {
        state.step = payload;
    }),
    gameStats: [],
    addGameStats: action((state, payload) => {
        state.gameStats.push(payload)
    }),
})

const Wrapper = ({children}) => {
    return (
        <div style={{
            padding: "10px 20px",
            margin: "auto",
            maxWidth: "100%",
            minHeight: '100%',
        }}>

            {children}

        </div>
    )
}
const Main = () => {
    const step = useStoreState(state => state.step);

    return (
        <main>
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                minWidth: "100%",
                minHeight: "100%",
                backgroundColor: (step === "intro") ? "linear-gradient(180deg, #FFFFFF 0.04%, rgba(255, 255, 255, 0.821963) 38.73%, rgba(255, 255, 255, 0.480172) 54.94%, rgba(255, 255, 255, 0.0001) 79.12%)" : "#fff",
                backgroundImage: (step === "intro") ? `url(${"/memory_game/images/bgIntro2.png"})` : "",
                backgroundSize: "cover",
                backgroundPosition: "center",
                maskImage: (step === "intro") ? "linear-gradient(to bottom, transparent 50%, black)" : "",

            }}>
                <Wrapper>
                    {step === "intro" && <Intro/>}
                    {step === "game" && <Game/>}
                </Wrapper>

            </div>
        </main>
    )
}

const Home = () => {
    const isMobile = useMedia("(max-width: 480px)")
    const isIPad = useMedia("(max-width: 820px)")
    return (
        <StoreProvider store={store}>
            <div style={{
                padding: "0 12px",
                minWidth: "100%",
                minHeight: isMobile ? "100vh" : isIPad ? "100vh" : "90vh",
            }}>
                <Main/>
            </div>
        </StoreProvider>
    )
}

export default Home
