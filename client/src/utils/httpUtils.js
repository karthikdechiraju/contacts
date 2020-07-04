import axios from 'axios';

const headers = {
    'Authorization': `Basic ZGVtbzpwQDU1dzByZA==`,
    'Content-Type': "application/json"
}

export const getContacts = () => {
    return axios.get('/api/contacts',{
        headers
    })
}

export const createContact = (data) => {
    return axios.post('/api/contacts',data,{
        headers
    })
}

export const updateContact = (data) => {
    return axios.put('/api/contacts',data,{
        headers
    })
}

export const deleteContact = (id) =>{
    return axios.delete(`/api/contacts?id=${id}`,{
        headers
    })
}