import React, { Component } from 'react';
import windowSize from 'react-window-size';


class GoogleAds extends Component {

    constructor(){
        super();

        this.state = {
                        width: 0,
                        teste: 10,
                     }

        this.getAdsenseByWidth = this.getAdsenseByWidth.bind(this);
    }

    componentDidMount () {
        (window.adsbygoogle = window.adsbygoogle || []).push({});

        //this.setState({windowWidth: this.props.windowWidth});
        
    }

    componentWillReceiveProps(nextProps) {
        /* if(nextProps && nextProps.windowWidth)
            this.setState({windowWidth: nextProps.windowWidth}); */
    }

    getAdsenseByWidth(width=0){
        //console.log("iidth: ", this.state.teste)
        if(width <= 450){
            return(
                <div className="adsense-mobile">adsense-mobile
                    {/*<!-- Soumaisniteroi Responsivo -->*/}
                    <ins className="adsbygoogle"
                        style={{display:'block'}}
                        data-ad-client="ca-pub-7471205086445538"
                        data-ad-slot="6155921103"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
            )
        }
        else if(width <= 727){
            return(
                <div className="adsense-tablet">adsense-tablllllet
                    {/*<!-- soumaisniteroi horizontal 468x60 -->*/}
                    <ins className="adsbygoogle"
                        style={{display:'inline-block',width:'468px',height:'60px'}}
                        data-ad-client="ca-pub-7471205086445538"
                        data-ad-slot="8029413581"></ins>
                </div>
            )
        }
        else if(width < 992){
            return(
                <div className="adsense-desktop">adsense-deskkkkktoopp                    
                    {/*<!-- soumaisniteroi Cabeçalho 728x90 -->*/}
                    <ins className="adsbygoogle"
                        style={{display:'inline-block',width:'728px',height:'90px'}}
                        data-ad-client="ca-pub-7471205086445538"
                        data-ad-slot="4780433715"></ins>
                </div>
            )
        }
        else{
            return(
                <div className="adsense-desktop-big">adsense-desktoppp-biiiiig                    
                    {/*<!-- Soumaisniteroi banner grande 970x90 -->*/}
                    <ins className="adsbygoogle"
                        style={{display:'inline-block',width:'970px',height:'90px'}}
                        data-ad-client="ca-pub-7471205086445538"
                        data-ad-slot="7942069085"></ins>
                </div>
            )
        }

    }

    render(){
        //console.log("window width: ", this.state.windowWidth)
        return(
            <div className="text-center">
                {this.getAdsenseByWidth()}
            </div>
        )
    }

}

export default windowSize(GoogleAds)
