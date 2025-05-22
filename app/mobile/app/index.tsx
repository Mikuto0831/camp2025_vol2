import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../config";

const Index = (): JSX.Element => {
    useEffect(
        () => {
            onAuthStateChanged(auth, (user) => {
                if (user !== null) {
                    router.replace("/map/map");

                }
            })
        }
    )
    return <Redirect href="/map/Top" />;
}

export default Index;