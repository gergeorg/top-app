import React from 'react'
import { ReviewFormProps } from './ReviewForm.props'

import cn from 'classnames'
import styles from './ReviewForm.module.css'

import { Input } from '../Input/Input'
import { Rating } from '../Rating/Rating'
import { Textarea } from '../Textarea/Textarea'
import { Button } from '../Button/Button'

import CloseIcon from './close.svg'

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
	return (
		<>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input placeholder='Имя' />
				<Input className={styles.titleInput} placeholder='Заголовок отзыва' />

				<div className={styles.rating}>
					<span>Оценка:</span>
					<Rating rating={0} isEditable />
				</div>

				<Textarea className={styles.description} placeholder='Текст отзыва' />

				<div className={styles.submit}>
					<Button className={styles.button} appearance='primary'>
						Отправить
					</Button>
					<span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>

			<div className={styles.success}>
				<div className={styles.successTitle}>Ваш отзыв отправлен</div>
				<div className={styles.description}>Спасибо, ваш отзыв будет опубликован после проверки</div>
				<CloseIcon className={styles.close} />
			</div>
		</>
	)
}
