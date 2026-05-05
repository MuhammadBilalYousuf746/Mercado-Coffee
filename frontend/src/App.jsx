import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Menu from './pages/Menu'; 
import HeroSection from './components/HeroSection';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout'; // ← updated path (pages se components mein)
import OurStory from './pages/OurStory';
import FAQs from './pages/FAQs';
import Privacy from './pages/Privacy';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[white] flex flex-col">
        {/* Navigation components fixed at top/global */}
        <Navbar />
        <CartDrawer /> 

        <main className="flex-grow">
          <Routes>
            {/* Main Home Page */}
            <Route path="/" element={
              <>
                <HeroSection />
                <Menu />
              </>
            } />

            {/* Checkout Page */}
            <Route path="/checkout" element={<Checkout />} />

            {/* Support & Brand Pages */}
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/faq" element={<FAQs />} />
            <Route path="/privacy-policy" element={<Privacy />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;