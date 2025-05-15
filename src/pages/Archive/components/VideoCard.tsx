import React from 'react'
import { asset } from '@/lib/asset' // ➊  neu

interface VideoCardProps {
  videoSrc: string
  title: React.ReactNode
  description: string
}

const VideoCard = ({ videoSrc, title, description }: VideoCardProps) => {
  const fullSrc = asset(videoSrc) // ➋  ✅ jetzt innerhalb

  return (
    <div className="glass-card overflow-hidden">
      <video
        controls
        className="w-full rounded-t-xl transition-transform hover:scale-[1.01]"
        preload="metadata"
      >
        <source src={fullSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="p-4">
        <h4 className="font-medium text-seagreen">{title}</h4>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}

export default VideoCard
