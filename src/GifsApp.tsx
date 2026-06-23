import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeaders } from './shared/components/CustomHeaders';
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { SearchBar } from "./shared/components/SearchBar";
import { GifList } from "./gifs/components/GifList";
import { useState } from "react";

import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.actions";
import { type Gif } from './gifs/interfaces/gif.interface';


export const GifsApp = () =>{

    /*
        El useState lo utilizamos para cuando queramos almacenar arreglos de un tipo que va a ser modificable o actualizada
        donde el set [2do parametro] nos ayuda a almacenar los datos y el searchGifs [1er parametro] para mandar
        a llamar a los datos almacenados

        Ya que el useState le dice a React que debe "Redibujar" la pantalla, mientras que una variable normal no lo hace
        por lo tanto si queremos volver a redibujar la pantalla le decimos a REACT que habra un cambio de ESTADO (useState)
    */
    const [searchGifs,setGifs] = useState<Gif[]>([])

    const [previousTerm, setPreviousTerm] = useState<string[]>([])

    const handleTermClicked = ( term : string) => {
        console.log(term)
    }

    const handleSearch = async( query: string ) =>{
        {/* Valida si el string no esta vacio */}
        if(query.length === 0) return;

        {/* Elimina los espacios vacios del inicio y fin, además de que convierte todo a minusculas */}
        query = query.trim().toLowerCase();

        {/* Evita busquedas duplicadas*/}
        if(previousTerm.includes(query)) return;

        {/* Actualiza la lista de previousTerms agregando la nueva busqueda 
            
            Lo que hacemos aqui es CREAR un nuevo arreglo, pero donde vamos a agregar en la primera posicion
            el query, concatenando lo que ya existe en la lista pasada de previousTerm, de esta manera siempre
            va a agregarse hasta el inicio lo que se escriba y despues se agrega lo que ya existia
            
            El slice nos ayuda para mostrar la cantidad de elementos en pantalla que ya cuenta nuestro arreglo
            en caso de que pase de esa cantidad de elementos, los va a ir excluyendo de la vista, OJO, aun
            existen los datos en el arreglo, solo es la cantidad de elementos que ira mostrando en ORDEN que
            se vayan encontrando en el arreglo
        */}
        setPreviousTerm([query, ...previousTerm].slice(0,7))
        
        /* Hacemos la peticion para buscar la data en una peticion HTTP 
        
            OJO, si por alguna razon da error el await, es porque siempre debe de estar dentro de una función de tipo async
            ya que vamos a realizar una peticion HTTP o tener contacto con el exterior y para eso debemos de agregar a 
            nuestra funcion el tipo de dato async y listo

        */

        const gifs = await getGifsByQuery(query)

        console.log(gifs)
        
        setGifs(gifs)
    }

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