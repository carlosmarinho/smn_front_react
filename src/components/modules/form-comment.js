import React, { Component } from 'react';
import HeaderBlog from '../header-destaque-blog';

class FormComment extends Component {

    getDescription(){
        if(this.props.text)
            return (
                <p>{this.props.text}</p>
            )
        else 
            return (
                <p>Deixe os seus comentários relacionado com a matéria, ou mesmo deixe ideias e/ou sugestões para ajudar a contribuir com nossa cidade. Também não esqueça de deixar sua avaliação da matéria marcando as estrelinhas (quanto mais gostou mais estrelinhas você marca!).  </p>
            )

    }

    render(){
        return(
            <div className="pglist-p3 pglist-bg pglist-p-com" >
                <span id="ld-rew"></span>
                <div className="pglist-p-com-ti blog-comment">
                    <h3><span>Deixe seus</span> Comentários</h3> </div>
                <div className="list-pg-inn-sp">
                    <div className="list-pg-write-rev">
                        <form className="col">
                            {this.getDescription()}
                            <div className="row">
                                <div className="col s12">
                                    <fieldset className="rating">
                                        <input type="radio" id="star5" name="rating" value="5" />
                                        <label className="full" for="star5" title="Awesome - 5 stars"></label>
                                        <input type="radio" id="star4half" name="rating" value="4 and a half" />
                                        <label className="half" for="star4half" title="Pretty good - 4.5 stars"></label>
                                        <input type="radio" id="star4" name="rating" value="4" />
                                        <label className="full" for="star4" title="Pretty good - 4 stars"></label>
                                        <input type="radio" id="star3half" name="rating" value="3 and a half" />
                                        <label className="half" for="star3half" title="Meh - 3.5 stars"></label>
                                        <input type="radio" id="star3" name="rating" value="3" />
                                        <label className="full" for="star3" title="Meh - 3 stars"></label>
                                        <input type="radio" id="star2half" name="rating" value="2 and a half" />
                                        <label className="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
                                        <input type="radio" id="star2" name="rating" value="2" />
                                        <label className="full" for="star2" title="Kinda bad - 2 stars"></label>
                                        <input type="radio" id="star1half" name="rating" value="1 and a half" />
                                        <label className="half" for="star1half" title="Meh - 1.5 stars"></label>
                                        <input type="radio" id="star1" name="rating" value="1" />
                                        <label className="full" for="star1" title="Sucks big time - 1 star"></label>
                                        <input type="radio" id="starhalf" name="rating" value="half" />
                                        <label className="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
                                    </fieldset>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="re_name" type="text" className="validate" />
                                    <label for="re_name">Nome</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="re_mob" type="number" className="validate" />
                                    <label for="re_mob">Celular</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="re_mail" type="email" className="validate" />
                                    <label for="re_mail">Email</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="re_district" type="text" className="validate" />
                                    <label for="re_district">Bairro</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea id="re_msg" className="materialize-textarea"></textarea>
                                    <label for="re_msg">Commentário</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12"> <a className="waves-effect waves-light btn-large full-btn" href="#!">Enviar</a> </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default FormComment;