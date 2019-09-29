import _ from 'lodash';
import axios from 'axios';
import { 
    CREATE_COMENTARIO_GUIA, 
    FETCH_COMENTARIO,
    FETCH_ALL_COMENTARIOS,
    FETCH_COMENTARIO_GUIAS_USER,
    DELETE_COMENTARIO_GUIA,
    APPROVE_COMENTARIO_GUIA,
    ERROR_COMENTARIO_GUIA,
    ERROR_EDIT_COMENTARIO,
    SUCCESS_EDIT_COMENTARIO,

    CREATE_COMENTARIO_EVENTO, 
    FETCH_COMENTARIO_EVENTOS_USER,
    DELETE_COMENTARIO_EVENTO,
    APPROVE_COMENTARIO_EVENTO,
    ERROR_COMENTARIO_EVENTO,

    CREATE_COMENTARIO_NOTICIA,
    FETCH_COMENTARIO_NOTICIAS_USER,
    DELETE_COMENTARIO_NOTICIA,
    APPROVE_COMENTARIO_NOTICIA,
    ERROR_COMENTARIO_NOTICIA,
    } from '../actions/types';
const autoApprove = false;

export const fetchComentarioByType = (id, type) => {
    let request = {};
    console.log("olha o type aqui: ", type);
    switch(type){
        case 'guia' :
            request = axios.get(`${process.env.REACT_APP_URL_API}comentarioguias/${id}`);
            break;
        case 'evento' :
            request = axios.get(`${process.env.REACT_APP_URL_API}comentarioeventos/${id}`);
            break;
        case 'noticia' :
            request = axios.get(`${process.env.REACT_APP_URL_API}comentarios/${id}`);
            break;
    }
        
    return {
        type: FETCH_COMENTARIO,
        payload: request
    }
}


export const editComentario = async (comentario, id, type) => {

    let u = JSON.parse(localStorage.getItem('user'));
    let request;
    if(u){
        try
        {
            
            let jwt = u.jwt    
            let config = { headers: { 'Authorization': `Bearer ${jwt}` } };
          
            request = await axios.put(`${process.env.REACT_APP_URL_API}comentarios/${id}`, comentario, config);

            if(request.statusText == 'OK'){
            
                return({
                    type: SUCCESS_EDIT_COMENTARIO,
                    payload: request
                })
            }
            else{
                return({
                    type: ERROR_EDIT_COMENTARIO,
                    payload: {msg: "Houve um erro ao editar o seu user!" }
                })
            }
        }
        catch(error){
            console.log("ERROR DO EDIT COMENTARIO: ", error)
            return({
                type: ERROR_EDIT_COMENTARIO,
                payload: {msg: "Houve um erro ao editar o seu user!" }
            })
        } 
    
    }
    else{
        return(
            {
                type: ERROR_EDIT_COMENTARIO,
                payload: {msg: "Usuário não logado"}
            }
        )
    }   
}

export const createComentarioGuia = async(values) => {
    
    let request_review = null;
    if(values.review){
        
        let review = {...values.review,
            total: parseFloat(values.review.total) + parseFloat(values.classificacao),
            media: (parseFloat(values.review.total) + parseFloat(values.classificacao))/(parseInt(values.review.quantidade_votos)+1),
            quantidade_votos: parseInt(values.review.quantidade_votos)+1
        }

        review = doReview(values, review);
        console.log("review: ", review);
        
        request_review = await axios.put(`${process.env.REACT_APP_URL_API}reviewguias/${values.review._id}`, review);
    }
    else {

        let review = {
            total: values.classificacao,
            media: values.classificacao,
            quantidade_votos: 1,
        }

        review = doReview(values, review);

        request_review = await axios.post(`${process.env.REACT_APP_URL_API}reviewguias/`, review);
        axios.put(`${process.env.REACT_APP_URL_API}guias/${values.guia}`, {reviewguia: request_review.data._id})
    }

    const request = await axios.post(`${process.env.REACT_APP_URL_API}comentarioguias/`, values);

    if(request.statusText == 'OK'){

        enviaEmail();
        
    
        return{
            type: CREATE_COMENTARIO_GUIA,
            payload: {comentarios: request.data, reviews: request_review.data}
        }
    }
    else{
        return {
            type: CREATE_COMENTARIO_GUIA,
            payload: false,
        }

    }

};

