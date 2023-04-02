import React, { useState } from 'react'
import Image from 'next/image'

import { ProductProps } from './Product.props'

import styles from './Product.module.css'
import cn from 'classnames'

import { Card } from '../Card/Card'
import { Rating } from '../Rating/Rating'
import { Tag } from '../Tag/Tag'
import { Button } from '../Button/Button'
import { priceRu, declOfNum } from '../../helpers/helpers'
import { Divider } from '../Divider/Divider'
import { P } from '../P/P'
import { Review } from '../Review/Review'

export const Product = ({ product }: ProductProps): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false)

	return (
		<>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<Image src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title} width={70} height={70} />
				</div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.price}>
					{priceRu(product.price)}
					{product.oldPrice && (
						<Tag className={styles.oldPrice} color='green'>
							{priceRu(product.price - product.oldPrice)}
						</Tag>
					)}
				</div>
				<div className={styles.credit}>
					{priceRu(product.credit)}
					<span className={styles.month}>/мес</span>
				</div>

				<div className={styles.rating}>
					<Rating rating={product.reviewAvg ?? product.initialRating} />
				</div>

				<div className={styles.tags}>
					{product.categories.map((c) => (
						<Tag key={c} color='ghost'>
							{c}
						</Tag>
					))}
				</div>

				<div className={styles.priceTitle}>Цена</div>
				<div className={styles.creditTitle}>в кредит</div>
				<div className={styles.rateTitle}>
					{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
				</div>

				<Divider className={styles.hr} />

				<P fontSize='m' className={styles.description}>
					{product.description}
				</P>

				<div className={styles.feature}>
					{product.characteristics.map((c) => (
						<div key={c.name} className={styles.characteristics}>
							<span className={styles.characteristicName}>{c.name}</span>
							<span className={styles.dots}></span>
							<span className={styles.characteristicValue}>{c.value}</span>
						</div>
					))}
				</div>

				<div className={styles.advBlock}>
					{product.advantages && (
						<div className={styles.adventages}>
							<div className={styles.advTitle}>Преимущества</div>
							<div>{product.advantages}</div>
						</div>
					)}

					{product.disadvantages && (
						<div className={styles.disadvantages}>
							<div className={styles.advTitle}>Недостатки</div>
							<div>{product.disadvantages}</div>
						</div>
					)}
				</div>

				<Divider className={cn(styles.hr, styles.hr2)} />

				<div className={styles.actions}>
					<Button className={styles.readMoreBtn} appearance='primary'>
						Узнать подробнее
					</Button>
					<Button
						appearance='ghost'
						arrow={isReviewOpened ? 'down' : 'right'}
						onClick={() => setIsReviewOpened(!isReviewOpened)}
					>
						Читать отзывы
					</Button>
				</div>
			</Card>
			<Card
				className={cn(styles.reviews, {
					[styles.opened]: isReviewOpened,
					[styles.closed]: !isReviewOpened,
				})}
				color='blue'
			>
				{product.reviews.map((r) => (
					<>
						<Review key={r._id} review={r} />
						<Divider />
					</>
				))}
			</Card>
		</>
	)
}
