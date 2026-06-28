import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/faqs.css';

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

interface BankInfo {
  id: string;
  code: string;
  name: string;
  fallbackBg: string;
}

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
  },
  {
    id: 'faq-17',
    category: 'technical',
    question: 'Tôi có thể tích hợp Tingee Pay By Bank vào phần mềm quản lý bán hàng (POS), CRM, ERP hoặc phần mềm kế toán riêng của doanh nghiệp không?',
    contentParts: [
      { type: 'text', text: 'Hoàn toàn được. Tingee cung cấp hệ thống REST API chuẩn với dữ liệu trao đổi định dạng JSON, cho phép tích hợp linh hoạt vào mọi phần mềm tự phát triển hoặc các hệ thống ERP phổ biến (SAP, Oracle, Bravo...). Ngoài ra, Tingee cũng có sẵn các plugin/kết nối dựng sẵn cho các nền tảng thương mại điện tử phổ biến như WooCommerce, Shopify, Haravan. Quy trình tài liệu kỹ thuật chi tiết tại ' },
      { type: 'link', text: 'developers.tingee.vn', url: 'https://developers.tingee.vn' },
      { type: 'text', text: '.' }
    ]
  },
  {
    id: 'faq-18',
    category: 'technical',
    question: 'Tingee có giới hạn số lượng request gọi API (Rate Limit) không?',
    contentParts: [
      { type: 'text', text: 'Có. Tingee áp dụng giới hạn Rate Limit và kích thước request mặc định để đảm bảo tính ổn định và bảo mật của toàn hệ thống (nhằm chống spam hoặc các cuộc tấn công từ chối dịch vụ DDoS). Hạn mức mặc định này được thiết kế để phục vụ thoải mái các nhu cầu tích hợp thông thường của đối tác. Nếu hệ thống của bạn có nhu cầu xử lý lượng giao dịch đặc biệt lớn (ví dụ: các chiến dịch Flash Sale), vui lòng liên hệ bộ phận hỗ trợ kỹ thuật qua các nhóm chat hỗ trợ chung hoặc hotline để được kiểm tra và cấu hình hạn mức riêng phù hợp.' }
    ]
  },
  {
    id: 'faq-19',
    category: 'operations',
    question: 'Nếu nhân sự kỹ thuật (IT) phụ trách tích hợp của tôi nghỉ việc, tôi cần làm gì để đảm bảo an toàn bảo mật hệ thống?',
    contentParts: [
      { type: 'text', text: 'Để đảm bảo an toàn tuyệt đối, bạn cần thực hiện ngay các bước sau trên Merchant Dashboard:\n1. Truy cập cài đặt tài khoản và xóa/vô hiệu hóa quyền truy cập của tài khoản nhân sự đó.\n2. Yêu cầu cấp lại (rotate) ' },
      { type: 'text', text: 'Secret Token', bold: true },
      { type: 'text', text: ' mới tại mục Developers (lưu ý: khi đổi token, bạn cần cập nhật ngay khóa mới này vào mã nguồn server của bạn để tránh làm gián đoạn việc xác thực Webhook).\n3. Kiểm tra lại danh sách IP Whitelist đã cấu hình và loại bỏ các IP không còn sử dụng.' }
    ]
  },
  {
    id: 'faq-20',
    category: 'operations',
    question: 'Tingee có thông báo trước khi tiến hành nâng cấp hệ thống hoặc thay đổi các phiên bản API không?',
    contentParts: [
      { type: 'text', text: 'Có. Tingee luôn cam kết duy trì tính tương thích ngược cao nhất cho các API. Trong trường hợp có nâng cấp hệ thống định kỳ hoặc thay đổi lớn về phiên bản API, Tingee sẽ hiển thị thông báo chi tiết trực tiếp trên ' },
      { type: 'text', text: 'Merchant Dashboard', bold: true },
      { type: 'text', text: ' hoặc cập nhật qua ' },
      { type: 'text', text: 'các nhóm chat chung', bold: true },
      { type: 'text', text: ' giữa Tingee và đối tác ít nhất ' },
      { type: 'text', text: '1 ngày', bold: true },
      { type: 'text', text: ' trước khi thực hiện để đối tác chủ động kiểm thử và cập nhật hạ tầng kỹ thuật.' }
    ]
  }
];

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