export const approveReproveComentarioGuia = async (id, approve) => {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if(user){
        let config = { headers: { 'Authorization': `Bearer ${user.jwt}` } };
        const request = await axios.put(`${process.env.REACT_APP_URL_API}comentarioguias/${id}`, {aprovado: approve}, config);
        if(request.statusText == 'OK'){
            return {
                type: APPROVE_COMENTARIO_GUIA,
                payload: {id, approved: approve}
            }
        }

        return {
            type: APPROVE_COMENTARIO_GUIA,
            payload: false
        }
    }
    else{
        return({
            type: ERROR_COMENTARIO_GUIA,
            payload: {msg: "Usuário não logado"}
        })
    }
}

export const deleteComentarioGuia = async (id) => {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if(user){
        let config = { headers: { 'Authorization': `Bearer ${user.jwt}` } };
        const request = await axios.delete(`${process.env.REACT_APP_URL_API}comentarioguias/${id}`, config);
        if(request.statusText == 'OK'){
            return {
                type: DELETE_COMENTARIO_GUIA,
                payload: id
            }
        }

        return {
            type: DELETE_COMENTARIO_GUIA,
            payload: false
        }
    }
    else{
        return({
            type: ERROR_COMENTARIO_GUIA,
            payload: {msg: "Usuário não logado"}
        })
    }
}

export const fetchComentarioGuiasByAdm = async(limit=100, sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`


    const request = await axios.get(`${process.env.REACT_APP_URL_API}comentarioguias/?_sort=${sort}${limit}`);
    //const count = await axios.get(`${process.env.REACT_APP_URL_API}guias/count`);
    //const newRequest = {data:request.data, count: count.data};
    console.log("aqui no fetch guias by user", request );

    return {
        type: FETCH_COMENTARIO_GUIAS_USER,
        payload: request.data
    }

}

export const fetchAllComentariosByUser = async(user_id, limit=100, sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`


    const request = await axios.get(`${process.env.REACT_APP_URL_API}comentarioguias/?user=${user_id}&_sort=${sort}${limit}`);
    const request1 = await axios.get(`${process.env.REACT_APP_URL_API}comentarioeventos/?user=${user_id}&_sort=${sort}${limit}`);
    const request2 = await axios.get(`${process.env.REACT_APP_URL_API}comentarios/?user=${user_id}&_sort=${sort}${limit}`);

    //console.log("aqui no fetch guias by user", ...request.data, ' --- ', request1.data, " :::: ",  [...request.data, ...request1.data]);

    return {
        type: FETCH_ALL_COMENTARIOS,
        payload: _.orderBy([...request1.data, ...request.data, ...request2.data], 'createdAt', 'desc')
    }

}

