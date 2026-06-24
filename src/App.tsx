import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { BankDetails } from './pages/BankDetails';
import { DisbursementDetails } from './pages/DisbursementDetails';
import { AutoDebitDetails } from './pages/AutoDebitDetails';
import { WalletDetails } from './pages/WalletDetails';

type Page = 'home' | 'bank' | 'disbursement' | 'autodebit' | 'wallet';

const getPageFromHash = (hash: string): Page => {
  if (hash.startsWith('#/bank')) return 'bank';
  if (hash.startsWith('#/disbursement')) return 'disbursement';
  if (hash.startsWith('#/autodebit')) return 'autodebit';
  if (hash.startsWith('#/wallet')) return 'wallet';
  return 'home';
};

function App() {
  const [page, setPage] = useState<Page>(() => getPageFromHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateToBank = () => {
    window.location.hash = '#/bank';
  };

  const handleNavigateToDisbursement = () => {
    window.location.hash = '#/disbursement';
  };

  const handleNavigateToAutoDebit = () => {
    window.location.hash = '#/autodebit';
  };

  const handleNavigateToWallet = () => {
    window.location.hash = '#/wallet';
  };

  const handleNavigateHome = () => {
    window.location.hash = '#/';
  };

  return (
    <>
      {page === 'home' && (
        <Home
          onNavigateToBank={handleNavigateToBank}
          onNavigateToDisbursement={handleNavigateToDisbursement}
          onNavigateToAutoDebit={handleNavigateToAutoDebit}
          onNavigateToWallet={handleNavigateToWallet}
        />
      )}
      {page === 'bank' && (
        <BankDetails onNavigateHome={handleNavigateHome} />
      )}
      {page === 'disbursement' && (
        <DisbursementDetails onNavigateHome={handleNavigateHome} />
      )}
      {page === 'autodebit' && (
        <AutoDebitDetails onNavigateHome={handleNavigateHome} />
      )}
      {page === 'wallet' && (
        <WalletDetails onNavigateHome={handleNavigateHome} />
      )}
    </>
  );
}

export default App;
