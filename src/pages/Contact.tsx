import React, { useState, useCallback } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { useLanguage } from '@/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ExternalLink, Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react'
import { useMetaSEO } from '@/hooks/useMetaSEO'
import Map from '@/components/map'
import { asset } from '@/lib/asset'

type UsefulLink = {
  url: string
  icon: string
  title: string
}

const usefulLinks: UsefulLink[] = [
  {
    url: 'https://www.rfptv.pt/',
    icon: 'images/links/MYvhCGImba3MPCwmRu2pZgGkFhy2L6tkTLsSO3LN.webp',
    title: 'Canal tv Digital do Folclore de Portugal',
  },
  {
    url: 'https://folclore.pt/',
    icon: 'images/links/cropped-portal-logo.webp',
    title: 'Folclore de Portugal - O Portal do Folclore Português',
  },
  {
    url: 'https://www.ffp.pt/',
    icon: 'images/links/logotipo.webp',
    title: 'Federação do Folclore Português',
  },
  {
    url: 'https://www.casabrincheiro.pt/',
    icon: 'images/links/Screenshot+2023-12-22+at+09.47.32-240w.webp',
    title: 'Casa Brincheiro',
  },
  {
    url: 'https://portaldascomunidades.mne.gov.pt/pt/',
    icon: 'images/links/pdc_66x66.webp',
    title: 'Portal das Comunidades Portuguesas',
  },
  {
    url: 'https://missao-portuguesa-hamburg.de/cms3/p/Mission/index.php',
    icon: 'images/links/logotipo_missao.webp',
    title: 'Missão Católica de Língua Portuguesa de Hamburgo',
  },
  {
    url: 'https://www.instagram.com/musicoportuga',
    icon: 'images/links/297537604_569168504998554_343296032616875640_n.webp',
    title: 'Tiago Pinheiro - músico portuga de Hamburgo',
  },
  {
    url: 'https://www.kulturpalast-harburg.com/',
    icon: 'images/links/logokp.webp',
    title: 'Kultur Palast Harburg',
  },
  {
    url: 'https://info.phg-hh.de/',
    icon: 'images/links/phg1.webp',
    title: 'Portugiesisch-Hanseatischen Gesellschaft e.V. Associação Luso-Hanseática',
  },
]

const ContactForm = () => {
  const { language } = useLanguage()
  const [state, handleSubmit] = useForm('xyzwvgyw') // <- Dein Formspree-ID hier

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  if (state.succeeded) {
    return (
      <div className="glass-card p-6">
        <p className="text-center text-lg text-green-600">
          {language === 'pt' ? 'Mensagem enviada com sucesso!' : 'Nachricht erfolgreich gesendet!'}
        </p>
      </div>
    )
  }

  return (
    <div className="glass-card p-6">
      <h2 className="mb-6 text-xl font-semibold text-seagreen">
        {language === 'pt' ? 'Envie-nos uma mensagem' : 'Schreiben Sie uns eine Nachricht'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5" autoComplete="on">
        <input
          type="text"
          name="nickname"
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />
        <div>
          <label htmlFor="name" className="form-label">
            {language === 'pt' ? 'Nome' : 'Name'}
          </label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
            placeholder={language === 'pt' ? 'Seu nome' : 'Ihr Name'}
          />
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            {language === 'pt' ? 'Email' : 'E-Mail'}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
            placeholder={language === 'pt' ? 'Seu email' : 'Ihre E-Mail'}
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        <div>
          <label htmlFor="subject" className="form-label">
            {language === 'pt' ? 'Assunto' : 'Betreff'}
          </label>
          <Input
            id="subject"
            name="subject"
            autoComplete="off"
            value={formData.subject}
            onChange={handleChange}
            required
            className="form-input"
            placeholder={language === 'pt' ? 'Assunto da mensagem' : 'Betreff der Nachricht'}
          />
        </div>

        <div>
          <label htmlFor="message" className="form-label">
            {language === 'pt' ? 'Mensagem' : 'Nachricht'}
          </label>
          <Textarea
            id="message"
            name="message"
            autoComplete="off"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
            className="form-input"
            placeholder={language === 'pt' ? 'Sua mensagem' : 'Ihre Nachricht'}
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        </div>

        <Button
          type="submit"
          disabled={state.submitting}
          className="w-full bg-seagreen transition-all duration-300 hover:scale-[1.02] hover:bg-seagreen/90 hover:shadow-lg"
        >
          {state.submitting
            ? language === 'pt'
              ? 'A enviar...'
              : 'Wird gesendet...'
            : language === 'pt'
              ? 'Enviar'
              : 'Senden'}
        </Button>

        <p className="text-center text-xs text-gray-500">
          {language === 'pt'
            ? 'Este site é protegido pelo Formspree e aplicam-se a Política de Privacidade e os Termos de Serviço.'
            : 'Diese Website wird durch Formspree geschützt, es gelten die Datenschutzbestimmungen und Nutzungsbedingungen.'}
        </p>
      </form>
    </div>
  )
}

const ContactPage = React.memo(() => {
  useMetaSEO('contact')
  const { language } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="section-title mb-10 text-center">
        {language === 'pt' ? 'Contacto' : 'Kontakt'}
      </h1>

      <div className="mx-auto mb-10 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex h-full flex-col gap-6">
          <div className="glass-card flex-grow p-6 transition-all duration-300 hover:shadow-lg">
            <div className="mb-6 flex items-center gap-2">
              <Mail className="h-6 w-6 text-seagreen" />
              <h3 className="text-xl font-bold text-seagreen">Tradicoes Portuguesas</h3>
            </div>

            <div className="flex flex-col items-start justify-between gap-6 text-gray-700 md:flex-row">
              <div className="space-y-4">
                <p className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 flex-shrink-0 text-seagreen" />
                  <span>Hastedtstraße 30, 21073 Hamburg</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-seagreen" />
                  <a
                    href="mailto:info@tradicoesportuguesas.com"
                    className="transition-colors duration-300 hover:text-seagreen"
                  >
                    info@tradicoesportuguesas.com
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-5 w-5 flex-shrink-0 text-seagreen" />
                  <span>+49 (0) 157 316 250 61</span>
                </p>
              </div>

              <div className="flex-shrink-0">
                <img
                  src={asset('images/contact/QR Code.webp')}
                  alt="QR Code"
                  className="h-32 rounded-lg shadow-md transition-shadow hover:shadow-lg"
                />
              </div>
            </div>
          </div>

          <div className="glass-card flex-grow overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
            <Map />
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>

      <div className="mb-8">
        <Accordion type="single" collapsible className="accordion-custom">
          <AccordionItem value="useful-links" className="border-none">
            <AccordionTrigger className="accordion-trigger">
              <div className="flex items-center gap-2">
                <LinkIcon className="text-seagreen" />
                <span>{language === 'pt' ? 'Links Úteis' : 'Nützliche Links'}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {usefulLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center rounded-md border border-transparent p-3 transition-all duration-300 hover:border-seagreen/30 hover:bg-slate-100 hover:shadow-md"
                  >
                    <img src={link.icon} alt={link.title} className="mr-3 h-6 w-6 object-contain" />
                    <span className="flex-1 text-sm">{link.title}</span>
                    <ExternalLink className="h-4 w-4 text-gray-400 transition-colors group-hover:text-seagreen" />
                  </a>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
})
ContactPage.displayName = 'ContactPage'

export default ContactPage
