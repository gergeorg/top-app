import { useState } from 'react'
import { Button, Htag, P, Tag, Rating } from '../components'
import { withLayout } from '../layout/Layout'

function Home(): JSX.Element {
	const [rating, setRating] = useState<number>(4)

	return (
		<>
			<Htag tag='h1'>Курсы по Photoshop</Htag>
			<Rating rating={rating} isEditable setRating={setRating} />
		</>
	)
}

export default withLayout(Home)
