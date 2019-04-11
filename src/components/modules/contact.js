import React, { Component } from 'react';
import PreFooter from '../modules/pre-footer';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {createContact} from '../../actions/contact';

const required = value => value ? undefined : 'Campo Obrigatório'

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Campo de Email inválido' : undefined



class Contact extends Component {

    constructor(){
        super();

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(values){
        console.log("aqui no contact valllllllvalues", values);
        this.props.createContact(values);
    }


    showMessage(){
        console.log("mensagem: ", this.props.message);
        if(this.props.message){
            if(this.props.message.error && this.props.message.error.guia){
                return(
                    <p className="text-danger text-center"><strong>{this.props.message.error.guia.msg}</strong></p>
                )
            }
            else if(this.props.message.success && this.props.message.success.guia){
                return(
                    <p className="text-danger text-center"><strong>Houve um erro ao cadastrar o seu guia!</strong></p>
                )
            }
        }
    }

    renderField(field){
        const {input, label, type, meta: {touched, error, warning} } = field;

        return(
    
			<div className={`input-field col ${field.classCol}`}>
				<input {...input} id={`gfc_${input.name}`}  type={type} className="validate" required={(field.required)?'required':''} />
				{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
				<label htmlFor={input.name}>{label}</label> 
			</div>
            
        )
	}

    render(){
        let title = "Entre em contato | Soumaisniterói";
        if(this.props.title)
            title = this.props.title + " - " + title;

        const { pristine, reset, submitting, handleSubmit } = this.props


        return(
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{title}</title>
                    <link rel="canonical" href="http://soumaisniteroi.com.br/contato/" />
                </Helmet>
                <section>
                    <div className="con-page">
                        <div className="con-page-ri">
                            <div className="con-com">
                                <h4 className="con-tit-top-o">Entre em contato conosco</h4>
                                
                                <span><img src="images/icon/phone.png" alt="" /> Telefone: (21) 99172-0833</span> 
                                <span><img src="images/icon/mail.png" alt="" /> Email: contato@soumaisniteroi.com.br</span>
                                <h4>Acompanhe o Soumaisniteroi nas redes sociais</h4>
                                <p>Será um prazer enorme compartilhar informações sobre a nossa cidade de Niterói nas redes sociais!</p>
                                <div className="share-btn">
                                    <ul>
                                        <li><a href="#@todo"><i className="fa fa-facebook fb1"></i> Curtir no Facebook</a> </li>
                                        <li><a href="#@todo"><i className="fa fa-twitter tw1"></i> Siga nos no Twitter</a> </li>
                                        <li><a href="#@todo"><i className="fa fa-google-plus gp1"></i> Siga nos no Google Plus</a> </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="con-com">
                                <div className="cpn-pag-form">
                                    <form onSubmit={handleSubmit(this.handleSubmit)}>
                                        <h3>Entre em contato!</h3>
                                        <p>Envie sua opinião, reclamação, sugestão e elogio através do formulário abaixo e contribua para o crescimento do nosso site e da sua cidade. </p>
                                        {this.showMessage()}
                                        <div>
                                            <Field
                                                name="nome"
                                                component={this.renderField}
                                                type="text"
                                                label="Nome"
                                                classCol="s12"
                                                validate={[ required ]}
                                            />
                                        </div>
                                        <div>
                                            <Field
                                                name="celular"
                                                component={this.renderField}
                                                type="text"
                                                label="Celular"
                                                classCol="s12"
                                            />
                                        </div>
                                        <div>
                                            <Field
                                                name="email"
                                                component={this.renderField}
                                                type="text"
                                                label="Email"
                                                classCol="s6"
                                                className="validate"
                                                required={true}
                                                validate={[required, email]}
                                            />
                                        </div>
                                        <div>
                                            <div className="input-field col s12">
                                                <Field id="gfc_descricao" className="validate" name="descricao" component="textarea" />
                                                <label htmlFor="gfc_descricao">Mensagem</label>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="input-field col s12"> 
                                                <input type="submit" disabled={pristine || submitting} value="Enviar" className="waves-effect waves-light btn-large full-btn list-red-btn" /> </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/*@todo qnd tiver um endereço fisico implementar o mapa <div className="con-com con-pag-map con-com-mar-bot-o">
                                <h4 className="con-tit-top-o">Touch with us</h4>
                                <p>28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A. Landmark : Next To Airport</p>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6290413.804893654!2d-93.99620524741552!3d39.66116578737809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880b2d386f6e2619%3A0x7f15825064115956!2sIllinois%2C+USA!5e0!3m2!1sen!2sin!4v1469954001005" allowFullScreen=""></iframe>
                            </div>*/}
                        </div>
                    </div>
                </section>
                <PreFooter />
                
            </div>
        )
    }

}

function mapStateToProps(state){
    return(
        {
            user: state.users,
            message: state.message
        }
    )
}

const Connect = connect(mapStateToProps, {createContact})(Contact);

export default reduxForm({
	form: 'contactForm'
})(Connect)