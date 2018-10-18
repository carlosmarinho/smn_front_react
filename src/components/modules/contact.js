import React, { Component } from 'react';
import HeaderBlog from '../header-destaque-blog';

class Contact extends Component {

    render(){
        return(
            <div>
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
                                        <li><a href="#"><i className="fa fa-facebook fb1"></i> Curtir no Facebook</a> </li>
                                        <li><a href="#"><i className="fa fa-twitter tw1"></i> Siga nos no Twitter</a> </li>
                                        <li><a href="#"><i className="fa fa-google-plus gp1"></i> Siga nos no Google Plus</a> </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="con-com">
                                <div className="cpn-pag-form">
                                    <form>
                                        <h3>Entre em contato!</h3>
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
                                <a href="#"><img src="images/android.png" alt="" /> </a>
                                <a href="#"><img src="images/apple.png" alt="" /> </a>
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>
        )
    }

}

export default Contact;