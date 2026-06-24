import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaqsSidebar, FaqGroupInfo } from '../components/faqs/FaqsSidebar';
import '../styles/faqs.css';

interface FaqsDetailsProps {
  onNavigateHome: () => void;
}

interface FaqContentPart {
  type: 'text' | 'link';
  text: string;
  url?: string;
  bold?: boolean;
}

interface FaqItem {
  id: string;
  category: 'technical' | 'onboarding' | 'operations' | 'business';
  question: string;
  contentParts: FaqContentPart[];
  hasSpecialGrid?: boolean;
}

const FAQ_GROUPS: FaqGroupInfo[] = [
  { id: 'technical', name: 'Kỹ thuật', fullName: 'Tích hợp API & Kết nối (Kỹ thuật)', num: 1 },
  { id: 'onboarding', name: 'Thiết lập', fullName: 'Dịch vụ & Thiết lập ban đầu (Onboarding)', num: 2 },
  { id: 'operations', name: 'Vận hành', fullName: 'Đối soát & Xử lý giao dịch lỗi (Vận hành)', num: 3 },
  { id: 'business', name: 'Kinh doanh', fullName: 'Chính sách phí & Hỗ trợ (Kinh doanh)', num: 4 },
];

const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'technical',
    question: 'Làm thế nào để lấy thông tin Client ID & Secret Token để tích hợp?',
    contentParts: [
      { type: 'text', text: 'Đăng ký/Đăng nhập tài khoản trên ' },
      { type: 'link', text: 'app.tingee.vn', url: 'https://app.tingee.vn' },
      { type: 'text', text: ', truy cập mục Developers từ avatar tài khoản để lấy Client ID và Secret Token.' }
    ]
  },
  {
    id: 'faq-2',
    category: 'technical',
    question: 'Tôi cần cấu hình Webhook (IPN) như thế nào để nhận thông báo thanh toán tức thời?',
    contentParts: [
      { type: 'text', text: 'Cấu hình URL nhận webhook trong phần cài đặt Developers. Quy trình chi tiết bám sát hướng dẫn tại ' },
      { type: 'link', text: 'Cấu hình thông tin Webhook', url: 'https://developers.tingee.vn/docs/config-info' },
      { type: 'text', text: '.' }
    ]
  },
  {
    id: 'faq-3',
    category: 'technical',
    question: 'Làm thế nào để xác thực dữ liệu Webhook nhận được là an toàn và thực sự gửi từ Tingee?',
    contentParts: [
      { type: 'text', text: 'Kiểm tra header ' },
      { type: 'text', text: 'x-signature', bold: true },
      { type: 'text', text: ' đính kèm trong mỗi request Webhook của Tingee. Chữ ký được sinh bằng thuật toán ' },
      { type: 'text', text: 'HMAC_SHA512', bold: true },
      { type: 'text', text: ' với ' },
      { type: 'text', text: 'secretToken', bold: true },
      { type: 'text', text: ' của bạn.' }
    ]
  },
  {
    id: 'faq-4',
    category: 'technical',
    question: 'Tingee có cung cấp Cổng thanh toán tích hợp (API/SDK) và môi trường thử nghiệm (Sandbox) cho lập trình viên không?',
    contentParts: [
      { type: 'text', text: 'Hiện tại, dịch vụ Cổng thanh toán Pay By Bank tích hợp tự động qua API/SDK cùng môi trường giả lập (Sandbox) đang được đội ngũ kỹ thuật phát triển và dự kiến sẽ ra mắt đối tác trong thời gian tới. Giai đoạn này, đối tác có thể cấu hình webhook nhận thông báo giao dịch thông thường và chuẩn bị trước hạ tầng hệ thống để sẵn sàng kết nối ngay khi API/SDK chính thức phát hành.' }
    ]
  },
  {
    id: 'faq-5',
    category: 'onboarding',
    question: 'Dịch vụ Pay By Bank của Tingee hỗ trợ những ngân hàng nào tại Việt Nam?',
    contentParts: [
      { type: 'text', text: 'Hỗ trợ 14 ngân hàng lớn gồm: Vietinbank, BIDV, OCB, MB, ACB, Vietcombank, VPBank, Sacombank, VIB, PGBank, ShinhanBank, Co-op Bank, MSB, TPBank. Chi tiết hướng dẫn xem tại ' },
      { type: 'link', text: 'trienkhai.tingee.vn', url: 'https://trienkhai.tingee.vn/#/bank' },
      { type: 'text', text: '.' }
    ],
    hasSpecialGrid: true
  },
  {
    id: 'faq-6',
    category: 'onboarding',
    question: 'Sự khác biệt giữa VietQR tĩnh (Static QR) và VietQR động (Dynamic QR) là gì?',
    contentParts: [
      { type: 'text', text: 'QR tĩnh yêu cầu người dùng tự nhập số tiền; QR động tự động nhúng sẵn số tiền và nội dung đơn hàng, giúp tự động hóa 100% khâu đối soát thanh toán.' }
    ]
  },
  {
    id: 'faq-7',
    category: 'onboarding',
    question: 'Làm thế nào để liên kết tài khoản ngân hàng của tôi với hệ thống Tingee?',
    contentParts: [
      { type: 'text', text: 'Cá nhân/Hộ kinh doanh: ', bold: true },
      { type: 'text', text: 'Tự thực hiện trên giao diện Tingee qua luồng OTP. Riêng Vietcombank sẽ tự động chuyển hướng xác thực qua ứng dụng VCB Digibank; VPBank Hộ kinh doanh cần nhập CCCD có hậu tố ' },
      { type: 'text', text: '"HKD"', bold: true },
      { type: 'text', text: '.\n\n' },
      { type: 'text', text: 'Doanh nghiệp: ', bold: true },
      { type: 'text', text: 'Liên hệ bộ phận hỗ trợ HENO để được hướng dẫn ký hợp đồng và cấu hình tham số kỹ thuật. Thời gian kích hoạt từ 1-3 giờ (MB Bank) hoặc từ 1-5 ngày tùy ngân hàng.' }
    ]
  },
  {
    id: 'faq-8',
    category: 'onboarding',
    question: 'Tôi có cần mở tài khoản mới tại các ngân hàng liên kết hoặc nạp/rút tiền qua ví trung gian để nhận tiền thanh toán không?',
    contentParts: [
      { type: 'text', text: 'Không cần. Đây là điểm mạnh vượt trội và duy nhất của giải pháp Tingee: tiền thanh toán từ khách hàng sẽ được ' },
      { type: 'text', text: 'chuyển thẳng về tài khoản ngân hàng hiện có của bạn ngay lập tức', bold: true },
      { type: 'text', text: ' mà ' },
      { type: 'text', text: 'không giữ lại qua bất kỳ ví trung gian hay tài khoản trung chuyển nào', bold: true },
      { type: 'text', text: '. Điều này giúp doanh nghiệp/cá nhân tối ưu hóa dòng tiền và loại bỏ hoàn toàn các rủi ro, thủ tục đối soát rút tiền từ ví trung gian.' }
    ]
  },
  {
    id: 'faq-9',
    category: 'operations',
    question: 'Tại sao khách hàng đã chuyển khoản thành công nhưng hệ thống của tôi chưa nhận được Webhook (IPN)?',
    contentParts: [
      { type: 'text', text: 'Thường do các nguyên nhân sau:\n1. Server của bạn phản hồi chậm (quá 10 giây) hoặc trả về mã lỗi (không phải HTTP 200).\n2. Sai chữ ký xác thực (cần kiểm tra kỹ thuật toán HMAC_SHA512 với công thức ' },
      { type: 'text', text: 'x-request-timestamp + ":" + body', bold: true },
      { type: 'text', text: ' và ' },
      { type: 'text', text: 'secretToken', bold: true },
      { type: 'text', text: ').\n3. Sự cố kết nối mạng giữa Tingee và máy chủ của bạn.\n\n' },
      { type: 'text', text: 'Khắc phục', bold: true },
      { type: 'text', text: ': Hãy kiểm tra logs webhook trên Merchant Dashboard của Tingee để xem mã phản hồi của server bạn, hoặc sử dụng API Query Transaction để chủ động truy vấn trạng thái đơn hàng.' }
    ]
  },
  {
    id: 'faq-10',
    category: 'operations',
    question: 'Tingee xử lý thế nào nếu server của tôi bị sập và không nhận được Webhook?',
    contentParts: [
      { type: 'text', text: 'Hệ thống áp dụng cơ chế tự động gửi lại (Retry Webhook) tối đa ' },
      { type: 'text', text: '5 lần', bold: true },
      { type: 'text', text: ' khi server của bạn trả về mã lỗi hoặc không phản hồi. Vì webhook có thể được gửi lại nhiều lần, bạn bắt buộc phải triển khai cơ chế kiểm tra trùng lặp (Idempotency) bằng cách đối chiếu mã giao dịch đơn hàng trong cơ sở dữ liệu để tránh ghi nhận đơn hàng nhiều lần.' }
    ]
  },
  {
    id: 'faq-11',
    category: 'operations',
    question: 'Khách hàng chuyển khoản sai số tiền hoặc tự ý sửa nội dung chuyển khoản thì xử lý thế nào?',
    contentParts: [
      { type: 'text', text: 'Hệ thống sẽ không thể đối soát tự động đơn hàng này. Giao dịch sẽ được phân loại vào danh sách Chờ đối soát thủ công trên Merchant Dashboard. Doanh nghiệp cần liên hệ bộ phận hỗ trợ của Tingee để tra soát và điều chỉnh.' }
    ]
  },
  {
    id: 'faq-12',
    category: 'operations',
    question: 'Tôi có thể tải hoặc tích hợp báo cáo đối soát giao dịch bằng cách nào?',
    contentParts: [
      { type: 'text', text: 'Bạn có thể tải trực tiếp file báo cáo (Excel/CSV) trên Merchant Dashboard hoặc tích hợp API lịch sử giao dịch để tự động hóa quy trình đối soát của kế toán.' }
    ]
  },
  {
    id: 'faq-13',
    category: 'business',
    question: 'Biểu phí sử dụng dịch vụ Pay By Bank của Tingee tính như thế nào?',
    contentParts: [
      { type: 'text', text: 'Phí dịch vụ tiêu chuẩn là ' },
      { type: 'text', text: '150đ (đã bao gồm VAT) trên mỗi giao dịch gửi Webhook thành công.', bold: true }
    ]
  },
  {
    id: 'faq-14',
    category: 'business',
    question: 'Doanh nghiệp của chúng tôi có lượng giao dịch lớn hoặc yêu cầu đặc thù thì có được ưu đãi phí không?',
    contentParts: [
      { type: 'text', text: 'Có. Vui lòng liên hệ bộ phận Kinh doanh của chúng tôi qua hotline hoặc email hỗ trợ để trao đổi chi tiết và ký kết biểu phí ưu đãi riêng.' }
    ]
  },
  {
    id: 'faq-15',
    category: 'business',
    question: 'Khi gặp sự cố giao dịch hoặc cần hỗ trợ gấp ngoài giờ hành chính, tôi liên hệ ai?',
    contentParts: [
      { type: 'text', text: 'Bạn có thể liên hệ trực tiếp qua kênh hỗ trợ khẩn cấp ' },
      { type: 'link', text: 'Telegram Support (@tingeesupport)', url: 'https://t.me/tingeesupport' },
      { type: 'text', text: ' hoặc gửi tin nhắn qua ' },
      { type: 'link', text: 'Zalo OA - Tingee By Heno' },
      { type: 'text', text: ' chính thức của Tingee để được kỹ thuật trực ca hỗ trợ 24/7.' }
    ]
  },
  {
    id: 'faq-16',
    category: 'business',
    question: 'Khách hàng có thể sử dụng những ứng dụng ngân hàng nào để quét mã QR thanh toán Pay By Bank?',
    contentParts: [
      { type: 'text', text: 'Vì mã VietQR của Tingee được sinh theo chuẩn chung của NAPAS, khách hàng có thể sử dụng ứng dụng di động (Mobile Banking) của hầu hết các ngân hàng tại Việt Nam (hơn 40 ngân hàng lớn nhỏ như Vietcombank, Techcombank, MB Bank, VPBank, ACB, BIDV...) cũng như các ví điện tử hỗ trợ quét mã QR để thực hiện chuyển khoản thanh toán nhanh 24/7.' }
    ]
  }
];

