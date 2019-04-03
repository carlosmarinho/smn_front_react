import React, { Component } from 'react';
import MenuDashboardLeft from '../menu-dashboard-left';
import {connect} from 'react-redux';

import {fetchGuiasByUser} from '../../actions/guia';


class Dashboard extends Component{

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem('user'));
        console.log("user aqui no dashboard: ", user);

        this.props.fetchGuiasByUser(user.user.id);
    }

    render(){
        return(
            <section>
                <div className="tz">
                    {/* <!--LEFT SECTION--> */}
                    <MenuDashboardLeft />
                    
                    { /*!--CENTER SECTION--> */}
                    <div className="tz-2">
                        <div className="tz-2-com tz-2-main">
                            <h4>Minha Dashboard</h4>
                            <div className="tz-2-main-com">
                                <div className="tz-2-main-1">
                                    <div className="tz-2-main-2"> <img src="images/icon/d1.png" alt="" /><span>Guias</span>
                                        <p>Total de guias cadastrados</p>
                                        <h2>04</h2> </div>
                                </div>
                                <div className="tz-2-main-1">
                                    <div className="tz-2-main-2"> <img src="images/icon/d1.png" alt="" /><span>Eventos</span>
                                        <p>Total de eventos cadastrados</p>
                                        <h2>69</h2> </div>
                                </div>
                                <div className="tz-2-main-1">
                                    <div className="tz-2-main-2"> <img src="images/icon/d1.png" alt="" /><span>Notícias</span>
                                        <p>Total de notícias cadastradas</p>
                                        <h2>53</h2> </div>
                                </div>
                            </div>
                            <div className="db-list-com tz-db-table">
                                <div className="ds-boar-title">
                                    <h2>Guias Comerciais/Serviços</h2>
                                    <p>Listagem de seus guias comercias/serviços</p>
                                </div>
                                <table className="responsive-table bordered">
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Date</th>
                                            <th>tipo</th>
                                            <th>Status</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Taj Luxury Hotel & Resorts</td>
                                            <td>12 May 2017</td>
                                            <td><span className="db-list-rat">4.2</span>
                                            </td>
                                            <td><span className="db-list-ststus">Active</span>
                                            </td>
                                            <td><a href="db-listing-edit.html" className="db-list-edit">Edit</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Joney Health and Fitness</td>
                                            <td>12 May 2017</td>
                                            <td><span className="db-list-rat">3.4</span>
                                            </td>
                                            <td><span className="db-list-ststus-na">Non-Active</span>
                                            </td>
                                            <td><a href="db-listing-edit.html" className="db-list-edit">Edit</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Effi Furniture Dealers</td>
                                            <td>12 May 2017</td>
                                            <td><span className="db-list-rat">5.0</span>
                                            </td>
                                            <td><span className="db-list-ststus-na">Non-Active</span>
                                            </td>
                                            <td><a href="db-listing-edit.html" className="db-list-edit">Edit</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="db-list-com tz-db-table">
                                <div className="ds-boar-title">
                                    <h2>Eventos</h2>
                                    <p>Listagem de seus eventos</p>
                                </div>
                                <table className="responsive-table bordered">
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Início</th>
                                            <th>Fim</th>
                                            <th>Bairro</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Taj Luxury Hotel & Resorts</td>
                                            <td>142</td>
                                            <td><span className="db-list-rat">Done</span>
                                            </td>
                                            <td><span className="db-list-ststus">Premium</span>
                                            </td>
                                            <td><a href="db-payment.html" className="db-list-edit">Payment</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Joney Health and Fitness</td>
                                            <td>53</td>
                                            <td><span className="db-list-rat">Done</span>
                                            </td>
                                            <td><span className="db-list-ststus-na">Free</span>
                                            </td>
                                            <td><a href="db-payment.html" className="db-list-edit">Payment</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Effi Furniture Dealers</td>
                                            <td>76</td>
                                            <td><span className="db-list-ststus-na">No</span>
                                            </td>
                                            <td><span className="db-list-ststus-na">Free</span>
                                            </td>
                                            <td><a href="db-payment.html" className="db-list-edit">Payment</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="db-list-com tz-db-table">
                                <div className="ds-boar-title">
                                    <h2>Notícias</h2>
                                    <p>Listagem de suas Notícias</p>
                                </div>
                                <div className="tz-mess">
                                    <ul>
                                        <li className="view-msg">
                                            <h5><img src="images/users/1.png" alt="" />Listing Enquiry <span className="tz-msg-un-read">unread</span></h5>
                                            <p>Nulla egestas leo elit, eu sollicitudin diam suscipit non. Nunc imperdiet hendrerit mi, mollis sagittis risus accumsan ac.</p>
                                            <div className="hid-msg"><a href="#"><i className="fa fa-eye" title="view"></i></a><a href="#"><i className="fa fa-trash" title="delete"></i></a>
                                            </div>
                                        </li>
                                        <li className="view-msg">
                                            <h5><img src="images/users/4.png" alt="" />Request for meet <span className="tz-msg-read">unread</span></h5>
                                            <p>Duis nulla ligula, interdum porta nulla sed, efficitur tempus lacus. Quisque facilisis, sapien tempor mollis sollicitudin, urna ligula vulputate nulla, rhoncus faucibus justo mauris eget elit.Pellentesque eget pellentesque dolor.</p>
                                            <div className="hid-msg"><a href="#"><i className="fa fa-eye" title="view"></i></a><a href="#"><i className="fa fa-trash" title="delete"></i></a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                             {/*@todo implement reviews
                            <div className="db-list-com tz-db-table">
                                <div className="ds-boar-title">
                                    <h2>Reviews</h2>
                                    <p>All the Lorem Ipsum generators on the All the Lorem Ipsum generators on the</p>
                                </div>
                                <div className="tz-mess">
                                    <ul>
                                        <li className="view-msg">
                                            <h5><img src="images/users/1.png" alt="" />Jessica <span className="tz-revi-star"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half-o"></i></span></h5>
                                            <p>Cras viverra ligula ut sem tincidunt, et volutpat dui facilisis. Nulla congue arcu vitae lectus cursus finibus. Pellentesque consequat ante eu elit tincidunt pharetra.</p>
                                            <div className="hid-msg"><a href="#!"><i className="fa fa-check" title="approve this review"></i></a><a href="#!"><i className="fa fa-edit" title="edit"></i></a><a href="#!"><i className="fa fa-trash" title="delete"></i></a><a href="#!"><i className="fa fa-reply edit-replay" title="replay"></i></a>
                                                <form className="col s12 hide-box">
                                                    <div className="">
                                                        <div className="input-field col s12">
                                                            <textarea className="materialize-textarea"></textarea>
                                                            <label>Write your replay</label>
                                                        </div>
                                                        <div className="input-field col s12">
                                                            <input type="submit" value="Submit" className="waves-effect waves-light btn-large" /> </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </li>
                                        <li className="view-msg">
                                            <h5><img src="images/users/1.png" alt="" />	Christopher <span className="tz-revi-star"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half-o"></i></span></h5>
                                            <p>Duis nulla ligula, interdum porta nulla sed, efficitur tempus lacus. Quisque facilisis, sapien tempor mollis sollicitudin, urna ligula vulputate nulla, rhoncus faucibus justo mauris eget elit.Pellentesque eget pellentesque dolor.</p>
                                            <div className="hid-msg"><a href="#!"><i className="fa fa-check" title="approve this review"></i></a><a href="#!"><i className="fa fa-edit" title="edit"></i></a><a href="#!"><i className="fa fa-trash" title="delete"></i></a><a href="#!"><i className="fa fa-reply edit-replay" title="replay"></i></a>
                                                <form className="col s12 hide-box">
                                                    <div className="">
                                                        <div className="input-field col s12">
                                                            <textarea className="materialize-textarea"></textarea>
                                                            <label>Write your replay</label>
                                                        </div>
                                                        <div className="input-field col s12">
                                                            <input type="submit" value="Submit" className="waves-effect waves-light btn-large" /> </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>*/}
                        </div>
                    </div>
                    { /*!--RIGHT SECTION--> */}
                    { /*@todo implement notification 
                    <div className="tz-3">
                        <h4>Notifications(18)</h4>
                        <ul>
                            <li>
                                <a href="#!"> <img src="images/icon/dbr1.jpg" alt="" />
                                    <h5>Joseph, write a review</h5>
                                    <p>All the Lorem Ipsum generators on the</p>
                                </a>
                            </li>
                            <li>
                                <a href="#!"> <img src="images/icon/dbr2.jpg" alt="" />
                                    <h5>14 New Messages</h5>
                                    <p>All the Lorem Ipsum generators on the</p>
                                </a>
                            </li>
                            <li>
                                <a href="#!"> <img src="images/icon/dbr3.jpg" alt="" />
                                    <h5>Ads expairy soon</h5>
                                    <p>All the Lorem Ipsum generators on the</p>
                                </a>
                            </li>
                            <li>
                                <a href="#!"> <img src="images/icon/dbr4.jpg" alt="" />
                                    <h5>Post free ads - today only</h5>
                                    <p>All the Lorem Ipsum generators on the</p>
                                </a>
                            </li>
                            <li>
                                <a href="#!"> <img src="images/icon/dbr5.jpg" alt="" />
                                    <h5>listing limit increase</h5>
                                    <p>All the Lorem Ipsum generators on the</p>
                                </a>
                            </li>
                            <li>
                                <a href="#!"> <img src="images/icon/dbr6.jpg" alt="" />
                                    <h5>mobile app launch</h5>
                                    <p>All the Lorem Ipsum generators on the</p>
                                </a>
                            </li>
                            <li>
                                <a href="#!"> <img src="images/icon/dbr7.jpg" alt="" />
                                    <h5>Setting Updated</h5>
                                    <p>All the Lorem Ipsum generators on the</p>
                                </a>
                            </li>
                            <li>
                                <a href="#!"> <img src="images/icon/dbr8.jpg" alt="" />
                                    <h5>Increase listing viewers</h5>
                                    <p>All the Lorem Ipsum generators on the</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                */} 
                </div>
            </section>
        )
    }
}


function mapStateToProps(state){
    return(
        {
            user: state.users,
            guia: state.guias
        }
    )
    
}

export default connect(mapStateToProps, {fetchGuiasByUser})(Dashboard);
