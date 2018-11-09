import React, { Component } from 'react';
//import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
//import { Field, reduxForm } from 'redux-form'

class Login extends Component {

    render(){
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
                                <li><a href="#@todoface"><i className="fa fa-facebook"></i> Facebook</a>
                                </li>
                                <li><a href="#@todogoogle"><i className="fa fa-google"></i> Google+</a>
                                </li>
                                <li><a href="#@todotwitter"><i className="fa fa-twitter"></i> Twitter</a>
                                </li>
                            </ul>
                        </div>
                        <div className="log-in-pop-right">
                            <a href="#@todoclose" className="pop-close" data-dismiss="modal"><img src="images/cancel.png" alt="" />
                            </a>
                            <h4>Login <span>(Em manutenção)</span></h4>
                            <p>O login do site está em manutenção! Esperamos resolver o mais breve possível.</p>
                            <p>Informe seu usuario ou email e sua senha para logar no site!</p>
                            <form className="s12">
                                <div>
                                    <div className="input-field s12">
                                        <input type="text" data-ng-model="name1" className="validate" />
                                        <label>Username</label>
                                    </div>
                                </div>
                                <div>
                                    <div className="input-field s12">
                                        <input type="password" className="validate" />
                                        <label>Senha</label>
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
                                <a href="#@todoandroid"><img src="images/android.png" alt="" /> </a>
                                <a href="#@todoapple"><img src="images/apple.png" alt="" /> </a>
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>
        )
    }

}

export default Login;