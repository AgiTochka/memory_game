import dynamic from "next/dynamic"
import {useMedia} from "react-use";

const MemoryApp = dynamic(() => import("apps/memory"), {
    ssr: false,
})

export default function ArticlePage({}) {
    const isMobile = useMedia("(max-width: 480px)")
    const isIPad = useMedia("(max-width: 820px)")
    return (
        <div style={{
            display: "flex",
            margin: isMobile ? "0 18px" : "20px auto",
            width: isMobile ? "100%" : isIPad ? "90%" : "90%",
            justifyContent: "center",
            flex: 1,}}>
            <div style={{flex: 1}}>
                <div style={{
                    position: "relative",
                    backgroundColor: "#fff",
                    padding: isMobile ? 17 : isIPad ? 20 : "25px",
                    borderRadius: isMobile ? 27 : 30,
                    maxWidth: "100%",
                    height: "100vh",
                    overflow: "hidden",
                }}>
                    <MemoryApp></MemoryApp>
                </div>
            </div>
        </div>

    )
}