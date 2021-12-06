import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Suggestions from './Suggestions';
import debounce from 'lodash.debounce'

const SearchBar = React.memo( function WrappedComponent() {
    const [pokemon, setPokemon] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState("");


    useEffect(() => {
        const loadPokemon = async () => {
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=1118");
            setPokemon(response.data.results);
        }
        loadPokemon();
    })

    const updateSearchText = (searchText) => {

        setSearchText(searchText);

        let matches = [];
        if (searchText) {            //if is not empty string
            matches = pokemon.filter(pokeData => {
                return pokeData.name.includes(searchText);
            })
                .sort((a, b) => {
                    return a.name.indexOf(searchText) - b.name.indexOf(searchText);
                })
        }

        setSuggestions(matches);
    }

    

    const closeSuggestion = () => {
        setTimeout(() => 
            setSuggestions([]),
            100);
    }

    const selectSuggestion = (text) => {
        setSearchText(text);

        setSuggestions([]);
    }

    return (
        <div className="container" onBlur={closeSuggestion}>
            <input className="input" type="text"
                onChange={event => {
                    updateSearchText(event.target.value)
                }}
                value={searchText} />
            {suggestions && <Suggestions suggestions={suggestions} selectSuggestion={selectSuggestion}/>}
        </div>
    )
});

export default SearchBar