import Image from 'next/image'
import SearchBox from './components/SearchBox'
import Header from './components/Header'
import PlantCard from './components/PlantCard'

export default function Home() {
  return (
    <>
      <Header />
      <SearchBox />
      <PlantCard />
    </>
  )
}
