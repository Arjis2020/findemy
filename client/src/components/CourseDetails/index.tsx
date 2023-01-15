import { Box, Fade, Stack, useScrollTrigger } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Summary from './Summary'
import SummaryBanner from './SummaryBanner'
import SummaryCard from './SummaryCard'
import WhatYouWillLearn from './WhatYouWillLearn'

export default function CourseDetails() {
  const learningPoints = [
    'Build powerful, fast, user-friendly and reactive web apps',
    'Provide amazing user experiences by leveraging the power of JavaScript with ease',
    'Apply for high-paid jobs or work as a freelancer in one the most-demanded sectors you can find in web dev right now',
    'Learn all about React Hooks and React Components'
  ]

  const trigger = useScrollTrigger({
    disableHysteresis: true
  })

  return (
    <Stack>
      <Summary />
      <SummaryBanner />
      {!trigger && <Box
        sx={{
          position: 'absolute',
          top: '7.5rem',
          left: '64%',
          width: '21rem'
        }}
      >
        <SummaryCard />
      </Box>}
      <Fade
        appear={false}
        in={trigger}
        timeout={250}
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            position: 'fixed',
            top: '6rem',
            left: '64%',
            width: '21rem',
            zIndex: '99999'
          }}
        >
          <SummaryCard
            showVideo={false}
          />
        </Box>
      </Fade>
      <Stack
        px={10}
        maxWidth='66%'
      >
        <WhatYouWillLearn
          points={learningPoints}
        />
        <WhatYouWillLearn
          points={learningPoints}
        />
        <WhatYouWillLearn
          points={learningPoints}
        />
        <WhatYouWillLearn
          points={learningPoints}
        />
        <WhatYouWillLearn
          points={learningPoints}
        />
        <WhatYouWillLearn
          points={learningPoints}
        />
        <WhatYouWillLearn
          points={learningPoints}
        />
        <WhatYouWillLearn
          points={learningPoints}
        />
        <WhatYouWillLearn
          points={learningPoints}
        />
        <WhatYouWillLearn
          points={learningPoints}
        />
      </Stack>
    </Stack>
  )
}
