import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import {
  PokemonInfo,
  removeHyphenAndCapitalize,
  typeToColorMap,
} from "./shared";

const PokemonListing = ({
  url,
  onClick,
}: {
  url: string;
  onClick: Function;
}) => {
  const [pokemonInfo, setPokemonInfo] = useState({} as PokemonInfo);

  const fetchIndividualPokemon = useCallback(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setPokemonInfo(data));
  }, [url]);

  useEffect(() => {
    fetchIndividualPokemon();
  }, [fetchIndividualPokemon]);

  return (
    pokemonInfo.sprites && (
      <div
        className="pokemon-listing-container"
        style={{
          backgroundColor:
            typeToColorMap[
              pokemonInfo.types[0].type.name as keyof typeof typeToColorMap
            ],
        }}
        onClick={() => onClick(pokemonInfo)}
      >
        <img
          src={pokemonInfo.sprites.other["official-artwork"].front_default}
          alt={`${pokemonInfo.name}_img`}
          style={{ width: 100, height: 100 }}
        />
        <h4>{removeHyphenAndCapitalize(pokemonInfo.name)}</h4>
        <p style={{ marginBottom: 0 }}>{pokemonInfo.id}</p>
      </div>
    )
  );
};

export default PokemonListing;
