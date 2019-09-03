import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {createComentarioEvento, createComentarioGuia, createComentarioNoticia} from '../../actions/comentario';

const required = value => value ? undefined : 'Campo Obrigatório'


class FormComment extends Component {

    constructor(){
        super();	
		
		this.handleSubmit = this.handleSubmit.bind(this);
	
    }

    getDescription(){
        if(this.props.text)
            return (
                <p>{this.props.text}</p>
            )
        else 
            return (
                <p>Deixe os seus comentários relacionado com a matéria, ou mesmo deixe ideias e/ou sugestões para ajudar a contribuir com nossa cidade. Também não esqueça de deixar sua avaliação da matéria marcando as estrelinhas (quanto mais gostou mais estrelinhas você marca!).  </p>
            )

    }

    renderField(field){
		const {input, label, type, meta: {touched, error, warning} } = field;
		if(type=='file')
			delete(input.value)

		let className = `col ${field.classCol}`

        return(
			
			<div className={`input-field  ${className}`}>
				<input {...input} id={label}  type={type} disabled={field.disabled} className="validate"  />
				<label htmlFor={label}>{label}</label>	
				{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
			</div>
            
        )
	}

    handleSubmit(values) {
        console.log("values no create comentario: ", values);4
        
        const { resource } = this.props;
        values.classificacao = values.rating;
        values.guia = this.props.item_id;
        values.review = this.props.review;
		switch(resource){
            case 'guia':
                this.props.createComentarioGuia(values);
                break;
            case 'evento':
                this.props.createComentarioEvento(values);
                break;
            case 'noticia':
                this.props.createComentarioNoticia(values)
        }

    }

    render(){
        const { pristine, reset, submitting, handleSubmit } = this.props
        return(
            <div className="pglist-p3 pglist-bg pglist-p-com" >
                <span id="ld-rew"></span>
                <div className="pglist-p-com-ti blog-comment">
                    <h3><span>Deixe seus</span> Comentários</h3> </div>
                <div className="list-pg-inn-sp">
                    <div className="list-pg-write-rev">
                        <form className="col" onSubmit={handleSubmit(this.handleSubmit)}>
                            {this.getDescription()}
                            <div className="row">
                                <div className="col s12">
                                    <fieldset className="rating">
                                        <Field name="rating" component="input" type="radio" id="star5" value="5"/>
                                        <label className="full" htmlFor="star5" title="Exelente - 5 estrelas"></label>
                                        <Field name="rating" component="input" type="radio" id="star4half" value="4.5"/>
                                        <label className="half" htmlFor="star4half" title="Muito Bom - 4,5 estrelas"></label>

                                        <Field name="rating" component="input" type="radio" id="star4" value="4"/>
                                        <label className="full" htmlFor="star4" title="Bom - 4 estrelas"></label>
                                        <Field name="rating" component="input" type="radio" id="star3half" value="3.5"/>
                                        <label className="half" htmlFor="star3half" title="Bom - 3,5 estrelas"></label>

                                        <Field name="rating" component="input" type="radio" id="star3" value="3"/>
                                        <label className="full" htmlFor="star3" title="Satisfatório - 3 estrelas"></label>
                                        <Field name="rating" component="input" type="radio" id="star2half" value="2.5"/>
                                        <label className="half" htmlFor="star2half" title="Bom - 2,5 estrelas"></label>

                                        <Field name="rating" component="input" type="radio" id="star2" value="2"/>
                                        <label className="full" htmlFor="star2" title="Abaixo da Média - 2 estrelas"></label>
                                        <Field name="rating" component="input" type="radio" id="star1half" value="1.5"/>
                                        <label className="half" htmlFor="star1half" title="Abaixo da Média - 1,5 estrelas"></label>

                                        <Field name="rating" component="input" type="radio" id="star1" value="1"/>
                                        <label className="full" htmlFor="star1" title="Ruim - 1 estrelas"></label>
                                        <Field name="rating" component="input" type="radio" id="starhalf" value="0.5"/>
                                        <label className="half" htmlFor="starhalf" title="Ruim - 0,5 estrelas"></label>

                                        
                                        
                                    </fieldset>
                                </div>
                            </div>
                            <div className="row">
                                <Field
                                    name="author_name"
                                    component={this.renderField}
                                    type="text"
                                    label="Nome"
                                    classCol="s12"
                                    className="validate"
                                    validate={[required]}
                                />
                                
                            </div>
                            <div className="row">
                                <Field
                                    name="author_email"
                                    component={this.renderField}
                                    type="text"
                                    label="Email"
                                    classCol="s12"
                                    className="validate"
                                    validate={[required]}
                                />
                            </div>
                            <div className="row">
                                <Field
                                    name="titulo"
                                    component={this.renderField}
                                    type="text"
                                    label="Titulo - Ex.: Gostei muito do serviço..."
                                    classCol="s12"
                                    className="validate"
                                    validate={[]}
                                />
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <Field name="descricao" component="textarea" />
                                    <label htmlFor="descricao">Comentário</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12"> <button type="submit"  value="Enviar" className="waves-effect waves-light btn-large full-btn" >Enviar</button>  </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

const myForm = reduxForm({
	form: 'comment',
	
})(FormComment)

export default connect(null, {createComentarioEvento, createComentarioGuia, createComentarioNoticia})(myForm);