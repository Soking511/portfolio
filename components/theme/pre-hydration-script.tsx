/**
 * Runs before React hydrates. Two jobs:
 *
 *  1. Stamp data-theme from localStorage so the first paint already matches
 *     the persisted preference (no FOUC). Language is not stored: lang and
 *     dir come from the page itself — "/" is English, "/ar/" is Arabic.
 *  2. Fall back to the OS colour scheme when nothing is stored.
 *
 * There is no scroll-reveal any more, so nothing on the page is ever hidden
 * waiting for JavaScript.
 */
const SCRIPT = `
(function(){
  var root=document.documentElement;
  try {
    var theme=localStorage.getItem('portfolio:theme');
    if(theme!=='dark'&&theme!=='light'){
      theme=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
    }
    root.setAttribute('data-theme',theme);
  } catch (_) {}
})();
`.trim();

export function PreHydrationScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
