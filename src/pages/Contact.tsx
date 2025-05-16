import React from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { useLanguage } from '@/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const ContactForm = () => {
  const { language } = useLanguage()
  const [state, handleSubmit] = useForm('xyyrvvyd')

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = React.useCallback(
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
        {/* 📩 Name */}
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

        {/* 📩 E-Mail */}
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

        {/* 📩 Betreff */}
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

        {/* 📩 Nachricht */}
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

        {/* ✅ Absenden */}
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

export default ContactForm
