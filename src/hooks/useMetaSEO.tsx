import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from './useLanguage';

/* -------------------------------------------------- */
/*                Seiten-Metadaten                    */
/* -------------------------------------------------- */

type MetaData = {
  [key: string]: {
    title: { pt: string; de: string };
    description: { pt: string; de: string };
  };
};

const metadata: MetaData = {
  home: {
    title: {
      pt: 'Rancho Folclórico Tradições Portuguesas Hamburg - Dança Folclórica',
      de: 'Rancho Folclórico Tradições Portuguesas Hamburg - Portugiesische Folklore',
    },
    description: {
      pt: 'Desde 1979, mantemos vivas as tradições portuguesas em Hamburgo através da dança folclórica. Junte-se à nossa família cultural!',
      de: 'Seit 1979 bewahren wir portugiesische Traditionen in Hamburg durch Folklore-Tanz. Werden Sie Teil unserer kulturellen Familie!',
    },
  },
  activities: {
    title: {
      pt: 'Atividades e Eventos - Rancho Folclórico Tradições Portuguesas',
      de: 'Aktivitäten und Events - Rancho Folclórico Tradições Portuguesas',
    },
    description: {
      pt: 'Descubra nossos próximos eventos, apresentações e atividades. Venha celebrar a cultura portuguesa connosco em Hamburgo!',
      de: 'Entdecken Sie unsere kommenden Events, Aufführungen und Aktivitäten. Feiern Sie portugiesische Kultur mit uns in Hamburg!',
    },
  },
  archive: {
    title: {
      pt: 'Arquivo e Galeria - Rancho Folclórico Tradições Portuguesas',
      de: 'Archiv und Galerie - Rancho Folclórico Tradições Portuguesas',
    },
    description: {
      pt: 'Explore nossa história através de fotos, vídeos e áudios. Reviva os momentos especiais do nosso grupo folclórico em Hamburgo.',
      de: 'Erkunden Sie unsere Geschichte durch Fotos, Videos und Audio. Erleben Sie besondere Momente unserer Folkloregruppe in Hamburg.',
    },
  },
  membros: {
    title: {
      pt: 'Nossa Equipe - Rancho Folclórico Tradições Portuguesas Hamburg',
      de: 'Unser Team - Rancho Folclórico Tradições Portuguesas Hamburg',
    },
    description: {
      pt: 'Conheça os membros da nossa família folclórica. Músicos, dançarinos e amantes da cultura portuguesa em Hamburgo.',
      de: 'Lernen Sie die Mitglieder unserer Folklore-Familie kennen. Musiker, Tänzer und Liebhaber der portugiesischen Kultur in Hamburg.',
    },
  },
  contact: {
    title: {
      pt: 'Contacte-nos - Rancho Folclórico Tradições Portuguesas Hamburg',
      de: 'Kontakt - Rancho Folclórico Tradições Portuguesas Hamburg',
    },
    description: {
      pt: 'Entre em contacto connosco para informações, eventos ou para se juntar ao grupo. Estamos sempre de braços abertos!',
      de: 'Kontaktieren Sie uns für Informationen, Events oder um der Gruppe beizutreten. Wir freuen uns auf Sie!',
    },
  },
  impressum: {
    title: {
      pt: 'Impressum - Rancho Folclórico Tradições Portuguesas Hamburg',
      de: 'Impressum - Rancho Folclórico Tradições Portuguesas Hamburg',
    },
    description: {
      pt: 'Informações legais e detalhes de contacto do Rancho Folclórico Tradições Portuguesas em Hamburgo.',
      de: 'Rechtliche Informationen und Kontaktdetails des Rancho Folclórico Tradições Portuguesas in Hamburg.',
    },
  },
  datenschutz: {
    title: {
      pt: 'Política de Privacidade - Tradições Portuguesas Hamburg',
      de: 'Datenschutz - Tradições Portuguesas Hamburg',
    },
    description: {
      pt: 'Nossa política de privacidade e proteção de dados. Saiba como protegemos suas informações pessoais.',
      de: 'Unsere Datenschutzrichtlinien. Erfahren Sie, wie wir Ihre persönlichen Daten schützen.',
    },
  },
  agb: {
    title: {
      pt: 'Termos e Condições - Tradições Portuguesas Hamburg',
      de: 'AGB - Tradições Portuguesas Hamburg',
    },
    description: {
      pt: 'Termos e condições gerais para participação e eventos do Rancho Folclórico Tradições Portuguesas Hamburg.',
      de: 'Allgemeine Geschäftsbedingungen für Teilnahme und Events des Rancho Folclórico Tradições Portuguesas Hamburg.',
    },
  },
};

