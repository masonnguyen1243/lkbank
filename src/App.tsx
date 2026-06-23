import { useState } from 'react';
import { Home } from './pages/Home';
import { BankDetails } from './pages/BankDetails';
import { DisbursementDetails } from './pages/DisbursementDetails';
import { AutoDebitDetails } from './pages/AutoDebitDetails';
import { WalletDetails } from './pages/WalletDetails';

type Page = 'home' | 'bank' | 'disbursement' | 'autodebit' | 'wallet';

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
      {page === 'home' && (
        <Home
          onNavigateToBank={() => setPage('bank')}
          onNavigateToDisbursement={() => setPage('disbursement')}
          onNavigateToAutoDebit={() => setPage('autodebit')}
          onNavigateToWallet={() => setPage('wallet')}
        />
      )}
      {page === 'bank' && (
        <BankDetails onNavigateHome={() => setPage('home')} />
      )}
      {page === 'disbursement' && (
        <DisbursementDetails onNavigateHome={() => setPage('home')} />
      )}
      {page === 'autodebit' && (
        <AutoDebitDetails onNavigateHome={() => setPage('home')} />
      )}
      {page === 'wallet' && (
        <WalletDetails onNavigateHome={() => setPage('home')} />
      )}
    </>
  );
}

export default App;
