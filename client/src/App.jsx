import Navbar from './components/Navbar'
import Welcome from './components/Welcome'
import { Services, Transactions , Footer } from './components'

function App() {
  

  return (
   <div className='max-h-screen'>
         <div className='gradient-bg-welcome'>
          <Navbar />
          <Welcome />
        </div>
        <div>
          <Services />
          <Transactions />
          <Footer />
        </div>
   </div>
  )
}

export default App
