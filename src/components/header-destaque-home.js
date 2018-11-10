import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Field, Input, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { searchHome } from '../actions/search';



class HeaderDestaqueHome extends Component {

    constructor(){
        super()

        this.state = {
            searched: false,
            bairro: ' ',
            search: ' '
        }
    }

    onSubmit(values) {
        // this === component (thats the reason we used .bind(this)
        // on onSubmit, because different context of variable)
        console.log("valoresssss: ", values);

        if(values.bairro || values.search ){
            this.setState({
                searched:true,
                bairro: (values.bairro)? values.bairro.toLowerCase():'',
                search: (values.search)? values.search.toLowerCase():''
            })
        }
        else{
            alert('Informe ou o bairro ou o que você procura!')
        }
        //this.props.history.push('/guia');
        //this.props.createPost(values, () => this.props.history.push('/'));
    }

    renderField(field) {
        delete field.input.value;
        return (
            <div className="input-field">
                <input
                    id={field.id}
                    className={field.className}
                    type={field.type }
                    disabled={false}
                    {...field.input}
                />
                <label htmlFor={field.id} className={field.labelClass}>{field.label}</label>
                
            </div>
        )
    }

    render(){
        console.log("state search: ", this.state.search);
        if(this.state.searched){
            console.log(`/busca/${this.state.bairro}/${this.state.busca}`);
            return <Redirect to={`/busca/${this.state.bairro}/${this.state.search}`} />
        }

        let title = "Site da cidade de Niterói - Soumaisniterói";
        if(this.props.title)
            title = this.props.title + " | " + title;

        const { handleSubmit } = this.props;


        return(
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{title}</title>
                    <link rel="canonical" href="http://soumaisniteroi.com.br/" />
                </Helmet>
                <section id="background1" className="dir1-home-head" style={{height:550}}>
                    <div className="container dir-ho-t-sp">
                        <div className="row">
                            <div className="dir-hr1">
                                <div className="dir-ho-t-tit dir-ho-t-tit-2">
                                    <h1>O melhor da cidade de Niterói!</h1> 
                                </div>
                                    <form className="tourz-search-form" onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                                        
                                        
                                        <Field
                                            label="Digite o bairro "
                                            className="autocomplete"
                                            id="select-city"
                                            type="text"
                                            name="bairro"
                                            value=""
                                            component={this.renderField}
                                        />
                                        <Field
                                            label="O que procura "
                                            className="autocomplete"
                                            id="select-search"
                                            labelClass="search-hotel-type"
                                            type="text"
                                            name="search"
                                            value=""
                                            component={this.renderField}
                                        />
                                        {/* <div className="input-field">
                                                <input type="text" id="select-city" className="autocomplete" name="bairro" />
                                                <label htmlFor="select-city">Digite o bairro</label>
                                            </div> *
                                            <div className="input-field">
                                                <input type="text" id="select-search" className="autocomplete" />
                                                <label htmlFor="select-search" className="search-hotel-type">O que procura</label>
                                            </div>*/}
                                        <div className="input-field">
                                            <input type="submit" value="buscar" className="waves-effect waves-light tourz-sear-btn" /> 
                                        </div>
                                    </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

//export default HeaderDestaqueHome;
export default reduxForm({
    
    //this form property here you can really 
    //think of as being the name of the form
    form: 'SearchHomeForm' //this string has to be a unique form
})(
    connect(null, { searchHome })(HeaderDestaqueHome)
)