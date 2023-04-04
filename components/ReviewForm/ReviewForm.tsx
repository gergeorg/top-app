import React from 'react'
import { useForm, Controller } from 'react-hook-form'

import { ReviewFormProps } from './ReviewForm.props'
import { IReviewForm } from './ReviewForm.interface'

import cn from 'classnames'
import styles from './ReviewForm.module.css'

import { Input } from '../Input/Input'
import { Rating } from '../Rating/Rating'
import { Textarea } from '../Textarea/Textarea'
import { Button } from '../Button/Button'

import CloseIcon from './close.svg'

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IReviewForm>()

	const onSubmit = (data: IReviewForm) => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					{...register('name', { required: { value: true, message: 'Заполните имя' } })}
					placeholder='Имя'
					error={errors.name}
				/>

				<Input
					{...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
					className={styles.titleInput}
					placeholder='Заголовок отзыва'
					error={errors.title}
				/>

				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
						render={({ field }) => (
							<Rating
								rating={field.value}
								ref={field.ref}
								isEditable
								setRating={field.onChange}
								error={errors.rating}
							/>
						)}
					/>
				</div>

				<Textarea
					{...register('description', { required: { value: true, message: 'Заполните текст отзыва' } })}
					className={styles.description}
					placeholder='Текст отзыва'
					error={errors.description}
				/>

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
		</form>
	)
}
