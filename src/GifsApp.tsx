import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeaders } from './shared/components/CustomHeaders';
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { SearchBar } from "./shared/components/SearchBar";
import { GifList } from "./gifs/components/GifList";
import { useState } from "react";


export const GifsApp = () =>{

    const [previousTerm, setPreviousTerm] = useState(['goku'])

    const handleTermClicked = ( term : string) => {
        console.log(term)
    }

    /* Ponemos parentesis para decir que voy a regresar una estructura mas elaborada */
    return ( 
    //Asignamos un fragmento "<>" para comenzar a realizar la estructura compleja con varios elementos
    <>

        {/* Headers */}

        <CustomHeaders title="Buscador de Gifs" description="Descubre el gif perfecto"/>

        {/* Search containter */}

        <SearchBar placeholder="Buscar gifs"/>

        {/* Busquedas previas */}

        <PreviousSearches title="Busquedas previas" searches={ previousTerm } onLabelClicked={handleTermClicked}/>

        {/* Gifs */}

        <GifList gifs={ mockGifs }/>

    </> 
    )
}