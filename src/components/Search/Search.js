import React, { useContext, useState } from 'react';
import { AuthContext } from "../../Router";
import { Navigate } from "react-router-dom";
import { insertRecord } from '../../utils/Database';
import './Search.css';

export default function Search() {

    const { user } = useContext(AuthContext);
    const [keyWord, setKeyWord] = useState("");
    const [results, setResults] = useState([]);
    const [err, setErr] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (keyWord !== '') {
            const endpoint = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srlimit=20&srsearch=${keyWord}`;

            const res = await fetch(endpoint);

            if (res.ok) {
                const json = await res.json();
                setResults(json.query.search);
            } else {
                setErr(true);
            }
        }
    }

    if (!user.userEmail) {
        return <Navigate to="/" />
    }

    return (
        <div className="search-page container">
            <h1> Search Page</h1>
            <form className="search-box" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={keyWord}
                    onChange={(e) => setKeyWord(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <div className="results">
                {err && <h2> No Data Found </h2>}
                {results.length !== 0 &&
                    <>  <h2>Search Results:</h2>
                        {results.map((result, i) => {
                            return (
                                <div className="card" key={i}>
                                    <div className="card-body">
                                        <h5 className="card-title">{result.title}</h5>
                                        <p className="card-text" dangerouslySetInnerHTML={{ __html: result.snippet }} />
                                        <button className="btn btn-primary" onClick={() => insertRecord({ userEmail: user.userEmail, ...result, created: Date.now() })}>
                                            <a href={`https://en.wikipedia.org/?curid=${result.pageid}`} className="btn btn-primary" target="_blank">
                                                Learn More</a>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                }
            </div>
        </div >
    );
}