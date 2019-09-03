import React, { Component } from 'react';
import { connect } from 'react-redux';
import RightColumn from '../right-column';
import HeaderGuia from '../header-destaque-guia';
import PreFooter from './pre-footer';
import { fetchGuiaBySlug } from '../../actions/guia';
import { fetchEventosRecentes } from '../../actions/evento';
import { fetchGuiasFeatured } from '../../actions/guia';
import FormComment from './form-comment';
import Reviews from './reviews';
import StreetView from './street-view';
import { Link } from 'react-router-dom';


class ListingItem extends Component {

    constructor() {
        super();

        this.state = {
            slug: ''
        }
    }

    componentDidMount() {
        //this.props.fetchGuiaBySlug(this.props.match.params.slug);
        this.props.fetchEventosRecentes('5ba26f813a018f42215a36a0');
        this.props.fetchGuiasFeatured('5ba26f813a018f42215a36a0');
    }

    componentWillReceiveProps(nextProps) {
        let slug = nextProps.match.params.slug
        if(slug !== this.state.slug){
            this.setState(
                {
                   slug: slug,
                   guias: this.props.fetchGuiaBySlug(slug, this.props.dashboardView)
                }
            )
        }
    }

    render(){
        let item = {};
        if(this.props.guias)
            item = this.props.guias.guia

        return(
            <div>
                
                <HeaderGuia guia={item} />

                <section className="list-pg-bg">
                    <div className="container">
                        <div className="row">
                            <div className="com-padd">
                                <div className="list-pg-lt list-page-com-p">
                                    {this.about(item)}
                                    {(item && item.descricao_servicos)?this.services(item):''}
                                    {this.gallery(item)}
                                    {this.streetView(item)}
                                    <FormComment resource="guia" review={item.reviewguia} item_id={item._id} text="Deixando um comentário adequado a este guia você estará ajudando outros a encontrar exatamente o que estão procurando!" />
                                    <Reviews review={item.reviewguia} comments={item.comentarioguias}/>
                                </div>
                                


                                {/*RIGH COLUMN*/}
                                <RightColumn guiaType="featured" guias={(this.props.guias)?this.props.guias:[]} eventos={(this.props.eventos)?this.props.eventos.recentes:[]}  />


                            </div>
                        </div>
                    </div>
                </section>
                <PreFooter />
            </div>
        )
    }

