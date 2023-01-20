import { Box, Fade, Stack, Theme, useMediaQuery, useScrollTrigger } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getCourseDetails } from '../../API/handlers/course.handler'
import Description from './Description'
import Instructor from './Instructor'
import Requirements from './Requirements'
import Summary from './Summary'
import SummaryBanner from './SummaryBanner'
import SummaryCard from './SummaryCard'
import TopCompanies from './TopCompanies'
import WhatYouWillLearn from './WhatYouWillLearn'

export default function CourseDetails() {
  const [courseDetails, setCourseDetails] = useState<Course>()

  // const learningPoints = [
  //   'Build powerful, fast, user-friendly and reactive web apps',
  //   'Provide amazing user experiences by leveraging the power of JavaScript with ease',
  //   'Apply for high-paid jobs or work as a freelancer in one the most-demanded sectors you can find in web dev right now',
  //   'Learn all about React Hooks and React Components'
  // ]

  const [searchParams] = useSearchParams()

  useEffect(() => {
    getCourseDetails(searchParams.get('cid') || "")
      .then(data => setCourseDetails(data))
  }, [])

  const laptop = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop'))
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))

  const trigger = useScrollTrigger({
    disableHysteresis: true
  })

  const stackRef = useRef<Element>()
  const cardRef = useRef<Element>()

  const [afterScrollTrigger, setAfterScrollTrigger] = useState(false)

  const handleScroll = () => {
    const stackRect = stackRef.current?.getBoundingClientRect()
    const cardRect = cardRef.current?.getBoundingClientRect()

    const stackBottom = Math.floor(stackRect?.bottom || 0)
    const cardBottom = Math.floor(cardRect?.bottom || 0)

    setAfterScrollTrigger(
      stackBottom <= cardBottom + 30
    )
  }

  const cardProperties = {
    left: '66%',
    width: '21rem'
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    })
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <Stack
      sx={{
        position: 'relative'
      }}
      alignItems={laptop ? 'center' : 'stretch'}
      ref={stackRef}
    >
      <Summary
        values={courseDetails || {}}
      />
      <SummaryBanner
        values={courseDetails || {}}
      />
      {!laptop && <Box>
        {!trigger && <Box
          sx={{
            position: 'absolute',
            top: '2.5rem',
            left: cardProperties.left,
            width: cardProperties.width
          }}
        >
          <SummaryCard
            values={courseDetails || {}}
          />
        </Box>}
        <Fade
          appear={false}
          in={trigger && !afterScrollTrigger}
        >
          <Box
            sx={{
              position: 'fixed',
              top: '1rem',
              bottom: 'none',
              left: cardProperties.left,
              width: cardProperties.width,
              zIndex: '99999',
            }}
            ref={cardRef}
          >
            <SummaryCard
              showVideo={false}
              values={courseDetails || {}}
            />
          </Box>
        </Fade>
        <Fade
          in={afterScrollTrigger}
          appear={false}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 'auto',
              bottom: '2.3rem',
              left: cardProperties.left,
              width: cardProperties.width,
              zIndex: '-1',
            }}
          >
            <SummaryCard
              showVideo={false}
              values={courseDetails || {}}
            />
          </Box>
        </Fade>
      </Box>}
      <Stack
        pl={!laptop ? 15 : !mobile ? 7.5 : 2}
        pr={!laptop ? 8 : !mobile ? 7.5 : 2}
        maxWidth={!laptop ? '66%' : !mobile ? '74%' : '100%'}
        alignItems={laptop ? 'center' : 'stretch'}
      >
        <WhatYouWillLearn
          points={courseDetails?.learnings || []}
        />
        <TopCompanies />
        <Requirements
          requirements={courseDetails?.requirements || []}
        />
        <Description
          description={courseDetails?.detailedDescription || ""}
        />
        <Instructor
          instructors={courseDetails?.instructors || []}
        />
      </Stack>
    </Stack>
  )
}
