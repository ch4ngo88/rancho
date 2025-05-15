import AudioPlayer from './AudioPlayer'
import { useLanguage } from '@/hooks/useLanguage'
import { asset } from '@/lib/asset'

const ArchiveAudio = () => {
  const { t } = useLanguage()

  return (
    <div className="mx-auto mb-12 w-full max-w-3xl animate-fade-in">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-portuguesered">{t('interviews')}</h2>
      </div>

      <div className="rounded-xl bg-white/70 p-6 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <AudioPlayer
            audioSrc={asset(
              'images/archive/audio/Café com Leite & Pimenta Interview Tradicoes.mp3',
            )}
            title="Café com Leite & Pimenta Interview"
            year="2024"
            description="(Café com Leite & Pimenta Interview 2024)"
          />
        </div>
      </div>
    </div>
  )
}

export default ArchiveAudio
