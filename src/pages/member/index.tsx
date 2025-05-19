import { useLanguage } from '@/hooks/useLanguage'
import { useState, useEffect, useMemo } from 'react'
import { UserRound, Music } from 'lucide-react'
import CustomDancingIcon from './components/DancingIcon'
import MemberSection from './components/MemberSection'
import { useMembersData } from './data/membersData'

const MembrosPage = () => {
  const { language } = useLanguage()
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const [visibleSections, setVisibleSections] = useState<string[]>([])
  const members = useMembersData()

  // Filter members by category - memoized to prevent unnecessary recalculations
  const categorizedMembers = useMemo(
    () => ({
      leadership: members.filter((member) => member.category === 'leadership'),
      music: members.filter((member) => member.category === 'music'),
      dancers: members.filter((member) => member.category === 'dancers'),
    }),
    [members],
  )

  useEffect(() => {
    // Staggered loading for better performance
    const loadSections = () => {
      setVisibleSections(['leadership'])

      setTimeout(() => {
        setVisibleSections((prev) => [...prev, 'music'])
      }, 200)

      setTimeout(() => {
        setVisibleSections((prev) => [...prev, 'dancers'])
      }, 400)
    }

    loadSections()

    // Cleanup function
    return () => {
      setHoveredMember(null)
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="section-title mb-6">{language === 'pt' ? 'A nossa Equipa' : 'Unser Team'}</h1>
      <div className="mx-auto max-w-5xl">
        <MemberSection
          title={language === 'pt' ? 'Gerência' : 'Leitung'}
          icon={UserRound}
          members={categorizedMembers.leadership}
          isVisible={visibleSections.includes('leadership')}
          hoveredMember={hoveredMember}
          setHoveredMember={setHoveredMember}
        />

        <MemberSection
          title={language === 'pt' ? 'Coro' : 'Chor'}
          icon={Music}
          members={categorizedMembers.music}
          isVisible={visibleSections.includes('music')}
          hoveredMember={hoveredMember}
          setHoveredMember={setHoveredMember}
        />
        <MemberSection
          title={language === 'pt' ? 'Dançarinos' : 'Tänzer/innen'}
          icon={CustomDancingIcon}
          members={categorizedMembers.dancers}
          isVisible={visibleSections.includes('dancers')}
          hoveredMember={hoveredMember}
          setHoveredMember={setHoveredMember}
        />
      </div>
    </div>
  )
}

export default MembrosPage
