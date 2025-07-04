import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(t,e){var o,n,p,r;e.__SV=1,window.posthog=e,e._i=[],e.init=function(i,s,a){
                function g(t,o){
                  var n=o.split(".");
                  2==n.length&&(t=t[n[0]],o=n[1]),
                  t[o]=function(){t.push([o].concat(Array.prototype.slice.call(arguments,0)))}}
                (p=t.createElement("script")).type="text/javascript",
                p.async=!0,p.src=s.api_host+"/static/array.js",
                (r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);
                var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],
                u.toString=function(t){var o="posthog";return"posthog"!==a&&(o+="."+a),t||(o+=" (stub)"),o},
                u.people.toString=function(){return u.toString(1)+".people (stub)"},
                o="capture identify alias people.set people.set_once people.unset".split(" "),
                n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},
                e.__SV=1;
              }(document,window.posthog||[]);
              posthog.init('phc_nnZa0MUcqsgUN6lrwjTHEnmsBbCOdqmJgOC0Z5CAzbY', { api_host: 'https://app.posthog.com' });
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
