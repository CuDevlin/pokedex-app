import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

const PokeDetails = ({ data }) => {
    const { id } = useParams();
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setPokemonData(data);
            })
            .catch((error) => {
                console.error("Error fetching Pokémon details:", error);
            });
    }, [id]);

    if (!pokemonData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>Pokémon Details for ID: {id}</h1>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                alt=""
            />
            <div className="abilities">
                {pokemonData.abilities.map((poke, index) => (
                    <div key={index} className="group">
                        <h2>{poke.ability.name}</h2>
                    </div>
                ))}
            </div>
            <div className="poke-info">
                {pokemonData.stats.map((poke, index) => (
                    <h3 key={index}>
                        {poke.stat.name}:{poke.base_stat}
                    </h3>
                ))}
            </div>
            <button className="return-button"><Link to="/">Return to Pokedex</Link></button>
        </>
    );
};

export default PokeDetails;