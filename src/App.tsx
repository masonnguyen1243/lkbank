import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { BankDetails } from './components/BankDetails';

type Page = 'home' | 'bank';

function App() {
  const [page, setPage] = useState<Page>(() => {
    const hash = window.location.hash;
    return hash.startsWith('#/bank') ? 'bank' : 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/bank')) {
        setPage('bank');
      } else {
        setPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateToBank = () => {
    window.location.hash = '#/bank';
  };

  const handleNavigateHome = () => {
    window.location.hash = '#/';
  };

  return (
    <>
      {page === 'home' ? (
        <Home onNavigateToBank={handleNavigateToBank} />
      ) : (
        <BankDetails onNavigateHome={handleNavigateHome} />
      )}
    </>
  );
}

export default App;
