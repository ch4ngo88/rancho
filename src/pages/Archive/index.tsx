import { useState } from 'react'
import { useMetaSEO } from '@/hooks/useMetaSEO'
import ArchiveLayout from './components/ArchiveLayout'
import ArchivePhotos from './components/ArchivePhotos'
import ArchiveAudio from './components/ArchiveAudio'
import ArchiveVideos from './components/ArchiveVideos'
import useArchiveImages from './hooks/useArchiveImages'

const Archive = () => {
  useMetaSEO('archive')
  const [activeTab, setActiveTab] = useState<'photos' | 'audio' | 'videos'>('photos')
  const { images, imagesLoaded } = useArchiveImages()

  return (
    <ArchiveLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {/* Photos Tab */}
      {activeTab === 'photos' && <ArchivePhotos images={images} imagesLoaded={imagesLoaded} />}

      {/* Audio Tab */}
      {activeTab === 'audio' && <ArchiveAudio />}

      {/* Videos Tab */}
      {activeTab === 'videos' && <ArchiveVideos />}
    </ArchiveLayout>
  )
}

export default Archive
