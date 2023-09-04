import memory from "./apps/memory";
import {useMedia} from "react-use";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function HomePage() {
    const isMobile = useMedia("(max-width: 480px)")
    const isIPad = useMedia("(max-width: 820px)")
    const router = useRouter();
    useEffect(() => {
        router.push("/apps/memory");
    }, []);
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
                    height: isMobile ? "100vh" : isIPad ? "100vh" : "90vh",
                    overflow: "hidden",
                }}>
                </div>
            </div>
        </div>


    );
}