export const fetchComentarioGuiasByUser = async(user_id, limit=100, sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`


    const request = axios.get(`${process.env.REACT_APP_URL_API}comentarioguias/?user=${user_id}&_sort=${sort}${limit}`);

    console.log("aqui no fetch guias by user")
    return {
        type: FETCH_COMENTARIO_GUIAS_USER,
        payload: request
    }

}


export const createComentarioEvento = async(values) => {
    let request_review = null;
    if(values.review){
        
        let review = {...values.review,
            total: parseFloat(values.review.total) + parseFloat(values.classificacao),
            media: (parseFloat(values.review.total) + parseFloat(values.classificacao))/(parseInt(values.review.quantidade_votos)+1),
            quantidade_votos: parseInt(values.review.quantidade_votos)+1
        }

        review = doReview(values, review);
        console.log("review: ", review);
        
        request_review = await axios.put(`${process.env.REACT_APP_URL_API}revieweventos/${values.review._id}`, review);
    }
    else {

        let review = {
            total: values.classificacao,
            media: values.classificacao,
            quantidade_votos: 1,
        }

        review = doReview(values, review);

        request_review = await axios.post(`${process.env.REACT_APP_URL_API}revieweventos/`, review);
        axios.put(`${process.env.REACT_APP_URL_API}eventos/${values.evento}`, {reviewevento: request_review.data._id})
    }

    const request = await axios.post(`${process.env.REACT_APP_URL_API}comentarioeventos/`, values);

    if(request.statusText == 'OK'){

        enviaEmail('evento');
        
    
        return{
            type: CREATE_COMENTARIO_EVENTO,
            payload: {comentarios: request.data, reviews: request_review.data}
        }
    }
    else{
        return {
            type: CREATE_COMENTARIO_EVENTO,
            payload: false,
        }

    }
};

export const approveReproveComentarioEvento = async (id, approve) => {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if(user){
        let config = { headers: { 'Authorization': `Bearer ${user.jwt}` } };
        const request = await axios.put(`${process.env.REACT_APP_URL_API}comentarioeventos/${id}`, {aprovado: approve}, config);
        if(request.statusText == 'OK'){
            return {
                type: APPROVE_COMENTARIO_EVENTO,
                payload: {id, approved: approve}
            }
        }

        return {
            type: APPROVE_COMENTARIO_EVENTO,
            payload: false
        }
    }
    else{
        return({
            type: ERROR_COMENTARIO_EVENTO,
            payload: {msg: "Usuário não logado"}
        })
    }
}

export const deleteComentarioEvento = async (id) => {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if(user){
        let config = { headers: { 'Authorization': `Bearer ${user.jwt}` } };
        const request = await axios.delete(`${process.env.REACT_APP_URL_API}comentarioeventos/${id}`, config);
        if(request.statusText == 'OK'){
            return {
                type: DELETE_COMENTARIO_EVENTO,
                payload: id
            }
        }

        return {
            type: DELETE_COMENTARIO_EVENTO,
            payload: false
        }
    }
    else{
        return({
            type: ERROR_COMENTARIO_EVENTO,
            payload: {msg: "Usuário não logado"}
        })
    }
}

export const fetchComentarioEventosByAdm = async(limit=100, sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`


    const request = await axios.get(`${process.env.REACT_APP_URL_API}comentarioeventos/?_sort=${sort}${limit}`);
    //const count = await axios.get(`${process.env.REACT_APP_URL_API}eventos/count`);
    //const newRequest = {data:request.data, count: count.data};
    console.log("aqui no fetch eventos by user", request );

    return {
        type: FETCH_COMENTARIO_EVENTOS_USER,
        payload: request.data
    }

}

