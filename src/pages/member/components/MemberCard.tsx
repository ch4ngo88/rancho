import OptimizedImage from '@/components/OptimizedImage'
import { useCanHover } from '@/hooks/use-can-hover'

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

interface MemberCardProps {
  member: MemberData
  hoveredMember: number | null
  setHoveredMember: (id: number | null) => void
}

const MemberCard = ({ member, hoveredMember, setHoveredMember }: MemberCardProps) => {
  const canHover = useCanHover()

  const handleInteraction = () => {
    if (hoveredMember === member.id) {
      setHoveredMember(null)
    } else {
      setHoveredMember(member.id)
    }
  }

  const isHovered = hoveredMember === member.id

  const showRole = member.category !== 'dancers'

  return (
    <div className="mb-6 flex justify-center sm:block">
      <div
        className="relative mb-6 flex h-[300px] w-[200px] scale-[0.75] transform cursor-pointer flex-col items-center justify-start overflow-hidden rounded-xl bg-white shadow-md sm:scale-100"
        onMouseEnter={() => canHover && setHoveredMember(member.id)}
        onMouseLeave={() => canHover && setHoveredMember(null)}
        onClick={() => !canHover && handleInteraction()}
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <OptimizedImage
            src={isHovered ? member.costumeImage : member.regularImage}
            alt={
              isHovered
                ? `${member.name} in traditioneller portugiesischer Tracht als ${member.role}`
                : `${member.name} - ${member.role} bei Rancho Folclórico Tradições Portuguesas`
            }
            className={`h-full w-full object-cover transition-transform duration-500 ease-in-out ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
          {isHovered && member.hoverText && (
            <div className="absolute bottom-0 left-0 z-10 w-full bg-seagreen/80 px-1 py-2 text-center text-sm font-semibold text-white">
              {member.hoverText}
            </div>
          )}
        </div>
        <div className="flex h-[30%] w-full flex-col items-center justify-center px-2 py-2">
          <h4 className="text-center text-base font-semibold text-seagreen">{member.name}</h4>
          {showRole && <p className="mt-1 text-center text-sm text-gray-600">{member.role}</p>}
        </div>
      </div>
    </div>
  )
}

export default MemberCard
