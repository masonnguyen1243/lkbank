import { useState } from 'react';
import { Home } from './components/Home';
import { BankDetails } from './components/BankDetails';

type Page = 'home' | 'bank';

function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <>
      {page === 'home' ? (
        <Home onNavigateToBank={() => setPage('bank')} />
      ) : (
        <BankDetails onNavigateHome={() => setPage('home')} />
      )}
    </>
  );
}

export default App;
