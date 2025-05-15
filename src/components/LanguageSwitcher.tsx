import { useLanguage } from '@/hooks/useLanguage'

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="inline-flex rounded-md bg-gray-100 p-1">
      <button
        onClick={() => setLanguage('pt')}
        className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
          language === 'pt'
            ? 'border-b-2 border-portuguesered bg-white text-seagreen shadow-sm'
            : 'text-gray-600 hover:text-portuguesered'
        }`}
        aria-label="Alterar para Português"
      >
        <span className="flex items-center gap-1">
          <svg className="h-3 w-4" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
            <path fill="#006600" d="M0 0h640v480H0z" />
            <path fill="#ff0000" d="M256 0h384v480H256z" />
            <path
              fill="#ffcc00"
              d="M384 195.2a114.3 114.3 0 0 1-57 98.9 114.3 114.3 0 0 1-114.3 0 114.3 114.3 0 0 1-57-98.9 114.3 114.3 0 0 1 57-98.9 114.3 114.3 0 0 1 114.3 0 114.3 114.3 0 0 1 57 98.9z"
            />
            <path
              fill="#ff0000"
              d="M384 200a100 100 0 0 1-50 86.6 100 100 0 0 1-100 0 100 100 0 0 1-50-86.6 100 100 0 0 1 50-86.6 100 100 0 0 1 100 0 100 100 0 0 1 50 86.6z"
            />
            <path fill="#ffffff" d="M242 170h32v160h-32z" />
            <path fill="#ffffff" d="M314 182v48h48v40h-48v48h-48v-48h-48v-40h48v-48z" />
          </svg>
          <span>PT</span>
        </span>
      </button>

      <button
        onClick={() => setLanguage('de')}
        className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
          language === 'de'
            ? 'border-b-2 border-portuguesered bg-white text-seagreen shadow-sm'
            : 'text-gray-600 hover:text-portuguesered'
        }`}
        aria-label="Zu Deutsch wechseln"
      >
        <span className="flex items-center gap-1">
          <svg className="h-3 w-4" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffce00" d="M0 320h640v160H0z" />
            <path d="M0 0h640v160H0z" />
            <path fill="#d00" d="M0 160h640v160H0z" />
          </svg>
          <span>DE</span>
        </span>
      </button>
    </div>
  )
}
