import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import HeaderBlog from '../header-destaque-blog';
import { fetchNoticias } from '../../actions/noticia';
import { fetchFeaturedGuias } from '../../actions/guia';
import { Link } from 'react-router-dom';

import Pagination from "react-js-pagination";

import RightColumn from '../right-column';

class BlogList extends Component {

    constructor(){
        super();
        
        this.state = {
            data: [],
            activePage: 1
        }

        this.handlePageChange = this.handlePageChange.bind(this);
        this.generateNoticias = this.generateNoticias.bind(this);
    }

    componentDidMount() {
        this.props.fetchNoticias('5ba26f813a018f42215a36a0');
        this.props.fetchFeaturedGuias('5ba26f813a018f42215a36a0');
    }

    componentWillReceiveProps(nextProps) {
        console.log("no nextprops: ", nextProps)
        if(nextProps.noticias){
            if(nextProps.noticias.list)
            {
                this.setState({data: nextProps.noticias.list.slice(0,10), pageCount: Math.ceil(  nextProps.noticias.list.lenght / 10)});
            }
        }
    }

    getImageSrc(noticia){
        if(noticia.s3_imagem_destacada){
            return noticia.old_imagem_destacada;
        }
        if(noticia.old_imagem_destacada) {
            return noticia.old_imagem_destacada;
        }
        else if(noticia.imagem_destacada){
            //implementar codigo
            return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
    }

    datePtBr(date){
        const options = {year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('pt-BR', options)
    }

    generateNoticias() {
        const truncate = _.truncate
        let noticias = this.state.data.map( noticia => {
            
            return (
                <div className="row blog-single">
                    <div className="col-md-4">
                        <div className="blog-img"> <img src={this.getImageSrc(noticia)} alt="" /> </div>
                    </div>
                    <div className="col-md-8">
                        <div className="page-blog">
                            <Link to={'/noticias/' + noticia.slug}  ><h3>{noticia.titulo}</h3></Link>
                            <span>{this.datePtBr(new Date(noticia.createdAt))} </span>
                            <p>{truncate(noticia.descricao.replace(/&#13;/g,'').replace(/<\/?[^>]+(>|$)/g, ""), { length: 150, separator: /,?\.* +/ })}</p> 
                            <Link to={'/noticias/' + noticia.slug} className="waves-effect waves-light btn-large full-btn" >Leia Mais</Link> </div>
                    </div>
                </div>
            )
        })

        return(
            <div>
                {noticias}
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={this.props.noticias.list.length}
                    pageRangeDisplayed={10}
                    onChange={this.handlePageChange}
                    prevPageText={<i className="material-icons">chevron_left</i>}
                    nextPageText={<i className="material-icons">chevron_right</i>}
                    firstPageText={<i className="material-icons">first_page</i>}
                    lastPageText={<i className="material-icons">last_page</i>}
                    innerClass="pagination list-pagenat"
                    itemClass="waves-effect"
                />
            </div>
        )
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        let data = [];
        if(pageNumber == 1){
            data = this.props.noticias.list.slice(0, 10)
        }
        else{
            data = this.props.noticias.list.slice((pageNumber-1)*10,((pageNumber-1)*10)+10)
        }
        this.setState({activePage: pageNumber, data});
        //{data: nextProps.noticias.list.slice(0,10)}
    }

    render(){
        let columnRight = true;

        let items = <div>Nenhuma Notícia encontrada!</div>
        if(! this.props.noticias){
            items = <div>Nenhuma Notícia encontrado !! </div>
        }
        else {
            console.log("this.props.noticias: ", this.props.noticias.list)
            if(!this.props.noticias.list)
                items = <div>Nenhum noticia encontrado para a categoria {this.props.listName} </div>
            else
                items = this.generateNoticias();
            //items = this.generateGuias(this.props.noticias.list)
        }

        if(columnRight) {
            return(
                <div>{this.contentWithColumnRight(items)}</div>
            )
        }
        else {
            return(
                <div>
                    <HeaderBlog title={this.props.title} subtitle={this.props.subtitle} />
                    <section className="p-about com-padd">
                        <div className="container">
                            {items}
                        
                        {/*<!--MOBILE APP--> */}
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
                    </section>
                    
                </div>
            )
        }
    }

    contentWithColumnRight(items){
        return(
            <div>
                <HeaderBlog title={this.props.title} subtitle={this.props.subtitle} />
                <section className="p-about com-padd">
                    <div className="container">

                        <div className="row">
                            <div >
                                <div className="list-pg-lt list-page-com-p">

                                    {items}

                                
                                    {/*<!--MOBILE APP--> */}
                                    <section className="web-app com-padd">
                                        <div >
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
                                    <RightColumn guias={(this.props.guias)?this.props.guias.recentes:[]}  />
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>
        )
    }
}


function mapStateToProps(state){
    //console.log("state BLOG list: ", state)
    return {
        noticias: state.noticias,
        guias: state.guias
    }
}

export default connect(mapStateToProps, { fetchNoticias, fetchFeaturedGuias })(BlogList);