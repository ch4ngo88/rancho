import { useLanguage } from '@/hooks/useLanguage'
import { NewsItemType } from '../components/NewsItem'
import { EventType } from '../components/EventCard'
import { EnsaioType } from '../components/EnsaiosSection'
import { asset } from '@/lib/asset'

export const useNewsItems = (): NewsItemType[] => {
  const { language } = useLanguage()

  return [
    {
      type: 'image',
      thumbnail: asset('images/activity/news/info.webp'),
      source: asset('images/activity/news/info.webp'),
      title: language === 'pt' ? 'Folheto Informativo' : 'Information Flyer',
    },
    {
      type: 'video',

      source: asset('images/activity/news/kinder.mp4'),
      thumbnail: asset('images/activity/news/kinder.webp'),
      title: language === 'pt' ? 'Vídeo das Crianças' : 'Kinder Video',
    },
    {
      type: 'video',
      source: asset('images/activity/news/tiktok.mp4'),
      thumbnail: asset('images/activity/news/tiktok.webp'),
      title: 'TikTok',
    },
  ]
}

export const useUpcomingEvents = (): EventType[] => {
  const { language } = useLanguage()

  return [
    {
      id: 3,
      title:
        language === 'pt'
          ? 'Restaurant & Veranstaltungszentrum Poseidon'
          : 'Restaurant & Veranstaltungszentrum Poseidon',
      date: '2025-06-08',
      image: asset('images/activity/next/poseidon.webp'),
      description:
        language === 'pt'
          ? 'No restaurante e centro de eventos Poseidon em Seevetal, com música ao vivo do grupo Estrela da Noite e buffet a partir das 19h. Celebração especial de Pentecostes com comida portuguesa e alemã.'
          : 'Im Restaurant & Veranstaltungszentrum Poseidon in Seevetal - Pfingstfeier mit Live-Musik von Estrela da Noite und Buffet ab 19 Uhr. Ein besonderer Abend mit portugiesisch-deutscher Küche.',
      location: 'Bürgermeister-Heitmann-Str. 34c, 21217 Seevetal',
    },
    {
      id: 1,
      title: '31. Portugiesisches Folklore Festival - Dia de Portugal',
      date: '2025-06-14',
      image: asset('images/activity/next/diadeportugal.webp'),
      video: asset('images/activity/next/diadeportugal.mp4'),
      description:
        language === 'pt'
          ? 'Celebração do Dia de Portugal com o 31º Festival de Folclore Português. Live Band: NOVO SOM e diretamente de Portugal: Claudia Martins & Minhotos Marotos. Comida, bebida, música, folclore e atividades para crianças. Horário: 12:00 - 22:00.'
          : '31. Portugiesisches Folklore Festival mit Live Band NOVO SOM und direkt aus Portugal: Claudia Martins & Minhotos Marotos. Von 12:00 bis 22:00 Uhr gibt es Essen, Trinken, Musik, Folklore und Aktivitäten für Kinder.',
      location: 'Landhaus Walter, Otto-Wels-Straße 2, 22303 Hamburg',
    },
    {
      id: 4,
      title: language === 'pt' ? 'Evento Privado - Casamento' : 'Private Veranstaltung - Hochzeit',
      date: '2025-06-20',
      image: asset('images/activity/next/wedding.webp'), // neutrales, stilvolles Bild empfohlen
      description:
        language === 'pt'
          ? 'Presença em um casamento privado.'
          : 'Auftritt im Rahmen einer privaten Hochzeitsfeier.',
      location: language === 'pt' ? 'Evento privado' : 'Private Veranstaltung',
    },
    {
      id: 5,
      title: language === 'pt' ? 'Stadtteilfest Heimfeld' : 'Stadtteilfest Heimfeld',
      date: '2025-07-05',
      image: asset('images/activity/next/heimfeld.webp'), // Bild ggf. durch Screenshot oder neutrales Festbild ersetzen
      description:
        language === 'pt'
          ? 'Participação no Stadtteilfest Heimfeld, com diversas atrações, incluindo jogos infantis, escalada, comida e bebida, música ao vivo e muito mais. Estaremos no palco entre 14h e 18h.'
          : 'Auftritt beim Stadtteilfest Heimfeld mit vielen Attraktionen wie Kinderprogramm, Kletterwand, Speisen & Getränken, Bühnenprogramm und mehr. Unser Auftritt findet zwischen 14 und 18 Uhr statt.',
      location: 'Stadtteil Heimfeld, Hamburg',
    },

    {
      id: 2,
      title: language === 'pt' ? 'Harburg Feiert Vielfalt' : 'Harburg Feiert Vielfalt',
      date: '2025-07-06',
      image: asset('images/activity/next/harburgvielfalt.webp'), // placeholder image
      description:
        language === 'pt'
          ? "Apresentação em cooperação com o Kulturpalast Harburg no evento 'Harburg Feiert Vielfalt'"
          : "Auftritt in Kooperation mit dem Kulturpalast Harburg bei 'Harburg Feiert Vielfalt'",
      location: 'Harburger Rathausplatz, 21073 Hamburg',
    },
  ]
}
export const useEnsaios = (): EnsaioType[] => {
  const { language } = useLanguage()

  return [
    {
      title: language === 'pt' ? 'Ensaio Grupo Adultos' : 'Probe Erwachsenengruppe',
      schedule:
        language === 'pt'
          ? 'Todos os Domingos (menos Feriados) das 11:00 - 12:30'
          : 'Jeden Sonntag (außer an Feiertagen) von 11:00 - 12:30',
      image: 'images/activity/ensaios/ensaioadultos.webp',
    },
    {
      title: language === 'pt' ? 'Ensaio Grupo Crianças' : 'Probe Kindergruppe',
      schedule:
        language === 'pt'
          ? 'Todos os Domingos (menos Feriados) das 12:30 às 14:00'
          : 'Jeden Sonntag (außer an Feiertagen) von 12:30 bis 14:00 Uhr',
      image: 'images/activity/ensaios/ensaiocriancas.webp',
    },
  ]
}
