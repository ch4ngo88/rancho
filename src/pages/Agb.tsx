import { useMetaSEO } from '@/hooks/useMetaSEO'
import { ScrollText, Info, AlertTriangle, Copyright } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

const Agb = () => {
  useMetaSEO('agb')
  const { language } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="section-title mb-8 text-center">
          {language === 'pt'
            ? 'Condições Gerais de Participação'
            : 'Allgemeine Teilnahmebedingungen'}
        </h1>

        <div className="glass-card space-y-8 p-8">
          {/* Geltungsbereich */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <ScrollText className="text-seagreen" />
              <h2 className="text-xl font-bold text-seagreen">
                {language === 'pt' ? 'Aplicabilidade' : 'Geltungsbereich'}
              </h2>
            </div>
            <div className="space-y-2 pl-6 text-gray-700">
              <p>
                {language === 'pt'
                  ? 'Estas condições aplicam-se às atividades culturais e de dança organizadas pela Tradições Portuguesas em Hamburgo. Trata-se de um grupo independente e sem fins lucrativos.'
                  : 'Diese Bedingungen gelten für die kulturellen und tänzerischen Aktivitäten der Tradições Portuguesas in Hamburg. Wir sind eine unabhängige, nicht-kommerzielle Gruppe.'}
              </p>
            </div>
          </section>

          {/* Teilnahme */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Info className="text-seagreen" />
              <h2 className="text-xl font-bold text-seagreen">
                {language === 'pt' ? 'Participação' : 'Teilnahme'}
              </h2>
            </div>
            <div className="space-y-2 pl-6 text-gray-700">
              <p>
                {language === 'pt'
                  ? 'A participação é aberta a todas as idades e ocorre de forma voluntária.'
                  : 'Die Teilnahme steht allen Altersgruppen offen und erfolgt freiwillig.'}
              </p>
            </div>
          </section>

          {/* Haftung */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="text-seagreen" />
              <h2 className="text-xl font-bold text-seagreen">
                {language === 'pt' ? 'Responsabilidade' : 'Haftung'}
              </h2>
            </div>
            <div className="space-y-2 pl-6 text-gray-700">
              <p>
                {language === 'pt'
                  ? 'A participação em ensaios e apresentações é por conta e risco próprio. Não nos responsabilizamos por danos ou objetos pessoais.'
                  : 'Die Teilnahme an Proben und Auftritten erfolgt auf eigene Verantwortung. Für Schäden oder mitgebrachte Gegenstände übernehmen wir keine Haftung.'}
              </p>
            </div>
          </section>

          {/* Medienrechte */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Copyright className="text-seagreen" />
              <h2 className="text-xl font-bold text-seagreen">
                {language === 'pt' ? 'Direitos de Imagem' : 'Bildrechte'}
              </h2>
            </div>
            <div className="space-y-2 pl-6 text-gray-700">
              <p>
                {language === 'pt'
                  ? 'Fotos e vídeos dos eventos podem ser utilizados para fins não comerciais de divulgação e documentação. Caso não deseje aparecer, entre em contato conosco previamente.'
                  : 'Fotos und Videos unserer Veranstaltungen können für nicht-kommerzielle Dokumentations- und Präsentationszwecke verwendet werden. Wenn Sie dies nicht wünschen, sprechen Sie uns bitte im Vorfeld an.'}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Agb
