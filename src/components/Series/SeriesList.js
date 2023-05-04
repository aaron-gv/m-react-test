import Card from "../Card/Card";
export default function SeriesList({series}) {
    const image = (object) => {
        if (object.images === undefined || object.images['Poster Art'] === undefined )
            return '/images/placeholder.png'
        else
            return object.images['Poster Art'].url
    }
    return (
        <div className="m-auto w-3/4 space-x-4">  
            <span></span>
            {
                series.map(x =>
                    <Card 
                        key={x.title}
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