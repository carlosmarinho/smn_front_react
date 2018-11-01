import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchNoticiaBySlug } from '../actions/noticia';
import { fetchCategoryBySlug } from '../actions/categoria';




class NotFound extends Component {

    async componentDidMount() {
        this.props.fetchNoticiaBySlug(this.props.match.params.slug);
        this.props.fetchCategoryBySlug(this.props.match.params.slug);
        //this.props.fetchNoticiaBySlug(this.props.match.params.slug);
    }
    
    
    render(){
        if(this.props.noticia_item && this.props.noticia_item.noticia){
            console.log("Noticia item: ", this.props.location.pathname);
            return(
                <Redirect from={`${this.props.location.pathname}`} to={`/noticias/${this.props.noticia_item.noticia.slug}`} state={ { status: 301 } } />
                )
        }
        else if(this.props.categoria_item && this.props.categoria_item.categoria){
            if(this.props.categoria_item.categoria.tipo === 'guia comercial'){
                return(
                    <Redirect from={`${this.props.location.pathname}`} to={`/${this.props.categoria_item.categoria.slug.replace('comercial/','comercial/categoria/')}`} state={ { status: 301 } } />
                )
            }
            else if(this.props.categoria_item.categoria.tipo === 'guia serviço'){
                return(
                    <Redirect from={`${this.props.location.pathname}`} to={`/${this.props.categoria_item.categoria.slug.replace('servicos/','servicos/categoria/')}`} state={ { status: 301 } } />
                )
            }
            else if(this.props.categoria_item.categoria.tipo === 'notícia'){
                return(
                    <Redirect from={`${this.props.location.pathname}`} to={`/${this.props.categoria_item.categoria.slug.replace('noticias/','noticias/categoria/')}`} state={ { status: 301 } } />
                )
            }
            else if(this.props.categoria_item.categoria.tipo === 'evento'){
                return(
                    <Redirect from={`${this.props.location.pathname}`} to={`/${this.props.categoria_item.categoria.slug.replace('eventos/','eventos/categoria/')}`} state={ { status: 301 } } />
                )
            }
        }
        

        return(
            <div>
                <h1>404 - Página não encontrada!</h1>
                <p>Oops parece que não encontramos a página que você está procurando!</p>
            </div>
        )
    }
}


function mapStateToProps(state){
    console.log("Categoriaaaaa", state);
    return {
        categoria_item: state.categorias,
        guia_item: state.guiasFeatured,
        evento_item: state.eventos,
        noticia_item: state.noticias,
    }
}

export default connect(mapStateToProps, { fetchNoticiaBySlug, fetchCategoryBySlug })(NotFound);