export const fetchComentarioEventosByUser = async(user_id, limit=100, sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`


    const request = axios.get(`${process.env.REACT_APP_URL_API}comentarioeventos/?user=${user_id}&_sort=${sort}${limit}`);

    console.log("aqui no fetch eventos by user")
    return {
        type: FETCH_COMENTARIO_EVENTOS_USER,
        payload: request
    }

}

export const createComentarioNoticia = async(values) => {
    let request_review = null;
    if(values.review){
        
        let review = {...values.review,
            total: parseFloat(values.review.total) + parseFloat(values.classificacao),
            media: (parseFloat(values.review.total) + parseFloat(values.classificacao))/(parseInt(values.review.quantidade_votos)+1),
            quantidade_votos: parseInt(values.review.quantidade_votos)+1
        }

        review = doReview(values, review);
        console.log("review: ", review);
        
        request_review = await axios.put(`${process.env.REACT_APP_URL_API}reviewnoticias/${values.review._id}`, review);
    }
    else {

        let review = {
            total: values.classificacao,
            media: values.classificacao,
            quantidade_votos: 1,
        }

        review = doReview(values, review);

        request_review = await axios.post(`${process.env.REACT_APP_URL_API}reviews/`, review);
        axios.put(`${process.env.REACT_APP_URL_API}noticias/${values.noticia}`, {reviewnoticia: request_review.data._id})
    }

    const request = await axios.post(`${process.env.REACT_APP_URL_API}comentarios/`, values);

    if(request.statusText == 'OK'){

        enviaEmail('noticia');
        
    
        return{
            type: CREATE_COMENTARIO_NOTICIA,
            payload: {comentarios: request.data, reviews: request_review.data}
        }
    }
    else{
        return {
            type: CREATE_COMENTARIO_NOTICIA,
            payload: false,
        }

    }
};


export const approveReproveComentarioNoticia = async (id, approve) => {
    let user = JSON.parse(localStorage.getItem('user'));
    
    console.log("comentario id: ", id)
    if(user){
        let config = { headers: { 'Authorization': `Bearer ${user.jwt}` } };
        const request = await axios.put(`${process.env.REACT_APP_URL_API}comentarios/${id}`, {aprovado: approve}, config);
        if(request.statusText == 'OK'){
            return {
                type: APPROVE_COMENTARIO_NOTICIA,
                payload: {id, approved: approve}
            }
        }

        return {
            type: APPROVE_COMENTARIO_NOTICIA,
            payload: false
        }
    }
    else{
        return({
            type: ERROR_COMENTARIO_NOTICIA,
            payload: {msg: "Usuário não logado"}
        })
    }
}

export const deleteComentarioNoticia = async (id) => {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if(user){
        let config = { headers: { 'Authorization': `Bearer ${user.jwt}` } };
        const request = await axios.delete(`${process.env.REACT_APP_URL_API}comentarios/${id}`, config);
        if(request.statusText == 'OK'){
            return {
                type: DELETE_COMENTARIO_NOTICIA,
                payload: id
            }
        }

        return {
            type: DELETE_COMENTARIO_NOTICIA,
            payload: false
        }
    }
    else{
        return({
            type: ERROR_COMENTARIO_NOTICIA,
            payload: {msg: "Usuário não logado"}
        })
    }
}

export const fetchComentarioNoticiasByAdm = async(limit=100, sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`


    const request = await axios.get(`${process.env.REACT_APP_URL_API}comentarios/?_sort=${sort}${limit}`);
    //const count = await axios.get(`${process.env.REACT_APP_URL_API}noticias/count`);
    //const newRequest = {data:request.data, count: count.data};
    console.log("aqui no fetch noticias by user", request );

    return {
        type: FETCH_COMENTARIO_NOTICIAS_USER,
        payload: request.data
    }

}

export const fetchComentarioNoticiasByUser = async(user_id, limit=100, sort=null) => {
    if(!sort)
        sort = '_id:desc';
    if(limit)
        limit = `&_limit=${limit}`


    const request = axios.get(`${process.env.REACT_APP_URL_API}comentarios/?user=${user_id}&_sort=${sort}${limit}`);

    console.log("aqui no fetch noticias by user")
    return {
        type: FETCH_COMENTARIO_NOTICIAS_USER,
        payload: request
    }

}

const enviaEmail = async(type="guia") => {
    let values = {
        identifier: process.env.REACT_APP_SEND_EMAIL_USER, 
        password: process.env.REACT_APP_SEND_EMAIL_PASSWORD
    };

    try{
        console.log("values: ", values);
        let request = await axios.post(`${process.env.REACT_APP_URL_API}auth/local/`, values)    

        const htmlToSend = `Faça <a href="${process.env.REACT_APP_URL_FRONTEND}login">login</a>
        e veja o novo comentario do ${type} que foi cadastrado. Veja os dados abaixo: <br><br> ${JSON.stringify(values)}`;

        const email = {
            to: 'carluizfla@hotmail.com',
            subject: `Novo comentario do(a) ${type} cadastrado`,
            html: htmlToSend,
        }

        console.log("request do logando email: ", request);
        let config = { headers: { 'Authorization': `Bearer ${request.data.jwt}` } };
        axios.post(`${process.env.REACT_APP_URL_API}email/`, email, config)
    }
    catch( error ){
       
        console.log("\n\n\nError ao logar ao buscar o user", error);
    }

   

}


