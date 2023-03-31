import React from 'react'
import { AdvantagesProps } from './Advantages.props'
import styles from './Advantages.module.css'

import AdvantagesIcon from './advantage.svg'

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
	return (
		<>
			{advantages.map((a) => (
				<div key={a._id} className={styles.advantage}>
					<AdvantagesIcon />
					<div className={styles.title}>{a.title}</div>
					{/* <hr className={styles.vline} /> */}
					<div className={styles.vline}></div>
					<div>{a.description}</div>
				</div>
			))}
		</>
	)
}
