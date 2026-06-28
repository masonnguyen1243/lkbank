import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { BankDetails } from './pages/BankDetails';
import { PayoutDetails } from './pages/PayoutDetails';
import { OnepayDetails } from './pages/OnepayDetails';
import { PayooDetails } from './pages/PayooDetails';
import { FaqsDetails } from './pages/FaqsDetails';
import { ContactDetails } from './pages/ContactDetails';

type Page = 'home' | 'bank' | 'payout' | 'onepay' | 'payoo' | 'faqs' | 'contact';

const getPageFromHash = (hash: string): Page => {
  if (hash.startsWith('#/bank')) return 'bank';
  if (hash.startsWith('#/payout')) return 'payout';
  if (hash.startsWith('#/onepay')) return 'onepay';
  if (hash.startsWith('#/payoo')) return 'payoo';
  if (hash.startsWith('#/faqs')) return 'faqs';
  if (hash.startsWith('#/contact')) return 'contact';
  return 'home';
};

function App() {
  const [page, setPage] = useState<Page>(() => getPageFromHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromHash(window.location.hash));
      window.scrollTo(0, 0);
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

  const handleNavigateToContact = () => {
    window.location.hash = '#/contact';
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
          onNavigateToContact={handleNavigateToContact}
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
      {page === 'contact' && (
        <ContactDetails onNavigateHome={handleNavigateHome} />
      )}
    </>
  );
}

export default App;
