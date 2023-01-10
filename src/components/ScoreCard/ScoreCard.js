import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../Router";
import { Navigate } from "react-router-dom";
import { getRecord } from '../../utils/Database';
import './ScoreCard.css';

export default function ScoreCard() {

    const { user } = useContext(AuthContext);
    const [startHour, setStartHour] = useState(148);
    const [scoreCards, setScoreCards] = useState(null);

    const fetchData = async (startHour) => {
        let starting = new Date(Date.now() - startHour * 60 * 60 * 1000)
        let data = await getRecord(starting, user.userEmail);
        setScoreCards(data);
        // console.log(scoreCards);
    }

    useEffect(() => {
        fetchData(startHour);
    }, [startHour]);

    if (!user.userEmail) {
        return <Navigate to="/" />
    }

    return (
        <div className="scorecard-page container">
            <div className="title">
                <h1>Check your ScoreCard</h1>
                <select
                    className="timeDropdown"
                    name="timeDropdown"
                    id="timeDropdown"
                    onChange={(e) => setStartHour(e.target.value)}>
                    <option value="148">Last 7 Days</option>
                    <option value="24">Last 1 Day</option>
                    <option value="1">Last 1 hour</option>
                </select>
            </div>
            <div className="scorecards">
                {scoreCards && scoreCards.length !== 0 && scoreCards.map((card, i) => {
                    return (
                        <div className="card" key={i}>
                            <div className="card-body">
                                <h5 className="card-title">{card.title}</h5>
                                <p className="card-text" dangerouslySetInnerHTML={{ __html: card.snippet }} />
                                <a href={`https://en.wikipedia.org/?curid=${card.pageid}`} className="btn btn-primary" target="_blank">
                                    Learn More</a>
                            </div>
                        </div>
                    );
                })}
                {
                    scoreCards && scoreCards.length === 0 && <h2> No Data Found </h2>
                }
            </div>
        </div>
    );
}