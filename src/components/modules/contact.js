import React, { Component } from 'react';
import PreFooter from '../modules/pre-footer';
import Helmet from 'react-helmet';

class Contact extends Component {

    render(){
        let title = "Entre em contato | Soumaisniterói";
        if(this.props.title)
            title = this.props.title + " - " + title;
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
                                    <form>
                                        <h3>Entre em contato! <span>(Formulário em manutenção)</span></h3>
                                        <p>O Formulário de contato do site está em manutenção! Esperamos resolver o mais breve possível.</p>
                                        <p>Envie sua opinião, reclamação, sugestão e elogio através do formulário abaixo e contribua para o crescimento do nosso site e da sua cidade. Esperamos que fique a vontade para falar conosco.</p>
                                        <div>
                                            <div className="input-field col s12">
                                                <input id="gfc_name" type="text" className="validate" required />
                                                <label htmlFor="gfc_name">Nome</label>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="input-field col s12">
                                                <input id="gfc_mob" type="number" className="validate" />
                                                <label htmlFor="gfc_mob">Celular</label>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="input-field col s12">
                                                <input id="gfc_mail" type="email" className="validate" />
                                                <label htmlFor="gfc_mail">Email</label>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="input-field col s12">
                                                <textarea id="gfc_msg" className="validate" ></textarea>
                                                <label htmlFor="gfc_msg">Mensagem</label>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="input-field col s12">
                                                <input type="submit" value="Enviar" className="waves-effect waves-light btn-large full-btn list-red-btn" /> </div>
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

export default Contact;