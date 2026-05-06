import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Menu from '../pages/Menu'; 
import HeroSection from '../features/home/HeroSection';
import CartDrawer from '../features/cart/CartDrawer';
import Checkout from '../components/Checkout'; 
import OurStory from '../pages/OurStory';
import FAQs from '../pages/FAQs';
import Privacy from '../pages/Privacy';
import ScrollToTop from '../components/ui/ScrollToTop'; // ← Naya Import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[white] flex flex-col relative"> {/* relative class zaroori hai */}
        <Navbar />
        <CartDrawer /> 

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <Menu />
              </>
            } />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/faq" element={<FAQs />} />
            <Route path="/privacy-policy" element={<Privacy />} />
          </Routes>
        </main>

        <Footer />
        
        {/* Scroll To Top Button yahan add kiya */}
        <ScrollToTop /> 
      </div>
    </Router>
  );
}

export default App;