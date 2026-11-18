import Script from 'next/script'

const GOOGLE_TAG_ID = 'GTM-M8RF7P39'

/**
 * Google tag supplied by the marketing agency. Rendered once in the root
 * layout so it runs on every page. The container's own configuration
 * decides what gets tracked, so there is no `gtag('config', …)` call here.
 */
export function GoogleTag() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        `}
      </Script>
    </>
  )
}
