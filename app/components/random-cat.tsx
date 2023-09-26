import { useState, useEffect } from 'react'

export default function RandomCat() {
    const [imageUrl, setImageUrl] = useState<string>()

    useEffect(() => {
        // fetch('https://cataas.com/cat/cute?json=true')
        //     .then(response => response.json())
        //     .then(data => {
        //         setImageUrl(`https://cataas.com/${data.url}`)
        //     })
        //     .catch(error => console.error('Error:', error))

        fetch('https://placekitten.com/200/300')
            .then(response => response.blob())
            .then(blob => {
                setImageUrl(URL.createObjectURL(blob));
            })
    }, [])

    return <>
        {imageUrl ? <img src={imageUrl} alt='Lovely cat picture :3' className='w-64 h-64 bg-cover bg-center' /> : <div className='h-64 w-64 bg-primary-dark-600' />}
    </>
}