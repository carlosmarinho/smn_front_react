import React, { Component } from 'react';

class GoogleAds extends Component {

    componentDidMount () {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render(){
       
        return(
            <div className="text-center">
                <div className="adsense-desktop">
                    {/*<!-- Soumaisniteroi banner grande 970x90 -->*/}
                    <ins className="adsbygoogle"
                        style={{display:'inline-block',width:'970px',height:'90px'}}
                        data-ad-client="ca-pub-7471205086445538"
                        data-ad-slot="7942069085"></ins>
                </div>
                <div className="adsense-tablet-big">
                    {/*<!-- soumaisniteroi Cabeçalho 728x90 -->*/}
                    <ins className="adsbygoogle"
                        style={{display:'inline-block',width:'728px',height:'90px'}}
                        data-ad-client="ca-pub-7471205086445538"
                        data-ad-slot="4780433715"></ins>
                </div>
                <div className="adsense-mobile">
                    {/*<!-- Soumaisniteroi Responsivo -->*/}
                    <ins className="adsbygoogle"
                        style={{display:'block'}}
                        data-ad-client="ca-pub-7471205086445538"
                        data-ad-slot="6155921103"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
            </div>
        )
    }

}

export default GoogleAds;