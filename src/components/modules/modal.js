import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';

const required = value => value ? undefined : 'Campo Obrigatório'

class Modal extends React.Component {

    constructor(){
        super();	
        
        this.state = {status: 'show'};

		this.handleSubmit = this.handleSubmit.bind(this);
	
    }

    handleSubmit(values) {
        console.log("values no create comentario: ", values);
    }

    renderField(field){
		const {input, label, type, meta: {touched, error, warning} } = field;
		if(type=='file')
			delete(input.value)

		let className = `col ${field.classCol}`

        return(
			
			<div className={`input-field-edit  ${className}`}>
				<label htmlFor={label}>{label}</label>	
				<input {...input} id={label} style={{height: '2.5rem', border:'1px solid #eee'}}  type={type} disabled={field.disabled} className="validate"  />
				{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
			</div>
            
        )
	}

    showFormUser() {
        if(this.props.userLogged) {
            return(
                <div>
                    <div className="row">
                        <div className={`input-field-edit col s12`}>
                            <input type="text" value={this.state.userLogged.username} disabled="disabled" className="validate"  />
                        </div>
                    </div>
                    <div className="row">
                        <div className={`input-field-edit col s12`}>
                            <input type="text" value={this.state.userLogged.email} disabled="disabled" className="validate"  />
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
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
                            name="email"
                            component={this.renderField}
                            type="text"
                            label="Email"
                            classCol="s12"
                            className="validate"
                            validate={[required]}
                        />
                    </div>
                </div>
            )
        }
    }

    getDescription(){
        const { pristine, reset, submitting, handleSubmit } = this.props

        if(this.props.naoExisteMais){
            return(
                <div >
                    <h3>{this.props.title}</h3>
                    <br />
                    <p class="mb-2">Este guia provavelmente não existe mais ou mudou a sua localização.</p>
                    <p>Caso tenha alguma informação útil sobre este guia e queira contribuir por favor nos informe abaixo</p>
                    <form className="col" onSubmit={handleSubmit(this.handleSubmit)}>
                        {this.showFormUser()}
                        <div className="row">
                            <div className="input-field-edit col s12">
                                <label htmlFor="descricao">Comentário</label>
                                <Field name="descricao" component="textarea" style={{height: '100px'}}/>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
        else{
            return(
                <div>{this.props.description}</div>
            )
        }
    }

    render() {
        return(
            <div class={`modal ${this.state.status}`} id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {this.getDescription()}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={e => this.setState({status: 'fade'})}>Fechar</button>
                        <button type="button" class="btn btn-primary" style={{marginRight:'20px'}}>Enviar Feedback</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

const myForm = reduxForm({
	form: 'modalform',
	
})(Modal)

export default connect(null, {})(myForm);