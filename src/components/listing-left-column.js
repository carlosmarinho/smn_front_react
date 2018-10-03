import React, { Component } from 'react';
import LeftWidgetLink from './modules/left-widget-link';
import WidgetFilterCheckbox from './modules/widget-filter-checkbox';

class ListingLeftColumn extends Component {
    render(){
        return(
            <div className="col-md-3 dir-alp-con-left">
                <LeftWidgetLink title="Guias Recentes" objects={this.props.objects} />

                <WidgetFilterCheckbox title="Filtro de Categoria" objects={this.props.objects} />                

                {/*<!--==========Sub Category Filter============-->*/}
                <div className="dir-alp-l3 dir-alp-l-com">
                    <h4>Distance</h4>
                    <div className="dir-alp-l-com1 dir-alp-p3">
                        <form>
                            <ul>
                                <li>
                                    <input className="with-gap" name="group1" type="radio" id="ldis1" />
                                    <label htmlFor="ldis1">00 to 02km</label>
                                </li>
                                <li>
                                    <input className="with-gap" name="group1" type="radio" id="ldis2" />
                                    <label htmlFor="ldis2">02 to 05km</label>
                                </li>
                                <li>
                                    <input className="with-gap" name="group1" type="radio" id="ldis3" />
                                    <label htmlFor="ldis3">05 to 10km</label>
                                </li>
                                <li>
                                    <input className="with-gap" name="group1" type="radio" id="ldis4" />
                                    <label htmlFor="ldis4">10 to 20km</label>
                                </li>
                                <li>
                                    <input className="with-gap" name="group1" type="radio" id="ldis5" />
                                    <label htmlFor="ldis5">20 to 30km</label>
                                </li>
                            </ul>
                        </form> <a href="#!" className="list-view-more-btn">view more</a> </div>
                </div>
                {/*<!--==========End Sub Category Filter============-->*/}
                {/*<!--==========Sub Category Filter============-->*/}
                <div className="dir-alp-l3 dir-alp-l-com">
                    <h4>Ratings</h4>
                    <div className="dir-alp-l-com1 dir-alp-p3">
                        <form>
                            <ul>
                                <li>
                                    <input type="checkbox" className="filled-in" id="lr1" />
                                    <label htmlFor="lr1"> <span className="list-rat-ch"> <span>5.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> </span>
                                    </label>
                                </li>
                                <li>
                                    <input type="checkbox" className="filled-in" id="lr2" />
                                    <label htmlFor="lr2"> <span className="list-rat-ch"> <span>4.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </span>
                                    </label>
                                </li>
                                <li>
                                    <input type="checkbox" className="filled-in" id="lr3" />
                                    <label htmlFor="lr3"> <span className="list-rat-ch"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </span>
                                    </label>
                                </li>
                                <li>
                                    <input type="checkbox" className="filled-in" id="lr4" />
                                    <label htmlFor="lr4"> <span className="list-rat-ch"> <span>2.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </span>
                                    </label>
                                </li>
                                <li>
                                    <input type="checkbox" className="filled-in" id="lr5" />
                                    <label htmlFor="lr5"> <span className="list-rat-ch"> <span>1.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </span>
                                    </label>
                                </li>
                            </ul>
                        </form> <a href="javascript:void(0);" className="list-view-more-btn">view more</a> </div>
                </div>
                {/*<!--==========End Sub Category Filter============-->*/}
            </div>
            
        )
    }
}

export default ListingLeftColumn;