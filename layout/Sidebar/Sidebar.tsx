import React from 'react'
import { SidebarProps } from './Sidebar.props'
import styles from './Layout.module.css'

export const Sidebar = ({ ...props }: SidebarProps): JSX.Element => {
	return <div {...props}>Sidebar</div>
}
