import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'pt' | 'de'

type Translations = {
  [key: string]: {
    pt: string
    de: string
  }
}

const translations: Translations = {
  home: {
    pt: 'Home',
    de: 'Home',
  },
  activities: {
    pt: 'Atividades',
    de: 'Aktivitäten',
  },
  archive: {
    pt: 'Arquivo',
    de: 'Archiv',
  },
  membros: {
    pt: 'Membros',
    de: 'Member',
  },
  contact: {
    pt: 'Contacto',
    de: 'Kontakt',
  },
  aboutUs: {
    pt: 'Sobre nós',
    de: 'Über uns',
  },
  welcome: {
    pt: 'Bem-vindos ao Rancho Folclórico Tradições Portuguesas – a nossa segunda casa, o nosso pedaço de Portugal em Hamburgo.',
    de: 'Willkommen beim Rancho Folclórico Tradições Portuguesas – unser zweites Zuhause, unser Stück Portugal in Hamburg.',
  },
  intro: {
    pt: 'Desde 1979, celebramos juntos a cultura, a música e as tradições que nos ligam às nossas raízes.',
    de: 'Seit 1979 feiern wir gemeinsam die Kultur, Musik und Traditionen, die uns mit unseren Wurzeln verbinden.',
  },
  storyIntro: {
    pt: 'Aqui, cada passo conta uma história. Cada sorriso é um abraço de saudade.',
    de: 'Hier erzählt jeder Schritt eine Geschichte. Jedes Lächeln ist eine Umarmung der Sehnsucht.',
  },
  generations: {
    pt: 'Um lar para todas as gerações',
    de: 'Ein Zuhause für alle Generationen',
  },
  generationsText: {
    pt: 'Com cerca de 60 membros, o nosso rancho é composto por pessoas de todas as idades. No grupo infantil, os mais pequenos descobrem o mundo da cultura portuguesa de forma divertida. No grupo adulto, a partir dos 14 anos, os membros aprofundam e desenvolvem as suas habilidades com paixão e alegria.',
    de: 'Mit rund 60 Mitgliedern besteht unsere Gruppe aus Menschen aller Altersgruppen. In der Kindergruppe entdecken die Kleinsten die Welt der portugiesischen Kultur auf spielerische Weise. In der Erwachsenengruppe vertiefen und entwickeln die Mitglieder ab 14 Jahren ihre Fähigkeiten mit Leidenschaft und Freude.',
  },
  variety: {
    pt: 'Portugal de norte a sul',
    de: 'Portugal von Nord bis Süd',
  },
  varietyText: {
    pt: 'Representamos o folclore de todo o país – das danças animadas do Minho às elegantes do Ribatejo, até aos passos alegres do Algarve. Cada membro tem a oportunidade de mostrar com orgulho as tradições da sua região de origem. A nossa força está na diversidade que nos une!',
    de: 'Wir repräsentieren die Folklore des ganzen Landes – von den lebhaften Tänzen des Minho über die eleganten des Ribatejo bis zu den fröhlichen Schritten des Algarve. Jedes Mitglied hat die Möglichkeit, stolz die Traditionen seiner Herkunftsregion zu zeigen. Unsere Stärke liegt in der Vielfalt, die uns vereint!',
  },
  timeTravel: {
    pt: 'Uma viagem no tempo',
    de: 'Eine Zeitreise',
  },
  timeTravelText: {
    pt: 'As nossas atuações são uma viagem cultural pelas antigas tradições de Portugal. Deixe-se encantar pelos ritmos vibrantes, pelos trajes coloridos e pela energia contagiante do nosso grupo.',
    de: 'Unsere Aufführungen sind eine kulturelle Reise durch die alten Traditionen Portugals. Lassen Sie sich von den lebhaften Rhythmen, den farbenfrohen Trachten und der ansteckenden Energie unserer Gruppe verzaubern.',
  },
  joinUs: {
    pt: 'Gostaria de fazer parte da nossa família folclórica?',
    de: 'Möchten Sie Teil unserer Folklore-Familie werden?',
  },
  joinUsText: {
    pt: 'Visite-nos em uma das nossas próximas apresentações ou surpreenda os seus convidados com algo especial ao contratar-nos para o seu evento!',
    de: 'Besuchen Sie uns bei einer unserer nächsten Aufführungen oder überraschen Sie Ihre Gäste mit etwas Besonderem, indem Sie uns für Ihre Veranstaltung buchen!',
  },
  seeActivities: {
    pt: 'Ver Atividades',
    de: 'Aktivitäten ansehen',
  },
  contactBtn: {
    pt: 'Contactar',
    de: 'Kontaktieren',
  },
  finalMessage: {
    pt: 'Estamos sempre de braços abertos para novos talentos! Seja como músico, dançarino ou amigo, junte-se a nós e viva a paixão pela cultura folclórica portuguesa.',
    de: 'Wir heißen neue Talente stets willkommen! Ob als Musiker, Tänzer oder Freund, schließen Sie sich uns an und erleben Sie die Leidenschaft für portugiesische Folklore.',
  },
  upcomingActivities: {
    pt: 'Proximas atividades',
    de: 'Kommende Aktivitäten',
  },
  news: {
    pt: 'News',
    de: 'News',
  },
  openInNewTab: {
    pt: 'Abrir em nova aba',
    de: 'In neuem Tab öffnen',
  },
  notFoundTitle: {
    pt: 'Oops! Página não encontrada',
    de: 'Oops! Seite nicht gefunden',
  },
  backToHome: {
    pt: 'Voltar à página inicial',
    de: 'Zurück zur Startseite',
  },
  photos: {
    pt: 'Fotos',
    de: 'Fotos',
  },
  audio: {
    pt: 'Áudio',
    de: 'Audio',
  },
  videos: {
    pt: 'Vídeos',
    de: 'Videos',
  },
  interviews: {
    pt: 'Entrevistas e Áudio',
    de: 'Interviews und Audio',
  },
  name: {
    pt: 'Nome',
    de: 'Name',
  },
  email: {
    pt: 'Email',
    de: 'E-Mail',
  },
  subject: {
    pt: 'Assunto',
    de: 'Betreff',
  },
  message: {
    pt: 'Mensagem',
    de: 'Nachricht',
  },
  send: {
    pt: 'Enviar',
    de: 'Senden',
  },
  formProtection: {
    pt: 'Este site é protegido por FormSubmit e aplicam-se a Política de Privacidade e os Termos de Serviço.',
    de: 'Diese Website wird durch FormSubmit geschützt und es gelten die Datenschutzbestimmungen und Nutzungsbedingungen.',
  },
  usefulLinks: {
    pt: 'Links Úteis',
    de: 'Nützliche Links',
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Get initial language from localStorage or default to "pt"
const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'pt'

  const savedLanguage = localStorage.getItem('language') as Language
  return savedLanguage === 'de' ? 'de' : 'pt'
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  // Set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem('language', lang)
    } catch {
      console.warn('Could not save language preference to localStorage')
    }
  }

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`)
      return key
    }
    return translations[key][language]
  }

  // Update document lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
