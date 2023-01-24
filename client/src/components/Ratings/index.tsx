import { StarBorder } from '@mui/icons-material'
import { Rating } from '@mui/material'

type RatingProps = {
  value: number
}

export default function Ratings({ value }: RatingProps) {
  return (
    <Rating
      value={value}
      readOnly
      precision={0.5}
      size='small'
      sx={{
        color: '#e59819',
        fontSize: 15
      }}
      emptyIcon={
        <StarBorder
          fontSize='inherit'
          sx={{
            color: '#e59819'
          }}
        />
      }
    />
  )
}
