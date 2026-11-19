import Script from 'next/script'

const GTM_ID = 'GTM-MQ9HVWVM'

/**
 * Google Tag Manager container supplied by the marketing agency. Rendered
 * once in the root layout so it runs on every page. The container's own
 * configuration decides what gets tracked, so there is no
 * `gtag('config', …)` call here.
 *
 * The agency's snippet leaves out the `gtm.start` push from Google's
 * official one. Without it the `gtm.js` event never fires, so any trigger
 * on Page View / All Pages stays silent. Keep it.
 */
export function GoogleTag() {
  return (
    <>
      <Script id="google-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        strategy="afterInteractive"
      />
    </>
  )
}
