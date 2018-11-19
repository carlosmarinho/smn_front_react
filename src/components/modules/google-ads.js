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
                <div className="adsense-tablet">
                    {/*<!-- soumaisniteroi horizontal 468x60 -->*/}
                    <ins className="adsbygoogle"
                        style={{display:'inline-block',width:'468px',height:'60px'}}
                        data-ad-client="ca-pub-7471205086445538"
                        data-ad-slot="8029413581"></ins>
                </div>
                <div className="adsense-mobile">
                    {/*<!-- soumaisniteroi banner mobile 320 x 100 -->*/}
                    <ins className="adsbygoogle"
                        style={{display:'inline-block',width:'320px',height:'100px'}}
                        data-ad-client="ca-pub-7471205086445538"
                        data-ad-slot="1899404918"></ins>
                </div>
                <div className="adsense-small-square">
                    {/*<!-- Soumaisniteroi quadrado 200x200 -->*/}
                    <ins className="adsbygoogle"
                        style={{display:'inline-block',width:'200px',height:'200px'}}
                        data-ad-client="ca-pub-7471205086445538"
                        data-ad-slot="4917284641"></ins>
                </div>
            </div>
        )
    }

}

export default GoogleAds;