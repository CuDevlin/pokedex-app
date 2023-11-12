import React from "react";
import { Link } from 'react-router-dom';

const Card = ({ pokemon, loading }) => {
    return (
      <>
        {!loading ? (
          pokemon.map((item) => (
            <Link to={`/details/${item.id}`} key={item.id}>
              <div className="card">
                <h2>{item.id}</h2>
                <img src={item.sprites.front_default} alt="" />
                <h2>{item.name}</h2>
              </div>
            </Link>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </>
    );
  };
export default Card;