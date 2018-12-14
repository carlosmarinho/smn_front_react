import React, { Component } from 'react';
import windowSize from 'react-window-size';
import ReactGoogleAdsense from 'react-google-adsense';


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
        if(width <= 336 ){
            console.log("\n\n\n caramba é menor que 319")
            return(
                <div className="adsense-mobile-small">
                    {/*
                    <!-- Soumaisniteroi Responsivo -->
                    <Adsense.Google
                        client='ca-pub-7471205086445538'
                        slot='7591235782'
                        style={{ display: 'block' }}
                        format='link'
                        responsive='true'
                    />

                    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    <!-- soumaisniteroi 180x150 -->
                    <ins class="adsbygoogle"
                        style="display:inline-block;width:180px;height:150px"
                        data-ad-client="ca-pub-7471205086445538"
                        data-ad-slot="4702893159"></ins>
                    <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>

                      <Adsense.Google
                            client='ca-pub-7471205086445538'
                            slot='4917284641'
                            style={{display:'inline-block',width:'200px',height:'200px'}}
                            format=''
                    />

                    */}

                    {/*<!-- soumaisniteroi quadrado 200 x 200-->*/}


                    <ReactGoogleAdsense
                            client='ca-pub-7471205086445538'
                            slot='4702893159'
                            style={{display:'inline-block',width:'180px',height:'150px'}}
                            format=''
                    />
                    
                </div>
            )

        }
        else if(width <= 450){
            console.log("\n\n\n caracoles é menor que 450 ------- ")
            return(
                <div className="adsense-mobile">
                    {/*<!-- Soumaisniteroi Responsivo -->
                    <Adsense.Google
                        client='ca-pub-7471205086445538'
                        slot='6155921103'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />*/}

                    {/*<!-- soumaisniteroi 320 x 100 -->*/}
                    <ReactGoogleAdsense
                        client='ca-pub-7471205086445538'
                        slot='1899404918'
                        style={{display:'inline-block',width:'320px',height:'100px'}}
                        format=''
                    />

                </div>
            )
        }
        else if(width <= 730){
            return(
                <div className="adsense-tablet">
                    {/*<!-- soumaisniteroi horizontal 468x60 -->*/}
                    <ReactGoogleAdsense
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
                    <ReactGoogleAdsense
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
                    <ReactGoogleAdsense
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