interface BankInfo {
  id: string;
  code: string;
  name: string;
  fallbackBg: string;
}

const BANKS_DATA: BankInfo[] = [
  { id: 'vtb', code: 'ICB', name: 'Vietinbank', fallbackBg: '#00A3E0' },
  { id: 'bidv', code: 'BIDV', name: 'BIDV', fallbackBg: '#006A4E' },
  { id: 'ocb', code: 'OCB', name: 'OCB', fallbackBg: '#00824B' },
  { id: 'mbbank', code: 'MB', name: 'MB Bank', fallbackBg: '#1A1F71' },
  { id: 'acb', code: 'ACB', name: 'ACB', fallbackBg: '#0072BC' },
  { id: 'vcb', code: 'VCB', name: 'Vietcombank', fallbackBg: '#00B14F' },
  { id: 'vpbank', code: 'VPB', name: 'VPBank', fallbackBg: '#009F4F' },
  { id: 'sacombank', code: 'STB', name: 'Sacombank', fallbackBg: '#0055A5' },
  { id: 'vib', code: 'VIB', name: 'VIB', fallbackBg: '#005FAD' },
  { id: 'pgbank', code: 'PGB', name: 'PGBank', fallbackBg: '#003B7C' },
  { id: 'shinhan', code: 'SHBVN', name: 'ShinhanBank', fallbackBg: '#003A8C' },
  { id: 'coopbank', code: 'COOPBANK', name: 'Co-op Bank', fallbackBg: '#008CC9' },
  { id: 'msb', code: 'MSB', name: 'MSB', fallbackBg: '#FF5A00' },
  { id: 'tpbank', code: 'TPB', name: 'TPBank', fallbackBg: '#54208a' },
];

