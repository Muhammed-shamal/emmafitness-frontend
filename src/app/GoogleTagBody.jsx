'use client'
function GoogleTagBody (){
    return (


         <noscript dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N3C44FKD"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}></noscript>
  
    )
}

export default GoogleTagBody