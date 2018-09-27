import _ from 'lodash';
import axios from 'axios';
import { FETCH_FEATURED_GUIAS, FETCH_GUIA } from "./types";



export const fetchGuia = (id) => {

    const request = axios.get(`http://localhost:1337/guia/${id}`);

    return {
        type: FETCH_GUIA,
        payload: request
    }
}

export const fetchFeaturedGuias = async(id) => {

    let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })

    let config = { headers: { 'Authorization': `Bearer ${ret.data.jwt}` } };

    const request = axios.get(`http://localhost:1337/guia/?cidade_destaque=${id}`, config);
    console.log("------ vai chamar o fetchUsers -------")

    return {
        type: FETCH_FEATURED_GUIAS,
        payload: request
    }
}
