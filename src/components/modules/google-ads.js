import React, { Component } from 'react';
import windowSize from 'react-window-size';
import Adsense from 'react-adsense';


class GoogleAds extends Component {

    constructor(){
        super()

        this.state = {
            myWidth: 0
        }
    }

    componentDidMount () {
        
        

        console.log("my width props: ", this.props.windowWidth);
        this.setState({
            myWidth: this.props.windowWidth
        })
        
        //if(this.state.myWidth != 0)
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.windowWidth){
            
            
            console.log("vou setar o state aqui");
        }
    }

    getAdsenseByWidth(width=0){
        //console.log("iidth: ", this.state.teste)
        if(width <= 450){
            return(
                <div className="adsense-mobile">
                    {/*<!-- Soumaisniteroi Responsivo -->*/}
                    <Adsense.Google
                        client='ca-pub-7471205086445538'
                        slot='6155921103'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />
                </div>
            )
        }
        else if(width <= 727){
            return(
                <div className="adsense-tablet">
                    {/*<!-- soumaisniteroi horizontal 468x60 -->*/}
                    <Adsense.Google
                        client='ca-pub-7471205086445538'
                        slot='8029413581'
                        style={{display:'inline-block',width:'468px',height:'60px'}}
                        format=''
                    />
                </div>
            )
        }
        else if(width < 992){
            return(
                <div className="adsense-desktop">                   
                    {/*<!-- soumaisniteroi Cabeçalho 728x90 -->*/}
                    <Adsense.Google
                        client='ca-pub-7471205086445538'
                        slot='4780433715'
                        style={{display:'inline-block',width:'728px',height:'90px'}}
                        format=''
                    />
                </div>
            )
        }
        else{
            return(
                <div className="adsense-desktop-big">              
                    {/*<!-- Soumaisniteroi banner grande 970x90 -->*/}
                    <Adsense.Google
                        client='ca-pub-7471205086445538'
                        slot='7942069085'
                        style={{display:'inline-block',width:'970px',height:'90px'}}
                        format=''
                    />
                </div>
            )
        }

    }

    render(){
        let width = this.state.myWidth;
        console.log("minha width no render: ", width)
        if(width === 0){
            console.log("width no null: ", width);
            return null;

        }
        else{

            console.log("width: ", width);
            return(
                <div className="text-center">
                    {this.getAdsenseByWidth(width)}
                    
                </div>
            ) 
        }
    }

}

export default windowSize(GoogleAds);