import axios from "axios";

const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    try {
        const response = await axios.get(baseUrl)
        return response.data
    } catch (exception) {
        console.log(exception)
    }    
}

const create = async (blogObject) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, blogObject, config)
    return response.data
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const update = async (id, blogObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, blogObject)
    return response.data
}

const blogService = { setToken, getAll, create, remove, update }

export default blogService