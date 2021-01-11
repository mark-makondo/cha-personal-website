import { React, useEffect } from 'react';
// libraries

// components
import Navbar from './components/navbar.js';
import Header from './components/header.js';
import Featured from './components/featured.js';
import Footer from './components/footer.js';

function App() {
  
  useEffect(() => {

  }, []);

  return (
    <div className="App">
      <Navbar />
      <Header />
      <Featured />
      <Footer />
    </div>
  );
}

export default App;
