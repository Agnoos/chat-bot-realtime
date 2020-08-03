import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './Join.css'

const Join = () => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Entre</h1>
                <div><input placeholder="Seu nome" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} ></input></div>
                <div><input placeholder="Sala desejada" className="joinInput" type="text" onChange={(event) => setRoom(event.target.value)} ></input></div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() :null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Trocar uma Idéia</button>
                </Link>
                <p className="lucas-direitos ">© All right Reversed. <a className=" lucas " href="https://twitter.com/Agnoos_" target="_blank">Lucas Ricardo</a></p>

            </div>
        </div>
    )
}

export default Join