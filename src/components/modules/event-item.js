import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RightColumn from '../right-column';
import HeaderEvent from '../header-destaque-evento';
import PreFooter from './pre-footer';
import { fetchEventoBySlug } from '../../actions/evento';
import { fetchEventosRecentes } from '../../actions/evento';
import { fetchGuiasRecentes } from '../../actions/guia';
import { fetchGuiasFeatured } from '../../actions/guia';
import FormComment from './form-comment';
import Reviews from './reviews';
import StreetView from './street-view';

class EventItem extends Component {

    constructor() {
        super();

        this.state = {
            slug: ''
        }
    }

    componentDidMount() {
        //this.props.fetchEventoBySlug(this.props.match.params.slug);
        this.props.fetchEventosRecentes('5ba26f813a018f42215a36a0');
        this.props.fetchGuiasRecentes('5ba26f813a018f42215a36a0');
        this.props.fetchGuiasFeatured('5ba26f813a018f42215a36a0');
    }

    componentWillReceiveProps(nextProps) {
        let slug = nextProps.match.params.slug
        
        if(slug !== this.state.slug){
            this.setState(
                {
                   slug: slug,
                   eventos: this.props.fetchEventoBySlug(slug)
                }
            )
        }
    }

    render(){
        let item = {};
        if(this.props.eventos)
            item = this.props.eventos.evento
            
        return(
            <div>
                
                <HeaderEvent evento={item} />

                <section className="list-pg-bg">
                    <div className="container">
                        <div className="row">
                            <div className="com-padd">
                                <div className="list-pg-lt list-page-com-p">
                                    {(item)?this.about(item):'carregando...'}
                                    {(item && item.descricao_servicos)?this.services(item):''}
                                    {(item)?this.gallery(item):'carregando...'}
                                    {(item)?this.streetView(item):'carregando...'}
                                    {(item)?this.tags(item):'carregando...'}
                                    <FormComment text="Deixando um comentário adequado a este evento você estará ajudando outros a encontrar exatamente o que estão procurando!" />
                                    <Reviews />
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
                    <h3><span>Dados do Evento: </span> {(item)?item.titulo:'Carregando...'}</h3> </div>
                <div className="list-pg-inn-sp">
                    <div className="text-center share-btn">
                        <ul>
                            <li><Link to={'/'}><i className="fa fa-facebook fb1"></i>Compartilhar <span>no Facebook</span></Link> </li>
                            <li><Link to={'/'}><i className="fa fa-twitter tw1"></i>Compartilhar <span>no Facebook</span></Link> </li>
                            <li><Link to={'/'}><i className="fa fa-google-plus gp1"></i>Compartilhar <span>no Facebook</span></Link> </li>
                        </ul>
                    </div>
                    <div className="row v2-mar-top-40">
                        <div className="col-md-6 mar-bot-20" >
                            <h4 className="mar-bot-20">Data e Hora</h4>
                            {this.getDateTime(item)}
                            
                        </div>
                        <div className="col-md-6" >
                            <h4 className="mar-bot-20">Preço e Classificação </h4>
                            {this.getPriceAndClassification(item)}
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12" >
                            <h4 className="mar-bot-20">Descrição do Evento</h4>
                            <p dangerouslySetInnerHTML={{__html: (item)?item.descricao:'carregando...'}} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    getPrice(item){
        //Quando eu importo do wordpress e o preço está em string retorna um objeto com erro por isso a verificaçao do .message
        if(item.preco && ! item.preco.message)
            return <div><span><strong>Valor da Entrada:</strong> {item.preco}</span><br /></div>
        else
            return <div><span><strong>Valor da Entrada:</strong> Não informado!</span><br /></div>
    }

    getCouvert(item){
        if(item.couvert && ! item.couvert.message) {
            return(
                <div><span><strong>Couvert:</strong> {item.couvert}</span><br /></div>
            )
        }
        else    
            return;
    }

    getClassification(item){
        if(item.classificacao_indicativa)
            return(
                <div><span><strong>Classificação:</strong> {item.classificacao_indicativa} </span><br /></div>
            )
    }

    getPriceAndClassification(item){
        if(! item)
            return;
        
        console.log("item no item e classificao: ", item)

        let price = this.getPrice(item);
        let couvert = this.getCouvert(item);
        let classificacao = this.getClassification(item);
        
        
        return <div>{price} {couvert} {classificacao}</div>
    }

    dateNumberPtBr(date){
        return ( "0" +(date.getDate())).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
    }

    getDate(item){
        if(item.fim){
            return (
                <div>
                    <span><strong>Data Inicial do Evento:</strong> {this.dateNumberPtBr(new Date(item.inicio))}</span><br />
                    <span><strong>Data Final do Evento:</strong> {this.dateNumberPtBr(new Date(item.fim))}</span><br />
                </div>
            )
        }
        else{
            return (
                <div>
                    <span><strong>Data do Evento:</strong> {this.dateNumberPtBr(new Date(item.inicio))}</span><br />
                </div>

            )
        }
        
    }

    getHorario(item){
        if(item.hora_inicio && item.hora_fim){
            return (
                <div>
                    <span><strong>Horário do Evento</strong>: de {item.hora_inicio} até às {item.hora_fim} horas</span><br />
                </div>
            )
        }
        else if(item.hora_inicio){
            return (
                <div>
                    <span>Horário: O evento tem início às {item.hora_inicio} horas</span><br />
                </div>
            )
        }
    }

    getDateTime(item){
        return(
            <div>
                {this.getDate(item)}
                {this.getHorario(item)}
            </div>
        )
    }

    generateCategories(categories){
        if(categories && categories.length>0)
            return categories.map((category, ind) => {
                return(
                    <Link to={`/eventos/categoria/${category.slug.replace('evento/','')}`} key={ind} >
                        <li className="col-md-4">
                            <div className="pg-list-ser-p1"><img src={this.getImageSrc(category)} alt="" /> </div>
                            <div className="pg-list-ser-p2">
                                <h4>{category.nome}</h4> </div>
                        </li>
                    </Link>
                )
            })
    }

    tags(item){
        return(
            <div className="pglist-p2 pglist-bg pglist-p-com" >
                <span id="ld-ser"></span>
                <div className="pglist-p-com-ti">
                    <h3><span>Categorias e Tags</span> Relacionadas</h3> </div>
                <div className="list-pg-inn-sp">
                    <p>Veja as categorias relacionadas ao evento <strong>{item.titulo}</strong>.</p>
                    <div className="row pg-list-ser">
                        <ul>
                            {this.generateCategories(item.categorias)}
                            
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

    getImageSrc(evento){
        if(evento && evento.s3_imagem_destacada){
            return evento.old_imagem_destacada;
        }
        else if(evento && evento.old_imagem_destacada) {
            return evento.old_imagem_destacada;
        }
        else if(evento && evento.imagem_destacada){
            //implementar codigo
            return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
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

export default connect(mapStateToProps, { fetchEventoBySlug, fetchEventosRecentes, fetchGuiasRecentes, fetchGuiasFeatured })(EventItem);