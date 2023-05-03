
import placeholder from 'assets/placeholder.png'

export default function Card(props) {
    return (
        <div>
            <image src={placeholder} />
            props.title
        </div>
    );
}