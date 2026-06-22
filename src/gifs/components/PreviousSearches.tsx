import type { FC } from "react"

interface previousSearchesProps {
    title : string,
    searches : string[],
    onLabelClicked : (term : string) =>  void;
}

/* 
    El FC<[Props]> funciona exactamente igual que des-estructurar la interface o elemento en nuestra arrow function,
    son exactamente lo mismo, pero es otra manera de mandar a destructurar y que quede visiblemente estetico
    pero en si funciona igual 

*/

export const PreviousSearches : FC<previousSearchesProps> = ( {title , searches , onLabelClicked } ) =>{
    return (
        <>
        <div className="previous-searches">
            <h2>
                { title }
            </h2>
            <ul className="previous-searches-list">
                {
                    /* 
                        Siempre que trabajemos con MAP necesitaremos usar KEY={} como parametro en cada elemento donde coloquemos
                        un resultado para indicar que solamente haya un UNICO elemento de ese dato
                    */
                    searches.map( search => (
                        <li key={search}
                            onClick={ () => onLabelClicked(search)}>
                                { search }
                        </li>
                    ))
                }
            </ul>
        </div>
        </>
    )
}