'use client'

//IMPORTS

import styles from './page.module.css'
import MatchupGenerator from './components/MatchupGenerator'

//BASE COMPONENT

export default function Home() {
	return (
		<main className={styles.main}>
		  <MatchupGenerator />
		</main>
	)
}