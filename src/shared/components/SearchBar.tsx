interface searchBarProps {
    placeholder? : string
}


export const SearchBar = ({ placeholder = 'Buscar' }: searchBarProps) =>{
    return (
        <>
        <div className="search-container">
            <input type="text" placeholder={ placeholder } />
            <button>Buscar</button>
        </div>
        </>
    )
}