const doReview = (values, review) => {

    console.log("values.review no doreview: ", values.review)
    if(values.review) {
        if(parseFloat(values.classificacao) >= 5) {
            console.log("entrou no five star")
            review = { 
                ...review, 
                total_five_star: values.review.total_five_star ? parseInt(values.review.total_five_star)+1 : 1,
                media_five_star:(values.review.total_five_star)? (parseFloat(values.review.media_five_star) + parseFloat(values.classificacao))/2 : parseFloat(values.classificacao) ,
            }
        }
        else if(parseFloat(values.classificacao) >= 4) {
            console.log("entrou no four star")
            review = { 
                ...review, 
                total_four_star: values.review.total_four_star ? parseInt(values.review.total_four_star)+1 : 1,
                media_four_star: (values.review.total_four_star)? (parseFloat(values.review.media_four_star) + parseFloat(values.classificacao))/2 : parseFloat(values.classificacao),
            }
        } 
        else if(parseFloat(values.classificacao) >= 3) {
            console.log("entrou no three star")
            review = { 
                ...review, 
                total_three_star: values.review.total_three_star ? parseInt(values.review.total_three_star)+1 : 1,
                media_three_star: (values.review.total_three_star)? (parseFloat(values.review.media_four_star) + parseFloat(values.classificacao))/2 : parseFloat(values.classificacao),
            }
        } 
        else if(parseFloat(values.classificacao) >= 2) {
            review = { 
                ...review, 
                total_two_star:values.review.total_two_star ? parseInt(values.review.total_two_star)+1 : 1,
                media_two_star: (values.review.total_two_star)? (parseFloat(values.review.media_four_star) + parseFloat(values.classificacao))/2 : parseFloat(values.classificacao),

            }
        } 
        else if(parseFloat(values.classificacao) >= 1) {
            review = { 
                ...review, 
                total_one_star: values.review.total_one_star ? parseInt(values.review.total_one_star)+1 : 1,
                media_three_star: (values.review.total_one_star)? (parseFloat(values.review.media_one_star) + parseFloat(values.classificacao))/2 : parseFloat(values.classificacao),
            }
        } 
        else if(parseFloat(values.classificacao) > 0) {
            review = { 
                ...review, 
                total_zero_star: values.review.total_zero_star ? parseInt(values.review.total_zero_star)+1 : 1,
                media_zero_star:(parseFloat(values.review.media_zero_star) + parseFloat(values.classificacao))/2,
            }
        }
    }
    else {
        if(parseFloat(values.classificacao) >= 5) {
            console.log("entrou no five star 111")
            review = { 
                ...review, 
                total_five_star: 1,
                media_five_star: parseFloat(values.classificacao),
            }
        }
        else if(parseFloat(values.classificacao) >= 4) {
            console.log("entrou no four star 111")
            review = { 
                ...review, 
                total_four_star: 1,
                media_four_star: parseFloat(values.classificacao),
            }
        } 
        else if(parseFloat(values.classificacao) >= 3) {
            console.log("entrou no three star 111")
            review = { 
                ...review, 
                total_three_star: 1,
                media_three_star: parseFloat(values.classificacao),
            }
        } 
        else if(parseFloat(values.classificacao) >= 2) {
            review = { 
                ...review, 
                total_two_star: 1,
                media_two_star: parseFloat(values.classificacao),
            }
        } 
        else if(parseFloat(values.classificacao) >= 1) {
            review = { 
                ...review, 
                total_one_star: 1,
                media_one_star: parseFloat(values.classificacao),
            }
        } 
        else if(parseFloat(values.classificacao) > 0) {
            review = { 
                ...review, 
                total_zero_star: 1,
                media_zero_star: parseFloat(values.classificacao),
            }
        }
    }

    console.log("review do DoReview: ", review);

    return review;
}