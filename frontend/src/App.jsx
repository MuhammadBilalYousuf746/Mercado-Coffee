import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Menu from './pages/Menu'; 
import HeroSection from './components/HeroSection'; // HeroSection import karein

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Hero Section yahan aayega, Navbar ke foran baad */}
      <HeroSection />

      {/* Menu component niche continue hoga */}
      <Menu />

      <Footer />
    </div>
  )
}

export default App;