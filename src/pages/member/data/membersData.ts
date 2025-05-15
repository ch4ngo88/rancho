import { useLanguage } from '@/hooks/useLanguage'
import { asset } from '@/lib/asset'

export type MemberData = {
  id: number
  name: string
  role: string
  regularImage: string
  costumeImage: string
  description?: string
  category: 'leadership' | 'music' | 'dancers'
  hoverText?: string
}

export const useMembersData = (): MemberData[] => {
  const { language } = useLanguage()

  const members: MemberData[] = [
    {
      id: 1,
      name: 'Marco da Silva Dácio',
      role:
        language === 'pt'
          ? 'Responsável e Ensaiador Rancho Adulto'
          : 'Leiter und Tanztrainer Erwachsenengruppe',
      regularImage: asset('images/members/marco1.webp'),
      costumeImage: asset('images/members/marco2.webp'),
      category: 'leadership',
      hoverText: 'Ribatejo',
    },
    {
      id: 2,
      name: 'Mariana Marcelo',
      role:
        language === 'pt'
          ? 'Responsável e Ensaiadora Rancho Adulto'
          : 'Leiterin und Tanztrainerin Erwachsenengruppe',
      regularImage: asset('images/members/mariana1.webp'),
      costumeImage: asset('images/members/mariana2.webp'),
      category: 'leadership',
      hoverText: 'Alentejo',
    },

    {
      id: 3,
      name: 'Vanessa Matos',
      role: language === 'pt' ? 'Social Media' : 'Social Media',
      regularImage: asset('images/members/vanessa1.webp'),
      costumeImage: asset('images/members/vanessa2.webp'),
      category: 'leadership',
      hoverText: 'Ribatejo',
    },

    {
      id: 4,
      name: 'Yahima Rodriguez Rodriguez',
      role: language === 'pt' ? 'Dançarina' : 'Tänzerin',
      regularImage: asset('images/members/yahima1.webp'),
      costumeImage: asset('images/members/yahima2.webp'),
      category: 'dancers',
      hoverText: 'Beira-Baixa',
    },
    {
      id: 5,
      name: 'Marta da Silva Dácio',
      role: language === 'pt' ? 'Comunicação interna' : 'Interne Kommunikation',
      regularImage: asset('images/members/marta1.webp'),
      costumeImage: asset('images/members/marta2.webp'),
      category: 'leadership',
      hoverText: 'Ribatejo',
    },
    {
      id: 6,
      name: 'Neuza da Silva Rodriguez Dácio',
      role: language === 'pt' ? 'Dançarina' : 'Tänzerin',
      regularImage: asset('images/members/neuza1.webp'),
      costumeImage: asset('images/members/neuza2.webp'),
      category: 'dancers',
      hoverText: 'Ribatejo',
    },
    {
      id: 7,
      name: 'Alecio Ferreira',
      role: language === 'pt' ? 'Dançarino' : 'Tänzer',
      regularImage: asset('images/members/alecio1.webp'),
      costumeImage: asset('images/members/alecio2.webp'),
      category: 'dancers',
      hoverText: 'Ribatejo',
    },
    {
      id: 8,
      name: 'Raquel Bastos Rodrigues',
      role: language === 'pt' ? 'Dançarina' : 'Tänzerin',
      regularImage: asset('images/members/raquel1.webp'),
      costumeImage: asset('images/members/raquel2.webp'),
      category: 'dancers',
      hoverText: 'Ribatejo',
    },

    {
      id: 9,
      name: 'Sabrina Sena',
      role: language === 'pt' ? 'Eventos e Relações Externas' : 'Events & Außenbeziehungen',
      regularImage: asset('images/members/sabrina1.webp'),
      costumeImage: asset('images/members/sabrina2.webp'),
      category: 'leadership',
      hoverText: 'Estremadura',
    },
    /*
    {
      id: 10,
      name: 'Sr. Gabriel',
      role: language === 'pt' ? 'Acordeão' : 'Akkordeon',
      regularImage: asset('images/placeholder.svg'),
      costumeImage: asset('images/placeholder.svg'),
      category: 'music',
      hoverText: 'Alentejo',
    },
*/
    {
      id: 11,
      name: 'Adriana Rodrigues',
      role: language === 'pt' ? 'Dançarina' : 'Tänzerin',
      regularImage: asset('images/members/adri1.webp'),
      costumeImage: asset('images/members/placeholder.svg'),
      category: 'dancers',
      hoverText: 'Ribatejo',
    },

    {
      id: 12,
      name: 'Daniel Craveiro',
      role: language === 'pt' ? 'Dançarino' : 'Tänzer',
      regularImage: asset('images/members/daniel1.webp'),
      costumeImage: asset('images/members/daniel2.webp'),
      category: 'dancers',
      hoverText: 'Ribatejo',
    },
    {
      id: 13,
      name: 'Jessica Perreira Baptista',
      role: language === 'pt' ? 'Dançarina' : 'Tänzerin',
      regularImage: asset('images/members/jessicaB1.webp'),
      costumeImage: asset('images/members/jessicaB2.webp'),
      category: 'dancers',
      hoverText: 'Ribatejo',
    },
    {
      id: 14,
      name: 'Joana Martinho Vidal',
      role: language === 'pt' ? 'Dançarina' : 'Tänzerin',
      regularImage: asset('images/members/joana1.webp'),
      costumeImage: asset('images/members/joana2.webp'),
      category: 'dancers',
      hoverText: 'Minho',
    },
    {
      id: 15,
      name: 'Laura da Silva Nogueira',
      role: language === 'pt' ? 'Dançarina' : 'Tänzerin',
      regularImage: asset('images/members/laura1.webp'),
      costumeImage: asset('images/members/laura2.webp'),
      category: 'dancers',
      hoverText: 'Estremadura',
    },
    {
      id: 16,
      name: 'Ursula Mendes Marques',
      role: language === 'pt' ? 'Dançarina' : 'Tänzerin',
      regularImage: asset('images/members/ursula1.webp'),
      costumeImage: asset('images/members/ursula2.webp'),
      category: 'dancers',
      hoverText: 'Estremadura',
    },

    {
      id: 17,
      name: 'Melanie Ribeiro Zorić',
      role: language === 'pt' ? 'Dançarina' : 'Tänzerin',
      regularImage: asset('images/members/placeholder.svg'),
      costumeImage: asset('images/members/melanie2.webp'),
      category: 'dancers',
      hoverText: 'Minho',
    },
    {
      id: 18,
      name: 'Alex dos Santos',
      role: language === 'pt' ? 'Dançarino' : 'Tänzer',
      regularImage: asset('images/members/alex1.webp'),
      costumeImage: asset('images/members/alex2.webp'),
      category: 'dancers',
      hoverText: 'Minho',
    },
      {
      id: 19,
      name: 'Jessica Gonçalves',
      role: language === 'pt' ? 'Dançarina' : 'Tänzerin',
      regularImage: asset('images/members/jessicaG1.webp'),
      costumeImage: asset('images/members/jessicaG2.webp'),
      category: 'dancers',
      hoverText: 'Minho',
    },
     {
      id: 20,
      name: 'Sofia Neto Julião Faria',
      role: language === 'pt' ? 'Dançarina' : 'Tänzerin',
      regularImage: asset('images/members/sofia1.webp'),
      costumeImage: asset('images/members/placeholder.svg'),
      category: 'dancers',
      hoverText: 'Beira Litoral',
    },
     {
      id: 21,
      name: 'Mariana Sofia Lassen Patrício',
      role: language === 'pt' ? 'Dançarina' : 'Tänzerin',
      regularImage: asset('images/members/mariana21.webp'),
      costumeImage: asset('images/members/placeholder.svg'),
      category: 'dancers',
      hoverText: '',
    },
    {
      id: 22,
      name: 'Afonso Filipe Alves Pinela Gonçalves',
      role: language === 'pt' ? 'Dançarino' : 'Tänzer',
      regularImage: asset('images/members/afonso1.webp'),
      costumeImage: asset('images/members/placeholder.svg'),
      category: 'dancers',
      hoverText: '',
    },
  ]
  return members.sort((a, b) => a.name.localeCompare(b.name, language === 'pt' ? 'pt' : 'de'))
}
