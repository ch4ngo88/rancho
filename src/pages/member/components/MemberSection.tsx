import React from 'react'
import MemberCard from './MemberCard'

type MemberData = {
  id: number
  name: string
  role: string
  regularImage: string
  costumeImage: string
  description?: string
  category: 'leadership' | 'music' | 'dancers'
  hoverText?: string
}

interface MemberSectionProps {
  title: string
  icon: React.ElementType
  members: MemberData[]
  isVisible: boolean
  hoveredMember: number | null
  setHoveredMember: (id: number | null) => void
}

const MemberSection = ({
  title,
  icon: Icon,
  members,
  isVisible,
  hoveredMember,
  setHoveredMember,
}: MemberSectionProps) => (
  <div
    className={`mb-8 rounded-xl bg-white/70 p-3 shadow-lg backdrop-blur-sm transition-opacity duration-500 sm:p-4 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}
  >
    <div className="mb-6 flex items-center gap-x-1 gap-y-1">
      <Icon className="h-6 w-6 text-seagreen" />
      <h3 className="text-xl font-bold text-seagreen">{title}</h3>
    </div>

    <div className="grid grid-cols-2 justify-items-center gap-x-1 gap-y-1 py-2 sm:grid-cols-2 sm:gap-x-0 sm:gap-y-1 md:grid-cols-3 lg:grid-cols-4">
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          hoveredMember={hoveredMember}
          setHoveredMember={setHoveredMember}
        />
      ))}
    </div>
  </div>
)

export default MemberSection
