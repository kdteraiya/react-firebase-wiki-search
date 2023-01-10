import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const AuthContext = React.createContext();

const LoadingIndicator = lazy(() => import("./components/LoadingIndicator/IndexLoading"));
const Home = lazy(() => import("./components/Home/Home"));
const Nav = lazy(() => import("./components/Nav/Nav"));
const Search = lazy(() => import("./components/Search/Search"));
const ScoreCard = lazy(() => import("./components/ScoreCard/ScoreCard"));

export default function Router() {

    const [user, setUser] = useState({});

    useEffect(() => {
        localStorage.getItem('email') &&
            setUser({
                userName: localStorage.getItem('name'),
                userEmail: localStorage.getItem('email'),
                userPic: localStorage.getItem('pic')
            });
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <Nav />
                <Suspense fallback={<LoadingIndicator />}>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/search" element={<Search />} />
                        <Route exact path="/scorecard" element={<ScoreCard />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Suspense>
            </BrowserRouter >
        </AuthContext.Provider>
    );
}