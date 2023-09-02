//'use client'

//IMPORTS

import styles from './page.module.css'
import MatchupGenerator from './components/MatchupGenerator'
import getFullDeckList from './data'

//BASE COMPONENT

export default function Home() {
	let data = getFullDeckList();
	return (
		<main className={styles.main}>
		  <MatchupGenerator data={data}/>
		</main>
	)
}