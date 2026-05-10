import Script from "next/script";

const ymId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const ymNum = ymId ? Number(ymId) : NaN;
const ymOk = Number.isFinite(ymNum);

export function AnalyticsScripts() {
  if (!ymOk && !gaId) return null;

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(gaId)}, { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {ymOk ? (
        <>
          <Script id="ym-loader" strategy="afterInteractive">
            {`
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${ymNum}, "init", {
  clickmap:true,
  trackLinks:true,
  accurateTrackBounce:true,
  webvisor:true
});
            `}
          </Script>
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://mc.yandex.ru/watch/${ymNum}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
                width={1}
                height={1}
              />
            </div>
          </noscript>
        </>
      ) : null}
    </>
  );
}
