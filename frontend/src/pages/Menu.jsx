import React from 'react';
import CategoryBar from '../components/CategoryBar';
import SearchBar from '../components/SearchBar';
import DiscountBanner from '../components/DiscountBanner';
import FeaturedSelections from '../components/FeaturedSelections';
import BreakFastSelection from '../components/BreakFastSelection';
import SignatureHotCoffee from '../components/SignatureHotCoffee';
import IcedCoffeeCreation from '../components/IcedCoffeeCreation';
import ArtisanFrappes from '../components/ArtisanFrappes';
import MatchaCollection from '../components/MatchaCollection';
import HandBrew from '../components/HandBrew';
import BakerySelection from '../components/BakerySelection';

function Menu() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CategoryBar />
      <div className="mt-4 px-4 sm:px-16"><SearchBar /><DiscountBanner amount="20" className="mt-4"/></div>
      <main className="p-4 sm:p-16">
        <FeaturedSelections />
        <BreakFastSelection />
        <SignatureHotCoffee />
        <IcedCoffeeCreation />
        <ArtisanFrappes />
        <MatchaCollection />
        <HandBrew />
        <BakerySelection />
      </main>
    </div>
  );
}
export default Menu;