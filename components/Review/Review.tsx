import React from 'react'
import { ReviewProps } from './Review.props'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import cn from 'classnames'
import styles from './Review.module.css'

import UserIcon from './user.svg'
import { Rating } from '../Rating/Rating'
import { P } from '../P/P'

export const Review = ({ review, className, ...props }: ReviewProps): JSX.Element => {
	const { name, title, description, createdAt, rating } = review
	return (
		<div className={cn(styles.review, className)} {...props}>
			<UserIcon className={styles.user} />

			<div className={styles.title}>
				<span className={styles.name}>{name}: </span>&nbsp;&nbsp;
				<span>{title}</span>
			</div>

			<div className={styles.date}>{format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}</div>

			<Rating className={styles.rating} rating={rating} />

			<P className={styles.description} fontSize='s'>
				{description}
			</P>
		</div>
	)
}
