import { useRef, useState } from 'react'

import type { Gif } from '../interfaces/gif.interface'
import { getGifsByQuery } from '../actions/get-gifs-by-query.actions'


/*
    En este caso la variable que se usara como cache para guardar temporalmente la memoria, se saca fuera del HOOK useGifs
    ya que cada vez que mandamos a llamar al custom HOOK, todo lo que tiene dentro se vuelve a renderizar, o sea, todo desde
    el 0 se ejecuta, por tal motivo, la info no se guardaría... en cambia si lo sacamos fuera del HOOK y lo dejamos como
    una variable de la clase puede servir como una cache mokeada

    const gifCache : Record<string,Gif[]> = {}

    Pero en caso de no usar una variable fuera del HOOK podemos usar el hook predeterminado de REACT llamado useref
    que es un HOOK que almacena datos pero evita la renderización de hooks dentro de un componente, almacena datos
    y hasta que se cierre el componente deja de usar esos datos.... es mejor usar useref
*/

export const useGifs = () => {
    /*
            El useState lo utilizamos para cuando queramos almacenar arreglos de un tipo que va a ser modificable o actualizada
            donde el set [2do parametro] nos ayuda a almacenar los datos y el searchGifs [1er parametro] para mandar
            a llamar a los datos almacenados
    
            Ya que el useState le dice a React que debe "Redibujar" la pantalla, mientras que una variable normal no lo hace
            por lo tanto si queremos volver a redibujar la pantalla le decimos a REACT que habra un cambio de ESTADO (useState)
            por lo tanto, todos los elementos que estan dentro de nuestro HOOK se vuelve a ejectutar, a excepión del useState
        */
    const [searchGifs , setGifs] = useState<Gif[]>([])
    
    const [previousTerm, setPreviousTerm] = useState<string[]>([])

    /*
        Pero en caso de no usar una variable fuera del HOOK podemos usar el hook predeterminado de REACT llamado useref
        que es un HOOK que almacena datos pero evita la renderización de hooks dentro de un componente, almacena datos
        y hasta que se cierre el componente deja de usar esos datos.... es mejor usar useref
    */
    const gifHookCache = useRef<Record<string,Gif[]>>({})
    
    const handleTermClicked = async( term : string) => {

            if(gifHookCache.current[term]){
                setGifs(gifHookCache.current[term])
                return
            }
            console.log(term)
            const gifs = await getGifsByQuery(term)
            setGifs(gifs)
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
            setGifs(gifs)

            gifHookCache.current[query] = gifs
            console.log(gifHookCache)
    }

    return {

        //1 Primero las properties / props
        previousTerm,
        searchGifs,

        //2 Segundo los methodos a retornar

        handleTermClicked,
        handleSearch,

    }
}