const DEFAULT_META = {
  title: { pt: 'Página Desconhecida', de: 'Unbekannte Seite' },
  description: { pt: 'Esta página não existe.', de: 'Diese Seite existiert nicht.' },
} as const;

const baseUrl = 'https://tradicoesportuguesas.com';

/* -------------------------------------------------- */
/*                   useMetaSEO                       */
/* -------------------------------------------------- */

export const useMetaSEO = (page: keyof typeof metadata) => {
  const { language } = useLanguage();
  const location = useLocation(); // nur EINMAL ausserhalb useEffect

  useEffect(() => {
    /* ---------- Basics & Fallbacks ---------- */
    const safePathname = location.pathname || '/';
    const currentMeta = metadata[page] ?? DEFAULT_META;

    const langCode = language === 'de' ? 'de' : 'pt' as const;
    const langTag  = langCode === 'de' ? 'de-DE' : 'pt-PT';

    const title       = currentMeta.title[langCode];
    const description = currentMeta.description[langCode];

    const url = `${baseUrl}${safePathname}`;
         // immer String

    /* ---------- <html lang="…"> ---------- */
    if (document.documentElement.lang !== langTag) {
      document.documentElement.lang = langTag;
    }

    /* ---------- <title> ---------- */
    if (document.title !== title) document.title = title;

    /* ---------- kleine Helfer ---------- */
    const query = <T extends Element>(selector: string) =>
      document.querySelector<T>(selector);

    const ensure = <T extends HTMLElement>(
      maybeNode: T | null,
      createNode: () => T,
    ): T => maybeNode ?? createNode();

    /* ---------- <meta name="description"> ---------- */
    const metaDescription = ensure(
      query<HTMLMetaElement>('meta[name="description"][data-managed="seo"]'),
      () => {
        const m = document.createElement('meta');
        m.name = 'description';
        m.dataset.managed = 'seo';
        document.head.appendChild(m);
        return m;
      },
    );
    if (metaDescription.content !== description) metaDescription.content = description;

    /* ---------- <meta name="pagename"> ---------- */
    const metaPageName = ensure(
      query<HTMLMetaElement>('meta[name="pagename"][data-managed="seo"]'),
      () => {
        const m = document.createElement('meta');
        m.name = 'pagename';
        m.dataset.managed = 'seo';
        document.head.appendChild(m);
        return m;
      },
    );
    if (metaPageName.content !== title) metaPageName.content = title;

    /* ---------- <link rel="canonical"> ---------- */
/* ---------- <link rel="canonical"> ---------- */
const canonical = ensure(
  query<HTMLLinkElement>('link[rel="canonical"][data-managed="seo"]'),
  () => {
    const l = document.createElement('link');
    l.rel = 'canonical';
    l.dataset.managed = 'seo';
    document.head.appendChild(l);
    return l;
  },
);

// garantiert reiner string
const hashPos = url.indexOf('#');
const urlWithoutHash = hashPos === -1 ? url : url.slice(0, hashPos);

if (canonical.getAttribute('href') !== urlWithoutHash) {
  canonical.setAttribute('href', urlWithoutHash);
}

  

    /* ---------- JSON-LD ---------- */
    document.getElementById('schema-webpage')?.remove();
    const script = document.createElement('script');
    script.id   = 'schema-webpage';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type'   : 'WebPage',
      name        : title,
      url,
      description,
      inLanguage  : langTag,
      isPartOf    : { '@type': 'WebSite', url: baseUrl },
    });
    document.head.appendChild(script);

    /* ---------- Clean-up ---------- */
    return () => script.remove();
  }, [page, language, location.pathname, location.hash]); // <- hash triggert JSON-LD-Update
};