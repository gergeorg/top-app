import React, { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useRouter } from 'next/router'

import { HeaderProps } from './Header.props'

import cn from 'classnames'
import styles from './Header.module.css'

import Logo from '../logo.svg'

import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon'
import { Sidebar } from '../Sidebar/Sidebar'

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	const [isOpened, setIsOpened] = useState<boolean>(false)
	const shouldReduceMotion = useReducedMotion()

	const router = useRouter()

	useEffect(() => {
		setIsOpened(false)
	}, [router])

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: { stiffness: shouldReduceMotion ? 20 : 0 },
		},

		closed: {
			opacity: shouldReduceMotion ? 1 : 0,
			x: '100%',
		},
	}

	return (
		<header className={cn(className, styles.header)} {...props}>
			<Logo />
			<ButtonIcon appearance='white' icon='burger' onClick={() => setIsOpened(true)} aria-label='открыть меню' />
			<motion.div
				className={styles.mobileMenu}
				variants={variants}
				initial={'closed'}
				animate={isOpened ? 'opened' : 'closed'}
			>
				<Sidebar />
				<ButtonIcon
					appearance='white'
					icon='close'
					className={styles.menuClose}
					onClick={() => setIsOpened(false)}
					aria-label='закрыть меню'
				/>
			</motion.div>
		</header>
	)
}
