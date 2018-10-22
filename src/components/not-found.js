import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchNoticiaBySlug } from '../actions/noticia';


import { Link } from 'react-router-dom';


class NotFound extends Component {

    async componentDidMount() {
        console.log("prooooops;:::", this.props);
        this.props.fetchNoticiaBySlug(this.props.match.params.slug);
        //this.props.fetchNoticiaBySlug(this.props.match.params.slug);
    }

   
    render(){
        if(this.props.noticia_item && this.props.noticia_item.noticia){
            console.log("Noticia item: ", this.props.location.pathname);
            return(
                <Redirect from={`${this.props.location.pathname}`} to={`/noticias/${this.props.noticia_item.noticia.slug}`} state={ { status: 301 } } />
            )
        }
        else{
            return(
                <div>
                    <h1>404 - Página não encontrada!</h1>
                    <p>Oops parece que não encontramos a página que você está procurando!</p>
                </div>
            )
        }
    }
}


function mapStateToProps(state){
    return {
        guia_item: state.guiasFeatured,
        evento_item: state.eventos,
        noticia_item: state.noticias,
    }
}

export default connect(mapStateToProps, { fetchNoticiaBySlug })(NotFound);