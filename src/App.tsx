import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import PokemonListing from "./PokemonListing";
import PokemonDetails from "./PokemonDetails";
import { PokemonInfo } from "./shared";

interface Pokemon {
  name: string;
  url: string;
}

const INCREMENT_AMT = 10;

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [numDisplayed, setNumDisplayed] = useState(100);
  const [searchQuery, setSearchQuery] = useState("" as string);
  const [selectedPokemon, setSelectedPokemon] = useState({} as PokemonInfo);

  const fetchPokemon = useCallback(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then((response) => response.json())
      .then((data) => setPokemon(data.results));
  }, []);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight === scrollHeight) {
        setNumDisplayed(numDisplayed + INCREMENT_AMT);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [numDisplayed]);

  return !selectedPokemon.name ? (
    <div style={{ textAlign: "center" }}>
      <h2>Pokedex</h2>
      <p>Search for a Pokemon by name</p>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Name"
        style={{ marginBottom: 24 }}
      />
      <div className="main-container">
        {pokemon
          .filter(
            (mon: Pokemon) =>
              mon.name.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1
          )
          .slice(0, numDisplayed)
          .map((mon: Pokemon) => (
            <PokemonListing
              url={mon.url}
              onClick={(clickedPokemon: PokemonInfo) =>
                setSelectedPokemon(clickedPokemon)
              }
            />
          ))}
      </div>
    </div>
  ) : (
    <PokemonDetails
      pokemon={selectedPokemon}
      onBack={() => setSelectedPokemon({} as PokemonInfo)}
    />
  );
}

export default App;
