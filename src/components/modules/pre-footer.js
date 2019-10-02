import React, { Component } from 'react';



class PreFooter extends Component {

   

    render(){
    
        return(
            <section className="web-app com-padd">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 web-app-img"> <img src="/images/mobile.png" alt="" /> </div>
                        <div className="col-md-6 web-app-con">
                            <h2><strong>Em breve</strong> tenha todos os nossos serviços no seu celular! </h2>
                            <ul>
                                <li><i className="fa fa-check" aria-hidden="true"></i> Guia Comercial</li>
                                <li><i className="fa fa-check" aria-hidden="true"></i> Guia de Serviços</li>
                                <li><i className="fa fa-check" aria-hidden="true"></i> Eventos</li>
                                <li><i className="fa fa-check" aria-hidden="true"></i> Notícias</li>
                            </ul> <span>Informe o seu email abaixo e assim que estiver disponível entraremos em contato!</span>
                            <form>
                                <ul>
                                    
                                    <li>
                                        <input type="text" placeholder="Informe o seu Email" />
                                    </li>
                                    <li>
                                        <input type="submit" value="Enviar" /> 
                                    </li>
                                </ul>
                            </form>
                            <a href="#@todo"><img src="images/android.png" alt="" /> </a>
                            <a href="#@todo"><img src="images/apple.png" alt="" /> </a>
                        </div>
                    </div>
                </div>
            </section>
        )
        
    }
}



export default PreFooter;