const CATEGORIES = [
  {
    id: 'all',
    name: 'Tất cả',
    testId: 'faq-pill-all',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
      </svg>
    )
  },
  {
    id: 'technical',
    name: 'Kỹ thuật',
    testId: 'faq-pill-tech',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    )
  },
  {
    id: 'onboarding',
    name: 'Thiết lập',
    testId: 'faq-pill-onboarding',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
      </svg>
    )
  },
  {
    id: 'operations',
    name: 'Đối soát',
    testId: 'faq-pill-ops',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    )
  },
  {
    id: 'business',
    name: 'Chính sách',
    testId: 'faq-pill-business',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    )
  }
];

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
      <mark key={index} className="sb-hl">
        {text.slice(index, index + query.length)}
      </mark>
    );

    currentIndex = index + query.length;
  }

  return <>{parts}</>;
};

interface FaqsDetailsProps {
  onNavigateHome: () => void;
}

export const FaqsDetails: React.FC<FaqsDetailsProps> = ({ onNavigateHome }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  const handleLogoError = (bankId: string) => {
    setLogoErrors((prev) => ({ ...prev, [bankId]: true }));
  };

  // Sync theme with parent window messages (for iframe embeds)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'THEME_CHANGE') {
        const parentTheme = event.data.theme;
        if (parentTheme === 'dark' || parentTheme === 'light') {
          document.documentElement.setAttribute('data-theme', parentTheme);
          document.body.className = parentTheme;
          if (parentTheme !== theme) {
            toggleTheme();
          }
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [theme, toggleTheme]);

  // Set initial theme prefers-color-scheme if localStorage is empty
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', initialTheme);
      document.body.className = initialTheme;
    }
  }, []);

  // Filter and match logic for search and category
  const filteredFaqs = useMemo(() => {
    let result = FAQS_DATA;
    if (activeCategory !== 'all') {
      result = result.filter((faq) => faq.category === activeCategory);
    }

    const query = removeAccents(searchQuery).toLowerCase().trim();
    if (!query) return result;

    return result.filter((faq) => {
      const normQ = removeAccents(faq.question).toLowerCase();
      const normA = faq.contentParts
        .map((p) => removeAccents(p.text).toLowerCase())
        .join(' ');
      return normQ.includes(query) || normA.includes(query);
    });
  }, [searchQuery, activeCategory]);

  // Auto-expand items when search query is active
  useEffect(() => {
    if (searchQuery.trim()) {
      const newOpenStates: Record<string, boolean> = {};
      filteredFaqs.forEach((faq) => {
        newOpenStates[faq.id] = true;
      });
      setOpenStates(newOpenStates);
    } else {
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
        const faqIdx = FAQS_DATA.findIndex((f) => f.id === faqId);
        if (faqIdx !== -1) {
          setActiveCategory('all'); // Reset category filter to make sure it's visible
          setOpenStates((prev) => ({ ...prev, [faqId]: true }));
          setTimeout(() => {
            const el = document.getElementById(`faq-item-${faqIdx + 1}`);
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
      }
    };

    const timer = setTimeout(handleHashScroll, 100);
    window.addEventListener('hashchange', handleHashScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);

  const handleToggleFaq = (id: string) => {
    setOpenStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExpandAll = () => {
    const allOpen: Record<string, boolean> = {};
    filteredFaqs.forEach((faq) => {
      allOpen[faq.id] = true;
    });
    setOpenStates(allOpen);
  };

  const handleCollapseAll = () => {
    setOpenStates({});
  };

  return (
    <div className="faq-page-wrapper">
      {/* HEADER BAR */}
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
        <img 
          src="https://developers.tingee.vn/img/logo-compact.png" 
          alt="Tingee Logo" 
          style={{ height: '24px', marginRight: '12px', display: 'block' }} 
        />
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

      {/* HERO SECTION */}
      <section className="faq-hero-section">
        <div className="faq-hero-overlay"></div>
        <div className="faq-hero-inner">
          <h1>Trung tâm Hỗ trợ & FAQs Pay By Bank</h1>
          <p className="faq-hero-subtitle">
            Giải đáp thắc mắc về kết nối kỹ thuật API, tích hợp phần mềm và vận hành, đối soát dành cho đối tác Tingee.
          </p>

          {/* SEARCH BAR (Glassmorphism) */}
          <div className="faq-glass-search-container">
            <div className="faq-search-box">
              <svg
                className="faq-search-box-icon"
                width="20"
                height="20"
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
              <input
                type="text"
                id="faq-search-input"
                className="faq-search-input-field"
                placeholder="Nhập câu hỏi hoặc nội dung bạn cần tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="faq-search-clear-button"
                  id="faq-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Xóa tìm kiếm"
                  type="button"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="faq-container-main">
        {/* SIDEBAR FOR CATEGORIES */}
        <div className="faq-sidebar" id="faq-sidebar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={cat.testId}
                className={`faq-pill-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="faq-pill-icon">{cat.icon}</span>
                <span className="faq-pill-name">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* CONTENT PANE */}
        <div className="faq-content-pane">
          {/* QUICK ACTION BAR */}
          <div className="faq-quick-action-bar">
            <div className="faq-results-count">
              {filteredFaqs.length > 0 ? (
                <>Tìm thấy <strong>{filteredFaqs.length}</strong> câu hỏi phù hợp</>
              ) : (
                <>Không tìm thấy câu hỏi nào phù hợp</>
              )}
            </div>
            <div className="faq-action-buttons">
              <button
                className="faq-action-btn"
                id="faq-action-expand"
                onClick={handleExpandAll}
              >
                Mở rộng tất cả
              </button>
              <button
                className="faq-action-btn"
                id="faq-action-collapse"
                onClick={handleCollapseAll}
              >
                Thu gọn tất cả
              </button>
            </div>
          </div>

          {/* ACCORDION FAQ LIST */}
          <div className="faq-list-wrapper" id="faq-list-container">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = !!openStates[faq.id];
                const numId = faq.id.replace('faq-', '');
                return (
                  <div
                    key={faq.id}
                    id={`faq-item-${numId}`}
                    className={`faq-card-item ${isOpen ? 'open' : ''}`}
                  >
                    <button
                      className="faq-card-header"
                      id={`faq-header-${numId}`}
                      onClick={() => handleToggleFaq(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-card-title">
                        <FaqHighlightText text={faq.question} highlight={searchQuery} />
                      </span>
                      <span className="faq-card-arrow-wrapper">
                        <svg
                          className={`faq-arrow-icon ${isOpen ? 'open' : ''}`}
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </button>

                    <div
                      className={`faq-card-body-wrapper ${isOpen ? 'open' : ''}`}
                      id={`faq-content-${numId}`}
                    >
                      <div className="faq-card-body-content">
                        <div className="faq-card-answer-text">
                          {faq.contentParts.map((part, index) => {
                            if (part.type === 'link') {
                              return (
                                <a
                                  key={index}
                                  href={part.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="faq-body-link"
                                >
                                  <FaqHighlightText text={part.text} highlight={searchQuery} />
                                </a>
                              );
                            }

                            if (part.bold) {
                              return (
                                <strong key={index} className="faq-body-bold">
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
                        </div>

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
                  </div>
                );
              })
            ) : (
              <div className="faq-no-results" id="faqNoResultsView">
                <p>
                  Không tìm thấy câu hỏi phù hợp với từ khóa <strong>"{searchQuery}"</strong>.
                </p>
              </div>
            )}
          </div>

          {/* CTA FOOTER */}
          <div className="faq-cta-footer">
            <h3>Không tìm thấy câu trả lời?</h3>
            <p>Đội ngũ kỹ thuật Tingee luôn sẵn sàng hỗ trợ 24/7.</p>
            <div className="faq-cta-buttons">
              <a
                href="https://t.me/tingeesupport"
                target="_blank"
                rel="noopener noreferrer"
                className="faq-cta-btn telegram"
                id="faq-cta-telegram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Telegram Support
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="faq-cta-btn zalo"
                id="faq-cta-zalo"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Zalo OA Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
