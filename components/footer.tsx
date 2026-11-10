"use client";

import { useT } from "@/components/lang/provider";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, whatsappLink } from "@/lib/site";

// Kept here rather than in strings.ts: these are URLs, not copy, and they are
// identical in both languages. Professional profiles only: a personal social
// account is noise to someone deciding whether to hire.
const ELSEWHERE: Array<[string, string]> = [
  ["GitHub", GITHUB_URL],
  ["LinkedIn", LINKEDIN_URL],
  ["WhatsApp", whatsappLink()],
];

/**
 * Who, how to reach me, and where else I am. No sitemap columns: the header
 * already holds the page's sections, and repeating them here was template.
 */
export function Footer() {
  const { t } = useT();
  const F = t.footer;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <p className="wordmark">{t.hero.name}</p>
            <p className="soft">{F.identity_tagline}</p>
          </div>
          <a href={`mailto:${EMAIL}`} className="footer-email latin">
            {EMAIL}
          </a>
        </div>

        <div className="footer-bottom">
          <p>
            {F.copyright}. {F.colophon_text}
          </p>
          <ul className="footer-links">
            {ELSEWHERE.map(([label, href]) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="latin">
                  {label}
                  <span className="visually-hidden"> {t.misc.new_tab}</span>
                </a>
              </li>
            ))}
            <li>
              <a href="#main">{F.to_top}</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
