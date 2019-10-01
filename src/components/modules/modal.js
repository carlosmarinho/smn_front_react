import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createGuiaNaoExisteMais } from '../../actions/guia';

const required = value => value ? undefined : 'Campo Obrigatório'

class Modal extends React.Component {

    constructor(){
        super();	
        
        this.state = {status: 'show', userLogged: null};

		this.handleSubmit = this.handleSubmit.bind(this);
	
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));

        if(user !== null){
            this.setState({userLogged:user.user})
            //this.props.fetchMe();
        }
        else {
            this.setState({userLogged:false})
        }
    }

    handleSubmit(values) {
        console.log("values no create comentario: ", values);
        if(this.state.userLogged){
            values.user = this.state.userLogged._id;
        }
        values.guia = this.props.guia._id;
        this.props.createGuiaNaoExisteMais(values)
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
    
    showMessage(){
        if(this.props.message){
            console.log("thiiiissss: ", this.props.message);
            if(this.props.message.error && this.props.message.error.guiaNaoExiste ){
                return(
                    <span className="text-danger text-center"><strong>{this.props.message.error.guiaNaoExiste.msg}</strong></span>
                )
            }
            else if(this.props.message.success && this.props.message.success.guiaNaoExiste){
                return(
                    <span className="text-success text-center"><strong>Informação enviada com sucesso! <br />Agradecemos muito a sua ajuda.</strong></span>
                )
            }
        }
    }

    showFormUser() {
        if(this.state.userLogged) {
            return(
                <div>
                    <div className="row">
                        <div className={`input-field-edit col s12`}>
                            <label htmlFor="nome">Nome</label>	
                            <input type="text" name="nome" value={this.state.userLogged.username} disabled="disabled" className="validate"  />
                        </div>
                    </div>
                    <div className="row">
                        <div className={`input-field-edit col s12`}>
                            <label htmlFor="email">Email</label>	
                            <input type="text" name="email" value={this.state.userLogged.email} disabled="disabled" className="validate"  />
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
                            name="nome"
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
        if(this.props.naoExisteMais){
            return(
                <div >
                    <h3>{this.props.title}</h3>
                    <br />
                    <p class="mb-2">Este guia provavelmente não existe mais ou mudou a sua localização.</p>
                    <p>Caso tenha alguma informação útil sobre este guia e queira contribuir por favor nos informe abaixo</p>
                    <div className="row text-center">
                        <div className="col s12">
                            {this.showMessage()}
                        </div>
                    </div>
                        {this.showFormUser()}
                        <div className="row">
                            <div className="input-field-edit col s12">
                                <label htmlFor="descricao">Informações Utéis</label>
                                <Field name="descricao" component="textarea" style={{height: '100px'}} 
                                    placeholder={`Ex 1.: O guia 'xxx' mudou de endereço agora se encontra em tal rua.
                                    \nEx 2.: O guia 'xxx' voltar a funcionar nesse mesmo endereço`}
                                />
                            </div>
                        </div>
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
        const { pristine, reset, submitting, handleSubmit } = this.props

        return(
            <div class={`modal ${this.state.status}`} id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={e => this.setState({status: 'fade'})}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form className="col" onSubmit={handleSubmit(this.handleSubmit)}>
                            <div class="modal-body">
                                {this.getDescription()}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={e => this.setState({status: 'fade'})}>Fechar</button>
                                <button type="button" type="submit" class="btn btn-primary" style={{marginRight:'20px'}}>Enviar Feedback</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return(
        {
            message: state.message
        }
    )
}

const myForm = reduxForm({
	form: 'modalform',
	
})(Modal)

export default connect(mapStateToProps, {createGuiaNaoExisteMais})(myForm);