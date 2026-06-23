/*
    Ponemos que va a ser un metodo ASYNC porque estoy diciendo que voy a hacer una peticion al exterior de mi
    aplicacion y el await para describir que antes de continuar con la app, espere respuesta de la peticion
    que hará mi peticion HTTP al exterior

    Siempre se debe hacer la peticion de la siguiente manera

        await axios.get<[Nombre_dela_Data_Interface]>( '[Link_Base]' , { params: {[Parametros_de_la_URL]} })

    cuando vayamos a usar variables dentro de un fetch, las comillas a usar son estas `` en vez de estas '' | ""

    Pero en este caso usamos axios, libreria que debera instalarse mediante el comando:
        npm install axios
*/

import type { GiphyResponse } from "../interfaces/giphy.response"
import type { Gif } from "../interfaces/gif.interface"
import { giphyApi } from "../api/giphy.api"

export const getGifsByQuery = async( query: string) : Promise<Gif[]> => {

    /*
        La recomendacion es que todos los parametros dentro de una peticion HTTP deben de estar
        parametrizados mediante un archivo .env (environments) para evitar que datos sensibles
        queden expuestos en un gestor de versiones a otras personas y asegurarnos que en el archivo
        de gitignore tengamos el nombre de nuestro archivo .env como un archivo a ignorar y no subir
        a nuestro repositorio

        Es muy recomendable que creemos un nuevo archivo de nuestras variables de entorno con el nombre
        .env.template y que haga un uso de las variables .env , este nuevo archivo SI ira al repositorio
        pero el .env que contiene los datos sensibles NO, de esta manera hacemos que nuestro proyecto sea
        mas seguro y tenga logica al momento de subir cambios a un controlador de versiones
    
        const response = await axios.get<GiphyResponse>('https://api.giphy.com/v1/gifs/search', {
        params: {
            q : query,
            limit : 10,
            lang : 'es',
            api_key : import.meta.env.VITE_GIPHY_API_KEY
        }
        })

        La parte de abajo de aqui es una forma mas estetica y mejor al momento de hacer una peticion, crear todo
        en un nuevo archivo al cual enviaremos todos los datos vases, en este caso a gifs.actions.api.[giphy.api.tsx]
        y en caso de requerir mas veces ese tipo de peticiones BASE, nosotros nada más lo mandamos a llamar con la
        simplicidad de usarlo en diferentes circunstancias para distitntos propositos, no solo /search
    
    */
    
    const response = await giphyApi<GiphyResponse>('/search', {
        params: {
            q : query,
            limit : 10,
        }
    })

    /*
        La estructura de return se obliga en este caso porque tenemos un Promise<[Objeto]> por tal motivo hay que retornar
        un objeto con las caracteristicas de esa interface

        En este caso nuestra respuesta vamos a su data -> data (gif) -> mapeamos datos -> En la funcion de flecha ponemos
        toda la estructura que nos obliga a poner la interface del objeto que vamos a retornar
    */

    return response.data.data.map( (gif) => ({
        id : gif.id,
        title : gif.title,
        url : gif.images.original.url,
        width : Number(gif.images.original.width),
        height : Number (gif.images.original.height)
    }))

    //fetch(`https://api.giphy.com/v1/gifs/search?api_key=PtZdKNdWZ7wYnoacCxJ9l72DK0ErBZNz&q=${ query }&limit=25&lang=en`)
}