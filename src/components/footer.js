import React, { Component } from 'react';
import {connect} from 'react-redux';

import FooterWidget from './modules/footer-widget';

import { fetchGuiasRecentes } from '../actions/guia';
import { fetchNoticiasRecentes } from '../actions/noticia';


class Footer extends Component {

    componentDidMount() {
     
        this.props.fetchGuiasRecentes('5ba26f813a018f42215a36a0', 7, '-_id');
        this.props.fetchNoticiasRecentes('5ba26f813a018f42215a36a0', 5, '-_id');
        
    }

    render(){
        if(! this.props.guias || !this.props.noticias)
            return null;
        else {

            return(
                <div>
                    <footer id="colophon" className="site-footer clearfix">
                        <div id="quaternary" className="sidebar-container " role="complementary">
                            <div className="sidebar-inner">
                                <div className="widget-area clearfix">
                                    <div id="azh_widget-2" className="widget widget_azh_widget">
                                        <div data-section="section">
                                            <div className="container">
                                                <div className="row">
                                                    {/*<div className="col-sm-4 col-md-3 foot-logo"> <img src="/images/logo-soumaisniteroi-transp-footer.png" alt="logo rodapé" />*/}
                                                    <div className="col-sm-4 col-md-3 foot-logo"> <img src="http://soumaisniteroi.com.br/wp-content/uploads/2015/08/logo-soumaisniteroi-transp-footer.png" alt="logo rodapé" />
                                                        <p className="hasimg">Somos o maior portal da cidade de Niterói!</p>
                                                        <p className="hasimg">Aqui você fica por dentro de tudo que acontece na sua cidade. Notícias, eventos, guias e muito Mais! </p>
                                                        <p> <span className=""><i className="fa fa-phone" aria-hidden="true"></i> </span> <span className="footer-contact"> (21) 99172-0833</span> </p>
                                                        <p> <span className=""><i className="fa fa-envelope" aria-hidden="true"></i> </span> <span className="footer-contact">contato@soumaisniteroi.com.br</span> </p>
                                                    </div>
                                                    <FooterWidget title="Guias Recentes" object={this.props.guias.recentes}/>
                                                    <FooterWidget title="Últimas Notícias" object={this.props.noticias.recentes}/>
                                                    
                                                    <div className="col-sm-4 col-md-3">
                                                        <h4>Facebook</h4>
                                                        <div className="fb-page" data-href="https://www.facebook.com/soumaisniteroi" data-tabs="timeline" data-width="300" data-height="220" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
                                                            <blockquote cite="https://www.facebook.com/soumaisniteroi" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/soumaisniteroi">Cidade de Niterói</a></blockquote>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div data-section="section" className="foot-sec2">
                                            <div className="container">
                                                <div className="row text-center">
                                                    
                                                    <div className="col-sm-12 foot-social text-center">
                                                        <h4>Conecte-se conosco</h4>
                                                        <p>Curta a nossa página no Facebook ou no Google Plus, acompanhe nos no Twitter e no Instagram</p>
                                                        <ul className="list-inline text-center">
                                                            <li><a href="#!"><i className="fa fa-facebook" aria-hidden="true"></i></a> </li>
                                                            <li><a href="#!"><i className="fa fa-google-plus" aria-hidden="true"></i></a> </li>
                                                            <li><a href="#!"><i className="fa fa-twitter" aria-hidden="true"></i></a> </li>
                                                            <li><a href="#!"><i className="fa fa-linkedin" aria-hidden="true"></i></a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<!-- .widget-area -->*/}
                            </div>
                            {/*<!-- .sidebar-inner -->*/}
                        </div>
                    </footer>
                    {/*<!--COPY RIGHTS-->*/}
                    <section className="copy">
                        <div className="container">
                            <p>Copyright © 2018 SOUMAISNITEROI by CLM Soluçoes Web e Publicidade | Todos os Direitos Reservados</p>
                        </div>
                    </section>
    
                    <section>
    
                        {/*<!-- GET QUOTES POPUP -->*/}
                        <div className="modal fade dir-pop-com" id="list-quo" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header dir-pop-head">
                                        <button type="button" className="close" data-dismiss="modal">×</button>
                                        <h4 className="modal-title">Get a Quotes</h4>
                                        {/*<!--<i className="fa fa-pencil dir-pop-head-icon" aria-hidden="true"></i>-->*/}
                                    </div>
                                    <div className="modal-body dir-pop-body">
                                        <form method="post" className="form-horizontal">
                                            {/*<!--LISTING INFORMATION-->*/}
                                            <div className="form-group has-feedback ak-field">
                                                <label className="col-md-4 control-label">Full Name *</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" name="fname" placeholder="" required /> </div>
                                            </div>
                                            {/*<!--LISTING INFORMATION-->*/}
                                            <div className="form-group has-feedback ak-field">
                                                <label className="col-md-4 control-label">Mobile</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" name="mobile" placeholder="" /> </div>
                                            </div>
                                            {/*<!--LISTING INFORMATION-->*/}
                                            <div className="form-group has-feedback ak-field">
                                                <label className="col-md-4 control-label">Email</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" name="email" placeholder="" /> </div>
                                            </div>
                                            {/*<!--LISTING INFORMATION-->*/}
                                            <div className="form-group has-feedback ak-field">
                                                <label className="col-md-4 control-label">Message</label>
                                                <div className="col-md-8 get-quo">
                                                    <textarea className="form-control"></textarea>
                                                </div>
                                            </div>
                                            {/*<!--LISTING INFORMATION-->*/}
                                            <div className="form-group has-feedback ak-field">
                                                <div className="col-md-6 col-md-offset-4">
                                                    <input type="submit" value="SUBMIT" className="pop-btn" /> </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<!-- GET QUOTES Popup END -->*/}
                    </section>
    
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    return {
        guias: state.guias,
        noticias: state.noticias,
    }
}

//export default Footer;
export default connect(mapStateToProps, { fetchGuiasRecentes, fetchNoticiasRecentes })(Footer);