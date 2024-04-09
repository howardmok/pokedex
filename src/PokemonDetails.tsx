import React, { useState } from "react";
import "./App.css";
import {
  Ability,
  Move,
  PokemonInfo,
  Stat,
  Type,
  capitalizeFirstLetter,
  removeHyphenAndCapitalize,
  typeToColorMap,
} from "./shared";
import BackButtonImg from "./icons8-back-48.png";
import { Tab, Tabs } from "@mui/material";

const PokemonDetails = ({
  pokemon,
  onBack,
}: {
  pokemon: PokemonInfo;
  onBack: () => void;
}) => {
  const [currentTab, setCurrentTab] = useState("Abilities");

  return (
    <div className="pokemon-details-main-container">
      <div onClick={onBack}>
        <img src={BackButtonImg} style={{ cursor: "pointer" }} alt="back" />
      </div>
      <div className="pokemon-details-container">
        <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
        <h5>{pokemon.id}</h5>
        <div
          className="pokemon-img-container"
          style={{
            backgroundColor:
              typeToColorMap[
                pokemon.types[0].type.name as keyof typeof typeToColorMap
              ],
          }}
        >
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={`${pokemon.name}_img`}
            style={{ width: 100, height: 100 }}
          />
        </div>
        <Tabs
          value={currentTab}
          onChange={(e, newVal) => setCurrentTab(newVal)}
          aria-label="Pokemon info tabs"
        >
          <Tab label="Abilities" value="Abilities" />
          <Tab label="Moves" value="Moves" />
          <Tab label="Stats" value="Stats" />
          <Tab label="Other" value="Other" />
        </Tabs>
        {currentTab === "Abilities" && (
          <div>
            <h2>Abilities</h2>
            {pokemon.abilities.map((abilityObj: Ability) => (
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {capitalizeFirstLetter(abilityObj.ability.name)}{" "}
                {abilityObj.is_hidden && (
                  <div
                    style={{
                      marginLeft: 8,
                      border: "1px solid black",
                      borderRadius: 12,
                      padding: 4,
                      background: "black",
                      color: "white",
                    }}
                  >
                    Hidden
                  </div>
                )}
              </p>
            ))}
          </div>
        )}
        {currentTab === "Moves" && (
          <div>
            <h2>Moves</h2>
            {pokemon.moves.map((move: Move) => (
              <p>{removeHyphenAndCapitalize(move.move.name)}</p>
            ))}
          </div>
        )}
        {currentTab === "Stats" && (
          <div>
            <h2>Stats</h2>
            {pokemon.stats.map((statObj: Stat) => (
              <p>
                {removeHyphenAndCapitalize(statObj.stat.name)}:{" "}
                {statObj.base_stat} (Effort: {statObj.effort})
              </p>
            ))}
          </div>
        )}
        {currentTab === "Other" && (
          <div>
            <h2>Other information</h2>
            <p>Base Experience: {pokemon.base_experience}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>
              Types:{" "}
              {pokemon.types.map((typeObj: Type) => (
                <span
                  className="type-tag"
                  style={{
                    background:
                      typeToColorMap[
                        typeObj.type.name as keyof typeof typeToColorMap
                      ],
                  }}
                >
                  {capitalizeFirstLetter(typeObj.type.name)}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetails;
