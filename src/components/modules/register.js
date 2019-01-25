import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createUser } from '../../actions/user';


const required = value => value ? undefined : 'Campo Obrigatório'

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Campo de Email inválido' : undefined

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

const maxLength15 = maxLength(15)

const minLength = min => value =>
    value && value.length < min ? `O campo deve conter no mínimo ${min} caracteres` : undefined;

const minLength5 = minLength(5)

const passwordMatch = (value, allValues) => 
    value != allValues.password ? "As senhas não podem ser diferentes!" : undefined;


class Register extends Component {

    constructor(){
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    handleSubmit(values){
        console.log("values", values);
        this.props.createUser(values);
    }

    showMessage(){
        console.log("mensagem: ", this.props.message);
        if(this.props.message){
            if(this.props.message.error){
                return(
                    <p className="text-danger">{this.props.message.error.msg}</p>
                )
            }
            else if(this.props.message.success){
                return(
                    <p className="text-success">Usuário cadastrado com sucesso! Valide o seu cadastro através do email que foi enviado.</p>
                )
            }
        }
    }

    renderField(field){
        const {input, label, type, meta: {touched, error, warning} } = field;

        return(
                <div className="input-field s12">
                    <input {...input}  type={type} />
                    {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
                    <label>{label}</label> 
                </div>
            
        )
    }

    facebookLogin(){
        console.log("aqui no facebook login");
    }

    render(){
        let name1 = "";
        const { pristine, reset, submitting, handleSubmit } = this.props

        console.log("minhas props: ", this.props);
        return(
            <div>
                <section className="tz-register">
                    <div className="log-in-pop">
                        <div className="log-in-pop-left">
                            <h1>Olá... <span>{ name1 }</span></h1>
                            <p>Ainda não fez seu cadastro? Então faça o seu registro. Leva menos de 1 minuto</p>
                            <h4>Login com media social </h4>
                            <ul>
                                <li><a href="http://localhost:1337/connect/facebook" ><i className="fa fa-facebook"></i> Facebook</a>
                                </li>
                                <li><a href="#@todogoogle"><i className="fa fa-google"></i> Google+</a>
                                </li>
                                <li><a href="#@todotwiter"><i className="fa fa-twitter"></i> Twitter</a>
                                </li>
                            </ul>
                        </div>
                        <div className="log-in-pop-right">
                            <a href="#@todoclose" className="pop-close" data-dismiss="modal"><img src="images/cancel.png" alt="" />
                            </a>
                            <h4>Faça o seu Cadastro </h4>
                            <p>Ainda não fez seu cadastro? Então faça o seu registro. Leva menos de 1 minuto</p>
                            {this.showMessage()}
                            <form className="s12" onSubmit={handleSubmit(this.handleSubmit)}>
                                <div>
                                    <Field
                                            name="username"
                                            component={this.renderField}
                                            type="text"
                                            label="Usuário"
                                            data-ng-model="name1"
                                            className="validate"
                                            validate={[ required, minLength5, maxLength15 ]}
                                        />
                                        {/*<input type="text" data-ng-model="name1" className="validate" />
                                        <label>Username</label>*/}
                                </div>
                                <div>
                                    <div className="input-field s12">
                                        <Field
                                            name="email"
                                            component={this.renderField}
                                            type="email"
                                            label="Email"
                                            className="validate"
                                            validate={[ email, required ]}
                                        />
                                        {/*<input type="email" className="validate" />*/}
                                    </div>
                                </div>
                                <div>
                                    <div className="input-field s12">
                                        <Field
                                            name="password"
                                            component={this.renderField}
                                            type="password"
                                            label="Senha"
                                            className="validate"
                                            validate={[required, minLength5, maxLength15]}
                                        />
                                        {/*<input type="password" className="validate" />*/}
                                    </div>
                                </div>
                                <div>
                                    <div className="input-field s12">
                                        <Field
                                            name="confirme_senha"
                                            component={this.renderField}
                                            validate={[passwordMatch]}
                                            type="password"
                                            label="Confirme a Senha"
                                            className="validate"
                                        />
                                        {/*<input type="password" className="validate" />*/}
                                    </div>
                                </div>
                                <div>
                                    <div className="input-field s4">
                                    <input type="submit" value="Cadastrar"  disabled={pristine || submitting} className="waves-effect waves-light log-in-btn" /> </div>
                                </div>
                                <div>
                                    <div className="input-field s12"> <Link className='v3-add-bus' to="/login">Já é cadastrado ? Login</Link> </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                {/*<!--MOBILE APP-->*/}
                <section className="web-app com-padd">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 web-app-img"> <img src="images/mobile.png" alt="" /> </div>
                            <div className="col-md-6 web-app-con">
                                <h2>Looking for the Best Service Provider? <span>Get the App!</span></h2>
                                <ul>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Find nearby listings</li>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Easy service enquiry</li>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Listing reviews and ratings</li>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Manage your listing, enquiry and reviews</li>
                                </ul> <span>We'll send you a link, open it on your phone to download the app</span>
                                <form>
                                    <ul>
                                        <li>
                                            <input type="text" placeholder="+01" /> </li>
                                        <li>
                                            <input type="number" placeholder="Enter mobile number" /> </li>
                                        <li>
                                            <input type="submit" value="Get App Link" /> </li>
                                    </ul>
                                </form>
                                <a href="#@todo"><img src="images/android.png" alt="" /> </a>
                                <a href="#@todo"><img src="images/apple.png" alt="" /> </a>
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>
        )
    }

}

function mapStateToProps(state){
    return({
        users: state.users,
        message: state.message
    })
}

/* function validate(values){

    console.log("valores: ", values);
    let errors = [];
    console.log('username: ', !values.username )
    if(!values.username)
        errors['username'] = "Campo Usuário é obrigatório!";
        
    console.log("errors: ", errors);
    return errors
} */

const Connect = connect(mapStateToProps, {createUser})(Register)

export default reduxForm ({
    form: 'register'
})(Connect);