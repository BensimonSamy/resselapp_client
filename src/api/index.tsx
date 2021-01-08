import { Sneaker } from "../components/Form/index.d";

const getSneakers = () => fetch('http://localhost:1000/')
const addSneaker = (body: Sneaker) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch('http://localhost:1000/', requestOptions)
}
const deleteSneaker = (id: string) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`http://localhost:1000/${id}`, requestOptions)
}

const updateSneaker = (id: string, body: Sneaker) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(`http://localhost:1000/${id}`, requestOptions)
}


export {
    getSneakers,
    addSneaker,
    deleteSneaker,
    updateSneaker
}