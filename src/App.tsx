import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { BankDetails } from './pages/BankDetails';
import { PayoutDetails } from './pages/PayoutDetails';
import { OnepayDetails } from './pages/OnepayDetails';
import { PayooDetails } from './pages/PayooDetails';
import { FaqsDetails } from './pages/FaqsDetails';

type Page = 'home' | 'bank' | 'payout' | 'onepay' | 'payoo' | 'faqs';

const getPageFromHash = (hash: string): Page => {
  if (hash.startsWith('#/bank')) return 'bank';
  if (hash.startsWith('#/payout')) return 'payout';
  if (hash.startsWith('#/onepay')) return 'onepay';
  if (hash.startsWith('#/payoo')) return 'payoo';
  if (hash.startsWith('#/faqs')) return 'faqs';
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

  const handleNavigateToPayout = () => {
    window.location.hash = '#/payout';
  };

  const handleNavigateToOnepay = () => {
    window.location.hash = '#/onepay';
  };

  const handleNavigateToPayoo = () => {
    window.location.hash = '#/payoo';
  };

  const handleNavigateToFaqs = () => {
    window.location.hash = '#/faqs';
  };

  const handleNavigateHome = () => {
    window.location.hash = '#/';
  };

  return (
    <>
      {page === 'home' && (
        <Home
          onNavigateToBank={handleNavigateToBank}
          onNavigateToDisbursement={handleNavigateToPayout}
          onNavigateToAutoDebit={handleNavigateToOnepay}
          onNavigateToWallet={handleNavigateToPayoo}
          onNavigateToFaqs={handleNavigateToFaqs}
        />
      )}
      {page === 'bank' && (
        <BankDetails onNavigateHome={handleNavigateHome} />
      )}
      {page === 'payout' && (
        <PayoutDetails onNavigateHome={handleNavigateHome} />
      )}
      {page === 'onepay' && (
        <OnepayDetails onNavigateHome={handleNavigateHome} />
      )}
      {page === 'payoo' && (
        <PayooDetails onNavigateHome={handleNavigateHome} />
      )}
      {page === 'faqs' && (
        <FaqsDetails onNavigateHome={handleNavigateHome} />
      )}
    </>
  );
}

export default App;
