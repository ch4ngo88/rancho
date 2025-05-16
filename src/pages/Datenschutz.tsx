import { Shield, FileText, User, Database, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { useMetaSEO } from '@/hooks/useMetaSEO'

const Datenschutz = () => {
  useMetaSEO('datenschutz')
  const { language } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="section-title mb-8 text-center">
          {language === 'pt' ? 'Política de Privacidade' : 'Datenschutzerklärung'}
        </h1>

        <div className="glass-card space-y-8 p-8">
          {/* Allgemeine Hinweise */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <FileText className="text-seagreen" />
              <h2 className="text-xl font-bold text-seagreen">
                {language === 'pt' ? 'Informações Gerais' : 'Allgemeine Hinweise'}
              </h2>
            </div>
            <div className="space-y-2 pl-6 text-gray-700">
              <p>
                {language === 'pt'
                  ? 'Levamos a sério a proteção dos seus dados pessoais. Os seus dados são tratados de forma confidencial e de acordo com os regulamentos legais.'
                  : 'Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Ihre Daten werden vertraulich und entsprechend der gesetzlichen Vorschriften behandelt.'}
              </p>
            </div>
          </section>

          {/* Verantwortlicher */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <User className="text-seagreen" />
              <h2 className="text-xl font-bold text-seagreen">
                {language === 'pt' ? 'Responsável' : 'Verantwortlicher'}
              </h2>
            </div>
            <div className="space-y-2 pl-6 text-gray-700">
              <p>
                Marco da Silva Dácio
                <br />
                Hastedtstraße 30
                <br />
                21073 Hamburg
                <br />
                E-Mail: g.c.r.f.p@hotmail.com
              </p>
            </div>
          </section>

          {/* Datenerfassung */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Database className="text-seagreen" />
              <h2 className="text-xl font-bold text-seagreen">
                {language === 'pt' ? 'Coleta de Dados no Site' : 'Datenerfassung auf der Website'}
              </h2>
            </div>
            <div className="space-y-4 pl-6 text-gray-700">
              <h3 className="font-bold">
                {language === 'pt' ? 'Dados Técnicos' : 'Technisch notwendige Daten'}
              </h3>
              <p>
                {language === 'pt'
                  ? 'Quando você acessa este site, alguns dados técnicos (como navegador, horário de acesso etc.) são registrados automaticamente para garantir o funcionamento seguro da página.'
                  : 'Beim Besuch dieser Website werden automatisch technische Daten (wie Browsertyp, Zugriffszeit etc.) erfasst, um einen sicheren Betrieb der Seite zu gewährleisten.'}
              </p>

              <h3 className="font-bold">Formular de Contato / Kontaktformular</h3>
              <p>
                {language === 'pt'
                  ? 'Se você nos contactar por formulário, os dados fornecidos serão transmitidos via Formspree (serviço externo) diretamente para nossa caixa de e-mail. Nenhum dado é armazenado neste site.'
                  : 'Wenn Sie uns per Formular kontaktieren, werden die angegebenen Daten über den Dienst Formspree (externer Anbieter) direkt an unser E-Mail-Postfach übermittelt. Auf dieser Website werden keine Daten gespeichert.'}
              </p>
              <p>
                {language === 'pt'
                  ? 'Consulte também a política de privacidade do Formspree:'
                  : 'Bitte beachten Sie auch die Datenschutzrichtlinien von Formspree:'}
                <br />
                <a
                  href="https://formspree.io/legal/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-seagreen hover:text-seagreen/80"
                >
                  ➔ Formspree Privacy <ExternalLink className="h-4 w-4" />
                </a>
              </p>

              <h3 className="font-bold">Cookies</h3>
              <p>
                {language === 'pt'
                  ? 'Este site não utiliza cookies para rastreamento ou análise.'
                  : 'Diese Website verwendet keine Cookies für Tracking oder Analyse.'}
              </p>
            </div>
          </section>

          {/* Rechte */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Shield className="text-seagreen" />
              <h2 className="text-xl font-bold text-seagreen">
                {language === 'pt' ? 'Seus Direitos' : 'Ihre Rechte'}
              </h2>
            </div>
            <div className="space-y-2 pl-6 text-gray-700">
              <p>
                {language === 'pt'
                  ? 'Você tem o direito de acesso, retificação ou eliminação dos seus dados. Basta entrar em contato conosco.'
                  : 'Sie haben das Recht auf Auskunft, Berichtigung oder Löschung Ihrer Daten. Kontaktieren Sie uns hierzu einfach.'}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Datenschutz