    about(item) {
        return(
            <div className="pglist-p1 pglist-bg pglist-p-com" >
                <span id="ld-abour"></span>
                <div className="pglist-p-com-ti">
                    <h3><span>Sobre</span> {(item)?item.titulo:'Carregando...'}</h3> </div>
                <div className="list-pg-inn-sp">
                    <div className="text-center share-btn">
                        <ul>
                            <li><Link to={'/'}><i className="fa fa-facebook fb1"></i>Compartilhar <span>no Facebook</span></Link> </li>
                            <li><Link to={'/'}><i className="fa fa-twitter tw1"></i>Compartilhar <span>no Twitter</span></Link> </li>
                            <li><Link to={'/'}><i className="fa fa-google-plus gp1"></i>Compartilhar <span>no Google Plus</span></Link> </li>
                        </ul>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: (item)?item.descricao:'carregando...'}}></div>
                </div>
            </div>
        )
    }

    services(item){
        return(
            <div className="pglist-p2 pglist-bg pglist-p-com" >
                <span id="ld-ser"></span>
                <div className="pglist-p-com-ti">
                    <h3><span>Serviços</span> Oferecidos</h3> </div>
                <div className="list-pg-inn-sp">
                    <p>Taj Luxury Hotels & Resorts provide 24-hour Business Centre, Clinic, Internet Access Centre, Babysitting, Butler Service in Villas and Seaview Suite, House Doctor on Call, Airport Butler Service, Lobby Lounge </p>
                    <div className="row pg-list-ser">
                        <ul>
                            <li className="col-md-4">
                                <div className="pg-list-ser-p1"><img src="/images/services/ser1.jpg" alt="" /> </div>
                                <div className="pg-list-ser-p2">
                                    <h4>Restaurant and Bar</h4> </div>
                            </li>
                            <li className="col-md-4">
                                <div className="pg-list-ser-p1"><img src="/images/services/ser2.jpg" alt="" /> </div>
                                <div className="pg-list-ser-p2">
                                    <h4>Room Booking</h4> </div>
                            </li>
                            <li className="col-md-4">
                                <div className="pg-list-ser-p1"><img src="/images/services/ser3.jpg" alt="" /> </div>
                                <div className="pg-list-ser-p2">
                                    <h4>Corporate Events</h4> </div>
                            </li>
                            <li className="col-md-4">
                                <div className="pg-list-ser-p1"><img src="/images/services/ser4.jpg" alt="" /> </div>
                                <div className="pg-list-ser-p2">
                                    <h4>Wedding Hall</h4> </div>
                            </li>
                            <li className="col-md-4">
                                <div className="pg-list-ser-p1"><img src="/images/services/ser5.jpg" alt="" /> </div>
                                <div className="pg-list-ser-p2">
                                    <h4>Travel & Transport</h4> </div>
                            </li>
                            <li className="col-md-4">
                                <div className="pg-list-ser-p1"><img src="/images/services/ser6.jpg" alt="" /> </div>
                                <div className="pg-list-ser-p2">
                                    <h4>All Amenities</h4> </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    generateIndiceFotos(item){
        if(item && item.galeria_fotos){
            return item.galeria_fotos.map((foto, i) => {
                return <li data-target="#myCarousel" data-slide-to={i} className="active"></li> 
            })
        }
        else{
            return <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
        }
    }

    generateFotosForGallery(item){
        if(item && item.galeria_fotos){
            return item.galeria_fotos.map((foto, i) => {
                return <div className={(i=0)?'item active':'item'}> <img src="/images/slider/1.jpg" alt="Los Angeles" /> </div>
            })
        }
        else{
            return <div className="item active"> <img src={this.getImageSrc(item)} alt="Los Angeles" /> </div>
        }
    }

    getImageSrc(guia){
        if(guia) {

            const { s3_imagem_destacada, old_imagem_destacada, imagem_destacada } = guia
            
            if(s3_imagem_destacada){
                return s3_imagem_destacada;
            }
            if(old_imagem_destacada) {
                if(old_imagem_destacada.includes('.amazonaws'))
                    return old_imagem_destacada;

                return old_imagem_destacada.replace('http://soumaisniteroi.com', 'http://images.soumaisniteroi.com');
            }
            else if(imagem_destacada){
                if(imagem_destacada.url){
                    return imagem_destacada.url;
                }
    
                //implementar codigo
                return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
            }
            return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
    }


    gallery(item){
        return(
            <div className="pglist-p3 pglist-bg pglist-p-com" >
                <span id="ld-gal"></span>
                <div className="pglist-p-com-ti">
                    <h3><span>Galeria de </span> Fotos</h3> </div>
                <div className="list-pg-inn-sp">
                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
                        {/*<!-- Indicators -->*/}
                        <ol className="carousel-indicators">
                            {this.generateIndiceFotos(item)}
                        </ol>
                        {/*<!-- Wrapper for slides -->*/}
                        <div className="carousel-inner">
                            {this.generateFotosForGallery(item)}
                        </div>
                        {/*<!-- Left and right controls -->*/}
                        <a className="left carousel-control" href="#myCarousel" data-slide="prev"> <i className="fa fa-angle-left list-slider-nav" aria-hidden="true"></i> </a>
                        <a className="right carousel-control" href="#myCarousel" data-slide="next"> <i className="fa fa-angle-right list-slider-nav list-slider-nav-rp" aria-hidden="true"></i> </a>
                    </div>
                </div>
            </div>
        )
    }

    getStreetView(item){
        if(item && item.latitude && item.longitude){
            return <StreetView latitude={item.latitude} longitude={item.longitude} />
        }
        else {
            return "Latitude e Longitude não foi informado!"
        }
    }

    streetView(item){
        return(
            <div className="pglist-p3 pglist-bg pglist-p-com" >
                <span id="ld-vie"></span>
                <div className="pglist-p-com-ti">
                    <h3><span>360 </span> Google Street View</h3> </div>
                <div className="list-pg-inn-sp list-360">
                    {this.getStreetView(item)}
                </div>
            </div>
        )
    }

    
}


function mapStateToProps(state){
    //console.log("state BLOG list: ", state)
    return {
        noticias: state.noticias,
        guias: state.guias,
        eventos: state.eventos
    }
}

export default connect(mapStateToProps, { fetchGuiaBySlug, fetchEventosRecentes, fetchGuiasFeatured })(ListingItem);