import _ from 'lodash';
import axios from 'axios';
import { FETCH_EVENTOS } from "./types";




export const fetchEventos = async(id, limit) => {

    let ret = await axios.post('http://localhost:1337/auth/local', { identifier: 'adm_manager', password: 'carlos' })

    let config = { headers: { 'Authorization': `Bearer ${ret.data.jwt}` } };

    const request = axios.get(`http://localhost:1337/evento/?_sort=-_id&_limit=${limit}`, config);
    console.log("------ vai chamar o fetchEventos -------")

    return {
        type: FETCH_EVENTOS,
        payload: request
    }
}
