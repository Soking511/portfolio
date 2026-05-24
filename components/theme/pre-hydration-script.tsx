/**
 * Stamps data-style, data-theme, lang, dir, and --accent onto <html> from
 * localStorage BEFORE React hydrates, so the initial paint matches the
 * persisted theme/lang and there's no FOUC.
 */
const SCRIPT = `
(function(){
  try {
    var TWEAK_KEY='portfolio:tweaks';
    var LANG_KEY='portfolio:lang';
    var raw=localStorage.getItem(TWEAK_KEY);
    var t=raw?JSON.parse(raw):null;
    var style=(t&&t.style)||'studio';
    var theme=(t&&t.theme)||'light';
    var accentStudio=(t&&t.accentStudio)||'#2D5BFF';
    var accentEditorial=(t&&t.accentEditorial)||'#7C5CFF';
    var lang=localStorage.getItem(LANG_KEY)||'en';
    var dir=lang==='ar'?'rtl':'ltr';
    var root=document.documentElement;
    root.setAttribute('data-style',style);
    root.setAttribute('data-theme',theme);
    root.setAttribute('lang',lang);
    root.setAttribute('dir',dir);
    root.style.setProperty('--accent',style==='studio'?accentStudio:accentEditorial);
  } catch (_) {}
})();
`.trim();

export function PreHydrationScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
