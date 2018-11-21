import React, { Component } from 'react';


class WidgetFilterStarsCollapsable extends Component {

    render(){
       

        return (
            <li>
                <div className={`collapsible-header  dir-alp-l3 dir-alp-l-com dir-alp-con-left-1 ${this.props.classActive}`}>
                    <h3>{this.props.title}</h3>
                </div>
                <div className="collapsible-body dir-alp-l-com1 dir-alp-p3 dir-alp-l3">
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
                    </form>
                </div>
            </li>
        );
    }
}

export default WidgetFilterStarsCollapsable;