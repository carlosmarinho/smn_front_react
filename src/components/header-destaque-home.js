import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Field, Input, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { searchHome } from '../actions/search';



class HeaderDestaqueHome extends Component {


    onSubmit(values) {
        // this === component (thats the reason we used .bind(this)
        // on onSubmit, because different context of variable)
        console.log("valoresssss: ", values);
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
                <label htmlFor={field.id}>{field.label}</label>
                
            </div>
        )
    }

    render(){
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
                                            value=""
                                            component={this.renderField}
                                        />
                                        {/* <div className="input-field">
                                            <input type="text" id="select-city" className="autocomplete" name="bairro" />
                                            <label htmlFor="select-city">Digite o bairro</label>
                                        </div> */}
                                        <div className="input-field">
                                            <input type="text" id="select-search" className="autocomplete" />
                                            <label htmlFor="select-search" className="search-hotel-type">O que procura</label>
                                        </div>
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