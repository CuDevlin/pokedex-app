import React from "react";
import Card from "../Components/Card";
import axios from "axios";
import { useState, useCallback } from "react";
import { useEffect } from "react";
import Nav from '../Components/Navbar'

const Root = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [,setPokeDex] = useState();
    const [,setSelectedPokemon] = useState(null);

    const pokeFun = useCallback(async () => {
        setPokeData([]); // Clear the existing data
        setLoading(true);
        const res = await axios.get(url);

        if (res && res.data && res.data.results) {
            getPokemon(res.data.results);
        } else {
            console.error("Error fetching Pokémon list");
        }

        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        setLoading(false);
    },[url])

    const getPokemon = async (res) => {
        if (Array.isArray(res)) {
            const pokemonData = await Promise.all(
                res.map(async (item) => {
                    const result = await axios.get(item.url);
                    return result.data;
                })
            );

            setPokeData((state) => {
                state = [...state, ...pokemonData];
                state.sort((a, b) => (a.id > b.id ? 1 : -1));
                return state;
            });
        } else {
            console.error("Invalid Pokémon data");
        }
    };

    useEffect(() => {
        pokeFun();
    }, [url, pokeFun])

    const handleSearch = async (searchedPokemon) => {
        if (searchedPokemon) {
            setPokeData([searchedPokemon]);
            setSelectedPokemon(searchedPokemon);
        } else {
            console.error("No search results or an error occurred.");
        }
    }

    return (
        <>
            <div className="Header">
            <Nav onSearch={handleSearch} />
            </div>
            <div className="container">
                <div className="content">
                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />
                </div>
                <div className="btn-group">
                        {prevUrl && <button onClick={() => {
                            setPokeData([])
                            setUrl(prevUrl)
                        }}>Previous</button>}

                        {nextUrl && <button onClick={() => {
                            setPokeData([])
                            setUrl(nextUrl)
                        }}>Next</button>}

                    </div>
            </div>
        </>
    )
}
export default Root;