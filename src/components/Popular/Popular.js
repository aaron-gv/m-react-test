import Card from '../Card/Card'

export default function Popular() {

    return (
        <div>
            <div>Popular titles</div>
            <div>
                <Card title="SERIES" url="/series" />
                <Card title="PELICULAS" url="/peliculas" />
            </div>

        </div>
    );

}