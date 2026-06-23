import { useEffect, useState, type KeyboardEvent } from "react"

interface searchBarProps {
    placeholder? : string,
    onQuery : ( query : string) => void
}


export const SearchBar = ({ placeholder = 'Buscar', onQuery }: searchBarProps) =>{

    const [query,setQuery] = useState('')

    /*
        El useEffect es un HOOK que nos va ayudar a generar algun efecto, siempre que nosotros arranquemos nuestro componente
        de manera secundaria, cada vez que mandemos llamar a este efecto

        Los efectos deben de hace 1 UNICA tarea, si se requiren mas efectos, entonces hay que crear multiples useEffects para
        cada efecto que se quiera agregar al componente

        El debounce es una tecnica de optimizacion que agrupa multiples llamadas a una funcion en un corto periodo de tiempo
        en una sola, mejorando significativamente el rendimiento y la experiencia de usuario
    */
    useEffect( () =>{

        const timeOut = setTimeout( () =>{
            onQuery(query)
        }, 1000)

        {/* Return de limpieza, cuando el componente se va a desmontar */}
        return () => {
            clearTimeout(timeOut)
        }
        
        {/* Estos parametros de aquí son los que le indican al efecto, sobre que parametros se va a ejecutar */}
    },[query, onQuery])

    const handleSearchBar = () => {
        onQuery(query)
        setQuery('')
    }

    /* En caso de que en algun evento nosotros no sepamos que tipo de evento es el que requerimos usar para ya sea click, key, mouse
       etc, y poderlo ajustar a un metodo nuevo sin la necesidad de meterlo todo dentro de cada elemento, podemos usar en el elemento
       la variable event y dejar el cursos encima de ella un momento, entonces nos dira en la info que tipo de evento es el que se
       espera para su ejecución
    */
   const handelKeyDownEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if( event.key === 'Enter'){
            handleSearchBar();
            setQuery('')
        }
   }

    return (
        <>
        <div className="search-container">
            {/* En estos casos los valores que vayan a ser de entrada hay que manejarse en el INPUT, el boton lo unico que va
                a hacer es mandar a llamar a todos los valores involucrados dentro del input, en este caso manda a llamar la
                funcion handleSearch ya que onQuery va a resibir la información de parte del value={query}
                mientras que el onChange es el evento que acciona el ingresar esos valores al input

                event -> input -> value -> query -> onQuery -> handleSearchBar -> handleSearch (Pero en el componente Padre (Afuera))
             */}
            <input 
                type="text" 
                placeholder={ placeholder }
                value={query}
                onChange={ (event) => (setQuery(event.target.value))}
                onKeyDown={ handelKeyDownEnter }
                />
            {/* 
                El onClick es utilizado para cuando se vaya a dar un click en un boton, en este caso nuestro boton manda a llamar
                a la funcion INTERNA de handleSearchBar, la función manda a llamar al onQuery con el valor que tenga el input en ese
                momento, el cual lo asigna el parametro value
            */}
            <button 
                onClick={ handleSearchBar }
                >Buscar</button>
        </div>
        </>
    )
}