import axios from 'axios';
import { CREATE_COMENTARIO_GUIA, CREATE_COMENTARIO_EVENTO, CREATE_COMENTARIO_NOTICIA} from '../actions/types';
const autoApprove = false;

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

const enviaEmail = async() => {
    let values = {
        identifier: process.env.REACT_APP_SEND_EMAIL_USER, 
        password: process.env.REACT_APP_SEND_EMAIL_PASSWORD
    };

    try{
        console.log("values: ", values);
        let request = await axios.post(`${process.env.REACT_APP_URL_API}auth/local/`, values)    

        const htmlToSend = `Faça <a href="${process.env.REACT_APP_URL_FRONTEND}login">login</a>
        e veja o novo comentario do guia que foi cadastrado. Veja os dados abaixo: <br><br> ${JSON.stringify(values)}`;

        const email = {
            to: 'carluizfla@hotmail.com',
            subject: `Novo comentario de guia cadastrado`,
            html: htmlToSend,
        }

        console.log("request do logando email: ", request);
        let config = { headers: { 'Authorization': `Bearer ${request.data.jwt}` } };
        //axios.post(`${process.env.REACT_APP_URL_API}email/`, email, config)
    }
    catch( error ){
       
        console.log("\n\n\nError ao logar ao buscar o user", error);
    }

   

}

export const createComentarioEvento = (values) => {
    return{
        type: CREATE_COMENTARIO_EVENTO,
        payload: {}
    }
};

export const createComentarioNoticia = (values) => {
    return{
        type: CREATE_COMENTARIO_NOTICIA,
        payload: {}
    }
};