import Card from "../Card/Card";
export default function SeriesList({movies}) {
    const placeholder = "/images/placeholder.png"
    const image = (object) => {
        if (object.images === undefined || object.images['Poster Art'] === undefined )
            return placeholder
        else
            return object.images['Poster Art'].url
    }
    return (
        <div className="m-auto w-3/4 space-x-4">  
            <span></span>
            {
                movies.map(x =>
                    <Card 
                        title={x.title}
                        image={image(x)}
                        url=""
                        year={x.releaseYear}
                        description={x.description}
                    />)
            }
        </div>
    );
}