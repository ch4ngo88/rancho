import { useMetaSEO } from '@/hooks/useMetaSEO'
import { Mail, Shield, FileText, AlertTriangle, Copyright } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

const Impressum = () => {
  useMetaSEO('impressum')
  const { language } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="section-title mb-8 text-center">
          {language === 'pt' ? 'Impressum / Aviso Legal' : 'Impressum'}
        </h1>

        <div className="glass-card space-y-8 p-8">
          {/* Angaben gemäß § 5 TMG */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <FileText className="text-seagreen" />
              <h2 className="text-xl font-bold text-seagreen">
                {language === 'pt' ? 'Informações conforme § 5 TMG' : 'Angaben gemäß § 5 TMG'}
              </h2>
            </div>
            <div className="space-y-2 pl-6 text-gray-700">
              <p>
                Tradições Portuguesas Hamburg
                <br />
                Marco da Silva Dácio
                <br />
                Hastedtstraße 30
                <br />
                21073 Hamburg, {language === 'pt' ? 'Alemanha' : 'Deutschland'}
              </p>
            </div>
          </section>

          {/* Vertretung */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Shield className="text-seagreen" />
              <h2 className="text-xl font-bold text-seagreen">
                {language === 'pt' ? 'Representação' : 'Vertretung'}
              </h2>
            </div>
            <p className="pl-6 text-gray-700">
              Marco da Silva Dácio
              <br />
              Mariana Marcelo Rodrigues
            </p>
          </section>

          {/* Kontakt */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Mail className="text-seagreen" />
              <h2 className="text-xl font-bold text-seagreen">
                {language === 'pt' ? 'Contato' : 'Kontakt'}
              </h2>
            </div>
            <p className="pl-6 text-gray-700">E-Mail: g.c.r.f.p@hotmail.com</p>
          </section>

          {/* Inhaltlich Verantwortlich */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Shield className="text-seagreen" />
              <h2 className="text-xl font-bold text-seagreen">
                {language === 'pt'
                  ? 'Responsável pelo conteúdo conforme § 55 RStV'
                  : 'Inhaltlich verantwortlich gemäß § 55 RStV'}
              </h2>
            </div>
            <p className="pl-6 text-gray-700">Marco da Silva Dácio</p>
          </section>

          {/* Haftung für Links */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="text-seagreen" />
              <h2 className="text-xl font-bold text-seagreen">
                {language === 'pt' ? 'Exclusão de responsabilidade' : 'Haftungsausschluss'}
              </h2>
            </div>
            <p className="pl-6 text-gray-700">
              {language === 'pt'
                ? 'Apesar de verificarmos cuidadosamente os conteúdos externos, não assumimos responsabilidade pelos links para sites de terceiros. Os operadores desses sites são os únicos responsáveis.'
                : 'Trotz sorgfältiger Kontrolle übernehmen wir keine Haftung für externe Links. Für den Inhalt verlinkter Seiten sind ausschließlich deren Betreiber verantwortlich.'}
            </p>
          </section>

          {/* Urheberrecht */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Copyright className="text-seagreen" />
              <h2 className="text-xl font-bold text-seagreen">
                {language === 'pt' ? 'Direitos de Autor' : 'Urheberrecht'}
              </h2>
            </div>
            <div className="space-y-2 pl-6 text-gray-700">
              <p>
                {language === 'pt'
                  ? 'Todos os conteúdos deste site são protegidos por direitos autorais. O uso sem autorização prévia não é permitido.'
                  : 'Alle Inhalte dieser Website sind urheberrechtlich geschützt. Eine Verwendung ohne vorherige Genehmigung ist nicht gestattet.'}
              </p>
              <p>
                {language === 'pt'
                  ? 'Caso observe alguma violação de direitos, por favor, nos informe – os conteúdos em questão serão removidos imediatamente.'
                  : 'Sollten Sie eine Urheberrechtsverletzung feststellen, bitten wir um einen Hinweis. Entsprechende Inhalte werden umgehend entfernt.'}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Impressum
