import type { DateRule } from "../lib/dates.js";
import type { HolidayCategory } from "./categories";

export type { HolidayCategory } from "./categories";
export { CATEGORY_LABELS } from "./categories";

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

export interface DeepItem {
  title: string;
  text: string;
}

/**
 * "Đọc trọn ngày lễ" — phần nội dung mở rộng giúp độc giả hiểu trọn vẹn
 * một ngày lễ: nguồn gốc, phong tục chi tiết, ẩm thực và sự thật thú vị.
 */
export interface HolidayDeep {
  /** Nguồn gốc lịch sử, tổng 120–200 từ, chia 1–3 đoạn. */
  ongNguon: string[];
  /** 5–8 phong tục / nghi lễ chi tiết, mỗi mục có tiêu đề + 2–3 câu giải thích. */
  phongTuc: DeepItem[];
  /** Mảng rỗng khi ngày lễ không gắn ẩm thực; nếu có thì 3–5 món/vật phẩm đặc trưng. */
  amThuc: DeepItem[];
  /** 4–6 sự thật thú vị đã kiểm chứng ("Bạn có biết?"). */
  facts: string[];
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
  deep: HolidayDeep;
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
    deep: {
      ongNguon: [
        "Lịch dương — lịch Gregorius — do Giáo hoàng Grêgôriô XIII ban hành năm 1582, hiệu chỉnh lịch Julius đã lệch tích lũy suốt hơn một thiên niên kỷ. Các nước lần lượt chuyển đổi trong những thế kỷ sau; Việt Nam tiếp nhận lịch dương thời Pháp thuộc và chính thức dùng làm lịch hành chính từ khi nước Việt Nam Dân chủ Cộng hòa ra đời năm 1945.",
        "Từ đó ngày 1 tháng 1 trở thành Tết Dương lịch — ngày nghỉ quốc gia đầu tiên trong năm. Dù Tết Nguyên Đán vẫn là lễ lớn nhất của người Việt, Tết Dương lịch tạo thành nhịp riêng: đêm đếm ngược 31/12, pháo hoa ở các thành phố, bữa tất niên và những mục tiêu mới. Đó là dấu mốc hành chính — hiện đại, đô thị — đặt cạnh chu kỳ âm lịch nghìn năm của đời sống quê.",
      ],
      phongTuc: [
        { title: "Đếm ngược về 0 giờ", text: "Đêm 31/12, người dân các thành phố lớn tụ tập tại quảng trường và phố đi bộ để đếm ngược. Đúng 0 giờ, màn pháo hoa rực sáng chào năm mới." },
        { title: "Ngắm pháo hoa", text: "Hà Nội, TP.HCM, Đà Nẵng và nhiều tỉnh thành bố trí điểm bắn tầm cao. Các gia đình thường ra hồ, ra sông hoặc lên tầng cao để ngắm pháo." },
        { title: "Tiệc tất niên", text: "Công ty, cơ quan và nhóm bạn tổ chức year-end party — bữa tiệc tổng kết một năm, thường kèm trao thưởng và rút thăm may mắn." },
        { title: "Trao lời chúc năm mới", text: "Sau giao thừa, mọi người gọi điện, nhắn tin chúc nhau một năm mới an khang. Đây là nét du nhập nhưng đã trở thành thói quen phổ biến." },
        { title: "Viết mục tiêu năm mới", text: "Tục 'quyết tâm đầu năm' (new year resolution): viết ra điều muốn thay đổi — tập thể dục, đọc sách, tiết kiệm — rồi đeo đuổi nó trong những tuần đầu năm." },
        { title: "Nghỉ lễ và du xuân sớm", text: "Nhiều gia đình tận dụng ngày nghỉ để đi chơi ngắn ngày, coi như 'khởi động' cho loạt Tết Âm lịch ngay sau đó." },
      ],
      amThuc: [],
      facts: [
        "Lịch Gregorius cắt mất 10 ngày khi ra đời: ở Ý, ngay sau ngày 4/10/1582 là ngày 15/10/1582.",
        "Nga chỉ chuyển sang lịch Gregorius năm 1918 — vì vậy 'Cách mạng tháng Mười' theo lịch cũ lại rơi vào tháng 11 dương lịch.",
        "Nghi lễ thả quả cầu pha lê ở Times Square, New York bắt đầu từ năm 1907 và vẫn diễn ra mỗi đêm giao thừa.",
        "Người Tây Ban Nha ăn 12 quả nho đúng lúc 12 tiếng chuông đầu năm điểm — mỗi quả cầu may cho một tháng.",
        "Tết Dương lịch là ngày lễ có pháo hoa đầu tiên trong năm ở Việt Nam, trước loạt pháo 30/4 và 2/9.",
      ],
    },
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
    deep: {
      ongNguon: [
        "Tết Nguyên Đán — 'ngày đầu tiên của năm' — mọc rễ từ nền văn minh lúa nước, khi nông dân trông vào chu kỳ trăng và tiết khí để canh mùa vụ. Qua hơn một nghìn năm Bắc thuộc, các nghi lễ Tết Á Đông hòa trộn với phong tục bản địa, sinh ra một cái Tết vừa đậm nét Đông Á vừa rất riêng của người Việt.",
        "Theo truyền thuyết, từ đời Hùng Vương thứ sáu đã có cuộc thi dâng lễ vật, nơi hoàng tử Lang Liêu sáng tạo bánh chưng bánh giầy tượng trưng đất trời. Đến nay, Tết vẫn là quả tim văn hóa của dân tộc: giao thừa, xông đất, mừng tuổi, cúng tổ tiên — một hệ nghi lễ khép kín quanh chữ 'sum họp'.",
      ],
      phongTuc: [
        { title: "Gói bánh chưng, nấu bánh", text: "Từ 27–28 tháng Chạp, cả nhà rửa lá dong, vo nếp, gói bánh rồi thức trắng đêm trông nồi bánh. Đó là nghi lễ truyền đời thiêng liêng nhất của gia đình Việt." },
        { title: "Cúng giao thừa (trừ tịch)", text: "Đúng 0 giờ đêm 30, gia chủ dâng hương mời tổ tiên về ăn Tết cùng con cháu. Nhiều nhà cúng thêm một mâm ngoài sân cho Thiên địa." },
        { title: "Xông đất (xông nhà)", text: "Người đầu tiên bước vào nhà sau giao thừa được tin là mang lại vận may cho cả năm. Gia chủ thường chọn trước người hợp tuổi, đức độ để 'xông'." },
        { title: "Mừng tuổi, lì xì", text: "Trẻ em chúc thọ ông bà cha mẹ; người lớn trao bao đỏ đựng tiền mới. Lì xì là mừng thêm một tuổi và cầu may cho tuổi mới." },
        { title: "Chúc Tết theo thứ tự", text: "'Mùng 1 Tết cha, mùng 2 Tết mẹ, mùng 3 Tết thầy': ba ngày đầu năm đi chúc Tết theo vòng họ hàng, làng xóm và thầy cô." },
        { title: "Hái lộc, xin chữ, đi lễ", text: "Mùng 1 người ta hái cành lộc về nhà cầu may, xin chữ đầu năm ở văn miếu và vào chùa cầu an." },
        { title: "Hội xuân sau Tết", text: "Từ mùng 4–5 trở đi là lễ hội đền, hát quan họ, đấu vật, chọi trâu. Dân gian bảo 'tháng Giêng là tháng ăn chơi'." },
      ],
      amThuc: [
        { title: "Bánh chưng (Bắc), bánh tét (Nam)", text: "Vuông hay tròn dài, nếp đậu thịt gói trong lá — chiếc bánh của đất trời, đặt giữa dĩa bàn thờ ngày Tết." },
        { title: "Thịt kho trứng, củ kiệu (Nam)", text: "Nồi thịt kho trứng nước dừa ăn dần qua ba ngày Tết, đi kèm dưa kiệu chua giòn chống ngán." },
        { title: "Thịt đông, dưa hành (Bắc)", text: "Miếng thịt đông trong vắt và củ hành muối chua — vị thanh mát 'xát' cho bữa Tết nhiều đạm." },
        { title: "Mứt, hạt dưa, kẹo dừa", text: "Khay mứt bày khách: mứt gừng, mứt dừa, hạt dưa đỏ — vị ngọt mở đầu cho lời chúc." },
        { title: "Canh măng, giò chả, nem rán", text: "Canh măng móng giò nhà nào cũng nấu; giò lụa, chả quế và nem rán là mâm đãi khách quen thuộc." },
      ],
      facts: [
        "Theo truyền thuyết, hoàng tử Lang Liêu đời Hùng Vương thứ sáu dâng vua cha bánh chưng vuông tượng đất và bánh giầy tròn tượng trời — và được truyền ngôi nhờ món quà ý nghĩa nhất.",
        "Cùng một mùng 1 Tết nhưng ba miền ăn khác nhau: Bắc có bánh chưng, thịt đông, dưa hành; Trung có bánh tét, nem, tré; Nam có thịt kho trứng với củ kiệu.",
        "Hoa Tết cũng chia miền: đào phai hồng nhạt cho đất lạnh miền Bắc, mai vàng rực rỡ cho nắng ấm miền Nam, còn miền Trung chơi cả quất và mai.",
        "Tết Nguyên Đán Việt Nam cùng gốc âm lịch với Xuân tiết Trung Quốc, Seollal Hàn Quốc và Tsagaan Sar Mông Cổ — nhưng phong tục mỗi nước một vẻ.",
        "'Lì xì' bắt nguồn từ chữ Hán 'lợi thị' nghĩa là may mắn; bao đỏ tượng trưng sự tốt lành và che giấu số tiền để lòng chúc mới là chính.",
        "Nghỉ Tết Âm lịch là kỳ nghỉ dài nhất năm: luật quy định 5 ngày lễ nhưng cộng nghỉ bù và chuyển ca, thực tế thường kéo dài 7–9 ngày.",
      ],
    },
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
    deep: {
      ongNguon: [
        "'Nguyên' là đầu, 'Tiêu' là đêm — Nguyên Tiêu là đêm trăng rằm đầu tiên của năm âm lịch. Tục lễ bắt gốc từ Thượng Nguyên tiết của Trung Hoa thời Hán, khi đêm nay đèn lồng thắp sáng thành quách và người dân ùa ra phố xem hoa đăng.",
        "Du nhập vào Việt Nam, ngày rằm tháng Giêng đổi trọng tâm: ít hội đèn hơn nhưng đậm nét lễ Phật — 'lễ Phật quanh năm không bằng rằm tháng Giêng'. Gia đình đi chùa cầu an, dâng mâm cúng tổ tiên và ăn chè trôi nước tròn trịa; riêng Hội An và Chợ Lớn vẫn giữ trọn không khí hội đèn xưa.",
      ],
      phongTuc: [
        { title: "Đi chùa rằm tháng Giêng", text: "Chùa đông nghẹt từ sáng sớm; người dân thắp hương, lễ Phật cầu một năm bình an. Nhiều nhà chọn ăn chay cả ngày rằm." },
        { title: "Cúng gia tiên", text: "Mâm cúng rằm tháng Giêng có xôi, chè, hoa quả — dâng lên ông bà như một lời 'khép' cho loạt lễ đầu xuân." },
        { title: "Ăn chè trôi nước", text: "Viên chè tròn nhân đậu xanh trong nước cốt dừa gừng cay. 'Trôi nước' là nổi lên mặt nước — tượng sự viên mãn đầu năm." },
        { title: "Ngắm hoa đăng", text: "Hội An thả đèn hoa đăng trên sông Hoài, Chợ Lớn rực phố lồng đèn — nét còn lại của hội đèn Nguyên Tiêu xưa." },
        { title: "Cúng sao giải hạn", text: "Nhiều gia đình làm lễ cúng sao hạn đầu năm ngay trong ngày rằm Giêng, cầu hóa giải vận xấu cho cả năm." },
      ],
      amThuc: [
        { title: "Chè trôi nước", text: "Món bắt buộc ngày rằm Giêng: vỏ nếp dai, nhân đậu xanh hoặc viên đường, nước gừng ấm nồng chan cốt dừa." },
        { title: "Cỗ chay ngày rằm", text: "Đậu hũ kho, nấm xào, canh rau củ — nhiều nhà giữ ngày chay rằm Giêng để mở một năm thanh tịnh." },
        { title: "Xôi, chè cúng rằm", text: "Đĩa xôi và chén chè đặt lên bàn thờ — lễ vật quen thuộc của mọi ngày rằm ở Việt Nam." },
      ],
      facts: [
        "Tên 'Nguyên Tiêu' nghĩa là 'đêm đầu' — đêm trăng rằm đầu tiên của năm, khi trăng tròn và sáng nhất chu kỳ.",
        "Ở Trung Hoa xưa, Nguyên Tiêu là đêm hiếm hoi con gái được ra phố xem đèn — vì thế nó được coi như 'Valentine Trung Hoa'.",
        "Tên của lễ và tên món ăn là một: 'nguyên tiêu' cũng là tên viên chè tròn (tangyuan/đoàn viên) ăn ngày này.",
        "Chè trôi nước chia miền: miền Nam làm viên lớn nhân đậu xanh mặn-ngọt với nước cốt dừa, miền Bắc làm viên nhỏ nhân đường trong nước gừng.",
        "Dân gian bảo 'hết rằm tháng Giêng là hết Tết' — sau đêm rằm này, không khí Tết chính thức khép lại.",
      ],
    },
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
    deep: {
      ongNguon: [
        "Ngày 14/2 gắn với thánh Valentino thế kỷ III ở Roma. Theo truyền thuyết, ông bí mật chủ hôn cho các đôi yêu nhau dù hoàng đế cấm lính trẻ kết hôn, và bị hành quyết ngày 14/2. Giáo hoàng Gelasius I đặt lễ kính thánh này năm 496 — nhưng phải đến thời Trung cổ ngày lễ mới gắn với tình yêu.",
        "Nhà thơ Chaucer viết năm 1382 về 'ngày thánh Valentine' khi chim muông chọn bạn đời — từ đó ngày này thành ngày tỏ tình của Âu châu. Thiệp Valentine công nghiệp ra đời thế kỷ XIX ở Anh và Mỹ. Du nhập Việt Nam từ cuối thế kỷ XX, 14/2 nay là ngày hoa hồng và sô-cô-la quen thuộc của các cặp đôi.",
      ],
      phongTuc: [
        { title: "Tặng hoa hồng", text: "Hồng đỏ cho tình yêu nồng cháy, hồng phấn cho sự ngọt ngào. Giá hoa ngày 14/2 thường tăng mạnh nhưng vẫn cháy hàng." },
        { title: "Sô-cô-la và thiệp viết tay", text: "Cặp quà kinh điển: hộp sô-cô-la kèm tấm thiệp viết tay. Nhiều bạn trẻ tự làm sô-cô-la tại nhà để tặng người thương." },
        { title: "Tỏ tình, cầu hôn", text: "Ngày 14/2 được nhiều người chọn để ngỏ lời yêu hoặc cầu hôn — hi vọng có một kỷ niệm dễ nhớ nhất năm." },
        { title: "Hẹn hò đặc biệt", text: "Nhà hàng kín bàn từ sớm; bữa tối nến, một bộ phim tình cảm hay chuyến đi ngắn dành riêng cho hai người." },
        { title: "Valentine của bạn bè", text: "Ở Việt Nam bạn thân cũng tặng quà nhau ngày này. Nhiều nước còn có 'Galentine' 13/2 — ngày mừng tình bạn của phái nữ." },
      ],
      amThuc: [
        { title: "Sô-cô-la", text: "Món quà - đồ ngọt đầu tiên người ta nghĩ đến: chocolate ngọt đắng như tình yêu, thường gói hộp hình trái tim." },
        { title: "Dâu tây phủ sô-cô-la", text: "Trái dâu đỏ nhúng sô-cô-la tan — món tráng miệng lãng mạn nhiều bạn trẻ tự tay làm cho buổi hẹn." },
        { title: "Bánh ngọt hình tim", text: "Bánh kem, cupcake sắc đỏ hồng hình trái tim — điểm nhấn cho bàn tiệc của các đôi lứa." },
      ],
      facts: [
        "Bản ghi đầu tiên gắn ngày 14/2 với tình yêu là bài thơ 'Parliament of Fowls' của Chaucer năm 1382 — trước đó ngày này chỉ là lễ kính thánh.",
        "Ở Nhật Bản và Hàn Quốc, phụ nữ tặng sô-cô-la cho nam giới ngày 14/2; nam giới đáp lễ đúng một tháng sau vào 'White Day' 14/3.",
        "Hàn Quốc còn có 'Black Day' 14/4: người độc thân hẹn nhau ăn mì tương đen jajangmyeon để 'ăn mừng' sự cô đơn.",
        "Theo truyền thuyết, thánh Valentino ký bức thư gửi con gái người cai ngục bằng dòng 'from your Valentine' — lời kết quen thuộc trên thiệp đến hôm nay.",
        "Thánh Valentino còn được coi là thánh bảo trợ của người nuôi ong — một chi tiết ít ai biết về vị thánh của tình nhân.",
      ],
    },
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
    deep: {
      ongNguon: [
        "Tháng 3/1908, hàng nghìn công nhân dệt nữ ở New York xuống đường đòi giảm giờ làm, tăng lương và quyền bầu cử. Năm 1910, nhà hoạt động Đức Clara Zetkin đề xướng Ngày Quốc tế Phụ nữ tại hội nghị Copenhagen; năm 1911 hơn một triệu người ở Áo, Đức, Thụy Sĩ, Đan Mạch cùng kỷ niệm lần đầu.",
        "Năm 1917, cuộc đình công 'bánh mì và hòa bình' của phụ nữ Nga khởi phát Cách mạng tháng Hai — rơi vào ngày 23/2 lịch Julius, tức 8/3 lịch Gregorius, và ngày này từ đó được cố định. Liên Hợp Quốc tổ chức kỷ niệm lần đầu năm 1975. Ở Việt Nam, ngày 8/3 còn được coi là ngày tưởng nhớ khởi nghĩa Hai Bà Trưng năm 40.",
      ],
      phongTuc: [
        { title: "Tặng hoa cho phụ nữ", text: "Hoa hồng, cẩm chướng, ly gửi đến mẹ, vợ, chị em, cô giáo, đồng nghiệp. Chợ hoa sáng sớm ngày 8/3 là cảnh tượng quen thuộc." },
        { title: "Nam giới đảm việc nhà", text: "Nhiều nhà để cánh đàn ông vào bếp, quét nhà, chăm con — món quà 'được nghỉ' thiết thực nhất cho phụ nữ." },
        { title: "Liên hoan văn nghệ", text: "Cơ quan, trường học tổ chức gặp mặt, thi nấu ăn, văn nghệ tôn vinh nữ cán bộ và nữ sinh." },
        { title: "Tuyên dương phụ nữ tiêu biểu", text: "Các cấp Hội phụ nữ trao giải, vinh danh nhà khoa học, doanh nhân, công nhân nữ xuất sắc trong năm." },
        { title: "Tưởng nhớ Hai Bà Trưng", text: "Ở Việt Nam 8/3 còn gắn với tưởng nhớ hai vị nữ anh hùng dân tộc — đền Hai Bà ở Mê Linh đông khách ngày này." },
        { title: "Quà tặng và lời chúc", text: "Từ lớp học đến công sở, nam đồng nghiệp và các cháu chuẩn bị thiệp, quà nhỏ, lời chúc cho phái nữ." },
      ],
      amThuc: [],
      facts: [
        "Phong trào 8/3 gắn với khẩu hiệu đi vào lịch sử 'bánh mì và hoa hồng': bánh mì để sống, hoa hồng để sống đẹp.",
        "Clara Zetkin — nhà hoạt động xã hội Đức — là người đề xướng Ngày Quốc tế Phụ nữ tại hội nghị Copenhagen năm 1910.",
        "Liên Hợp Quốc chỉ chính thức tổ chức kỷ niệm 8/3 từ năm 1975 — 'Năm Quốc tế Phụ nữ'.",
        "Ở Ý, người ta tặng nhau cành hoa mimosa vàng — biểu tượng của ngày 8/3 — và có cả 'bánh mimosa' mềm xốp phủ kem.",
        "Việt Nam tôn vinh phụ nữ hai lần mỗi năm: 8/3 mang ý nghĩa quốc tế, còn 20/10 là ngày truyền thống riêng của phụ nữ Việt.",
        "Theo truyền thống, khởi nghĩa Hai Bà Trưng năm 40 — cuộc khởi nghĩa đầu tiên do phụ nữ lãnh đạo trong lịch sử Việt Nam — được tưởng nhớ cùng ngày 8/3.",
      ],
    },
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
    deep: {
      ongNguon: [
        "Theo truyền thuyết và sử thi dân tộc, các vua Hùng dựng nước Văn Lang — nhà nước đầu tiên của người Việt — truyền đến 18 đời. Ngày 10 tháng 3 âm lịch được chọn làm ngày giỗ Tổ: 'Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng ba'.",
        "Trung tâm lễ là Khu di tích Đền Hùng trên núi Nghĩa Lĩnh, Việt Trì, Phú Thọ — nơi tương truyền các vua Hùng chọn đất đóng đô. Năm 2007 Quốc hội quyết định đưa 10/3 âm vào danh sách ngày nghỉ lễ quốc gia; năm 2012 UNESCO công nhận tín ngưỡng thờ cúng Hùng Vương là Di sản văn hóa phi vật thể đại diện của nhân loại.",
      ],
      phongTuc: [
        { title: "Lễ rước kiệu lên Đền Thượng", text: "Đoàn rước kiệu từ chân núi Nghĩa Lĩnh đưa lễ vật, hoa qua đền Hạ, đền Trung lên đền Thượng. Đây là nghi lễ long trọng nhất của lễ hội." },
        { title: "Dâng hương tổ tiên", text: "Lãnh đạo đất nước và hàng triệu người dân dâng hương trước Đại điện. Mâm cỗ chính luôn có bánh chưng và bánh giầy." },
        { title: "Hát Xoan đền Hùng", text: "Hát Xoan — di sản phi vật thể UNESCO — vang lên trong lễ hội: điệu hát cổ của đất Tổ gắn với tục thờ thần thành." },
        { title: "Lễ tại nhà và nơi xa", text: "Người Việt khắp nơi, kể cả kiều bào ở nước ngoài, thắp hương hướng về Đền Hùng đúng ngày 10/3 âm lịch." },
        { title: "Trò chơi dân gian", text: "Lễ hội có đua bơi, đấu vật, ném còn, kéo co — những nét sinh hoạt cộng đồng từ thời Hùng Vương." },
        { title: "Chuyến 'về nguồn'", text: "Trường học và đoàn thanh niên tổ chức chuyến đi về nguồn thăm Đền Hùng, học về thời đại dựng nước của dân tộc." },
      ],
      amThuc: [
        { title: "Bánh chưng", text: "Bánh vuông tượng đất — lễ vật thiêng nhất dâng lên các vua Hùng trong ngày giỗ Tổ." },
        { title: "Bánh giầy", text: "Bánh tròn ép từ nếp giã, tượng trưng bầu trời — cặp đôi bất ly với bánh chưng trong mâm cúng." },
        { title: "Xôi và gà cúng", text: "Xôi gấc đỏ, gà luộc vàng — mâm cỗ dâng tổ theo kiểu cỗ Tết truyền thống của người Việt." },
      ],
      facts: [
        "Tín ngưỡng thờ cúng Hùng Vương được UNESCO công nhận Di sản văn hóa phi vật thể đại diện của nhân loại năm 2012.",
        "Giỗ Tổ là ngày nghỉ lễ quốc gia duy nhất ngoài Tết Nguyên Đán được tính theo âm lịch.",
        "Theo truyền thuyết, núi Nghĩa Lĩnh là nơi các vua Hùng chọn đất đóng đô Văn Lang — 'đầu cột mây', điểm hẹn đất trời.",
        "Lễ hội Đền Hùng kéo dài cả tuần nhưng lễ chính là sáng 10/3 âm; người ta tin dâng hương đúng ngày sẽ được phù hộ cả năm.",
        "Cả nước có hơn một nghìn di tích thờ các vua Hùng — nhưng nhiều và thiêng nhất vẫn là quần thể Đền Hùng ở Phú Thọ.",
      ],
    },
    faq: [
      { q: "Giỗ Tổ là ngày nào dương lịch?", a: "Ngày 10/3 âm lịch, thường rơi vào tháng 4 dương. Trang này tự tính ngày dương chính xác từng năm." },
      { q: "Giỗ Tổ được nghỉ mấy ngày?", a: "1 ngày theo luật lao động; nếu trùng cuối tuần được nghỉ bù." },
      { q: "Lễ hội Đền Hùng ở đâu?", a: "Tại Khu di tích lịch sử Đền Hùng, Việt Trì, Phú Thọ." },
    ],
  },
  {
    slug: "tet-thanh-minh",
    motif: "lotus",
    name: "Tết Thanh minh",
    dateMark: "04·04–06",
    displayDate: "4–6 tháng 4 (đổi theo năm)",
    rule: { type: "qingming" },
    categories: ["truyen-thong"],
    theme: { from: "#3f6212", to: "#0f766e", accent: "#a3e635" },
    tagline: "Tiết trời trong sáng — mùa tảo mộ nhớ nguồn.",
    history: [
      "Tết Thanh minh rơi vào tiết Thanh minh — tiết khí thứ năm trong 24 tiết khí, khi tiết trời đầu xuân quay sang trong lành mát mẻ, thường vào ngày 4–6 tháng 4 dương lịch.",
      "Bắt nguồn từ tục tảo mộ thời xuân của Trung Hoa, Tết Thanh minh ở Việt Nam gắn với việc sửa sang mộ phần tổ tiên, dâng hương hoa trái — được Nguyễn Du khắc vào thơ qua câu 'Thanh minh trong tiết tháng ba'.",
    ],
    meaning: "Ngày của sự tưởng nhớ giữa tiết xuân trong sáng — khi con cháu quay về quét dọn mồ mả, thắp hương và nối lại sợi dây với tổ tiên.",
    traditions: [
      { title: "Tảo mộ", text: "Cả nhà dọn cỏ, vun đất, sửa lại mộ phần ông bà trong những tuần quanh Thanh minh." },
      { title: "Dâng hương hoa quả", text: "Nén hương, cành cúc và mâm lễ giản dị đặt trước mộ và ban thờ." },
      { title: "Sum họp, dạo xuân", text: "Chuyến tảo mộ thường thành buổi gặp gỡ đại gia đình giữa tiết trời trong lành." },
      { title: "Xôi, bánh dân gian", text: "Nhiều miền dâng xôi và bánh nếp trong ngày tảo mộ." },
    ],
    wishes: [
      "Nhân tiết Thanh minh, nguyện tổ tiên phù hộ gia đình bình an, khỏe mạnh.",
      "Nhớ nguồn — chúc gia đình bạn một mùa Thanh minh an nhiên, đoàn viên.",
      "Tiết trời trong sáng, mong tâm bạn cũng nhẹ nhàng và nhà cửa bình an.",
      "Chúc bạn một mùa Thanh minh dịu êm — kính nhớ quá khứ, quý trọng hiện tại.",
      "Nguyện ông bà phù hộ cho cả nhà bốn mùa vô sự.",
    ],
    gifts: [
      { title: "Hoa tươi tảo mộ", text: "Cúc, ly hoặc hồng tươi dâng trước mộ và ban thờ." },
      { title: "Nhang, nến", text: "Bộ lễ trang trọng cho buổi tảo mộ của gia đình." },
      { title: "Xôi, bánh nếp", text: "Lễ vật truyền thống nhiều miền chuẩn bị cho ngày tảo mộ." },
    ],
    deep: {
      ongNguon: [
        "Thanh minh nghĩa là 'trong sáng' — tiết khí thứ năm trong 24 tiết khí, khi mặt trời đi qua kinh độ 15° và tiết trời xuân của miền Bắc Á chuyển sang tươi mát, thường rơi vào 4–6 tháng 4. Lễ Thanh minh của Trung Hoa mọc từ tục thăm mộ thời xuân; Tết Thanh minh của Việt Nam thừa hưởng nó nhưng gấp nghĩa vào tục tảo mộ bản địa.",
        "Ở Việt Nam, 'đi tảo mộ' ít khi chỉ là nghi lễ một ngày: trong các tuần trước và sau Thanh minh, gia đình quay về mồ mả tổ tiên để dọn dẹp, sửa chữa, phủi son, rồi thắp hương và đặt hoa. Nguyễn Du đã làm mùa lễ này bất tử với câu 'Thanh minh trong tiết tháng ba' — câu thơ mọi học sinh Việt Nam đều thuộc.",
      ],
      phongTuc: [
        { title: "Dọn dẹp, sửa mộ", text: "Con cháu nhổ cỏ, vun đất, chỉnh và sơn lại bia — tảo mộ trước hết là hành động chăm sóc nơi an nghỉ của tổ tiên." },
        { title: "Thắp hương, đặt hoa, dâng lễ", text: "Sau khi mộ đã gọn gàng, cả nhà thắp hương, đặt hoa cúc và mâm hoa quả rượu nhạt rồi cùng cúi lạy tưởng nhớ." },
        { title: "Tảo mộ tại hỏa táng viên", text: "Ở đô thị, nơi tro cốt giữ tại các tháp cốt, gia đình vẫn đến viếng với hoa và hương — cùng một nghi lễ trong nơi yên nghỉ hiện đại." },
        { title: "Cúng tại nhà", text: "Người ở xa không về được vẫn dâng mâm lễ lên ban thờ gia tiên và hướng về quê — giữ sợi dây hiếu kính qua khoảng cách." },
        { title: "Sum họp đại gia đình", text: "Buổi tảo mộ thường kết thúc bằng bữa cơm chung tại mộ hoặc về nhà — cuộc gặp gỡ lặng lẽ của họ hàng." },
        { title: "Dạo xuân đầu năm", text: "Thanh minh cũng là thời tiết đẹp nhất để dạo chơi; những chuyến về quê cho lễ mang cả vẻ dịu dàng của mùa xuân." },
      ],
      amThuc: [
        { title: "Xôi", text: "Nhiều miền dâng xôi trong ngày tảo mộ — đĩa xôi đặt trước mộ và trên ban thờ nhà." },
        { title: "Bánh nếp dân gian", text: "Bánh khúc ở miền Bắc hay bánh ít, bánh phu thê nơi khác — loại bánh gói lá mang theo buổi tảo mộ." },
        { title: "Hoa quả, rượu nhạt", text: "Mâm trái cây theo mùa, hoa cúc và chén rượu — mâm lễ giản dị của ngày tảo mộ." },
      ],
      facts: [
        "Thanh minh không phải lễ âm lịch — nó theo tiết khí mặt trời, nên ngày dương dịch mỗi năm giữa 4 và 6 tháng 4.",
        "Câu thơ bất hủ 'Thanh minh trong tiết tháng ba' trong Truyện Kiều của Nguyễn Du đã khiến mùa lễ này thành một trong những hình ảnh được trích dẫn nhiều nhất của thơ Việt.",
        "Tảo mộ là một mùa chứ không riêng một ngày — gia đình có thể viếng mộ trước hoặc sau Thanh minh vài tuần, quan trọng là việc quay về.",
        "Trung Quốc, Đài Loan, Hồng Kông và kiều dân Hoa giữ Thanh minh là ngày nghỉ lễ; ở Việt Nam nó là phong tục dân gian, không phải ngày nghỉ chính thức.",
        "Làng An Bằng ở Huế — được mệnh danh 'thành phố mộ' với những lăng mộ lộng lẫy — mỗi độ Thanh minh rực lên một dòng sông hoa và khói hương.",
        "Cùng một tiết khí cũng là mùa tảo mộ khắp Đông Á: ngày Hansik của Hàn Quốc rơi gần đúng ngày này và cũng gắn với tục thăm mộ.",
      ],
    },
    faq: [
      { q: "Tết Thanh minh vào ngày nào?", a: "Vào tiết Thanh minh, thường 4–6 tháng 4 — ngày chính xác đổi theo năm; trang này tự tính từ bảng tiết khí." },
      { q: "Thanh minh có được nghỉ lễ không?", a: "Không — đây là phong tục truyền thống chứ không phải ngày nghỉ quốc gia." },
      { q: "Tảo mộ là làm gì?", a: "Quay về mồ mả tổ tiên dọn dẹp, sửa chữa, phủi son, rồi thắp hương và dâng hoa quả tưởng nhớ." },
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
    deep: {
      ongNguon: [
        "Ngày 30/4/1975 kết thúc thắng lợi chiến dịch Hồ Chí Minh: xe tăng Quân Giải phóng húc cổng Dinh Độc Lập, chính quyền Sài Gòn tuyên bố đầu hàng vô điều kiện. Sau hơn hai mươi năm chia cắt, đất nước thống nhất trên bản đồ và trong đời sống.",
        "Ngày 30/4 trở thành ngày lễ lớn — Ngày Giải phóng miền Nam, thống nhất đất nước, và là ngày nghỉ quốc gia. Ngày nghỉ này nối ngay 1/5 Quốc tế Lao động tạo thành đợt nghỉ dài đầu hè; các năm tròn kỷ niệm có diễu binh, diễu hành cấp quốc gia — gần nhất là kỷ niệm 50 năm ngày 30/4/2025 tại TP.HCM.",
      ],
      phongTuc: [
        { title: "Treo cờ Tổ quốc", text: "Nhà nhà treo cờ đỏ sao vàng trước cửa; đường phố lớn phủ kín cờ, pano và băng rôn kỷ niệm." },
        { title: "Lễ kỷ niệm cấp quốc gia", text: "Các năm tròn (40, 45, 50 năm) tổ chức mít tinh, diễu binh, diễu hành tại TP.HCM và Hà Nội." },
        { title: "Pháo hoa đêm 30/4", text: "Nhiều thành phố bắn pháo hoa mừng ngày thống nhất — đặc biệt rực rỡ vào các năm kỷ niệm lớn." },
        { title: "Về nguồn thăm địa chỉ đỏ", text: "Tham quan Dinh Độc Lập, địa đạo Củ Chi, các căn cứ cách mạng — cách dạy thế hệ trẻ về hành trình giải phóng." },
        { title: "Gặp mặt cựu chiến binh", text: "Các đơn vị, địa phương mời cựu chiến binh kể chuyện chiến tranh và gặp gỡ thế hệ trẻ." },
        { title: "Nghỉ lễ đầu hè", text: "Với người dân, đây còn là đợt nghỉ dài đầu hè — đi biển, về quê, nghỉ dưỡng trước khi hè thật sự bắt đầu." },
      ],
      amThuc: [],
      facts: [
        "Trưa 30/4/1975, xe tăng của Trung đoàn 203 — Quân Giải phóng húc cổng Dinh Độc Lập — hình ảnh đi vào lịch sử ngày thống nhất.",
        "Kỷ niệm 50 năm ngày 30/4/2025 có diễu binh, diễu hành với hàng chục nghìn người tham gia tại trung tâm TP.HCM.",
        "Tên gọi chính thức là 'Ngày Giải phóng miền Nam, thống nhất đất nước' — người dân thường gọi ngắn 'ngày 30/4'.",
        "Trưa 30/4/1975, Dương Văn Minh — tổng thống cuối cùng của chính quyền Sài Gòn — tuyên bố đầu hàng vô điều kiện trên đài phát thanh.",
        "Nghỉ 30/4 nối liền 1/5 thành 'tuần lễ vàng' đầu hè — nhiều nơi cho nghỉ cả tuần bằng phép năm.",
      ],
    },
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
    deep: {
      ongNguon: [
        "Ngày 1/5/1886, hàng trăm nghìn công nhân Mỹ đình công đòi ngày làm 8 tiếng — trung tâm là thành phố Chicago. Ba hôm sau, vụ nổ Quảng trường Haymarket và những người công nhân bị xử tử đã khiến ngày này trở thành biểu tượng đấu tranh của người lao động toàn thế giới.",
        "Năm 1889, Quốc tế thứ hai chọn 1/5 làm ngày đoàn kết của giai cấp công nhân — Quốc tế Lao động. Ngày nay hơn 80 quốc gia công nhận 1/5 là ngày nghỉ lễ. Ở Việt Nam, Quốc tế Lao động được tổ chức từ năm 1930 và là ngày nghỉ quốc gia — thường nối liền 30/4 thành kỳ nghỉ dài nhất đầu hè.",
      ],
      phongTuc: [
        { title: "Nghỉ lễ 30/4–1/5", text: "Hai ngày lễ liền nhau tạo 'tuần nghỉ vàng': về quê, du lịch biển, hoặc đơn giản là nghỉ ngơi sau nửa năm làm việc." },
        { title: "Vinh danh người lao động", text: "Công đoàn và doanh nghiệp trao giải lao động sáng tạo, khen thưởng công nhân giỏi, kỹ sư tiêu biểu quanh ngày lễ." },
        { title: "Gặp mặt công đoàn", text: "Các cấp công đoàn tổ chức họp mặt, tọa đàm về quyền lợi, tiền lương và điều kiện làm việc của người lao động." },
        { title: "Hoạt động thiện nguyện", text: "Nhiều đơn vị chọn dịp này đi thăm hỏi công nhân khó khăn, trao sổ bảo hiểm, suất bảo trợ cho người lao động." },
        { title: "Diễu hành quốc tế", text: "Ở nhiều nước, công đoàn xuống đường diễu hành đòi quyền lợi; ở Việt Nam, ngày này chủ yếu là nghỉ lễ và vinh danh." },
      ],
      amThuc: [],
      facts: [
        "Khẩu hiệu mục tiêu ban đầu của phong trào là '8 giờ làm việc, 8 giờ nghỉ ngơi, 8 giờ làm điều mình thích' — ngày làm 8 tiếng ta có hôm nay là từ đó.",
        "Mỹ và Canada kỷ niệm Labor Day vào thứ Hai đầu tháng 9 — không phải 1/5, dù chính Chicago của Mỹ là nơi bắt đầu câu chuyện.",
        "Ở Pháp, ngày 1/5 còn là lễ hoa linh lan thung lũng (muguet) — người ta tặng nhau nhành hoa chuông trắng cầu may mùa xuân.",
        "Hơn 80 quốc gia lấy 1/5 làm ngày lễ chính thức — một trong những ngày lễ được công nhận rộng nhất thế giới.",
        "Quốc tế Lao động được tổ chức lần đầu ở Việt Nam năm 1930 — từ đó trở thành truyền thống của công nhân cả nước.",
      ],
    },
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
    deep: {
      ongNguon: [
        "Ngày của Mẹ hiện đại do Anna Jarvis ở Mỹ khởi xướng: sau khi mẹ bà qua đời năm 1905, bà vận động để có một ngày con cái nhớ ơn mẹ. Buổi lễ tưởng niệm đầu tiên tổ chức năm 1908 tại Grafton, West Virginia; năm 1914 Tổng thống Wilson chính thức công nhận Chủ nhật thứ hai tháng 5 là ngày lễ quốc gia.",
        "Ngày lễ lan khắp thế giới cùng biểu tượng hoa cẩm chướng — trắng cho mẹ đã mất, hồng cho mẹ còn sống. Ở Việt Nam, Ngày của Mẹ không chính thức nhưng rất được yêu thích — đứng cạnh lễ Vu Lan truyền thống như hai cách nói 'cảm ơn mẹ': một từ đạo lý ngàn năm, một từ thế giới hiện đại.",
      ],
      phongTuc: [
        { title: "Tặng hoa cẩm chướng", text: "Bông cẩm chướng là 'bông hoa của mẹ' từ thời Anna Jarvis: đỏ, hồng cho mẹ hiện diện; trắng để tưởng nhớ mẹ đã khuất." },
        { title: "Con vào bếp", text: "Bữa sáng đưa tận giường hay mâm cơm do con tự nấu — 'hôm nay mẹ không động tay vào bếp' là thông điệp chung." },
        { title: "Viết thiệp, gọi điện", text: "Người con xa nhà gọi video, gửi thiệp về. Cuộc gọi về nhà vào ngày Chủ nhật này là thói quen phổ biến nhất." },
        { title: "Bữa tiệc gia đình", text: "Nhà hàng kín chỗ trưa Chủ nhật; nhiều gia đình đưa mẹ đi ăn, chụp ảnh chung làm kỷ niệm." },
        { title: "Quà sức khỏe, làm đẹp", text: "Spa, khăn lụa, mỹ phẩm, vitamin — những món quà 'để mẹ đẹp và khỏe' được chọn nhiều nhất ngày này." },
      ],
      amThuc: [],
      facts: [
        "Người sáng lập Anna Jarvis về sau vận động phản đối chính ngày lễ mình tạo ra — vì nó bị thương mại hóa quá mạnh; bà mất trong cảnh nghèo khó.",
        "Mỹ, Úc, Nhật, Ấn Độ cùng mừng Chủ nhật thứ hai tháng 5; Anh giữ 'Mothering Sunday' vào Chủ nhật thứ tư mùa Chay; Thái Lan chọn 12/8 — sinh nhật Nữ hoàng.",
        "Theo truyền thống ban đầu, cẩm chướng trắng dành tưởng nhớ người mẹ đã mất — nhưng về sau mọi màu đều được dùng để tặng mẹ đang sống.",
        "Ở Việt Nam, 'Ngày của Mẹ' mang tính truyền thống hơn cả là lễ Vu Lan rằm tháng 7 âm lịch — mùa báo hiếu của cả nước.",
        "Ngày của Mẹ được thống kê là một trong những ngày có lượng cuộc gọi điện thoại cao nhất năm ở Mỹ — con xa nhà đều gọi về.",
      ],
    },
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
    deep: {
      ongNguon: [
        "Tháng 11/1949, hội nghị Phụ nữ Dân chủ Quốc tế tại Moskva chọn ngày 1/6 là Ngày Quốc tế Bảo vệ Thiếu nhi — tưởng nhớ những đứa trẻ chết trong chiến tranh, đặc biệt vụ tàn sát làng Lidice năm 1942. Từ năm 1950, ngày 1/6 được tổ chức ở nhiều quốc gia.",
        "Ở Việt Nam, ngày 1/6 đến rất sớm: từ những năm 1950, Bác Hồ viết thư chúc Tết Thiếu nhi gửi các cháu cả nước. Ngày nay nó là 'Tết của trẻ em' — trường học vui chơi, bố mẹ tặng quà, và cả xã hội được nhắc rằng trẻ em là chủ nhân tương lai cần được bảo vệ, yêu thương.",
      ],
      phongTuc: [
        { title: "Vui chơi tại trường", text: "Lớp học biến thành hội trại: văn nghệ, trò dân gian, kéo co, bịt mắt bắt dê. Trường nào cũng có liên hoan ngày 1/6." },
        { title: "Tặng quà cho trẻ", text: "Đồ chơi, sách truyện, bộ quần áo mới. Nhiều nơi tặng quà cho trẻ mồ côi, trẻ khuyết tật và trẻ em hoàn cảnh khó khăn." },
        { title: "Đi chơi cùng gia đình", text: "Công viên, khu vui chơi, rạp chiếu phim đông kín — ngày mà trẻ em được 'được mọi thứ'." },
        { title: "Đọc thư Bác chúc Tết Thiếu nhi", text: "Truyền thống đọc lại những bức thư Bác Hồ gửi các cháu — với câu quen thuộc 'Ai yêu nhi đồng bằng Bác Hồ Chí Minh'." },
        { title: "Tháng hành động vì trẻ em", text: "Tháng 6 hằng năm là tháng hành động vì trẻ em: tuyên truyền phòng tai nạn, chống xâm hại và các lớp dạy bơi miễn phí." },
      ],
      amThuc: [],
      facts: [
        "Ngày 1/6 được chọn để tưởng nhớ các nạn nhân trẻ em của chiến tranh — đặc biệt vụ tàn sát làng Lidice của phát xít Đức năm 1942.",
        "Nhiều nước chọn ngày trẻ em riêng: Nhật Bản 'Kodomo no hi' 5/5, Thổ Nhĩ Kỳ 23/4, còn Liên Hợp Quốc có Ngày Quốc tế Thiếu nhi 20/11.",
        "Ngày 20/11/1989, Đại hội đồng Liên Hợp Quốc thông qua Công ước về Quyền Trẻ em — hiện gần như toàn bộ quốc gia thành viên phê chuẩn.",
        "Bác Hồ bắt đầu gửi thư chúc Tết Thiếu nhi từ rất sớm; những bức thư ngắn, giản dị, luôn dặn các cháu 'chăm học, chăm làm'.",
        "Ở Việt Nam, ngày 1/6 mở đầu 'Tháng hành động vì trẻ em' — một tháng cả nước tập trung chăm sóc và bảo vệ trẻ.",
      ],
    },
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
    deep: {
      ongNguon: [
        "Ngày 25/4/2001, Thủ tướng Chính phủ ký quyết định lấy 28/6 hằng năm là Ngày Gia đình Việt Nam — nhằm tôn vinh vị trí của gia đình và giữ gìn văn hóa 'cơm nhà' trong đời sống hiện đại. Đây là ngày kỷ niệm xã hội, không phải ngày nghỉ lễ.",
        "Gia đình Việt xưa nay là tế bào đầu tiên của xã hội: 'Anh em như thể tay chân', 'con có cha như nhà có nóc'. Khi nhịp sống đô thị khiến bữa cơm chung trở nên hiếm hơn bao giờ hết, ngày 28/6 là lời nhắc quay về tổ ấm — nơi mỗi người bắt đầu hành trình và cũng là nơi quay về.",
      ],
      phongTuc: [
        { title: "Bữa cơm chung tối nay", text: "Nghi lễ giản dị nhất: cả nhà ăn tối cùng nhau, để điện thoại sang một bên. 'Hôm nay về sớm ăn cơm' là thông điệp của ngày." },
        { title: "Vinh danh 'Gia đình văn hóa'", text: "Các địa phương trao danh hiệu gia đình văn hóa tiêu biểu, tuyên truyền nếp sống hòa thuận, hiếu học của gia đình Việt." },
        { title: "Kể chuyện dòng họ", text: "Ông bà kể con cháu nghe về tổ tiên, quê quán. Nhiều nhà lật album ảnh cũ, gia phả để nhớ mình từ đâu ra." },
        { title: "Chụp ảnh chung", text: "Chụp một bộ ảnh gia đình năm này qua năm nọ — kỷ niệm để so mình lớn lên, và để nhớ ai đã ở cạnh." },
        { title: "Gọi về nhà", text: "Người con xa quê gọi video về cho bố mẹ. Với nhiều gia đình, đó là cách 'về nhà' khả thi nhất trong ngày thường." },
      ],
      amThuc: [],
      facts: [
        "Quyết định 72/2001/QĐ-TTg của Thủ tướng Chính phủ chọn 28/6 là Ngày Gia đình Việt Nam — đến nay đã qua hơn hai thập kỷ.",
        "Liên Hợp Quốc có Ngày Quốc tế Gia đình ngày 15/5, thiết lập từ năm 1993 — khác với ngày riêng của Việt Nam.",
        "Mô hình 'tam đại đồng đường' — ba thế hệ chung một mái nhà — từng là kiểu gia đình phổ biến nhất của người Việt.",
        "Danh hiệu 'Gia đình văn hóa' được các địa phương bình chọn trao tặng hằng năm — một nét đánh giá nếp nhà độc đáo của Việt Nam.",
        "Ca dao tổng kết trọn giá trị gia đình Việt trong một câu: 'Một giọt máu đào hơn ao nước lã'.",
      ],
    },
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
    deep: {
      ongNguon: [
        "Giữa cuộc kháng chiến chống Pháp, ngày 27/7/1947 được Chính phủ chọn làm 'Ngày Thương binh toàn quốc' — lần đầu cả nước cùng tưởng nhớ những người đổ máu vì độc lập. Từ đó, 27/7 hằng năm trở thành Ngày Thương binh Liệt sĩ.",
        "Ngày lễ là biểu tượng của đạo lý 'uống nước nhớ nguồn': thăm hỏi thương binh, bà mẹ Việt Nam anh hùng, gia đình liệt sĩ; viếng nghĩa trang và thắp nến tri ân. Công tác tìm kiếm, quy tập hài cốt liệt sĩ và xác minh danh tính đến nay vẫn tiếp tục trong và ngoài nước — công việc chưa hồi kết của sự biết ơn.",
      ],
      phongTuc: [
        { title: "Thắp nến tri ân", text: "Tối 26–27/7, nhiều nơi thắp hàng nghìn ngọn nến tại nghĩa trang liệt sĩ. Biển ánh nến nhỏ là hình ảnh xúc động nhất của ngày lễ." },
        { title: "Viếng nghĩa trang, đài tưởng niệm", text: "Đoàn thể, học sinh và người dân đặt hoa, thắp hương tại nghĩa trang liệt sĩ và đài tưởng niệm ở địa phương." },
        { title: "Thăm gia đình chính sách", text: "Thăm hỏi thương binh, thân nhân liệt sĩ, bà mẹ Việt Nam anh hùng — tặng quà và hỏi han sức khỏe." },
        { title: "Lễ tưởng niệm cấp quốc gia", text: "Lãnh đạo Đảng, Nhà nước viếng Đài tưởng niệm các anh hùng liệt sĩ và Lăng Chủ tịch Hồ Chí Minh trong các dịp lớn." },
        { title: "Đền ơn đáp nghĩa", text: "Xây nhà tình nghĩa, nuôi dưỡng mẹ Việt Nam anh hùng, hỗ trợ thương bệnh binh — vừa là chính sách, vừa là hoạt động tình nguyện." },
        { title: "Tìm hài cốt liệt sĩ", text: "Các đội quy tập vẫn tìm kiếm hài cốt tại chiến trường xưa; xét nghiệm ADN đang trả tên cho từng liệt sĩ vô danh." },
      ],
      amThuc: [],
      facts: [
        "Ngày 27/7/1947 được chọn là 'Ngày Thương binh toàn quốc' — sau này đổi tên thành Ngày Thương binh Liệt sĩ như hôm nay.",
        "Lễ thắp nến tri ân thường diễn ra tối 26/7 — đêm trước ngày lễ chính, khi các nghĩa trang sáng rực ánh nến.",
        "'Bà mẹ Việt Nam anh hùng' là danh hiệu nhà nước trao cho người mẹ có con, chồng hoặc bản thân hy sinh vì Tổ quốc.",
        "Cả nước có hàng trăm nghĩa trang liệt sĩ — lớn và thiêng nhất là hai nghĩa trang quốc gia Đường 9 và Trường Sơn ở Quảng Trị.",
        "Công tác tìm kiếm, quy tập hài cốt liệt sĩ vẫn được duy trì cả trong lẫn ngoài nước — nhiều liệt sĩ 'chưa về' đến hôm nay.",
      ],
    },
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
    deep: {
      ongNguon: [
        "Vu Lan (Ullambana — 'cứu khổ người bị treo ngược') gắn với kinh Vu Lan bồn: tôn giả Mục Kiền Liên thấy mẹ mình đọa kiếp ngạ quỷ vì lòng keo kiệt; theo kinh, Phật dạy rằng chỉ nhờ thần lực chúng tăng ngày tự tứ — rằm tháng 7, cuối khóa an cư — mới cứu được.",
        "Từ Ấn Độ qua Trung Hoa rồi Việt Nam, Vu Lan hòa với tục cúng cô hồn rằm tháng 7 — 'xá tội vong nhân' — và trở thành mùa báo hiếu lớn nhất năm. Nét riêng của Vu Lan Việt là nghi lễ cài bông hồng lên áo, do thiền sư Thích Nhất Hạnh khởi xướng năm 1963: hoa đỏ khi còn mẹ, hoa trắng khi mẹ đã mất.",
      ],
      phongTuc: [
        { title: "Cài bông hồng lên áo", text: "Trong lễ Vu Lan tại chùa, người đến lễ được cài một bông hồng: đỏ cho người còn mẹ, trắng cho người đã mất mẹ — giây phút xúc động nhất của lễ." },
        { title: "Đi chùa lễ Vu Lan", text: "Rằm tháng 7, chùa khắp nước tổ chức đại lễ: tụng kinh Vu Lan, nghe pháp thoại về mẹ, sám hối và báo hiếu." },
        { title: "Cúng gia tiên", text: "Mâm cỗ dâng ông bà, cha mẹ hai bên — cầu người còn sống được bình an, người đã mất được siêu thoát." },
        { title: "Xá tội vong nhân", text: "Tục cúng cô hồn: cháo trắng, muối, hoa quả đặt ngoài sân cho vong linh lang thang — lòng từ bi gửi cả những linh hồn không nơi nương tựa." },
        { title: "Phóng sinh, bố thí", text: "Thả chim, thả cá, cho ăn người nghèo — tích đức rồi hồi hướng công đức cho cha mẹ hai bên." },
        { title: "Về thăm cha mẹ", text: "Vu Lan ngày nay cũng là 'Ngày của Mẹ Á Đông': con xa quê về thăm, ôm mẹ một cái — món quà báo hiếu giản dị nhất." },
      ],
      amThuc: [
        { title: "Mâm cỗ chay", text: "Nhiều nhà ăn chay rằm tháng 7: đậu hũ, nấm, rau củ, chè — thanh tịnh thân tâm để hồi hướng cha mẹ." },
        { title: "Cháo trắng, muối cúng cô hồn", text: "Cháo loãng, muối tiêu, gạo đường — lễ vật giản dị của mâm xá tội vong nhân đặt ngoài sân." },
        { title: "Hoa quả tươi dâng Phật", text: "Trái cây đầu mùa và hoa sen dâng lên tam bảo — 'trái cây ngoài vườn' thay cho lễ vật xa hoa." },
      ],
      facts: [
        "'Vu Lan' bắt nguồn từ tiếng Phạn Ullambana — nghĩa là 'cứu người bị treo ngược', hình ảnh khổ hình của kiếp ngạ quỷ.",
        "Tục cài bông hồng lên áo là sáng tạo của Phật giáo Việt Nam — do thiền sư Thích Nhất Hạnh khởi xướng năm 1963.",
        "Rằm tháng 7 trùng hai lễ trong một: Vu Lan báo hiếu của Phật giáo và 'xá tội vong nhân' của dân gian — ngày cúng cô hồn lớn nhất năm.",
        "Nhật Bản có lễ Obon tương tự — gia đình đón linh hồn tổ tiên về rồi thả đèn hoa đăng tiễn; Trung Hoa có Trung Nguyên tiết cùng ngày.",
        "Ngày tự tứ 15/7 âm là ngày chư tăng kết thúc ba tháng an cư mùa mưa — thời điểm 'công đức' của chúng tăng được coi là viên mãn nhất năm.",
      ],
    },
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
    deep: {
      ongNguon: [
        "Trưa 2/9/1945, trước hàng chục nghìn người tại quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập — khai sinh nước Việt Nam Dân chủ Cộng hòa, một trong những quốc gia đầu tiên ở Đông Nam Á tuyên bố độc lập sau Thế chiến II.",
        "Câu mở đầu Tuyên ngôn trích Tuyên ngôn Độc lập Hoa Kỳ 1776 và Tuyên ngôn Nhân quyền Pháp 1791 — lời khẳng định quyền tự do của mọi dân tộc trên thế giới. Từ năm 2021, Quốc khánh được nghỉ hai ngày theo Bộ luật Lao động — ngày lễ lớn nhất của đất nước, với diễu binh các năm tròn và pháo hoa khắp thành phố.",
      ],
      phongTuc: [
        { title: "Treo cờ khắp nơi", text: "Từ thành phố đến bản xa, nhà nhà treo cờ đỏ sao vàng trước cửa. 'Biển cờ' là hình ảnh đặc trưng của Quốc khánh Việt Nam." },
        { title: "Diễu binh Ba Đình", text: "Các năm tròn tổ chức diễu binh, diễu hành tại Ba Đình — lần gần nhất kỷ niệm 80 năm Quốc khánh ngày 2/9/2025." },
        { title: "Pháo hoa đêm Quốc khánh", text: "Hà Nội, TP.HCM và nhiều tỉnh thành bắn pháo hoa; người dân đổ ra trung tâm ngắm pháo, chụp ảnh bên cờ." },
        { title: "Viếng Lăng Bác", text: "Hàng vạn người vào Lăng viếng Chủ tịch Hồ Chí Minh — nghi lễ thiêng liêng của ngày nước ra đời." },
        { title: "Gặp mặt, tri ân", text: "Các địa phương tổ chức gặp mặt cán bộ lão thành cách mạng, gia đình có công; báo đài phát lại phim tư liệu Ba Đình." },
        { title: "Du lịch nghỉ lễ", text: "Hai ngày nghỉ cộng cuối tuần tạo đợt nghỉ dài cuối hè — gia đình tận dụng đi chơi trước khi vào năm học mới." },
      ],
      amThuc: [],
      facts: [
        "Câu đầu Tuyên ngôn Độc lập — 'Tất cả mọi người sinh ra đều được bình đẳng' — trích từ Tuyên ngôn Độc lập Hoa Kỳ năm 1776.",
        "Ngày 2/9/1945 cũng là ngày Nhật Bản ký văn kiện đầu hàng chính thức trên thiết giáp hạm Missouri — đánh dấu kết thúc Thế chiến II.",
        "Chủ tịch Hồ Chí Minh qua đời đúng ngày 2/9/1969 — trùng Quốc khánh; tin buồn được công bố chậm lại để không ảnh hưởng ngày lễ.",
        "Từ năm 2021, người lao động được nghỉ 2 ngày dịp Quốc khánh (ngày 2/9 và một ngày liền kề) — thay vì một ngày như trước đây.",
        "Quảng trường Ba Đình — nơi đọc Tuyên ngôn — sau này là nơi đặt Lăng Chủ tịch Hồ Chí Minh, khánh thành năm 1975.",
        "Bản Tuyên ngôn chỉ dài khoảng một trang giấy — đọc hết chưa đầy mười phút — nhưng thay đổi vận mệnh cả một dân tộc.",
      ],
    },
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
    deep: {
      ongNguon: [
        "Rằm tháng 8 âm lịch — chính giữa ba tháng mùa thu — là Tết Trung thu, tết trăng rằm của đoàn viên. Gốc nông nghiệp: sau vụ gặt, người ta thưởng trăng cảm tạ mùa màng. Gốc văn hóa: theo truyền thuyết, đêm nay nhìn lên trăng sẽ thấy chị Hằng Nga và chú Cuội ngồi gốc cây đa.",
        "Ở Việt Nam, Trung thu được gọi 'Tết của thiếu nhi': trẻ em rước đèn ông sao, múa lân, phá cỗ — còn người lớn nhâm nhi trà bánh ngắm trăng. Tết Trung thu có mặt khắp Á Đông, nhưng sắc thái 'tết trẻ con' náo nhiệt là nét rất riêng của Việt Nam.",
      ],
      phongTuc: [
        { title: "Phá cỗ ngắm trăng", text: "Mâm cỗ đặt dưới sân trăng: bánh trung thu, bưởi bày chóp, hồng, na. Cả nhà vừa ngắm trăng vừa 'phá' — chia — mâm cỗ." },
        { title: "Rước đèn ông sao", text: "Trẻ em rước đèn giấy, đèn ông sao đi từng đoàn trong đêm rằm — ánh nến, đèn pin và tiếng hát 'rước đèn tháng tám'." },
        { title: "Múa lân", text: "Tiếng trống lân giòn giã khắp phố; đoàn lân đến từng nhà múa chúc phúc, trẻ con ùa theo xem náo nhiệt." },
        { title: "Làm đèn lồng thủ công", text: "Trước Trung thu, nhiều nhà và trường học dạy làm đèn giấy, đèn ông sao — giữ nghề lồng đèn truyền thống." },
        { title: "Bày mâm cỗ trăng", text: "Bày bưởi thành chóp, trái cây thành hình con vật — mâm cỗ Trung thu là nghệ thuật bày biện của dân gian." },
        { title: "Uống trà ngắm trăng", text: "Người lớn ngồi trò chuyện bên ấm trà nóng và đĩa bánh dẻo — 'uống trà ngắm trăng' là nét thưởng thức mùa thu." },
      ],
      amThuc: [
        { title: "Bánh nướng", text: "Vỏ bánh màu cánh gián hồng óng, nhân thập cẩm, hạt sen, trứng muối — chiếc bánh 'đậm' của Trung thu." },
        { title: "Bánh dẻo", text: "Vỏ bột nếp trắng mềm, nhân sen hoặc đậu xanh — bánh 'thanh' ăn cùng trà nóng." },
        { title: "Trà ngắm trăng", text: "Không mâm cỗ nào thiếu ấm trà — trà sen, trà lài xát đi vị ngọt của bánh." },
        { title: "Mâm trái cây mùa thu", text: "Bưởi bày chóp, hồng, na, chuối — mâm trái cây dâng trăng rồi cả nhà cùng phá cỗ." },
        { title: "Bánh in, kẹo bò cốm", text: "Bánh in hình cá chép, con cua và kẹo bò cốm — những món 'bé tẹo' trong mâm cỗ của các cháu." },
      ],
      facts: [
        "Trung thu khác nhau ở ba miền: miền Bắc chuộng mâm cỗ bày trái cây và múa lân; miền Nam rước đèn náo nhiệt ở Chợ Lớn; miền Trung có Tuyên Quang — 'thành phố Trung thu' với mô hình đèn khổng lồ.",
        "Bánh trung thu có hai dòng chính: bánh nướng vỏ giòn nướng lò và bánh dẻo vỏ bột nếp mềm — cùng nhân nhưng khác hẳn vỏ.",
        "Theo truyền thuyết, bóng đen trên mặt trăng là cây đa của chú Cuội — người ngồi dưới gốc cây rồi bay luôn lên cung trăng.",
        "Cùng đêm rằm tháng 8 nhưng mỗi nước một tết: Trung Quốc Tết Đoàn viên, Hàn Quốc lễ Chuseok còn lớn hơn Tết, Nhật Bản Tsukimi ăn dango ngắm trăng.",
        "Ở miền Bắc xưa, mâm cỗ Trung thu không thể thiếu bưởi bày chóp và chó sứ nhỏ — vật trang trí tượng chó ngọc gác mâm cỗ.",
        "Trẻ em Việt tin rằng đêm Trung thu, nhìn kỹ mặt trăng sẽ thấy chú Cuội đang ngồi dưới gốc đa — 'người trong trăng' của tuổi thơ.",
      ],
    },
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
    deep: {
      ongNguon: [
        "Ngày 20/10/1930, tại Sài Gòn, Hội Phụ nữ phản đế Việt Nam ra đời — tổ chức quần chúng đầu tiên quy tụ phụ nữ yêu nước trong phong trào cách mạng. Tổ chức này là tiền thân của Hội Liên hiệp Phụ nữ Việt Nam, và ngày 20/10 về sau được chọn làm ngày truyền thống.",
        "Như vậy phụ nữ Việt Nam có tới hai 'ngày của mình': 8/3 quốc tế và 20/10 riêng Việt. Nếu 8/3 mang ý nghĩa đấu tranh bình đẳng chung của phụ nữ thế giới, 20/10 gắn với truyền thống 'anh hùng, bất khuất, trung hậu, đảm đang' — tám chữ vàng Bác Hồ tặng phụ nữ Việt Nam.",
      ],
      phongTuc: [
        { title: "Tặng hoa, quà cho phụ nữ", text: "Hoa hồng, cẩm chướng, ly đỏ tươi khắp các nẻo đường. Nam đồng nghiệp, con trai, học trò gửi quà cho phụ nữ quanh mình." },
        { title: "Nam giới vào bếp", text: "'Đàn ông nấu ăn ngày 20/10' gần như tục không thành văn: mâm cơm do chồng, con trai tự tay nấu cho mẹ, vợ, chị em." },
        { title: "Vinh danh phụ nữ tiêu biểu", text: "Hội Liên hiệp Phụ nữ các cấp tổ chức gặp mặt, trao giải cho những người 'giỏi việc nước, đảm việc nhà'." },
        { title: "Áo dài ngày lễ", text: "Nhiều trường, cơ quan khuyến khích mặc áo dài ngày 20/10 — tôn vinh vẻ đẹp truyền thống của phụ nữ Việt." },
        { title: "Hoạt động tại trường học", text: "Học sinh nam tặng hoa cô giáo và bạn nữ — nét chơi 20/10 quen thuộc của tuổi học trò." },
        { title: "Chuyện bình đẳng giới", text: "Ngày này cũng là dịp nói về chia sẻ việc nhà và cơ hội công việc — ngày lễ đồng thời là lời nhắc xã hội." },
      ],
      amThuc: [],
      facts: [
        "Hội Phụ nữ phản đế Việt Nam — tiền thân Hội LHPN Việt Nam — thành lập ngày 20/10/1930, là một trong những tổ chức phụ nữ lâu đời nhất Đông Nam Á.",
        "Bác Hồ tặng phụ nữ Việt Nam tám chữ vàng 'anh hùng, bất khuất, trung hậu, đảm đang' — được nhắc lại mỗi độ 20/10.",
        "Việt Nam có hai ngày tôn vinh phụ nữ: 8/3 mang ý nghĩa quốc tế và 20/10 là ngày riêng của phụ nữ Việt — cả hai đều được chúc mừng rộng rãi.",
        "Truyền thống 'phụ nữ Việt Nam anh hùng' kéo dài từ Hai Bà Trưng, Bà Triệu đến các nữ anh hùng và bà mẹ Việt Nam anh hùng — là nền móng của ngày 20/10.",
        "Tục đàn ông 'lo hết việc nhà' ngày 20/10 là phong tục hiện đại tự phát — không ai quy định nhưng gần như nhà nào cũng chơi.",
      ],
    },
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
    deep: {
      ongNguon: [
        "Ngày 20/11/1958, miền Bắc Việt Nam lần đầu tổ chức Ngày Quốc tế Hiến chương các Nhà giáo theo đề xướng của Liên đoàn Giáo viên Quốc tế (FISE). Đến ngày 26/9/1982, Hội đồng Bộ trưởng quyết định lấy luôn 20/11 hằng năm làm 'Ngày Nhà giáo Việt Nam'.",
        "Tôn sư trọng đạo là truyền thống ngàn đời của người Việt: 'Mùng 1 Tết cha, mùng 2 Tết mẹ, mùng 3 Tết thầy', 'Nhất tự vi sư, bán tự vi sư', 'Không thầy đố mày làm nên'. Ngày 20/11 hằng năm, trường học khắp nước rực hoa và văn nghệ — còn các thế hệ cựu học sinh quay về thăm thầy cô già và gửi lời cảm ơn đến nghề 'trồng người'.",
      ],
      phongTuc: [
        { title: "Học trò tặng hoa thầy cô", text: "Sáng 20/11, học sinh tặng hoa và thiệp tự làm cho cô giáo, thầy giáo — nghi lễ quen thuộc nhất của ngày này." },
        { title: "Văn nghệ chào mừng", text: "Tiết mục hát, múa, kịch do học sinh tự dàn dựng biểu diễn mừng thầy cô — dịp hiếm hoi 'được diễn thay tiết học'." },
        { title: "Cựu học sinh về thăm", text: "Người đã ra trường quay về thăm trường xưa, thầy cô cũ — truyền thống 'uống nước nhớ nguồn' của người đi học." },
        { title: "Lời chúc gửi thầy cô", text: "Tin nhắn, thư tay, lời chúc tràn ngập — ngày 20/11 là ngày hộp thư của thầy cô đầy ắp lời tri ân." },
        { title: "Gặp mặt truyền thống ngành giáo", text: "Ngành giáo dục tổ chức gặp mặt, trao danh hiệu nhà giáo ưu tú, nhà giáo nhân dân — vinh danh trọn đời dạy học." },
      ],
      amThuc: [],
      facts: [
        "Ngày 20/11/1958 là lần đầu Việt Nam tổ chức Ngày Quốc tế Hiến chương các Nhà giáo — từ dấu mốc đó, năm 1982 chọn luôn 20/11 làm ngày truyền thống.",
        "Quyết định 167-HĐBT ngày 26/9/1982 của Hội đồng Bộ trưởng chính thức đặt 20/11 là Ngày Nhà giáo Việt Nam.",
        "UNESCO chọn 5/10 là Ngày Nhà giáo Thế giới (World Teachers' Day) từ 1994 — kỷ niệm Khuyến nghị quốc tế 1966 về địa vị nhà giáo.",
        "Câu 'Không thầy đố mày làm nên' được truyền hằng trăm năm — và vẫn mở đầu hầu hết bài viết về ngày 20/11.",
        "'Nhà giáo Nhân dân' và 'Nhà giáo Ưu tú' là những danh hiệu nhà nước cao quý nhất của nghề giáo ở Việt Nam.",
      ],
    },
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
    deep: {
      ongNguon: [
        "Ngày 22/12/1944, tại rừng Trần Hưng Đạo thuộc Cao Bằng, Đội Việt Nam Tuyên truyền Giải phóng quân ra đời — 34 chiến sĩ do đồng chí Võ Nguyên Giáp chỉ huy, trang bị súng lục, súng móng ngựa và lá cờ đỏ sao vàng. Chỉ ba hôm sau, đội đánh thắng liên tiếp hai phái đội Phai Khắt và Nà Ngần.",
        "Từ đội quân 34 người ấy trưởng thành Quân đội nhân dân Việt Nam — đi qua hai cuộc kháng chiến và giữ nước trong hòa bình. Năm 1989, 22/12 còn được chọn làm Ngày hội Quốc phòng toàn dân — ngày truyền thống kép của quân đội và của tinh thần toàn dân giữ nước.",
      ],
      phongTuc: [
        { title: "Gặp mặt truyền thống", text: "Các đơn vị, quân khu tổ chức gặp mặt cựu chiến binh, ôn lại truyền thống từ ngày thành quân trong rừng Cao Bằng." },
        { title: "Khen thưởng, thăng quân hàm", text: "Trao danh hiệu và khen thưởng tập thể, cá nhân quân nhân lập thành tích huấn luyện, diễn tập trong năm." },
        { title: "Ngày hội Quốc phòng toàn dân", text: "Địa phương tổ chức diễu tập dân quân, tuyên truyền quốc phòng và hoạt động thể dục thể thao nghĩa vụ." },
        { title: "Thăm biên giới, hải đảo", text: "Đoàn công tác, báo chí và nhà hảo tâm về thăm đồn biên phòng, đảo xa — mang quà đến chiến sĩ nơi đầu sóng ngọn gió." },
        { title: "Hoạt động vì nhân dân", text: "Quân đội mở đợt khám bệnh, tặng quà cho dân vùng sâu vùng xa — nét đẹp 'quân đội của nhân dân'." },
        { title: "Bảo tàng, triển lãm", text: "Bảo tàng Lịch sử Quân sự và các đơn vị mở triển lãm vũ khí, ảnh tư liệu về những chiến dịch của dân tộc." },
      ],
      amThuc: [],
      facts: [
        "Đội Việt Nam Tuyên truyền Giải phóng quân ra đời với chỉ 34 chiến sĩ — trong đó có cả nữ — do Võ Nguyên Giáp trực tiếp chỉ huy.",
        "Chỉ ba ngày sau thành lập, ngày 25/12/1944, đội đánh thắng liên tiếp hai trận đầu tiên ở Phai Khắt và Nà Ngần.",
        "Ngày 22/12 còn là Ngày hội Quốc phòng toàn dân từ năm 1989 — nhân kỷ niệm 45 năm thành lập quân đội.",
        "Trước khi mang tên Quân đội nhân dân Việt Nam từ năm 1950, quân đội từng qua các tên Giải phóng quân, Cứu quốc quân và Quân đội Quốc gia.",
        "Trận Điện Biên Phủ 1954 — 'lừng lẫy năm châu, chấn động địa cầu' — là chiến thắng đỉnh cao của quân đội trong kháng chiến chống Pháp.",
      ],
    },
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
    deep: {
      ongNguon: [
        "Giáng sinh kỷ niệm ngày sinh của Giêsu tại thành Bethlehem — Kinh Thánh không ghi ngày cụ thể, và ghi chép đầu tiên về lễ 25/12 xuất hiện ở Roma năm 336. Các nhà nghiên cứu cho rằng ngày này được chọn để trùng những lễ hội mùa đông có sẵn của La Mã.",
        "Qua các thế kỷ, Giáng sinh phát triển cả nét tôn giáo lẫn dân gian: cây thông Noel từ Đức, ông già Noel gốc thánh Nikolaos thế kỷ IV ở Myra, tuần lộc và tuyết từ văn hóa Bắc Âu. Ở Việt Nam — nơi có cộng đồng Kitô hữu đông đảo — Giáng sinh là mùa lễ hội chung của cả thành phố, dù người ta theo đạo hay không.",
      ],
      phongTuc: [
        { title: "Đi nhà thờ đêm Giáng sinh", text: "Lễ vọng đêm 24/12 tại nhà thờ: thánh ca, hang đá máng cỏ. Đông đến mức nhiều người chỉ đứng ngoài sân nghe lễ." },
        { title: "Ngắm hang đá", text: "Nhà thờ và giáo xứ dựng hang đá tái hiện cảnh Giêsu giáng sinh — những hang đá khổng lồ là điểm nhấn Giáng sinh Việt." },
        { title: "Ông già Noel tặng quà", text: "Trẻ em viết thư cho Santa, treo tất ở đầu giường; sáng 25/12 quà 'rơi xuống ống khói' trước mắt các cháu." },
        { title: "Trang trí cây thông", text: "Cây thông, đèn nháy, ngôi sao đỉnh cây — trung tâm của mọi góc Giáng sinh trong nhà lẫn ngoài phố." },
        { title: "Phố đi chơi Noel", text: "Phố nhà thờ Hà Nội, quận 1 TP.HCM, phố Hải Thượng Lãn Ông — đường phố Giáng sinh đông kín người đi xem đèn." },
        { title: "Tiệc Noel gia đình, công ty", text: "Bữa tiệc cuối năm: gà nướng, lẩu, bánh khúc cây — Giáng sinh ở Việt Nam cũng là dịp sum họp đầu đông." },
      ],
      amThuc: [
        { title: "Gà nướng, gà tây", text: "Món chính của bàn tiệc Noel: gà nướng mật ong hoặc gà tây nhồi — kiểu Âu nhưng chế biến vị Việt." },
        { title: "Bánh khúc cây (bûche de Noël)", text: "Bánh cuộn kem bơ tạo hình khúc cây — truyền thống Pháp du nhập, bán khắp tiệm bánh mỗi độ Giáng sinh." },
        { title: "Lẩu đêm đông", text: "Giáng sinh rơi vào mùa se lạnh miền Bắc — nồi lẩu nóng hổi là món quen thuộc của các buổi tụ họp Noel." },
        { title: "Bánh quy gừng, kẹo gậy", text: "Người bánh gừng và cây kẹo gậy sọc đỏ trắng — những món nhỏ đặt dưới gốc cây thông." },
      ],
      facts: [
        "Kinh Thánh không ghi ngày sinh của Giêsu — lễ 25/12 được ghi nhận đầu tiên ở Roma năm 336; các nhà nghiên cứu cho rằng ngày này trùng lễ Sol Invictus của La Mã.",
        "Ông già Noel gốc từ thánh Nikolaos, giám mục thành Myra (thuộc Thổ Nhĩ Kỳ ngày nay) thế kỷ IV — nổi tiếng vì âm thầm tặng quà cho người nghèo.",
        "Bộ áo đỏ viền trắng của Santa được phổ biến toàn cầu qua chiến dịch quảng cáo của Coca-Cola từ năm 1931 — trước đó ông xuất hiện với nhiều màu áo khác nhau.",
        "Kitô hữu Chính thống giáo Đông phương ăn mừng Giáng sinh ngày 7/1 — vì vẫn tính theo lịch Julius.",
        "Ở Việt Nam, Giáng sinh là lễ của cả người không theo đạo — 'Noel đường phố' với hang đá và đèn nháy là nét rất riêng, ít nước nào có.",
      ],
    },
    faq: [
      { q: "Giáng sinh ở Việt Nam là ngày nào?", a: "Đêm 24/12 (Noel) và ngày 25/12 dương lịch." },
      { q: "Giáng sinh có phải ngày nghỉ lễ không?", a: "Không phải ngày nghỉ quốc gia, nhưng nhiều công ty cho nghỉ hoặc tổ chức tiệc cuối năm." },
      { q: "Đi chơi Noel ở đâu?", a: "Khu phố nhà thờ lớn Hà Nội, quận 1 TP.HCM hay các nhà thờ địa phương." },
    ],
  },
  {
    slug: "ong-cong-ong-tao",
    name: "Ông Công Ông Táo",
    dateMark: "23·12",
    displayDate: "23 tháng 12 Âm lịch",
    rule: { type: "lunar", month: 12, day: 23 },
    categories: ["truyen-thong"],
    theme: { from: "#9a3412", to: "#b91c1c", accent: "#f59e0b" },
    motif: "home",
    tagline: "Tiễn Táo quân về trời.",
    history: [
      "Táo quân — thần bếp canh giữ bếp lửa và chứng kiến mọi việc trong nhà — theo truyền thuyết gồm hai ông Táo và một bà Táo, từ câu chuyện Trọng Cao, Thị Nhi và Phạm Lang trong văn hóa dân gian Việt.",
      "Ngày 23 tháng Chạp, người Việt cúng tiễn Táo quân cưỡi cá chép về trời báo cáo việc thiện ác trong nhà với Ngọc Hoàng, đánh dấu bắt đầu loạt lễ cúng cuối năm trước Tết.",
      "Phong tục thả cá chép xuống ao hồ, bờ sông sau lễ cúng là nét độc đáo của Việt Nam — khác với nhiều nước Đông Á không có nghi lễ này.",
    ],
    meaning:
      "Ông Công Ông Táo là lễ chuyển giao giữa năm cũ và năm mới — ngày gia đình dọn bếp, tưởng nhớ ngọn lửa ấm cả năm qua, và tin rằng điều thiện sẽ được mang lên trời. Đó cũng là lời nhắc sống tử tế trong chính nhà mình.",
    traditions: [
      { title: "Cúng tiễn Táo quân", text: "Dọn dẹp bàn thờ bếp, dâng mâm cỗ, nón Táo và vật phẩm hóa vàng để Táo quân về trời trình báo." },
      { title: "Thả cá chép", text: "Thả cá chép ra ao hồ — phương tiện đưa Táo quân lên trời; nhiều gia đình thả chiều 23/12 âm lịch." },
      { title: "Quét dọn nhà cửa", text: "Sau lễ cúng, người ta bắt đầu quét tước, lau chùi, sửa sang đón Tết." },
      { title: "Cúng ông Thổ địa", text: "Cùng mâm cỗ, nhiều nhà cúng cả ông Địa – Thổ công cai quản đất đai trong nhà." },
    ],
    wishes: [
      "Chúc cả nhà một năm bếp lửa ấm, bát ngát yêu thương!",
      "Táo quân về trời báo lành — chúc gia đình bình an đón Tết!",
      "Cá chép vượt vũ môn — chúc năm mới mọi việc hanh thông!",
      "Chúc ông bà cha mẹ khỏe mạnh, nhà nhà sum vầy ngày cuối năm!",
      "Mong năm tới bếp nhà luôn nóng hổi, bát cơm luôn đầy!",
      "Tiễn Táo về trời, đón lộc về nhà — chúc tân niên thịnh vượng!",
    ],
    gifts: [
      { title: "Mâm cúng Táo quân", text: "Nón Táo, cỗ chay hoặc mặn tùy nhà — lễ vật chính của ngày 23 tháng Chạp." },
      { title: "Cá chép thả", text: "Mua cá chép thả ao hồ — vật phẩm mang ý nghĩa tâm linh nhất của ngày lễ." },
      { title: "Quà cho gia đình", text: "Hoa mai, đào, bánh mứt Tết — vì từ nay là bắt đầu không khí Tết." },
    ],
    deep: {
      ongNguon: [
        "Táo quân — thần cai quản bếp lửa — theo truyền thuyết gồm hai ông và một bà, bắt nguồn từ câu chuyện Trọng Cao, Thị Nhi và Phạm Lang: ba người vì duyên phận lắt léo mà chết cùng một nhà bếp, được Ngọc Hoàng phong làm Táo quân cai quản việc nhà bếp của loài người.",
        "Ngày 23 tháng Chạp âm lịch, Táo quân cưỡi cá chép về trời báo cáo việc lành ác của gia chủ suốt một năm với Ngọc Hoàng. Người Việt cúng tiễn bằng mâm cơm, nón Táo, vàng mã — và phóng sinh cá chép ra ao hồ. Lễ này mở đầu loạt cúng cuối năm, báo hiệu 'Tết đã đến tận cửa'.",
      ],
      phongTuc: [
        { title: "Cúng tiễn Táo quân", text: "Trưa hoặc chiều 23 tháng Chạp, gia chủ dâng mâm cơm, hoa quả, vàng mã và bộ nón Táo (hai nón ông, một nón bà) tiễn Táo về trời." },
        { title: "Thả cá chép", text: "Sau lễ cúng, cá chép được thả xuống ao hồ sông ngòi — 'ngựa' đưa Táo quân về trời. Đây là nét riêng của Việt Nam, không giống Trung Hoa." },
        { title: "Dọn bàn thờ bếp", text: "Lau chùi bàn thờ Táo, thay bát hương, quét tước bếp — dân gian tin 'bếp sạch thì Táo mới nói hay'." },
        { title: "Hóa vàng Táo quân", text: "Đốt nón, áo mã, giày mã sau lễ cúng — trang phục mới cho ba vị Táo lên trời trình diện." },
        { title: "Bắt đầu quét nhà đón Tết", text: "Từ sau lễ Táo quân, nhà cửa được quét dọn tổng thể — coi như 'mở mùa' chuẩn bị Tết." },
        { title: "Giữ lời ăn tiếng nói", text: "Dân gian tin Táo quân ghi lại lời nói và việc làm trong nhà — lễ cúng nhắc mỗi người sống tử tế trong chính mái ấm mình." },
      ],
      amThuc: [
        { title: "Mâm cơm cúng Táo quân", text: "Mâm cỗ mặn hay chay tùy nhà — thường thịnh soạn vì Táo quân 'đi xa' đến mùng 7 Tết mới trở về." },
        { title: "Cá chép sống", text: "Con cá chép mua về để thả sau lễ — vật phẩm tâm linh nhất của ngày, gắn tích 'cá chép vượt vũ môn'." },
        { title: "Nón Táo và vàng mã", text: "Bộ ba nón (hai ông một bà), giày, áo mã — trang phục hóa vàng cho Táo quân lên trời." },
        { title: "Chè, xôi cúng lễ", text: "Bát chè, đĩa xôi đặt cùng mâm cỗ — đồ ngọt 'nói lời ngọt' của mâm cúng bếp cuối năm." },
      ],
      facts: [
        "Theo truyền thuyết, Táo quân gồm ba vị: hai ông (Trọng Cao và Phạm Lang) và một bà (Thị Nhi) — vì thế trên bàn thờ bếp thường cúng ba vị.",
        "Chỉ Việt Nam thả cá chép đưa Táo quân về trời — tín ngưỡng 'cá chép vượt vũ môn hóa rồng' là nét độc đáo của Tết ta.",
        "Cúng Táo quân khác nhau ba miền: miền Bắc cúng đúng 23 tháng Chạp, nhiều nơi miền Nam cúng sớm từ 20–21 tháng Chạp, miền Trung thường chọn ngày giữa.",
        "Bếp lửa từng là trung tâm ngôi nhà Việt — 'ăn trông nồi, ngồi trông hướng'; vì thế thần bếp là vị thần gần gũi nhất trong nhà.",
        "Sau lễ Táo quân chỉ còn một tuần là giao thừa — loạt cúng này mở đầu 'tháng ăn chơi' của dân gian.",
      ],
    },
    faq: [
      { q: "Ông Công Ông Táo là ngày nghỉ lễ không?", a: "Không — đây là lễ truyền thống dân gian, không phải ngày nghỉ có lương." },
      { q: "Vì sao thả cá chép?", a: "Theo truyền thuyết, cá chép là phương tiện đưa Táo quân về trời trước Ngọc Hoàng ngày 23 tháng Chạp." },
          { q: "Khi nào thả cá chép là đúng?", a: "Chiều tối 23 tháng Chạp sau lễ cúng, hoặc sáng 24 — tùy từng gia đình." },
    ],
  },
  {
    slug: "tet-han-thuc",
    name: "Tết Hàn thực",
    dateMark: "03·03",
    displayDate: "3 tháng 3 Âm lịch",
    rule: { type: "lunar", month: 3, day: 3 },
    categories: ["truyen-thong"],
    theme: { from: "#166534", to: "#0f766e", accent: "#4d7c0f" },
    motif: "lotus",
    tagline: "Tết bánh trôi bánh chay.",
    history: [
      "Hàn thực (tiết ăn lạnh) bắt nguồn từ tục cấm lửa tưởng nhớ Giới Tử Thôi thời Xuân Thu Trung Quốc, sau được dân gian Việt hóa thành ngày 3/3 âm lịch.",
      "Ở Việt Nam, ý nghĩa chuyển thành tết ăn chay thanh tịnh với bánh trôi, bánh chay — hai chiếc bánh biểu trưng thiên địa, tổ tiên — không gắn tục cấm lửa.",
      "Ngày 3/3 âm lịch được dân gian gọi là 'Tết Hàn thực' — tết bánh trôi bánh chay, gắn với phong tục cúng tổ tiên và ăn chay đầu xuân.",
    ],
    meaning:
      "Tết Hàn thực là ngày ăn chay, nhớ về cội nguồn và thực hành sự thanh tịnh giữa đời sống năm mới — một nốt lặng trong dải lễ hội sau Tết, khi người ta dâng lên tổ tiên những viên bánh tròn ngọt thanh.",
    traditions: [
      { title: "Nấu bánh trôi, bánh chay", text: "Bánh trôi nước nhân đường và bánh chay xay đậu xanh — hai chiếc bánh thanh tịnh đặc trưng." },
      { title: "Cúng tổ tiên", text: "Dâng bánh trôi chay lên bàn thờ ông bà mùng 3/3 âm lịch." },
      { title: "Ăn chay cả ngày", text: "Nhiều gia đình giữ ngày chay thanh tịnh để tĩnh tâm đầu xuân." },
      { title: "Xuất hành lễ chùa", text: "Người ta thường đi lễ chùa cầu an sau loạt lễ Xuân." },
    ],
    wishes: [
      "Chúc gia đình một ngày Hàn thực ngọt lành, thanh tịnh!",
      "Bánh trôi tròn đầy — chúc cuộc sống viên mãn, ngọt ngào!",
      "Chúc ông bà cha mẹ khỏe, ấm no qua từng mùa xuân!",
      "Mong nhà nhà thêm đoàn viên, lòng lòng thêm hiếu thảo!",
      "Hàn thực an vui — chúc năm mới bình an, tâm tĩnh lặng!",
    ],
    gifts: [
      { title: "Bánh trôi bánh chay", text: "Hộp bánh trôi nước, bánh chay ngọt — quà truyền thống cho ngày 3/3." },
      { title: "Trà sen, mứt chay", text: "Hộp trà ướp sen và mứt chay thanh tịnh phù hợp tết chay." },
      { title: "Hoa cúng", text: "Bó hoa sen hoặc cúng trắng dâng bàn thờ gia tiên." },
    ],
    deep: {
      ongNguon: [
        "'Hàn thực' nghĩa là 'tiết ăn lạnh' — theo truyền thuyết, vua Tấn Văn Công đốt rừng ép Giới Tử Thôi ra làm quan, khiến ông chết cháy trong rừng Miên Sơn; hối hận, vua hạ lệnh cấm nhóm lửa và ăn đồ nguội vào ngày này để tưởng nhớ trung thần.",
        "Tục này du nhập Việt Nam nhưng đổi bản sắc: người Việt không cấm lửa, mà biến mùng 3 tháng 3 âm lịch thành tết bánh trôi bánh chay — mâm đồ thanh tịnh dâng tổ tiên. 'Hàn thực' ở ta vì vậy còn gọi 'Tết bánh trôi', ngày ăn chay nhớ cội nguồn giữa loạt lễ mùa xuân.",
      ],
      phongTuc: [
        { title: "Nặn bánh trôi, bánh chay", text: "Tối trước mùng 3, cả nhà vo bột nếp nặn bánh: bánh trôi viên nhân đường, bánh chay nhân đậu xanh." },
        { title: "Dâng bánh lên tổ tiên", text: "Sáng mùng 3 tháng 3 âm lịch, mâm bánh trôi bánh chay dâng lên bàn thờ ông bà — lễ cúng thanh tịnh đầu xuân." },
        { title: "Ăn chay cả ngày", text: "Nhiều gia đình giữ ngày chay để tâm tĩnh — 'ăn chay ngày Hàn thực' là tục còn giữ ở nhiều nhà miền Bắc." },
        { title: "Đi lễ chùa", text: "Sau loạt lễ tháng Giêng, nhiều người chọn mùng 3/3 vào chùa cầu an — 'đi lễ đầu xuân'." },
        { title: "Nấu nước gừng", text: "Nồi nước đường gừng cay đi kèm bánh trôi — vị ấm 'xát' cho một 'tiết ăn lạnh'." },
      ],
      amThuc: [
        { title: "Bánh trôi nước", text: "Viên bột nếp tròn nhân đường viên, nấu nổi trong nước đường gừng rắc vừng — 'bánh trôi' vì trôi nổi trên nước." },
        { title: "Bánh chay", text: "Viên dẹp nhân đậu xanh giã mịn, chan nước đường phèn — nhẹ hơn bánh trôi và đi đôi với nhau khi dâng cúng." },
        { title: "Mâm cúng thanh tịnh", text: "Bánh trôi, bánh chay, chè, hoa quả — lễ vật thanh tịnh của ngày mùng 3 tháng 3." },
      ],
      facts: [
        "Theo truyền thuyết, Hàn thực tưởng nhớ Giới Tử Thôi — trung thần thời Xuân Thu bị thiêu trong rừng Miên Sơn; vì vậy lệ cũ cấm nhóm lửa.",
        "Ở Việt Nam, Hàn thực không cấm lửa — chỉ giữ ý thanh tịnh qua bánh trôi bánh chay; tục này khác hẳn gốc Trung Hoa.",
        "Bánh trôi và bánh chay là một đôi: trôi tròn nhân đường nấu nước gừng, chay dẹp nhân đậu xanh chan nước đường — đối nhau như trời đất.",
        "Mùng 3 tháng 3 ở cùng tháng âm với Giỗ Tổ mùng 10 — dân gian coi tháng Ba là tháng của hai lễ cúng tổ gần nhau.",
        "Trẻ con thích tết này vì được ăn bánh 'nước đường' — nhiều nhà còn nặn bánh trôi nhiều màu cho vui.",
      ],
    },
    faq: [
      { q: "Tết Hàn thực có phải ngày nghỉ lễ?", a: "Không — đây là tết truyền thống, không phải ngày nghỉ lễ quốc gia." },
      { q: "Bánh trôi khác bánh chay thế nào?", a: "Bánh trôi nước là viên tròn nhân đường nấu trong nước gừng; bánh chay là viên dẹp nhân đậu xanh giã nhuyễn trần nước đường." },
          { q: "Hàn thực khác gì ngày chay thường?", a: "Là tết theo lịch cố định 3/3 âm — không phải ngày rằm, mùng 1 mà là một lễ riêng về thanh tịnh." },
    ],
  },
  {
    slug: "tet-doan-ngo",
    name: "Tết Đoan Ngọ",
    dateMark: "05·05",
    displayDate: "5 tháng 5 Âm lịch",
    rule: { type: "lunar", month: 5, day: 5 },
    categories: ["truyen-thong"],
    theme: { from: "#c2410c", to: "#be123c", accent: "#fbbf24" },
    motif: "wheat",
    tagline: "Giờ ngọ chính vọng — tết giết sâu bọ.",
    history: [
      "Đoan Ngọ mùng 5 tháng 5 âm lịch đến từ văn hóa Trung Hoa (gắn với tưởng nhớ Khuất Nguyên) nhưng được dân gian Việt biến thành 'tết giết sâu bọ'.",
      "Người Việt tin giữa ngọ ngày 5/5 âm lịch sức nóng đỉnh điểm khiến dịch bệnh lộ ra ngoài — ăn hoa quả chua, rượu nếp để 'giết sâu bọ' trong bụng.",
      "Ngày này còn là dịp hái thuốc bắc 'giờ ngọ chính vọng' — cỏ cây được cho mạnh dược tính nhất trong năm.",
    ],
    meaning:
      "Tết Đoan Ngọ là cách dân gian Việt đối phó với chuyển mùa hè: một ngày thanh lọc cơ thể, bảo vệ sức khỏe, đồng thời gắn với bó mẹ và những đứa trẻ — vì tục giết sâu bọ cũng là tục giữ gìn sinh khí cho nhà.",
    traditions: [
      { title: "Ăn hoa quả chua", text: "Xoài xanh, mận, vải — trái chua đầu mùa được cho 'giết sâu bọ' trong người." },
      { title: "Rượu nếp, cơm rượu", text: "Cơm rượu nếp cái hoa vàng — món truyền thống của tết Đoan Ngọ." },
      { title: "Hái thuốc ngọ", text: "Đúng giờ ngọ, người xưa đi hái cỏ cây làm thuốc vì tin giờ này dược tính mạnh." },
      { title: "Tục đốt vía", text: "Đốt vía, đeo chỉ ngũ sắc cho trẻ — xua đuổi sâu bọ và tai ương." },
    ],
    wishes: [
      "Đoan Ngọ an khỏe — chúc cả nhà mùa hè hạnh phúc, không đau ốm!",
      "Trái cây chín mùa — chúc cuộc sống chín đầy, ngọt lành!",
      "Chúc mẹ khỏe mạnh — lòng hiếu của con mãi quanh quẩn!",
      "Giờ ngọ chính vọng — chúc năng lượng tràn, bệnh tật lùi xa!",
      "Chúc nhà nhà hạ mát, lòng lòng bình an giữa hè!",
    ],
    gifts: [
      { title: "Giỏ hoa quả tươi", text: "Vải, mận, xoài — đúng chuẩn lễ giết sâu bọ." },
      { title: "Cơm rượu nếp", text: "Hộp cơm rượu nhà làm — món truyền thống đầy ý nghĩa." },
      { title: "Vòng chỉ ngũ sắc", text: "Vòng tay len năm màu cho trẻ — quà nhỏ truyền thống trừ tà." },
    ],
    deep: {
      ongNguon: [
        "Đoan Ngọ — 'đoan' là bắt đầu, 'ngọ' là giờ ngọ (11–13 giờ) — là lễ mùng 5 tháng 5 âm lịch, lúc mặt trời đứng bóng mạnh nhất năm. Tục lễ gốc Trung Hoa gắn với tưởng nhớ Khuất Nguyên — theo truyền thuyết, vị thần tài năng gieo mình xuống sông Tác La đúng ngày này.",
        "Sang Việt Nam, Đoan Ngọ biến thành 'tết giết sâu bọ': dân gian tin giữa giờ ngọ hôm ấy, 'sâu bọ' trong cơ thể lộ ra dễ tiêu diệt — nên ăn hoa quả chua, uống rượu nếp, đốt vía xua dịch bệnh. Ngày này cũng là dịp hái thuốc — 'giờ ngọ chính vọng' khi cỏ cây được cho mạnh dược tính nhất.",
      ],
      phongTuc: [
        { title: "Ăn giết sâu bọ giờ ngọ", text: "Đúng trưa 5/5 âm lịch, cả nhà ăn hoa quả chua, cơm rượu, trứng luộc — 'giết sâu bọ' trong bụng để khỏi đau ốm cả hè." },
        { title: "Ăn trái cây chua đầu mùa", text: "Mận, xoài xanh, sấu, vải — trái chua được tin là 'tẩy' cơ thể chuyển mùa; trẻ con thích nhất vì được ăn trái cây no say." },
        { title: "Uống rượu nếp, ăn cơm rượu", text: "Cơm rượu nếp cái hoa vàng — ngọt men, cay nhẹ — là món truyền thống bắt buộc của ngày giết sâu bọ." },
        { title: "Hái thuốc giờ ngọ", text: "Từ 11–13 giờ, người xưa ra đồng hái cỏ cây — tin rằng giờ này dược tính cây mạnh nhất năm." },
        { title: "Đốt vía, đeo chỉ ngũ sắc", text: "Đốt vía trước cửa xua tà, đeo vòng chỉ năm màu cho trẻ — phong tục trừ dịch còn giữ ở nhiều nơi." },
        { title: "Cúng gia tiên giữa trưa", text: "Mâm trái cây và cơm rượu dâng ông bà đúng giờ ngọ — sau đó cả nhà 'phá' mâm giết sâu bọ." },
      ],
      amThuc: [
        { title: "Cơm rượu nếp", text: "Nếp cái hoa vàng lên men ngọt cay — món đứng đầu bảng của tết giết sâu bọ." },
        { title: "Trái cây chua đầu mùa", text: "Xoài xanh chấm muối, mận, sấu non, vải — 'ăn chua' ngày Đoan Ngọ cho bụng dạ sạch sâu bọ." },
        { title: "Bánh tro (bánh gio)", text: "Bánh nếp ngâm nước tro trong veo, chấm mật mía — vị thanh mát riêng của ngày 5/5 âm lịch." },
        { title: "Trứng luộc", text: "Trứng gà, trứng vịt luộc — món 'sát trùng' giản dị trong mâm giết sâu bọ." },
      ],
      facts: [
        "Giờ ngọ 5/5 được xem là thời điểm 'dương cực' của năm — mặt trời đứng bóng, cỏ cây mạnh dược tính nhất, nên tục hái thuốc gọi 'giờ ngọ chính vọng'.",
        "Theo truyền thuyết, ngày 5/5 là ngày Khuất Nguyên gieo mình sông Tác La — dân gian lái thuyền rồng tìm cứu, nảy sinh đua ghe và tục gói cơm nếp trong lá thả xuống sông.",
        "'Giết sâu bọ' là bản sắc riêng của Đoan Ngọ Việt Nam — cùng ngày 5/5 âm lịch nhưng ăn uống khác hẳn Trung Hoa.",
        "Những trái 'phải ăn' ngày này gồm xoài xanh, mận, sấu non, vải — toàn trái chua đầu mùa, được tin diệt vi khuẩn đường ruột.",
        "Nhiều nhà còn giữ tục đeo vòng chỉ năm màu cho trẻ — 'chỉ ngũ sắc' trừ tà, đeo đến hết hè mới cắt bỏ.",
      ],
    },
    faq: [
      { q: "Tết Đoan Ngọ có phải ngày nghỉ?", a: "Không — là tết truyền thống, không phải ngày nghỉ lễ quốc gia." },
      { q: "Tết giết sâu bọ nghĩa là gì?", a: "Dân gian tin ăn hoa quả chua, rượu nếp đúng giờ ngọ 5/5 giúp thanh lọc, phòng bệnh mùa hè." },
          { q: "Ăn gì vào tết Đoan Ngọ?", a: "Hoa quả chua đầu mùa (vải, mận, xoài xanh), cơm rượu nếp, trứng luộc — trước bữa cơm trưa." },
    ],
  },
  {
    slug: "ngay-thay-thuoc",
    name: "Ngày Thầy thuốc Việt Nam",
    dateMark: "27·02",
    displayDate: "27 tháng 2",
    rule: { type: "solar", month: 2, day: 27 },
    categories: ["quoc-gia"],
    theme: { from: "#0f766e", to: "#0369a1", accent: "#99f6e4" },
    motif: "carnation",
    tagline: "Tri ân người chữa bệnh.",
    history: [
      "Ngày 27/2/1955, Bác Hồ gửi 'Thư gửi cán bộ y tế' với lời dạy nổi tiếng: 'Lương y như từ mẫu' — nền tảng đạo đức nghề thầy thuốc Việt Nam.",
      "Năm 1970, ngành y tế chọn 27/2 làm Ngày Thầy thuốc Việt Nam để kỷ niệm bức thư — không phải ngày nghỉ lễ nhưng được kỷ niệm rộng rãi.",
      "Ngày lễ tôn vinh bác sĩ, y tá, dược sĩ và cán bộ y tế làm việc âm thầm giữ gìn sức khỏe cộng đồng.",
    ],
    meaning:
      "Ngày Thầy thuốc Việt Nam là ngày cả nước nói lời cảm ơn với người cầm dao mổ, người đêm trực phòng cấp cứu — những nghề đòi hỏi tài năng lẫn lòng nhân hậu. 'Lương y như từ mẫu' là chuẩn mực sống của nghề ấy.",
    traditions: [
      { title: "Tặng hoa cho bác sĩ", text: "Hoa hồng, cẩm chướng tặng thầy thuốc, y tá quen thuộc — hành động tri ân phổ biến." },
      { title: "Lễ kỷ niệm tại viện", text: "Các bệnh viện tổ chức họp mặt, trao bằng khen cán bộ y tế tiêu biểu." },
      { title: "Khám chữa miễn phí", text: "Nhiều địa phương mở đợt khám bệnh công ích, hiến máu quanh ngày lễ." },
      { title: "Tri ân trên báo chí", text: "Báo đài đăng chuyện người thầy thuốc — nhất là vùng sâu, vùng xa." },
    ],
    wishes: [
      "Kính chúc các thầy thuốc sức khỏe — để cứu chữa nhiều sinh mệnh hơn nữa!",
      "Cảm ơn bác sĩ đã đêm trực như cha mẹ — chúc lương y lòng nhân hậu mãi mới!",
      "Chúc những người áo trắng bình an — gia đình luôn chờ bạn về!",
      "Tri ân nghề cao quý — chúc các thầy thuốc mạnh khỏe, tâm an!",
      "Chúc đội ngũ y tế Việt Nam thêm vững vàng, nhân ái!",
    ],
    gifts: [
      { title: "Hoa cẩm chướng", text: "Bó cẩm chướng hồng — hoa của lòng kính trọng dành cho thầy thuốc." },
      { title: "Thiệp tri ân", text: "Thiệp tay gửi bác sĩ gia đình, phòng khám quen thuộc." },
      { title: "Quà chăm sóc sức khỏe", text: "Trà, mật ong, vitamin — quà thiết thực cho người hay trực đêm." },
    ],
    deep: {
      ongNguon: [
        "Ngày 27/2/1955, Chủ tịch Hồ Chí Minh viết thư gửi cán bộ y tế — lá thư nổi tiếng với lời dạy 'Lương y như từ mẫu': thầy thuốc giỏi phải hiền từ như người mẹ. Bức thư trở thành nền móng đạo đức nghề thầy thuốc Việt Nam.",
        "Từ những năm 1970, ngành y tế chọn ngày 27/2 làm ngày truyền thống — Ngày Thầy thuốc Việt Nam. Ngày lễ tôn vinh bác sĩ, dược sĩ, y tá, điều dưỡng và mọi cán bộ y tế — những người giữ một trong những nghề nặng nhọc và thiêng liêng nhất: chữa bệnh và cứu người, từ phòng mổ đô thị đến trạm y tế vùng sâu.",
      ],
      phongTuc: [
        { title: "Hoa và lời cảm ơn", text: "Bệnh nhân và người nhà tặng hoa, thiệp cho bác sĩ, y tá quen thuộc — nghi lễ tri ân giản dị nhất ngày 27/2." },
        { title: "Gặp mặt ngành y", text: "Bệnh viện và ngành y tế tổ chức kỷ niệm, trao danh hiệu thầy thuốc ưu tú, thầy thuốc nhân dân." },
        { title: "Khám bệnh, hiến máu công ích", text: "Nhiều bệnh viện và đoàn y tế mở đợt khám miễn phí, tư vấn sức khỏe, hiến máu quanh ngày lễ." },
        { title: "Kể chuyện thầy thuốc", text: "Báo đài và mạng xã hội lan truyền chuyện các thầy thuốc vùng sâu, đêm trực, ca mổ kéo dài — tôn vinh 'lương y'." },
        { title: "Nghề con nối nghề cha", text: "Nhiều gia đình có hai, ba thế hệ cùng làm nghề thuốc — ngày 27/2 cũng là dịp tôn vinh những 'nhà y' truyền đời." },
      ],
      amThuc: [],
      facts: [
        "Bức thư 27/2/1955 của Bác Hồ chỉ dài vỏn vẹn một trang — nhưng câu 'Lương y như từ mẫu' trở thành chuẩn mực nghề thầy thuốc đến hôm nay.",
        "'Thầy thuốc Nhân dân' là danh hiệu nhà nước cao quý nhất của ngành y, được phong tặng từ những năm 1960.",
        "Hải Thượng Lãn Ông Lê Hữu Trác (1720–1791) — đại danh y 'thánh thuốc' của y học Việt Nam — có ngày giỗ riêng được nhiều nơi kỷ niệm.",
        "Mỹ mừng Doctors' Day ngày 30/3 từ năm 1933 — mỗi nước chọn một ngày riêng để tri ân thầy thuốc.",
        "Tuệ Tĩnh — danh y thế kỷ XIV, tác giả 'Nam dược thần hiệu' — được coi là tổ y học cổ truyền Việt Nam với triết lý 'thuốc Nam trị người Nam'.",
      ],
    },
    faq: [
      { q: "Ngày Thầy thuốc VN là ngày nghỉ lễ không?", a: "Không — là ngày kỷ niệm nghề nghiệp, không phải ngày nghỉ có lương." },
      { q: "Vì sao chọn 27/2?", a: "Ngày 27/2/1955 Chủ tịch Hồ Chí Minh gửi Thư cho cán bộ y tế với câu nổi tiếng 'Lương y như từ mẫu'." },
          { q: "Tặng gì cho thầy thuốc?", a: "Hoa cẩm chướng, thiệp tri ân, hoặc đơn giản lời cảm ơn đúng ngày 27/2." },
    ],
  },
  {
    slug: "ngay-bao-chi",
    name: "Ngày Báo chí Cách mạng Việt Nam",
    dateMark: "21·06",
    displayDate: "21 tháng 6",
    rule: { type: "solar", month: 6, day: 21 },
    categories: ["quoc-gia"],
    theme: { from: "#1e40af", to: "#334155", accent: "#f59e0b" },
    motif: "book",
    tagline: "Tri ân người cầm bút.",
    history: [
      "Ngày 21/6/1925, Nguyễn Ái Quốc cho ra đời báo Thanh Niên tại Quảng Châu, Trung Quốc — tờ báo đầu tiên của cách mạng Việt Nam.",
      "Từ đó báo chí cách mạng Việt Nam trưởng thành cùng lịch sử độc lập; Bác Hồ từng viết 'Cán bộ báo chí cũng là chiến sĩ cách mạng' — câu nói vẫn là châm ngôn của người làm báo.",
      "Ngày lễ tôn vinh nhà báo — nghề ghi lại sự thật và đưa tiếng nói nhân dân lên trang giấy.",
    ],
    meaning:
      "Ngày Báo chí Cách mạng Việt Nam là ngày tôn vinh người làm báo — nghề chạy ngược lũ, chui xuống hầm, ghi chép công tâm. Từ tờ Thanh Niên 1925 đến nghị trường hôm nay, báo chí vẫn là cơ quan của dân chủ xã hội.",
    traditions: [
      { title: "Lễ trao giải báo chí", text: "Các giải báo chí quốc gia thường công bố gần ngày 21/6 — vinh danh tác phẩm tiêu biểu." },
      { title: "Họp mặt nhà báo", text: "Hội Nhà báo Việt Nam, các cơ quan báo chí tổ chức gặp mặt, tri ân nghề." },
      { title: "Triển lãm báo chí", text: "Nhiều nơi trưng bày trang báo lịch sử — từ Thanh Niên, Cứu Quốc đến báo mạng hôm nay." },
      { title: "Tọa đàm nghề báo", text: "Trường báo chí mở tọa đàm về đạo đức nghề và đổi mới truyền thông." },
    ],
    wishes: [
      "Chúc các nhà báo giữ lửa công tâm — ngòi bút luôn vững!",
      "Tri ân người ghi lại lịch sử — chúc các phóng viên an toàn trên đường!",
      "Chúc báo chí Việt trung thực, nhân văn, đổi mới!",
      "Chúc những người cầm bút cách mạng khỏe mạnh, tự do sáng tạo trong khuôn khổ sự thật!",
      "Cảm ơn những trang tin tỉnh thức cộng đồng — chúc nghề báo mãi rực sáng!",
    ],
    gifts: [
      { title: "Sách nghề báo", text: "Sách về nghề viết, tuyển tập báo chí hay — quà cho nhà báo và người yêu chữ." },
      { title: "Bút ký tên", text: "Chiếc bút tốt — vật biểu tượng tinh tế của nghề cầm bút." },
      { title: "Hoa tri ân", text: "Bó hoa tươi gửi phóng viên, biên tập viên quen biết." },
    ],
    deep: {
      ongNguon: [
        "Ngày 21/6/1925, tại Quảng Châu (Trung Quốc), Nguyễn Ái Quốc cho ra đời tờ Thanh Niên — tờ báo đầu tiên của cách mạng Việt Nam. Báo in roneo từng bản rồi lén gửi về nước, truyền bá tinh thần yêu nước và con đường cứu nước mới.",
        "Từ tờ roneo ấy, báo chí cách mạng Việt Nam trưởng thành cùng đất nước: Cứu Quốc, Sự thật thời kháng chiến, rồi Nhân Dân, Quân đội Nhân dân và hệ thống báo đài đa phương tiện trong hòa bình. Ngày 21/6 trở thành ngày truyền thống của người làm báo — nghề ghi lại sự thật và đưa tiếng nói của nhân dân lên trang giấy.",
      ],
      phongTuc: [
        { title: "Kỷ niệm ra đời báo Thanh Niên", text: "Các cơ quan báo chí ôn lại lịch sử tờ Thanh Niên 1925 — tờ báo khai sinh dòng báo chí cách mạng Việt Nam." },
        { title: "Gặp mặt nhà báo", text: "Hội Nhà báo Việt Nam và các hội nhà báo tỉnh thành tổ chức gặp mặt, tri ân nhà báo lão thành và nghề." },
        { title: "Trao giải báo chí", text: "Giải Báo chí Quốc gia và các giải chuyên đề thường công bố quanh ngày 21/6 — vinh danh tác phẩm xuất sắc của năm." },
        { title: "Tọa đàm đạo đức nghề báo", text: "Trường báo chí và tòa soạn mở tọa đàm về chuẩn mực, tin giả, chuyển đổi số — 'ngày nhìn lại nghề'." },
        { title: "Triển lãm báo chí", text: "Triển lãm ảnh và trang báo lịch sử — từ tờ Thanh Niên roneo đến báo điện tử đa nền hôm nay." },
      ],
      amThuc: [],
      facts: [
        "Báo Thanh Niên được in roneo từng bản tại Quảng Châu rồi lén đưa về nước — phát hành số đầu tiên ngày 21/6/1925.",
        "Báo quốc ngữ đầu tiên ở Việt Nam là Gia định báo (1865) — tờ báo tiếng Việt đầu tiên nhưng là báo công, khác với dòng báo chí cách mạng từ Thanh Niên.",
        "Bác Hồ từng viết: 'Cán bộ báo chí cũng là chiến sĩ cách mạng. Cây bút, trang giấy là vũ khí sắc bén của họ' — vẫn là châm ngôn của nghề báo.",
        "Giải Báo chí Quốc gia do Hội Nhà báo Việt Nam tổ chức hằng năm từ 2006 — giải thưởng cao nhất của nghề báo Việt.",
        "Liên Hợp Quốc có Ngày Tự do Báo chí Thế giới 3/5 từ năm 1993 — ngày nhắc nhở vai trò của báo chí tự do với dân chủ.",
      ],
    },
    faq: [
      { q: "21/6 có phải ngày nghỉ?", a: "Không — là ngày kỷ niệm ngành báo chí, không phải ngày nghỉ quốc gia." },
      { q: "Tờ báo đầu tiên của cách mạng VN?", a: "Báo Thanh Niên do Nguyễn Ái Quốc sáng lập tại Quảng Châu (Trung Quốc) ngày 21/6/1925." },
          { q: "Báo chí cách mạng khác báo thường?", a: "Là truyền thống báo chí gắn với độc lập dân tộc từ 1925 — khác với báo chí thương mại thuần túy." },
    ],
  },
  {
    slug: "nguoi-cao-tuoi",
    name: "Ngày Người cao tuổi Việt Nam",
    dateMark: "01·10",
    displayDate: "1 tháng 10",
    rule: { type: "solar", month: 10, day: 1 },
    categories: ["quoc-gia"],
    theme: { from: "#7c2d12", to: "#a16207", accent: "#fde68a" },
    motif: "heart",
    tagline: "Kính lão đắc thọ.",
    history: [
      "Ngày 1/10 được Liên Hợp Quốc chọn là Ngày Quốc tế Người cao tuổi từ năm 1991; Việt Nam cũng lấy ngày này làm ngày tôn vinh người già.",
      "Tinh thần 'kính lão đắc thọ' của dân tộc từ lâu gắn với lễ mừng thọ 70, 80, 90 tuổi trong văn hóa nông nghiệp Việt Nam.",
      "Ngày lễ nhắc cộng đồng chăm sóc người lớn tuổi — những người đã dựng xây đời sống hôm nay.",
    ],
    meaning:
      "Ngày Người cao tuổi là ngày chúng ta cúi đầu trước những mái tóc bạc: ông bà, cha mẹ — những người đã đi qua chiến tranh, đói khổ, và dựng nên gia đình. 'Kính lão đắc thọ' không phải tục lễ mà là chuẩn sống.",
    traditions: [
      { title: "Mừng thọ", text: "Gia đình tổ chức mừng thọ cho cụ ông, cụ bà — con cháu tề tựu chúc phúc." },
      { title: "Thăm hỏi người già", text: "Đoàn thể, khu phố thăm hỏi, tặng quà người cao tuổi neo đơn." },
      { title: "Hoạt động hội người cao tuổi", text: "Hội người cao tuổi tổ chức văn nghệ, khám sức khỏe, tọa đàm." },
      { title: "Con cháu về quê", text: "Nhiều gia đình chọn ngày 1/10 để các cháu xa quê về thăm ông bà." },
    ],
    wishes: [
      "Kính chúc ông bà sống lâu trăm tuổi, tâm thanh thản!",
      "Chúc cụ bà khỏe mạnh — mãi là bóng cả che chở con cháu!",
      "Chúc cha mẹ thêm năm tháng bình yên bên con cháu!",
      "Mừng thọ cụ — chúc ngày ngày vui, tuổi tuổi hạnh phúc!",
      "Tri ân những mái đầu bạc — chúc người già được yêu thương, chăm sóc!",
    ],
    gifts: [
      { title: "Thực phẩm bổ dưỡng", text: "Yến sào, sữa, hạt — quà sức khỏe thiết thực cho người lớn tuổi." },
      { title: "Áo ấm, chăn mềm", text: "Áo len, chăn điện — quà ấm áp cho mùa đông của cụ." },
      { title: "Album gia đình", text: "Sách ảnh con cháu — món quà tinh thần quý giá với ông bà." },
    ],
    deep: {
      ongNguon: [
        "Ngày 14/12/1990, Đại hội đồng Liên Hợp Quốc ra nghị quyết 45/106 chọn ngày 1/10 là Ngày Quốc tế Người cao tuổi, áp dụng từ năm 1991 — nhằm thúc đẩy sự tôn trọng và quyền lợi của người già trong một thế giới đang già hóa nhanh.",
        "Việt Nam cũng lấy 1/10 làm Ngày Người cao tuổi Việt Nam — hòa với truyền thống 'kính lão đắc thọ' ngàn đời của dân tộc: lễ mừng thọ ở các tuổi 70, 80, 90 và câu ca 'kính già, già để tuổi cho'. Ngày này nhắc cộng đồng chăm sóc những mái đầu bạc đã dựng nên đời sống hôm nay.",
      ],
      phongTuc: [
        { title: "Mừng thọ ông bà", text: "Gia đình chọn dịp này tổ chức mừng thọ cho cụ ông, cụ bà — con cháu tề tựu chúc 'sống lâu trăm tuổi'." },
        { title: "Thăm hỏi người cao tuổi", text: "Hội Người cao tuổi, đoàn thể và chính quyền thăm hỏi, tặng quà các cụ neo đơn, có hoàn cảnh khó khăn." },
        { title: "Khám sức khỏe miễn phí", text: "Nhiều địa phương mở đợt khám bệnh, tư vấn dinh dưỡng và sức khỏe cho người già quanh ngày 1/10." },
        { title: "Văn nghệ hội cụ", text: "Hội Người cao tuổi tổ chức văn nghệ, thi hát, tọa đàm sống vui sống khỏe — đúng nghĩa 'ngày của các cụ'." },
        { title: "Con cháu về thăm", text: "Ngày này nhắc người con xa quê gọi điện, về thăm — một dịp để nhớ rằng các cụ vẫn đang chờ." },
      ],
      amThuc: [
        { title: "Cỗ mừng thọ", text: "Mâm cỗ thịnh soạn mừng tuổi cụ: gà xé, giò chả, nem — đông con cháu quây quần mới là 'đầy thọ'." },
        { title: "Xôi gấc đỏ", text: "Đĩa xôi đỏ tạo hình chữ 'thọ' — màu trường thọ phú quý đặt giữa mâm mừng thọ." },
        { title: "Chè, trà đãi khách", text: "Chè ngọt, trà nóng và bánh mừng thọ đãi khách đến chúc — đồ mừng giản dị của ngày kính lão." },
      ],
      facts: [
        "Nghị quyết 45/106 của Đại hội đồng Liên Hợp Quốc (14/12/1990) đặt ngày 1/10 là Ngày Quốc tế Người cao tuổi, áp dụng từ 1991.",
        "'Kính lão đắc thọ' — kính trọng người già sẽ được hưởng trường thọ — là chuẩn đạo lý ngàn đời của người Việt.",
        "Tục mừng thọ thường tổ chức ở tuổi 70, 80, 90, 100 — 'thượng thọ'; mâm cỗ, chữ thọ và lời chúc tụng là nghi lễ bắt buộc.",
        "Hội Người cao tuổi Việt Nam thành lập năm 1995 — một trong những tổ chức quần chúng đông thành viên nhất cả nước.",
        "Việt Nam thuộc nhóm nước già hóa dân số nhanh nhất thế giới — ngày này vì thế còn là lời nhắc chuẩn bị chính sách chăm lo người già.",
      ],
    },
    faq: [
      { q: "1/10 có phải ngày nghỉ?", a: "Không — là ngày kỷ niệm xã hội, không phải ngày nghỉ lễ." },
      { q: "Ngày này cùng ngày Quốc tế Người cao tuổi?", a: "Đúng — Việt Nam lấy 1/10, cùng ngày Liên Hợp Quốc chọn từ 1991." },
          { q: "Mừng thọ ở tuổi nào?", a: "Thường 70, 80, 90, 100 tuổi — tùy gia đình và truyền thống vùng miền." },
    ],
  },
  {
    slug: "doanh-nhan",
    name: "Ngày Doanh nhân Việt Nam",
    dateMark: "13·10",
    displayDate: "13 tháng 10",
    rule: { type: "solar", month: 10, day: 13 },
    categories: ["quoc-gia"],
    theme: { from: "#1e3a8a", to: "#0f766e", accent: "#fbbf24" },
    motif: "medal",
    tagline: "Tôn vinh khởi nghiệp.",
    history: [
      "Ngày 13/10 được Thủ tướng quyết định năm 2004 là Ngày Doanh nhân Việt Nam — tôn vinh đội ngũ doanh nhân đóng góp cho kinh tế đất nước.",
      "Tinh thần doanh nhân Việt gắn với 'thương hiệp văn hóa': buôn bán có đạo đức, giàu có gắn trách nhiệm cộng đồng.",
      "Từ hội nhập WTO, kinh tế số đến khởi nghiệp — doanh nhân Việt Nam ngày càng khẳng định trên bản đồ khu vực.",
    ],
    meaning:
      "Ngày Doanh nhân Việt Nam là ngày tôn vinh người dám bắt đầu — từ tiểu thương chợ quê đến startup công nghệ. Doanh nhân không chỉ tạo của cải mà tạo việc làm, niềm tin và khí thế của một đất nước đang lớn.",
    traditions: [
      { title: "Gặp mặt doanh nhân", text: "Hiệp hội doanh nghiệp, Phòng Thương mại tổ chức gặp gỡ, tôn vinh doanh nhân tiêu biểu." },
      { title: "Diễn đàn khởi nghiệp", text: "Nhiều diễn đàn, workshop khởi nghiệp, chuyển đổi số diễn ra quanh ngày 13/10." },
      { title: "Vinh danh doanh nghiệp", text: "Giải thưởng Sao Vàng đất Việt, Thánh Gióng và các giải thường trao quanh ngày lễ." },
      { title: "Hoạt động thiện nguyện", text: "Nhiều doanh nghiệp chọn ngày này làm ngày trách nhiệm xã hội, từ thiện cộng đồng." },
    ],
    wishes: [
      "Chúc các doanh nhân Việt giữ lửa khởi nghiệp — kinh doanh phát đạt!",
      "Chúc đội ngũ doanh nghiệp Việt vững bước trên trường thế giới!",
      "Tri ân người tạo việc làm — chúc buôn may bán đắt, tâm sáng nghề vững!",
      "Chúc startup Việt bay cao — thương hiệu Việt vang xa!",
      "Chúc những người dám bắt đầu luôn được đền đáp xứng đáng!",
    ],
    gifts: [
      { title: "Sách kinh doanh", text: "Sách khởi nghiệp, tiểu sử doanh nhân — quà trí tuệ cho người làm ăn." },
      { title: "Cây tài lộc", text: "Cây kim ngân, cây phát tài — quà chúc may mắn theo phong tục." },
      { title: "Vật phẩm bàn làm việc", text: "Bút ký, lịch để bàn, đồng hồ — quà trang trọng cho doanh nhân." },
    ],
    deep: {
      ongNguon: [
        "Ngày 20/9/2004, Thủ tướng Phan Văn Khải ký quyết định số 990/QĐ-TTg lấy ngày 13/10 hằng năm là Ngày Doanh nhân Việt Nam — nhằm tôn vinh đóng góp của đội ngũ doanh nhân trong công cuộc xây dựng, phát triển đất nước và hội nhập quốc tế.",
        "Truyền thống làm ăn của người Việt đã lâu đời: từ những thương cảng 'đệ nhất phố Hiến, đệ nhị Hội An' thời mở cõi đến tinh thần khởi nghiệp, đổi mới sáng tạo hiện đại. Ngày 13/10 là lời khẳng định: doanh nhân không chỉ tạo ra của cải — họ tạo việc làm, thương hiệu quốc gia và khí thế đi lên của đất nước.",
      ],
      phongTuc: [
        { title: "Gặp mặt doanh nhân", text: "Phòng Thương mại và Công nghiệp (VCCI) cùng các hiệp hội tổ chức gặp gỡ, tôn vinh doanh nhân tiêu biểu trong năm." },
        { title: "Trao giải doanh nhân", text: "Giải Sao Vàng đất Việt, Thánh Gióng cho doanh nhân trẻ khởi nghiệp được trao quanh dịp này — vinh danh người dám nghĩ dám làm." },
        { title: "Diễn đàn khởi nghiệp", text: "Sự kiện đổi mới sáng tạo, kết nối đầu tư và workshop khởi nghiệp diễn ra dồn dập quanh ngày 13/10." },
        { title: "Hoạt động thiện nguyện", text: "Nhiều doanh nghiệp chọn ngày này làm ngày trách nhiệm xã hội: từ thiện, học bổng, xây trường học." },
        { title: "Tri ân nội bộ", text: "Công ty tổ chức gặp mặt nhân sự, vinh danh sáng kiến trong năm — 'ngày của người làm kinh doanh'." },
      ],
      amThuc: [],
      facts: [
        "Quyết định 990/QĐ-TTg ngày 20/9/2004 của Thủ tướng Phan Văn Khải chọn 13/10 làm Ngày Doanh nhân Việt Nam — đến nay đã tròn hai thập kỷ.",
        "'Sao Vàng đất Việt' và 'Thánh Gióng' là những giải thưởng uy tín nhất dành cho doanh nhân và doanh nhân trẻ khởi nghiệp.",
        "Việt Nam có gần một triệu doanh nghiệp đang hoạt động — đội ngũ tạo ra phần lớn việc làm của nền kinh tế.",
        "Thế giới có Tuần lễ Doanh nhân Toàn cầu (Global Entrepreneurship Week) mỗi tháng 11 — nhiều nước cũng có ngày doanh nhân riêng như Việt Nam.",
        "Tinh thần 'tôn thương' của Việt Nam khởi sắc từ công cuộc Đổi mới 1986 — khi doanh nhân được thừa nhận là một lực lượng kinh tế.",
      ],
    },
    faq: [
      { q: "13/10 có phải ngày nghỉ?", a: "Không — là ngày kỷ niệm, không phải ngày nghỉ lễ quốc gia." },
      { q: "Từ khi nào có ngày này?", a: "Từ quyết định của Thủ tướng năm 2004 — chọn 13/10 làm Ngày Doanh nhân Việt Nam." },
          { q: "Ngày Doanh nhân có hoạt động gì?", a: "Gặp mặt, giải thưởng, diễn đàn khởi nghiệp và các hoạt động thiện nguyện của doanh nghiệp." },
    ],
  },
];

/** Holidays sorted by occurrence within a calendar year (approximate for lunar). */
export function getHoliday(slug: string): Holiday | undefined {
  return holidays.find((h) => h.slug === slug);
}
