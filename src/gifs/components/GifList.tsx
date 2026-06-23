import type { Gif } from "../interfaces/gif.interface"

interface gifListProps {
    gifs : Gif[]
}

export const GifList = ( { gifs } : gifListProps) =>{
    return (
        <>
        <div className="gifs-container">
            {
                gifs.map( gif => (
                <div key={ gif.id } className="gif-card">
                    <img src={ gif.url } alt={ gif.title } />
                    <h3> { gif.title }</h3>
                    <p>
                        { gif.width }x{ gif.height } (1.5mb) 
                    </p>
                </div>
                ))
            }
        </div>
        </>
    )
}