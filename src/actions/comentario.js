import axios from 'axios';
import { CREATE_COMENTARIO_GUIA, CREATE_COMENTARIO_EVENTO, CREATE_COMENTARIO_NOTICIA} from '../actions/types';

export const createComentarioGuia = async(values) => {
    console.log("values no create: ", values);
    if(values.review){
        console.log( "vendo a divisão: ",
            (parseFloat(values.review.media) + parseFloat(values.classificacao))/(parseInt(values.review.quantidade_votos)+1),
            " --- ",
            values.review.media,
            " --- ",
            values.classificacao,
            " --- ",
            (values.review.media + values.classificacao),
            " --- ",
            values.review.quantidade_votos
        )
        let review = {...values.review,
            total: parseFloat(values.review.total) + parseFloat(values.classificacao),
            media: (parseFloat(values.review.total) + parseFloat(values.classificacao))/(parseInt(values.review.quantidade_votos)+1),
            quantidade_votos: parseInt(values.review.quantidade_votos)+1
        }

        console.log("review: ", review);
        
        let request_review = await axios.put(`${process.env.REACT_APP_URL_API}reviewguias/${values.review._id}`, review);
    }
    else {

        let review = {
            total: values.classificacao,
            media: values.classificacao,
            quantidade_votos: 1,
        }

        let request_review = await axios.post(`${process.env.REACT_APP_URL_API}reviewguias/`, review);
        axios.put(`${process.env.REACT_APP_URL_API}guias/${values.guia}`, {reviewguia: request_review.data._id})
    }

    const request = await axios.post(`${process.env.REACT_APP_URL_API}comentarioguias/`, values);
    console.log('olha o comment: ', request.data);
    return{
        type: CREATE_COMENTARIO_GUIA,
        payload: request.data
    }

};

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