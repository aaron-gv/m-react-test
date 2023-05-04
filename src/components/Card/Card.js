
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Card({title, url, image, imageText, year, description, tooltip=true}) {
    const [loadedImage, setLoadedImage] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const placeholder = "/images/placeholder.png";
    const [posterImage, setPosterImage] = useState(placeholder);
    const cardRef = useRef();
    
    const fetchImage = async (url) => {
        setLoadingImage(true);
        let result = await fetch(url)
        if (result.status === 200)
            setPosterImage(url)
        setLoadingImage(false)
        setLoadedImage(true)
        return result.status
    }

    const onImageError = (e) => {
        e.target.src = placeholder
    }
    
    useEffect(() => {
        if (!loadedImage && !loadingImage)
            fetchImage(image)
    }, [loadedImage, image, loadingImage])
    return (
        <Link to={url} className='float-left'>

            <div ref={cardRef} className="w-24 md:w-40 group">
                {
                    tooltip &&
                    <div className='z-20 absolute w-40 scale-0 group-hover:scale-100 rounded bg-gray-800 p-2 text-xs text-white'>
                        <div className='font-bold'>{title}</div>
                        <div className='font-bold'>{year}</div>
                        <div>{description}</div>
                    </div>
                }
                
                <div className="relative flex items-center aspect-[2/3] h-30 md:h-40 m-auto bg-slate-800">
                    <img alt={title} src={posterImage} onError={e => onImageError} />
                    { imageText !== '' && imageText !== undefined ? <div className='absolute w-full text-center text-white'>{imageText}</div> : (!loadedImage ) ? <div className='absolute w-full text-center text-white'>Loading...</div> : null}
                    
                </div>
                <div className='truncate'>{title}</div>
            </div>
        </Link>
    );
}