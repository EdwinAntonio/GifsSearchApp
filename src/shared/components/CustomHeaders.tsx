interface customHeadersProps {
    title : string,
    description? :  string,
}

export const CustomHeaders = ( { title, description } : customHeadersProps) =>{
    return (
        <>
        <div className="content-center">
            <h1>{title}</h1>
            <p>{ description }</p>
        </div>
        </>
    )
}