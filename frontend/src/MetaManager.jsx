// src/components/MetaManager.jsx
import React from "react";
import { Helmet } from "react-helmet";

const MetaManager = () => {
  return (
    <>
      <Helmet>
        {/* ✅ Primary Meta Tags */}
        <title>IIRHE - Institute for Inclusive Rehabilitation & Holistic Education</title>
        <meta
          name="description"
          content="Empowering differently-abled individuals with inclusive education, therapy, and research at IIRHE."
        />
        <meta
          name="keywords"
          content="IIRHE, rehabilitation, therapy, inclusive education, special needs, India"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://iirhe.org.in/" />

        {/* ✅ Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="IIRHE - Holistic Rehabilitation in India" />
        <meta property="og:description" content="Rehabilitating lives through care, education, and empowerment." />
        <meta property="og:image" content="https://iirhe.org.in/your-og-image.jpg" />
        <meta property="og:url" content="https://iirhe.org.in/" />

        {/* ✅ Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IIRHE - Education & Therapy" />
        <meta name="twitter:description" content="Inclusive learning and support for special needs in India." />
        <meta name="twitter:image" content="https://iirhe.org.in/your-twitter-image.jpg" />

        {/* ✅ Google Tag Manager */}
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-123456');
          `}
        </script>

        {/* ✅ Facebook Pixel */}
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </script>

        {/* ✅ Corrected noscript string */}
        <noscript>
          {`<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1" />`}
        </noscript>
      </Helmet>
    </>
  );
};

export default MetaManager;
