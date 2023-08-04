
import MyTable from './Table/MyTable'
import Header from "./Header/Header"
import { Sort } from "./Components/Sort"
import './page.css'

export default function Home() {
  
 

  return (
    <div className="app">
      <Header/>
      <Sort/>
      <MyTable/>
    </div>
  )
}
