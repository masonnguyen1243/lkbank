import { useState } from 'react';
import { Home } from './pages/Home';
import { BankDetails } from './pages/BankDetails';
import { DisbursementDetails } from './pages/DisbursementDetails';
import { AutoDebitDetails } from './pages/AutoDebitDetails';
import { WalletDetails } from './pages/WalletDetails';

type Page = 'home' | 'bank' | 'disbursement' | 'autodebit' | 'wallet';

function App() {
  const [page, setPage] = useState<Page>('home');

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
