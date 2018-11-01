import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Paginate extends Component {

    componentDidMount() {
        
    }

   
    render(){
        let rangePage = 9;
        let total = this.props.totalItemsCount;
        let perPage = this.props.itemsCountPerPage;
        let totalPage = Math.ceil(total/perPage);
        let pages = []
        let path = this.props.pathname;
        if(path.slice(-1) !== '/' && !path.includes('page/'))
            path += "/";

        path = path.replace(/page\/[0-9]*/g,'');

        let activePage = this.props.activePage;

        

        let i = 1;
        if(activePage-5>0)
            i = activePage - 5;

            
        let finalRange = i+rangePage;
        
        if(finalRange > totalPage ){
            finalRange = totalPage;
            if(totalPage-rangePage>0)
                i = totalPage - rangePage;
        }

        let firstPage = <i className="material-icons">first_page</i>;
        let lastPage = <i className="material-icons">last_page</i>;
        let previous = <i className="material-icons">chevron_left</i>;
        let next = <i className="material-icons">chevron_right</i>;

        if(this.props.firstPageText)
            firstPage = this.props.firstPageText
        
        if(this.props.lastPageText)
            lastPage = this.props.lastPageText

        if(this.props.prevPageText)
            previous = this.props.prevPageText

        if(this.props.nextPageText)
            next = this.props.nextPageText
            
        pages.push(<li class={(activePage===1)?'disabled':''}><Link to={`${path}page/1`}>{firstPage}</Link> </li>)
        pages.push(<li class={(activePage===1)?'disabled':''}><Link to={(activePage>1)?`${path}page/${activePage-1}`:'#'}>{previous}</Link> </li>)
        
        for(i; i<= finalRange; i++){
            pages.push(<li class={(i===activePage)?'active':''}><Link to={path + 'page/' + i}>{i}</Link></li>)
        }

        pages.push(<li class={(activePage===totalPage)?'disabled waves-effect':'waves-effect'}><Link to={(activePage<totalPage)?`${path}page/${(parseInt(activePage)+1)}`:'#'}>{next}</Link> </li>)
        pages.push(<li class={(activePage===totalPage)?'disabled waves-effect':'waves-effect'}><Link to={`${path}page/${totalPage}`}>{lastPage}</Link> </li>)

        return(
            <ul class="pagination list-pagenat">
                {pages}
            </ul>
        )

    }
}


export default Paginate;