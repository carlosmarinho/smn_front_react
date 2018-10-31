import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchGuiaBySlug } from '../../actions/guia';
import { fetchCategoryBySlug } from '../../actions/categoria';
import { Route, Redirect } from 'react-router-dom';
import listingList from './listing-list';
import listingItem from './listing-item';


class CategoryOrItem extends Component {

    constructor() {
        super();

        this.state = {
            slug: ''
        }
    }

    componentDidMount() {
        console.log("no did mount do page: ", this.props.match.params)
        this.setState({slug: this.props.match.params.slug})
        if(this.state.slug == ''){
            this.props.fetchCategoryBySlug(this.props.match.params.slug)
            this.props.fetchGuiaBySlug(this.props.match.params.slug)

            this.setState({slug: this.props.match.params.slug})
        }
        
    }

    componentWillReceiveProps(nextProps) {
        let slug = nextProps.match.params.slug
        console.log("o slug no will receive: ", slug, ' --- ', this.state.slug);
        if(slug != this.state.slug){
            this.setState(
                {
                   slug: slug,
                   categorias: nextProps.fetchCategoriasBySlug(slug),
                   guias: nextProps.fetchGuiaBySlug(slug),
                }
            )
        }
        //this.props.fetchPaginaBySlug(slug);
    }

   

    render(){
        console.log("props: ", this.props)
        if(this.props.categorias && this.props.categorias.categoria){
            console.log("catttt: ", this.props.categorias);
            if(this.props.categorias.categoria.tipo == 'guia comercial'){
                return(
                    <Route component={listingList} />
                )
            }
        }
        else if(this.props.guias && this.props.guias.guia){
            console.log("guiaaaaaaaaa: ", this.props.guias);
            return(
                <Route component={listingItem} />
            )

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
    //console.log("state BLOG list: ", state)
    return {
        guias: state.guias,
        categorias: state.categorias,
    }
}

export default connect(mapStateToProps, { fetchGuiaBySlug, fetchCategoryBySlug, })(CategoryOrItem);