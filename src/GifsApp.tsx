import { CustomHeaders } from './shared/components/CustomHeaders';
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { SearchBar } from "./shared/components/SearchBar";
import { GifList } from "./gifs/components/GifList";
import { useGifs } from './gifs/hooks/useGifs';


export const GifsApp = () =>{

    /*
        Hay que tener en cuenta que cuando retornamos un tipo de dato mediante un HOOK hay que especificar en la estructura el tipo
        de dato que vamos a retornar, en este caso estamos retornando un objeto por tal motivo utilizamos {} para des-estructurar
        en caso de retornar un arreglo, usaremos [] para des-estructurar y para tipos de datos basicos, usamos isActive

        Los hooks es bueno utilizarlos cuando estamos teniendo codigo muy robusto y mejor usamos un custom hook para ordenar
        cada methodo y darle una estructura unica o un unico proposito a cada hook o clase
    */

    const { handleSearch, handleTermClicked, previousTerm, searchGifs  } = useGifs()

    /* Ponemos parentesis para decir que voy a regresar una estructura mas elaborada */
    return ( 
    //Asignamos un fragmento "<>" para comenzar a realizar la estructura compleja con varios elementos
    <>

        {/* Headers */}

        <CustomHeaders title="Buscador de Gifs" description="Descubre el gif perfecto"/>

        {/* Search containter */}

        <SearchBar placeholder="Buscar gifs" onQuery={ ( term : string ) => handleSearch(term)}/>

        {/* Busquedas previas */}

        <PreviousSearches title="Busquedas previas" searches={ previousTerm } onLabelClicked={handleTermClicked}/>

        {/* Gifs */}

        <GifList gifs={searchGifs}/>

    </> 
    )
}