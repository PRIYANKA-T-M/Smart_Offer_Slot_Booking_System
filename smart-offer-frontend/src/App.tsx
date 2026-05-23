import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/Offers')
      .then(res => res.json())
      .then(data => setOffers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Smart Offer System</h1>
      </header>
      <main>
        <h2>Active Offers</h2>
        {offers.length === 0 ? (
          <p>No active offers found.</p>
        ) : (
          <ul>
            {offers.map((offer: any) => (
              <li key={offer.id}>
                {offer.title} - ${offer.offerPrice}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
