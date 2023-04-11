import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

import { ReviewFormProps } from './ReviewForm.props'
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface'

import cn from 'classnames'
import styles from './ReviewForm.module.css'

import { Input } from '../Input/Input'
import { Rating } from '../Rating/Rating'
import { Textarea } from '../Textarea/Textarea'
import { Button } from '../Button/Button'

import CloseIcon from './close.svg'
import axios from 'axios'
import { API } from '../../helpers/api'

export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors,
	} = useForm<IReviewForm>()

	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const [isError, setIsError] = useState<string>()

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId })
			if (data.message) {
				setIsSuccess(true)
				reset()
			} else {
				setIsError('Что-то пошло не так')
			}
		} catch (e) {
			if (e instanceof Error) {
				setIsError(e.message)
			}
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} role='form'>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					{...register('name', { required: { value: true, message: 'Заполните имя' } })}
					placeholder='Имя'
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>

				<Input
					{...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
					className={styles.titleInput}
					placeholder='Заголовок отзыва'
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
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
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
					/>
				</div>

				<Textarea
					{...register('description', { required: { value: true, message: 'Заполните текст отзыва' } })}
					className={styles.description}
					placeholder='Текст отзыва'
					error={errors.description}
					tabIndex={isOpened ? 0 : -1}
					aria-label='Текст отзыва'
					aria-invalid={errors.description ? true : false}
				/>

				<div className={styles.submit}>
					<Button
						className={styles.button}
						appearance='primary'
						tabIndex={isOpened ? 0 : -1}
						onClick={() => clearErrors()}
					>
						Отправить
					</Button>
					<span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>

			{isSuccess && (
				<div className={styles.success} role='alert'>
					<div className={styles.successTitle}>Ваш отзыв отправлен</div>
					<div className={styles.description}>Спасибо, ваш отзыв будет опубликован после проверки</div>
					<button className={styles.close} onClick={() => setIsSuccess(false)} aria-label='Закрыть уведомление'>
						<CloseIcon />
					</button>
				</div>
			)}

			{isError && (
				<div className={styles.error} role='alert'>
					<div className={styles.errorTitle}>Что-то пошло не так, попробуйте обновить страницу</div>
					<div className={styles.errorDescription}>{isError}</div>
					<button className={styles.close} onClick={() => setIsError(undefined)} aria-label='Закрыть уведомление'>
						<CloseIcon />
					</button>
				</div>
			)}
		</form>
	)
}
