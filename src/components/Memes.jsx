import React from "react";

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1bij.jpg",
        name: "One Does Not Simply",
        isLoading: false,
    })

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            if (data.success)
                setAllMemes(data.data.memes)
            else
                alert('Failed to fetch from API')
        }
        getMemes()
    }, []);

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url,
            name: allMemes[randomNumber].name,
            isLoading: true,
        }))
    }

    function onLoadHandler() {
        setMeme(prevMeme => ({
            ...prevMeme,
            isLoading: false
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main className="container my-3" style={{ maxWidth: '600px' }}>
            <h1 className="text-center my-4">
                Generator your memes
            </h1>

            <div className="row g-3 mb-3">
                <div className="col-6">
                    <input 
                        type="text"
                        placeholder="Top text"
                        className="form-control form-control-lg"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-6">
                    <input 
                        type="text"
                        placeholder="Bottom text"
                        className="form-control form-control-lg"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <button 
                        className="btn btn-lg btn-dark w-100"
                        onClick={getMemeImage}
                        disabled={meme.isLoading}
                    >
                        {
                            meme.isLoading &&
                            (<div class="spinner-border spinner-border-sm me-3" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>)
                          
                        }
                        Get a new meme image 🖼
                    </button>
                </div>
            </div>

            <div className="position-relative d-flex">
                <img onLoad={onLoadHandler} src={meme.randomImage} className="mx-auto img-fluid rounded shadow" />
                <h2 className="meme-text top-0">{meme.topText}</h2>
                <h2 className="meme-text bottom-0">{meme.bottomText}</h2>
            </div>

            <div className="text-center my-3">
                <p>{meme.name}</p>
            </div>
        </main>
    )
}