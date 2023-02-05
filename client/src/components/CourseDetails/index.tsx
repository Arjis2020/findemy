import { Box, Fade, Stack, Theme, useMediaQuery, useScrollTrigger } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCourseDetails } from '../../API/handlers/course.handler'
import ICourseModel from '../../models/course.model'
import { triggerAddToCart } from '../../redux/reducers/cart.reducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import Loader from '../Loader'
import Description from './Description'
import Instructor from './Instructor'
import Requirements from './Requirements'
import Summary from './Summary'
import SummaryBanner from './SummaryBanner'
import SummaryCard from './SummaryCard'
import TopCompanies from './TopCompanies'
import WhatYouWillLearn from './WhatYouWillLearn'

export default function CourseDetails() {
  const [courseDetails, setCourseDetails] = useState<ICourseModel>()

  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getCourseDetails(slug!)
      .then(data => setCourseDetails(data))
  }, [])

  const laptop = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop'))
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))

  const trigger = useScrollTrigger({
    disableHysteresis: true
  })

  const stackRef = useRef<Element>()
  const cardRef = useRef<Element>()

  const user = useAppSelector((state) => state.authReducer)

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
  }, [])

  const dispatch = useAppDispatch()

  const onAddToCartClicked = () => {
    if (user.data?._id) {
      dispatch(triggerAddToCart(courseDetails?._id!))
    }
    else {
      navigate('/login', {
        replace: true
      })
    }
  }

  return (
    courseDetails ?
      <Stack
        sx={{
          position: 'relative'
        }}
        // alignItems={laptop ? 'center' : 'stretch'}
        ref={stackRef}
      >
        <Summary
          values={courseDetails}
        />
        <SummaryBanner
          onAddToCartClicked={onAddToCartClicked}
          values={courseDetails}
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
              values={courseDetails}
              onAddToCartClicked={onAddToCartClicked}
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
                values={courseDetails}
                onAddToCartClicked={onAddToCartClicked}
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
                zIndex: 1,
              }}
            >
              <SummaryCard
                showVideo={false}
                values={courseDetails}
                onAddToCartClicked={onAddToCartClicked}
              />
            </Box>
          </Fade>
        </Box>}
        <Stack
          pl={!laptop ? 15 : !mobile ? 7.5 : 2}
          pr={!laptop ? 8 : !mobile ? 7.5 : 2}
          maxWidth={!laptop ? '66%' : '100%'}
          alignItems={laptop ? 'center' : 'stretch'}
        >
          <Stack
            maxWidth={!mobile && laptop ? '71%' : '100%'}
          >
            <WhatYouWillLearn
              points={courseDetails.learnings}
            />
            <TopCompanies />
            <Requirements
              requirements={courseDetails.requirements}
            />
            <Description
              description={courseDetails.detailedDescription}
            />
            <Instructor
              instructors={courseDetails.instructors}
            />
          </Stack>
        </Stack>
      </Stack>
      :
      <Loader />
  )
}
