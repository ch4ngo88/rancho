import { useEffect } from 'react'
import { useLanguage } from './useLanguage'

type MetaData = {
  [key: string]: {
    title: {
      pt: string
      de: string
    }
    description: {
      pt: string
      de: string
    }
  }
}

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
}

export const useMetaSEO = (page: keyof typeof metadata) => {
  const { language } = useLanguage()

  useEffect(() => {
    const currentMeta = metadata[page]
    if (currentMeta) {
      document.title = currentMeta.title[language]
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', currentMeta.description[language])
      } else {
        const newMetaDescription = document.createElement('meta')
        newMetaDescription.setAttribute('name', 'description')
        newMetaDescription.setAttribute('content', currentMeta.description[language])
        document.head.appendChild(newMetaDescription)
      }
    }
  }, [page, language])
}
