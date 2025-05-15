import React, { useRef, useState, useEffect } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'

interface AudioPlayerProps {
  audioSrc: string
  title: string
  year: string
  description?: string
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const AudioPlayer = ({ audioSrc, title, year, description }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  const toggleAudio = () => {
    if (!audioRef.current) return
    if (isAudioPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsAudioPlaying(!isAudioPlaying)
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    setProgress(audioRef.current.currentTime)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setProgress(newTime)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return

    const onLoadedMetadata = () => {
      setDuration(audioEl.duration || 0)
    }

    audioEl.addEventListener('loadedmetadata', onLoadedMetadata)

    return () => {
      audioEl.removeEventListener('loadedmetadata', onLoadedMetadata)
    }
  }, [])

  return (
    <div className="mb-6 w-full max-w-md rounded-xl bg-gradient-to-r from-seagreen/10 to-portuguesered/10 p-6 shadow-md">
      <div className="mb-2 flex items-center gap-4">
        <button
          onClick={toggleAudio}
          className={`rounded-full p-4 ${
            isAudioPlaying ? 'bg-portuguesered' : 'bg-seagreen'
          } text-white`}
        >
          {isAudioPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" fill="white" />
          )}
        </button>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-600">{year}</p>
        </div>
      </div>

      {/* Volume horizontal unterhalb */}
      <div className="mb-4 mt-2 flex items-center justify-end gap-2">
        <Volume2 className="h-4 w-4 text-seagreen" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="h-1 w-24 appearance-none rounded-full bg-seagreen/20 accent-seagreen [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-seagreen"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="w-12 text-right text-sm text-gray-600">{formatTime(progress)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          step="0.1"
          onChange={handleSeek}
          className="h-1 w-full appearance-none rounded-full bg-seagreen/20 accent-seagreen [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-seagreen"
        />
        <span className="w-12 text-sm text-gray-600">{formatTime(duration)}</span>
      </div>

      <audio
        ref={audioRef}
        className="hidden"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsAudioPlaying(false)}
        preload="metadata"
      >
        <source src={audioSrc} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {description && (
        <p className="mt-4 text-center text-xs italic">Hamburg Radio FSK 93,0 MHz Antenne </p>
      )}
    </div>
  )
}

export default AudioPlayer
