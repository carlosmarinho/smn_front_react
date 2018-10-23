import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Paginate extends Component {

    componentDidMount() {
        
    }

   
    render(){
        let total = this.props.totalItemsCount;
        let perPage = this.props.itemsCountPerPage;
        let totalPage = total/perPage;
        let pages = []
        let path = this.props.pathname.replace(/page\/[0-9]*/g,'');

        let activePage = this.props.activePage;

        console.log("this.propspathname: ", path);

        pages.push(<li class={(activePage==1)?'disabled':''}><Link to={(activePage>1)?`${path}page/${activePage-1}`:'#'}><i class="material-icons">chevron_left</i></Link> </li>)
        for(let i=1; i<= totalPage; i++){
            pages.push(<li class={(i==activePage)?'active':''}><Link to={path + 'page/' + i}>{i}</Link></li>)
        }
        pages.push(<li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a> </li>)

        return(
            <ul class="pagination list-pagenat">
                {pages}
            </ul>
        )

    }
}


export default Paginate;