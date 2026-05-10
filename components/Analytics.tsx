import Script from "next/script";
import { analytics } from "@/lib/site-config";

/**
 * Подключение скриптов Яндекс.Метрики и Google Analytics.
 * Рендерится только если выставлены соответствующие ENV-переменные:
 *
 * - NEXT_PUBLIC_YANDEX_METRIKA_ID
 * - NEXT_PUBLIC_GA_MEASUREMENT_ID
 *
 * TODO[real-data]: после получения реальных счётчиков задать эти переменные
 * на хостинге деплоя.
 */
export function Analytics() {
  return (
    <>
      {analytics.yandexMetrikaId ? (
        <>
          <Script id="yandex-metrika" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${JSON.stringify(analytics.yandexMetrikaId)}, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
              });
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://mc.yandex.ru/watch/${analytics.yandexMetrikaId}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </noscript>
        </>
      ) : null}

      {analytics.gaMeasurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${analytics.gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${JSON.stringify(analytics.gaMeasurementId)});
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
