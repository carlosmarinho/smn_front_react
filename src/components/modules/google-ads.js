import React, { Component } from 'react';

class GoogleAds extends Component {

    render(){
       
        return(
            <div className="text-center">
                <div className="adsense-desktop">
                    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    {/*<!-- Soumaisniteroi banner grande 970x90 -->*/}
                    <ins className="adsbygoogle"
                        style={{display:'inline-block',width:'970px',height:'90px'}}
                        data-ad-client="ca-pub-7471205086445538"
                        data-ad-slot="7942069085"></ins>
                    <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                </div>
                <div className="adsense-tablet-big">
                    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    {/*<!-- soumaisniteroi Cabeçalho 728x90 -->*/}
                    <ins className="adsbygoogle"
                        style={{display:'inline-block',width:'728px',height:'90px'}}
                        data-ad-client="ca-pub-7471205086445538"
                        data-ad-slot="4780433715"></ins>
                    <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                </div>
                <div className="adsense-tablet">
                    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    {/*<!-- soumaisniteroi horizontal 468x60 -->*/}
                    <ins className="adsbygoogle"
                        style={{display:'inline-block',width:'468px',height:'60px'}}
                        data-ad-client="ca-pub-7471205086445538"
                        data-ad-slot="8029413581"></ins>
                    <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                </div>
                <div className="adsense-mobile">
                    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    {/*<!-- soumaisniteroi banner mobile 320 x 100 -->*/}
                    <ins className="adsbygoogle"
                        style={{display:'inline-block',width:'320px',height:'100px'}}
                        data-ad-client="ca-pub-7471205086445538"
                        data-ad-slot="1899404918"></ins>
                    <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                </div>
                <div className="adsense-small-square">
                    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    {/*<!-- Soumaisniteroi quadrado 200x200 -->*/}
                    <ins className="adsbygoogle"
                        style={{display:'inline-block',width:'200px',height:'200px'}}
                        data-ad-client="ca-pub-7471205086445538"
                        data-ad-slot="4917284641"></ins>
                    <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                </div>
            </div>
        )
    }

}

export default GoogleAds;