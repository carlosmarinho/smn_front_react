import React, { Component } from 'react';

class Reviews extends Component {

    getQtyStars(qty){
        let elem = [];
        for(let i=0; i< qty; i++)
            elem.push(<i key={i} className="fa fa-star" aria-hidden="true"></i>);
        
        return elem
    }

    getAvaliacaoMedia(review){
        if(review){
            return(
                <p><span>{review.media} {this.getQtyStars(review.media)}</span> baseado em {review.total} avaliações</p>
            )
        }
        else{
            return (
                <p><span>Nenhuma <i className="fa fa-star" aria-hidden="true"></i></span> </p>
            )
        }
    }
    
    getAvaliacoes(comments){
        if(comments ){
            return comments.map(avaliacao => {
                if(!avaliacao.aprovado)
                    return <div></div>;
                    
                if(avaliacao.user) {
                    return(
                        <li key={avaliacao._id}>
                            <div className="lr-user-wr-img"> <img src="/images/users/user-default-32x32.png" alt="" /> </div>
                            <div className="lr-user-wr-con">
                                <h6>{avaliacao.author_name} <span>{avaliacao.classificacao} {this.getQtyStars(avaliacao.classificacao)}</span></h6> 
                                <p><strong>{avaliacao.titulo}</strong> <span className="lr-revi-date">({avaliacao.createdAt})</span></p>
                                <p>{avaliacao.descricao}</p>
                                <ul>
                                    <li><a href="#!"><span>Like</span><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></a> </li>
                                    <li><a href="#!"><span>Dis-Like</span><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></a> </li>
                                    <li><a href="#!"><span>Report</span> <i className="fa fa-flag-o" aria-hidden="true"></i></a> </li>
                                    <li><a href="#!"><span>Comments</span> <i className="fa fa-commenting-o" aria-hidden="true"></i></a> </li>
                                </ul>
                            </div>
                        </li>
                    )
                }
                else {
                    return (
                        <li key={avaliacao._id}>
                            <div className="lr-user-wr-img"> <img src="/images/users/user-default-32x32.png" alt="" /> </div>
                            <div className="lr-user-wr-con">
                                <h6>{avaliacao.author_name} <span>{avaliacao.classificacao} {this.getQtyStars(avaliacao.classificacao)}</span></h6> 
                                <p><strong>{avaliacao.titulo}</strong> <span className="lr-revi-date">({avaliacao.createdAt})</span></p>
                                <p>{avaliacao.descricao}</p>
                                <ul>
                                    <li><a href="#!"><span>Like</span><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></a> </li>
                                    <li><a href="#!"><span>Dis-Like</span><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></a> </li>
                                    <li><a href="#!"><span>Report</span> <i className="fa fa-flag-o" aria-hidden="true"></i></a> </li>
                                    <li><a href="#!"><span>Comments</span> <i className="fa fa-commenting-o" aria-hidden="true"></i></a> </li>
                                    {/*<li><a href="#!"><span>Share Now</span>  <i className="fa fa-facebook" aria-hidden="true"></i></a> </li>
                                    <li><a href="#!@todo"><i className="fa fa-google-plus" aria-hidden="true"></i></a> </li>
                                    <li><a href="#!@todo"><i className="fa fa-twitter" aria-hidden="true"></i></a> </li>
                                    <li><a href="#!@todo"><i className="fa fa-linkedin" aria-hidden="true"></i></a> </li>
                                    <li><a href="#!@todo"><i className="fa fa-youtube" aria-hidden="true"></i></a> </li>*/}
                                </ul>
                            </div>
                        </li>
                    )
                }
            })
        }
        else{
            return "Sem avaliações!"
        }
    }
    

    render(){
        return(
            <div className="pglist-p3 pglist-bg pglist-p-com" >
                <span id="ld-rer"></span>
                <div className="pglist-p-com-ti">
                    <h3><span>Avaliações dos</span> Usuários</h3> </div>
                <div className="list-pg-inn-sp">
                    <div className="lp-ur-all">
                        <div className="lp-ur-all-left">
                            <div className="lp-ur-all-left-1">
                                <div className="lp-ur-all-left-11">Excelente</div>
                                <div className="lp-ur-all-left-12">
                                    <div className="lp-ur-all-left-13"></div>
                                </div>
                            </div>
                            <div className="lp-ur-all-left-1">
                                <div className="lp-ur-all-left-11">Boa</div>
                                <div className="lp-ur-all-left-12">
                                    <div className="lp-ur-all-left-13 lp-ur-all-left-Good"></div>
                                </div>
                            </div>
                            <div className="lp-ur-all-left-1">
                                <div className="lp-ur-all-left-11">Satisfatoria</div>
                                <div className="lp-ur-all-left-12">
                                    <div className="lp-ur-all-left-13 lp-ur-all-left-satis"></div>
                                </div>
                            </div>
                            <div className="lp-ur-all-left-1">
                                <div className="lp-ur-all-left-11">Abaixo da Média</div>
                                <div className="lp-ur-all-left-12">
                                    <div className="lp-ur-all-left-13 lp-ur-all-left-below"></div>
                                </div>
                            </div>
                            <div className="lp-ur-all-left-1">
                                <div className="lp-ur-all-left-11">Ruim</div>
                                <div className="lp-ur-all-left-12">
                                    <div className="lp-ur-all-left-13 lp-ur-all-left-poor"></div>
                                </div>
                            </div>
                        </div>
                        <div className="lp-ur-all-right">
                            <h5>Média dos Votos</h5>
                            {this.getAvaliacaoMedia(this.props.review)}
                            
                        </div>
                    </div>
                    <div className="lp-ur-all-rat">
                        <h5>Avaliações</h5>
                        <ul>
                            {this.getAvaliacoes(this.props.comments)}               
                            
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

export default Reviews;