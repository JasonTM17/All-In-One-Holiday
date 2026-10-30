import type { DateRule } from "@/lib/dates";

export type HolidayCategory = "phu-nu" | "quoc-gia" | "truyen-thong" | "quoc-te";

export const CATEGORY_LABELS: Record<HolidayCategory, string> = {
  "phu-nu": "Phụ nữ",
  "quoc-gia": "Quốc gia",
  "truyen-thong": "Truyền thống",
  "quoc-te": "Quốc tế",
};

export interface HolidayTheme {
  /** CSS gradient stops for the hero */
  from: string;
  to: string;
  /** Accent used for buttons / highlights on the page */
  accent: string;
}

export interface Tradition {
  title: string;
  text: string;
}

export interface Gift {
  title: string;
  text: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Holiday {
  slug: string;
  name: string;
  /** Large typographic mark shown in the hero, e.g. "08·03" */
  dateMark: string;
  /** Human-readable recurring date, e.g. "10/3 Âm lịch" */
  displayDate: string;
  rule: DateRule;
  categories: HolidayCategory[];
  theme: HolidayTheme;
  motif: MotifName;
  tagline: string;
  history: string[];
  meaning: string;
  traditions: Tradition[];
  wishes: string[];
  gifts: Gift[];
  faq: Faq[];
}

/** Decorative SVG ornament shown on each holiday page (see components/Motif). */
export type MotifName =
  | "fireworks"
  | "lantern"
  | "fullmoon"
  | "heart"
  | "rose"
  | "temple"
  | "star"
  | "wheat"
  | "carnation"
  | "balloon"
  | "home"
  | "candle"
  | "lotus"
  | "flag"
  | "moonstar"
  | "ribbon"
  | "book"
  | "medal"
  | "pine";

export const holidays: Holiday[] = [
  {
    slug: "tet-duong-lich",
    motif: "fireworks",
    name: "Tết Dương lịch",
    dateMark: "01·01",
    displayDate: "1 tháng 1",
    rule: { type: "solar", month: 1, day: 1 },
    categories: ["quoc-te"],
    theme: { from: "#312e81", to: "#7c3aed", accent: "#a78bfa" },
    tagline: "Ngày đầu tiên của năm mới dương lịch.",
    history: [
      "Tết Dương lịch đánh dấu ngày 1 tháng 1 theo lịch Gregorius — lịch quốc tế được áp dụng ở Việt Nam từ đầu thế kỷ 20 và trở thành lịch hành chính của quốc gia sau Cách mạng tháng Tám.",
      "Dù Tết Nguyên Đán vẫn là lễ lớn nhất, ngày 1/1 đã trở thành dịp nghỉ lễ quốc gia để mọi người tổng kết năm cũ và đặt mục tiêu cho năm mới.",
    ],
    meaning:
      "Dịp để khép lại một năm, nghỉ ngơi bên gia đình và mở đầu hành trình mới với những dự định tươi sáng.",
    traditions: [
      { title: "Đếm ngược giao thừa", text: "Nhiều thành phố tổ chức bắn pháo hoa và đếm ngược về 0 giờ." },
      { title: "Lời chúc năm mới", text: "Trao đổi thiệp, tin nhắn chúc sức khỏe và thành công." },
      { title: "Kế hoạch năm mới", text: "Viết mục tiêu, du lịch ngắn ngày hoặc sum họp gia đình." },
    ],
    wishes: [
      "Chúc năm mới an khang, thịnh vượng, vạn sự như ý!",
      "Năm mới đến, chúc bạn đủ đầy sức khỏe, niềm vui và thành công.",
      "Happy New Year! Mong mọi dự định của bạn đều thành hiện thực.",
      "Chúc gia đình bạn một năm mới bình an, sum vầy, phát tài.",
      "Một năm mới, ba trăm sáu mươi lăm cơ hội mới — chúc bạn nắm lấy tất cả.",

    ],
    gifts: [
      { title: "Sổ tay kế hoạch", text: "Một cuốn planner để bắt đầu năm mới ngăn nắp." },
      { title: "Lịch để bàn", text: "Quà thiết thực cho bạn bè, đồng nghiệp." },
      { title: "Bữa tối đầu năm", text: "Đặt bàn ăn tối cùng người thân chào năm mới." },
    ],
    faq: [
      { q: "Tết Dương lịch được nghỉ mấy ngày?", a: "Theo Bộ luật Lao động, người lao động được nghỉ 1 ngày vào 1/1 dương lịch; nếu trùng cuối tuần thường được nghỉ bù." },
      { q: "Tết Dương lịch và Tết Nguyên Đán khác nhau thế nào?", a: "Tết Dương lịch là ngày 1/1 theo lịch quốc tế; Tết Nguyên Đán là mùng 1 tháng Giêng âm lịch, lễ lớn nhất của Việt Nam." },
      { q: "Có bắn pháo hoa không?", a: "Hà Nội, TP.HCM và nhiều địa phương thường tổ chức điểm bắn pháo hoa vào đêm giao thừa 31/12." },
    ],
  },
  {
    slug: "tet-nguyen-dan",
    motif: "lantern",
    name: "Tết Nguyên Đán",
    dateMark: "Mùng Một",
    displayDate: "1/1 Âm lịch",
    rule: { type: "lunar", month: 1, day: 1 },
    categories: ["truyen-thong", "quoc-gia"],
    theme: { from: "#991b1b", to: "#b45309", accent: "#fbbf24" },
    tagline: "Lễ lớn nhất năm của người Việt.",
    history: [
      "Tết Nguyên Đán là ngày đầu năm âm lịch, có nguồn gốc từ nền văn minh nông nghiệp lúa nước, gắn với chu kỳ của mặt trăng và mùa vụ.",
      "Qua hàng nghìn năm, Tết trở thành dịp thiêng liêng nhất để con cháu nhớ về tổ tiên, sum họp gia đình và cầu mong một năm mưa thuận gió hòa.",
    ],
    meaning:
      "Tết là khoảnh khắc chuyển giao giữa năm cũ và năm mới — thời điểm của đoàn viên, hiếu kính và hy vọng.",
    traditions: [
      { title: "Gói bánh chưng, bánh tét", text: "Gia đình quây quần gói bánh, nấu bánh suốt đêm trước Tết." },
      { title: "Lì xì đầu năm", text: "Người lớn mừng tuổi trẻ nhỏ bằng bao đỏ cầu may mắn." },
      { title: "Chúc Tết, thăm họ hàng", text: "Mùng 1 Tết cha, mùng 2 Tết mẹ, mùng 3 Tết thầy." },
      { title: "Câu đối đỏ, hoa đào hoa mai", text: "Trang trí nhà cửa với sắc đỏ vàng rực rỡ đón xuân." },
    ],
    wishes: [
      "Chúc mừng năm mới — an khang thịnh vượng, vạn sự như ý!",
      "Năm mới chúc gia đình bạn sức khỏe dồi dào, tài lộc đầy nhà.",
      "Chúc bạn một năm mới nhiều thắng lợi, công thành danh toại.",
      "Xuân sang phú quý đem tài lộc về; Tết đến bình an giữ hạnh phúc ở.",
      "Chúc tuổi mới thêm niềm vui, nhà nhà sum họp, người người an vui.",

    ],
    gifts: [
      { title: "Giỏ quà Tết", text: "Bánh mứt, trà, rượu vang — quà biếu phổ biến nhất." },
      { title: "Bao lì xì", text: "Tiền mệnh giá mới trong bao đỏ mang lời chúc may mắn." },
      { title: "Cây cảnh, hoa xuân", text: "Đào, mai, quất tượng trưng cho sự khởi đầu tươi mới." },
    ],
    faq: [
      { q: "Tết Nguyên Đán rơi vào khoảng thời gian nào?", a: "Từ cuối tháng 1 đến giữa tháng 2 dương lịch, tùy năm âm lịch. Trang này tự tính ngày dương chính xác cho từng năm." },
      { q: "Tết được nghỉ bao nhiêu ngày?", a: "Người lao động được nghỉ 5 ngày lễ Tết Âm lịch theo luật; thực tế thường kéo dài 7–9 ngày nhờ nghỉ bù và cuối tuần." },
      { q: "Xông đất là gì?", a: "Người đầu tiên bước vào nhà sau giao thừa được tin là ảnh hưởng đến vận may cả năm của gia chủ." },
    ],
  },
  {
    slug: "tet-nguyen-tieu",
    motif: "fullmoon",
    name: "Tết Nguyên Tiêu",
    dateMark: "15·01",
    displayDate: "15/1 Âm lịch",
    rule: { type: "lunar", month: 1, day: 15 },
    categories: ["truyen-thong"],
    theme: { from: "#7f1d1d", to: "#ea580c", accent: "#fb923c" },
    tagline: "Rằm tháng Giêng — đêm trăng đầu năm.",
    history: [
      "Tết Nguyên Tiêu là đêm rằm đầu tiên của năm âm lịch, gắn với tục thờ Phật, cầu an và hội đèn lồng lâu đời ở các cộng đồng người Việt và Hoa.",
      "Người Việt có câu \"lễ Phật quanh năm không bằng rằm tháng Giêng\" — ngày này các gia đình thường đi chùa, cúng gia tiên và ăn chè trôi nước.",
    ],
    meaning:
      "Đêm trăng tròn đầu năm tượng trưng cho sự viên mãn; dịp cầu bình an cho cả năm.",
    traditions: [
      { title: "Đi chùa cầu an", text: "Lễ Phật, thắp hương cầu sức khỏe và bình an đầu năm." },
      { title: "Cúng rằm tháng Giêng", text: "Mâm cúng gia tiên với chè trôi nước, hoa quả." },
      { title: "Ăn chè trôi nước", text: "Viên bánh tròn thơm gừng tượng trưng cho sự đoàn viên." },
      { title: "Hội đèn lồng", text: "Nhiều nơi rước đèn, ngắm hoa đăng rực rỡ về đêm." },
    ],
    wishes: [
      "Rằm tháng Giêng, chúc gia đình bạn viên mãn, bình an cả năm.",
      "Chúc bạn một năm tròn đầy như trăng rằm đêm nay.",
      "Nguyện ánh trăng rằm soi sáng mọi điều tốt đẹp đến với bạn.",
      "Rằm đầu năm, chúc nhà nhà no đủ, người người bình an.",
      "Chúc bạn và gia đình một đêm rằm tháng Giêng thật ấm và thật đủ đầy.",

    ],
    gifts: [
      { title: "Hộp chè trôi nước", text: "Nguyên liệu sẵn sàng để nấu món rằm tháng Giêng." },
      { title: "Đèn lồng trang trí", text: "Điểm nhấn ấm cúng cho đêm rằm đầu năm." },
      { title: "Trầm hương", text: "Món quà thanh tịnh cho không gian thờ cúng." },
    ],
    faq: [
      { q: "Tết Nguyên Tiêu là ngày nào?", a: "Rằm tháng Giêng âm lịch, tức ngày 15/1 âm — đêm trăng tròn đầu tiên của năm mới." },
      { q: "Có được nghỉ lễ không?", a: "Không, đây là lễ truyền thống chứ không phải ngày nghỉ quốc gia." },
      { q: "Ăn gì ngày rằm tháng Giêng?", a: "Chè trôi nước (bánh trôi nước) là món đặc trưng, nhiều gia đình ăn chay cả ngày rằm." },
    ],
  },
  {
    slug: "valentine",
    motif: "heart",
    name: "Lễ Tình nhân",
    dateMark: "14·02",
    displayDate: "14 tháng 2",
    rule: { type: "solar", month: 2, day: 14 },
    categories: ["quoc-te"],
    theme: { from: "#9f1239", to: "#e11d48", accent: "#fda4af" },
    tagline: "Ngày của những lời yêu thương.",
    history: [
      "Valentine gắn với Thánh Valentino thế kỷ III — người được truyền lại đã bí mật chủ hôn cho các đôi tình nhân thời La Mã cấm kết hôn.",
      "Tại Việt Nam, ngày 14/2 trở thành dịp phổ biến để các cặp đôi trao quà, hoa hồng và sô-cô-la cho nhau.",
    ],
    meaning: "Dịp để nói ra điều khó nói — một lời yêu thương đúng lúc đáng giá hơn mọi món quà.",
    traditions: [
      { title: "Tặng hoa hồng", text: "Hồng đỏ cho tình yêu nồng cháy, hồng nhạt cho sự ngọt ngào." },
      { title: "Sô-cô-la và thiệp", text: "Cặp quà kinh điển kèm một lời nhắn viết tay." },
      { title: "Hẹn hò đặc biệt", text: "Bữa tối, bộ phim hay chuyến đi ngắn dành cho hai người." },
    ],
    wishes: [
      "Anh/chị là món quà đẹp nhất mà đời mang đến. Valentine vui vẻ!",
      "Cảm ơn em vì đã chọn đồng hành cùng anh mỗi ngày.",
      "Yêu em hôm qua, yêu em hôm nay, và sẽ yêu em cả ngày mai.",
      "Chúc tình yêu của hai ta luôn ngọt như viên sô-cô-la đầu tiên.",
      "Mong mỗi ngày bên nhau đều là một ngày Valentine.",

    ],
    gifts: [
      { title: "Hoa hồng", text: "Chọn bó hoa theo màu yêu thích của người ấy." },
      { title: "Sô-cô-la thủ công", text: "Hộp sô-cô-la kèm thiệp viết tay luôn ghi điểm." },
      { title: "Trải nghiệm đôi", text: "Workshop gốm, lớp nấu ăn hay buổi picnic cho hai người." },
    ],
    faq: [
      { q: "Valentine có phải ngày nghỉ lễ không?", a: "Không, 14/2 là ngày lễ tình yêu phổ biến nhưng không phải ngày nghỉ quốc gia." },
      { q: "Tặng gì cho người mới quen?", a: "Một bông hoa và tấm thiệp chân thành là đủ — tránh quà quá đắt tiền gây áp lực." },
      { q: "Valentine trắng là gì?", a: "Ngày 14/3, khi theo truyền thống châu Á, nam giới đáp lễ quà nhận được ngày 14/2." },
    ],
  },
  {
    slug: "quoc-te-phu-nu",
    motif: "rose",
    name: "Quốc tế Phụ nữ 8/3",
    dateMark: "08·03",
    displayDate: "8 tháng 3",
    rule: { type: "solar", month: 3, day: 8 },
    categories: ["phu-nu", "quoc-te"],
    theme: { from: "#be185d", to: "#db2777", accent: "#f9a8d4" },
    tagline: "Tôn vinh phái đẹp trên toàn thế giới.",
    history: [
      "Ngày 8/3 bắt nguồn từ phong trào đấu tranh của công nhân dệt nữ ở New York đầu thế kỷ 20 và được Liên Hợp Quốc tổ chức kỷ niệm lần đầu năm 1975.",
      "Ở Việt Nam, ngày này còn gắn với khởi nghĩa Hai Bà Trưng — biểu tượng anh dũng của phụ nữ Việt từ thời Bắc thuộc.",
    ],
    meaning: "Ngày để tôn vinh công lao, sự hy sinh và quyền bình đẳng của phụ nữ trong gia đình lẫn xã hội.",
    traditions: [
      { title: "Tặng hoa và quà", text: "Hoa, thiệp và những lời chúc gửi đến mẹ, vợ, chị em, đồng nghiệp." },
      { title: "Bữa cơm sum họp", text: "Gia đình cùng nấu ăn để phụ nữ được nghỉ ngơi." },
      { title: "Hoạt động tôn vinh", text: "Cơ quan, trường học tổ chức gặp mặt, tuyên dương nữ cán bộ, học sinh." },
    ],
    wishes: [
      "Chúc mẹ/chị/em ngày 8/3 rạng rỡ, hạnh phúc và luôn xinh đẹp!",
      "Cảm ơn em vì tất cả những hy sinh thầm lặng. Chúc em 8/3 thật vui.",
      "Chúc phụ nữ Việt Nam mãi khỏe, đẹp, tự tin và thành công.",
      "8/3 anh chúc em: cười nhiều hơn, khó ít đi, và luôn được yêu thương.",
      "Chúc những người phụ nữ tuyệt vời quanh anh một ngày 8/3 rực rỡ.",

    ],
    gifts: [
      { title: "Hoa tươi", text: "Hồng, ly hay cẩm chướng — món quà không bao giờ lỗi thời." },
      { title: "Mỹ phẩm, spa", text: "Lựa chọn thiết thực cho những người phụ nữ bận rộn." },
      { title: "Một ngày được nghỉ", text: "Nhận hết việc nhà — món quà chân thành nhất." },
    ],
    faq: [
      { q: "Ngày 8/3 có được nghỉ không?", a: "Không, đây là ngày kỷ niệm quốc tế chứ không phải ngày nghỉ lễ theo luật." },
      { q: "8/3 và 20/10 khác nhau thế nào?", a: "8/3 là Ngày Quốc tế Phụ nữ toàn cầu; 20/10 là Ngày Phụ nữ Việt Nam, kỷ niệm thành lập Hội LHPN Việt Nam." },
      { q: "Nên tặng hoa gì ngày 8/3?", a: "Hoa hồng và cẩm chướng phổ biến nhất; quan trọng hơn là lời chúc chân thành kèm theo." },
    ],
  },
  {
    slug: "gio-to-hung-vuong",
    motif: "temple",
    name: "Giỗ Tổ Hùng Vương",
    dateMark: "10·03",
    displayDate: "10/3 Âm lịch",
    rule: { type: "lunar", month: 3, day: 10 },
    categories: ["quoc-gia", "truyen-thong"],
    theme: { from: "#854d0e", to: "#166534", accent: "#fbbf24" },
    tagline: "Dù ai đi ngược về xuôi, nhớ ngày Giỗ Tổ mùng mười tháng ba.",
    history: [
      "Giỗ Tổ Hùng Vương tưởng nhớ các vua Hùng — những người có công dựng nước Văn Lang, nhà nước đầu tiên của dân tộc Việt Nam.",
      "Từ năm 2007, ngày 10/3 âm lịch trở thành ngày nghỉ lễ quốc gia; lễ hội chính diễn ra tại Đền Hùng, Phú Thọ với nghi thức rước kiệu và dâng hương long trọng.",
    ],
    meaning: "Uống nước nhớ nguồn — ngày để mỗi người Việt hướng về cội nguồn dân tộc.",
    traditions: [
      { title: "Dâng hương Đền Hùng", text: "Hàng triệu người về Phú Thọ thắp hương tưởng nhớ các vua Hùng." },
      { title: "Rước kiệu, hát xoan", text: "Lễ rước kiệu từ chân núi Nghĩa Lĩnh lên Đền Thượng." },
      { title: "Bánh chưng, bánh giầy dâng cúng", text: "Hai loại bánh tượng trưng trời đất trong mâm cúng tổ tiên." },
    ],
    wishes: [
      "Nhân ngày Giỗ Tổ, nguyện tổ tiên phù hộ cho gia đình mình bình an.",
      "Uống nước nhớ nguồn — chúc mọi người một ngày Giỗ Tổ ý nghĩa.",
      "Mùng mười tháng ba, cùng hướng về cội nguồn dân tộc.",
      "Nhớ về cội nguồn Hùng Vương, giữ gìn máu hồng xưa trong tim.",
      "Giỗ Tổ năm nay, nguyện non sông mãi trường tồn, con cháu mãi đoàn kết.",

    ],
    gifts: [
      { title: "Chuyến về nguồn", text: "Cùng gia đình thăm Đền Hùng hoặc nơi quê hương." },
      { title: "Bánh chưng, bánh giầy", text: "Mâm cúng truyền thống cho ngày Giỗ Tổ tại nhà." },
      { title: "Sách lịch sử", text: "Sách về thời đại Hùng Vương cho thế hệ trẻ." },
    ],
    faq: [
      { q: "Giỗ Tổ là ngày nào dương lịch?", a: "Ngày 10/3 âm lịch, thường rơi vào tháng 4 dương. Trang này tự tính ngày dương chính xác từng năm." },
      { q: "Giỗ Tổ được nghỉ mấy ngày?", a: "1 ngày theo luật lao động; nếu trùng cuối tuần được nghỉ bù." },
      { q: "Lễ hội Đền Hùng ở đâu?", a: "Tại Khu di tích lịch sử Đền Hùng, Việt Trì, Phú Thọ." },
    ],
  },
  {
    slug: "giai-phong-mien-nam",
    motif: "star",
    name: "Ngày Giải phóng miền Nam 30/4",
    dateMark: "30·04",
    displayDate: "30 tháng 4",
    rule: { type: "solar", month: 4, day: 30 },
    categories: ["quoc-gia"],
    theme: { from: "#b91c1c", to: "#b45309", accent: "#fde047" },
    tagline: "Ngày đất nước thống nhất.",
    history: [
      "Ngày 30/4/1975, chiến dịch Hồ Chí Minh kết thúc thắng lợi — miền Nam hoàn toàn giải phóng, đất nước thống nhất sau hơn 20 năm chia cắt.",
      "Đây là một trong những ngày lễ lớn nhất của Việt Nam, thường được kỷ niệm bằng lễ diễu binh, pháo hoa và các hoạt động về nguồn.",
    ],
    meaning: "Ngày của độc lập, thống nhất và lòng biết ơn với những thế hệ đã hy sinh cho đất nước.",
    traditions: [
      { title: "Treo cờ Tổ quốc", text: "Nhà cửa, đường phố rực sắc đỏ sao vàng." },
      { title: "Kỷ niệm và diễu binh", text: "Các dịp tròn năm tổ chức diễu binh, diễu hành cấp quốc gia." },
      { title: "Về nguồn", text: "Tham quan địa chỉ đỏ, tưởng nhớ anh hùng liệt sĩ." },
    ],
    wishes: [
      "Tự hào ngày 30/4 — chúc đất nước mãi hòa bình, thịnh vượng.",
      "Kính nhớ những người đã ngã xuống cho độc lập hôm nay.",
      "Chúc đất nước ta mãi đoàn kết, vững bước tương lai.",
      "Ba mươi tháng tư — ngày non sông thu về một mối. Mãi tự hào.",
      "Hòa bình hôm nay là lời hứa với ngày mai. Chúc mừng ngày thống nhất.",

    ],
    gifts: [
      { title: "Cờ Tổ quốc", text: "Lá cờ nhỏ treo ban công ngày lễ lớn." },
      { title: "Chuyến tham quan", text: "Dinh Độc Lập, địa đạo Củ Chi cho chuyến về nguồn." },
      { title: "Sách, phim lịch sử", text: "Tư liệu về chiến dịch Hồ Chí Minh cho gia đình." },
    ],
    faq: [
      { q: "30/4 được nghỉ mấy ngày?", a: "1 ngày, thường nối với lễ 1/5 thành đợt nghỉ dài 4–5 ngày." },
      { q: "Có bắn pháo hoa ngày 30/4 không?", a: "Thường có ở Hà Nội và TP.HCM, nhất là vào các năm kỷ niệm tròn." },
      { q: "Tên gọi đầy đủ của ngày này?", a: "Ngày Giải phóng miền Nam, thống nhất đất nước." },
    ],
  },
  {
    slug: "quoc-te-lao-dong",
    motif: "wheat",
    name: "Quốc tế Lao động 1/5",
    dateMark: "01·05",
    displayDate: "1 tháng 5",
    rule: { type: "solar", month: 5, day: 1 },
    categories: ["quoc-gia", "quoc-te"],
    theme: { from: "#9a3412", to: "#0369a1", accent: "#fb923c" },
    tagline: "Tôn vinh người lao động toàn cầu.",
    history: [
      "Ngày 1/5 khởi nguồn từ phong trào đòi ngày làm 8 giờ của công nhân Chicago năm 1886, trở thành ngày quốc tế đoàn kết của giai cấp công nhân.",
      "Ở Việt Nam, đây là ngày nghỉ lễ quốc gia — thường nối liền ngày 30/4 thành kỳ nghỉ dài đầu hè.",
    ],
    meaning: "Ngày ghi nhận giá trị của lao động và quyền lợi chính đáng của người làm việc.",
    traditions: [
      { title: "Kỳ nghỉ lễ 30/4–1/5", text: "Nhiều gia đình chọn du lịch, về quê trong dịp nghỉ dài." },
      { title: "Vinh danh lao động tiêu biểu", text: "Doanh nghiệp, công đoàn tuyên dương người lao động xuất sắc." },
    ],
    wishes: [
      "Chúc người lao động một ngày 1/5 thật nghỉ ngơi, thật vui.",
      "Cảm ơn những đôi tay đã xây nên mọi giá trị. 1/5 ý nghĩa!",
      "Chúc bạn công việc thuận lợi và luôn được đền đáp xứng đáng.",
      "Lao động là vinh quang — chúc bạn được tôn vinh đúng nghĩa hôm nay.",
      "Chúc mọi đôi tay cần mẫn đều gặt hái được quả ngọt.",

    ],
    gifts: [
      { title: "Chuyến nghỉ dưỡng", text: "Tận dụng kỳ nghỉ dài đầu tháng 5." },
      { title: "Quà chăm sóc sức khỏe", text: "Gối massage, thẻ khám sức khỏe cho người lao động." },
      { title: "Lời cảm ơn", text: "Đôi khi một lời ghi nhận đúng lúc là quà quý nhất." },
    ],
    faq: [
      { q: "Ngày 1/5 có phải ngày nghỉ quốc gia?", a: "Có, người lao động được nghỉ 1 ngày và thường nối với 30/4 thành đợt nghỉ dài." },
      { q: "Ngày 1/5 bắt nguồn từ đâu?", a: "Từ phong trào đòi 8 giờ làm việc của công nhân ở Chicago, Mỹ năm 1886." },
      { q: "Nên đi đâu chơi dịp 30/4–1/5?", a: "Các điểm biển và cao nguyên thường đông; đặt vé sớm hoặc chọn điểm ít người biết." },
    ],
  },
  {
    slug: "ngay-cua-me",
    motif: "carnation",
    name: "Ngày của Mẹ",
    dateMark: "CN·II",
    displayDate: "Chủ nhật thứ 2 tháng 5",
    rule: { type: "nth-weekday", month: 5, weekday: 0, nth: 2 },
    categories: ["phu-nu", "quoc-te"],
    theme: { from: "#be123c", to: "#db2777", accent: "#fda4af" },
    tagline: "Một ngày trong năm dành riêng cho mẹ.",
    history: [
      "Ngày của Mẹ hiện đại do Anna Jarvis khởi xướng ở Mỹ năm 1908 và trở thành ngày lễ chính thức năm 1914 — Chủ nhật thứ hai của tháng 5.",
      "Tại Việt Nam, ngày này ngày càng phổ biến như một dịp để con cái bày tỏ lòng hiếu thảo bên cạnh lễ Vu Lan truyền thống.",
    ],
    meaning: "Dịp để nói lời yêu thương với mẹ — người luôn đứng sau mọi bước đi của ta.",
    traditions: [
      { title: "Hoa cẩm chướng cho mẹ", text: "Bông cẩm chướng là biểu tượng kinh điển của ngày này." },
      { title: "Bữa cơm do con nấu", text: "Vào bếp thay mẹ một ngày — món quà giản dị nhất." },
      { title: "Gọi điện về nhà", text: "Với những người xa quê, một cuộc gọi dài là món quà." },
    ],
    wishes: [
      "Mẹ là cả bầu trời che chở. Chúc mẹ ngày của Mẹ thật hạnh phúc!",
      "Con chúc mẹ luôn khỏe mạnh, bình an và sống lâu bên con cháu.",
      "Cảm ơn mẹ vì đã cho con cả thế giới mà chẳng hề đòi lại gì.",
      "Ngày của Mẹ, con chỉ mong mẹ luôn cười thật tươi như hôm nay.",
      "Mẹ ơi, con lớn lên rồi mà vẫn thấy mình nhỏ trong vòng tay mẹ.",

    ],
    gifts: [
      { title: "Hoa cẩm chướng", text: "Đỏ cho tình yêu, trắng cho sự hiếu kính." },
      { title: "Khăn lụa, áo dài", text: "Quà tặng truyền thống mẹ nào cũng thích." },
      { title: "Ngày nghỉ ngơi trọn vẹn", text: "Con lo hết việc nhà để mẹ thật sự được nghỉ." },
    ],
    faq: [
      { q: "Ngày của Mẹ là ngày nào?", a: "Chủ nhật thứ hai của tháng 5 hằng năm — ngày cụ thể đổi mỗi năm và được tính tự động trên trang này." },
      { q: "Ngày của Mẹ có phải ngày lễ Việt Nam không?", a: "Đây là ngày lễ du nhập từ phương Tây nhưng rất phổ biến ở Việt Nam; bên cạnh đó còn có lễ Vu Lan báo hiếu." },
      { q: "Tặng quà gì cho mẹ?", a: "Thời gian bên mẹ quý hơn quà — một bữa cơm con tự nấu là lựa chọn chắc chắn đúng." },
    ],
  },
  {
    slug: "quoc-te-thieu-nhi",
    motif: "balloon",
    name: "Quốc tế Thiếu nhi 1/6",
    dateMark: "01·06",
    displayDate: "1 tháng 6",
    rule: { type: "solar", month: 6, day: 1 },
    categories: ["quoc-te"],
    theme: { from: "#0369a1", to: "#b45309", accent: "#fde047" },
    tagline: "Ngày của trẻ thơ.",
    history: [
      "Ngày Quốc tế Thiếu nhi được thiết lập năm 1949 để bảo vệ quyền trẻ em; Việt Nam tổ chức kỷ niệm từ rất sớm, từ thời Bác Hồ gửi thư chúc Tết thiếu nhi.",
      "Mỗi năm ngày 1/6, trường học và các tổ chức tổ chức vui chơi, văn nghệ và trao quà cho thiếu nhi khắp cả nước.",
    ],
    meaning: "Ngày nhắc nhở xã hội bảo vệ, yêu thương và đầu tư cho thế hệ tương lai.",
    traditions: [
      { title: "Vui chơi tại trường", text: "Văn nghệ, trò chơi dân gian và khuôn viên tràng bóng bay." },
      { title: "Quà cho bé", text: "Đồ chơi, sách truyện, quần áo mới cho các con." },
      { title: "Hoạt động thiện nguyện", text: "Tặng quà cho trẻ em khó khăn, trẻ mồ côi." },
    ],
    wishes: [
      "Chúc các con 1/6 thật vui, ngoan ngoãn và học giỏi!",
      "Chúc bé yêu luôn khỏe mạnh, cười thật nhiều mỗi ngày.",
      "Tuổi thơ chỉ có một — chúc con một ngày Thiếu nhi đáng nhớ.",
      "Chúc các bạn nhỏ luôn được yêu thương, được là chính mình.",
      "1/6 vui nhé — cả thế giới hôm nay là của các con.",

    ],
    gifts: [
      { title: "Sách tranh, truyện thiếu nhi", text: "Quà vừa vui vừa nuôi thói quen đọc." },
      { title: "Đồ chơi sáng tạo", text: "Lego, đồ thủ công, dụng cụ vẽ cho trẻ." },
      { title: "Một ngày đi chơi", text: "Công viên, sở thú hay rạp chiếu phim cùng cả nhà." },
    ],
    faq: [
      { q: "Ngày 1/6 là của ai?", a: "Của thiếu nhi — thường trẻ em dưới 15 tuổi được vui chơi và nhận quà." },
      { q: "1/6 có phải ngày nghỉ không?", a: "Không, nhưng nhiều trường cho học sinh vui chơi cả ngày." },
      { q: "Tết Thiếu nhi còn gọi là gì?", a: "Nhiều gia đình gọi đây là \"Tết của thiếu nhi\" vì các con được quà và đi chơi." },
    ],
  },
  {
    slug: "ngay-gia-dinh-viet-nam",
    motif: "home",
    name: "Ngày Gia đình Việt Nam",
    dateMark: "28·06",
    displayDate: "28 tháng 6",
    rule: { type: "solar", month: 6, day: 28 },
    categories: ["quoc-gia"],
    theme: { from: "#065f46", to: "#c2410c", accent: "#fdba74" },
    tagline: "Tổ ấm của mỗi người Việt.",
    history: [
      "Ngày Gia đình Việt Nam được thiết lập năm 2001 nhằm tôn vinh vị trí của gia đình trong đời sống xã hội và gìn giữ những giá trị văn hóa gia đình truyền thống.",
      "Mỗi năm ngày này có nhiều hoạt động tuyên truyền, vinh danh gia đình văn hóa tiêu biểu trên cả nước.",
    ],
    meaning: "Nhắc mỗi người trân trọng tổ ấm của mình — nơi bắt đầu và quay về của mọi hành trình.",
    traditions: [
      { title: "Bữa cơm sum họp", text: "Cả nhà cùng ăn tối, trò chuyện thay vì mỗi người một màn hình." },
      { title: "Ảnh gia đình", text: "Chụp một bộ ảnh chung làm kỷ niệm mỗi năm." },
      { title: "Câu chuyện thế hệ", text: "Ông bà kể cho con cháu nghe về dòng họ, quê hương." },
    ],
    wishes: [
      "Chúc gia đình mình luôn sum vầy, yêu thương và bình an.",
      "Nhà là nơi để về — chúc tổ ấm của bạn luôn ấm áp.",
      "Ngày Gia đình, mong mọi nhà đều đầy tiếng cười.",
      "Chúc tổ ấm nhà bạn luôn có người chờ, có bữa cơm nóng.",
      "Gia đình là điểm tựa — chúc nhà mình mãi yên ấm.",

    ],
    gifts: [
      { title: "Album ảnh gia đình", text: "In những khoảnh khắc chung thành kỷ niệm chạm được." },
      { title: "Bữa tối sum họp", text: "Đặt bàn hoặc tự nấu một mâm cơm đông đủ." },
      { title: "Chuyến đi chung", text: "Một chuyến picnic gần cho cả nhà cuối tuần." },
    ],
    faq: [
      { q: "Ngày Gia đình Việt Nam từ khi nào?", a: "Từ năm 2001, theo quyết định của Thủ tướng Chính phủ." },
      { q: "Ngày 28/6 có được nghỉ không?", a: "Không, đây là ngày kỷ niệm xã hội chứ không phải ngày nghỉ lễ." },
      { q: "Nên làm gì ngày Gia đình?", a: "Đơn giản nhất: cùng ăn một bữa cơm và nói chuyện với nhau thật nhiều." },
    ],
  },
  {
    slug: "thuong-binh-liet-si",
    motif: "candle",
    name: "Ngày Thương binh Liệt sĩ",
    dateMark: "27·07",
    displayDate: "27 tháng 7",
    rule: { type: "solar", month: 7, day: 27 },
    categories: ["quoc-gia"],
    theme: { from: "#881337", to: "#292524", accent: "#fca5a5" },
    tagline: "Đền ơn đáp nghĩa.",
    history: [
      "Ngày 27/7 được chọn từ năm 1947 để tưởng nhớ những người hy sinh, bị thương vì độc lập dân tộc — khởi nguồn từ \"Ngày Thương binh toàn quốc\".",
      "Đây là dịp cả nước thực hiện chính sách \"uống nước nhớ nguồn\", thăm hỏi gia đình liệt sĩ, thương binh và người có công.",
    ],
    meaning: "Ngày tri ân những người đã đổi máu xương cho hòa bình hôm nay.",
    traditions: [
      { title: "Viếng nghĩa trang liệt sĩ", text: "Thắp hương, đặt hoa tại các nghĩa trang và đài tưởng niệm." },
      { title: "Thăm gia đình chính sách", text: "Thăm hỏi, tặng quà thương binh, mẹ Việt Nam anh hùng." },
      { title: "Đèn tri ân", text: "Thắp nến tri ân các anh hùng liệt sĩ tối 26/7." },
    ],
    wishes: [
      "Mãi ghi nhớ công ơn các anh hùng liệt sĩ của dân tộc.",
      "Hôm nay có hòa bình vì ngày ấy có người đã không trở về.",
      "Đền ơn đáp nghĩa — kính cẩn tri ân những người có công.",
      "Xin cúi đầu trước những hy sinh để hôm nay có tên là hòa bình.",
      "Tri ân chưa bao giờ là đủ — kính nhớ các anh hùng dân tộc.",

    ],
    gifts: [
      { title: "Quà thăm hỏi", text: "Gạo, sữa, thuốc bổ cho gia đình thương binh lân cận." },
      { title: "Hoa viếng", text: "Vòng hoa, bó hoa đặt tại đài tưởng niệm địa phương." },
      { title: "Đóng góp quỹ đền ơn", text: "Chung tay xây nhà tình nghĩa cho người có công." },
    ],
    faq: [
      { q: "Ngày 27/7 có phải ngày nghỉ không?", a: "Không phải ngày nghỉ lễ nhưng là ngày tri ân quan trọng của quốc gia." },
      { q: "Tại sao lại là ngày 27/7?", a: "Gắn với việc Chính phủ chọn 27/7/1947 làm Ngày Thương binh toàn quốc đầu tiên." },
      { q: "Nên làm gì ngày 27/7?", a: "Viếng nghĩa trang liệt sĩ gần nhất hoặc thắp một ngọn nến tri ân." },
    ],
  },
  {
    slug: "vu-lan",
    motif: "lotus",
    name: "Lễ Vu Lan",
    dateMark: "15·07",
    displayDate: "15/7 Âm lịch",
    rule: { type: "lunar", month: 7, day: 15 },
    categories: ["truyen-thong", "phu-nu"],
    theme: { from: "#4c1d95", to: "#b45309", accent: "#fcd34d" },
    tagline: "Mùa báo hiếu.",
    history: [
      "Lễ Vu Lan bắt nguồn từ câu chuyện tôn giả Mục Kiền Liên cứu mẹ, trở thành mùa báo hiếu lớn nhất của Phật giáo và đạo lý Việt Nam.",
      "Ngày rằm tháng 7 âm lịch, người Việt cài hoa hồng lên áo — đỏ nếu còn mẹ, trắng nếu mẹ đã mất — và đi chùa cầu nguyện cho cha mẹ.",
    ],
    meaning: "Mùa để nhớ về công ơn cha mẹ và báo hiếu những người sinh thành.",
    traditions: [
      { title: "Cài hoa hồng lên áo", text: "Hoa đỏ khi còn mẹ, hoa trắng khi mẹ đã khuất — lễ nghi xúc động nhất." },
      { title: "Đi chùa lễ Vu Lan", text: "Nghe kinh báo hiếu, cầu nguyện cho cha mẹ hai bên." },
      { title: "Cúng rằm tháng 7", text: "Mâm cúng gia tiên, xá tội vong nhân, phóng sinh." },
    ],
    wishes: [
      "Mùa Vu Lan, cầu chúc cha mẹ mình luôn khỏe mạnh, bình an.",
      "Còn mẹ còn cha là còn cả thế giới — trân trọng từng ngày bên họ.",
      "Nguyện công ơn sinh thành được báo đáp bằng hiếu tâm mỗi ngày.",
      "Vu Lan về, cầu nguyện cho những người đã sinh thành ta.",
      "Mùa báo hiếu, mong cha mẹ con luôn được bình an vô sự.",

    ],
    gifts: [
      { title: "Hoa cài áo Vu Lan", text: "Bông hồng đỏ nhỏ cài lên ngực áo ngày lễ." },
      { title: "Quà báo hiếu", text: "Thuốc bổ, sữa, hay đơn giản là một cuộc về thăm." },
      { title: "Sữa chua, chè chay", text: "Món ngọt nhẹ cho mâm cỗ chay ngày rằm." },
    ],
    faq: [
      { q: "Lễ Vu Lan là ngày nào?", a: "Rằm tháng 7 âm lịch (15/7 âm), thường rơi vào tháng 8–9 dương; trang này tính ngày dương theo từng năm." },
      { q: "Cài hoa hồng có ý nghĩa gì?", a: "Hoa đỏ dành cho người còn mẹ, hoa trắng cho người mẹ đã mất — biểu tượng hiếu nghĩa." },
      { q: "Vu Lan và rằm tháng 7 có phải một?", a: "Cùng ngày 15/7 âm; Vu Lan thiên về báo hiếu cha mẹ còn rằm tháng 7 gắn với xá tội vong nhân." },
    ],
  },
  {
    slug: "quoc-khanh",
    motif: "flag",
    name: "Quốc khánh 2/9",
    dateMark: "02·09",
    displayDate: "2 tháng 9",
    rule: { type: "solar", month: 9, day: 2 },
    categories: ["quoc-gia"],
    theme: { from: "#b91c1c", to: "#b45309", accent: "#fde047" },
    tagline: "Ngày nước Việt Nam ra đời.",
    history: [
      "Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hòa.",
      "Quốc khánh là ngày lễ lớn nhất của đất nước — dịp tưởng nhớ công ơn dựng nước và tự hào về độc lập, tự do.",
    ],
    meaning: "Ngày của niềm tự hào dân tộc và khát vọng hòa bình, phát triển.",
    traditions: [
      { title: "Diễu binh 2/9", text: "Các năm tròn tổ chức diễu binh, diễu hành tại Ba Đình." },
      { title: "Pháo hoa", text: "Hà Nội, TP.HCM và nhiều tỉnh thành bắn pháo hoa đêm 2/9." },
      { title: "Phố phường treo cờ", text: "Cả nước rực đỏ cờ sao vàng trong dịp Quốc khánh." },
    ],
    wishes: [
      "Tự hào là người Việt Nam! Chúc mừng Quốc khánh 2/9.",
      "Chúc đất nước mãi độc lập, tự do, hạnh phúc.",
      "Mừng ngày Tổ quốc khởi sinh — đoàn kết vững bước tương lai.",
      "Từ Ba Đình năm ấy đến hôm nay — tự hào Việt Nam.",
      "Chúc non sông gấm vóc mãi hùng vĩ, đời đời hưng thịnh.",

    ],
    gifts: [
      { title: "Cờ và phụ kiện 2/9", text: "Cờ nhỏ, áo cờ đỏ sao vàng cho ngày diễu hành." },
      { title: "Chuyến về nguồn", text: "Thăm Khu di tích Hoàng Thành, Lăng Bác, quê Bác ở Nghệ An." },
      { title: "Sách về Bác Hồ", text: "Tư liệu lịch sử ý nghĩa cho thế hệ trẻ." },
    ],
    faq: [
      { q: "Quốc khánh được nghỉ mấy ngày?", a: "2 ngày theo luật hiện hành (ngày 2/9 và 1 ngày liền kề trước hoặc sau)." },
      { q: "Xem pháo hoa 2/9 ở đâu?", a: "Hồ Hoàn Kiếm (Hà Nội), sông Sài Gòn (TP.HCM) và nhiều điểm bắn tại các tỉnh thành." },
      { q: "Quốc khánh kỷ niệm sự kiện gì?", a: "Ngày Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa — 2/9/1945." },
    ],
  },
  {
    slug: "trung-thu",
    motif: "moonstar",
    name: "Tết Trung thu",
    dateMark: "15·08",
    displayDate: "15/8 Âm lịch",
    rule: { type: "lunar", month: 8, day: 15 },
    categories: ["truyen-thong"],
    theme: { from: "#7c2d12", to: "#7c3aed", accent: "#fdba74" },
    tagline: "Tết đoàn viên dưới ánh trăng.",
    history: [
      "Tết Trung thu là rằm tháng 8 âm lịch — lễ hội mùa thu gắn với tích chú Cuội, chị Hằng và phong tục ngắm trăng phá cỗ.",
      "Ở Việt Nam, Trung thu còn được gọi là \"Tết của thiếu nhi\" — trẻ em rước đèn, múa lân và phá cỗ bánh trung thu.",
    ],
    meaning: "Đêm trăng tròn của sự sum họp — người lớn nhớ quê, trẻ nhỏ mong đèn ông sao.",
    traditions: [
      { title: "Phá cỗ ngắm trăng", text: "Mâm cỗ bánh trung thu, bưởi, hồng đặt dưới sân trăng." },
      { title: "Rước đèn ông sao", text: "Trẻ em rước đèn lồng, đèn ông sao đi khắp phố." },
      { title: "Múa lân", text: "Tiếng trống lân rộn rã trong những đêm rằm tháng 8." },
    ],
    wishes: [
      "Trung thu vui vẻ! Chúc gia đình bạn đoàn viên dưới trăng rằm.",
      "Chúc các bé một mùa trăng rực rỡ đèn ông sao.",
      "Trăng tròn người quây quần — chúc bạn một Trung thu ấm áp.",
      "Chúc mùa trăng này mang về cho bạn đủ đầy như ánh trăng rằm.",
      "Trung thu đến — chúc nhà nhà sum vầy, trẻ trẻ vui cười.",

    ],
    gifts: [
      { title: "Bánh trung thu", text: "Bánh nướng, bánh dẻo nhân sen, trà xanh là kinh điển." },
      { title: "Đèn lồng cho bé", text: "Đèn ông sao, đèn cá chép thủ công." },
      { title: "Trà sen", text: "Cặp trà-bánh cho buổi ngắm trăng đoàn viên." },
    ],
    faq: [
      { q: "Trung thu là ngày nào dương lịch?", a: "Rằm 15/8 âm lịch, thường rơi vào tháng 9–10 dương; trang này tự tính theo năm." },
      { q: "Trung thu có phải ngày nghỉ không?", a: "Không, nhưng trẻ em thường được vui chơi, rước đèn vào đêm rằm." },
      { q: "Bánh trung thu có mấy loại?", a: "Hai loại chính: bánh nướng (vỏ giòn) và bánh dẻo (vỏ bột nếp mềm)." },
    ],
  },
  {
    slug: "phu-nu-viet-nam",
    motif: "ribbon",
    name: "Ngày Phụ nữ Việt Nam 20/10",
    dateMark: "20·10",
    displayDate: "20 tháng 10",
    rule: { type: "solar", month: 10, day: 20 },
    categories: ["phu-nu", "quoc-gia"],
    theme: { from: "#be123c", to: "#a21caf", accent: "#f9a8d4" },
    tagline: "Tôn vinh phụ nữ Việt Nam.",
    history: [
      "Ngày 20/10/1930, Hội Phụ nữ phản đế Việt Nam — tiền thân của Hội Liên hiệp Phụ nữ Việt Nam — chính thức thành lập.",
      "Từ đó, ngày 20/10 trở thành Ngày Phụ nữ Việt Nam và ngày truyền thống của Hội LHPN, dịp cả nước tôn vinh phụ nữ trong gia đình và xã hội.",
    ],
    meaning: "Ngày riêng của phụ nữ Việt — tri ân sự hy sinh, bản lĩnh và vẻ đẹp của một nửa thế giới.",
    traditions: [
      { title: "Tặng hoa, tặng quà", text: "Đồng nghiệp, người thân gửi hoa và lời chúc đến phụ nữ quanh mình." },
      { title: "Vinh danh phụ nữ tiêu biểu", text: "Các cấp hội phụ nữ tổ chức gặp mặt, tuyên dương." },
      { title: "Nam giới vào bếp", text: "Tục \"đàn ông nấu ăn\" ngày 20/10 ngày càng phổ biến." },
    ],
    wishes: [
      "Chúc mẹ/em/chị 20/10 luôn xinh đẹp, hạnh phúc và được yêu thương!",
      "20/10 — chúc phụ nữ Việt Nam mãi rạng rỡ và thành công.",
      "Cảm ơn những người phụ nữ tuyệt vời trong đời em/anh.",
      "Chúc em một ngày 20/10 chỉ toàn hoa, quà và tiếng cười.",
      "20/10 — chúc chị/em mãi là bông hoa đẹp nhất vườn Việt.",

    ],
    gifts: [
      { title: "Hoa tươi", text: "Bó hoa kèm thiệp viết tay luôn là lựa chọn đầu tiên." },
      { title: "Áo dài", text: "Tà áo dài — biểu tượng vẻ đẹp phụ nữ Việt." },
      { title: "Đồ chăm sóc", text: "Spa, mỹ phẩm, hay một buổi hẹn ăn tối." },
    ],
    faq: [
      { q: "Ngày 20/10 kỷ niệm điều gì?", a: "Ngày thành lập Hội LHPN Việt Nam (20/10/1930) và là Ngày Phụ nữ Việt Nam." },
      { q: "20/10 có được nghỉ không?", a: "Không, đây là ngày kỷ niệm chứ không phải ngày nghỉ lễ." },
      { q: "Nên chúc 8/3 hay 20/10?", a: "Cả hai đều phù hợp — 8/3 mang tính quốc tế, 20/10 là ngày riêng của phụ nữ Việt Nam." },
    ],
  },
  {
    slug: "nha-giao-viet-nam",
    motif: "book",
    name: "Ngày Nhà giáo Việt Nam",
    dateMark: "20·11",
    displayDate: "20 tháng 11",
    rule: { type: "solar", month: 11, day: 20 },
    categories: ["quoc-gia"],
    theme: { from: "#065f46", to: "#4d7c0f", accent: "#bef264" },
    tagline: "Tôn sư trọng đạo.",
    history: [
      "Ngày 20/11 được chọn làm Ngày Nhà giáo Việt Nam từ năm 1982, nhằm tôn vinh những người làm nghề trồng người.",
      "Mỗi năm ngày này, học sinh cả nước tổ chức văn nghệ, thăm hỏi và tặng hoa tri ân thầy cô — trở thành một nét đẹp văn hóa hiếu học.",
    ],
    meaning: "Nhất tự vi sư, bán tự vi sư — ngày để nhớ ơn những người đã dìu dắt ta.",
    traditions: [
      { title: "Học sinh tặng hoa", text: "Hoa và thiệp tay gửi thầy cô trong tiết chào cờ đặc biệt." },
      { title: "Cựu học sinh về thăm", text: "Thế hệ đi trước quay lại trường xưa thăm thầy cô già." },
      { title: "Lời nhắn tri ân", text: "Những tin nhắn cảm ơn gửi đến thầy cô cũ khắp nơi." },
    ],
    wishes: [
      "Kính chúc thầy cô 20/11 khỏe mạnh, hạnh phúc và mãi tận tâm.",
      "Cảm ơn thầy cô vì đã thắp lửa tri thức trong em.",
      "Nhân ngày Nhà giáo, em kính chúc cô luôn trẻ và vui như ngày nào.",
      "Ơn dạy dỗ nặng bằng sông dài — kính chúc thầy cô mạnh khỏe.",
      "Chúc những người trồng người được hái quả ngọt cả đời.",

    ],
    gifts: [
      { title: "Hoa và thiệp tri ân", text: "Đơn giản, chân thành và đúng truyền thống." },
      { title: "Sách, cây bút", text: "Quà tặng phù hợp với nghề trồng người." },
      { title: "Chuyến thăm bất ngờ", text: "Ghé thăm thầy cô cũ — món quà ai cũng trân trọng." },
    ],
    faq: [
      { q: "Ngày Nhà giáo VN là ngày nào?", a: "Ngày 20/11 hằng năm, chính thức từ năm 1982." },
      { q: "20/11 có phải ngày nghỉ học?", a: "Không nghỉ học, nhưng nhiều trường cho văn nghệ, tri ân thay vì học bình thường." },
      { q: "Tặng gì cho thầy cô ngày 20/11?", a: "Hoa và lời chúc chân thành là đủ; quà vật chất không bắt buộc." },
    ],
  },
  {
    slug: "quan-doi-nhan-dan",
    motif: "medal",
    name: "Ngày Quân đội Nhân dân VN",
    dateMark: "22·12",
    displayDate: "22 tháng 12",
    rule: { type: "solar", month: 12, day: 22 },
    categories: ["quoc-gia"],
    theme: { from: "#14532d", to: "#a16207", accent: "#fde047" },
    tagline: "Ngày truyền thống quân đội anh hùng.",
    history: [
      "Ngày 22/12/1944, Đội Việt Nam Tuyên truyền Giải phóng quân — tiền thân của Quân đội nhân dân Việt Nam — được thành lập tại Cao Bằng.",
      "Đây là ngày truyền thống của Quân đội nhân dân Việt Nam và cũng là Ngày hội Quốc phòng toàn dân.",
    ],
    meaning: "Tri ân những người lính đã và đang giữ gìn độc lập, chủ quyền của Tổ quốc.",
    traditions: [
      { title: "Gặp mặt truyền thống", text: "Các đơn vị, cựu chiến binh tổ chức gặp mặt ngày thành lập." },
      { title: "Vinh danh cán bộ chiến sĩ", text: "Khen thưởng gương quân nhân tiêu biểu." },
      { title: "Hoạt động biên giới", text: "Thăm đồn biên phòng, trại lính ở vùng sâu vùng xa." },
    ],
    wishes: [
      "Chúc mừng ngày truyền thống Quân đội nhân dân Việt Nam 22/12!",
      "Tri ân những người lính canh giữ giấc ngủ bình yên của đất nước.",
      "Kính chúc các chiến sĩ mãi vững vàng giữa trời yên biển lặng.",
      "Cảm ơn những người đã đổi thanh xuân lấy bình yên Tổ quốc.",
      "22/12 — kính chúc quân đội anh hùng mãi kiên cường sắt son.",

    ],
    gifts: [
      { title: "Hoa và thư tri ân", text: "Gửi lời cảm ơn đến người thân đang trong quân ngũ." },
      { title: "Quà cho chiến sĩ xa nhà", text: "Thực phẩm, thư tay gửi đến bộ đội vùng biên, hải đảo." },
      { title: "Sách lịch sử quân sự", text: "Tư liệu về các chiến dịch anh hùng của dân tộc." },
    ],
    faq: [
      { q: "22/12 kỷ niệm sự kiện gì?", a: "Ngày thành lập Quân đội nhân dân Việt Nam (22/12/1944) và Ngày hội Quốc phòng toàn dân." },
      { q: "Ngày 22/12 có được nghỉ không?", a: "Không phải ngày nghỉ lễ quốc gia." },
      { q: "Tiền thân của quân đội VN là gì?", a: "Đội Việt Nam Tuyên truyền Giải phóng quân, thành lập tại rừng Trần Hưng Đạo, Cao Bằng." },
    ],
  },
  {
    slug: "giang-sinh",
    motif: "pine",
    name: "Giáng sinh",
    dateMark: "25·12",
    displayDate: "24–25 tháng 12",
    rule: { type: "solar", month: 12, day: 25 },
    categories: ["quoc-te", "truyen-thong"],
    theme: { from: "#14532d", to: "#b91c1c", accent: "#fca5a5" },
    tagline: "Mùa an lành và ấm áp nhất năm.",
    history: [
      "Giáng sinh kỷ niệm ngày sinh của Chúa Giêsu, từ lâu đã trở thành lễ hội mùa đông phổ biến toàn cầu vượt ra ngoài tôn giáo.",
      "Tại Việt Nam, Giáng sinh là mùa rực rỡ nhất trong năm — nhà thờ sáng đèn, phố phường trang trí và người trẻ tụ họp chơi Noel.",
    ],
    meaning: "Mùa của sự cho đi, an lành và những điều ấm áp bên người thân.",
    traditions: [
      { title: "Đi nhà thờ đêm 24/12", text: "Lễ vọng Giáng sinh và ngắm hang đá tại các nhà thờ lớn." },
      { title: "Trao quà Noel", text: "Ông già Noel tặng quà cho trẻ em đêm trước Giáng sinh." },
      { title: "Trang trí cây thông", text: "Cây thông Noel, đèn nhấp nháy và vòng nguyệt quế." },
    ],
    wishes: [
      "Merry Christmas! Chúc bạn một Giáng sinh an lành, ấm áp.",
      "Chúc mùa lễ hội mang đến cho bạn thật nhiều niềm vui.",
      "Giáng sinh bình an — mong mọi điều tốt đẹp đến với gia đình bạn.",
      "Noel an lành — chúc bạn được ôm ấp bởi những người thương mình.",
      "Chúc mùa lễ hội của bạn đủ ấm để đi qua mùa đông.",

    ],
    gifts: [
      { title: "Quà Noel cho bé", text: "Đồ chơi gói giấy óng để dưới gốc cây thông." },
      { title: "Khăn, găng tay len", text: "Quà ấm áp đúng mùa se lạnh cuối năm." },
      { title: "Bánh quy, sô-cô-la", text: "Hộp quà ngọt cho bạn bè, đồng nghiệp." },
    ],
    faq: [
      { q: "Giáng sinh ở Việt Nam là ngày nào?", a: "Đêm 24/12 (Noel) và ngày 25/12 dương lịch." },
      { q: "Giáng sinh có phải ngày nghỉ lễ không?", a: "Không phải ngày nghỉ quốc gia, nhưng nhiều công ty cho nghỉ hoặc tổ chức tiệc cuối năm." },
      { q: "Đi chơi Noel ở đâu?", a: "Khu phố nhà thờ lớn Hà Nội, quận 1 TP.HCM hay các nhà thờ địa phương." },
    ],
  },
];

/** Holidays sorted by occurrence within a calendar year (approximate for lunar). */
export function getHoliday(slug: string): Holiday | undefined {
  return holidays.find((h) => h.slug === slug);
}
