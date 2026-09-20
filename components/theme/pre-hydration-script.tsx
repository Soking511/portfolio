/**
 * Runs before React hydrates. Three jobs:
 *
 *  1. Stamp data-theme, lang and dir from localStorage so the first paint
 *     already matches the persisted preference (no FOUC).
 *  2. Fall back to the OS colour scheme when nothing is stored.
 *  3. Set data-reveal-ready, which is the ONLY thing that arms the
 *     scroll-reveal hidden state in globals.css. Without JavaScript, or under
 *     prefers-reduced-motion, the attribute is never set and every element
 *     stays visible — content is never hidden behind an animation that may
 *     not run.
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
    var lang=localStorage.getItem('portfolio:lang')==='ar'?'ar':'en';
    root.setAttribute('lang',lang);
    root.setAttribute('dir',lang==='ar'?'rtl':'ltr');
  } catch (_) {}
  try {
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!reduce) root.setAttribute('data-reveal-ready','');
  } catch (_) {}
})();
`.trim();

export function PreHydrationScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
