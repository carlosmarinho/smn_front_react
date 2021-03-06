import React, { Component } from 'react';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'

import queryString from 'query-string';
import { loginProvider } from '../../actions/user';
import { login } from '../../actions/user';
import PreFooter from './pre-footer';

const required = value => value ? undefined : 'Campo Obrigatório'



class Login extends Component {

    constructor() {
        super()


        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {

        console.log("props no login: " , this.props);
        let params = queryString.parse(this.props.location.search)

        if(this.props.match.params.provider && params.access_token){
            this.props.loginProvider(this.props.match.params.provider, params);
        }            
    }

    

    handleSubmit(values){
        this.props.login(values);
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

    errorMessage(){
        if(this.props.user && this.props.user.loginError){
            return(
                <p className="alert-danger">{this.props.user.loginError}</p>
            )
        }
    }

    render(){

        
        if(this.props.user &&  this.props.user.user){
            //console.log("\n\nusuario no login: ", this.props.user, " ---- ", localStorage.getItem('user'));
            //return <Redirect to={`/`} />
            //@todo change to tag redirect 
            //Tive que usar isso daqui pois o jquery não é carregado nesse momento então o menu não é carregado
            window.location.href = '/'
        }

        const { pristine, reset, submitting, handleSubmit } = this.props


        let name1 = "";
        return(
            <div>
                <section className="tz-register">
                    <div className="log-in-pop">
                        <div className="log-in-pop-left">
                            <h1>Olá... <span>{ name1 }</span></h1>
                            <p>Ainda não fez seu cadastro? Então faça o seu registro. Leva menos de 1 minuto</p>
                            <h4>Login com media social </h4>
                            <ul>
                                <li><a href={process.env.REACT_APP_URL_API + 'connect/facebook'} ><i className="fa fa-facebook"></i> Facebook</a>
                                </li>
                                <li><a href={process.env.REACT_APP_URL_API + 'connect/google'}><i className="fa fa-google"></i> Google+</a>
                                </li>
                                <li><a href="#@todotwitter"><i className="fa fa-twitter"></i> Twitter</a>
                                </li>
                            </ul>
                        </div>
                        <div className="log-in-pop-right">
                            <a href="#@todoclose" className="pop-close" data-dismiss="modal"><img src="images/cancel.png" alt="" />
                            </a>
                            <h4>Login </h4>
                            {this.errorMessage()}
                            <p >Informe seu usuario ou email e sua senha para logar no site!</p>
                            <form className="s12" onSubmit={handleSubmit(this.handleSubmit)}>
                                <div>
                                    <div className="input-field s12">
                                        <Field
                                                name="identifier"
                                                component={this.renderField}
                                                type="text"
                                                label="Usuário ou Email"
                                                data-ng-model="name1"
                                                className="validate"
                                                validate={[ required ]}
                                            />
                                    </div>
                                </div>
                                <div>
                                    <div className="input-field s12">
                                            <Field
                                                name="password"
                                                component={this.renderField}
                                                type="password"
                                                label="Senha"
                                                data-ng-model="name1"
                                                className="validate"
                                                validate={[ required ]}
                                            />
                                    </div>
                                </div>
                                <div>
                                    <div className="input-field s4">
                                        <input type="submit" value="Login" className="waves-effect waves-light log-in-btn" /> 
                                    </div>
                                </div>
                                <div>
                                    <div className="input-field s12"> <Link className='v3-add-bus' to="/cadastro">Ainda não é cadastro ? Cadastre-se</Link> </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <PreFooter />
                
            </div>
        )
    }

}

//export default Login;

function mapStateToProps(state) {
    return(
        {
            user: state.users
        }
    )
}

const Connect = connect(mapStateToProps, {loginProvider, login})(Login);

export default reduxForm({
    form: 'login'
})(Connect)