// Utility function to remove accents from Vietnamese text
const removeAccents = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

interface FaqHighlightTextProps {
  text: string;
  highlight: string;
}

const FaqHighlightText: React.FC<FaqHighlightTextProps> = ({ text, highlight }) => {
  const query = highlight.trim();
  if (!query) return <>{text}</>;

  const normalizedText = removeAccents(text).toLowerCase();
  const normalizedQuery = removeAccents(query).toLowerCase();

  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  while (true) {
    const index = normalizedText.indexOf(normalizedQuery, currentIndex);
    if (index === -1) {
      parts.push(text.slice(currentIndex));
      break;
    }

    if (index > currentIndex) {
      parts.push(text.slice(currentIndex, index));
    }

    parts.push(
      <mark key={index} className="highlight">
        {text.slice(index, index + query.length)}
      </mark>
    );

    currentIndex = index + query.length;
  }

  return <>{parts}</>;
};

export const FaqsDetails: React.FC<FaqsDetailsProps> = ({ onNavigateHome }) => {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolledPercent, setScrolledPercent] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [brandLogoError, setBrandLogoError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});

  // Accordion state
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  const handleLogoError = (bankId: string) => {
    setLogoErrors((prev) => ({ ...prev, [bankId]: true }));
  };

  // List of active navigation targets for scroll spy
  const watchedIds = useMemo(() => {
    return ['intro', ...FAQ_GROUPS.map((g) => g.id)];
  }, []);

  const [activeId, setActiveId] = useState('intro');
  const isScrollingRef = useRef(false);

  // Manual smooth scroll navigation
  const handleLinkClick = (id: string) => {
    isScrollingRef.current = true;
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      const HEADER_H = 56;
      const offsetTop = el.offsetTop - HEADER_H;
      window.scrollTo({
        top: offsetTop >= 0 ? offsetTop : 0,
        behavior: 'smooth',
      });
      // Release scroll spy lock after animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  };

  // Scroll handler for progress bar and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrolledPercent(scrolled);
      setShowBackToTop(window.scrollY > 300);

      if (isScrollingRef.current) return;

      const y = window.scrollY + 56 + 24;
      let currentActive = 'intro';

      for (const id of watchedIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) {
          currentActive = id;
        }
      }
      setActiveId(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [watchedIds]);

  // Handle mobile drawer resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter and match logic for search
  const filteredFaqs = useMemo(() => {
    const query = removeAccents(searchQuery).toLowerCase().trim();
    if (!query) return FAQS_DATA;

    return FAQS_DATA.filter((faq) => {
      const normQ = removeAccents(faq.question).toLowerCase();
      const normA = faq.contentParts
        .map((p) => removeAccents(p.text).toLowerCase())
        .join(' ');
      return normQ.includes(query) || normA.includes(query);
    });
  }, [searchQuery]);

  // Auto-expand items when search query is active
  useEffect(() => {
    if (searchQuery.trim()) {
      const newOpenStates: Record<string, boolean> = {};
      filteredFaqs.forEach((faq) => {
        newOpenStates[faq.id] = true;
      });
      setOpenStates(newOpenStates);
    } else {
      // Revert to all closed when clearing search
      setOpenStates({});
    }
  }, [searchQuery, filteredFaqs]);

  // Deep-linking URL hash check on mount and URL hash changes
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#\/faqs\/(faq-\d+)$/);
      if (match) {
        const faqId = match[1];
        const faqExists = FAQS_DATA.some((f) => f.id === faqId);
        if (faqExists) {
          setOpenStates((prev) => ({ ...prev, [faqId]: true }));
          setTimeout(() => {
            const el = document.getElementById(faqId);
            if (el) {
              const HEADER_H = 56;
              const offsetTop = el.offsetTop - HEADER_H;
              window.scrollTo({
                top: offsetTop >= 0 ? offsetTop : 0,
                behavior: 'smooth',
              });
            }
          }, 200);
        }
      } else {
        // Support general hash category linking
        const catMatch = hash.match(/^#\/faqs\/(technical|onboarding|operations|business)$/);
        if (catMatch) {
          handleLinkClick(catMatch[1]);
        }
      }
    };

    const timer = setTimeout(handleHashScroll, 100);
    window.addEventListener('hashchange', handleHashScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);

  // Sync theme with parent window messages (for iframe embeds)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'THEME_CHANGE') {
        const parentTheme = event.data.theme;
        if ((parentTheme === 'dark' || parentTheme === 'light') && parentTheme !== theme) {
          toggleTheme();
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [theme, toggleTheme]);

  const handleToggleFaq = (id: string) => {
    setOpenStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExpandAll = () => {
    const allOpen: Record<string, boolean> = {};
    FAQS_DATA.forEach((faq) => {
      allOpen[faq.id] = true;
    });
    setOpenStates(allOpen);
  };

  const handleCollapseAll = () => {
    setOpenStates({});
  };

  const hasAnyResults = filteredFaqs.length > 0;

  return (
    <div className="bank-layout">
      {/* SCROLL PROGRESS BAR */}
      <div
        className="scroll-progress"
        id="scrollProgress"
        style={{ width: `${scrolledPercent}%` }}
      ></div>

      {/* MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div
          className="sb-overlay open"
          id="sbOverlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* MOBILE HAMBURGER BUTTON */}
      <button
        className="mob-menu-btn"
        id="mobMenuBtn"
        aria-label="Mở menu"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* HEADER LEFT (Brand) */}
      <div className="hdr-left">
        {!brandLogoError ? (
          <img
            className="hdr-logo-img"
            src="https://developers.tingee.vn/img/logo_heno.png"
            alt="HENO"
            onError={() => setBrandLogoError(true)}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              background: '#f1416c',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span style={{
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--tx1)',
              letterSpacing: '-0.5px',
            }}>HENO</span>
          </div>
        )}
      </div>

      <header className="hdr">
        <button
          className="hdr-back-btn"
          id="backToHomeBtn"
          onClick={onNavigateHome}
          aria-label="Quay lại trang chủ"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 1 }}>
          <div>
            <div className="hdr-t">FAQs Pay By Bank</div>
          </div>
          <span className="hdr-s">— Hướng dẫn &amp; Giải đáp thắc mắc</span>
        </div>
        <button
          className="theme-toggle-btn"
          id="themeToggleBtn"
          aria-label="Đổi giao diện"
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <svg className="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg className="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </button>
      </header>

      {/* FAQS SIDEBAR */}
      <FaqsSidebar
        activeId={activeId}
        onLinkClick={handleLinkClick}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        groups={FAQ_GROUPS}
      />

      {/* MAIN FAQS CONTENT */}
      <main className="main">
        <div className="faq-layout">
          {/* INTRO CARD */}
          <div className="section-card" id="intro">
            <div style={{ padding: '22px 24px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '6px' }}>
                  Trung tâm trợ giúp Pay By Bank
                </h1>
                <p style={{ fontSize: '13px', color: 'var(--tx2)', maxWidth: '680px' }}>
                  Giải đáp các thắc mắc thường gặp về kết nối kỹ thuật API, thiết lập cấu hình môi trường kiểm thử (Sandbox) và quy trình vận hành, đối soát dành cho Merchant.
                </p>
                <div className="intro-stats">
                  <div className="stat">
                    <div className="stat-n">16</div>
                    <div className="stat-l">Câu hỏi chuẩn hóa</div>
                  </div>
                  <div className="stat">
                    <div className="stat-n">Self-service</div>
                    <div className="stat-l">Tiết kiệm thời gian hỗ trợ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SEARCH BAR & GENERAL CONTROLS */}
          <div className="faq-search-wrapper">
            <div className="faq-search-bar">
              <input
                type="text"
                id="faqSearchInput"
                className="faq-search-input"
                placeholder="Nhập câu hỏi hoặc nội dung bạn cần tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="faq-search-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              {searchQuery && (
                <button
                  className="faq-search-clear-btn"
                  id="clearSearchBtn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Xóa tìm kiếm"
                  type="button"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="faq-controls">
            <button
              onClick={handleExpandAll}
              className="faq-control-btn"
              id="expandAllFaqsBtn"
            >
              Mở rộng tất cả
            </button>
            <button
              onClick={handleCollapseAll}
              className="faq-control-btn"
              id="collapseAllFaqsBtn"
            >
              Thu gọn tất cả
            </button>
          </div>

          {hasAnyResults ? (
            FAQ_GROUPS.map((group) => {
              const groupFaqs = filteredFaqs.filter((faq) => faq.category === group.id);
              if (groupFaqs.length === 0) return null;

              return (
                <section key={group.id} id={group.id} className="faq-group">
                  <h2 className="faq-group-title">
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        background: 'var(--primary-light)',
                        color: 'var(--primary)',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}
                    >
                      {group.num}
                    </span>
                    {group.fullName}
                  </h2>

                  {groupFaqs.map((faq) => {
                    const isOpen = !!openStates[faq.id];
                    return (
                      <div
                        key={faq.id}
                        id={faq.id}
                        className="ag faq-accordion"
                      >
                        <div
                          className="ag-hdr"
                          onClick={() => handleToggleFaq(faq.id)}
                          style={{ cursor: 'pointer' }}
                          id={`toggle-${faq.id}`}
                        >
                          <span className="ag-title">
                            <FaqHighlightText text={faq.question} highlight={searchQuery} />
                          </span>
                          <span
                            className={`ag-toggle ${isOpen ? 'open' : ''}`}
                            style={{
                              fontSize: '18px',
                              color: 'var(--tx3)',
                              transition: 'transform 0.2s ease',
                              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                            }}
                          >
                            ▾
                          </span>
                        </div>

                        <div
                          className="ag-body"
                          style={{
                            display: isOpen ? 'block' : 'none',
                            borderTop: '1px solid var(--bdr)',
                            padding: '24px',
                            color: 'var(--tx2)',
                            fontSize: '14px',
                            lineHeight: '1.6',
                            whiteSpace: 'pre-line' // Preserve line breaks for formatting
                          }}
                        >
                          {faq.contentParts.map((part, index) => {
                            if (part.type === 'link') {
                              return (
                                <a
                                  key={index}
                                  href={part.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    color: 'var(--primary)',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    borderBottom: '1px dotted var(--primary)'
                                  }}
                                >
                                  <FaqHighlightText text={part.text} highlight={searchQuery} />
                                </a>
                              );
                            }

                            if (part.bold) {
                              return (
                                <strong key={index} style={{ fontWeight: '700', color: 'var(--tx)' }}>
                                  <FaqHighlightText text={part.text} highlight={searchQuery} />
                                </strong>
                              );
                            }

                            return (
                              <span key={index}>
                                <FaqHighlightText text={part.text} highlight={searchQuery} />
                              </span>
                            );
                          })}

                          {/* Render dynamic bank logo grid for Q5 */}
                          {faq.hasSpecialGrid && (
                            <div className="faq-bank-grid">
                              {BANKS_DATA.map((bank) => {
                                const hasError = !!logoErrors[bank.id];
                                return (
                                  <div
                                    key={bank.id}
                                    className="faq-bank-item"
                                    title={bank.name}
                                    id={`bank-logo-${bank.id}`}
                                  >
                                    {!hasError ? (
                                      <img
                                        className="faq-bank-logo"
                                        src={`https://api.vietqr.io/img/${bank.code}.png`}
                                        alt={bank.name}
                                        onError={() => handleLogoError(bank.id)}
                                      />
                                    ) : (
                                      <div
                                        className="faq-bank-fallback"
                                        style={{ backgroundColor: bank.fallbackBg }}
                                      >
                                        {bank.name.slice(0, 3).toUpperCase()}
                                      </div>
                                    )}
                                    <span className="faq-bank-name">{bank.name}</span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </section>
              );
            })
          ) : (
            /* NO RESULTS ALERT VIEW */
            <div className="faq-no-results" id="faqNoResultsView">
              <p>
                Không tìm thấy câu hỏi phù hợp với từ khóa <strong>"{searchQuery}"</strong>.
                Vui lòng liên hệ bộ phận hỗ trợ của chúng tôi tại Zalo hoặc Telegram.
              </p>
              <div className="faq-contact-buttons">
                <a
                  href="https://zalo.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="faq-contact-btn zalo"
                  id="contactZaloBtn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Liên hệ qua Zalo OA
                </a>
                <a
                  href="https://t.me/tingeesupport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="faq-contact-btn telegram"
                  id="contactTelegramBtn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  Telegram Technical Support
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button
          className="back-to-top"
          id="backToTopBtn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Lên đầu trang"
        >
          ▲
        </button>
      )}
    </div>
  );
};
