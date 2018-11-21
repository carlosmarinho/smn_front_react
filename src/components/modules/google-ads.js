import React, { Component } from 'react';
import windowSize from 'react-window-size';


class GoogleAds extends Component {

    constructor(){
        super()

        this.state = {
            myWidth: 500
        }
    }

    componentDidMount () {
        
        (window.adsbygoogle = window.adsbygoogle || []).push({});

        console.log("my width props: ", this.props.windowWidth);
        this.setState({
            myWidth: this.props.windowWidth
        })
    }

    getAdsenseByWidth(width=0){
        //console.log("iidth: ", this.state.teste)
        if(width <= 450){
            return(
                <div className="adsense-mobile">
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
                <div className="adsense-tablet">
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
                <div className="adsense-desktop">                   
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
                <div className="adsense-desktop-big">              
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
        let width = this.state.myWidth;
        if(width === 500){
            return null;

            console.log("width no null: ", width);
        }
        else{
            return <div>minha divdididididiididid</div>
        }

        /* console.log("width: ", width);
        return(
            <div className="text-center">
                {this.getAdsenseByWidth(width)}
            </div>
        ) */
    }

}

export default windowSize(GoogleAds);