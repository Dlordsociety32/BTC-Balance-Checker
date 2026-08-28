let currentLang = 'en';
        let currentCurrency = 'usd';
        let currentTheme = 'dark';
        let currentResults = [];
        let balanceChartInstance = null;

        let fiatRates = {
            usd: 92500,
            eur: 85200,
            aed: 339700,
            myr: 410000,
            idr: 1450000000,
            sgd: 124000,
            thb: 3250000,
            cny: 665000,
            jpy: 14200000,
            krw: 128000000,
            rub: 8900000,
            uah: 3800000,
            inr: 7700000
        };

        const currencyMeta = {
            usd: { symbol: '$', code: 'USD', locale: 'en-US' },
            eur: { symbol: '€', code: 'EUR', locale: 'de-DE' },
            aed: { symbol: 'AED ', code: 'AED', locale: 'ar-AE' },
            myr: { symbol: 'RM ', code: 'MYR', locale: 'ms-MY' },
            idr: { symbol: 'Rp ', code: 'IDR', locale: 'id-ID' },
            sgd: { symbol: 'S$', code: 'SGD', locale: 'en-SG' },
            thb: { symbol: '฿', code: 'THB', locale: 'th-TH' },
            cny: { symbol: '¥', code: 'CNY', locale: 'zh-CN' },
            jpy: { symbol: '¥', code: 'JPY', locale: 'ja-JP' },
            krw: { symbol: '₩', code: 'KRW', locale: 'ko-KR' },
            rub: { symbol: '₽', code: 'RUB', locale: 'ru-RU' },
            uah: { symbol: '₴', code: 'UAH', locale: 'uk-UA' },
            inr: { symbol: '₹', code: 'INR', locale: 'hi-IN' }
        };

        const translations = {
            en: {
                subtitle: "Public Bitcoin Balance Explorer",
                menu: "Menu & Settings",
                menuTitle: "Control Panel & Settings",
                menuSubtitle: "Customize preferences & navigate",
                selectLanguage: "Language",
                selectCurrency: "Conversion Currency",
                selectTheme: "Color Theme",
                quickNav: "Quick Navigation",
                navInput: "Enter BTC Addresses",
                navSummary: "Portfolio & Analytics",
                navSample: "Load Sample Addresses",
                navExport: "Export CSV Report",
                navAbout: "About Application",
                appVersion: "BTC Balance Tracker v2.5 • Multi-Currency",
                inputTitle: "Enter Bitcoin Addresses",
                inputSubtitle: "Type or paste up to 50 Bitcoin addresses (one per line or comma separated).",
                countLabel: "Addresses",
                btnClear: "Clear",
                limitWarning: "Warning: You have exceeded the limit of 50 addresses!",
                btnSample: "Load Sample Data",
                btnReset: "Reset All",
                btnCheck: "Check Balances Now",
                statTotalBtc: "Total BTC Balance",
                statFiatValue: "Estimated Fiat Value",
                statUsdValue: "Value in USD ($)",
                statActive: "Active Addresses",
                statWithBalance: "with balance",
                statOutof: "Out of",
                statChecked: "checked",
                chartTitle: "Top Address Distribution",
                tableTitle: "Balance Results",
                tableSubtitle: "Latest blockchain address queries",
                thAddress: "Bitcoin Address",
                thType: "Type",
                thBtc: "Balance (BTC)",
                thSats: "Satoshis",
                thFiat: "Fiat Value",
                thAction: "Action",
                loadingTitle: "Fetching Blockchain Data...",
                loadingSubtitle: "Please wait while we query live Bitcoin balances.",
                aboutTitle: "About BTC Checker",
                aboutDesc: "This app allows checking balances for up to 50 public Bitcoin addresses simultaneously using open public APIs from Blockchain.info and Mempool.space, with live multi-fiat exchange rates.",
                aboutFeature1: "100% Secure: No Private Keys ever needed or stored.",
                aboutFeature2: "Supports Legacy, SegWit, Bech32 & Taproot address formats.",
                aboutFeature3: "Live fiat exchange rates for 13 major global currencies.",
                btnCloseModal: "Got it",
                toastTheme: "Theme updated to:",
                toastLang: "Language changed to:",
                toastCurrency: "Currency changed to:",
                toastSample: "Sample Bitcoin addresses loaded!",
                toastCleared: "Inputs and data cleared.",
                toastSuccess: "Balance check completed!"
            },
            ms: {
                subtitle: "Semakan Baki Bitcoin Awam",
                menu: "Menu & Tetapan",
                menuTitle: "Panel Kawalan & Tetapan",
                menuSubtitle: "Sesuaikan pilihan & navigasi",
                selectLanguage: "Bahasa",
                selectCurrency: "Mata Wang Pertukaran",
                selectTheme: "Tema Warna",
                quickNav: "Pautan Pantas",
                navInput: "Masukkan Alamat BTC",
                navSummary: "Ringkasan Portfolio",
                navSample: "Muat Contoh Alamat",
                navExport: "Eksport Laporan CSV",
                navAbout: "Mengenai Aplikasi",
                appVersion: "Pemeriksa Baki BTC v2.5 • Multi-Matawang",
                inputTitle: "Masukkan Alamat Bitcoin",
                inputSubtitle: "Taip atau tampal sehingga 50 alamat Bitcoin (satu baris atau dipisahkan koma).",
                countLabel: "Alamat",
                btnClear: "Padam",
                limitWarning: "Awas: Anda telah melebihi had 50 alamat!",
                btnSample: "Isi Contoh Data",
                btnReset: "Reset Semua",
                btnCheck: "Semak Baki Sekarang",
                statTotalBtc: "Jumlah Baki BTC",
                statFiatValue: "Anggaran Nilai Fiat",
                statUsdValue: "Nilai dalam USD ($)",
                statActive: "Alamat Aktif",
                statWithBalance: "dengan baki",
                statOutof: "Daripada",
                statChecked: "yang disemak",
                chartTitle: "Agihan Baki Alamat Utama",
                tableTitle: "Keputusan Semakan",
                tableSubtitle: "Maklumat baki terkini dari blockchain",
                thAddress: "Alamat Bitcoin",
                thType: "Jenis",
                thBtc: "Baki (BTC)",
                thSats: "Satoshis",
                thFiat: "Nilai Fiat",
                thAction: "Tindakan",
                loadingTitle: "Membuat Semakan Blockchain...",
                loadingSubtitle: "Sila tunggu sementara mengambil data baki terkini.",
                aboutTitle: "Mengenai BTC Checker",
                aboutDesc: "Aplikasi ini membolehkan anda menyemak baki sehingga 50 alamat Bitcoin secara serentak melalui API awam Blockchain.info dan Mempool.space.",
                aboutFeature1: "100% Selamat: Tiada kunci peribadi diperlukan.",
                aboutFeature2: "Sokongan Legacy, SegWit, Bech32 & Taproot.",
                aboutFeature3: "Kadar pertukaran langsung bagi 13 mata wang utama.",
                btnCloseModal: "Faham & Tutup",
                toastTheme: "Tema ditukar kepada:",
                toastLang: "Bahasa ditukar kepada:",
                toastCurrency: "Mata wang ditukar kepada:",
                toastSample: "Contoh alamat Bitcoin dimasukkan!",
                toastCleared: "Data dikosongkan.",
                toastSuccess: "Semakan baki selesai!"
            },
            id: {
                subtitle: "Pemeriksa Saldo Bitcoin Publik",
                menu: "Menu & Pengaturan",
                menuTitle: "Panel Kontrol & Pengaturan",
                menuSubtitle: "Kustomisasi preferensi & navigasi",
                selectLanguage: "Bahasa",
                selectCurrency: "Mata Uang Konversi",
                selectTheme: "Tema Warna",
                quickNav: "Navigasi Cepat",
                navInput: "Masukkan Alamat BTC",
                navSummary: "Ringkasan Portofolio",
                navSample: "Isi Contoh Alamat",
                navExport: "Ekspor Laporan CSV",
                navAbout: "Tentang Aplikasi",
                appVersion: "Pemeriksa Saldo BTC v2.5",
                inputTitle: "Masukkan Alamat Bitcoin",
                inputSubtitle: "Ketik atau tempel hingga 50 alamat Bitcoin (satu per baris).",
                countLabel: "Alamat",
                btnClear: "Hapus",
                limitWarning: "Peringatan: Anda melebihi batas 50 alamat!",
                btnSample: "Isi Contoh Data",
                btnReset: "Reset Semua",
                btnCheck: "Cek Saldo Sekarang",
                statTotalBtc: "Total Saldo BTC",
                statFiatValue: "Estimasi Nilai Fiat",
                statUsdValue: "Nilai dalam USD ($)",
                statActive: "Alamat Aktif",
                statWithBalance: "memiliki saldo",
                statOutof: "Dari",
                statChecked: "yang diperiksa",
                chartTitle: "Distribus Saldo Teratas",
                tableTitle: "Hasil Saldo",
                tableSubtitle: "Query saldo blockchain terbaru",
                thAddress: "Alamat Bitcoin",
                thType: "Tipe",
                thBtc: "Saldo (BTC)",
                thSats: "Satoshis",
                thFiat: "Nilai Fiat",
                thAction: "Tindakan",
                loadingTitle: "Mengambil Data Blockchain...",
                loadingSubtitle: "Mohon tunggu sebentar...",
                aboutTitle: "Tentang BTC Checker",
                aboutDesc: "Aplikasi untuk mengecek saldo hingga 50 alamat Bitcoin secara bersamaan.",
                aboutFeature1: "100% Aman: Tanpa Private Key.",
                aboutFeature2: "Mendukung format Legacy, SegWit, Bech32 & Taproot.",
                aboutFeature3: "Kurs langsung 13 mata uang dunia.",
                btnCloseModal: "Tutup",
                toastTheme: "Tema diubah ke:",
                toastLang: "Bahasa diubah ke:",
                toastCurrency: "Mata uang diubah ke:",
                toastSample: "Contoh alamat dimuat!",
                toastCleared: "Data dihapus.",
                toastSuccess: "Pemeriksaan saldo selesai!"
            },
            th: {
                subtitle: "เครื่องมือตรวจสอบยอดเงิน Bitcoin สาธารณะ",
                menu: "เมนูและการตั้งค่า",
                menuTitle: "แผงควบคุมและการตั้งค่า",
                menuSubtitle: "ปรับแต่งการตั้งค่าและการนำทาง",
                selectLanguage: "ภาษา",
                selectCurrency: "สกุลเงินที่แปลง",
                selectTheme: "ธีมสี",
                quickNav: "การนำทางด่วน",
                navInput: "ใส่ที่อยู่ BTC",
                navSummary: "พอร์ตโฟลิโอ",
                navSample: "โหลดตัวอย่างที่อยู่",
                navExport: "ส่งออกรายงาน CSV",
                navAbout: "เกี่ยวกับแอปพลิเคชัน",
                appVersion: "BTC Balance Tracker v2.5",
                inputTitle: "ใส่ที่อยู่ Bitcoin",
                inputSubtitle: "พิมพ์หรือวางที่อยู่ Bitcoin สูงสุด 50 รายการ",
                countLabel: "ที่อยู่",
                btnClear: "ล้าง",
                limitWarning: "คำเตือน: คุณใส่เกินขีดจำกัด 50 ที่อยู่!",
                btnSample: "โหลดข้อมูลตัวอย่าง",
                btnReset: "รีเซ็ตทั้งหมด",
                btnCheck: "ตรวจสอบยอดเงินทันที",
                statTotalBtc: "ยอดรวม BTC",
                statFiatValue: "มูลค่าเงินตราประเมิน",
                statUsdValue: "มูลค่าใน USD ($)",
                statActive: "ที่อยู่ที่มีการใช้งาน",
                statWithBalance: "มียอดเงิน",
                statOutof: "จากทั้งหมด",
                statChecked: "ตรวจสอบแล้ว",
                chartTitle: "การกระจายยอดเงินสูงสุด",
                tableTitle: "ผลลัพธ์ยอดเงิน",
                tableSubtitle: "การสอบถามบล็อกเชนล่าสุด",
                thAddress: "ที่อยู่ Bitcoin",
                thType: "ประเภท",
                thBtc: "ยอดเงิน (BTC)",
                thSats: "ซาโตชิ",
                thFiat: "มูลค่าเงินตรา",
                thAction: "การดำเนินการ",
                loadingTitle: "กำลังดึงข้อมูลบล็อกเชน...",
                loadingSubtitle: "กรุณารอสักครู่...",
                aboutTitle: "เกี่ยวกับ BTC Checker",
                aboutDesc: "แอปสำหรับตรวจสอบยอดเงินที่อยู่ Bitcoin สาธารณะได้สูงสุด 50 รายการพร้อมกัน",
                aboutFeature1: "ปลอดภัย 100%: ไม่ต้องใช้ Private Key",
                aboutFeature2: "รองรับ Legacy, SegWit, Bech32 & Taproot",
                aboutFeature3: "อัตราแลกเปลี่ยนสดสำหรับ 13 สกุลเงินหลัก",
                btnCloseModal: "เข้าใจแล้ว",
                toastTheme: "เปลี่ยนธีมเป็น:",
                toastLang: "เปลี่ยนภาษาเป็น:",
                toastCurrency: "เปลี่ยนสกุลเงินเป็น:",
                toastSample: "โหลดตัวอย่างที่อยู่แล้ว!",
                toastCleared: "ล้างข้อมูลเรียบร้อย",
                toastSuccess: "ตรวจสอบยอดเงินเสร็จสิ้น!"
            },
            zh: {
                subtitle: "比特币公共地址余额查询工具",
                menu: "菜单与设置",
                menuTitle: "控制面板与设置",
                menuSubtitle: "自定义偏好与导航",
                selectLanguage: "语言",
                selectCurrency: "转换法币",
                selectTheme: "颜色主题",
                quickNav: "快速导航",
                navInput: "输入比特币地址",
                navSummary: "资产组合与统计",
                navSample: "加载示例地址",
                navExport: "导出 CSV 报告",
                navAbout: "关于应用",
                appVersion: "BTC Balance Tracker v2.5",
                inputTitle: "输入比特币地址",
                inputSubtitle: "输入或粘贴最多 50 个比特币地址（每行一个或逗号分隔）。",
                countLabel: "地址数量",
                btnClear: "清空",
                limitWarning: "警告：您已超过 50 个地址的限制！",
                btnSample: "填充示例数据",
                btnReset: "重置所有",
                btnCheck: "立即查询余额",
                statTotalBtc: "BTC 总余额",
                statFiatValue: "预估法币价值",
                statUsdValue: "美元价值 ($)",
                statActive: "活跃地址",
                statWithBalance: "有余额",
                statOutof: "共查询",
                statChecked: "个地址",
                chartTitle: "主要地址余额分布",
                tableTitle: "查询结果",
                tableSubtitle: "最新区块链实时数据",
                thAddress: "比特币地址",
                thType: "类型",
                thBtc: "余额 (BTC)",
                thSats: "聪 (Satoshis)",
                thFiat: "法币价值",
                thAction: "操作",
                loadingTitle: "正在获取区块链数据...",
                loadingSubtitle: "请稍候，正在查询实时余额...",
                aboutTitle: "关于 BTC Checker",
                aboutDesc: "本工具支持同时查询最多 50 个比特币公共地址的余额。",
                aboutFeature1: "100% 安全：无需私钥。",
                aboutFeature2: "支持 Legacy、SegWit、Bech32 及 Taproot 格式。",
                aboutFeature3: "支持 13 种主要全球货币实时汇率。",
                btnCloseModal: "知道了",
                toastTheme: "主题已更新为：",
                toastLang: "语言已切换为：",
                toastCurrency: "货币已切换为：",
                toastSample: "已加载示例地址！",
                toastCleared: "已清空所有输入",
                toastSuccess: "余额查询完成！"
            },
            ja: {
                subtitle: "公開ビットコイン残高チェッカー",
                menu: "メニュー＆設定",
                menuTitle: "コントロールパネル",
                menuSubtitle: "設定とナビゲーション",
                selectLanguage: "言語",
                selectCurrency: "表示通貨",
                selectTheme: "カラーテーマ",
                quickNav: "クイックナビ",
                navInput: "BTCアドレス入力",
                navSummary: "ポートフォリオ要約",
                navSample: "サンプルアドレス読込",
                navExport: "CSVレポート出力",
                navAbout: "アプリについて",
                appVersion: "BTC Balance Tracker v2.5",
                inputTitle: "ビットコインアドレスを入力",
                inputSubtitle: "最大50個のアドレスを入力できます（1行に1つまたはカンマ区切り）。",
                countLabel: "アドレス数",
                btnClear: "消去",
                limitWarning: "警告: 50個の上限を超えています！",
                btnSample: "サンプルを読み込む",
                btnReset: "リセット",
                btnCheck: "残高を確認する",
                statTotalBtc: "合計BTC残高",
                statFiatValue: "推定法定通貨価値",
                statUsdValue: "USD価値 ($)",
                statActive: "アクティブアドレス",
                statWithBalance: "残高あり",
                statOutof: "確認対象",
                statChecked: "件中",
                chartTitle: "上位アドレス残高分布",
                tableTitle: "残高確認結果",
                tableSubtitle: "最新のブロックチェーンデータ",
                thAddress: "ビットコインアドレス",
                thType: "タイプ",
                thBtc: "残高 (BTC)",
                thSats: "サトシ",
                thFiat: "法定通貨価値",
                thAction: "操作",
                loadingTitle: "ブロックチェーンデータを取得中...",
                loadingSubtitle: "少々お待ちください...",
                aboutTitle: "BTC Checkerについて",
                aboutDesc: "最大50個の公開BTCアドレス残高を一度に確認できるツールです。",
                aboutFeature1: "100%安全: 秘密鍵は不要です。",
                aboutFeature2: "Legacy、SegWit、Bech32、Taproot対応",
                aboutFeature3: "主要13通貨のリアルタイム為替レート",
                btnCloseModal: "閉じる",
                toastTheme: "テーマが変更されました:",
                toastLang: "言語が変更されました:",
                toastCurrency: "通貨が変更されました:",
                toastSample: "サンプルアドレスを読み込みました",
                toastCleared: "データをクリアしました",
                toastSuccess: "残高照会が完了しました！"
            },
            ko: {
                subtitle: "비트코인 공개 주소 잔액 조회기",
                menu: "메뉴 및 설정",
                menuTitle: "제어판 및 설정",
                menuSubtitle: "환경 설정 및 탐색",
                selectLanguage: "언어",
                selectCurrency: "변환 통화",
                selectTheme: "컬러 테마",
                quickNav: "빠른 탐색",
                navInput: "BTC 주소 입력",
                navSummary: "포트폴리오 요약",
                navSample: "샘플 주소 불러오기",
                navExport: "CSV 보고서 내보내기",
                navAbout: "앱 정보",
                appVersion: "BTC Balance Tracker v2.5",
                inputTitle: "비트코인 주소 입력",
                inputSubtitle: "최대 50개의 비트코인 주소를 입력하세요.",
                countLabel: "주소 수",
                btnClear: "지우기",
                limitWarning: "경고: 50개 주소 제한을 초과했습니다!",
                btnSample: "샘플 데이터 로드",
                btnReset: "초기화",
                btnCheck: "잔액 조회하기",
                statTotalBtc: "총 BTC 잔액",
                statFiatValue: "추정 법정화폐 가치",
                statUsdValue: "USD 가치 ($)",
                statActive: "활성 주소",
                statWithBalance: "잔액 보유",
                statOutof: "조회한",
                statChecked: "개 중",
                chartTitle: "상위 주소 잔액 분포",
                tableTitle: "조회 결과",
                tableSubtitle: "최신 블록체인 쿼리",
                thAddress: "비트코인 주소",
                thType: "유형",
                thBtc: "잔액 (BTC)",
                thSats: "사토시",
                thFiat: "법정화폐 가치",
                thAction: "작업",
                loadingTitle: "블록체인 데이터 가져오는 중...",
                loadingSubtitle: "잠시만 기다려 주세요...",
                aboutTitle: "BTC Checker 정보",
                aboutDesc: "최대 50개의 비트코인 공개 주소 잔액을 동시에 조회합니다.",
                aboutFeature1: "100% 안전: 개인 키가 필요 없음",
                aboutFeature2: "Legacy, SegWit, Bech32 & Taproot 지원",
                aboutFeature3: "전 세계 13개 주요 통화 실시간 환율",
                btnCloseModal: "확인",
                toastTheme: "테마가 변경되었습니다:",
                toastLang: "언어가 변경되었습니다:",
                toastCurrency: "통화가 변경되었습니다:",
                toastSample: "샘플 주소가 로드되었습니다!",
                toastCleared: "초기화되었습니다.",
                toastSuccess: "잔액 조회가 완료되었습니다!"
            },
            hi: {
                subtitle: "सार्वजनिक बिटकॉइन बैलेंस ट्रैकर",
                menu: "मेनू और सेटिंग्स",
                menuTitle: "कंट्रोल पैनल और सेटिंग्स",
                menuSubtitle: "प्राथमिकताएं और नेविगेशन",
                selectLanguage: "भाषा",
                selectCurrency: "रूपांतरण मुद्रा",
                selectTheme: "कलर थीम",
                quickNav: "त्वरित नेविगेशन",
                navInput: "BTC पता दर्ज करें",
                navSummary: "पोर्टफोलियो सारांश",
                navSample: "नमूना पते लोड करें",
                navExport: "CSV रिपोर्ट निर्यात करें",
                navAbout: "ऐप के बारे में",
                appVersion: "BTC Balance Tracker v2.5",
                inputTitle: "बिटकॉइन पते दर्ज करें",
                inputSubtitle: "अधिकतम 50 बिटकॉइन पते दर्ज करें (प्रति पंक्ति एक)।",
                countLabel: "पते",
                btnClear: "साफ़ करें",
                limitWarning: "चेतावनी: आपने 50 पतों की सीमा पार कर ली है!",
                btnSample: "नमूना डेटा भरें",
                btnReset: "रीसेट करें",
                btnCheck: "अब बैलेंस जांचें",
                statTotalBtc: "कुल BTC बैलेंस",
                statFiatValue: "अनुमानित फ़िएट मूल्य",
                statUsdValue: "USD मूल्य ($)",
                statActive: "सक्रिय पते",
                statWithBalance: "बैलेंस के साथ",
                statOutof: "जांचे गए",
                statChecked: "में से",
                chartTitle: "शीर्ष पते का वितरण",
                tableTitle: "जांच के परिणाम",
                tableSubtitle: "नवीनतम ब्लॉकचेन डेटा",
                thAddress: "बिटकॉइन पता",
                thType: "प्रकार",
                thBtc: "बैलेंस (BTC)",
                thSats: "संतोषी (Sats)",
                thFiat: "फ़िएट मूल्य",
                thAction: "कार्रवाई",
                loadingTitle: "ब्लॉकचेन डेटा प्राप्त हो रहा है...",
                loadingSubtitle: "कृपया प्रतीक्षा करें...",
                aboutTitle: "BTC Checker के बारे में",
                aboutDesc: "एक साथ 50 बिटकॉइन पतों का बैलेंस जांचने के लिए ऐप।",
                aboutFeature1: "100% सुरक्षित: प्राइवेट की की जरूरत नहीं।",
                aboutFeature2: "Legacy, SegWit, Bech32 और Taproot समर्थित।",
                aboutFeature3: "13 प्रमुख वैश्विक मुद्राओं के लिए लाइव दरें।",
                btnCloseModal: "ठीक है",
                toastTheme: "थीम बदली गई:",
                toastLang: "भाषा बदली गई:",
                toastCurrency: "मुद्रा बदली गई:",
                toastSample: "नमूना पते लोड किए गए!",
                toastCleared: "डेटा साफ़ कर दिया गया।",
                toastSuccess: "बैलेंस जांच पूर्ण हुई!"
            },
            ru: {
                subtitle: "Трекер публичных балансов Bitcoin",
                menu: "Меню и Настройки",
                menuTitle: "Панель управления",
                menuSubtitle: "Настройки и навигация",
                selectLanguage: "Язык",
                selectCurrency: "Валюта конвертации",
                selectTheme: "Цветовая тема",
                quickNav: "Быстрая навигация",
                navInput: "Ввести адреса BTC",
                navSummary: "Обзор портфеля",
                navSample: "Загрузить примеры",
                navExport: "Экспорт в CSV",
                navAbout: "О программе",
                appVersion: "BTC Balance Tracker v2.5",
                inputTitle: "Введите биткоин-адреса",
                inputSubtitle: "Введите до 50 адресов Bitcoin (по одному на строку).",
                countLabel: "Адреса",
                btnClear: "Очистить",
                limitWarning: "Внимание: Превышен лимит в 50 адресов!",
                btnSample: "Загрузить пример",
                btnReset: "Сбросить всё",
                btnCheck: "Проверить баланс",
                statTotalBtc: "Общий баланс BTC",
                statFiatValue: "Оценка в фиате",
                statUsdValue: "Стоимость в USD ($)",
                statActive: "Активные адреса",
                statWithBalance: "с балансом",
                statOutof: "Из",
                statChecked: "проверенных",
                chartTitle: "Распределение баланса",
                tableTitle: "Результаты проверки",
                tableSubtitle: "Свежие данные из блокчейна",
                thAddress: "Биткоин-адрес",
                thType: "Тип",
                thBtc: "Баланс (BTC)",
                thSats: "Сатоши",
                thFiat: "Стоимость в фиате",
                thAction: "Действие",
                loadingTitle: "Получение данных из блокчейна...",
                loadingSubtitle: "Пожалуйста, подождите...",
                aboutTitle: "О сервисе BTC Checker",
                aboutDesc: "Сервис проверки балансов до 50 публичных BTC-адресов одновременно.",
                aboutFeature1: "100% Безопасно: Приватные ключи не нужны.",
                aboutFeature2: "Поддержка Legacy, SegWit, Bech32 и Taproot.",
                aboutFeature3: "Курсы 13 мировых валют в реальном времени.",
                btnCloseModal: "Понятно",
                toastTheme: "Тема изменена на:",
                toastLang: "Язык изменен на:",
                toastCurrency: "Валюта изменена на:",
                toastSample: "Примеры адресов загружены!",
                toastCleared: "Данные очищены.",
                toastSuccess: "Проверка баланса завершена!"
            },
            uk: {
                subtitle: "Трекер публічних балансів Bitcoin",
                menu: "Меню та Налаштування",
                menuTitle: "Панель керування",
                menuSubtitle: "Налаштування та навігація",
                selectLanguage: "Мова",
                selectCurrency: "Валюта конвертації",
                selectTheme: "Колірна тема",
                quickNav: "Швидка навігація",
                navInput: "Ввести адреси BTC",
                navSummary: "Огляд портфеля",
                navSample: "Завантажити приклади",
                navExport: "Експорт у CSV",
                navAbout: "Про програму",
                appVersion: "BTC Balance Tracker v2.5",
                inputTitle: "Введіть біткоїн-адреси",
                inputSubtitle: "Введіть до 50 адрес Bitcoin (по одній на рядок).",
                countLabel: "Адреси",
                btnClear: "Очистити",
                limitWarning: "Увага: Перевищено ліміт у 50 адрес!",
                btnSample: "Завантажити приклад",
                btnReset: "Скинути все",
                btnCheck: "Перевірити баланс",
                statTotalBtc: "Загальний баланс BTC",
                statFiatValue: "Оцінка у фіаті",
                statUsdValue: "Вартість у USD ($)",
                statActive: "Активні адреси",
                statWithBalance: "з балансом",
                statOutof: "З",
                statChecked: "перевірених",
                chartTitle: "Розподіл балансу",
                tableTitle: "Результати перевірки",
                tableSubtitle: "Найдешевші дані з блокчейну",
                thAddress: "Біткоїн-адреса",
                thType: "Тип",
                thBtc: "Баланс (BTC)",
                thSats: "Сатоші",
                thFiat: "Вартість у фіаті",
                thAction: "Дія",
                loadingTitle: "Отримання даних з блокчейну...",
                loadingSubtitle: "Будь ласка, зачекайте...",
                aboutTitle: "Про BTC Checker",
                aboutDesc: "Сервіс для перевірки балансів до 50 публічних BTC-адрес одночасно.",
                aboutFeature1: "100% Безпечно: Приватні ключі не потрібні.",
                aboutFeature2: "Підтримка Legacy, SegWit, Bech32 та Taproot.",
                aboutFeature3: "Курси 13 світових валют у реальному часі.",
                btnCloseModal: "Зрозуміло",
                toastTheme: "Тему змінено на:",
                toastLang: "Мову змінено на:",
                toastCurrency: "Валюту змінено на:",
                toastSample: "Приклади адрес завантажено!",
                toastCleared: "Дані очищено.",
                toastSuccess: "Перевірку балансу завершено!"
            },
            ar: {
                subtitle: "مستكشف رصيد البيتكوين العام",
                menu: "القائمة والإعدادات",
                menuTitle: "لوحة التحكم والإعدادات",
                menuSubtitle: "تخصيص التفضيلات والتنقل",
                selectLanguage: "اللغة",
                selectCurrency: "عملة التحويل",
                selectTheme: "مظهر الألوان",
                quickNav: "تنقل سريع",
                navInput: "إدخال عناوين BTC",
                navSummary: "ملخص المحفظة",
                navSample: "تحميل عناوين تجريبية",
                navExport: "تصدير تقرير CSV",
                navAbout: "حول التطبيق",
                appVersion: "BTC Balance Tracker v2.5",
                inputTitle: "أدخل عناوين البيتكوين",
                inputSubtitle: "أدخل حتى 50 عنوان بيتكوين (عنوان واحد في كل سطر).",
                countLabel: "العناوين",
                btnClear: "مسح",
                limitWarning: "تحذير: لقد تجاوزت الحد الأقصى وهو 50 عنوانًا!",
                btnSample: "تحميل بيانات تجريبية",
                btnReset: "إعادة ضبط",
                btnCheck: "فحص الرصيد الآن",
                statTotalBtc: "إجمالي رصيد BTC",
                statFiatValue: "القيمة التقديرية",
                statUsdValue: "القيمة بالدولار ($)",
                statActive: "العناوين النشطة",
                statWithBalance: "تحتوي على رصيد",
                statOutof: "من أصل",
                statChecked: "تم فحصها",
                chartTitle: "توزيع الرصيد",
                tableTitle: "نتائج الفحص",
                tableSubtitle: "أحدث بيانات البلوكشين",
                thAddress: "عنوان البيتكوين",
                thType: "النوع",
                thBtc: "الرصيد (BTC)",
                thSats: "ساتوشي",
                thFiat: "القيمة النقدية",
                thAction: "الإجراء",
                loadingTitle: "جاري جلب بيانات البلوكشين...",
                loadingSubtitle: "يرجى الانتظار...",
                aboutTitle: "حول BTC Checker",
                aboutDesc: "تطبيق لفحص رصيد ما يصل إلى 50 عنوان بيتكوين عام في وقت واحد.",
                aboutFeature1: "آمن 100%: لا يتطلب مفاتيح خاصة.",
                aboutFeature2: "يدعم صيغ Legacy و SegWit و Bech32 و Taproot.",
                aboutFeature3: "أسعار صرف مباشرة لـ 13 عملة عالمية.",
                btnCloseModal: "حسناً",
                toastTheme: "تم تغيير المظهر إلى:",
                toastLang: "تم تغيير اللغة إلى:",
                toastCurrency: "تم تغيير العملة إلى:",
                toastSample: "تم تحميل العناوين التجريبية!",
                toastCleared: "تم مسح البيانات.",
                toastSuccess: "اكتمل فحص الرصيد!"
            },
            es: {
                subtitle: "Explorador de Saldos Públicos de Bitcoin",
                menu: "Menú y Configuración",
                menuTitle: "Panel de Control y Ajustes",
                menuSubtitle: "Personaliza preferencias y navegación",
                selectLanguage: "Idioma",
                selectCurrency: "Moneda de Conversión",
                selectTheme: "Tema de Color",
                quickNav: "Navegación Rápida",
                navInput: "Ingresar Direcciones BTC",
                navSummary: "Resumen de Portafolio",
                navSample: "Cargar Ejemplos",
                navExport: "Exportar Reporte CSV",
                navAbout: "Acerca de la App",
                appVersion: "BTC Balance Tracker v2.5",
                inputTitle: "Ingrese Direcciones de Bitcoin",
                inputSubtitle: "Escriba o pegue hasta 50 direcciones de Bitcoin.",
                countLabel: "Direcciones",
                btnClear: "Limpiar",
                limitWarning: "¡Advertencia: Ha superado el límite de 50 direcciones!",
                btnSample: "Cargar Datos de Ejemplo",
                btnReset: "Reiniciar Todo",
                btnCheck: "Consultar Saldos Ahora",
                statTotalBtc: "Saldo Total en BTC",
                statFiatValue: "Valor Estimado en Fiat",
                statUsdValue: "Valor en USD ($)",
                statActive: "Direcciones Activas",
                statWithBalance: "con saldo",
                statOutof: "De",
                statChecked: "verificadas",
                chartTitle: "Distribución de Saldos Principales",
                tableTitle: "Resultados del Saldo",
                tableSubtitle: "Consultas en tiempo real a la blockchain",
                thAddress: "Dirección de Bitcoin",
                thType: "Tipo",
                thBtc: "Saldo (BTC)",
                thSats: "Satoshis",
                thFiat: "Valor Fiat",
                thAction: "Acción",
                loadingTitle: "Obteniendo datos de Blockchain...",
                loadingSubtitle: "Por favor espere...",
                aboutTitle: "Acerca de BTC Checker",
                aboutDesc: "Aplicación para verificar el saldo de hasta 50 direcciones públicas de Bitcoin simultáneamente.",
                aboutFeature1: "100% Seguro: No requiere claves privadas.",
                aboutFeature2: "Soporta formatos Legacy, SegWit, Bech32 y Taproot.",
                aboutFeature3: "Tasas de cambio en vivo para 13 monedas globales.",
                btnCloseModal: "Entendido",
                toastTheme: "Tema actualizado a:",
                toastLang: "Idioma cambiado a:",
                toastCurrency: "Moneda cambiada a:",
                toastSample: "¡Direcciones de ejemplo cargadas!",
                toastCleared: "Datos borrados.",
                toastSuccess: "¡Consulta de saldos completada!"
            },
            la: {
                subtitle: "Explorator Libras Bitcoin Publicas",
                menu: "Index & Optiones",
                menuTitle: "Tabula Moderationis",
                menuSubtitle: "Praeferentiae et navigatio",
                selectLanguage: "Lingua",
                selectCurrency: "Moneta Conversionis",
                selectTheme: "Color Thematis",
                quickNav: "Navigatio Celeris",
                navInput: "Inscribe Inscriptiones BTC",
                navSummary: "Summarium Portfolii",
                navSample: "Exempla Onerare",
                navExport: "Exportare CSV",
                navAbout: "De Applicatione",
                appVersion: "BTC Balance Tracker v2.5",
                inputTitle: "Inscribe Inscriptiones Bitcoin",
                inputSubtitle: "Inscribe usque ad L inscriptiones Bitcoin.",
                countLabel: "Inscriptiones",
                btnClear: "Delere",
                limitWarning: "Monitio: Limitem L inscriptionum excessisti!",
                btnSample: "Onerare Exempla",
                btnReset: "Restituere",
                btnCheck: "Probari Libram Nunc",
                statTotalBtc: "Tota Libra BTC",
                statFiatValue: "Aestimatio Monetae",
                statUsdValue: "Pretium in USD ($)",
                statActive: "Inscriptiones Activae",
                statWithBalance: "cum libra",
                statOutof: "Ex",
                statChecked: "probatis",
                chartTitle: "Distributio Librae Principalis",
                tableTitle: "Resultata Librae",
                tableSubtitle: "Novae interrogationes catenae ciberneticae",
                thAddress: "Inscriptio Bitcoin",
                thType: "Typus",
                thBtc: "Libra (BTC)",
                thSats: "Satoshis",
                thFiat: "Pretium Monetae",
                thAction: "Actio",
                loadingTitle: "Data Catenae Accipientes...",
                loadingSubtitle: "Quaeso exspecta...",
                aboutTitle: "De BTC Checker",
                aboutDesc: "Applicatio ad librandas usque ad L inscriptiones publicas Bitcoin.",
                aboutFeature1: "100% Tutum: Nullae claves privatae requiruntur.",
                aboutFeature2: "Sustinet formas Legacy, SegWit, Bech32 & Taproot.",
                aboutFeature3: "Cambium vivum XIII monetarum mundi.",
                btnCloseModal: "Intellexi",
                toastTheme: "Thema mutatum ad:",
                toastLang: "Lingua mutata ad:",
                toastCurrency: "Moneta mutata ad:",
                toastSample: "Exempla onerata sunt!",
                toastCleared: "Data deleta sunt.",
                toastSuccess: "Probatio librae finita est!"
            },
            de: {
                subtitle: "Öffentlicher Bitcoin-Guthaben-Explorer",
                menu: "Menü & Einstellungen",
                menuTitle: "Kontrollzentrum",
                menuSubtitle: "Einstellungen und Navigation",
                selectLanguage: "Sprache",
                selectCurrency: "Umrechnungswährung",
                selectTheme: "Farbthema",
                quickNav: "Schnellnavigation",
                navInput: "BTC-Adressen eingeben",
                navSummary: "Portfolio-Übersicht",
                navSample: "Beispieldaten laden",
                navExport: "CSV-Bericht exportieren",
                navAbout: "Über die Anwendung",
                appVersion: "BTC Balance Tracker v2.5",
                inputTitle: "Bitcoin-Adressen eingeben",
                inputSubtitle: "Geben Sie bis zu 50 Bitcoin-Adressen ein.",
                countLabel: "Adressen",
                btnClear: "Löschen",
                limitWarning: "Warnung: Sie haben das Limit von 50 Adressen überschritten!",
                btnSample: "Beispieldaten füllen",
                btnReset: "Zurücksetzen",
                btnCheck: "Guthaben jetzt prüfen",
                statTotalBtc: "Gesamtes BTC-Guthaben",
                statFiatValue: "Geschätzter Fiat-Wert",
                statUsdValue: "Wert in USD ($)",
                statActive: "Aktive Adressen",
                statWithBalance: "mit Guthaben",
                statOutof: "Von",
                statChecked: "geprüften",
                chartTitle: "Guthabenverteilung",
                tableTitle: "Ergebnisse",
                tableSubtitle: "Aktuelle Blockchain-Abfragen",
                thAddress: "Bitcoin-Adresse",
                thType: "Typ",
                thBtc: "Guthaben (BTC)",
                thSats: "Satoshis",
                thFiat: "Fiat-Wert",
                thAction: "Aktion",
                loadingTitle: "Blockchain-Daten werden abgerufen...",
                loadingSubtitle: "Bitte warten...",
                aboutTitle: "Über BTC Checker",
                aboutDesc: "Anwendung zur Überprüfung von bis zu 50 öffentlichen Bitcoin-Adressen gleichzeitig.",
                aboutFeature1: "100% Sicher: Keine privaten Schlüssel erforderlich.",
                aboutFeature2: "Unterstützt Legacy, SegWit, Bech32 & Taproot.",
                aboutFeature3: "Echtzeit-Wechselkurse für 13 Währungen.",
                btnCloseModal: "Verstanden",
                toastTheme: "Thema geändert zu:",
                toastLang: "Sprache geändert zu:",
                toastCurrency: "Währung geändert zu:",
                toastSample: "Beispieladressen geladen!",
                toastCleared: "Daten gelöscht.",
                toastSuccess: "Guthabenprüfung abgeschlossen!"
            },
            jv: {
                subtitle: "Pemeriksa Saldo Bitcoin Publik",
                menu: "Menu & Setelan",
                menuTitle: "Panel Kontrol & Setelan",
                menuSubtitle: "Atur pilihan & navigasi",
                selectLanguage: "Basa",
                selectCurrency: "Mata Uang Konversi",
                selectTheme: "Tema Warna",
                quickNav: "Navigasi Cepat",
                navInput: "Mlebuake Alamat BTC",
                navSummary: "Ringkesan Portofolio",
                navSample: "Isi Conto Alamat",
                navExport: "Ekspor Laporan CSV",
                navAbout: "Babagan Aplikasi",
                appVersion: "BTC Balance Tracker v2.5",
                inputTitle: "Mlebuake Alamat Bitcoin",
                inputSubtitle: "Tulis utawa tempel nganti 50 alamat Bitcoin.",
                countLabel: "Alamat",
                btnClear: "Busal",
                limitWarning: "Peringatan: Sampeyan ngluwihi wates 50 alamat!",
                btnSample: "Isi Conto Data",
                btnReset: "Reset Kabeh",
                btnCheck: "Cek Saldo Saiki",
                statTotalBtc: "Total Saldo BTC",
                statFiatValue: "Perkiraan Nilai Fiat",
                statUsdValue: "Nilai ing USD ($)",
                statActive: "Alamat Aktif",
                statWithBalance: "ana saldone",
                statOutof: "Saka",
                statChecked: "sing dicek",
                chartTitle: "Distribusi Saldo Utama",
                tableTitle: "Hasil Saldo",
                tableSubtitle: "Data blockchain paling anyar",
                thAddress: "Alamat Bitcoin",
                thType: "Tipe",
                thBtc: "Saldo (BTC)",
                thSats: "Satoshis",
                thFiat: "Nilai Fiat",
                thAction: "Tindakan",
                loadingTitle: "Jupuk Data Blockchain...",
                loadingSubtitle: "Manggaweni diluk...",
                aboutTitle: "Babagan BTC Checker",
                aboutDesc: "Aplikasi kanggo mriksa saldo nganti 50 alamat Bitcoin bebarengan.",
                aboutFeature1: "100% Aman: Tanpa Private Key.",
                aboutFeature2: "Ndukung format Legacy, SegWit, Bech32 & Taproot.",
                aboutFeature3: "Kurs langsung 13 mata uang donya.",
                btnCloseModal: "Paham",
                toastTheme: "Tema diganti dadi:",
                toastLang: "Basa diganti dadi:",
                toastCurrency: "Mata uang diganti dadi:",
                toastSample: "Conto alamat wis dimuat!",
                toastCleared: "Data wis dibusal.",
                toastSuccess: "Pemeriksaan saldo rampung!"
            },
            fr: {
                subtitle: "Explorateur de Solde Bitcoin Public",
                menu: "Menu & Paramètres",
                menuTitle: "Panneau de Contrôle",
                menuSubtitle: "Personnaliser les préférences",
                selectLanguage: "Langue",
                selectCurrency: "Devise de Conversion",
                selectTheme: "Thème Couleur",
                quickNav: "Navigation Rapide",
                navInput: "Entrer Adresses BTC",
                navSummary: "Résumé Portfolio",
                navSample: "Charger Exemples",
                navExport: "Exporter Rapport CSV",
                navAbout: "À propos",
                appVersion: "BTC Balance Tracker v2.5",
                inputTitle: "Entrez des adresses Bitcoin",
                inputSubtitle: "Saisissez ou collez jusqu'à 50 adresses Bitcoin.",
                countLabel: "Adresses",
                btnClear: "Effacer",
                limitWarning: "Attention : Vous avez dépassé la limite de 50 adresses !",
                btnSample: "Charger Exemple",
                btnReset: "Réinitialiser",
                btnCheck: "Vérifier les Soldes",
                statTotalBtc: "Solde Total BTC",
                statFiatValue: "Valeur Fiat Estimée",
                statUsdValue: "Valeur en USD ($)",
                statActive: "Adresses Actives",
                statWithBalance: "avec solde",
                statOutof: "Sur",
                statChecked: "vérifiées",
                chartTitle: "Distribution des Soldes Principaux",
                tableTitle: "Résultats de Solde",
                tableSubtitle: "Requêtes blockchain en temps réel",
                thAddress: "Adresse Bitcoin",
                thType: "Type",
                thBtc: "Solde (BTC)",
                thSats: "Satoshis",
                thFiat: "Valeur Fiat",
                thAction: "Action",
                loadingTitle: "Obtention des données Blockchain...",
                loadingSubtitle: "Veuillez patienter...",
                aboutTitle: "À propos de BTC Checker",
                aboutDesc: "Vérifiez simultanément le solde de jusqu'à 50 adresses Bitcoin publiques.",
                aboutFeature1: "100% Sécurisé : Aucune clé privée requise.",
                aboutFeature2: "Prend en charge Legacy, SegWit, Bech32 & Taproot.",
                aboutFeature3: "Taux de change en direct pour 13 devises mondiales.",
                btnCloseModal: "Compris",
                toastTheme: "Thème mis à jour :",
                toastLang: "Langue modifiée :",
                toastCurrency: "Devise modifiée :",
                toastSample: "Adresses d'exemple chargées !",
                toastCleared: "Données effacées.",
                toastSuccess: "Vérification des soldes terminée !"
            }
        };

        const SAMPLE_ADDRESSES = [
            "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", // Satoshi Genesis Address
            "34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo", // Binance Cold Storage
            "bc1qgdjqv0av3q56jvd82tkdjpy7gdp9ut8tlqmgrpmv24sq90ecnvqqjwvw97", // Bitfinex Cold Storage
            "39824m8vhmxMvyuRdM4VBB23DacgAZzJ3U", // Exchange Cold Wallet
            "bc1qa5wkgaew29dz38I32g7ch2m3chpms2848c2y5" // Active Segwit
        ];

        window.onload = function() {
            fetchBtcPrices();
            setInterval(fetchBtcPrices, 60000);
            updateCount();
            applyI18n();
            document.getElementById('languageSelect').value = currentLang;
            document.getElementById('currencySelect').value = currentCurrency;
            document.getElementById('themeSelect').value = currentTheme;
        };

        async function fetchBtcPrices() {
            try {
                const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,aed,myr,idr,sgd,thb,cny,jpy,krw,rub,uah,inr');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.bitcoin) {
                        Object.keys(fiatRates).forEach(curr => {
                            if (data.bitcoin[curr]) {
                                fiatRates[curr] = data.bitcoin[curr];
                            }
                        });
                        updatePriceTicker();
                        if (currentResults.length > 0) {
                            renderSummaryAndTable();
                        }
                    }
                } else {
                    throw new Error('CoinGecko fallback');
                }
            } catch (e) {
                console.warn('Using fallback prices for currencies...');
                updatePriceTicker();
            }
        }

        function updatePriceTicker() {
            const usdVal = fiatRates.usd.toLocaleString('en-US');
            const targetMeta = currencyMeta[currentCurrency];
            const targetVal = fiatRates[currentCurrency].toLocaleString(targetMeta.locale);

            document.getElementById('btcPricePrimary').textContent = `$${usdVal}`;
            document.getElementById('btcPriceSecondary').textContent = `${targetMeta.symbol}${targetVal} ${targetMeta.code}`;
        }

        function openDrawer() {
            const drawer = document.getElementById('drawer');
            const backdrop = document.getElementById('drawerBackdrop');
            const panel = document.getElementById('drawerPanel');

            drawer.classList.remove('pointer-events-none');
            setTimeout(() => {
                backdrop.classList.remove('opacity-0');
                backdrop.classList.add('opacity-100');
                panel.classList.remove('translate-x-full');
                panel.classList.add('translate-x-0');
            }, 10);
        }

        function closeDrawer() {
            const drawer = document.getElementById('drawer');
            const backdrop = document.getElementById('drawerBackdrop');
            const panel = document.getElementById('drawerPanel');

            backdrop.classList.remove('opacity-100');
            backdrop.classList.add('opacity-0');
            panel.classList.remove('translate-x-0');
            panel.classList.add('translate-x-full');

            setTimeout(() => {
                drawer.classList.add('pointer-events-none');
            }, 300);
        }

        function changeTheme(themeName) {
            currentTheme = themeName;
            document.body.className = `theme-${themeName} custom-theme-bg custom-theme-text min-h-screen flex flex-col antialiased`;
            const t = translations[currentLang] || translations.en;
            showToast(`${t.toastTheme} ${themeName.toUpperCase()}`, 'info');
        }

        function changeLanguage(langCode) {
            currentLang = langCode;
            applyI18n();
            const t = translations[currentLang] || translations.en;
            showToast(`${t.toastLang} ${langCode.toUpperCase()}`, 'info');
        }

        function changeCurrency(currCode) {
            currentCurrency = currCode;
            updatePriceTicker();
            if (currentResults.length > 0) {
                renderSummaryAndTable();
            }
            const t = translations[currentLang] || translations.en;
            showToast(`${t.toastCurrency} ${currCode.toUpperCase()}`, 'info');
        }

        function applyI18n() {
            const t = translations[currentLang] || translations.en;
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (t[key]) {
                    el.textContent = t[key];
                }
            });

            const addressInput = document.getElementById('addressInput');
            if (addressInput) {
                addressInput.placeholder = `Example:\n1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa\nbc1ql49w48q928er3xt2y2mchpt9v02d29025ch9tx\n3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy`;
            }
        }

        function openAboutModal() {
            document.getElementById('aboutModal').classList.remove('hidden');
        }

        function closeAboutModal() {
            document.getElementById('aboutModal').classList.add('hidden');
        }

        function parseAddresses(input) {
            if (!input) return [];
            return input
                .split(/[\n,\s]+/)
                .map(a => a.trim())
                .filter(a => a.length > 0);
        }

        function updateCount() {
            const textarea = document.getElementById('addressInput');
            const addresses = parseAddresses(textarea.value);
            const countSpan = document.getElementById('addressCount');
            const alertBox = document.getElementById('validationAlert');
            
            countSpan.textContent = addresses.length;

            if (addresses.length > 50) {
                countSpan.classList.add('text-red-500');
                alertBox.classList.remove('hidden');
            } else {
                countSpan.classList.remove('text-red-500');
                alertBox.classList.add('hidden');
            }
        }

        function loadSampleAddresses() {
            document.getElementById('addressInput').value = SAMPLE_ADDRESSES.join('\n');
            updateCount();
            const t = translations[currentLang] || translations.en;
            showToast(t.toastSample, 'success');
        }

        function clearInput() {
            document.getElementById('addressInput').value = '';
            updateCount();
        }

        function clearAll() {
            clearInput();
            document.getElementById('summarySection').classList.add('hidden');
            document.getElementById('resultsSection').classList.add('hidden');
            currentResults = [];
            const t = translations[currentLang] || translations.en;
            showToast(t.toastCleared, 'info');
        }

        function getAddressType(address) {
            if (address.startsWith('1')) return { name: 'Legacy (P2PKH)', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
            if (address.startsWith('3')) return { name: 'Nested SegWit (P2SH)', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' };
            if (address.startsWith('bc1q')) return { name: 'Native SegWit (Bech32)', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
            if (address.startsWith('bc1p')) return { name: 'Taproot (P2TR)', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
            return { name: 'Unknown / Invalid', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' };
        }

        async function fetchBalances() {
            const rawInput = document.getElementById('addressInput').value;
            const addresses = parseAddresses(rawInput);
            const t = translations[currentLang] || translations.en;

            if (addresses.length === 0) {
                showToast('Please enter at least one Bitcoin address!', 'warning');
                return;
            }

            if (addresses.length > 50) {
                showToast('Maximum 50 addresses allowed!', 'error');
                return;
            }

            document.getElementById('loadingState').classList.remove('hidden');
            document.getElementById('summarySection').classList.add('hidden');
            document.getElementById('resultsSection').classList.add('hidden');
            
            currentResults = [];
            
            try {
                const batchUrl = `https://blockchain.info/balance?active=${addresses.join(',')}&cors=true`;
                const response = await fetch(batchUrl);

                if (response.ok) {
                    const data = await response.json();
                    
                    addresses.forEach(addr => {
                        if (data[addr]) {
                            const sats = data[addr].final_balance;
                            const btc = sats / 100000000;
                            currentResults.push({
                                address: addr,
                                sats: sats,
                                btc: btc
                            });
                        } else {
                            currentResults.push({
                                address: addr,
                                sats: 0,
                                btc: 0
                            });
                        }
                    });
                } else {
                    throw new Error('Fallback Mempool');
                }
            } catch (err) {
                for (let i = 0; i < addresses.length; i++) {
                    const addr = addresses[i];
                    try {
                        const res = await fetch(`https://mempool.space/api/address/${addr}`);
                        if (res.ok) {
                            const info = await res.json();
                            const sats = (info.chain_stats.funded_txo_sum || 0) - (info.chain_stats.spent_txo_sum || 0);
                            const btc = sats / 100000000;
                            currentResults.push({
                                address: addr,
                                sats: sats,
                                btc: btc
                            });
                        } else {
                            currentResults.push({ address: addr, sats: 0, btc: 0 });
                        }
                    } catch(e) {
                        currentResults.push({ address: addr, sats: 0, btc: 0 });
                    }
                }
            }

            document.getElementById('loadingState').classList.add('hidden');
            renderSummaryAndTable();
            showToast(t.toastSuccess, 'success');
        }

        function renderSummaryAndTable() {
            let totalBtc = 0;
            let totalSats = 0;
            let activeCount = 0;

            currentResults.forEach(item => {
                totalBtc += item.btc;
                totalSats += item.sats;
                if (item.btc > 0) activeCount++;
            });

            const currMeta = currencyMeta[currentCurrency];
            const currentFiatRate = fiatRates[currentCurrency] || 0;
            const totalFiat = totalBtc * currentFiatRate;
            const totalUsd = totalBtc * fiatRates.usd;

            document.getElementById('totalBtc').textContent = totalBtc.toFixed(8);
            document.getElementById('totalSats').textContent = `${totalSats.toLocaleString('en-US')} Satoshis`;
            
            document.getElementById('totalFiat').textContent = `${currMeta.symbol}${totalFiat.toLocaleString(currMeta.locale, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            document.getElementById('selectedCurrencyLabel').textContent = `Live ${currMeta.code} rate`;

            document.getElementById('totalUsd').textContent = `$${totalUsd.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            document.getElementById('activeAddressesCount').textContent = activeCount;
            document.getElementById('scannedAddressesCount').textContent = currentResults.length;

            document.getElementById('summarySection').classList.remove('hidden');
            document.getElementById('resultsSection').classList.remove('hidden');

            renderChart();

            renderTableBody(currentResults);
        }

        function renderChart() {
            const ctx = document.getElementById('balanceChart').getContext('2d');
            
            if (balanceChartInstance) {
                balanceChartInstance.destroy();
            }

            const sorted = [...currentResults].sort((a, b) => b.btc - a.btc).slice(0, 10);
            const labels = sorted.map(item => `${item.address.substring(0, 6)}...${item.address.substring(item.address.length - 4)}`);
            const dataValues = sorted.map(item => item.btc);

            balanceChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'BTC Balance',
                        data: dataValues,
                        backgroundColor: '#f7931a',
                        borderRadius: 6,
                        hoverBackgroundColor: '#e08213'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: '#9ca3af' }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: '#9ca3af' }
                        }
                    }
                }
            });
        }

        function renderTableBody(items) {
            const tbody = document.getElementById('resultsTableBody');
            tbody.innerHTML = '';

            if (items.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 custom-theme-muted">No addresses found.</td></tr>`;
                return;
            }

            const currMeta = currencyMeta[currentCurrency];
            const currentFiatRate = fiatRates[currentCurrency] || 0;

            items.forEach((item, idx) => {
                const addrType = getAddressType(item.address);
                const itemFiat = item.btc * currentFiatRate;
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-amber-500/5 transition border-b border-gray-800/40';

                tr.innerHTML = `
                    <td class="p-3.5 pl-5 font-mono text-xs text-gray-500">${idx + 1}</td>
                    <td class="p-3.5">
                        <div class="flex items-center space-x-2">
                            <span class="font-mono text-xs font-medium">${item.address}</span>
                            <button onclick="copyToClipboard('${item.address}')" title="Copy Address" class="text-gray-500 hover:text-amber-400 transition">
                                <i class="fa-regular fa-copy text-xs"></i>
                            </button>
                        </div>
                    </td>
                    <td class="p-3.5">
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-semibold border ${addrType.color}">
                            ${addrType.name}
                        </span>
                    </td>
                    <td class="p-3.5 text-right font-mono font-bold ${item.btc > 0 ? 'text-amber-400' : 'text-gray-500'}">
                        ${item.btc.toFixed(8)}
                    </td>
                    <td class="p-3.5 text-right font-mono text-xs text-gray-400">
                        ${item.sats.toLocaleString('en-US')}
                    </td>
                    <td class="p-3.5 text-right font-semibold text-emerald-400">
                        ${currMeta.symbol}${itemFiat.toLocaleString(currMeta.locale, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </td>
                    <td class="p-3.5 text-center">
                        <a href="https://mempool.space/address/${item.address}" target="_blank" title="View in Mempool Explorer" class="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition inline-block">
                            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                        </a>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        function filterTable() {
            const query = document.getElementById('tableSearch').value.toLowerCase();
            const filtered = currentResults.filter(item => item.address.toLowerCase().includes(query));
            renderTableBody(filtered);
        }

        function exportCSV() {
            if (currentResults.length === 0) {
                showToast('No data to export. Please check balances first!', 'warning');
                return;
            }

            const currMeta = currencyMeta[currentCurrency];
            const currentFiatRate = fiatRates[currentCurrency] || 0;

            let csvContent = `data:text/csv;charset=utf-8,No,Bitcoin_Address,Address_Type,Balance_BTC,Satoshis,Fiat_${currMeta.code},USD_Value\n`;

            currentResults.forEach((item, idx) => {
                const type = getAddressType(item.address).name;
                const fiatVal = item.btc * currentFiatRate;
                const usdVal = item.btc * fiatRates.usd;
                csvContent += `${idx + 1},${item.address},"${type}",${item.btc.toFixed(8)},${item.sats},${fiatVal.toFixed(2)},${usdVal.toFixed(2)}\n`;
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `btc_balances_${currentCurrency}_${new Date().toISOString().slice(0,10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast('CSV Report downloaded successfully!', 'success');
        }

        function copyToClipboard(text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                showToast('Address copied to clipboard!', 'info');
            } catch (err) {
                showToast('Failed to copy address', 'error');
            }
            document.body.removeChild(textarea);
        }

        function showToast(message, type = 'info') {
            const container = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            
            let bgClass = 'bg-gray-800 border-gray-700 text-white';
            let icon = 'fa-circle-info text-blue-400';

            if (type === 'success') {
                bgClass = 'bg-gray-900 border-emerald-500/50 text-white';
                icon = 'fa-circle-check text-emerald-400';
            } else if (type === 'warning') {
                bgClass = 'bg-gray-900 border-amber-500/50 text-white';
                icon = 'fa-triangle-exclamation text-amber-400';
            } else if (type === 'error') {
                bgClass = 'bg-gray-900 border-red-500/50 text-white';
                icon = 'fa-circle-xmark text-red-400';
            }

            toast.className = `pointer-events-auto flex items-center space-x-3 px-4 py-3 rounded-xl border shadow-xl text-xs font-medium transform transition-all duration-300 translate-y-2 opacity-0 ${bgClass}`;
            toast.innerHTML = `
                <i class="fa-solid ${icon} text-base"></i>
                <span>${message}</span>
            `;

            container.appendChild(toast);

            setTimeout(() => {
                toast.classList.remove('translate-y-2', 'opacity-0');
            }, 10);

            setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-2');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 3000);
        }