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
  /**
   * Optional photo stem under public/images/holidays/<slug>/ — e.g.
   * "amthuc-banh-chung" resolves to <stem>.webp/.avif plus the -480 thumb
   * variants. Optional: items without a photo render the motif chip.
   */
  img?: string;
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

/**
 * Signature block — the per-holiday centerpiece that gives each page its own
 * silhouette. Four reusable layouts, all themed by the holiday palette:
 *   steps    — numbered ritual / how-to sequence with motif icons
 *   meanings — color / object symbolism cards
 *   timeline — key historical beats with year markers
 *   legend   — illustrated narrative card for myths and folk tales
 */
export type SignatureKind = "steps" | "meanings" | "timeline" | "legend";

export interface SignatureStep {
  title: string;
  text: string;
  /** Decorative icon from the shared Motif set. */
  icon: MotifName;
}

export interface SignatureMeaningItem {
  title: string;
  text: string;
  /** CSS color shown as a swatch chip, e.g. "#e11d48". */
  swatch: string;
}

export interface SignatureBeat {
  /** Year or short date label, e.g. "1954", "30·4·1975". */
  year: string;
  title: string;
  text: string;
}

export type Signature =
  | { kind: "steps"; title: string; steps: SignatureStep[] }
  | { kind: "meanings"; title: string; items: SignatureMeaningItem[] }
  | { kind: "timeline"; title: string; beats: SignatureBeat[] }
  | { kind: "legend"; title: string; lead: string; paragraphs: string[] };

/** A verified quote / poetry line with exact attribution. */
export interface Quote {
  text: string;
  author: string;
  /** Work or occasion, e.g. "Truyện Kiều", "Tuyên ngôn Độc lập 1945". */
  work?: string;
  /** EN only — marks the line as a translation of the Vietnamese original. */
  note?: string;
}

/**
 * Hero silhouette:
 *   classic — full-bleed photo under gradient, countdown card right (default)
 *   split   — editorial: text + countdown left, framed photo card right
 *   framed  — centered title inside a double ornament frame, hushed photo
 *   poster  — photo-dominant band, title anchored bottom-left
 */
export type HeroStyle =
  | "classic"
  | "split"
  | "framed"
  | "poster"
  | "mosaic"
  | "banner";

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
  /** 1–2 themed signature blocks — the page's distinctive centerpiece. */
  signature?: Signature[];
  /** Verified quotes / poetry lines with attribution; omit when none fit. */
  quotes?: Quote[];
  /** Hero layout variant; absent = "classic". */
  heroStyle?: HeroStyle;
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
    heroStyle: "framed",
    signature: [
      {
        kind: "steps",
        title: "Một đêm giao thừa dương lịch",
        steps: [
          { icon: "home", title: "Tiệc tất niên", text: "Bữa tối sum họp cuối năm — cùng nhìn lại mười hai tháng vừa qua, vui có, tiếc cũng có." },
          { icon: "star", title: "Đếm ngược mười giây", text: "Quảng trường, phố đi bộ và phòng khách cùng đọc ngược 10…9…8. Đúng 0 giờ, cả thành phố gọi tên năm mới." },
          { icon: "fireworks", title: "Pháo hoa đầu năm", text: "Màn pháo đầu tiên của năm nở trên bầu trời các thành phố lớn — lời chúc bằng ánh sáng cho ba trăm sáu lăm ngày tới." },
          { icon: "heart", title: "Lời chúc đầu tiên", text: "Cuộc gọi, tin nhắn và cái ôm đầu năm — ai gửi lời chúc trước được xem là người 'xông' niềm vui cho nhau." },
          { icon: "book", title: "Mục tiêu năm mới", text: "Viết ra ba điều muốn thay đổi, gấp lại cất đi — đến cuối năm mở ra soi lại mình đã đi được bao xa." },
        ],
      },
    ],
    quotes: [
      { text: "Lời của năm cũ thuộc về ngôn ngữ của năm cũ. Và lời của năm tới chờ một tiếng nói khác.", author: "T. S. Eliot", work: "Four Quartets" },
    ],
    motif: "fireworks",
    name: "Tết Dương lịch",
    dateMark: "01·01",
    displayDate: "1 tháng 1",
    rule: { type: "solar", month: 1, day: 1 },
    categories: ["quoc-te"],
    theme: { from: "#312e81", to: "#7c3aed", accent: "#a78bfa" },
    tagline: "Ngày đầu tiên của năm mới dương lịch.",
    history: [
      "Tết Dương lịch đánh dấu ngày đầu năm theo lịch Gregory — bộ lịch do Giáo hoàng Gregory XIII ban hành năm 1582 và dần trở thành chuẩn thời gian của nhân loại. Vào đêm giao thừa dương lịch, các thành phố lớn trên thế giới đồng loạt bắn pháo hoa đếm ngược — nghi lễ chung của cả hành tinh.",
      "Người Việt dùng lịch dương trong đời sống hành chính từ đầu thế kỷ 20. Tết dương lịch được công nhận là ngày nghỉ lễ quốc gia, quy định trong Bộ luật Lao động — người lao động được nghỉ một ngày hưởng nguyên lương mỗi đầu năm mới.",
      "Dân gian gọi thân mật là 'Tết Tây' để phân biệt với Tết Nguyên Đán. Dù không thiêng liêng bằng Tết ta, đây vẫn là mốc trang trọng để nhìn lại một năm vừa qua, đặt ra những lời hứa và dự định cho năm tới — và là mùa du lịch, tiệc đếm ngược sôi động nhất của giới trẻ.",
    ],
    meaning:
      "Dịp để khép lại một năm, nghỉ ngơi bên gia đình và mở đầu hành trình mới với những dự định tươi sáng.",
    traditions: [
      { title: "Đếm ngược giao thừa", text: "Khoảnh khắc 0 giờ được đếm ngược tại các quảng trường trung tâm — đông nhất là khu vực Bờ Hồ (Hà Nội) và đường Nguyễn Huệ (TP.HCM). Những năm gần đây hai thành phố chuyển dần sang trình diễn ánh sáng, nhạc nước và drone thay cho pháo hoa tầm cao." },
      { title: "Lời chúc năm mới", text: "Người ta nhắn 'Happy New Year' cho nhau bằng tin nhắn, thiệp điện tử và những dòng status đầu năm. Khác lời chúc Tết Nguyên Đán trang trọng, lời chúc Tết Dương lịch nhẹ nhàng, kiểu bạn bè, thường kèm ảnh đêm giao thừa." },
      { title: "Kế hoạch năm mới", text: "Nhiều bạn trẻ viết ra mục tiêu năm mới — học thêm kỹ năng, đọc sách, chạy bộ, tiết kiệm — dù Tết Dương lịch chỉ nghỉ một ngày. Các nhóm bạn rủ nhau 'khai bút' đầu năm như một cách tự hứa với chính mình." },
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
      { q: "Nước nào đón năm mới sớm nhất thế giới?", a: "Đảo quốc Kiribati — cụ thể là đảo Kiritimati (Đảo Giáng Sinh) nằm ở múi giờ UTC+14, đón năm mới sớm hơn Việt Nam 7 tiếng. Samoa và Tonga cũng thuộc nhóm đầu tiên chào năm mới mỗi năm." },
    ],
  },
  {
    slug: "tet-nguyen-dan",
    heroStyle: "mosaic",
    signature: [
      {
        kind: "steps",
        title: "Gói bánh chưng — bốn bàn tay, một chiếc bánh",
        steps: [
          { icon: "wheat", title: "Vo gạo, rửa lá", text: "Gạo nếp ngâm qua đêm cho hạt nở đều; lá dong rửa sạch, phơi héo cho mềm, dễ gói mà không rách." },
          { icon: "book", title: "Xếp nhân vuông vức", text: "Trải lá thành hình quạt, lớp gạo — đỗ xanh — thịt lợn — đỗ xanh — gạo, rồi gấp bốn cạnh thành khối vuông chỉnh tề." },
          { icon: "ribbon", title: "Buộc lạt khéo tay", text: "Buộc lạt tre theo ô bàn cờ: đủ chặt để bánh đứng vuông, đủ lỏng để nước luộc ngấm vào từng hạt gạo." },
          { icon: "candle", title: "Luộc lửa củi suốt đêm", text: "Luộc 10–12 tiếng trên bếp củi, đêm giao thừa cả nhà quây quần trông nồi — chiếc bánh chín cũng là lúc năm mới về." },
        ],
      },
      {
        kind: "meanings",
        title: "Mâm ngũ quả — năm loại quả, một lời cầu",
        items: [
          { swatch: "#4d7c0f", title: "Chuối xanh", text: "Nải chuối xum xuê nằm dưới cùng như bàn tay nâng đỡ — cầu sum họp, che chở con cháu." },
          { swatch: "#ea580c", title: "Bưởi, cam", text: "Quả tròn vàng rực gợi sự viên mãn; 'cam' còn đồng âm với lời cầu mong may mắn." },
          { swatch: "#dc2626", title: "Đào, hồng", text: "Sắc đỏ của đất trời mùa xuân — may mắn, sung túc và niềm vui đầu năm." },
          { swatch: "#65a30d", title: "Sung", text: "'Sung' nghe như 'sung túc' — lời cầu đủ đầy, không thiếu thứ gì trong năm mới." },
          { swatch: "#a16207", title: "Phật thủ, mãng cầu", text: "Quả phật thủ như bàn tay Phật phù hộ; 'cầu' trong mãng cầu là cầu an lành." },
        ],
      },
    ],
    quotes: [
      { text: "Mồng một tết cha, mồng hai tết mẹ, mồng ba tết thầy.", author: "Ca dao", work: "Vè ngày Tết" },
    ],
    motif: "lantern",
    name: "Tết Nguyên Đán",
    dateMark: "Mùng Một",
    displayDate: "1/1 Âm lịch",
    rule: { type: "lunar", month: 1, day: 1 },
    categories: ["truyen-thong", "quoc-gia"],
    theme: { from: "#991b1b", to: "#b45309", accent: "#fbbf24" },
    tagline: "Lễ lớn nhất năm của người Việt.",
    history: [
      "Tết Nguyên Đán — 'ngày đầu tiên của năm' — mọc rễ từ nền văn minh nông nghiệp lúa nước, khi nông dân trông vào chu kỳ trăng và tiết khí để canh mùa vụ. Theo truyền thuyết, từ đời Hùng Vương thứ sáu đã có cuộc thi dâng lễ vật nơi hoàng tử Lang Liêu sáng tạo bánh chưng bánh giầy tượng trưng đất trời.",
      "Qua hơn một nghìn năm Bắc thuộc, các nghi lễ Tết Á Đông hòa trộn với phong tục bản địa — từ cúng ông Công ông Táo, mâm ngũ quả, đến tục xông đất, mừng tuổi — sinh ra một cái Tết vừa đậm nét Đông Á vừa rất riêng của người Việt.",
      "Ngày nay Tết Nguyên Đán là kỳ nghỉ lễ lớn nhất và dài nhất trong năm — hàng chục triệu lượt người về quê sum họp mỗi độ cuối năm. Giao thừa, mừng tuổi, cúng tổ tiên: một hệ nghi lễ khép kín quanh chữ 'sum họp', quả tim văn hóa của cả dân tộc.",
    ],
    meaning:
      "Tết là khoảnh khắc chuyển giao giữa năm cũ và năm mới — thời điểm của đoàn viên, hiếu kính và hy vọng.",
    traditions: [
      { title: "Gói bánh chưng, bánh tét", text: "Từ ngày 26–29 tháng Chạp, cả nhà quây quần gói bánh — nếp ngâm, lá dong rửa sạch, đậu xanh và thịt lợn xếp từng lớp. Nồi bánh luộc suốt 8–12 tiếng qua đêm là khoảnh khắc Tết quen thuộc nhất của mỗi gia đình, nhất là ở quê." },
      { title: "Lì xì đầu năm", text: "Tiền mới đổi từ ngân hàng nhiều tuần trước Tết được cho vào phong bao đỏ — màu của may mắn. Người lớn lì xì cho trẻ em và cả cha mẹ cao tuổi kèm lời chúc sức khỏe; số tiền không quan trọng bằng tấm lòng đầu năm." },
      { title: "Chúc Tết, thăm họ hàng", text: "Mùng 1 dành cho họ nội, mùng 2 cho họ ngoại, mùng 3 thăm thầy cô — nhịp xưa vẫn được giữ đến nay. Những ngày đầu năm, nhà nào cũng mở cửa đón khách với mứt Tết, trà xanh và tiếng cười." },
      { title: "Câu đối đỏ, hoa đào hoa mai", text: "Nhà nào cũng treo câu đối đỏ chữ vàng — 'Cung chúc tân xuân', 'Phúc như Đông hải'. Miền Bắc chuộng đào hồng, miền Nam quý mai vàng; một cành hoa Tết được cho mang cả sắc xuân vào nhà." },
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
        { title: "Gói bánh chưng, nấu bánh", text: "Từ 27–28 tháng Chạp, cả nhà rửa lá dong, vo nếp, gói bánh rồi thức trắng đêm trông nồi bánh. Đó là nghi lễ truyền đời thiêng liêng nhất của gia đình Việt.", img: "amthuc-banh-chung" },
        { title: "Cúng giao thừa (trừ tịch)", text: "Đúng 0 giờ đêm 30, gia chủ dâng hương mời tổ tiên về ăn Tết cùng con cháu. Nhiều nhà cúng thêm một mâm ngoài sân cho Thiên địa." },
        { title: "Xông đất (xông nhà)", text: "Người đầu tiên bước vào nhà sau giao thừa được tin là mang lại vận may cho cả năm. Gia chủ thường chọn trước người hợp tuổi, đức độ để 'xông'." },
        { title: "Mừng tuổi, lì xì", text: "Trẻ em chúc thọ ông bà cha mẹ; người lớn trao bao đỏ đựng tiền mới. Lì xì là mừng thêm một tuổi và cầu may cho tuổi mới." },
        { title: "Chúc Tết theo thứ tự", text: "'Mùng 1 Tết cha, mùng 2 Tết mẹ, mùng 3 Tết thầy': ba ngày đầu năm đi chúc Tết theo vòng họ hàng, làng xóm và thầy cô." },
        { title: "Hái lộc, xin chữ, đi lễ", text: "Mùng 1 người ta hái cành lộc về nhà cầu may, xin chữ đầu năm ở văn miếu và vào chùa cầu an." },
        { title: "Hội xuân sau Tết", text: "Từ mùng 4–5 trở đi là lễ hội đền, hát quan họ, đấu vật, chọi trâu. Dân gian bảo 'tháng Giêng là tháng ăn chơi'." },
      ],
      amThuc: [
        { title: "Bánh chưng (Bắc), bánh tét (Nam)", img: "amthuc-banh-chung", text: "Vuông hay tròn dài, nếp đậu thịt gói trong lá — chiếc bánh của đất trời, đặt giữa dĩa bàn thờ ngày Tết." },
        { title: "Thịt kho trứng, củ kiệu (Nam)", img: "amthuc-thit-kho-trung", text: "Nồi thịt kho trứng nước dừa ăn dần qua ba ngày Tết, đi kèm dưa kiệu chua giòn chống ngán." },
        { title: "Thịt đông, dưa hành (Bắc)", text: "Miếng thịt đông trong vắt và củ hành muối chua — vị thanh mát 'xát' cho bữa Tết nhiều đạm.", img: "amthuc-thit-dong" },
        { title: "Mứt, hạt dưa, kẹo dừa", img: "amthuc-mut-tet", text: "Khay mứt bày khách: mứt gừng, mứt dừa, hạt dưa đỏ — vị ngọt mở đầu cho lời chúc." },
        { title: "Canh măng, giò chả, nem rán", img: "amthuc-nem-ran", text: "Canh măng móng giò nhà nào cũng nấu; giò lụa, chả quế và nem rán là mâm đãi khách quen thuộc." },
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
      { q: "Mùng 1, 2, 3 Tết thường đi thăm ai?", a: "Nhịp truyền thống là 'mùng 1 cha, mùng 2 mẹ, mùng 3 thầy': ngày đầu năm về bên nội chúc Tết ông bà cha, mùng 2 về ngoại thăm ông bà mẹ, mùng 3 tới thăm thầy cô. Ngày nay nhiều gia đình linh hoạt nhưng thứ tự trên vẫn được nhắc nhiều nhất." },
    ],
  },
  {
    slug: "tet-nguyen-tieu",
    heroStyle: "framed",
    signature: [
      {
        kind: "steps",
        title: "Một chiều rằm tháng Giêng",
        steps: [
          { icon: "temple", title: "Dâng hương đầu năm", text: "Rằm tháng Giêng là rằm lớn nhất năm — từ chùa Hương đến chùa quê, khói hương phủ kín ngõ vào." },
          { icon: "star", title: "Cúng sao giải hạn", text: "Nhiều gia đình làm lễ dâng sao đầu năm, cầu hóa giải vận hạn và một năm bình an." },
          { icon: "heart", title: "Phóng sinh tích đức", text: "Thả chim về trời, thả cá về nước — việc thiện đầu xuân nhắc lòng từ bi với muôn loài." },
          { icon: "moonstar", title: "Ăn chè trôi nước", text: "Kết thúc buổi lễ bằng bát chè trôi nước nóng — viên bánh tròn trịnh, ngọt lành như trăng rằm." },
        ],
      },
    ],
    quotes: [
      { text: "Tháng Giêng là tháng ăn chơi.", author: "Ngạn ngữ", work: "Vè bốn mùa" },
    ],
    motif: "fullmoon",
    name: "Tết Nguyên Tiêu",
    dateMark: "15·01",
    displayDate: "15/1 Âm lịch",
    rule: { type: "lunar", month: 1, day: 15 },
    categories: ["truyen-thong"],
    theme: { from: "#7f1d1d", to: "#ea580c", accent: "#fb923c" },
    tagline: "Rằm tháng Giêng — đêm trăng đầu năm.",
    history: [
      "Tết Nguyên Tiêu — rằm tháng Giêng — có gốc từ phong tục thắp đèn thờ Phật của Trung Quốc thời Hán Minh Đế, sau này phát triển thành lễ hội đèn lồng rực rỡ của Á Đông.",
      "Du nhập vào Việt Nam, Nguyên Tiêu hòa nhập sâu với tín ngưỡng cúng rằm bản địa: rằm tháng Giêng là ngày cúng lớn nhất năm trên bàn thờ gia tiên, tổ tiên và các vị thần hộ đồn — chứ không chỉ là lễ hội đèn lồng.",
      "Dân gian lưu truyền 'mùng một cúng cha, mùng hai cúng mẹ, mùng ba cúng thầy, rằm tháng Giêng cúng tổ tiên'. Ngày nay, phố cổ Hội An và các đền chùa vẫn thắp sáng muôn ngọn đèn rằm — một trong những đêm lễ đẹp nhất của văn hóa Việt.",
    ],
    meaning:
      "Đêm trăng tròn đầu năm tượng trưng cho sự viên mãn; dịp cầu bình an cho cả năm.",
    traditions: [
      { title: "Đi chùa cầu an", text: "'Đi lễ đầu năm' là nếp đẹp: người ta tới chùa sau Tết và đông nhất vào rằm tháng Giêng để cầu bình an cả năm. Các chùa lớn như Trấn Quốc, Hương Tích (Hà Nội) hay Vĩnh Nghiêm (TP.HCM) kín người suốt tuần rằm." },
      { title: "Cúng rằm tháng Giêng", text: "Rằm tháng Giêng là rằm lớn nhất năm, còn gọi tết Thượng Nguyên. Mâm cúng gia tiên có bánh chưng, hoa quả tươi; nhiều nhà thêm chè trôi nước và gà luộc để cúng trọn nghi rằm đầu năm." },
      { title: "Ăn chè trôi nước", text: "Viên chè tròn vỏ nếp nhân đậu xanh nổi lên trong nước gừng ngọt ấm — hình tròn tượng trưng sự viên mãn, sum họp đầu năm. Ở Chợ Lớn, người Hoa nấu chè trôi nước kiểu sủi cảo, thành một mùa chè riêng mỗi rằm Giêng." },
      { title: "Hội đèn lồng", text: "Phố cổ Hội An sáng rực hàng nghìn đèn lồng vào tối rằm; TP.HCM giữ tuyến phố đèn lồng Tết Nguyên tiêu tại khu Chợ Lớn. Cảnh thả hoa đăng trên sông Hoài là hình ảnh Tết Nguyên tiêu nổi tiếng nhất." },
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
        { title: "Ăn chè trôi nước", text: "Viên chè tròn nhân đậu xanh trong nước cốt dừa gừng cay. 'Trôi nước' là nổi lên mặt nước — tượng sự viên mãn đầu năm.", img: "amthuc-che-troi-nuoc" },
        { title: "Ngắm hoa đăng", text: "Hội An thả đèn hoa đăng trên sông Hoài, Chợ Lớn rực phố lồng đèn — nét còn lại của hội đèn Nguyên Tiêu xưa." },
        { title: "Cúng sao giải hạn", text: "Nhiều gia đình làm lễ cúng sao hạn đầu năm ngay trong ngày rằm Giêng, cầu hóa giải vận xấu cho cả năm." },
      ],
      amThuc: [
        { title: "Chè trôi nước", img: "amthuc-che-troi-nuoc", text: "Món bắt buộc ngày rằm Giêng: vỏ nếp dai, nhân đậu xanh hoặc viên đường, nước gừng ấm nồng chan cốt dừa." },
        { title: "Cỗ chay ngày rằm", img: "amthuc-co-chay", text: "Đậu hũ kho, nấm xào, canh rau củ — nhiều nhà giữ ngày chay rằm Giêng để mở một năm thanh tịnh." },
        { title: "Xôi, chè cúng rằm", img: "amthuc-xoi-che", text: "Đĩa xôi và chén chè đặt lên bàn thờ — lễ vật quen thuộc của mọi ngày rằm ở Việt Nam." },
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
      { q: "Rằm tháng Giêng khác các ngày rằm khác thế nào?", a: "Đây là rằm đầu tiên và lớn nhất trong năm — tết Thượng Nguyên, cũng là một trong ba đại lễ rằm (Thượng Nguyên, Trung Nguyên rằm tháng 7, Hạ Nguyên rằm tháng 10). Ở Việt Nam, rằm Giêng còn trùng với Ngày thơ Việt Nam." },
    ],
  },
  {
    slug: "valentine",
    heroStyle: "split",
    signature: [
      {
        kind: "meanings",
        title: "Ngôn ngữ sắc hồng",
        items: [
          { swatch: "#e11d48", title: "Hồng đỏ", text: "Tình yêu mãnh liệt và lời tỏ tình thẳng thắn — bông hồng của ngày Valentine kinh điển." },
          { swatch: "#f472b6", title: "Hồng phấn", text: "Ngọt ngào, cảm mến — dành cho tình cảm đang nảy nở, chưa cần nói thành lời." },
          { swatch: "#fafaf9", title: "Hồng trắng", text: "Thuần khiết và tôn trọng; ở một số nơi còn là lời nhớ nhung dịu dàng." },
          { swatch: "#facc15", title: "Hồng vàng", text: "Tình bạn và sự quan tâm — đẹp nhưng dễ bị hiểu nhầm, nên chọn đúng người để tặng." },
          { swatch: "#fb923c", title: "Hồng cam", text: "Nhiệt huyết và hào hứng — lời chúc cho một tình yêu đầy năng lượng." },
          { swatch: "#a78bfa", title: "Hồng tím lavender", text: "Mến mộ, say đắm — thường được kể là 'yêu ngay từ cái nhìn đầu tiên'." },
        ],
      },
    ],
    quotes: [
      { text: "Trăm năm cùng cọ sợi trường an.", author: "Ca dao", work: "Lời chúc tình nghĩa vợ chồng" },
    ],
    motif: "heart",
    name: "Lễ Tình nhân",
    dateMark: "14·02",
    displayDate: "14 tháng 2",
    rule: { type: "solar", month: 2, day: 14 },
    categories: ["quoc-te"],
    theme: { from: "#9f1239", to: "#e11d48", accent: "#fda4af" },
    tagline: "Ngày của những lời yêu thương.",
    history: [
      "Lễ Tình nhân gắn với thánh Valentine — linh mục sống ở Rôma thế kỷ 3. Theo truyền thuyết, ông đã bí mật làm lễ cưới cho các đôi trai gái khi hoàng đế Claudius II cấm thanh niên kết hôn, và bị hành hình ngày 14/2.",
      "Đến năm 496, Giáo hoàng Gelasius I chính thức đặt lễ thánh Valentine ngày 14/2. Từ thế kỷ 14, nhà thơ Geoffrey Chaucer gắn ngày này với mùa tình của chim và của người — mầm của phong tục gửi thư tình đầu tiên.",
      "Thế kỷ 19, nước Anh sản xuất hàng loạt thiệp Valentine in công nghiệp — phong tục lan khắp phương Tây rồi cả thế giới. Vào Việt Nam từ những năm 1990–2000 cùng đợt sóng hội nhập, 14/2 nhanh chóng trở thành ngày hoa hồng và chocolate náo nhiệt nhất năm của các đôi trẻ.",
    ],
    meaning: "Dịp để nói ra điều khó nói — một lời yêu thương đúng lúc đáng giá hơn mọi món quà.",
    traditions: [
      { title: "Tặng hoa hồng", text: "Hoa hồng đỏ là 'đơn vị tiền tệ' của ngày 14/2 — giá mỗi bông tăng gấp hai, gấp ba lần mà vẫn cháy hàng tại các chợ hoa Quảng Ba, Hồ Thị Kỷ. Những năm gần đây hoa khô, hoa sáp và hộp hoa cao cấp được chuộng vì giữ được lâu." },
      { title: "Sô-cô-la và thiệp", text: "Sô-cô-la là món quà ngọt ngào kinh điển đi cùng bông hồng. Giới trẻ Việt ngày càng chuộng thiệp viết tay, hộp quà bí mật và quà tự làm hơn quà mua sẵn — giá trị nằm ở công chuẩn bị." },
      { title: "Hẹn hò đặc biệt", text: "Nhà hàng, quán cà phê view đẹp được đặt kín từ cả tuần trước; nhiều cặp chọn nấu ăn cùng nhau ở nhà hay 'hẹn hò ngược' — né phố đông, tự làm album ảnh. Khi 14/2 rơi vào cuối tuần, đó thường là đêm hẹn hò đông nhất năm." },
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
        { title: "Tặng hoa hồng", text: "Hồng đỏ cho tình yêu nồng cháy, hồng phấn cho sự ngọt ngào. Giá hoa ngày 14/2 thường tăng mạnh nhưng vẫn cháy hàng.", img: "gallery2" },
        { title: "Sô-cô-la và thiệp viết tay", text: "Cặp quà kinh điển: hộp sô-cô-la kèm tấm thiệp viết tay. Nhiều bạn trẻ tự làm sô-cô-la tại nhà để tặng người thương." },
        { title: "Tỏ tình, cầu hôn", text: "Ngày 14/2 được nhiều người chọn để ngỏ lời yêu hoặc cầu hôn — hi vọng có một kỷ niệm dễ nhớ nhất năm." },
        { title: "Hẹn hò đặc biệt", text: "Nhà hàng kín bàn từ sớm; bữa tối nến, một bộ phim tình cảm hay chuyến đi ngắn dành riêng cho hai người." },
        { title: "Valentine của bạn bè", text: "Ở Việt Nam bạn thân cũng tặng quà nhau ngày này. Nhiều nước còn có 'Galentine' 13/2 — ngày mừng tình bạn của phái nữ." },
      ],
      amThuc: [
        { title: "Sô-cô-la", img: "amthuc-socola", text: "Món quà - đồ ngọt đầu tiên người ta nghĩ đến: chocolate ngọt đắng như tình yêu, thường gói hộp hình trái tim." },
        { title: "Dâu tây phủ sô-cô-la", img: "amthuc-dau-socola", text: "Trái dâu đỏ nhúng sô-cô-la tan — món tráng miệng lãng mạn nhiều bạn trẻ tự tay làm cho buổi hẹn." },
        { title: "Bánh ngọt hình tim", img: "amthuc-banh-tim", text: "Bánh kem, cupcake sắc đỏ hồng hình trái tim — điểm nhấn cho bàn tiệc của các đôi lứa." },
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
      { q: "Có mấy ngày Valentine trong năm?", a: "Ba ngày được nhắc nhiều nhất: Valentine đỏ 14/2 (tặng quà cho người yêu), Valentine trắng 14/3 (nam giới 'đáp lễ', phổ biến ở Nhật Bản) và Valentine đen 14/4 — ngày vui của người độc thân." },
    ],
  },
  {
    slug: "quoc-te-phu-nu",
    heroStyle: "mosaic",
    signature: [
      {
        kind: "timeline",
        title: "Từ đường phố New York đến ngày của mẹ thế giới",
        beats: [
          { year: "1908", title: "Diễu hành ở New York", text: "Khoảng 15.000 công nhân may — phần lớn là phụ nữ — xuống đường đòi giờ làm ngắn hơn, lương cao hơn và quyền bầu cử." },
          { year: "1910", title: "Sáng kiến Clara Zetkin", text: "Tại Copenhagen, nhà hoạt động Đức Clara Zetkin đề xuất một ngày chung của phụ nữ trên toàn thế giới — được hơn 100 đại biểu 17 nước nhất trí." },
          { year: "1917", title: "Bánh và hòa bình", text: "Công nhân nữ ở Petrograd đình công ngày 23/2 lịch Julius — trùng 8/3 lịch mới — mở đầu chuỗi biến động làm thay đổi nước Nga." },
          { year: "1975", title: "Liên Hợp Quốc công nhận", text: "Trong Năm Quốc tế Phụ nữ, LHQ chính thức kỷ niệm 8/3 là Ngày Quốc tế Phụ nữ trên toàn cầu." },
        ],
      },
      {
        kind: "meanings",
        title: "Chọn hoa ngày 8/3",
        items: [
          { swatch: "#e11d48", title: "Hoa hồng", text: "Lời yêu thương và trân trọng rõ ràng nhất — hợp tặng mẹ, vợ, người yêu." },
          { swatch: "#fb7185", title: "Cẩm chướng", text: "Lòng biết ơn — bông hoa của những người mẹ và cô giáo." },
          { swatch: "#f9a8d4", title: "Tulip", text: "Thanh lịch, tinh tế — lựa chọn lịch sự cho đồng nghiệp và bạn bè." },
          { swatch: "#fbbf24", title: "Đồng tiền", text: "Nụ cười và năng lượng tươi mới — bó hoa của sự vui vẻ." },
        ],
      },
    ],
    quotes: [
      { text: "Anh hùng — Bất khuất — Trung hậu — Đảm đang.", author: "Hồ Chí Minh", work: "Tám chữ vàng tặng phụ nữ miền Nam, 8·3·1965" },
    ],
    motif: "rose",
    name: "Quốc tế Phụ nữ 8/3",
    dateMark: "08·03",
    displayDate: "8 tháng 3",
    rule: { type: "solar", month: 3, day: 8 },
    categories: ["phu-nu", "quoc-te"],
    theme: { from: "#be185d", to: "#db2777", accent: "#f9a8d4" },
    tagline: "Tôn vinh phái đẹp trên toàn thế giới.",
    history: [
      "Ngày Quốc tế Phụ nữ khởi nguồn từ làn sóng đấu tranh của công nhân dệt may Mỹ — đặc biệt cuộc biểu tình của hàng nghìn nữ công nhân New York năm 1908 đòi giờ làm việc ngắn hơn, lương công bằng và quyền bầu cử.",
      "Năm 1910, tại Đại hội phụ nữ xã hội chủ nghĩa quốc tế ở Copenhagen, Clara Zetkin đề nghị chọn một ngày chung để tôn vinh phụ nữ toàn thế giới. Lần đầu tiên, ngày 19/3/1911, trên một triệu người ở Áo, Đan Mạch, Đức và Thụy Sĩ đã cùng xuống đường.",
      "Năm 1975, Liên Hiệp Quốc chính thức công nhận 8/3 là Ngày Quốc tế Phụ nữ. Ở Việt Nam, ngày này còn gắn với truyền thống tưởng nhớ Hai Bà Trưng — hai người phụ nữ đầu tiên của lịch sử dân tộc khởi nghĩa dựng nước.",
    ],
    meaning: "Ngày để tôn vinh công lao, sự hy sinh và quyền bình đẳng của phụ nữ trong gia đình lẫn xã hội.",
    traditions: [
      { title: "Tặng hoa và quà", text: "Hoa hồng, hoa cẩm chướng và những hộp quà nhỏ là lựa chọn phổ biến nhất — bạn trai tặng người yêu, chồng tặng vợ, con tặng mẹ, học trò tặng cô. Chợ hoa và các sàn thương mại điện tử đều chạy 'chiến dịch 8/3' suốt tuần trước đó." },
      { title: "Bữa cơm sum họp", text: "Nhiều ông bố, người yêu vào bếp nấu bữa tối để 'đổi ca' cho mẹ và vợ — bữa cơm là món quà đơn giản mà ý nghĩa nhất. Hình ảnh đàn ông hì hục nấu canh rau ngót, kho cá ngày 8/3 đã thành 'meme' yêu thương quen thuộc." },
      { title: "Hoạt động tôn vinh", text: "Cơ quan, doanh nghiệp, trường học tổ chức gặp mặt, tuyên dương nữ cán bộ, nữ sinh tiêu biểu; các cuộc thi nấu ăn, văn nghệ 'vì phụ nữ' sôi nổi cả tuần. Từ năm 2016, Liên Hợp Quốc đặt một chủ đề riêng cho ngày 8/3 mỗi năm." },
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
      { q: "Ngày 8/3 mỗi năm có chủ đề riêng không?", a: "Có. Từ năm 2016, Liên Hợp Quốc đặt chủ đề chính thức cho mỗi năm — ví dụ 'DigitALL' (2023) về công nghệ số cho nữ giới, 'Invest in Women' (2024) về đầu tư cho phụ nữ — và các hoạt động toàn cầu xoay quanh chủ đề ấy." },
    ],
  },
  {
    slug: "gio-to-hung-vuong",
    heroStyle: "mosaic",
    signature: [
      {
        kind: "legend",
        title: "Bọc trăm trứng — cội nguồn con Rồng cháu Tiên",
        lead: "Lạc Long Quân lấy Âu Cơ. Nàng sinh ra một bọc trăm trứng, nở ra một trăm người con trai.",
        paragraphs: [
          "Sau một thời gian, Lạc Long Quân nói với Âu Cơ: ta là giống Rồng, nàng là giống Tiên — thủy hỏa khó ở lâu bên nhau. Hai người chia nhau năm mươi người con: Âu Cơ đưa các con lên núi, Lạc Long Quân đưa các con xuống biển.",
          "Người con cả theo mẹ lên miền đất Phong Châu được tôn làm vua, hiệu Hùng Vương — mở đầu thời đại Hồng Bàng, thời đại sơ khai của nước Việt. Vì cùng một bọc mà ra nên người Việt gọi nhau là 'đồng bào' — con Rồng cháu Tiên.",
        ],
      },
      {
        kind: "steps",
        title: "Ba nhịp của ngày Giỗ Tổ",
        steps: [
          { icon: "temple", title: "Rước kiệu lên Nghĩa Lĩnh", text: "Sớm mồng 10 tháng 3 âm lịch, đoàn rước kiệu, cờ hoa và trống hội leo lên núi Nghĩa Lĩnh về đền Hùng." },
          { icon: "candle", title: "Dâng hương tại đền Thượng", text: "Đoàn lễ vào đền Thượng — nơi các vua Hùng được cho là đứng nhìn trời đất — dâng hương bái công dựng nước." },
          { icon: "lotus", title: "Dâng xôi, bánh chưng, bánh giầy", text: "Mâm lễ vật mộc mạc nhất có thể: xôi nếp, bánh chưng, bánh giầy — thức ăn của đời sống lúa nước từ thuở tổ tiên." },
        ],
      },
    ],
    quotes: [
      { text: "Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mồng Mười tháng Ba.", author: "Ca dao", work: "Vè Giỗ Tổ" },
    ],
    motif: "temple",
    name: "Giỗ Tổ Hùng Vương",
    dateMark: "10·03",
    displayDate: "10/3 Âm lịch",
    rule: { type: "lunar", month: 3, day: 10 },
    categories: ["quoc-gia", "truyen-thong"],
    theme: { from: "#854d0e", to: "#166534", accent: "#fbbf24" },
    tagline: "Dù ai đi ngược về xuôi, nhớ ngày Giỗ Tổ mùng mười tháng ba.",
    history: [
      "Giỗ Tổ Hùng Vương tưởng nhớ các vua Hùng — những người có công dựng nước Văn Lang, nhà nước đầu tiên của dân tộc Việt Nam. Theo truyền thuyết, mười tám đời vua Hùng đặt nền móng cho một dân tộc độc lập từ những ngày đầu lập quốc.",
      "Nơi thờ tự chính là Đền Hùng trên núi Nghĩa Lĩnh, Phú Thọ — được ví như 'cõi phát tích' của người Việt. Từ năm 1917, triều Nguyễn đã định chế lễ hội Giỗ Tổ như một ngày lễ chính thức của quốc gia.",
      "Năm 2007, Quốc hội quyết định đưa mùng 10 tháng 3 âm lịch vào danh sách ngày nghỉ lễ quốc gia — hàng triệu người mỗi năm về Phú Thọ dâng hương, trong khi con cháu khắp nơi đọc câu ca 'Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng ba'.",
    ],
    meaning: "Uống nước nhớ nguồn — ngày để mỗi người Việt hướng về cội nguồn dân tộc.",
    traditions: [
      { title: "Dâng hương Đền Hùng", text: "Từ đêm mùng 9 rạng ngày 10/3 âm lịch, dòng người lên núi Nghĩa Lĩnh (Phú Thọ) dâng hương tại Đền Hạ, Đền Trung và Đền Thượng. Lãnh đạo Nhà nước dự lễ chính tại Đền Thượng; hàng triệu người Việt trong và ngoài nước hướng về cùng một giờ." },
      { title: "Rước kiệu, hát xoan", text: "Các làng quanh Đền Hùng rước kiệu dâng hoa lên đền suốt tuần lễ hội — mỗi kiệu có cờ, trống và mâm cỗ của riêng địa phương. Hát xoan Phú Thọ — di sản văn hóa phi vật thể được UNESCO công nhận năm 2011 — vang lên suốt hội." },
      { title: "Bánh chưng, bánh giầy dâng cúng", text: "Theo truyền thuyết Lang Liêu, bánh chưng vuông tượng trưng đất, bánh giầy tròn tượng trưng trời — hai thứ bánh là lễ vật bắt buộc trên mâm cúng Giỗ Tổ. Nhiều gia đình tự gói hoặc mua bánh dâng lên đền rồi mang về làm lộc." },
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
        { title: "Bánh chưng", text: "Bánh vuông tượng đất — lễ vật thiêng nhất dâng lên các vua Hùng trong ngày giỗ Tổ.", img: "amthuc-banh-chung" },
        { title: "Bánh giầy", img: "amthuc-banh-giay", text: "Bánh tròn ép từ nếp giã, tượng trưng bầu trời — cặp đôi bất ly với bánh chưng trong mâm cúng." },
        { title: "Xôi và gà cúng", img: "amthuc-xoi-ga", text: "Xôi gấc đỏ, gà luộc vàng — mâm cỗ dâng tổ theo kiểu cỗ Tết truyền thống của người Việt." },
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
      { q: "Có bao nhiêu đời vua Hùng?", a: "Theo truyền thuyết có 18 đời vua Hùng nối tiếp nhau trị vì nước Văn Lang, kéo dài từ thời Hồng Bàng đến khi An Dương Vương thành lập Âu Lạc (258 TCN). Giỗ Tổ được giữ vào ngày 10/3 âm lịch — ngày quốc lễ do sắc lệnh vua Khải Định ấn định năm 1917." },
    ],
  },
  {
    slug: "tet-thanh-minh",
    heroStyle: "framed",
    signature: [
      {
        kind: "steps",
        title: "Tảo mộ đúng nghi",
        steps: [
          { icon: "home", title: "Dọn cỏ, rửa bia", text: "Quét dọn cỏ dại quanh phần mộ, rửa sạch bia và tô điểm lại nét chữ đã mờ theo năm tháng." },
          { icon: "temple", title: "Vun đất, thắp hương", text: "Đắp thêm đất lên phần mộ — 'vun mộ' như sửa lại nhà cho người đã khuất — rồi thắp nén hương đầu tiên." },
          { icon: "lotus", title: "Dâng hoa, dâng lễ", text: "Hoa tươi, trầu rượu và món ăn người thân từng thích — lễ vật giản dị, lòng thành là chính." },
          { icon: "heart", title: "Thăm hỏi, nhắc chuyện", text: "Tảo mộ cũng là ngày đại gia đình gặp nhau bên mộ tổ — kể lại chuyện cũ để người nhỏ biết mình từ đâu." },
        ],
      },
    ],
    quotes: [
      { text: "Trong năm có tiết thanh minh / Lễ là tảo mộ, hội là đạp thanh.", author: "Nguyễn Du", work: "Truyện Kiều" },
    ],
    motif: "lotus",
    name: "Tết Thanh minh",
    dateMark: "04·04–06",
    displayDate: "4–6 tháng 4 (đổi theo năm)",
    rule: { type: "qingming" },
    categories: ["truyen-thong"],
    theme: { from: "#3f6212", to: "#0f766e", accent: "#a3e635" },
    tagline: "Tiết trời trong sáng — mùa tảo mộ nhớ nguồn.",
    history: [
      "Thanh minh là tiết khí thứ năm trong hệ 24 tiết khí của lịch âm — khoảng 4–6/4 dương, khi 'trời quang đất sạch', khí trời trong lành nhất sau mùa đông. Từ nghìn năm trước, người xưa đã xem đây là mốc bắt đầu mùa canh tác mới.",
      "Phong tục tảo mộ — đi thăm, quét dọn và dâng hương các ngôi mộ tổ tiên — vốn từ lễ Hàn thực Trung Quốc, sau sáp nhập vào tiết Thanh minh. Du nhập vào Việt Nam, nó hòa với tín ngưỡng thờ cúng tổ tiên bản địa thành 'Tết tảo mộ' rất riêng.",
      "Ở miền quê Việt Nam, Tết Thanh minh còn là hội của họ tộc: cả dòng họ cùng về quê dọn mộ, sửa mả, gặp gỡ đầu xuân. Với nhiều gia đình, đây là dịp sum họp thứ hai trong năm — chỉ sau Tết Nguyên Đán.",
    ],
    meaning: "Ngày của sự tưởng nhớ giữa tiết xuân trong sáng — khi con cháu quay về quét dọn mồ mả, thắp hương và nối lại sợi dây với tổ tiên.",
    traditions: [
      { title: "Tảo mộ", text: "Gia đình về quê vào tuần Thanh minh để quét dọn mồ mả: phát cỏ, đắp đất mới, sửa bia, lau bát hương. Tục lệ coi đó là 'sửa nhà' cho người đã khuất; nhiều nơi nay quy định giờ tảo mộ chung để giữ vệ sinh nghĩa trang." },
      { title: "Dâng hương hoa quả", text: "Sau khi quét tảo, con cháu thắp hương, dâng hoa tươi và đốt vàng mã. Có nơi cúng thêm gà luộc, xôi, chè; xong lễ, mâm cúng được rải một phần lên mộ để 'gửi' cho người thân." },
      { title: "Sum họp, dạo xuân", text: "Thanh minh rơi vào tiết khí thứ năm của mùa xuân — lúc trời sáng đẹp nhất năm — nên chuyến tảo mộ thường kết thúc bằng bữa cơm ngoài trời hoặc cuộc dạo xuân cả gia đình. Người xưa gọi đó là 'vừa tảo mộ, vừa dạo thanh minh'." },
      { title: "Xôi, bánh dân gian", text: "Mỗi miền có món riêng ngày tảo mộ: miền Bắc có xôi gấc, xôi vò và bánh tro tàu nhân mật mía; miền Trung có bánh phu thê, chè kho; miền Nam có chè xoa xoa. Món ăn mộc mạc nhưng ai đi xa cũng nhớ vị ngày Thanh minh." },
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
        { title: "Xôi", img: "amthuc-xoi", text: "Nhiều miền dâng xôi trong ngày tảo mộ — đĩa xôi đặt trước mộ và trên ban thờ nhà." },
        { title: "Bánh nếp dân gian", text: "Bánh khúc ở miền Bắc hay bánh ít, bánh phu thê nơi khác — loại bánh gói lá mang theo buổi tảo mộ.", img: "amthuc-banh-nep" },
        { title: "Hoa quả, rượu nhạt", text: "Mâm trái cây theo mùa, hoa cúc và chén rượu — mâm lễ giản dị của ngày tảo mộ.", img: "amthuc-hoa-qua" },
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
      { q: "Thanh minh nghĩa là gì?", a: "'Thanh minh' là tên một trong 24 tiết khí — tiết khí thứ năm của mùa xuân, khi trời trong sáng, khí trời mát mẻ (chữ Hán nghĩa là 'trong sáng'). Tết trùng tên tiết khí vì tảo mộ thường tổ chức đúng vào tiết này." },
    ],
  },
  {
    slug: "giai-phong-mien-nam",
    heroStyle: "banner",
    signature: [
      {
        kind: "timeline",
        title: "Con đường đến 30/4",
        beats: [
          { year: "1954", title: "Hiệp định Genève", text: "Đất nước tạm chia đôi bờ sông Bến Hải: miền Bắc xây dựng chủ nghĩa xã hội, miền Nam tiếp tục đấu tranh." },
          { year: "1973", title: "Hiệp định Paris", text: "Quân đội Mỹ rút khỏi miền Nam; cục diện chiến trường bắt đầu đổi rõ rệt." },
          { year: "3·1975", title: "Đại thắng mùa xuân", text: "Chiến dịch Hồ Chí Minh mở màn: Ban Mê Thuột, rồi Huế, Đà Nẵng giải phóng chỉ trong vài tuần." },
          { year: "30·4·1975", title: "Xe tăng vào Sài Gòn", text: "Gần trưa, xe tăng húc đổ cổng Dinh Độc Lập — miền Nam hoàn toàn giải phóng, đất nước thống nhất." },
        ],
      },
    ],
    quotes: [
      { text: "Bắc Nam xum họp Xuân nào vui hơn.", author: "Nguyễn Du", work: "Truyện Kiều (vế kết)" },
    ],
    motif: "star",
    name: "Ngày Giải phóng miền Nam 30/4",
    dateMark: "30·04",
    displayDate: "30 tháng 4",
    rule: { type: "solar", month: 4, day: 30 },
    categories: ["quoc-gia"],
    theme: { from: "#b91c1c", to: "#b45309", accent: "#fde047" },
    tagline: "Ngày đất nước thống nhất.",
    history: [
      "Ngày 30/4/1975, xe tăng của quân giải phóng tiến vào Dinh Độc Lập. Trưa cùng ngày, Tổng thống Dương Văn Minh tuyên bố đầu hàng vô điều kiện — chấm dứt 21 năm chia cắt hai miền Nam Bắc.",
      "Đây là mốc kết thúc của chiến dịch Hồ Chí Minh — chiến dịch quân sự lớn nhất kéo dài 55 ngày đêm quyết định kết quả cả cuộc chiến tranh. Từ đó, đất nước thống nhất về lãnh thổ.",
      "Năm 1976, Quốc hội khóa VI chính thức đổi tên nước thành Cộng hòa xã hội chủ nghĩa Việt Nam và đưa Sài Gòn thành Thành phố Hồ Chí Minh. Ngày 30/4 từ đó trở thành ngày lễ lớn — dịp tưởng nhớ hòa bình và những hy sinh để đất nước là một.",
    ],
    meaning: "Ngày của độc lập, thống nhất và lòng biết ơn với những thế hệ đã hy sinh cho đất nước.",
    traditions: [
      { title: "Treo cờ Tổ quốc", text: "Khắp các con phố — nhất là trục Lê Duẩn – Độc Lập ở TP.HCM và các nẻo đường Hà Nội — cờ đỏ sao vàng phủ kín suốt tuần lễ 30/4. Người dân tự treo cờ trước nhà như một lời nhắc lặng lẽ về ngày thống nhất." },
      { title: "Kỷ niệm và diễu binh", text: "Các năm tròn — 40 năm (2015), 50 năm (2025) — tổ chức diễu binh, diễu hành cấp quốc gia tại TP.HCM với hàng chục nghìn người tham gia. Đại lễ 50 năm ngày 30/4/2025 nằm trong số những cuộc diễu binh lớn nhất lịch sử Việt Nam." },
      { title: "Về nguồn", text: "Dịp này, nhiều gia đình cựu chiến binh và đoàn thanh niên về thăm lại chiến trường xưa — địa đạo Củ Chi, Quảng Trị, Trường Sơn — và viếng các nghĩa trang liệt sĩ. Những buổi gặp mặt đồng đội truyền thống diễn ra ở khắp các đơn vị quân đội cũ." },
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
      { q: "Đại lễ 50 năm 30/4/2025 có gì đặc biệt?", a: "Đây là lễ kỷ niệm lớn nhất lịch sử ngày này: diễu binh – diễu hành tại TP.HCM quy tụ hàng chục nghìn quân dân, có thêm khối quân nhân nước ngoài diễu hành cùng và trình diễn không quân — truyền hình trực tiếp toàn quốc." },
    ],
  },
  {
    slug: "quoc-te-lao-dong",
    signature: [
      {
        kind: "timeline",
        title: "Từ Chicago đến khắp thế giới",
        beats: [
          { year: "1·5·1886", title: "Đình công vì ngày 8 giờ", text: "Hơn 300.000 công nhân Mỹ ngừng việc đòi ngày làm 8 tiếng; vụ Haymarket vài hôm sau trở thành biểu tượng của phong trào." },
          { year: "1889", title: "Ngày đoàn kết quốc tế", text: "Đại hội Quốc tế thứ hai tại Paris chọn 1/5 làm ngày chung của công nhân toàn thế giới." },
          { year: "1946", title: "Về đến Việt Nam", text: "Ngày Quốc tế Lao động chính thức có tên trong danh mục ngày nghỉ lễ của nước ta từ đầu thời kỳ độc lập." },
        ],
      },
    ],
    quotes: [
      { text: "Lao động là công danh, vinh dự và sự nghiệp anh hùng.", author: "V. I. Lênin", work: "Câu nói truyền lại về lao động" },
    ],
    motif: "wheat",
    name: "Quốc tế Lao động 1/5",
    dateMark: "01·05",
    displayDate: "1 tháng 5",
    rule: { type: "solar", month: 5, day: 1 },
    categories: ["quoc-gia", "quoc-te"],
    theme: { from: "#9a3412", to: "#0369a1", accent: "#fb923c" },
    tagline: "Tôn vinh người lao động toàn cầu.",
    history: [
      "Ngày 1/5 tưởng nhớ cuộc đấu tranh của công nhân Chicago năm 1886 — khi hàng trăm nghìn người xuống đường đòi ngày làm việc 8 giờ, đỉnh điểm là biến cố Haymarket đầy bi thương.",
      "Năm 1889, Quốc tế thứ hai tuyên bố lấy ngày 1/5 hàng năm làm Ngày Quốc tế Lao động — ngày đoàn kết của người lao động toàn thế giới. Lễ này nhanh chóng lan khắp châu Âu, Á, Mỹ.",
      "Ở Việt Nam, ngày 1/5 được tổ chức từ những năm 1930 trong phong trào công nhân. Ngày nay, Quốc tế Lao động nối liền với ngày Giải phóng 30/4 thành kỳ nghỉ dài nhất mùa xuân — vừa là ngày hội của người lao động, vừa là dịp gia đình đi du lịch.",
    ],
    meaning: "Ngày ghi nhận giá trị của lao động và quyền lợi chính đáng của người làm việc.",
    traditions: [
      { title: "Kỳ nghỉ lễ 30/4–1/5", text: "Hai ngày lễ liền nhau thành kỳ nghỉ dài nhất nửa đầu năm — nhiều gia đình 'ăn lễ' bằng một chuyến du lịch ngắn hoặc về quê thăm nhà. Các điểm biển như Đà Nẵng, Nha Trang, Phú Quốc thường cháy phòng từ cả tháng trước." },
      { title: "Vinh danh lao động tiêu biểu", text: "Công đoàn và doanh nghiệp tuyên dương công nhân giỏi, các sáng kiến cải tiến kỹ thuật; báo chí đăng chuyên đề về người lao động — thợ hàn, bác sĩ vùng sâu, giáo viên vùng cao. Những năm gần đây chủ đề 'người lao động tiên phong' gắn với chuyển đổi số." },
      { title: "Hoạt động của công đoàn", text: "Tháng Công nhân (tháng 5) khởi động ngay sau lễ: thi tay nghề, giải bóng đá công nhân, tư vấn việc làm và các chương trình chăm lo cho công nhân xa quê. Nhiều khu công nghiệp mở 'chợ công nhân' giá rẻ vào dịp này." },
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
      { q: "Có nước nào không nghỉ lễ 1/5 không?", a: "Có. Mỹ và Canada mừng Ngày Lao động (Labor Day) vào thứ Hai đầu tháng 9 thay vì 1/5 — di sản riêng của phong trào công nhân Bắc Mỹ; một số nước khác cũng chọn ngày lao động riêng." },
    ],
  },
  {
    slug: "ngay-cua-me",
    heroStyle: "split",
    signature: [
      {
        kind: "meanings",
        title: "Bông hoa gửi mẹ",
        items: [
          { swatch: "#e11d48", title: "Cẩm chướng đỏ", text: "Lòng biết ơn sâu nhất — từ năm 1908, Anna Jarvis chọn cẩm chướng đỏ làm hoa chính thức của ngày này." },
          { swatch: "#f9a8d4", title: "Cẩm chướng hồng", text: "Dịu dàng và ngọt ngào — bông hoa bà Jarvis từng tặng chính mẹ mình." },
          { swatch: "#fafaf9", title: "Cẩm chướng trắng", text: "Tưởng nhớ mẹ đã khuất — cài bông trắng là một lời nhớ lặng lẽ." },
          { swatch: "#f472b6", title: "Hoa hồng", text: "Yêu thương — hợp tặng vợ, chị hoặc người bạn đời vừa làm mẹ." },
          { swatch: "#a78bfa", title: "Lan, đồng tiền", text: "Sự kính trọng và vẻ tươi tắn — lựa chọn hiện đại bên cạnh cẩm chướng." },
        ],
      },
    ],
    quotes: [
      { text: "Công cha như núi Thái Sơn / Nghĩa mẹ như nước trong nguồn chảy ra.", author: "Ca dao" },
    ],
    motif: "carnation",
    name: "Ngày của Mẹ",
    dateMark: "CN·II",
    displayDate: "Chủ nhật thứ 2 tháng 5",
    rule: { type: "nth-weekday", month: 5, weekday: 0, nth: 2 },
    categories: ["phu-nu", "quoc-te"],
    theme: { from: "#be123c", to: "#db2777", accent: "#fda4af" },
    tagline: "Một ngày trong năm dành riêng cho mẹ.",
    history: [
      "Ngày của Mẹ do Anna Jarvis khởi xướng tại Mỹ — năm 1908, bà tổ chức lễ tưởng niệm mẹ mình tại nhà thờ Grafton, West Virginia, rồi vận động để cả nước có một ngày chung tôn vinh mẹ.",
      "Năm 1914, Tổng thống Woodrow Wilson ký tuyên bố lấy Chủ nhật thứ hai của tháng 5 làm Ngày của Mẹ chính thức của Hoa Kỳ. Từ đó phong tục lan ra hơn 50 quốc gia — mỗi nước một màu sắc riêng nhưng cùng chung lòng biết ơn.",
      "Ở Việt Nam, Ngày của Mẹ du nhập trong thời đại hội nhập và gặp ngay mạch nguồn đạo hiếu sẵn có — từ lễ Vu Lan cài hoa trắng đỏ đến câu ca 'Công cha như núi Thái Sơn'. Ngày này là dịp con cái gửi hoa, quà và những lời chúc đến mẹ.",
    ],
    meaning: "Dịp để nói lời yêu thương với mẹ — người luôn đứng sau mọi bước đi của ta.",
    traditions: [
      { title: "Hoa cẩm chướng cho mẹ", text: "Cẩm chướng gắn với ngày này từ chính người khởi xướng — Anna Jarvis đã gửi hoa cẩm chướng trắng để tưởng nhớ mẹ quá cố; ngày nay cẩm chướng hồng đỏ dành tặng các mẹ còn khỏe. Ở Việt Nam, hoa hồng, hoa lan và bó hoa hỗn hợp được chọn không kém." },
      { title: "Bữa cơm do con nấu", text: "Món quà được khen nhiều nhất trên mạng xã hội mỗi năm là bữa cơm con tự nấu — dù đôi khi 'muối mặn, nước nhạt'. Con ở xa còn hay đặt shipper giao lẩu, gà hầm tận nhà để mẹ khỏi vào bếp ngày này." },
      { title: "Gọi điện về nhà", text: "Với con cái xa nhà, một cuộc gọi video hỏi 'mẹ ăn cơm chưa' là món quà đúng ngày nhất. Các nhà mạng đều có ưu đãi phút gọi dịp này — nhiều người trưởng thành mới nhận ra cuộc gọi ngắn hằng tuần còn quý hơn bất kỳ quà vật chất nào." },
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
      { q: "Vì sao Ngày của Mẹ lại là Chủ nhật thứ hai của tháng 5?", a: "Vì Anna Jarvis — người Mỹ khởi xướng ngày này — chọn Chủ nhật gần ngày mẹ bà mất (ngày 9/5/1905) để mọi gia đình dễ sum họp; năm 1914, Tổng thống Wilson chính thức ấn định Chủ nhật thứ hai tháng 5 là Ngày của Mẹ tại Mỹ và thế giới theo sau." },
    ],
  },
  {
    slug: "quoc-te-thieu-nhi",
    heroStyle: "split",
    signature: [
      {
        kind: "steps",
        title: "Một ngày của bé",
        steps: [
          { icon: "flag", title: "Lễ khai hội", text: "Trường học và cung thiếu nhi mở cổng rộn rã — cờ hoa, trống hội và những tiết mục do chính các bé trình bày." },
          { icon: "ribbon", title: "Quà và lời chúc", text: "Ba mẹ tặng quà nhỏ, thầy cô gửi điều hay — ngày này trẻ em là nhân vật chính thật sự." },
          { icon: "balloon", title: "Trò chơi dân gian", text: "Nhảy bao bố, kéo co, tò he, đập đất nảy lửa — những trò chơi ông cha từng chơi vẫn sống trong sân trường." },
          { icon: "star", title: "Tiệc ngọt kết ngày", text: "Kem, bánh và pháo bông giấy kết thúc ngày hội — kỷ niệm ngọt mà đứa trẻ nào cũng mang theo lớn lên." },
        ],
      },
    ],
    quotes: [
      { text: "Trẻ em như búp trên cành / Biết ăn, biết ngủ, biết học hành là ngoan.", author: "Hồ Chí Minh", work: "Thơ gửi các cháu" },
    ],
    motif: "balloon",
    name: "Quốc tế Thiếu nhi 1/6",
    dateMark: "01·06",
    displayDate: "1 tháng 6",
    rule: { type: "solar", month: 6, day: 1 },
    categories: ["quoc-te"],
    theme: { from: "#0369a1", to: "#b45309", accent: "#fde047" },
    tagline: "Ngày của trẻ thơ.",
    history: [
      "Ngày Quốc tế Thiếu nhi được chọn từ Đại hội thế giới về phúc lợi trẻ em ở Geneva năm 1925 — lần đầu tiên các quốc gia cùng tuyên bố trẻ em có quyền được chăm sóc, giáo dục và bảo vệ.",
      "Năm 1949, Đại hội phụ nữ quốc tế ở Moskva quyết định lấy ngày 1/6 làm Ngày Quốc tế Thiếu nhi — đồng thời tưởng nhớ thảm kịch Lidice, ngôi làng bị phát xít hủy diệt cùng tất cả trẻ em trong chiến tranh.",
      "Ở Việt Nam, Bác Hồ từ năm 1949 đã gửi thư cho thiếu nhi nhân mỗi dịp Tết Trung thu và năm học mới — 'non sông Việt Nam có trở nên tươi đẹp hay không chính là nhờ công học tập của các cháu'. Ngày 1/6 là mùa quà, múa hát và hội diễn của trẻ em cả nước.",
    ],
    meaning: "Ngày nhắc nhở xã hội bảo vệ, yêu thương và đầu tư cho thế hệ tương lai.",
    traditions: [
      { title: "Vui chơi tại trường", text: "Sáng 1/6 — thường dời về cuối tuần gần nhất — trường mầm non, tiểu học tổ chức ngày hội: trò chơi dân gian, văn nghệ do chính các bé biểu diễn, phát thưởng cuối năm học. Ký ức 'ngày hội trường' gắn với tiếng trống hội, quẩy tung nước và những bông hồng giấy." },
      { title: "Quà cho bé", text: "Quà 1/6 kinh điển là đồ chơi, truyện tranh, cặp sách — nhiều bố mẹ nay chọn sách và đồ chơi STEM thay vì đồ điện tử. Trung tâm thương mại, cửa hàng đồ chơi dựng khu vui chơi và ưu đãi riêng suốt cả tuần lễ." },
      { title: "Hoạt động thiện nguyện", text: "Dịp này, các tổ chức thiện nguyện, quỹ nhi đồng và đoàn thanh niên tặng quà cho trẻ em khó khăn — bệnh viện nhi, làng SOS, trẻ em vùng bão lũ. Nhiều chương trình gây quỹ quà Tết cho trẻ nghèo cũng khởi động từ mùa hè." },
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
      { q: "1/6 khác Ngày Quyền trẻ em thế giới thế nào?", a: "1/6 là Ngày Quốc tế Thiếu nhi do Quốc tế Phụ nữ Dân chủ đề xuất năm 1949, được nhiều nước (gồm Việt Nam) hưởng ứng. Liên Hợp Quốc lại chọn 20/11 làm Ngày Quyền trẻ em thế giới — kỷ niệm Công ước Quyền trẻ em 1989; cả hai ngày đều được nhắc tới." },
    ],
  },
  {
    slug: "ngay-gia-dinh-viet-nam",
    heroStyle: "split",
    signature: [
      {
        kind: "steps",
        title: "Mâm cơm sum họp",
        steps: [
          { icon: "home", title: "Cùng đi chợ", text: "Chọn món từng người thích — mâm cơm gia đình ngon nhất khi ai cũng có một món dành riêng cho mình." },
          { icon: "heart", title: "Nấu cùng nhau", text: "Chia việc ra mà làm: người nhặt rau, người trông nồi, bé xếp đũa — bếp đông mới là bếp có Tết." },
          { icon: "temple", title: "Đủ mặt mới động đũa", text: "Phép lịch sự đầu bàn: đợi đủ người, mời người lớn trước — mâm cơm dạy trẻ điều đầu tiên về tôn ti." },
          { icon: "book", title: "Chuyện một ngày", text: "Bàn ăn là nơi mỗi người kể lại ngày của mình — gia đình gắn nhau bằng những câu chuyện rất nhỏ." },
        ],
      },
    ],
    quotes: [
      { text: "Anh em như thể tay chân / Rách lành đùm bọc, dở hay đỡ đần.", author: "Ca dao" },
    ],
    motif: "home",
    name: "Ngày Gia đình Việt Nam",
    dateMark: "28·06",
    displayDate: "28 tháng 6",
    rule: { type: "solar", month: 6, day: 28 },
    categories: ["quoc-gia"],
    theme: { from: "#065f46", to: "#c2410c", accent: "#fdba74" },
    tagline: "Tổ ấm của mỗi người Việt.",
    history: [
      "Ngày Gia đình Việt Nam được chọn vào ngày 28/6 hàng năm theo quyết định của Thủ tướng năm 2001 — nhằm tôn vinh gia đình như tế bào của xã hội, nguồn nuôi dưỡng nhân cách và bản sắc dân tộc.",
      "Qua hàng nghìn năm, gia đình Việt Nam là nơi truyền tục đạo hiếu — 'Công cha như núi Thái Sơn, nghĩa mẹ như nước trong nguồn chảy ra' — và là đơn vị kinh tế, giáo dục, tâm linh quan trọng nhất của cộng đồng.",
      "Ngày nay, Ngày Gia đình được tổ chức bằng những chương trình tôn vinh gia đình văn hóa, gia đình hạnh phúc khắp cả nước — lời nhắc rằng trong mọi biến đổi, bữa cơm sum họp vẫn là trái tim của đời sống Việt.",
    ],
    meaning: "Nhắc mỗi người trân trọng tổ ấm của mình — nơi bắt đầu và quay về của mọi hành trình.",
    traditions: [
      { title: "Bữa cơm sum họp", text: "Ngày này không có nghi lễ chuẩn — 'nghi lễ' của nó chính là bữa cơm cả nhà ăn cùng nhau, lời nhắc về giá trị 'bữa cơm gia đình' giữa nhịp sống bận rộn. Bộ VHTTDL từng phát động chiến dịch 'Giờ cơm gia đình' 18h–19h30 không điện thoại." },
      { title: "Ảnh gia đình", text: "Nhiều gia đình chọn ngày này đi chụp bộ ảnh chung — ở studio, ở công viên, hoặc chỉ là tấm ảnh selfie quanh mâm cơm. Các chương trình truyền hình và cuộc thi ảnh 'gia đình hạnh phúc' thường tổ chức quanh ngày 28/6." },
      { title: "Câu chuyện thế hệ", text: "Ngày Gia đình là dịp để ông bà kể chuyện xưa, mở ảnh cưới, gia phả cho con cháu xem — buổi 'truyền thống gia đình' mà hiếm ngày nào ngồi lại được với nhau. Nhiều trường học giao bài tập 'phỏng vấn ông bà' vào đúng tuần này." },
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
      { q: "Ngày Gia đình Việt Nam khác Ngày Gia đình quốc tế thế nào?", a: "Ngày Gia đình quốc tế của Liên Hợp Quốc là 15/5 (từ 1994). Việt Nam có ngày riêng — 28/6 theo Quyết định 72/2001/QĐ-TTg — gắn với truyền thống 'gia đình là tế bào của xã hội'; nước ta quan sát cả hai ngày." },
    ],
  },
  {
    slug: "thuong-binh-liet-si",
    heroStyle: "poster",
    signature: [
      {
        kind: "steps",
        title: "Ngọn nến tri ân",
        steps: [
          { icon: "candle", title: "Thắp nến ở nghĩa trang", text: "Tối 26 rạng 27/7, những ngọn nến được thắp trên khắp các nghĩa trang liệt sĩ — mỗi nấm mộ một ngọn sáng nhỏ." },
          { icon: "lotus", title: "Dâng hương bái liệt sĩ", text: "Gia đình và cơ quan đến bia mộ, đài tưởng niệm dâng hương — đọc từng cái tên để không ai bị quên." },
          { icon: "heart", title: "Thăm gia đình chính sách", text: "Đến tận nhà thương binh, mẹ liệt sĩ — hỏi han sức khỏe và hỗ trợ thật sự chứ không chỉ lời chúc." },
          { icon: "book", title: "Tìm mộ, hồi hương", text: "Nhiều gia đình vẫn tìm mộ thân nhân; công tác quy tập hài cốt liệt sĩ vẫn tiếp tục mỗi năm." },
        ],
      },
    ],
    quotes: [
      { text: "Tổ quốc, đồng bào phải biết ơn, phải giúp đỡ những người con anh dũng ấy.", author: "Hồ Chí Minh", work: "Thư ngày Thương binh toàn quốc, 27·7·1947" },
    ],
    motif: "candle",
    name: "Ngày Thương binh Liệt sĩ",
    dateMark: "27·07",
    displayDate: "27 tháng 7",
    rule: { type: "solar", month: 7, day: 27 },
    categories: ["quoc-gia"],
    theme: { from: "#881337", to: "#292524", accent: "#fca5a5" },
    tagline: "Đền ơn đáp nghĩa.",
    history: [
      "Ngày Thương binh Liệt sĩ bắt đầu từ năm 1947 — giữa cuộc kháng chiến chống Pháp, Chính phủ chọn ngày 27/7 để toàn dân nhớ đến những người đã ngã xuống vì độc lập.",
      "Từ 'Ngày Thương binh' ban đầu, ngày 27/7 mở rộng thành ngày tri ân chung cho thương binh, bệnh binh, gia đình liệt sĩ và những người có công với cách mạng — triệu gia đình đã hy sinh người thân qua hai cuộc chiến tranh.",
      "Câu 'uống nước nhớ nguồn' trở thành tinh thần của ngày lễ: nến tri ân thắp khắp nghĩa trang liệt sĩ, những đoàn về nguồn, những phần quà gửi đến mẹ Việt Nam anh hùng — lời cảm ơn của một dân tộc biết nhớ ơn.",
    ],
    meaning: "Ngày tri ân những người đã đổi máu xương cho hòa bình hôm nay.",
    traditions: [
      { title: "Viếng nghĩa trang liệt sĩ", text: "Hàng triệu người đến nghĩa trang liệt sĩ địa phương trong tuần lễ 27/7 — thắp hương, lau mộ, đọc tên trên từng bia đá. Ở Quảng Trị, hai nghĩa trang lớn Trường Sơn và Đường 9 đón những đoàn cựu chiến binh tóc bạc đông nhất năm." },
      { title: "Thăm gia đình chính sách", text: "Tinh thần 'đền ơn đáp nghĩa' thành việc làm cụ thể: địa phương, doanh nghiệp, trường học đi thăm mẹ Việt Nam anh hùng, thương binh, gia đình liệt sĩ — tặng quà, sửa nhà tình nghĩa, cấp sổ bảo hiểm tận tay." },
      { title: "Đèn tri ân", text: "Tối 26/7, nghi thức thắp nến tri ân lan từ nghĩa trang quốc gia đến những ngôi mộ liệt sĩ trong đình làng — hàng nghìn ngọn nến thắp cùng một giờ. Hình ảnh 'biển nến' tại nghĩa trang Trường Sơn là khoảnh khắc xúc động nhất của năm." },
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
      { q: "Nghi thức thắp nến tri ân bắt đầu từ khi nào?", a: "Từ đề xuất của nhà báo – đại tá Ngô Thế Vinh (cựu chiến binh Sư đoàn 9): đêm trước ngày 27/7, mỗi người dân thắp một ngọn nến trước mộ liệt sĩ hoặc ban thờ trong nhà. Tục lệ lan rộng khắp nước và thường tổ chức tối 26/7." },
    ],
  },
  {
    slug: "vu-lan",
    heroStyle: "framed",
    signature: [
      {
        kind: "legend",
        title: "Mục Liên cứu mẹ",
        lead: "Tôn giả Mục Kiền Liên tu hành thành đạt quả, dùng thần thông tìm mẹ vừa mất — và thấy bà phải đọa kiếp ngạ quỷ.",
        paragraphs: [
          "Ngài dâng cơm lên cho mẹ, nhưng bà vì lòng tham đời trước nên thức ăn hóa than hồng, lửa cháy bỏng đầy miệng. Mục Liên đau đớn trở về van cầu Đức Phật chỉ đường cứu mẹ.",
          "Phật dạy: muốn cứu một lòng hiếu cũng không đủ — hãy cúng dường chư tăng đang tự tứ mãn hạ vào rằm tháng Bảy, nhờ uy thần chúng sẽ cứu được người mẹ khỏi kiếp đói khát. Từ đó, rằm tháng Bảy thành mùa Vu Lan — mùa báo hiếu của con cháu muôn đời.",
        ],
      },
      {
        kind: "meanings",
        title: "Bông hồng cài áo",
        items: [
          { swatch: "#e11d48", title: "Hồng đỏ", text: "Mẹ cha còn trên đời — cài bông đỏ lên ngực áo như lời cảm ơn có mẹ có cha." },
          { swatch: "#fafaf9", title: "Hồng trắng", text: "Mẹ đã khuất — bông trắng nhắc mình sống sao cho xứng công sinh thành." },
          { swatch: "#facc15", title: "Hồng vàng", text: "Ở một số chùa, bông vàng cho người chỉ còn cha hoặc còn mẹ — nửa niềm may vẫn giữ lại." },
        ],
      },
    ],
    quotes: [
      { text: "Con dù lớn vẫn là con của mẹ / Đi hết đời lòng mẹ vẫn theo con.", author: "Ca dao" },
    ],
    motif: "lotus",
    name: "Lễ Vu Lan",
    dateMark: "15·07",
    displayDate: "15/7 Âm lịch",
    rule: { type: "lunar", month: 7, day: 15 },
    categories: ["truyen-thong", "phu-nu"],
    theme: { from: "#4c1d95", to: "#b45309", accent: "#fcd34d" },
    tagline: "Mùa báo hiếu.",
    history: [
      "Lễ Vu Lan bắt nguồn từ câu chuyện tôn giả Mục Kiền Liên — người con đại hiếu đã vượt qua cả địa ngục để cứu mẹ khỏi kiếp đói khổ, và được Đức Phật chỉ cách cúng chúng tăng ngày rằm tháng 7.",
      "Du nhập vào Việt Nam từ hơn nghìn năm trước, Vu Lan hòa với đạo lý hiếu bản địa để trở thành mùa báo hiếu lớn nhất năm — song hành cùng lễ xá tội vong nhân của dân gian.",
      "Tục cài bông hồng lên áo do Thiền sư Thích Nhất Hạnh khởi xướng ở Huế những năm 1960: đỏ nếu còn mẹ, trắng nếu mẹ đã mất. Một bông hoa nhỏ trên ngực áo đã trở thành nghi thức cảm động nhất của mùa hiếu hạnh Việt.",
    ],
    meaning: "Mùa để nhớ về công ơn cha mẹ và báo hiếu những người sinh thành.",
    traditions: [
      { title: "Cài hoa hồng lên áo", text: "Tục cài hoa hồng lên áo khi lễ chùa Vu Lan — hồng cho người còn mẹ, trắng cho người không còn mẹ — do Thiền sư Thích Nhất Hạnh khởi xướng ở Huế năm 1962. Hơn nửa thế kỷ sau, cánh hoa nhỏ trên áo là hình ảnh quen thuộc nhất của ngày báo hiếu." },
      { title: "Đi chùa lễ Vu Lan", text: "Rằm tháng 7, các chùa tổ chức lễ Vu Lan báo hiếu: tụng kinh, trao bông hồng, nghe giảng về công ơn cha mẹ qua kinh Vu Lan Bồn — câu chuyện Mục Kiền Liên cứu mẹ. Lễ đông nhất thường vào đúng rằm hoặc chủ nhật gần nhất." },
      { title: "Cúng rằm tháng 7", text: "Song song lễ chùa, nhà nào cũng sắm mâm rằm tháng 7 cúng gia tiên — nhiều nơi thêm 'mâm cúng cô hồn' bày ngoài cổng vào chiều tối với cháo loãng, muối, tiền vàng. Tục xá tội vong, bố thí chúng sinh đi đôi với lòng từ bi của ngày này." },
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
        { title: "Cài bông hồng lên áo", text: "Trong lễ Vu Lan tại chùa, người đến lễ được cài một bông hồng: đỏ cho người còn mẹ, trắng cho người đã mất mẹ — giây phút xúc động nhất của lễ.", img: "phongtuc-bong-hong" },
        { title: "Đi chùa lễ Vu Lan", text: "Rằm tháng 7, chùa khắp nước tổ chức đại lễ: tụng kinh Vu Lan, nghe pháp thoại về mẹ, sám hối và báo hiếu." },
        { title: "Cúng gia tiên", text: "Mâm cỗ dâng ông bà, cha mẹ hai bên — cầu người còn sống được bình an, người đã mất được siêu thoát." },
        { title: "Xá tội vong nhân", text: "Tục cúng cô hồn: cháo trắng, muối, hoa quả đặt ngoài sân cho vong linh lang thang — lòng từ bi gửi cả những linh hồn không nơi nương tựa." },
        { title: "Phóng sinh, bố thí", text: "Thả chim, thả cá, cho ăn người nghèo — tích đức rồi hồi hướng công đức cho cha mẹ hai bên." },
        { title: "Về thăm cha mẹ", text: "Vu Lan ngày nay cũng là 'Ngày của Mẹ Á Đông': con xa quê về thăm, ôm mẹ một cái — món quà báo hiếu giản dị nhất." },
      ],
      amThuc: [
        { title: "Mâm cỗ chay", text: "Nhiều nhà ăn chay rằm tháng 7: đậu hũ, nấm, rau củ, chè — thanh tịnh thân tâm để hồi hướng cha mẹ.", img: "amthuc-mam-co-chay" },
        { title: "Cháo trắng, muối cúng cô hồn", img: "amthuc-chao-trang", text: "Cháo loãng, muối tiêu, gạo đường — lễ vật giản dị của mâm xá tội vong nhân đặt ngoài sân." },
        { title: "Hoa quả tươi dâng Phật", text: "Trái cây đầu mùa và hoa sen dâng lên tam bảo — 'trái cây ngoài vườn' thay cho lễ vật xa hoa.", img: "amthuc-dang-phat" },
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
      { q: "Tục cài hoa hồng có từ bao giờ?", a: "Từ năm 1962, khi Thiền sư Thích Nhất Hạnh tổ chức lễ Vu Lan tại chùa Từ Hiếu (Huế) và đề xuất cài bông hồng lên áo: hồng nếu còn mẹ, trắng nếu đã mất. Nghi thức này nay phổ biến ở hầu hết chùa trên cả nước." },
    ],
  },
  {
    slug: "quoc-khanh",
    heroStyle: "banner",
    signature: [
      {
        kind: "timeline",
        title: "Bốn phút đọc Tuyên ngôn",
        beats: [
          { year: "19·8·1945", title: "Thắng lợi ở Hà Nội", text: "Tổng khởi nghĩa giành chính quyền ở Thủ đô — cả nước nối gót nhau vùng dậy trong hai tuần cuối tháng Tám." },
          { year: "29·8·1945", title: "Chính phủ lâm thời", text: "Chính phủ lâm thời nước Việt Nam Dân chủ Cộng hòa ra mắt; vua Bảo Đại thoái vị làm công dân." },
          { year: "2·9·1945", title: "Ba Đình lịch sử", text: "Trước nửa triệu người ở quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập — nước Việt Nam Dân chủ Cộng hòa ra đời." },
          { year: "14 giờ", title: "Khoảnh khắc nghe thấy", text: "Bản Tuyên ngôn dài vỏn vẹn một trang — đọc chưa đầy bốn phút — nhưng khép lại 80 năm mất nước." },
        ],
      },
      {
        kind: "meanings",
        title: "Những 'ngày một' của nước non trẻ",
        items: [
          { swatch: "#da251d", title: "Quốc kỳ", text: "Cờ đỏ sao vàng lần đầu được công nhận là quốc kỳ chính thức của một nhà nước độc lập." },
          { swatch: "#fbbf24", title: "Quốc tế ca", text: "Bài 'Tiến quân ca' của Văn Cao được chọn làm quốc ca — hát lên trong chính ngày Tuyên ngôn." },
          { swatch: "#1d4ed8", title: "Cuốc và búa", text: "Quốc huy đầu tiên: lúa vàng — thức ăn, cuốc — công cụ, búa — công nhân; người lao động là chủ nước." },
        ],
      },
    ],
    quotes: [
      { text: "Hôm nay sáng mồng Hai tháng Chín / Thủ đô hoa vàng nắng Ba Đình.", author: "Tố Hữu", work: "Theo chân Bác" },
      { text: "Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do độc lập.", author: "Hồ Chí Minh", work: "Tuyên ngôn Độc lập, 2·9·1945" },
    ],
    motif: "flag",
    name: "Quốc khánh 2/9",
    dateMark: "02·09",
    displayDate: "2 tháng 9",
    rule: { type: "solar", month: 9, day: 2 },
    categories: ["quoc-gia"],
    theme: { from: "#b91c1c", to: "#b45309", accent: "#fde047" },
    tagline: "Ngày nước Việt Nam ra đời.",
    history: [
      "Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại quảng trường Ba Đình trước hàng trăm nghìn người dân — khai sinh nước Việt Nam Dân chủ Cộng hòa, nhà nước dân chủ nhân dân đầu tiên ở Đông Nam Á.",
      "Bản Tuyên ngôn mở đầu bằng những lời bất hủ của Tuyên ngôn Độc lập Hoa Kỳ 1776 và Tuyên ngôn Nhân quyền Pháp 1791 — 'tất cả các dân tộc trên thế giới đều sinh ra bình đẳng'. Sau gần một thế kỷ thuộc địa, Việt Nam chính thức lấy lại độc lập.",
      "Quốc khánh 2/9 là ngày lễ lớn nhất của đất nước — dịp diễu hành, bắn pháo hoa và tưởng nhớ những người đã ngã xuống cho nền độc lập hôm nay.",
    ],
    meaning: "Ngày của niềm tự hào dân tộc và khát vọng hòa bình, phát triển.",
    traditions: [
      { title: "Diễu binh 2/9", text: "Các năm tròn — 70 năm (2015), 80 năm (2025) — tổ chức diễu binh, diễu hành tại quảng trường Ba Đình, đúng nơi Bác Hồ đọc Tuyên ngôn Độc lập. Diễu binh A80 năm 2025 quy tụ hàng chục nghìn quân dân và được truyền hình trực tiếp toàn quốc." },
      { title: "Pháo hoa", text: "Đêm 2/9, Hà Nội và TP.HCM bắn pháo hoa nhiều điểm — riêng cầu sông Hàn (Đà Nẵng) là nơi ngắm pháo đẹp nhất nước. Từ năm 2022, nhiều địa phương thay pháo tầm cao bằng trình diễn drone light tại các quảng trường." },
      { title: "Phố phường treo cờ", text: "Từ cuối tháng 8, cờ Tổ quốc phủ kín phố phường — ngõ nhỏ nhất cũng đỏ rực, người dân tự treo cờ trước nhà. Ảnh 'phố cờ đỏ' quanh Nhà hát Lớn và phố cổ Hà Nội là khung hình Quốc khánh quen thuộc nhất." },
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
      { q: "Diễu binh Quốc khánh diễn ra ở đâu?", a: "Tại quảng trường Ba Đình – trước Lăng Chủ tịch Hồ Chí Minh, nơi Bác đọc Tuyên ngôn Độc lập ngày 2/9/1945. Diễu binh chỉ tổ chức vào các năm tròn (60, 70, 80 năm), mới nhất là diễu binh A80 năm 2025." },
    ],
  },
  {
    slug: "trung-thu",
    heroStyle: "mosaic",
    signature: [
      {
        kind: "legend",
        title: "Chú Cuội và cây đa trăm tuổi",
        lead: "Cuội có cây đa thần — lá nó cứu sống được cả người chết — nhưng phải tưới bằng nước sạch.",
        paragraphs: [
          "Một hôm vợ Cuội tưới nhầm nước bẩn, cây đa bứt rễ bay thẳng lên trời. Cuội níu gốc theo, cả người lẫn cây đậu xuống cung trăng — từ đó trăng rằm nào cũng thấy bóng dáng chú Cuội ngồi gốc đa nhìn về trần.",
          "Trẻ con đi rước đèn trung thu đều ngẩng lên tìm vệt đen trong mặt trăng: nếu đêm nay trăng sáng, chú Cuội cũng đang ngóng chờ cùng mình.",
        ],
      },
      {
        kind: "steps",
        title: "Phá cỗ trông trăng",
        steps: [
          { icon: "moonstar", title: "Bày mâm cỗ dưới trăng", text: "Bánh nướng, bánh dẻo, bưởi hồng đào, hồng, chuối và cốm đầu mùa xếp thành mâm cỗ trước sân." },
          { icon: "star", title: "Rước đèn ông sao", text: "Đèn ông sao năm cánh, đèn cá chép, đèn kéo quân — đoàn rước đèn của trẻ con vang trống đi khắp phố." },
          { icon: "heart", title: "Bày chữ bằng quả", text: "Trên mâm cỗ xếp chữ bằng đậu xanh hay thịt quả — 'phúc', 'lộc', 'thọ' — lời cầu nguyện làm bằng tay." },
          { icon: "book", title: "Bẻ bánh, phá cỗ", text: "Cuối đêm bánh trung thu được bẻ ra chia nhau — 'phá cỗ' để nhận phần trăng của riêng mình." },
        ],
      },
    ],
    quotes: [
      { text: "Chiếc đèn ông sao, sao năm cánh tươi màu.", author: "Phạm Tuyên", work: "Chiếc đèn ông sao, 1956" },
      { text: "Tuổi nhỏ làm việc nhỏ, tùy theo sức của mình.", author: "Hồ Chí Minh", work: "Thư Trung thu gửi các cháu, 1952" },
    ],
    motif: "moonstar",
    name: "Tết Trung thu",
    dateMark: "15·08",
    displayDate: "15/8 Âm lịch",
    rule: { type: "lunar", month: 8, day: 15 },
    categories: ["truyen-thong"],
    theme: { from: "#7c2d12", to: "#7c3aed", accent: "#fdba74" },
    tagline: "Tết đoàn viên dưới ánh trăng.",
    history: [
      "Tết Trung thu — rằm tháng 8 âm lịch — xuất phát từ tục ngắm trăng mừng mùa của nền văn minh lúa nước Á Đông, khi vụ thu hoàng thạch kết thúc và trăng đẹp nhất năm.",
      "Trong khi các nước chịu ảnh hưởng Trung Hoa coi Trung thu là lễ của người lớn và đoàn viên gia đình, Việt Nam đã làm nên một nét rất riêng: đây là 'Tết của trẻ em' — đêm rước đèn, múa lân, phá cỗ do các cháu làm chủ.",
      "Bánh trung thu nướng và dẻo, đèn ông sao, chị Hằng và chú Cuội trên mặt trăng — bộ ký hiệu văn hóa gắn với tuổi thơ của mọi thế hệ Việt Nam.",
    ],
    meaning: "Đêm trăng tròn của sự sum họp — người lớn nhớ quê, trẻ nhỏ mong đèn ông sao.",
    traditions: [
      { title: "Phá cỗ ngắm trăng", text: "Đêm rằm tháng 8, mâm cỗ bày bưởi tạt đầu 'thuyền', nải chuối, bánh nướng bánh dẻo xếp thành hình — trẻ em 'phá cỗ' lúc gần nửa đêm để lấy may. Người lớn uống trà ngắm trăng trong khi trẻ con tranh nhau miếng đuôi thuyền bưởi." },
      { title: "Rước đèn ông sao", text: "Đèn ông sao giấy bói đủ màu, đèn cá chép, đèn kéo quân — từng tốp trẻ em tay đèn đi rước quanh ngõ phố đêm rằm. Đèn pin nhạc điện tử phổ biến hơn ngày nay, nhưng Hội An và nhiều phố cổ vẫn giữ đèn giấy truyền thống." },
      { title: "Múa lân", text: "Đoàn lân sư rồng đi từng tổ dân phố, trống rộn rã, múa lân hái 'lộc' treo trước các cửa hàng — tiếng trống lân là âm thanh báo hiệu Trung thu về. Trẻ con kéo nhau đi xem lân đến khuya — ký ức chung của nhiều thế hệ." },
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
        { title: "Rước đèn ông sao", text: "Trẻ em rước đèn giấy, đèn ông sao đi từng đoàn trong đêm rằm — ánh nến, đèn pin và tiếng hát 'rước đèn tháng tám'.", img: "phongtuc-den-ong-sao" },
        { title: "Múa lân", text: "Tiếng trống lân giòn giã khắp phố; đoàn lân đến từng nhà múa chúc phúc, trẻ con ùa theo xem náo nhiệt." },
        { title: "Làm đèn lồng thủ công", text: "Trước Trung thu, nhiều nhà và trường học dạy làm đèn giấy, đèn ông sao — giữ nghề lồng đèn truyền thống." },
        { title: "Bày mâm cỗ trăng", text: "Bày bưởi thành chóp, trái cây thành hình con vật — mâm cỗ Trung thu là nghệ thuật bày biện của dân gian.", img: "amthuc-mam-trai-cay" },
        { title: "Uống trà ngắm trăng", text: "Người lớn ngồi trò chuyện bên ấm trà nóng và đĩa bánh dẻo — 'uống trà ngắm trăng' là nét thưởng thức mùa thu.", img: "amthuc-tra" },
      ],
      amThuc: [
        { title: "Bánh nướng", img: "amthuc-banh-nuong", text: "Vỏ bánh màu cánh gián hồng óng, nhân thập cẩm, hạt sen, trứng muối — chiếc bánh 'đậm' của Trung thu." },
        { title: "Bánh dẻo", img: "amthuc-banh-deo", text: "Vỏ bột nếp trắng mềm, nhân sen hoặc đậu xanh — bánh 'thanh' ăn cùng trà nóng." },
        { title: "Trà ngắm trăng", img: "amthuc-tra", text: "Không mâm cỗ nào thiếu ấm trà — trà sen, trà lài xát đi vị ngọt của bánh." },
        { title: "Mâm trái cây mùa thu", img: "amthuc-mam-trai-cay", text: "Bưởi bày chóp, hồng, na, chuối — mâm trái cây dâng trăng rồi cả nhà cùng phá cỗ." },
        { title: "Bánh in, kẹo bò cốm", text: "Bánh in hình cá chép, con cua và kẹo bò cốm — những món 'bé tẹo' trong mâm cỗ của các cháu.", img: "amthuc-banh-in" },
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
      { q: "Trung thu khác Tết Thiếu nhi 1/6 thế nào?", a: "1/6 là ngày quốc tế của trẻ em nói chung, còn Trung thu (rằm tháng 8 âm lịch) là tết truyền thống gắn với mâm cỗ trăng, bánh trung thu và rước đèn — từ xưa được gọi là 'Tết của thiếu nhi' vì các bé là nhân vật chính của đêm hội." },
    ],
  },
  {
    slug: "phu-nu-viet-nam",
    heroStyle: "mosaic",
    signature: [
      {
        kind: "timeline",
        title: "Hai Bà Trưng đến Hội Phụ nữ Việt Nam",
        beats: [
          { year: "Năm 40", title: "Khởi nghĩa Hai Bà Trưng", text: "Trưng Trắc, Trưng Nhị dựng cờ khởi nghĩa ở Mê Linh, lập chính quyền tự chủ — nữ tướng đầu tiên của sử Việt." },
          { year: "1930", title: "Hội Phụ nữ ra đời", text: "Ngày 20/10/1930, Hội Liên hiệp Phụ nữ Việt Nam thành lập — tổ chức của phụ nữ, vì phụ nữ." },
          { year: "1965", title: "Tám chữ vàng", text: "Bác Hồ tặng phụ nữ miền Nam bức trướng 'Anh hùng — Bất khuất — Trung hậu — Đảm đang' — thành đức tính của phụ nữ Việt." },
          { year: "Nay", title: "Ngày của bà, mẹ, chị, em", text: "20/10 trở thành ngày phụ nữ Việt được nhận hoa, lời chúc và sự trân trọng từ cả nước." },
        ],
      },
    ],
    quotes: [
      { text: "Non sông gấm vóc Việt Nam do phụ nữ ta, trẻ cùng già, ra sức dệt thêu mà thêm tốt đẹp, rực rỡ.", author: "Hồ Chí Minh" },
    ],
    motif: "ribbon",
    name: "Ngày Phụ nữ Việt Nam 20/10",
    dateMark: "20·10",
    displayDate: "20 tháng 10",
    rule: { type: "solar", month: 10, day: 20 },
    categories: ["phu-nu", "quoc-gia"],
    theme: { from: "#be123c", to: "#a21caf", accent: "#f9a8d4" },
    tagline: "Tôn vinh phụ nữ Việt Nam.",
    history: [
      "Ngày Phụ nữ Việt Nam 20/10 kỷ niệm ngày thành lập Hội Phụ nữ phản đế Việt Nam — tiền thân của Hội Liên hiệp Phụ nữ Việt Nam ngày nay — vào năm 1930, tổ chức phụ nữ quần chúng đầu tiên của dân tộc.",
      "Lịch sử phụ nữ Việt Nam có truyền thống anh hùng riêng từ thuở Hai Bà Trưng, Bà Triệu — những người phụ nữ đầu tiên đứng lên chống ngoại xâm. Tổ chức năm 1930 là mắt xích tiếp nối truyền thống ấy vào thời đại mới.",
      "Khác với 8/3 quốc tế, 20/10 là ngày riêng của phụ nữ Việt — hoa, quà và lời chúc từ đàn ông gửi đến mẹ, vợ, chị em, đồng nghiệp. Đây là ngày thị trường hoa sôi động nhất năm của cả nước.",
    ],
    meaning: "Ngày riêng của phụ nữ Việt — tri ân sự hy sinh, bản lĩnh và vẻ đẹp của một nửa thế giới.",
    traditions: [
      { title: "Tặng hoa, tặng quà", text: "Giống 8/3, hoa và quà đổ về tay các bà, các mẹ, các chị — nhưng 20/10 là ngày 'của nhà mình', riêng của Việt Nam. Chợ hoa và cửa hàng quà tặng đông đúc nhất vào tối 19 và sáng 20." },
      { title: "Vinh danh phụ nữ tiêu biểu", text: "Ngày này gắn với lịch sử Hội Liên hiệp Phụ nữ Việt Nam — thành lập 20/10/1930. Các cơ quan tổ chức gặp mặt, tuyên dương mẹ Việt Nam anh hùng, nữ khoa học gia, nữ doanh nhân tiêu biểu suốt tuần lễ." },
      { title: "Nam giới vào bếp", text: "Trào lưu 'nam giới đảm đang' ngày 20/10: chồng nấu bữa tối, con trai phụ rửa bát — bữa cơm do đàn ông làm trở thành món quà thiết thực nhất. 'Đàn ông Việt Nam vào bếp ngày 20/10' dần thành 'tục lệ' mới được hưởng ứng." },
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
      { q: "Ngày 20/10 gắn với tổ chức nào?", a: "Gắn với Hội Liên hiệp Phụ nữ Việt Nam — thành lập ngày 20/10/1930 với tên đầu tiên là Hội Phụ nữ phản đế Việt Nam. Ngày thành lập Hội trở thành Ngày Phụ nữ Việt Nam, riêng biệt với ngày quốc tế 8/3." },
    ],
  },
  {
    slug: "nha-giao-viet-nam",
    heroStyle: "split",
    signature: [
      {
        kind: "steps",
        title: "Nghi thức tri ân thầy cô",
        steps: [
          { icon: "book", title: "Thăm thầy cũ", text: "Nhiều người đi xa vẫn về thăm thầy cô năm xưa — có thầy cô đã nghỉ hưu chục năm vẫn nhớ tên học trò." },
          { icon: "heart", title: "Bưng trà, xin chữ", text: "Ở lớp học thêm, học trò dâng trà mời thầy — thầy viết vài chữ động viên làm kỷ niệm." },
          { icon: "star", title: "Văn nghệ chào mừng", text: "Tiết mục hát, đọc thơ, cắm hoa do chính học sinh dàn dựng — sân trường đông như ngày hội." },
          { icon: "ribbon", title: "Hội khoẻ thầy cô", text: "Sở giáo dục tổ chức khen thưởng, hội thao — ngày 20/11 là 'ngày trả công' cả nước dành cho nhà giáo." },
        ],
      },
    ],
    quotes: [
      { text: "Không thầy đố mày làm nên.", author: "Tục ngữ" },
    ],
    motif: "book",
    name: "Ngày Nhà giáo Việt Nam",
    dateMark: "20·11",
    displayDate: "20 tháng 11",
    rule: { type: "solar", month: 11, day: 20 },
    categories: ["quoc-gia"],
    theme: { from: "#065f46", to: "#4d7c0f", accent: "#bef264" },
    tagline: "Tôn sư trọng đạo.",
    history: [
      "Ngày Nhà giáo Việt Nam 20/11 được chọn để tôn vinh nghề dạy học — nghề 'gieo chữ' được coi là quý nhất trong truyền thống trọng đạo của dân tộc, khi thầy giáo đứng hàng tôn chỉ chỉ sau vua và cha mẹ: 'Quân, sư, phụ'.",
      "Ngày lễ được tổ chức lần đầu tiên vào năm 1982 theo quyết định của chính phủ, sau đề nghị của ngành giáo dục — và từ đó trở thành ngày hội lớn nhất của giới giáo viên.",
      "Mỗi 20/11, hàng triệu học sinh — từ trường làng đến đại học — về thăm thầy cô cũ với hoa và thiệp tay. Trong mỗi gia đình Việt, 'Tết thầy' là dịp chung để nói lời cảm ơn những người lái đò tri thức.",
    ],
    meaning: "Nhất tự vi sư, bán tự vi sư — ngày để nhớ ơn những người đã dìu dắt ta.",
    traditions: [
      { title: "Học sinh tặng hoa", text: "Trước giờ lên lớp ngày 20/11, lớp trưởng đại diện dâng bó hoa cùng tấm thiệp lời cảm ơn; nhiều trường tổ chức lễ kỷ niệm ngắn gọn đầu giờ. Học sinh tiểu học tự vẽ thiệp, học sinh trung học mua hoa, sinh viên gửi video tri ân." },
      { title: "Cựu học sinh về thăm", text: "Ngày này, các niên khóa cũ — từ thế hệ xế chiều tới tân sinh viên — tề tựu về trường thăm thầy cô, mang theo hoa, bánh và kỷ vật năm xưa. Cuộc gặp 'thầy trò ba thế hệ' là khoảnh khắc quen thuộc nhất mỗi 20/11." },
      { title: "Lời nhắn tri ân", text: "Gần đây, thay vì quà đắt tiền, phụ huynh khuyến khích con viết lời nhắn tay — 'thầy cô chỉ cần một lời cảm ơn chân thành'. Ngành giáo dục cũng thường xuyên nhắc nhở 'không lễ vật ngày 20/11' để ngày lễ giữ đúng nghĩa trong sạch." },
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
      { q: "20/11 bắt đầu từ khi nào?", a: "Ngày 20/11 là 'Ngày quốc tế Hiến chương các nhà giáo' — kỷ niệm việc thành lập FISE (liên đoàn giáo viên quốc tế) năm 1949. Việt Nam chính thức kỷ niệm lần đầu năm 1982 và đến nay là ngày tôn vinh nhà giáo lớn nhất nước." },
    ],
  },
  {
    slug: "quan-doi-nhan-dan",
    heroStyle: "banner",
    signature: [
      {
        kind: "timeline",
        title: "Từ 34 chiến sĩ đầu tiên",
        beats: [
          { year: "22·12·1944", title: "Truyền thống đầu nguồn", text: "Tại rừng Trần Hưng Đạo (Cao Bằng), Đội Việt Nam Tuyên truyền Giải phóng quân ra đời với 34 chiến sĩ — hạt nhân của quân đội cách mạng." },
          { year: "25·12·1944", title: "Trận đầu tiên", text: "Đánh phá đồn Phai Khắt và Nà Ngần — hai trận thắng mở màn truyền thống 'đánh chắc thắng'." },
          { year: "1946", title: "Quân đội Nhân dân", text: "Lực lượng vũ trang thống nhất mang tên Quân đội Nhân dân Việt Nam — quân đội 'từ dân, vì dân'." },
          { year: "Nay", title: "Nghĩa cử thời bình", text: "Cứu trợ lũ lụt, rà phá bom mìn, công trình nơi biên giới hải đảo — người lính vẫn ở những nơi khó khăn nhất." },
        ],
      },
    ],
    quotes: [
      { text: "Quân đội ta trung với Đảng, hiếu với dân, sẵn sàng chiến đấu hy sinh vì độc lập, tự do của Tổ quốc, vì chủ nghĩa xã hội.", author: "Hồ Chí Minh", work: "Nhân dịp 20 năm thành lập quân đội, 1964" },
    ],
    motif: "medal",
    name: "Ngày Quân đội Nhân dân VN",
    dateMark: "22·12",
    displayDate: "22 tháng 12",
    rule: { type: "solar", month: 12, day: 22 },
    categories: ["quoc-gia"],
    theme: { from: "#14532d", to: "#a16207", accent: "#fde047" },
    tagline: "Ngày truyền thống quân đội anh hùng.",
    history: [
      "Ngày 22/12/1944, tại khu rừng Trần Hưng Đạo ở Cao Bằng, Đội Việt Nam Tuyên truyền Giải phóng quân được thành lập — đội quân đầu tiên của dân tộc, chỉ 34 người dưới sự chỉ huy của Võ Nguyên Giáp.",
      "Chỉ vài ngày sau, đội quân non trẻ đánh thắng hai trận đầu tiên tại Phai Khắt và Nà Ngần — khởi đầu cho một hành trình vươn tới chiến thắng Điện Biên Phủ và ngày thống nhất đất nước.",
      "Từ ngày thành lập, 22/12 còn được gọi là Ngày hội Quốc phòng toàn dân — dịp tưởng nhớ người lính Việt Nam qua các thế hệ, từ chiến hào đến giữ gìn hòa bình Liên Hiệp Quốc hôm nay.",
    ],
    meaning: "Tri ân những người lính đã và đang giữ gìn độc lập, chủ quyền của Tổ quốc.",
    traditions: [
      { title: "Gặp mặt truyền thống", text: "Các cựu chiến binh cùng đơn vị — trung đoàn, đại đội, những 'tiểu đoàn nổi tiếng' — gặp mặt quanh 22/12, đọc lại danh sách liệt sĩ và hát những bài hát năm xưa. Ngày này đồng thời là Ngày hội Quốc phòng toàn dân ở các địa phương." },
      { title: "Vinh danh cán bộ chiến sĩ", text: "Các đơn vị quân đội kỷ niệm bằng lễ gặp mặt, tuyên dương chiến sĩ giỏi, thi đua 'giỏi việc nước, đảm việc nhà'. Hình ảnh chiến sĩ nghĩa vụ trẻ nấu mâm cơm tiếp gia đình chính sách quen thuộc vào ngày này." },
      { title: "Hoạt động biên giới", text: "Ngày thành lập quân đội gắn với hoạt động 'vì biên cương, vì ngư dân': trao nhà tình đồng đội, khám chữa bệnh miễn phí vùng biên, giao lưu 'Xuân biên phòng ấm lòng dân'. Các đơn vị hải quân bắt đầu nhận chuyến quà 'Tết trên đảo' từ dịp này." },
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
      { q: "Ngày 22/12 có được nghỉ không?", a: "Không phải ngày nghỉ lễ quốc gia — người lao động và học sinh vẫn đi làm, đi học bình thường; các hoạt động kỷ niệm tổ chức trong giờ hành chính hoặc chiều tối." },
      { q: "Tiền thân của quân đội VN là gì?", a: "Đội Việt Nam Tuyên truyền Giải phóng quân, thành lập tại rừng Trần Hưng Đạo, Cao Bằng." },
      { q: "22/12 còn có tên gọi nào khác?", a: "Đây còn là Ngày hội Quốc phòng toàn dân — ấn định chính thức từ năm 1989 — kỷ niệm ngày thành lập Đội Việt Nam Tuyên truyền Giải phóng quân (22/12/1944 tại Hoàng Hoa Thám, Cao Bằng), tiền thân của Quân đội nhân dân Việt Nam." },
    ],
  },
  {
    slug: "giang-sinh",
    heroStyle: "mosaic",
    signature: [
      {
        kind: "meanings",
        title: "Sắc màu và biểu tượng Noel",
        items: [
          { swatch: "#dc2626", title: "Đỏ", text: "Màu của trái ô rô, áo ông già Noel và mái nhà ấm — tình yêu và sự cho đi." },
          { swatch: "#16a34a", title: "Xanh lá", text: "Cây thông và vòng nguyệt quế — sự sống xanh mãi giữa mùa đông." },
          { swatch: "#fbbf24", title: "Vàng", text: "Ngôi sao dẫn đường, nến và đèn hang đá — ánh sáng đêm Chúa giáng sinh." },
          { swatch: "#fafaf9", title: "Trắng", text: "Tuyết và vải gói Hài Nhi — sự tinh khiết và bình an." },
          { swatch: "#92400e", title: "Hang đá", text: "Ở Việt Nam, mọi gia đình và giáo xứ đều dựng hang đá — máng cỏ Bêlem quen như bản thân ngày lễ." },
        ],
      },
    ],
    quotes: [
      { text: "Vinh danh Thiên Chúa trên các tầng trời / Bình an dưới thế cho người thiện tâm.", author: "Thánh ca kinh Vinh danh" },
    ],
    motif: "pine",
    name: "Giáng sinh",
    dateMark: "25·12",
    displayDate: "24–25 tháng 12",
    rule: { type: "solar", month: 12, day: 25 },
    categories: ["quoc-te", "truyen-thong"],
    theme: { from: "#14532d", to: "#b91c1c", accent: "#fca5a5" },
    tagline: "Mùa an lành và ấm áp nhất năm.",
    history: [
      "Giáng sinh kỷ niệm ngày sinh của Chúa Giêsu — được Giáo hội chọn vào ngày 25/12 từ thế kỷ 4 ở Rôma, trùng với những lễ hội mùa đông cổ xưa hơn của châu Âu.",
      "Đạo Công giáo vào Việt Nam từ thế kỷ 16 qua các nhà truyền giáo phương Tây — trong đó có Alexandre de Rhodes, người đặt nền móng cho chữ quốc ngữ đang dùng hôm nay. Cộng đồng Công giáo Việt hiện là một trong những cộng đồng đông nhất châu Á.",
      "Ở Việt Nam, Giáng sinh đã vượt ra ngoài nghi lễ tôn giáo: đêm 24/12, nhà thờ Đức Bà ở Sài Gòn, Nhà thờ Lớn Hà Nội và phố Hàng Mã ngập trong ánh đèn — mùa lễ chung của cả người theo đạo lẫn giới trẻ.",
    ],
    meaning: "Mùa của sự cho đi, an lành và những điều ấm áp bên người thân.",
    traditions: [
      { title: "Đi nhà thờ đêm 24/12", text: "Đêm vọng Giáng sinh, các nhà thờ lớn — Nhà thờ Lớn Hà Nội, Đức Bà TP.HCM, Phủ Cam Huế — đông nghẹt cả những người không theo đạo đến xem lễ nửa đêm. Đây là hình ảnh Giáng sinh đặc trưng của Việt Nam: lễ tôn giáo trở thành lễ hội chung của phố phường." },
      { title: "Trao quà Noel", text: "Ông già Noel phát quà ở trung tâm thương mại, công viên — trẻ em đi 'săn ông già Noel' đêm 24. Gia đình trao quà dưới cây thông sáng 25/12; lớp học, công ty chơi 'Secret Santa' trao quà ẩn danh." },
      { title: "Trang trí cây thông", text: "Cây thông Noel — cây thật hoặc nhựa cao 3–10m — được dựng trước nhà thờ, khách sạn, phố đi bộ từ đầu tháng 12. Hang đá tái hiện máng cỏ Bethlehem là nét riêng của Giáng sinh Việt: mỗi giáo xứ, gia đình thi nhau làm hang đá lớn nhất phố." },
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
        { title: "Gà nướng, gà tây", img: "amthuc-ga-nuong", text: "Món chính của bàn tiệc Noel: gà nướng mật ong hoặc gà tây nhồi — kiểu Âu nhưng chế biến vị Việt." },
        { title: "Bánh khúc cây (bûche de Noël)", img: "amthuc-buche", text: "Bánh cuộn kem bơ tạo hình khúc cây — truyền thống Pháp du nhập, bán khắp tiệm bánh mỗi độ Giáng sinh." },
        { title: "Lẩu đêm đông", img: "amthuc-lau", text: "Giáng sinh rơi vào mùa se lạnh miền Bắc — nồi lẩu nóng hổi là món quen thuộc của các buổi tụ họp Noel." },
        { title: "Bánh quy gừng, kẹo gậy", img: "amthuc-banh-quy-gung", text: "Người bánh gừng và cây kẹo gậy sọc đỏ trắng — những món nhỏ đặt dưới gốc cây thông." },
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
      { q: "Hang đá Giáng sinh là gì?", a: "Hang đá là mô hình tái hiện hang máng cỏ nơi Chúa Giê-su ra đời ở Bethlehem — gồm tượng Hài Nhi, Đức Mẹ, thánh Giuse, các nhà thông thái và bầy chiên. Ở Việt Nam, giáo xứ và nhiều gia đình tự làm hang đá bằng đá xốp, rêu và đèn — thi nhau đẹp nhất phố." },
    ],
  },
  {
    slug: "ong-cong-ong-tao",
    heroStyle: "framed",
    signature: [
      {
        kind: "legend",
        title: "Hai ông một bà trông bếp",
        lead: "Táo quân gồm ba vị — hai ông một bà — ngự trong bếp mỗi gia đình, trông nom miếng cơm quanh năm.",
        paragraphs: [
          "Ngày 23 tháng Chạp, ba vị cưỡi cá chép về trời báo cáo Ngọc Hoàng mọi việc tốt xấu trong nhà cả năm qua. Người ta cúng trầu, cau, hương, đèn và thả cá chép sống — 'táo gia' ra đi êm thấm, năm mới mới thuận hòa.",
          "Cũng vì thế mà bếp là nơi thiêng nhất của nhà Việt — 'cúi đầu chào ông Táo, vỗ đít choàng' là dân gian; giữ bếp sạch, nói năng vui vẻ trong nhà chính là lễ cúng quanh năm.",
        ],
      },
      {
        kind: "steps",
        title: "Lễ tiễn Táo quân",
        steps: [
          { icon: "lotus", title: "Mâm cúng bếp", text: "Trầu cau, hương đèn, gạo muối và ba bộ mũ áo Táo — hai ông một bà — sắp ngay trên bàn thờ bếp." },
          { icon: "star", title: "Thả cá chép", text: "Cá chép sống thả về sông ao — phương tiện đưa Táo quân về trời; người ta không ăn cá chép ngày này." },
          { icon: "home", title: "Quét bếp, dọn nhà", text: "Sau khi tiễn táo quân là quét tước, tỉa tông — dọn nhà cuối năm bắt đầu từ chính cái bếp." },
        ],
      },
    ],
    name: "Ông Công Ông Táo",
    dateMark: "23·12",
    displayDate: "23 tháng 12 Âm lịch",
    rule: { type: "lunar", month: 12, day: 23 },
    categories: ["truyen-thong"],
    theme: { from: "#9a3412", to: "#b91c1c", accent: "#f59e0b" },
    quotes: [
      { text: "Ngày hai mươi ba Táo quân về trời.", author: "Vè dân gian", work: "Vè Táo quân" },
    ],
    motif: "home",
    tagline: "Tiễn Táo quân về trời.",
    history: [
      "Ông Công Ông Táo — lễ tiễn các vị Táo quân về trời ngày 23 tháng Chạp âm lịch — có gốc từ tục thờ thần bếp lâu đời của Á Đông: gia thần trông coi bếp lửa, ghi lại thiện ác của cả nhà suốt một năm.",
      "Theo truyền thuyết Việt, Táo quân gồm ba vị — hai ông một bà, hóa thân từ chuyện tình của vợ chồng Thị Nhi, Trọng Cao và Phạm Lang — cùng được phong 'Định phúc Táo quân' trông giữ hạnh phúc mỗi gia đình.",
      "Người Việt mua cá chép phóng sinh để Táo quân cưỡi lên trời 'báo cáo' Ngọc Hoàng — nghi lễ báo hiếu và làm sạch nhà cửa cuối năm, mở đầu chuỗi ngày Tết truyền thống.",
    ],
    meaning:
      "Ông Công Ông Táo là lễ chuyển giao giữa năm cũ và năm mới — ngày gia đình dọn bếp, tưởng nhớ ngọn lửa ấm cả năm qua, và tin rằng điều thiện sẽ được mang lên trời. Đó cũng là lời nhắc sống tử tế trong chính nhà mình.",
    traditions: [
      { title: "Cúng tiễn Táo quân", text: "Trưa ngày 23 tháng Chạp, nhà nào cũng dọn mâm lễ tiễn ông Táo về trời — trầu, rượu, nếp tẻ, đôi khi mũ ông Táo bằng giấy đỏ và tiền vàng mã. Sau lễ, mũ và vàng mã được hóa đi để 'trình lên Ngọc Hoàng' theo làn khói hương." },
      { title: "Thả cá chép", text: "Theo truyền thuyết, cá chép hóa rồng đưa ông Táo về trời — nên sau lễ nhiều nhà mua chép đỏ ra sông, hồ phóng sinh. Gần đây có tranh luận về việc thả cá vào nguồn nước tự nhiên, nhiều gia đình chọn phóng sinh vào ao hồ riêng hoặc chỉ cúng cá chép bằng giấy." },
      { title: "Quét dọn nhà cửa", text: "Khi ông Táo đã về trời, nhà 'vắng thần' nên đây là lúc quét dọn dứt điểm: giũ bụi trần nhà, sửa bàn thờ, thay bát hương mới, tổng vệ sinh trước Tết. 'Thần đi vắng' nghe có vẻ mê tín nhưng thực chất là nhịp khéo léo để cả nhà cùng dọn đón năm mới." },
      { title: "Cúng ông Thổ địa", text: "Song song ông Táo nhà bếp, gia chủ còn cúng ông Thổ địa — vị thần giữ đất của căn nhà — bằng mâm lễ riêng hoặc chung. Tục 'Nhất Táo, nhị Địa' nhắc hai vị thần thân cận nhất trong nhà người Việt cùng được tiễn lên trời tối nay." },
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
        { title: "Thả cá chép", text: "Sau lễ cúng, cá chép được thả xuống ao hồ sông ngòi — 'ngựa' đưa Táo quân về trời. Đây là nét riêng của Việt Nam, không giống Trung Hoa.", img: "amthuc-ca-chep" },
        { title: "Dọn bàn thờ bếp", text: "Lau chùi bàn thờ Táo, thay bát hương, quét tước bếp — dân gian tin 'bếp sạch thì Táo mới nói hay'." },
        { title: "Hóa vàng Táo quân", text: "Đốt nón, áo mã, giày mã sau lễ cúng — trang phục mới cho ba vị Táo lên trời trình diện." },
        { title: "Bắt đầu quét nhà đón Tết", text: "Từ sau lễ Táo quân, nhà cửa được quét dọn tổng thể — coi như 'mở mùa' chuẩn bị Tết." },
        { title: "Giữ lời ăn tiếng nói", text: "Dân gian tin Táo quân ghi lại lời nói và việc làm trong nhà — lễ cúng nhắc mỗi người sống tử tế trong chính mái ấm mình." },
      ],
      amThuc: [
        { title: "Mâm cơm cúng Táo quân", img: "amthuc-mam-com-tao", text: "Mâm cỗ mặn hay chay tùy nhà — thường thịnh soạn vì Táo quân 'đi xa' đến mùng 7 Tết mới trở về." },
        { title: "Cá chép sống", img: "amthuc-ca-chep", text: "Con cá chép mua về để thả sau lễ — vật phẩm tâm linh nhất của ngày, gắn tích 'cá chép vượt vũ môn'." },
        { title: "Nón Táo và vàng mã", img: "amthuc-vang-ma", text: "Bộ ba nón (hai ông một bà), giày, áo mã — trang phục hóa vàng cho Táo quân lên trời." },
        { title: "Chè, xôi cúng lễ", img: "amthuc-che-xoi", text: "Bát chè, đĩa xôi đặt cùng mâm cỗ — đồ ngọt 'nói lời ngọt' của mâm cúng bếp cuối năm." },
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
      { q: "Ông Công Ông Táo gồm mấy vị thần?", a: "Theo tín ngưỡng dân gian là ba vị: hai ông và một bà (gắn với chuyện Trọng Cao – Thị Nhi – Phạm Lang trong 'Táo quân trình Ngọc Hoàng'). Người Việt gọi gộp 'ông Táo' hay 'Táo quân' — thần cai quản việc bếp núc trong nhà." },
    ],
  },
  {
    slug: "tet-han-thuc",
    heroStyle: "framed",
    signature: [
      {
        kind: "legend",
        title: "Bánh trôi, bánh chay",
        lead: "Hàn thực nghĩa là 'ăn đồ lạnh' — lễ cổ tưởng nhớ Giới Tử Thôi, kẻ sĩ chịu chết cháy trong rừng mà không chịu ra làm quan.",
        paragraphs: [
          "Vào Việt Nam, tục ăn đồ lạnh nhường chỗ cho hai thức bánh ngọt dịu: bánh trôi — viên bánh nhỏ nhân đường đỏ nổi lềnh phềnh trong chè gừng, và bánh chay — viên lớn hơn nhân đỗ xanh đắp vừng.",
          "Hai thức bánh gợi đúng tình ngày lễ: trôi tròn trịnh giữa đời đạo, chay thanh khiết lòng người. Mâm bánh trôi bánh chay trắng ngà dâng tổ tiên mồng Ba tháng Ba là sự thanh tao thuần Việt nhất của cả năm.",
        ],
      },
    ],
    name: "Tết Hàn thực",
    dateMark: "03·03",
    displayDate: "3 tháng 3 Âm lịch",
    rule: { type: "lunar", month: 3, day: 3 },
    categories: ["truyen-thong"],
    theme: { from: "#166534", to: "#0f766e", accent: "#4d7c0f" },
    quotes: [
      { text: "Thân em vừa trắng lại vừa tròn, bảy nổi ba chìm với nước non.", author: "Hồ Xuân Hương", work: "Bánh trôi nước" },
    ],
    motif: "lotus",
    tagline: "Tết bánh trôi bánh chay.",
    history: [
      "Tết Hàn thực — ngày 3/3 âm lịch — bắt nguồn từ câu chuyện Giới Tử Thôi, trung thần theo Tấn Văn Công lưu vong mười chín năm, chịu đói chết trên núi Miên Sơn. Vua thương, lệnh thiên hạ cấm đốt lửa ngày đó — lễ 'thực lạnh' ra đời.",
      "Ở Trung Quốc, Hàn thực sau sáp nhập vào tiết Thanh minh; nhưng vào Việt Nam, lễ này biến hóa thành một phong tục rất riêng: ngày ăn bánh trôi bánh chay — những chiếc bánh trắng nổi trên nước đường trong veo.",
      "Câu ca 'Tháng ba rằm chị trả công chưa cho em' gợi nhớ những độ rằm đầu xuân. Hàn thực Việt Nam hôm nay là ngày nhỏ ấm cúng để dâng bánh lên bàn thờ và cùng nhau ăn chè trôi nước đầu mùa.",
    ],
    meaning:
      "Tết Hàn thực là ngày ăn chay, nhớ về cội nguồn và thực hành sự thanh tịnh giữa đời sống năm mới — một nốt lặng trong dải lễ hội sau Tết, khi người ta dâng lên tổ tiên những viên bánh tròn ngọt thanh.",
    traditions: [
      { title: "Nấu bánh trôi, bánh chay", text: "Từ chiều mùng 2, các nhà vo bánh trôi nhân đường viên tròn nhỏ và bánh chay nhân đậu xanh to bằng nắm tay — bánh luộc nổi lên là chín. Bánh trôi thả trong chè gừng, bánh chay xếp đĩa riêng; nhiều nhà làm đủ để dâng cúng và chia họ hàng." },
      { title: "Cúng tổ tiên", text: "Sáng mùng 3 tháng 3, mâm bánh trôi bánh chay thay hoa quả lên bàn thờ — nghi lễ lưu giữ gốc tích 'hàn thực' (bữa lạnh, không lửa) của Tết ngày xưa. Người ta tin tổ tiên về thọ hưởng mùa mới qua những viên bánh trắng mềm." },
      { title: "Ăn chay cả ngày", text: "Nhiều gia đình chọn ăn chay ngày 3/3 — vừa thanh tịnh đầu xuân, vừa gợi nhớ gốc 'ngày không lửa' chỉ dùng đồ nguội của Tết Hàn thực. Tuy vậy, ở Việt Nam nét đặc trưng nhất vẫn là hai thứ bánh trôi, bánh chay ngọt." },
      { title: "Xuất hành lễ chùa", text: "Nhiều nhà chọn ngày này đi chùa cầu bình an, hoặc đi chơi xuân nốt trước khi nhịp sống thường ngày trở lại sau rằm Giêng. Với trẻ em, mùng 3 tháng 3 gắn với 'bánh trôi nổi' — món chè ông bà, bố mẹ nhất định nấu mỗi năm." },
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
        { title: "Nặn bánh trôi, bánh chay", text: "Tối trước mùng 3, cả nhà vo bột nếp nặn bánh: bánh trôi viên nhân đường, bánh chay nhân đậu xanh.", img: "amthuc-banh-troi" },
        { title: "Dâng bánh lên tổ tiên", text: "Sáng mùng 3 tháng 3 âm lịch, mâm bánh trôi bánh chay dâng lên bàn thờ ông bà — lễ cúng thanh tịnh đầu xuân." },
        { title: "Ăn chay cả ngày", text: "Nhiều gia đình giữ ngày chay để tâm tĩnh — 'ăn chay ngày Hàn thực' là tục còn giữ ở nhiều nhà miền Bắc." },
        { title: "Đi lễ chùa", text: "Sau loạt lễ tháng Giêng, nhiều người chọn mùng 3/3 vào chùa cầu an — 'đi lễ đầu xuân'." },
        { title: "Nấu nước gừng", text: "Nồi nước đường gừng cay đi kèm bánh trôi — vị ấm 'xát' cho một 'tiết ăn lạnh'." },
      ],
      amThuc: [
        { title: "Bánh trôi nước", img: "amthuc-banh-troi", text: "Viên bột nếp tròn nhân đường viên, nấu nổi trong nước đường gừng rắc vừng — 'bánh trôi' vì trôi nổi trên nước." },
        { title: "Bánh chay", text: "Viên dẹp nhân đậu xanh giã mịn, chan nước đường phèn — nhẹ hơn bánh trôi và đi đôi với nhau khi dâng cúng.", img: "amthuc-banh-chay" },
        { title: "Mâm cúng thanh tịnh", img: "amthuc-mam-cung", text: "Bánh trôi, bánh chay, chè, hoa quả — lễ vật thanh tịnh của ngày mùng 3 tháng 3." },
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
      { q: "3/3 âm lịch còn gọi là gì?", a: "Ngoài tên Tết Hàn thực, ngày này còn gọi 'tết bánh trôi bánh chay' — tên dân gian theo đúng hai món đặc trưng. Câu ca dao 'Mùng ba tháng ba, mẹ dắt đi chùa' cũng gắn với ngày này." },
    ],
  },
  {
    slug: "tet-doan-ngo",
    signature: [
      {
        kind: "steps",
        title: "Giết sâu bọ đầu hè",
        steps: [
          { icon: "lotus", title: "Ăn trái cây, rượu nếp", text: "Đúng giờ ngọ ngày mồng 5 tháng 5 ăn mận, vải, rượu nếp cẩm — dân gian tin là 'giết sâu bọ' trong người, trừ bệnh tật." },
          { icon: "moonstar", title: "Tắm lá thơm", text: "Nước lá mướp, bưởi, sả, ngải cứu đun sôi tắm trưa ngọ — khỏi ngứa ngáy, mát người cả hè." },
          { icon: "ribbon", title: "Đeo hồ lô, chỉ ngũ sắc", text: "Trẻ con đeo hồ lô thơm và vòng chỉ năm màu trừ tà — đến đêm rằm tháng Sáu mới tháo thả xuống sông." },
          { icon: "candle", title: "Hái thuốc giờ ngọ", text: "Người làm thuốc hái cây đúng giờ ngọ ngày Đoan Ngọ — tin rằng dược tính cỏ cây lúc đó mạnh nhất năm." },
        ],
      },
    ],
    name: "Tết Đoan Ngọ",
    dateMark: "05·05",
    displayDate: "5 tháng 5 Âm lịch",
    rule: { type: "lunar", month: 5, day: 5 },
    categories: ["truyen-thong"],
    theme: { from: "#c2410c", to: "#be123c", accent: "#fbbf24" },
    quotes: [
      { text: "Nhất Tý, nhì Ngọ, tam Dậu.", author: "Vè dân gian", work: "Giờ tốt giết sâu bọ" },
    ],
    motif: "wheat",
    tagline: "Giờ ngọ chính vọng — tết giết sâu bọ.",
    history: [
      "Tết Đoan Ngọ — mùng 5 tháng 5 âm lịch — có gốc từ lễ Trùng Ngũ của Trung Quốc: ngày 'ngọ' (giữa trưa) được coi là lúc khí độc của mùa hè mạnh nhất năm, khi côn trùng và bệnh dịch dễ sinh.",
      "Vào Việt Nam, lễ này trở thành 'Tết giết sâu bọ' độc đáo: người ta ăn trái cây chua đầu mùa, rượu nếp, bánh tro — tin rằng vị chua sẽ 'giết' sâu bọ trong bụng và trừ tà cho cả năm.",
      "Nông dân cũng hái lá thuốc trưa Đoan Ngọ — ngày được coi là lúc cây cỏ đậm dược tính nhất. Từ lễ trừ tà xưa, Đoan Ngọ hôm nay là dịp gia đình ăn trái cây đầu mùa và nhắc nhau giữ gìn sức khỏe vào hè.",
    ],
    meaning:
      "Tết Đoan Ngọ là cách dân gian Việt đối phó với chuyển mùa hè: một ngày thanh lọc cơ thể, bảo vệ sức khỏe, đồng thời gắn với bó mẹ và những đứa trẻ — vì tục giết sâu bọ cũng là tục giữ gìn sinh khí cho nhà.",
    traditions: [
      { title: "Ăn hoa quả chua", text: "Quả thanh trà, mận, sấu, dâu tằm — trái vị chua đầu hè là 'thuốc' giết sâu bọ của Tết Đoan Ngọ. Dân gian có tục ăn hoa quả lúc bụng đói từ sáng sớm để 'diệt sâu từ bên trong' trước khi ăn cơm." },
      { title: "Rượu nếp, cơm rượu", text: "Cơm rượu nếp cái hoa vàng viên nhỏ là món nhất định của trưa mùng 5 — vị ngọt cay ấm được coi là 'đốt hết sâu bọ' cuối mùa. Trẻ em ăn cơm rượu đã đun chín; người lớn uống rượu nếp nguyên chất kèm chút muối mè, ớt." },
      { title: "Hái thuốc ngọ", text: "Từ 11h–13h ngày mùng 5 — đúng giờ Ngọ của ngày Ngọ, tháng Ngọ — được cho là lúc dương khí cực thịnh, thuốc hái giờ này tốt nhất năm. Người xưa hái ngải cứu, lá tre, rễ cỏ tranh phơi nắng cất làm thuốc quanh năm." },
      { title: "Tục đốt vía", text: "Tối Đoan Ngọ, có nơi đốt vía — đống giấy rơm ngoài ngõ 'đuổi sâu bọ' — nay ít còn vì lý do an toàn. Nhưng tục giũ quần áo phơi nắng, treo ngải cứu trước cửa vẫn giữ nét 'xua tà khí' mùa hạ." },
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
        { title: "Ăn trái cây chua đầu mùa", text: "Mận, xoài xanh, sấu, vải — trái chua được tin là 'tẩy' cơ thể chuyển mùa; trẻ con thích nhất vì được ăn trái cây no say.", img: "amthuc-trai-cay-chua" },
        { title: "Uống rượu nếp, ăn cơm rượu", text: "Cơm rượu nếp cái hoa vàng — ngọt men, cay nhẹ — là món truyền thống bắt buộc của ngày giết sâu bọ.", img: "amthuc-com-ruou" },
        { title: "Hái thuốc giờ ngọ", text: "Từ 11–13 giờ, người xưa ra đồng hái cỏ cây — tin rằng giờ này dược tính cây mạnh nhất năm." },
        { title: "Đốt vía, đeo chỉ ngũ sắc", text: "Đốt vía trước cửa xua tà, đeo vòng chỉ năm màu cho trẻ — phong tục trừ dịch còn giữ ở nhiều nơi." },
        { title: "Cúng gia tiên giữa trưa", text: "Mâm trái cây và cơm rượu dâng ông bà đúng giờ ngọ — sau đó cả nhà 'phá' mâm giết sâu bọ." },
      ],
      amThuc: [
        { title: "Cơm rượu nếp", img: "amthuc-com-ruou", text: "Nếp cái hoa vàng lên men ngọt cay — món đứng đầu bảng của tết giết sâu bọ." },
        { title: "Trái cây chua đầu mùa", text: "Xoài xanh chấm muối, mận, sấu non, vải — 'ăn chua' ngày Đoan Ngọ cho bụng dạ sạch sâu bọ.", img: "amthuc-trai-cay-chua" },
        { title: "Bánh tro (bánh gio)", img: "amthuc-banh-tro", text: "Bánh nếp ngâm nước tro trong veo, chấm mật mía — vị thanh mát riêng của ngày 5/5 âm lịch." },
        { title: "Trứng luộc", img: "amthuc-trung-luoc", text: "Trứng gà, trứng vịt luộc — món 'sát trùng' giản dị trong mâm giết sâu bọ." },
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
      { q: "Giờ Ngọ trong ngày Đoan Ngọ có ý nghĩa gì?", a: "Giờ Ngọ (11h–13h) của ngày Ngọ tháng Ngọ là lúc dương khí đạt đỉnh trong năm theo quan niệm âm dương — vì vậy thuốc hái, nước lấy, lá phơi đúng giờ này được cho là 'linh nhất'. Tên 'Đoan Ngọ' nghĩa là 'chính ngọ'." },
    ],
  },
  {
    slug: "ngay-thay-thuoc",
    signature: [
      {
        kind: "timeline",
        title: "Từ bức thư năm 1955",
        beats: [
          { year: "27·2·1955", title: "Bức thư gửi hội nghị y tế", text: "Chủ tịch Hồ Chí Minh gửi thư cho Hội nghị Cán bộ Y tế tại Hà Nội — bài căn dặn 368 chữ về đạo đức người thầy thuốc." },
          { year: "1985", title: "Ngày truyền thống ngành y", text: "Hội đồng Bộ trưởng chọn 27/2 hằng năm làm Ngày Thầy thuốc Việt Nam — từ đúng văn kiện lịch sử năm ấy." },
          { year: "Nay", title: "Tri ân áo trắng", text: "Ngày để cả nước cảm ơn thầy thuốc — nhất là sau những giai đoạn họ gánh những trận chiến không tên." },
        ],
      },
    ],
    quotes: [
      { text: "Lương y phải như từ mẫu.", author: "Hồ Chí Minh", work: "Thư gửi Hội nghị Cán bộ Y tế, 27·2·1955" },
    ],
    name: "Ngày Thầy thuốc Việt Nam",
    dateMark: "27·02",
    displayDate: "27 tháng 2",
    rule: { type: "solar", month: 2, day: 27 },
    categories: ["quoc-gia"],
    theme: { from: "#0f766e", to: "#0369a1", accent: "#99f6e4" },
    motif: "carnation",
    tagline: "Tri ân người chữa bệnh.",
    history: [
      "Ngày Thầy thuốc Việt Nam gắn với bức thư Bác Hồ gửi cán bộ y tế ngày 27/2/1955 — lá thư viết lời nổi tiếng 'Lương y như từ mẫu', căn dặn người thầy thuốc phải thương bệnh nhân như mẹ hiền thương con.",
      "Trước đó, danh y Hải Thượng Lãn Ông Lê Hữu Trác thế kỷ 18 đã để lại cho nền y học dân tộc bộ 'Hải Thượng y tông tâm lĩnh' — kim chỉ nam về y đức và y thuật mà các thế hệ thầy thuốc Việt học theo.",
      "Từ 1955, ngày 27/2 trở thành ngày hội của ngành y — dịp tôn vinh những người 'blouse trắng' chăm sóc sức khỏe cả nước, từ phòng khám tỉnh nhỏ đến tuyến đầu chống dịch.",
    ],
    meaning:
      "Ngày Thầy thuốc Việt Nam là ngày cả nước nói lời cảm ơn với người cầm dao mổ, người đêm trực phòng cấp cứu — những nghề đòi hỏi tài năng lẫn lòng nhân hậu. 'Lương y như từ mẫu' là chuẩn mực sống của nghề ấy.",
    traditions: [
      { title: "Tặng hoa cho bác sĩ", text: "Ngày 27/2, bệnh viện ngập hoa — bệnh nhân cũ trở lại tặng hoa cùng lá thư cảm ơn cho bác sĩ từng cứu mình; sinh viên y tặng thầy hướng dẫn. Hoa hồng và hoa ly là hai loài được chọn nhiều nhất." },
      { title: "Lễ kỷ niệm tại viện", text: "Các bệnh viện từ Việt Đức, Chợ Rẫy đến viện tuyến huyện tổ chức gặp mặt truyền thống: tân bác sĩ đọc lại lời thề Hippocrates, vinh danh 'thầy thuốc ưu tú', tri ân thế hệ thầy đã về hưu." },
      { title: "Khám chữa miễn phí", text: "Dịp này, nhiều đoàn y bác sĩ tình nguyện khám sức khỏe miễn phí ở vùng cao, vùng sâu — phát thuốc, siêu âm, mổ mắt nhân đạo. Ngành y gọi đây là 'việc làm đẹp nhất trong ngày của chính mình'." },
      { title: "Tri ân trên báo chí", text: "Báo chí, truyền hình dành chuyên mục tri ân: phóng sự về bác sĩ thức trắng đêm trực cấp cứu, 'bác sĩ rừng' ba mươi năm chống sốt rét, nữ bác sĩ vùng cao. Những câu chuyện mỗi 27/2 khiến nghề y gần với công chúng hơn." },
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
      { q: "Ngày Thầy thuốc Việt Nam khác Ngày Y tế thế giới thế nào?", a: "Ngày Y tế thế giới của WHO là 7/4 — ngày thành lập WHO năm 1948. 27/2 là ngày riêng của Việt Nam do Quyết định 37-CP năm 1955 ấn định theo đề xuất của Bác Hồ, nhằm tôn vinh thầy thuốc nước nhà." },
    ],
  },
  {
    slug: "ngay-bao-chi",
    signature: [
      {
        kind: "timeline",
        title: "Tờ báo đầu tiên",
        beats: [
          { year: "21·6·1925", title: "Báo Thanh niên ra số đầu", text: "Nguyễn Ái Quốc sáng lập báo Thanh niên ở Quảng Châu — tờ báo cách mạng đầu tiên của người Việt, 'trường học của mỗi người cách mạng'." },
          { year: "1985", title: "Kỷ niệm 60 năm", text: "Từ kỷ niệm tròn sáu chục năm, 21/6 chính thức trở thành Ngày Báo chí Cách mạng Việt Nam." },
          { year: "Nay", title: "Mặt trận tư tưởng", text: "Ngày gặp mặt, khen thưởng nhà báo — và nhắc nhớ trách nhiệm của người cầm bút trong thời đại tin tức." },
        ],
      },
    ],
    quotes: [
      { text: "Người cán bộ báo chí cũng là một chiến sĩ cách mạng.", author: "Hồ Chí Minh", work: "Về công tác báo chí" },
    ],
    name: "Ngày Báo chí Cách mạng Việt Nam",
    dateMark: "21·06",
    displayDate: "21 tháng 6",
    rule: { type: "solar", month: 6, day: 21 },
    categories: ["quoc-gia"],
    theme: { from: "#1e40af", to: "#334155", accent: "#f59e0b" },
    motif: "book",
    tagline: "Tri ân người cầm bút.",
    history: [
      "Ngày Báo chí Cách mạng Việt Nam kỷ niệm ngày 21/6/1925 — khi Nguyễn Ái Quốc cho ra số đầu tiên của báo Thanh Niên tại Quảng Châu, Trung Quốc: tờ báo cách mạng đầu tiên của dân tộc, in bằng chữ quốc ngữ vừa phổ cập.",
      "Tờ Thanh Niên vừa là cơ quan tuyên truyền, vừa là 'trường học chính trị' — qua tay các bí mật vận chuyển về nước, đào tạo cả thế hệ cán bộ đầu tiên cho phong trào giành độc lập.",
      "Từ tờ báo ấy, báo chí Việt Nam phát triển thành hệ thống hàng trăm cơ quan báo chí hôm nay. Ngày 21/6 là dịp tôn vinh phóng viên — người giữ bút lửa của thời đại, từ tuyến đầu chiến trường đến báo điện tử.",
    ],
    meaning:
      "Ngày Báo chí Cách mạng Việt Nam là ngày tôn vinh người làm báo — nghề chạy ngược lũ, chui xuống hầm, ghi chép công tâm. Từ tờ Thanh Niên 1925 đến nghị trường hôm nay, báo chí vẫn là cơ quan của dân chủ xã hội.",
    traditions: [
      { title: "Lễ trao giải báo chí", text: "Quanh 21/6 là mùa giải lớn nhất năm của nghề báo — Giải Búa liềm vàng và Giải báo chí toàn quốc — trao cho những tác phẩm điều tra, đấu tranh chống tham nhũng và bức ảnh báo chí ấn tượng nhất năm trước đó." },
      { title: "Họp mặt nhà báo", text: "Hội Nhà báo các cấp và các tòa soạn tổ chức gặp mặt truyền thống: vinh danh nhà báo kỳ cựu, trao thẻ hội viên mới, nhắc lại ngày báo Thanh niên số đầu tiên ra đời 21/6/1925 do Nguyễn Ái Quốc sáng lập." },
      { title: "Triển lãm báo chí", text: "Triển lãm báo chí toàn quốc và hội báo xuân trưng bày tác phẩm đoạt giải cùng những trang báo lịch sử — từ tờ báo in chữ Hán thời xưa đến trang tin điện tử hiện đại. Đây là dịp độc giả nhìn thấy 'công xưởng' đằng sau tin tức." },
      { title: "Tọa đàm nghề báo", text: "Các tọa đàm nghề nghiệp quanh ngày này xoay quanh báo chí chuyển đổi số, AI trong tòa soạn và đạo đức nghề báo thời tin giả — những vấn đề nóng nhất của nghề theo từng giai đoạn." },
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
      { q: "Giải báo chí lớn nhất của Việt Nam là gì?", a: "Giải Báo chí Quốc gia — trao hằng năm cho nhóm tác phẩm xuất sắc nhất trên báo in, báo điện tử, phát thanh, truyền hình và ảnh báo chí. Bên cạnh đó còn Giải Búa liềm vàng dành riêng cho tác phẩm về xây dựng Đảng." },
    ],
  },
  {
    slug: "nguoi-cao-tuoi",
    heroStyle: "framed",
    signature: [
      {
        kind: "steps",
        title: "Mừng thọ về già",
        steps: [
          { icon: "home", title: "Dâng lễ mừng thọ", text: "Con cháu dâng trầu, trà, rượu và áo mừng cho cụ — mừng thọ năm nào 'tròn' tuổi theo âm lịch." },
          { icon: "heart", title: "Quây quần bốn thế hệ", text: "Ngày mừng thọ tụ họp đông nhất sau Tết — bốn thế hệ một nhà cùng cúi đầu chúc cụ thêm xuân." },
          { icon: "book", title: "Nghe chuyện xưa", text: "Người cao tuổi là 'cây cổ thụ' của gia đình — hỏi ông bà chuyện đời là giữ lại sử sống." },
          { icon: "star", title: "Vai trò trong cộng đồng", text: "Hội người cao tuổi, làng khuyên học, câu lạc bộ sức khỏe — về già vẫn là chỗ dựa của xóm làng." },
        ],
      },
    ],
    quotes: [
      { text: "Kính lão đắc thọ.", author: "Tục ngữ" },
    ],
    name: "Ngày Người cao tuổi Việt Nam",
    dateMark: "01·10",
    displayDate: "1 tháng 10",
    rule: { type: "solar", month: 10, day: 1 },
    categories: ["quoc-gia"],
    theme: { from: "#7c2d12", to: "#a16207", accent: "#fde68a" },
    motif: "heart",
    tagline: "Kính lão đắc thọ.",
    history: [
      "Kính lão là truyền thống ngàn năm của người Việt: triều đình xưa mở 'diên hằng yến' chiêu đãi các cụ cao niên, cấp gậy ngọc tượng trưng sự kính trọng bậc trưởng thượng trong làng xã.",
      "Ngày 6/6 gắn với phong trào cứu quốc trong kháng chiến — khi cả người già cả nước cũng tham gia hội cứu quốc. Năm 2008, chính phủ chính thức chọn 6/6 làm Ngày Người cao tuổi Việt Nam.",
      "Cứ đến ngày này, các câu lạc bộ người cao tuổi khắp nước tổ chức chúc thọ, thăm hỏi các cụ neo đơn — ngày để cả xã hội nói lời cảm ơn những người đã sống trọn một đời cho gia đình và Tổ quốc.",
    ],
    meaning:
      "Ngày Người cao tuổi là ngày chúng ta cúi đầu trước những mái tóc bạc: ông bà, cha mẹ — những người đã đi qua chiến tranh, đói khổ, và dựng nên gia đình. 'Kính lão đắc thọ' không phải tục lễ mà là chuẩn sống.",
    traditions: [
      { title: "Mừng thọ", text: "Tục mừng thọ tổ chức ở các mốc 60 (hồi giáp), 70, 77 (hi thọ), 80, 88 (mễ thọ), 90, 99 (bạch thọ) và 100 tuổi — con cháu tề tựu dâng trầu, áo đỏ, câu đối chúc thọ. Nhiều gia đình gộp mừng thọ vào dịp Tết hoặc ngày 1/10 cho đông đủ." },
      { title: "Thăm hỏi người già", text: "Hội Người cao tuổi cơ sở đi từng ngõ tặng quà các cụ bước sang 80, 90, 100 tuổi — hộp sữa, chăn ấm, phong bì chúc thọ. Địa phương nào cũng có 'bản đồ cụ thọ' riêng để không bỏ sót nhà nào." },
      { title: "Hoạt động hội người cao tuổi", text: "Chi hội người cao tuổi là sân chơi thật của người già nông thôn: thơ, cờ tướng, dưỡng sinh, múa hát — nhiều hội tổ chức hội thi 'cụ ông cụ bà tài năng' dịp 1/10. Ở thành phố, ngày này gắn với chủ đề 'sống vui, sống khỏe' tuổi vàng." },
      { title: "Con cháu về quê", text: "Ngày 1/10 rơi vào khoảng cuối tuần đầu thu — nhiều con cháu đi xa chọn về quê thăm ông bà, gộp mừng thọ vào ngày này. 'Ngày của ông bà' cũng là lời nhắc người trẻ gọi điện thường xuyên hơn cho cụ già ở xa." },
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
        { title: "Mừng thọ ông bà", text: "Gia đình chọn dịp này tổ chức mừng thọ cho cụ ông, cụ bà — con cháu tề tựu chúc 'sống lâu trăm tuổi'.", img: "amthuc-mung-tho" },
        { title: "Thăm hỏi người cao tuổi", text: "Hội Người cao tuổi, đoàn thể và chính quyền thăm hỏi, tặng quà các cụ neo đơn, có hoàn cảnh khó khăn." },
        { title: "Khám sức khỏe miễn phí", text: "Nhiều địa phương mở đợt khám bệnh, tư vấn dinh dưỡng và sức khỏe cho người già quanh ngày 1/10." },
        { title: "Văn nghệ hội cụ", text: "Hội Người cao tuổi tổ chức văn nghệ, thi hát, tọa đàm sống vui sống khỏe — đúng nghĩa 'ngày của các cụ'." },
        { title: "Con cháu về thăm", text: "Ngày này nhắc người con xa quê gọi điện, về thăm — một dịp để nhớ rằng các cụ vẫn đang chờ." },
      ],
      amThuc: [
        { title: "Cỗ mừng thọ", text: "Mâm cỗ thịnh soạn mừng tuổi cụ: gà xé, giò chả, nem — đông con cháu quây quần mới là 'đầy thọ'.", img: "amthuc-mung-tho" },
        { title: "Xôi gấc đỏ", img: "amthuc-xoi-gac", text: "Đĩa xôi đỏ tạo hình chữ 'thọ' — màu trường thọ phú quý đặt giữa mâm mừng thọ." },
        { title: "Chè, trà đãi khách", img: "amthuc-che-tra", text: "Chè ngọt, trà nóng và bánh mừng thọ đãi khách đến chúc — đồ mừng giản dị của ngày kính lão." },
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
      { q: "Ngày Người cao tuổi Việt Nam là ngày nào?", a: "Ngoài Ngày Quốc tế Người cao tuổi 1/10 do Liên Hợp Quốc ấn định, Việt Nam còn có ngày riêng: 6/6 — Ngày Người cao tuổi Việt Nam theo Hiến chương Hội Người cao tuổi (từ 2008), kỷ niệm ngày Bác Hồ viết 'Lời kêu gọi người già cả nước'." },
    ],
  },
  {
    slug: "doanh-nhan",
    heroStyle: "split",
    signature: [
      {
        kind: "steps",
        title: "Từ gánh hàng rong đến doanh nhân",
        steps: [
          { icon: "wheat", title: "Nghề buôn trong chợ quê", text: "Thương nghiệp Việt lớn lên từ gánh hàng rong, chợ phiên và nghề thủ công — 'bán chịu' đầu tiên là lòng tin." },
          { icon: "star", title: "Phố cổ, phường hội", text: "Phố Hàng Bông, Hàng Đào, Hội An quảng trường thế kỷ XVII — thương nhân Việt đã buôn với cả thế giới." },
          { icon: "flag", title: "13·10 Ngày Doanh nhân", text: "Từ 2004, 13/10 là Ngày Doanh nhân Việt Nam — tôn vinh người dám khởi nghiệp và tạo việc làm." },
          { icon: "book", title: "Trách nhiệm đi cùng", text: "Doanh nhân ngày nay gắn với trách nhiệm xã hội — làm giàu đi đôi với làm việc thiện cho quê hương." },
        ],
      },
    ],
    quotes: [
      { text: "Thương trường là chiến trường.", author: "Ngạn ngữ" },
    ],
    name: "Ngày Doanh nhân Việt Nam",
    dateMark: "13·10",
    displayDate: "13 tháng 10",
    rule: { type: "solar", month: 10, day: 13 },
    categories: ["quoc-gia"],
    theme: { from: "#1e3a8a", to: "#0f766e", accent: "#fbbf24" },
    motif: "medal",
    tagline: "Tôn vinh khởi nghiệp.",
    history: [
      "Ngày Doanh nhân Việt Nam 13/10 được thiết lập từ năm 2004 theo quyết định của Thủ tướng — ngày chính thức để tôn vinh cộng đồng doanh nhân sau hai thập kỷ đổi mới.",
      "Từ khi kinh tế mở cửa năm 1986, doanh nhân Việt Nam — từ những xưởng nhỏ làng nghề đến tập đoàn công nghệ — đã đưa hàng Việt ra khắp thế giới và tạo hàng chục triệu việc làm.",
      "Ngày này là dịp gặp gỡ giới kinh doanh, vinh danh doanh nhân tiêu biểu và gửi lời chúc đến những người đang khởi nghiệp — cộng đồng được coi là động lực tăng trưởng của đất nước.",
    ],
    meaning:
      "Ngày Doanh nhân Việt Nam là ngày tôn vinh người dám bắt đầu — từ tiểu thương chợ quê đến startup công nghệ. Doanh nhân không chỉ tạo của cải mà tạo việc làm, niềm tin và khí thế của một đất nước đang lớn.",
    traditions: [
      { title: "Gặp mặt doanh nhân", text: "Ngày 13/10, các hiệp hội doanh nghiệp — VCCI, phòng thương mại, hội doanh nhân trẻ — tổ chức gặp mặt và diễn đàn CEO. Đây là dịp 'điểm danh' sức khỏe cộng đồng doanh nhân Việt sau mỗi năm biến động." },
      { title: "Diễn đàn khởi nghiệp", text: "Quanh 13/10 là mùa diễn đàn khởi nghiệp: Techfest, Startup Day, talkshow 'hành trình founder' thu hút giới trẻ kinh doanh. Ngày Doanh nhân trở thành điểm nhấn truyền cảm hứng kinh doanh lớn nhất năm." },
      { title: "Vinh danh doanh nghiệp", text: "Dịp này trao các giải uy tín: cúp Thánh Gióng cho doanh nhân tiêu biểu, Sao Đỏ cho doanh nghiệp vì cộng đồng, Top 500 doanh nghiệp lớn nhất (VNR500). Bảng vinh danh 13/10 là 'bảng vàng' thường niên của giới kinh doanh." },
      { title: "Hoạt động thiện nguyện", text: "Bên cạnh vinh danh, nhiều tập đoàn chọn 13/10 làm ngày thiện nguyện chung: trao học bổng, xây nhà tình thương, tài trợ y tế khắp nơi. 'Doanh nhân không chỉ làm giàu' là thông điệp được nhắc lại mỗi năm." },
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
      { q: "Giải thưởng nào gắn với Ngày Doanh nhân Việt Nam?", a: "Hai giải được nhắc nhiều nhất: cúp Thánh Gióng do VCCI trao cho doanh nhân tiêu biểu và giải Sao Đỏ cho doanh nhân vì cộng đồng. Nhiều bảng xếp hạng doanh nghiệp (VNR500, Top 10 uy tín) cũng công bố quanh ngày 13/10." },
    ],
  },
  {
    slug: "ngay-thanh-lap-dang",
    heroStyle: "poster",
    signature: [
      {
        kind: "timeline",
        title: "Con đường ra đời của Đảng",
        beats: [
          { year: "1911", title: "Tìm đường cứu nước", text: "Người thanh niên Nguyễn Tất Thành lên đường từ bến Nhà Rồng — 'ra đi tìm đường cứu nước'." },
          { year: "1930", title: "Ba tổ chức hợp nhất", text: "Đầu năm 1930, tại Hương Cảng, hội nghị hợp nhất ba tổ chức cộng sản thành Đảng Cộng sản Việt Nam — ngày 3/2 được lấy làm ngày thành lập." },
          { year: "1945", title: "Cách mạng Tháng Tám", text: "Đảng lãnh đạo Tổng khởi nghĩa giành chính quyền cả nước — 15 năm sau ngày thành lập." },
          { year: "Nay", title: "Hơn chín mươi năm", text: "Mỗi dịp 3/2 là dịp tổng kết và khen thưởng đảng viên tiêu biểu trên cả nước." },
        ],
      },
    ],
    quotes: [
      { text: "Đảng ta là đạo đức, là văn minh.", author: "Hồ Chí Minh", work: "Lễ kỷ niệm 30 năm thành lập Đảng, 1960" },
    ],
    motif: "flag",
    name: "Ngày thành lập Đảng Cộng sản Việt Nam",
    dateMark: "03·02",
    displayDate: "3 tháng 2",
    rule: { type: "solar", month: 2, day: 3 },
    categories: ["quoc-gia"],
    theme: { from: "#7f1d1d", to: "#b45309", accent: "#fde047" },
    tagline: "Ngày ra đời của tổ chức lãnh đạo cách mạng Việt Nam.",
    history: [
      "Ngày 3/2/1930, tại một hội nghị ở Cửu Long, Hồng Kông, Nguyễn Ái Quốc chủ trì hợp nhất ba tổ chức cộng sản đang tồn tại song song ở Đông Dương thành một đảng duy nhất — Đảng Cộng sản Việt Nam.",
      "Từ phòng họp nhỏ ở xứ người, đảng non trẻ tổ chức Đại hội lần thứ nhất tại Ma Cao năm 1935, rồi đổi tên thành Đảng Cộng sản Đông Dương — dẫn dắt phong trào giành độc lập qua hai cuộc kháng chiến.",
      "Ngày 3/2 là dịp ôn lại chặng đường của đảng cầm quyền — một ngày lễ được tổ chức trang trọng trong hệ thống chính trị, với các buổi kỷ niệm, báo cáo thành tựu và hoạt động kết nạp đảng viên mới.",
    ],
    meaning:
      "Dấu mốc thống nhất phong trào cộng sản Việt Nam — từ đây cách mạng có một đảng lãnh đạo duy nhất.",
    traditions: [
      { title: "Lễ kỷ niệm", text: "Đảng bộ các cấp từ xã phường đến trung ương tổ chức lễ kỷ niệm trang trọng ngày 3/2: ôn lại hội nghị hợp nhất ba tổ chức cộng sản tại Cửu Long (Hồng Kông) năm 1930, diễn văn về chặng đường hơn 90 năm, chiếu phim tư liệu." },
      { title: "Kết nạp đảng viên", text: "Ngày Thành lập Đảng là 'mùa kết nạp': nhiều thanh niên ưu tú, chiến sĩ, công nhân giỏi được kết nạp đảng viên trong buổi lễ trang trọng — khoảnh khắc được coi là 'ngày sinh thứ hai' của mỗi người." },
      { title: "Hoạt động thiện nguyện", text: "Chi bộ, đảng bộ cơ sở tổ chức ngày thiện nguyện quanh 3/2: dọn vệ sinh môi trường, trồng cây, hiến máu, thăm gia đình chính sách. 'Mỗi đảng viên một việc tử tế' là khẩu hiệu quen thuộc ngày này." },
    ],
    wishes: [
      "Nhân ngày thành lập Đảng 3/2, chúc đất nước đoàn kết, thịnh vượng.",
      "Tự hào ngày 3/2 — chúc non sông liền một dải, nhân dân một lòng.",
      "Chúc tổ chức Đảng nơi bạn công tác ngày càng trong sạch, vững mạnh.",
      "Ngày 3/2 — nhớ lời thề dưới cờ, giữ lửa lý tưởng năm xưa.",
      "Chúc đất nước ta đi lên theo con đường đã chọn, mùa xuân nào cũng rực rỡ.",
    ],
    gifts: [
      { title: "Sách lịch sử Đảng", text: "Tài liệu, hồi ký về chặng đường 1930 và các kỳ đại hội." },
      { title: "Huy hiệu lá cờ", text: "Huy hiệu quốc kỳ hoặc cờ Đảng cho người mới vào Đảng." },
      { title: "Chuyến thăm di tích", text: "Thăm khu di tích liên quan đến hội nghị thành lập hoặc nhà lưu niệm các lãnh đạo đầu tiên." },
    ],
    deep: {
      ongNguon: [
        "Cuối những năm 1920, phong trào cộng sản ở Đông Dương có ba tổ chức hoạt động song song: Đông Dương Cộng sản Đảng ở Bắc Kỳ, An Nam Cộng sản Đảng ở Trung Kỳ và Đông Dương Cộng sản Liên đoàn ở Nam Kỳ. Việc chia rẽ khiến Quốc tế Cộng sản và Nguyễn Ái Quốc — vừa từ Xiêm về — đặt nhiệm vụ hợp nhất.",
        "Hội nghị hợp nhất họp từ ngày 6/1 đến 8/2/1930 tại Cửu Long, Hồng Kông, do Nguyễn Ái Quốc chủ trì. Ngày 3/2/1930, ba tổ chức chính thức hợp nhất, thông qua Chính cương vắn tắt và Chương trình vắn tắt do Nguyễn Ái Quốc soạn — lấy tên Đảng Cộng sản Việt Nam.",
        "Tháng 10/1930, hội nghị Trung ương lần thứ nhất đổi tên thành Đảng Cộng sản Đông Dương. Qua các thời kỳ Đảng Lao động Việt Nam (1951) và Đảng Cộng sản Việt Nam (1976), ngày 3/2 vẫn được kỷ niệm như ngày sinh của Đảng.",
      ],
      phongTuc: [
        { title: "Lễ kỷ niệm trọng thể", text: "Các năm tròn chẵn (85, 90, 95 năm…), Đảng bộ và chính quyền các cấp tổ chức lễ kỷ niệm với diễn văn ôn lại lịch sử thành lập." },
        { title: "Tuyên truyền trên báo chí", text: "Báo Đảng, báo địa phương và đài truyền hình phát loạt bài, phim tài liệu về hội nghị hợp nhất 1930." },
        { title: "Kết nạp đảng viên mới", text: "Nghi thức trước cờ Đảng: tuyên thệ, trao huy hiệu — nhiều chi bộ chọn dịp 3/2 cho nghi lễ này." },
        { title: "Dâng hoa tại di tích", text: "Đoàn đại biểu dâng hoa tại tượng đài, nhà lưu niệm các nhà hoạt động cách mạng thời kỳ đầu." },
        { title: "Chiến dịch thiện nguyện", text: "Phong trào 'ngày Chủ nhật xanh', xây nhà cho hộ nghèo, hiến máu nhân đạo thường phát động quanh 3/2." },
        { title: "Sinh hoạt chi bộ chuyên đề", text: "Các tổ chức cơ sở Đảng học tập nghị quyết, chuyên đề về lịch sử hình thành Đảng trong tháng 2." },
      ],
      amThuc: [],
      facts: [
        "Hội nghị thành lập Đảng họp tại Cửu Long, Hồng Kông — không phải trên đất Việt Nam — vì lúc đó các tổ chức cộng sản bị cấm tại Đông Dương.",
        "Ban đầu Đảng mang tên 'Đảng Cộng sản Việt Nam'; chỉ 8 tháng sau mới đổi thành 'Đảng Cộng sản Đông Dương' theo tên ba kỳ của thuộc địa.",
        "Nguyễn Ái Quốc chủ trì hội nghị dưới tư cách phái viên Quốc tế Cộng sản, lúc đó chưa đầy 40 tuổi.",
        "Đảng đổi tên ba lần: Cộng sản Việt Nam (1930), Cộng sản Đông Dương (1930), Lao động Việt Nam (1951), rồi trở lại Cộng sản Việt Nam (1976).",
        "Ngày 3/2 không phải ngày nghỉ lễ — nhưng là một trong những ngày kỷ niệm chính trị lớn nhất trong năm.",
      ],
    },
    faq: [
      { q: "3/2 có được nghỉ lễ không?", a: "Không — đây là ngày kỷ niệm chính trị, không nằm trong danh sách ngày nghỉ lễ theo Bộ luật Lao động." },
      { q: "Đảng Cộng sản Việt Nam thành lập ở đâu?", a: "Tại hội nghị hợp nhất ở Cửu Long, Hồng Kông, ngày 3/2/1930 do Nguyễn Ái Quốc chủ trì." },
      { q: "Ba tổ chức nào hợp nhất thành Đảng?", a: "Đông Dương Cộng sản Đảng, An Nam Cộng sản Đảng và Đông Dương Cộng sản Liên đoàn." },
      { q: "Đại hội đầu tiên của Đảng tổ chức khi nào?", a: "Đại hội lần thứ I diễn ra từ 27–31/3/1935 tại Ma Cao — năm năm sau ngày thành lập (3/2/1930). Hội nghị hợp nhất ở Hồng Kông năm 1930 được coi là 'đại hội thành lập' nhưng Đại hội chính thức đầu tiên là 1935." },
    ],
  },
  {
    slug: "ngay-dien-bien-phu",
    heroStyle: "banner",
    signature: [
      {
        kind: "timeline",
        title: "56 ngày đêm khoét núi",
        beats: [
          { year: "11·1953", title: "Pháp dựng căn cứ", text: "Tướng Navarre đổ quân nhảy dù xuống thung lũng Điện Biên Phủ — muốn biến nơi đây thành pháo đài bất khả xâm phạm." },
          { year: "13·3·1954", title: "Mở màn chiến dịch", text: "Pháo ta nổ từ đồi Him Lam — 56 ngày đêm khoét núi, ngủ hầm, huy động cả dân công lẫn xe đạp thồ." },
          { year: "7·5·1954", title: "Cờ trên nóc hầm De Castries", text: "17 giờ 30, quân ta chiếm sở chỉ huy địch — 'lừng lẫy năm châu, chấn động địa cầu'." },
          { year: "7·1954", title: "Hiệp định Genève", text: "Chiến thắng dẫn thẳng tới Genève — Pháp ký hiệp định, chín năm kháng chiến khép lại." },
        ],
      },
    ],
    quotes: [
      { text: "Quyết chiến, quyết thắng.", author: "Khẩu hiệu chiến dịch", work: "Lá cờ Hồ Chủ tịch trao tặng quân đội, 1954" },
    ],
    motif: "medal",
    name: "Ngày Chiến thắng Điện Biên Phủ",
    dateMark: "07·05",
    displayDate: "7 tháng 5",
    rule: { type: "solar", month: 5, day: 7 },
    categories: ["quoc-gia"],
    theme: { from: "#14532d", to: "#7f1d1d", accent: "#fbbf24" },
    tagline: "Chiến thắng 'lừng lẫy năm châu, chấn động địa cầu'.",
    history: [
      "Chiến dịch Điện Biên Phủ diễn ra từ 13/3 đến 7/5/1954 — 55 ngày đêm, đại đoàn quân 308 do tướng Võ Nguyên Giáp chỉ huy đánh bại tập đoàn cứ điểm mạnh nhất của quân viễn chinh Pháp ở lòng chảo đất đỏ Tây Bắc.",
      "Chiều 7/5/1954, lá cờ 'Quyết chiến quyết thắng' tung bay trên nóc hầm tướng De Castries. Chiến thắng buộc Pháp ký Hiệp định Genève ngày 21/7/1954, chấm dứt chiến tranh Đông Dương lần thứ nhất.",
      "Điện Biên Phủ đi vào lịch sử thế giới là trận đầu tiên một nước thuộc địa đánh thắng trực diện một cường quốc phương Tây — 'khải hoàn ca' truyền cảm hứng cho phong trào giải phóng khắp Á Phi Mỹ Latin.",
    ],
    meaning:
      "Biểu tượng của ý chí độc lập — trận đánh khiến một cường quốc thực dân phải ngồi vào bàn đàm phán.",
    traditions: [
      { title: "Viếng nghĩa trang A1", text: "Nghĩa trang liệt sĩ Điện Biên Phủ trên đồi D1 (TP. Điện Biên Phủ) đón các đoàn cựu chiến binh và con cháu về viếng — đông nhất trong tuần lễ 7/5. Nghi thức dâng vòng hoa, thắp hương trước các ngôi mộ là hình ảnh quen thuộc của ngày chiến thắng." },
      { title: "Lễ kỷ niệm tại Điện Biên", text: "Tỉnh Điện Biên tổ chức lễ kỷ niệm hằng năm; các năm tròn (60, 65, 70 năm) nâng lên cấp quốc gia — năm 2024, lễ 70 năm có diễu binh và triển lãm quy mô lớn nhất vùng Tây Bắc từ trước đến nay." },
      { title: "Tư liệu và triển lãm", text: "Bảo tàng Điện Biên Phủ và các thư viện mở triển lãm tư liệu: bản đồ hầm chỉ huy De Castries, thư từ lính thời, ảnh Đoàn 559 kéo pháo qua rừng. Ngày 7/5 là lúc tư liệu lịch sử 'sống lại' với công chúng hiện đại." },
    ],
    wishes: [
      "7/5 — tự hào Điện Biên, tự hào những người đã kéo pháo qua rừng.",
      "Nhớ ơn thế hệ anh hùng Điện Biên Phủ — năm châu lừng lẫy, địa cầu chấn động.",
      "Chúc đất nước giữ vững hòa bình mà cha anh đã đổi bằng sinh mạng.",
      "56 ngày đêm một dải sơn hà — chúc tinh thần Điện Biên sống mãi.",
      "Biết ơn quá khứ để xứng đáng tương lai — chúc 7/5 ý nghĩa.",
    ],
    gifts: [
      { title: "Sách, phim về chiến dịch", text: "'Điện Biên Phủ — điểm hẹn lịch sử', tư liệu Đại tướng Võ Nguyên Giáp." },
      { title: "Chuyến về Điện Biên", text: "Thăm đồi A1, hầm De Castries, nghĩa trang liệt sĩ — món quà trải nghiệm cho người trẻ." },
      { title: "Hoa viếng liệt sĩ", text: "Dâng hoa tại đài tưởng niệm hoặc nghĩa trang liệt sĩ gần nơi bạn sống." },
    ],
    deep: {
      ongNguon: [
        "Cuối 1953, Pháp chọn lưu vực Điện Biên Phủ ở Tây Bắc làm tập đoàn cứ điểm lớn nhất Đông Dương — tưởng chừng bất khả xâm phạm giữa bốn bề núi rừng. Bộ chỉ huy Việt Minh quyết định 'đánh chắc, tiến chắc', huy động bộ đội chủ lực và hàng trăm nghìn dân công kéo pháo vượt núi bằng sức người.",
        "Trận mở màn 13/3/1954 với đồn Beatrice; hướng đi pháo kích khiến sân bay tê liệt, đồi độc lập và Hồng Cúm lần lượt rơi. Chiều 7/5, tổng công kích cuối cùng hạ khu trung tâm — tướng De Castries bị bắt cùng toàn bộ bộ chỉ huy.",
        "Chiến thắng buộc Pháp ký Hiệp định Genève 21/7/1954: binh lính Pháp rút khỏi miền Bắc, Việt Nam tạm chia tại vĩ tuyến 17. Điện Biên Phủ trở thành mốc ngoặt toàn cầu — lần đầu một lực lượng thuộc địa đánh bại quân đội chính quy của nước thực dân trong một trận quyết chiến.",
      ],
      phongTuc: [
        { title: "Viếng đồi A1 và nghĩa trang", text: "Đồi A1 — điểm cao đẫm máu nhất của chiến dịch — cùng nghĩa trang liệt sĩ A1 là nơi người dân tới dâng hương mỗi dịp 7/5." },
        { title: "Lễ mít tinh và diễu binh", text: "Năm tròn chẵn, TP. Điện Biên Phủ tổ chức lễ kỷ niệm cấp quốc gia với diễu binh; năm 2024 kỷ niệm 70 năm có lễ diễu binh lớn." },
        { title: "Tái hiện và triển lãm", text: "Bảo tàng Chiến thắng Điện Biên Phủ trưng bày hiện vật: xe đạp thồ, hầm, mã tấu; triển lãm ảnh đi nhiều tỉnh thành." },
        { title: "Truyền hình và đọc lại sử", text: "Phim tài liệu, tọa đàm sử học và chuỗi '56 ngày đêm' xuất hiện trên truyền thông quanh ngày 7/5." },
        { title: "Học tập tại trường học", text: "Nhiều trường mở chuyên đề lịch sử, cho học sinh nghe lại câu chuyện 'lồng chông', dân công và nghị quyết Ba Na." },
      ],
      amThuc: [],
      facts: [
        "Pháo và đạn của Việt Minh được kéo qua hàng trăm cây số rừng núi bằng sức người, xe đạp thồ và trâu bò — điều tướng Navarre cho là không thể.",
        "Đồi A1 chỉ cao 32m nhưng hai bên đổ máu tranh từng mét trong 39 ngày — trận đánh khốc liệt nhất chiến dịch.",
        "Lá cờ 'Quyết chiến quyết thắng' được thưởng cho quân đội đầu tiên hạ mục tiêu — chiều 7/5 nó tung bay trên nóc hầm De Castries.",
        "Hiệp định Genève 1954 chỉ được ký sau khi Điện Biên Phủ thất thủ — chiến thắng đổi thành đòn bẩy đàm phán trực tiếp.",
        "Kỷ niệm 70 năm (2024), Điện Biên tổ chức diễu binh lớn chưa từng có kể từ năm 1954 trên chính chiến trường xưa.",
      ],
    },
    faq: [
      { q: "7/5 có phải ngày nghỉ lễ?", a: "Không — ngày kỷ niệm chiến thắng, không phải ngày nghỉ quốc gia theo Bộ luật Lao động." },
      { q: "Chiến dịch Điện Biên Phủ kéo dài bao lâu?", a: "56 ngày đêm, từ 13/3/1954 đến chiều 7/5/1954." },
      { q: "Ai chỉ huy chiến dịch phía Việt Nam?", a: "Đại tướng Võ Nguyên Giáp — Tư lệnh kiêm Chính ủy chiến dịch; phía Pháp là tướng Henri Navarre và chỉ huy cứ điểm De Castries." },
      { q: "Chiến thắng Điện Biên Phủ dẫn đến điều gì?", a: "Chiến thắng 7/5/1954 buộc Pháp phải ký Hiệp định Genève (20–21/7/1954) chấm dứt chiến tranh Đông Dương — miền Bắc được giải phóng hoàn toàn. Đây là trận quyết chiến cuối cùng của cuộc kháng chiến chống Pháp." },
    ],
  },
  {
    slug: "ngay-sinh-nhat-bac",
    heroStyle: "framed",
    signature: [
      {
        kind: "timeline",
        title: "Từ làng Sen đến Ba Đình",
        beats: [
          { year: "19·5·1890", title: "Sinh tại làng Hoàng Trù", text: "Người sinh tại làng Hoàng Trù, quê ngoại xã Kim Liên, Nam Đàn, Nghệ An — trong gia đình nhà nho yêu nước." },
          { year: "1911", title: "Ra đi tìm đường", text: "21 tuổi, Người lên tàu Amiral Latouche-Tréville từ bến Nhà Rồng — ba mươi năm phiêu bạt tìm đường cứu nước." },
          { year: "1941", title: "Trở về Pác Bó", text: "Người về nước trực tiếp lãnh đạo cách mạng từ rừng Pác Bó, Cao Bằng." },
          { year: "1945", title: "Đọc Tuyên ngôn", text: "2/9/1945, Người đọc Tuyên ngôn Độc lập tại Ba Đình — từ đứa trẻ làng Sen thành Chủ tịch nước." },
        ],
      },
    ],
    quotes: [
      { text: "Không có gì quý hơn độc lập, tự do.", author: "Hồ Chí Minh", work: "Lời kêu gọi đồng bào và chiến sĩ, 17·7·1966" },
    ],
    motif: "lotus",
    name: "Ngày sinh Chủ tịch Hồ Chí Minh",
    dateMark: "19·05",
    displayDate: "19 tháng 5",
    rule: { type: "solar", month: 5, day: 19 },
    categories: ["quoc-gia"],
    theme: { from: "#7f1d1d", to: "#166534", accent: "#fbbf24" },
    tagline: "Ngày sinh của Người — Bác Hồ trong lòng dân tộc.",
    history: [
      "Ngày 19/5/1890, Nguyễn Sinh Cung — về sau là Hồ Chí Minh — ra đời tại làng Kim Liên, huyện Nam Đàn, xứ Nghệ: đứa con của gia đình nho sĩ nghèo nhưng giàu yêu nước.",
      "Năm 21 tuổi, người thanh niên ấy rời bến Nhà Rồng đi tìm đường cứu nước — ba mươi năm lang bạt các châu lục trước khi trở về Pác Bó lãnh đạo cách mạng giành độc lập năm 1945.",
      "Sau ngày Bác mất năm 1969, sinh nhật Người trở thành dịp cả nước tưởng nhớ — những đoàn về quê Nghệ An, những bông hoa dâng lên Lăng Bác ở Ba Đình và lời hẹn 'làm theo lời Bác'.",
    ],
    meaning:
      "Ngày cả nước quay về Kim Liên trong lòng — tri ân con người đã đi tìm đường cho dân tộc.",
    traditions: [
      { title: "Viếng lăng Bác", text: "Từ sáng sớm 19/5, hàng ngàn người xếp hàng vào Lăng Chủ tịch — đoàn nào cũng nghiêm chỉnh mang vòng hoa. Ngày sinh nhật Bác là một trong những ngày Lăng đông khách nhất năm cùng với Quốc khánh 2/9." },
      { title: "Về nguồn Kim Liên", text: "Làng Hoàng Trù – Kim Liên (Nam Đàn, Nghệ An), nơi Bác sinh ra, đón đoàn 'về nguồn' đông nhất năm dịp 19/5: dâng hoa trước nhà lá quê nội, thắp hương nhà ngoại, nghe hát ví giặm suốt ngày." },
      { title: "Văn nghệ về Bác", text: "Các cuộc thi 'hát về Bác', 'kể chuyện Bác' nở rộ khắp trường học, xã phường quanh ngày 19/5. Sách, phim, tư liệu về cuộc đời Người được giới thiệu lại với thế hệ trẻ qua những câu chuyện gần gũi nhất." },
    ],
    wishes: [
      "Kính nhớ Bác — người dạy ta biết yêu đất nước bằng cả cuộc đời mình.",
      "19/5 — chúc tinh thần 'không có gì quý hơn độc lập, tự do' mãi sáng trong mỗi người Việt.",
      "Làm theo lời Bác: cần, kiệm, liêm, chính, chí công vô tư — chúc ngày 19/5 ý nghĩa.",
      "Tự hào dân tộc có Người — sinh nhật Bác, xin nhớ lời Người dặn.",
      "Chúc mỗi người trẻ Việt Nam đều có chút 'ý chí vươn lên' của Bác Hồ.",
    ],
    gifts: [
      { title: "Chuyến thăm lăng Bác", text: "Đưa người thân, học sinh vào Ba Đình viếng lăng và khu di tích Phủ Chủ tịch." },
      { title: "Sách về Bác", text: "Nhật ký trong tù, tuyển thơ, sách về cuộc đời Người — quà ý nghĩa cho thế hệ trẻ." },
      { title: "Vé xem biểu diễn kỷ niệm", text: "Chương trình nghệ thuật, đêm thơ nhân ngày 19/5 tại Nhà hát Lớn hoặc các tỉnh." },
    ],
    deep: {
      ongNguon: [
        "Nguyễn Sinh Cung sinh ngày 19/5/1890 tại làng Hoàng Trù, huyện Nam Đàn, tỉnh Nghệ An, trong một gia đình nhà nho yêu nước. Những năm đầu đời gắn với làng Sen — quê ngoại — và những chuyến đi thi cùng cha đến Huế.",
        "Năm 1911, thanh niên Nguyễn Tất Thành rời Bến Nhà Rồng trên tàu Amiral Latouche-Tréville, bắt đầu 30 năm bôn ba qua châu Phi, châu Âu, châu Mỹ và châu Á để tìm đường cứu nước — một cuộc hành trình chưa từng có trong lịch sử hiện đại Việt Nam.",
        "Từ năm 1941 trở về nước, Người lãnh đạo Cách mạng tháng Tám, đọc Tuyên ngôn độc lập 1945, và chỉ đạo kháng chiến đến khi qua đời ngày 2/9/1969. Ngày 19/5 trở thành 'sinh nhật Bác' — dịp tri ân không chính thức nhưng rất lớn của người dân.",
      ],
      phongTuc: [
        { title: "Viếng lăng Ba Đình", text: "Lăng Chủ tịch Hồ Chí Minh mở cửa vào sáng, chiều các ngày trong tuần; dịp 19/5 dòng người xếp hàng từ rất sớm để vào lăng viếng." },
        { title: "Về quê Kim Liên", text: "Khu di tích Kim Liên — làng Hoàng Trù — gồm nhà gia đình, cây đa giếng nước và khu trưng bày; đoàn đại biểu từ khắp nơi về dâng hương." },
        { title: "Đêm thơ và hội thảo", text: "Chương trình thơ, nhạc, hội thảo khoa học về tư tưởng Hồ Chí Minh diễn ra khắp nước, nhất là tại Nghệ An và Hà Nội." },
        { title: "Học và làm theo lời Bác", text: "Phong trào 'học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh' đưa nội dung 19/5 vào sinh hoạt trường học, cơ quan." },
        { title: "Chăm lo người có công", text: "Các tổ chức tặng quà, khám sức khỏe cho gia đình chính sách, cựu chiến binh nhân dịp kỷ niệm." },
      ],
      amThuc: [],
      facts: [
        "Tên khai sinh của Bác là Nguyễn Sinh Cung — 'Nguyễn Ái Quốc' chỉ là một trong hơn 70 bút danh và bí danh Người từng dùng.",
        "Người rời Bến Nhà Rồng ngày 5/6/1911 trên tàu Amiral Latouche-Tréville — 30 năm sau mới về nước (1941), lúc đó đã 51 tuổi.",
        "Lăng Bác khánh thành ngày 29/8/1975 — Người muốn hỏa táng nhưng di nguyện được nhân dân giữ lại bằng hình thức lăng.",
        "Năm 1987, UNESCO ra nghị quyết công nhận Hồ Chí Minh là 'anh hùng giải phóng dân tộc và nhà văn hóa kiệt xuất của Việt Nam'.",
        "Người qua đời đúng ngày Quốc khánh 2/9/1969 — tin buồn phải hoãn công bố để không ảnh hưởng lễ kỷ niệm.",
      ],
    },
    faq: [
      { q: "19/5 có được nghỉ lễ không?", a: "Không — ngày kỷ niệm sinh nhật Chủ tịch Hồ Chí Minh, không phải ngày nghỉ lễ theo Bộ luật Lao động." },
      { q: "Bác Hồ sinh ở đâu?", a: "Làng Hoàng Trù, xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An — nơi nay là khu di tích quốc gia đặc biệt." },
      { q: "Lăng Bác mở cửa khi nào?", a: "Sáng thứ Ba, Tư, Năm, Bảy và Chủ nhật hằng tuần (trừ khoảng thời gian bảo dưỡng hằng năm); riêng dịp 19/5 thường có lịch mở riêng — kiểm tra thông báo của Ban Quản lý Lăng." },
      { q: "Tên thật của Bác Hồ là gì?", a: "Bác sinh ngày 19/5/1890 tại Kim Liên với tên khai sinh Nguyễn Sinh Cung; sau đó đổi nhiều lần — Nguyễn Tất Thành, Nguyễn Ái Quốc — và cuối cùng là Hồ Chí Minh, cái tên gắn với Tuyên ngôn Độc lập 1945." },
    ],
  },
  {
    slug: "ngay-cach-mang-thang-tam",
    heroStyle: "poster",
    signature: [
      {
        kind: "timeline",
        title: "Mười bốn ngày đổi vận nước",
        beats: [
          { year: "13·8·1945", title: "Lệnh Tổng khởi nghĩa", text: "Ủy ban Khởi nghĩa toàn quốc ban hành Quân lệnh số 1 — cả nước chuyển sang khởi nghĩa giành chính quyền." },
          { year: "16·8", title: "Quốc dân đại hội Tân Trào", text: "Đại hội 60 đại biểu ở Tân Trào thông qua 10 chính sách lớn và chọn Hồ Chí Minh làm Chủ tịch Chính phủ lâm thời." },
          { year: "19·8", title: "Giành chính quyền Hà Nội", text: "Hàng trăm ngàn người tuần hành, giành chính quyền Thủ đô — ngọn cờ khởi nghĩa lan khắp cả nước." },
          { year: "30·8", title: "Vua Bảo Đại thoái vị", text: "Vua cuối nhà Nguyễn thoái vị, trả ấn kiếm cho Chính phủ cách mạng — nghìn năm quân chủ chấm dứt." },
        ],
      },
    ],
    quotes: [
      { text: "Đoàn quân Việt Nam đi / Chung lòng cứu quốc.", author: "Văn Cao", work: "Tiến quân ca, 1944" },
    ],
    motif: "star",
    name: "Ngày Cách mạng tháng Tám",
    dateMark: "19·08",
    displayDate: "19 tháng 8",
    rule: { type: "solar", month: 8, day: 19 },
    categories: ["quoc-gia"],
    theme: { from: "#991b1b", to: "#dc2626", accent: "#fde047" },
    tagline: "Ngày Hà Nội giành lại chính quyền, mở ra kỷ nguyên độc lập.",
    history: [
      "Cách mạng tháng Tám là cuộc tổng khởi nghĩa giành chính quyền toàn quốc vào tháng 8/1945, khi Nhật đầu hàng Đồng minh để lại khoảng trống quyền lực ở Đông Dương.",
      "Ngày 19/8/1945, hàng chục vạn người Hà Nội chiếm các cơ quan đầu não — Nhà hát lớn, sở mật thám, ngân khố — trong một cuộc khởi nghĩa gần như không đổ máu. Huế nổi dậy 23/8, Sài Gòn 25/8: trong mười lăm ngày, chính quyền về tay nhân dân cả nước.",
      "Từ thắng lợi ấy, vua Bảo Đại thoái vị ngày 30/8/1945 tại Ngọ Môn, Huế — lễ thoái vị đánh dấu chấm dứt chế độ quân chủ Việt Nam. Hai tuần sau, nước Việt Nam Dân chủ Cộng hòa ra đời tại Ba Đình.",
    ],
    meaning:
      "Khoảnh khắc chuyển giao của lịch sử — từ hơn tám mươi năm thuộc địa sang nền độc lập của dân tộc.",
    traditions: [
      { title: "Lễ kỷ niệm tại Nhà hát Lớn", text: "Nhà hát Lớn Hà Nội — nơi mít tinh 19/8/1945 với hàng chục vạn người nghe kêu gọi Tổng khởi nghĩa — là nơi tổ chức lễ kỷ niệm chính thức hằng năm. Quảng trường trước nhà hát mang tên Quảng trường Cách mạng Tháng Tám là 'địa chỉ đỏ' của ngày này." },
      { title: "Diễu hành và treo cờ", text: "Phố phường thủ đô treo cờ đỏ sao vàng suốt tuần lễ 19/8; các đoàn thanh niên diễu hành băng rôn 'Không có gì quý hơn độc lập, tự do' qua phố đi bộ. Ở các tỉnh, lễ kỷ niệm gắn với ngày truyền thống cách mạng của chính địa phương." },
      { title: "Sinh hoạt truyền thống", text: "Các đoàn thể, trường học tổ chức buổi nói chuyện 'Tháng Tám': kể chuyện đoàn quân tiến về Hà Nội, chiếc kèn đồng tổng khởi nghĩa, già làng dẫn đầu thôn lên nhận chính quyền. 19/8 cũng là ngày truyền thống của lực lượng Công an nhân dân." },
    ],
    wishes: [
      "Tự hào tháng Tám! Chúc đất nước mãi giữ được ngọn cờ độc lập năm xưa.",
      "19/8 — nhớ ngày Hà Nội đứng dậy, chúc non sông mãi bình an.",
      "Cách mạng tháng Tám dạy ta: dân tộc muốn đứng dậy thì không gì cản nổi — chúc ngày kỷ niệm ý nghĩa.",
      "Chúc thế hệ trẻ hôm nay xứng đáng với những người đã giành lại đất nước năm 1945.",
      "Một ngày 19/8 nữa — kính dâng lời tri ân tới những người đi trước.",
    ],
    gifts: [
      { title: "Sách về Cách mạng tháng Tám", text: "Tư liệu về Tổng khởi nghĩa, Tân Trào và những ngày lịch sử cuối tháng 8/1945." },
      { title: "Tham quan Nhà hát Lớn", text: "Chuyến đi tới quảng trường Cách mạng tháng Tám — nơi diễn ra mít tinh 19/8." },
      { title: "Bộ sưu tập ảnh Hà Nội 1945", text: "Ảnh tư liệu đen trắng về ngày Hà Nội giành chính quyền — quà cho người yêu lịch sử." },
    ],
    deep: {
      ongNguon: [
        "Giữa tháng 8/1945, Nhật đầu hàng Đồng minh và chính quyền tay sai Trần Trọng Kim lung lay. Trung ương Đảng và Việt Minh ra lệnh Tổng khởi nghĩa: từ 14 đến 25/8, quần chúng nổi dậy giành chính quyền khắp nông thôn và thị trấn.",
        "Ngày 19/8/1945, sau cuộc mít tinh hàng chục vạn người tại quảng trường trước Nhà hát Lớn Hà Nội, đoàn quân và quần chúng giành lấy các cơ quan đầu não: Ty Bắc bộ, Sở Mật thám, Phủ Khâm sai — gần như không đổ máu. Hà Nội thủ phủ trở thành biểu tượng của ngày toàn thắng.",
        "Cách mạng tháng Tám là phép lạ của tổ chức: trong nửa tháng, chính quyền cách mạng hình thành trên cả nước, kết thúc hơn 80 năm thuộc địa và nghìn năm phong kiến — mở đường cho Tuyên ngôn độc lập 2/9/1945.",
      ],
      phongTuc: [
        { title: "Mít tinh tại Nhà hát Lớn", text: "Quảng trường trước Nhà hát Lớn — nơi quần chúng tập hợp trưa 19/8/1945 — là địa chỉ lễ kỷ niệm trọng điểm của Thủ đô." },
        { title: "Treo cờ Tổ quốc", text: "Cơ quan, trường học và nhiều hộ dân treo cờ đỏ sao vàng — nét đẹp quen thuộc của các ngày lễ lớn." },
        { title: "Diễu binh năm tròn chẵn", text: "Các mốc 50, 60, 70, 80 năm Cách mạng tháng Tám có lễ kỷ niệm cấp quốc gia và diễu binh tại Ba Đình." },
        { title: "Hoạt động giáo dục", text: "Trường học tổ chức chuyên đề về Tổng khởi nghĩa, cho học sinh tìm hiểu vai trò của Việt Minh và thời cơ 1945." },
        { title: "Kỷ niệm ngày truyền thống Công an", text: "19/8/1945 cũng là ngày Công an nhân dân giành chính quyền tại Ty Bắc bộ — ngày truyền thống của lực lượng này." },
      ],
      amThuc: [],
      facts: [
        "Cách mạng tháng Tám là tên gọi chung của cao trào Tổng khởi nghĩa 14–25/8/1945 — riêng 19/8 là ngày giành chính quyền tại Hà Nội.",
        "Cuộc giành chính quyền ở Hà Nội diễn ra gần như không đổ máu — phe tay sai đầu hàng trước làn sóng quần chúng.",
        "Vua Bảo Đại thoái vị ngày 30/8/1945 tại Ngọ Môn, Huế — lễ thoái vị đánh dấu chấm dứt chế độ quân chủ Việt Nam.",
        "Ngày 19/8 còn là ngày truyền thống của Công an nhân dân Việt Nam — lực lượng giành chính quyền Ty Bắc bộ đầu tiên.",
        "Tân Trào (Tuyên Quang) — 'thủ đô lâm thời' của cách mạng — nơi diễn ra Quốc dân đại hội thông qua lệnh Tổng khởi nghĩa.",
      ],
    },
    faq: [
      { q: "19/8 có phải ngày nghỉ lễ?", a: "Không — ngày kỷ niệm Cách mạng tháng Tám, không phải ngày nghỉ quốc gia theo Bộ luật Lao động." },
      { q: "Cách mạng tháng Tám là ngày nào?", a: "Cao trào Tổng khởi nghĩa 14–25/8/1945; 19/8/1945 là ngày giành chính quyền tại Hà Nội — được chọn làm ngày kỷ niệm." },
      { q: "Vì sao 19/8 là ngày truyền thống Công an?", a: "Ngày 19/8/1945, lực lượng cách mạng giành Sở Mật thám và Ty Bắc bộ — tiền thân ngành công an được tính từ mốc đó." },
      { q: "Mít tinh 19/8/1945 diễn ra ở đâu?", a: "Tại quảng trường trước Nhà hát Lớn Hà Nội — nơi quần chúng tập hợp nghe đọc lời kêu gọi Tổng khởi nghĩa rồi tiến chiếm các cơ sở chính quyền. Quảng trường này sau được đặt tên Quảng trường Cách mạng Tháng Tám." },
    ],
  },
  {
    slug: "ngay-giai-phong-thu-do",
    heroStyle: "poster",
    signature: [
      {
        kind: "timeline",
        title: "Chín năm kháng chiến về phố",
        beats: [
          { year: "20·7·1954", title: "Hiệp định Genève", text: "Ký hiệp định đình chiến — miền Bắc hoàn toàn giải phóng, bộ đội chuẩn bị tiếp quản Thủ đô." },
          { year: "9·10·1954", title: "Trận địa cuối cùng rút", text: "Quân Pháp rút khỏi cầu Long Biên — Hà Nội hoàn toàn trống quân xâm lược sau chín năm." },
          { year: "10·10·1954", title: "Bộ đội về phố", text: "Sư đoàn 308 — 'Sư đoàn Quân tiên phong' — từ cổng thành Quan Chưởng tiến vào phố, hoa và cờ phủ kín đường về." },
          { year: "Mãi về sau", title: "Ngày của Hà Nội", text: "10/10 thành ngày truyền thống của riêng Thủ đô — 'Giải phóng Thủ đô' là ngày thành phố ngàn năm tuổi về với dân tộc." },
        ],
      },
    ],
    quotes: [
      { text: "Mình về mình có nhớ ta / Mười lăm năm ấy thiết tha mặn nồng.", author: "Tố Hữu", work: "Việt Bắc, 1954" },
    ],
    motif: "flag",
    name: "Ngày Giải phóng Thủ đô",
    dateMark: "10·10",
    displayDate: "10 tháng 10",
    rule: { type: "solar", month: 10, day: 10 },
    categories: ["quoc-gia"],
    theme: { from: "#7f1d1d", to: "#1e3a8a", accent: "#fde047" },
    tagline: "Ngày cờ đỏ sao vàng bay trở lại trên nóc thành Hà Nội.",
    history: [
      "Ngày 10/10 còn là một mốc xa hơn nghìn năm: năm 1010, vua Lý Công Uẩn ban Chiếu dời đô, rời kinh thành Hoa Lư về Đại La và đổi tên Thăng Long — bắt đầu lịch sử nghìn năm của Hà Nội.",
      "Gần một thiên niên kỷ sau, đúng ngày 10/10/1954, Trung đoàn 308 'Đại đoàn quân' tiếp quản Thủ đô sau khi quân Pháp rút qua cầu Paul Doumer theo Hiệp định Genève — kết thúc chín năm kháng chiến trường kỳ.",
      "Với người Hà Nội, 10/10 là 'ngày trở về' — cả thành phố đổ ra đường đón quân ta với cờ hoa và những cái ôm. Ngày lễ tưởng nhớ cả hai cột mốc: vua Lý chọn đất Thăng Long và thế hệ cha anh mang hòa bình về.",
    ],
    meaning:
      "Ngày Hà Nội trở về tay dân tộc — kết thúc một trang sử để mở trang mới của Thủ đô và đất nước.",
    traditions: [
      { title: "Lễ kỷ niệm tại Hà Nội", text: "Lễ kỷ niệm cấp thành phố tổ chức tại Trung tâm Hội nghị quốc gia hoặc Nhà hát Lớn; năm 2024, đại lễ 70 năm là sự kiện lớn nhất của thủ đô với diễu binh, triển lãm và đêm nhạc 'Hà Nội — niềm tin và hy vọng'." },
      { title: "Treo cờ rực phố", text: "Phố cổ Hà Nội ngập trong cờ đỏ những ngày 10/10 — cờ trên nóc ngói cổ, cờ dọc Hàng Đào – Hàng Ngang, nơi đoàn quân giải phóng tiến vào năm 1954. Ngành du lịch mở tour 'theo bước tiếp quản' cho du khách." },
      { title: "Triển lãm 'Hà Nội nhớ'", text: "Bảo tàng Hà Nội và phố sách 19/12 mở triển lãm ảnh 'Hà Nội tiếp quản': xe đạp chở bộ đội, cửa hàng mở lại ngày đầu, thư gia đình báo tin vui. Phần 'câu chuyện người ở lại' luôn được quan tâm nhất." },
    ],
    wishes: [
      "10/10 — chúc Hà Nội mãi là trái tim kiêu hãnh của đất nước.",
      "Nhớ ngày cờ đỏ phủ kín phố — chúc Thủ đô thêm hoa, đất nước thêm yên bình.",
      "Giải phóng Thủ đô 10/10 — tri ân những người lính tiếp quản năm xưa.",
      "Chúc Hà Nội nghìn năm văn hiến luôn giữ vẻ hào hoa, thanh bình.",
      "Tự hào là người con Thủ đô — chúc ngày 10/10 thật ý nghĩa.",
    ],
    gifts: [
      { title: "Sách và bản đồ Hà Nội xưa", text: "Tư liệu về tiếp quản Thủ đô, bản đồ Hà Nội 1954, ảnh tư liệu năm cửa ô." },
      { title: "Đi thăm cột cờ thành Hà Nội", text: "Kỳ đài trong khu di tích Hoàng thành Thăng Long — nơi cờ Tổ quốc kéo lên ngày 10/10." },
      { title: "Chương trình nghệ thuật 10/10", text: "Vé xem hòa nhạc, vở kịch, phim chiếu kỷ niệm ngày giải phóng Thủ đô." },
    ],
    deep: {
      ongNguon: [
        "Sau Hiệp định Genève 1954, quân đội Pháp rút khỏi Hà Nội và miền Bắc theo lộ trình. Trong những tuần cuối tháng 9 và đầu tháng 10/1954, các tổ chức chính quyền cách mạng chuẩn bị tiếp quản từng cơ sở, từng tuyến phố của Thủ đô.",
        "Sáng 10/10/1954, Đại đoàn 308 — 'quân tiên phong' — cùng các đơn vị khác tiến vào Hà Nội qua năm cửa ô: Cầu Giấy, Ô Cầu Dền, Hàng Đậu, Long Biên và Bạch Mai. Hàng trăm nghìn người dân Thủ đô đổ ra đường với cờ hoa chào đón.",
        "Chiều cùng ngày, tại sân vận động Cộng hòa (nay là quảng trường trước cột cờ thành Hà Nội), quốc kỳ đỏ sao vàng được kéo lên Kỳ đài giữa hát Quốc kỳ — Thủ đô hoàn toàn giải phóng, chín quyền cách mạng thay thế 80 năm thực dân.",
      ],
      phongTuc: [
        { title: "Lễ kỷ niệm tại Thủ đô", text: "Năm tròn chẵn có lễ kỷ niệm cấp quốc gia, tái hiện cảnh tiếp quản qua cửa ô; kỷ niệm 70 năm (2024) diễn ra chuỗi sự kiện lớn kéo dài." },
        { title: "Thả diều, bay cờ tại Ba Đình", text: "Quảng trường Ba Đình, đường Điện Biên Phủ rợp cờ; nhiều gia đình đưa trẻ nhỏ đi ngắm cờ Tổ quốc trên Kỳ đài." },
        { title: "Triển lãm và tư liệu", text: "Bảo tàng Hà Nội, bảo tàng lịch sử quân sự mở phòng trưng bày về chiến dịch tiếp quản và 'ngày về' của Thủ đô." },
        { title: "Phim và chương trình truyền hình", text: "Các bộ phim tài liệu về tiếp quản Thủ đô, tọa đàm với nhân chứng 1954 được phát sóng quanh 10/10." },
        { title: "Giáo dục truyền thống", text: "Trường học Hà Nội dạy chuyên đề về ngày giải phóng — phần đặc sắc trong môn lịch sử địa phương." },
      ],
      amThuc: [],
      facts: [
        "Đại đoàn 308 — đơn vị tiếp quản — được mệnh danh 'Đại đoàn quân tiên phong' vì là lữ đoàn chủ lực đầu tiên tiến vào Thủ đô.",
        "Quân đội tiến vào Hà Nội qua năm cửa ô cùng lúc — một phép 'giật mình' tổ chức khiến cả thành phố cùng nghe tiếng kèn rêu đúng một giờ.",
        "Cột cờ trên nóc thành Hà Nội gọi là Kỳ đài, xây năm 1812 — một trong ít công trình còn nguyên của thành cổ Nguyễn.",
        "Người dân Thủ đô đã đợi chín năm cho ngày ấy — từ khi quân Pháp chiếm Hà Nội tháng 12/1946 đến 10/10/1954.",
        "Kỷ niệm 70 năm Giải phóng Thủ đô (10/10/2024) là một trong những sự kiện quốc gia lớn của năm — với diễu binh và chương trình nghệ thuật cấp cao.",
      ],
    },
    faq: [
      { q: "10/10 có được nghỉ lễ không?", a: "Không — là ngày kỷ niệm, không phải ngày nghỉ quốc gia theo Bộ luật Lao động." },
      { q: "Ngày Giải phóng Thủ đô kỷ niệm sự kiện gì?", a: "Ngày 10/10/1954, Quân đội nhân dân Việt Nam tiếp quản Hà Nội sau khi quân Pháp rút theo Hiệp định Genève." },
      { q: "Cờ Tổ quốc kéo lên ở đâu ngày đó?", a: "Trên cột cờ thành Hà Nội (Kỳ đài) — khu di tích Hoàng thành Thăng Long, quận Ba Đình." },
      { q: "Năm 2024 kỷ niệm bao nhiêu năm Giải phóng Thủ đô?", a: "70 năm (1954–2024) — với lễ kỷ niệm cấp quốc gia, diễu binh trên đường phố, triển lãm 'Hà Nội 70 năm' và đêm nhạc lớn tại quảng trường. Đây là dấu mốc lớn gần nhất của ngày này cho đến kỷ niệm 80 năm (2034)." },
    ],
  },
  {
    slug: "ngay-sach-viet-nam",
    heroStyle: "poster",
    signature: [
      {
        kind: "steps",
        title: "Một ngày sống với sách",
        steps: [
          { icon: "book", title: "Giờ đọc chung", text: "Trường học, cơ quan và gia đình cùng dành ra mười lăm phút đọc sách — 'phút sách cùng nhau' đầu ngày 21/4." },
          { icon: "temple", title: "Hội sách", text: "Đường sách, hội chợ sách tỉnh thành dựng lên hàng nghìn đầu sách — nhiều nơi giảm giá sâu chỉ đúng tuần lễ sách." },
          { icon: "heart", title: "Tặng sách đi", text: "Chuyến 'sách về miền cao', tủ sách cộng đồng, hòm quyên góp ở trường học — sách cũ của ai đó là sách mới của người khác." },
          { icon: "star", title: "Gặp gỡ tác giả", text: "Buổi ra mắt sách, ký tặng và tọa đàm cùng nhà văn — độc giả nghe chuyện sau những trang giấy." },
          { icon: "home", title: "Giờ đọc gia đình", text: "Tắt màn hình ba mươi phút, mỗi người một quyển — thói quen nhỏ nhất và cũng bền nhất của văn hóa đọc." },
        ],
      },
    ],
    quotes: [
      { text: "Sách mở ra trước mắt tôi những chân trời mới.", author: "Maxim Gorky", work: "Thư gửi thanh niên" },
    ],
    motif: "book",
    name: "Ngày Sách và Văn hóa đọc Việt Nam",
    dateMark: "21·04",
    displayDate: "21 tháng 4",
    rule: { type: "solar", month: 4, day: 21 },
    categories: ["quoc-gia"],
    theme: { from: "#78350f", to: "#b45309", accent: "#fbbf24" },
    tagline: "Ngày tôn vinh sách và thói quen đọc của người Việt.",
    history: [
      "Ngày Sách và Văn hóa đọc Việt Nam được thiết lập năm 2014 theo quyết định của Thủ tướng — chọn ngày 21/4 hàng năm để khuyến khích văn hóa đọc trong toàn xã hội.",
      "Ngày lễ sát với Ngày Sách và Bản quyền Thế giới 23/4 của UNESCO — ngày tưởng nhớ Cervantes và Shakespeare cùng mất năm 1616, được Liên Hiệp Quốc chọn từ 1995 để tôn vinh sách trên toàn cầu.",
      "Người Việt vốn có truyền thống hiếu học — 'nhất tự vi sư, bán tự vi sư'. Mỗi 21/4, hội sách, ngày hội đọc và những quyên góp thư viện nở khắp nơi — ngày riêng để mở một trang mới.",
    ],
    meaning:
      "Nhắc mỗi người rằng đọc sách là thói quen nuôi tri thức bền nhất — và cùng xây một 'văn hóa đọc' cho cả xã hội.",
    traditions: [
      { title: "Giờ đọc chung", text: "Năm nào ngày 21/4 cũng có 'giờ đọc chung' toàn quốc — trường học, cơ quan, thư viện cùng dừng lại 15–30 phút mở sách đọc. Chiến dịch lan từ tỉnh thành xuống trường học và các cộng đồng đọc." },
      { title: "Hội sách, ngày hội sách", text: "Tuần sách quanh 21/4 nở rộ hội sách: Đường sách TP.HCM, phố sách 19/12 Hà Nội, hội sách thiếu nhi — giảm giá sâu, gặp tác giả, triển lãm 'sách thay đổi thế giới'. Nhiều tỉnh tổ chức hội sách cấp tỉnh lần đầu vào dịp này." },
      { title: "Tặng sách, xây tủ sách", text: "Các quỹ thiện nguyện và trường học mở 'tuần tặng sách': thu gom sách cũ gửi vùng cao, xây tủ sách lớp học, gây quỹ thư viện xã. Ngày 21/4 cũng là dịp gia đình chọn sách để bắt đầu 'truyền thống đọc' cho con." },
      { title: "Ra mắt sách, gặp tác giả", text: "Các nhà xuất bản chọn Ngày Sách ra mắt tựa mới — sinh hoạt tác giả – độc giả trực tiếp tại nhà sách hoặc qua livestream. Các buổi 'gặp tác giả' dịp 21/4 luôn thu hút độc giả trẻ xếp hàng xin chữ ký." },
    ],
    wishes: [
      "21/4 — chúc bạn luôn có một quyển sách hay chờ sẵn trên đầu giường.",
      "Mỗi trang sách lật mở là một chân trời mới — chúc bạn đọc mãi không hết chân trời.",
      "Chúc gia đình bạn một ngày sách tràn ngập tiếng lật trang.",
      "Người đọc sách sống nghìn cuộc đời trước khi chết — chúc bạn nghìn cuộc đời thú vị.",
      "Chúc thế hệ nhỏ của bạn lớn lên bên kệ sách ấm áp của gia đình.",
    ],
    gifts: [
      { title: "Một quyển sách đúng gu", text: "Tặng sách là tặng người đọc một thế giới — chọn đúng chủ đề người ấy đang quan tâm." },
      { title: "Bookmark xinh hoặc đèn đọc sách", text: "Quà nhỏ nhưng cực kỳ hữu dụng cho người hay đọc buổi tối." },
      { title: "Thẻ mua sách / gói đọc ebook", text: "Để người nhận tự chọn — quà an toàn nhất cho mọt sách khó chiều." },
    ],
    deep: {
      ongNguon: [
        "Ngày Sách và Văn hóa đọc Việt Nam ra đời từ Quyết định 284/QĐ-TTg ngày 24/2/2014 của Thủ tướng — lần đầu tiên cả nước có một ngày chính thức để tôn vinh sách và người đọc. Ngày 21/4 được chọn để đứng cạnh Ngày Sách và Bản quyền Thế giới 23/4 mà UNESCO lập từ 1995, tạo thành một 'tuần sách' liên tục.",
        "Hơn một thập kỷ qua, ngày sách đã kéo theo hệ sinh thái riêng: Đường sách Nguyễn Văn Bình ở TP.HCM mở từ 2016 là đường sách đầu tiên của nước ta; các tỉnh thành lần lượt có hội sách định kỳ; và hàng triệu cuốn sách mỗi năm đi từ thành phố về trường học, thư viện cộng đồng ở khắp vùng miền.",
      ],
      phongTuc: [
        { title: "Giờ đọc chung toàn quốc", text: "Biểu tượng đẹp nhất của 21/4: cả lớp, cả gia đình, cả cơ quan cùng im lặng đọc sách trong mười lăm phút — chứng minh đọc sách không cần nhiều, chỉ cần thói quen." },
        { title: "Đường sách và hội chợ sách", text: "Đường sách Nguyễn Văn Bình (TP.HCM), phố sách Đinh Lễ (Hà Nội) và hội chợ sách tỉnh thành thu hút đông nhất vào tuần lễ này, với gian hàng ưu đãi và khu vực đọc thử." },
        { title: "Trao tặng sách vùng xa", text: "Các đoàn thiện nguyện, nhà xuất bản và doanh nghiệp chuyển sách về thư viện trường học miền núi, hải đảo — 'đưa sách về nguồn'." },
        { title: "Ngày hội đọc truyện thiếu nhi", text: "Nhiều thư viện tổ chức kể chuyện, vẽ tranh theo truyện cho trẻ em — gieo thói quen đọc từ nhỏ thay vì ép đọc khi lớn." },
        { title: "Tọa đàm văn hóa đọc", text: "Nhà văn, dịch giả, nhà xuất bản trò chuyện về nghề làm sách — độc giả hiểu một quyển sách đi qua bao nhiêu bàn tay mới tới được kệ." },
        { title: "Tái khám phá thư viện", text: "Thư viện quốc gia, thư viện tỉnh mở cửa tham quan, hướng dẫn đăng ký thẻ — nhiều người lần đầu biết đọc sách miễn phí gần nhà mình." },
      ],
      amThuc: [],
      facts: [
        "Việt Nam chọn 21/4 — hai ngày trước Ngày Sách Thế giới 23/4 của UNESCO — để tạo thành một 'tuần lễ sách' nối tiếp.",
        "Đường sách đầu tiên của Việt Nam là Đường sách Nguyễn Văn Bình ở quận 1, TP.HCM — mở từ 9/1/2016, mô hình sau đó được nhiều tỉnh thành học theo.",
        "Phố sách Đinh Lễ ở Hà Nội từng được ví là 'phố của các lòng mọt sách' — chục cửa hàng nhỏ chen chúc trong một con hẻm vài chục mét.",
        "Năm 2018, Việt Nam chính thức có ngày 21/4 là Ngày Sách và Văn hóa đọc — chứ không chỉ 'ngày sách' đơn thuần: trọng tâm là xây thói quen đọc lâu dài.",
        "Một trong những hình ảnh đặc trưng của ngày này là 'giờ đọc chung' — hàng nghìn trường học cùng dừng hoạt động để đọc sách trong một khung giờ chung.",
      ],
    },
    faq: [
      { q: "Ngày Sách Việt Nam là ngày nào?", a: "21/4 hằng năm — theo Quyết định 284/QĐ-TTg năm 2014 của Thủ tướng." },
      { q: "Khác gì Ngày Sách Thế giới?", a: "Ngày Sách và Bản quyền Thế giới là 23/4 của UNESCO; Việt Nam chọn 21/4 để có ngày riêng và tạo 'tuần sách' nối tiếp." },
      { q: "Có hoạt động gì quanh ngày này?", a: "Hội sách, giờ đọc chung, tặng sách cho thư viện vùng xa, ra mắt sách mới và tọa đàm văn hóa đọc." },
      { q: "21/4 có được nghỉ lễ không?", a: "Không — đây là ngày văn hóa, không phải ngày nghỉ lễ theo Bộ luật Lao động." },
    ],
  },
  {
    slug: "ngay-the-thao-viet-nam",
    heroStyle: "split",
    signature: [
      {
        kind: "steps",
        title: "Một ngày toàn dân rèn luyện",
        steps: [
          { icon: "medal", title: "Ngày chạy Olympic", text: "Hàng triệu người cùng chạy bộ ở công viên, quảng trường và trường học — 'Olympic Run Day' gắn liền với 27/3." },
          { icon: "fullmoon", title: "Thể dục buổi sáng", text: "Bờ hồ Gươm, bến Bạch Đằng vẫn đông nhất lúc 5 giờ sáng — tập dưỡng sinh, khiêu vũ và cầu mây không cần sân." },
          { icon: "star", title: "Giải phong trào", text: "Bóng đá xóm, cầu lông xí nghiệp, võ cổ truyền hội làng — thể thao Việt Nam lớn từ sân đất chứ không chỉ sân cỏ." },
          { icon: "flag", title: "Ngày hội thể thao trường học", text: "Trường học tổ chức hội khỏe Phù Đổng — sân chơi thể thao truyền thống của học sinh từ những năm 1960." },
        ],
      },
    ],
    quotes: [
      { text: "Mỗi một người dân yếu ớt tức là cả dân tộc yếu ớt. Mỗi một người dân khỏe mạnh tức là cả dân tộc khỏe mạnh.", author: "Hồ Chí Minh", work: "Gọi toàn quốc dân tập thể dục, 27·3·1946" },
    ],
    motif: "medal",
    name: "Ngày Thể thao Việt Nam",
    dateMark: "27·03",
    displayDate: "27 tháng 3",
    rule: { type: "solar", month: 3, day: 27 },
    categories: ["quoc-gia"],
    theme: { from: "#991b1b", to: "#ea580c", accent: "#fb923c" },
    tagline: "Ngày tôn vinh tinh thần rèn luyện thân thể của dân tộc.",
    history: [
      "Ngày Thể thao Việt Nam bắt nguồn từ bài viết 'Cần thiết phải có thể dục thể thao' đăng trên báo Cứu Quốc ngày 27/3/1946 — lời kêu gọi của Bác Hồ cho một dân tộc khỏe mạnh để dựng nước.",
      "Trong bài viết ấy, Bác viết: 'Giữ gìn dân chủ, xây dựng nước nhà, gây đời sống mới, việc gì cũng cần có sức khỏe để làm mới thành công' — câu kim chỉ nam của thể thao Việt đến hôm nay.",
      "Từ năm 1991, ngày 27/3 được tổ chức thành Ngày chạy Olympic vì sức khỏe toàn dân — hàng trăm nghìn người cùng chạy khắp các tỉnh thành, kế thừa lời Bác bằng đôi chân thật.",
    ],
    meaning:
      "Khắc ghi lời Bác 'mạnh khỏe để làm việc' — mỗi người khỏe là một phần sức mạnh của cả dân tộc.",
    traditions: [
      { title: "Ngày chạy Olympic", text: "Ngày chạy Olympic vì sức khỏe toàn dân — truyền thống hơn 30 năm — diễn ra sáng chủ nhật gần ngày 27/3 tại hàng trăm điểm đồng loạt khắp cả nước. Từ học sinh đến cụ ông cùng ra đường chạy 'vì sức khỏe' là bức tranh đẹp nhất ngày này." },
      { title: "Thể dục buổi sáng", text: "Ngày Thể thao nhắc lại thói quen 'thể dục buổi sáng' mà Bác Hồ từng kêu gọi — các công viên sáng 27/3 đông đặc hơn thường nhật với lớp dưỡng sinh, dân vũ, yoga công cộng miễn phí." },
      { title: "Giải thể thao phong trào", text: "Hội khỏe Phù Đổng của thiếu nhi, giải chạy xã phường, giải cầu lông đơn vị — phong trào 'toàn dân rèn luyện thân thể theo gương Bác' sôi nổi nhất vào tháng 3. Ngày Thể thao là mốc mở mùa giải quần chúng cả năm." },
      { title: "Vinh danh thành tích", text: "Dịp này, ngành thể thao tổng kết và vinh danh vận động viên đoạt huy chương quốc tế — SEA Games, ASIAD, Olympic. Ngày 27/3 được chọn vì ngày 27/3/1946 Bác Hồ ký sắc lệnh về thể dục thể thao — ngày khai sinh thể thao nước nhà." },
    ],
    wishes: [
      "27/3 — chúc bạn luôn khỏe như vận động viên, chơi hết mình, sống hết mình.",
      "Chúc gia đình mỗi sáng một buổi tập vui, mỗi năm một cơ thể khỏe.",
      "Thể thao Việt Nam — chúc các 'người lính áo cờ' luôn bay cao trên đấu trường thế giới.",
      "Mạnh khỏe để làm việc, để yêu, để sống — chúc bạn một ngày thể thao đầy năng lượng.",
      "Chúc đội bóng của bạn thắng trận cuối tuần này — và thắng cả cơn lười sáng mai.",
    ],
    gifts: [
      { title: "Giày chạy bộ / đồ tập", text: "Món quà khích lệ ai đó bắt đầu thói quen vận động." },
      { title: "Vé xem thể thao", text: "Một trận bóng, một giải cầu lông hay võ thuật — đi xem là nuôi tinh thần thể thao." },
      { title: "Dụng cụ tập tại nhà", text: "Xà đơn, tạ tay, thảm yoga — quà thiết thực cho người bận không ra phòng gym." },
    ],
    deep: {
      ongNguon: [
        "Giữa những ngày đầu non trẻ của nhà nước Việt Nam Dân chủ Cộng hòa, khi cả nước còn thiếu cơm ăn, Bác Hồ vẫn nghĩ đến chuyện rèn luyện thân thể cho dân tộc. Sắc lệnh số 33 ký ngày 27/3/1946 yêu cầu thanh niên, học sinh và quân nhân tập thể dục, đưa thể dục vào chương trình nhà trường — 'khỏe để xây dựng và bảo vệ Tổ quốc'.",
        "Từ văn kiện ấy, ngày 27/3 được lấy làm ngày truyền thống của ngành Thể dục Thể thao Việt Nam. Gắn với nó là Ngày chạy Olympic vì sức khỏe toàn dân — mỗi năm hàng trăm nghìn người cùng chạy bộ khắp các tỉnh thành, biến một sắc lệnh của năm 1946 thành thói quen vận động của cả xã hội hôm nay.",
      ],
      phongTuc: [
        { title: "Ngày chạy Olympic vì sức khỏe toàn dân", text: "Sự kiện chạy bộ tập thể lớn nhất Việt Nam, tổ chức tại hầu hết tỉnh thành vào cuối tháng 3 — ai cũng chạy được, không đo thành tích, chỉ đo niềm vui." },
        { title: "Hội khỏe Phù Đổng", text: "Sân chơi thể thao truyền thống của học sinh Việt Nam từ những năm 1960 — tới nay vẫn là giải phong trào lớn nhất của tuổi đi học." },
        { title: "Thể dục công viên sáng sớm", text: "Bờ hồ Gươm ở Hà Nội, bến Bạch Đằng ở TP.HCM là những 'phòng tập mở' tự nhiên — dưỡng sinh, khiêu vũ thể dục, cầu mây miễn phí mỗi sớm." },
        { title: "Vinh danh vận động viên", text: "Cuối năm, Cúp Chiến thắng và các lễ tổng kết ngành tôn vinh vận động viên, huấn luyện viên tiêu biểu — phần thưởng tinh thần của cả nền thể thao." },
        { title: "Thể thao cộng đồng", text: "Giải bóng đá hội làng, cầu lông cơ quan, chạy bộ từ thiện — phần lớn thể thao Việt Nam sống ở sân đất và nhà văn hóa." },
        { title: "Sân chơi Olympic", text: "Cứ bốn năm một lần Olympic và SEA Games, cả nước lại đứng trước màn hình — ngày thể thao là dịp nhớ lại những khoảnh khắc vàng ấy." },
      ],
      amThuc: [],
      facts: [
        "Sắc lệnh 33 năm 1946 ghi rõ: 'các em học sinh, các anh chị em học viên đều phải học thể dục' — thể dục là môn học chính thức từ rất sớm.",
        "Tấm huy chương vàng Olympic đầu tiên của Việt Nam thuộc về xạ thủ Hoàng Xuân Vinh — nội dung 10m súng ngắn hơi nam tại Rio 2016, kèm thêm HC bạc 50m.",
        "SEA Games 31 tại Hà Nội (2022), đoàn Việt Nam đứng đầu toàn đoàn với 205 huy chương vàng — kỷ lục của một nước chủ nhà.",
        "Bóng đá là môn 'quốc dân': chiếc Cúp vô địch AFF 2018 khiến hàng triệu người đổ ra đường 'đi bão' — một trong những đêm thể thao lớn nhất lịch sử gần đây.",
        "'Mạnh khỏe để làm việc' — câu nói gắn với sắc lệnh 1946 đến nay vẫn in trên khẩu hiệu của ngành thể thao.",
      ],
    },
    faq: [
      { q: "Ngày Thể thao Việt Nam là ngày nào?", a: "27/3 hằng năm — kỷ niệm Sắc lệnh số 33 Bác Hồ ký năm 1946 khai sinh ngành thể dục thể thao." },
      { q: "Ngày chạy Olympic diễn ra khi nào?", a: "Vào cuối tháng 3 hằng năm tại các tỉnh thành, gắn liền với Ngày Thể thao Việt Nam — ai cũng có thể tham gia chạy bộ." },
      { q: "Hội khỏe Phù Đổng là gì?", a: "Sân chơi thể thao truyền thống của học sinh Việt Nam từ thập niên 1960, lấy tên truyền thuyết Thánh Gióng Phù Đổng." },
      { q: "27/3 có được nghỉ lễ không?", a: "Không — là ngày truyền thống của ngành, không phải ngày nghỉ quốc gia." },
    ],
  },
  {
    slug: "ngay-phap-luat-viet-nam",
    heroStyle: "framed",
    signature: [
      {
        kind: "timeline",
        title: "Những bước lập hiến",
        beats: [
          { year: "9·11·1946", title: "Hiến pháp đầu tiên", text: "Quốc hội khóa I thông qua Hiến pháp 1946 — bản hiến pháp đầu tiên của nước Việt Nam Dân chủ Cộng hòa, viết trong lửa kháng chiến." },
          { year: "1959", title: "Hiến pháp 1959", text: "Bản hiến pháp thứ hai — thể chế hóa miền Bắc xã hội chủ nghĩa sau ngày đất nước tạm chia đôi." },
          { year: "1980", title: "Hiến pháp 1980", text: "Bản hiến pháp thứ ba — thể chế hóa thời kỳ cả nước cùng đi lên chủ nghĩa xã hội." },
          { year: "1992", title: "Hiến pháp 1992", text: "Hiến pháp của thời kỳ đổi mới — ghi nhận kinh tế nhiều thành phần sau gần một thập kỷ mở cửa." },
          { year: "2013", title: "Hiến pháp 2013", text: "Bản hiến pháp thứ năm hiện hành — và cũng từ năm nay, 9/11 chính thức là Ngày Pháp luật Việt Nam." },
        ],
      },
    ],
    quotes: [
      { text: "Tất cả quyền lực trong nước là của toàn thể nhân dân.", author: "Hiến pháp 1946", work: "Điều 2" },
    ],
    motif: "star",
    name: "Ngày Pháp luật Việt Nam",
    dateMark: "09·11",
    displayDate: "9 tháng 11",
    rule: { type: "solar", month: 11, day: 9 },
    categories: ["quoc-gia"],
    theme: { from: "#1e3a8a", to: "#3730a3", accent: "#818cf8" },
    tagline: "Ngày tôn vinh và phổ biến pháp luật đến mọi người dân.",
    history: [
      "Ngày 9/11/1946, Quốc hội khóa I của nước Việt Nam Dân chủ Cộng hòa thông qua bản Hiến pháp đầu tiên — đạo luật cơ bản đầu tiên của nhà nước non trẻ, viết trong lúc đất nước vừa độc lập đã phải chuẩn bị kháng chiến.",
      "Hiến pháp 1946 được coi là một trong những bản hiến pháp tiên tiến nhất châu Á thời bấy giờ: khẳng định quyền dân chủ, tự do ngôn luận và bình đẳng giới — vượt xa nhiều nước đương thời.",
      "Năm 2013, chính phủ chọn ngày 9/11 làm Ngày Pháp luật Việt Nam — dịp phổ biến pháp luật, tôn vinh người làm luật và nhắc nhở rằng nhà nước pháp quyền bắt đầu từ một buổi họp Quốc hội năm 1946.",
    ],
    meaning:
      "Nhắc nguyên tắc căn bản nhất của xã hội hiện đại: nhà nước quản lý xã hội bằng pháp luật — và không ai được đứng trên pháp luật.",
    traditions: [
      { title: "Phổ biến pháp luật", text: "Ngày 9/11, 'ngày pháp luật' là hoạt động chính: đội tuyên truyền phát tờ rơi về luật mới, pano biển luật treo khắp nơi, các lớp tập huấn Luật Đất đai, Luật Hôn nhân và gia đình mở ra tại từng xã phường." },
      { title: "Tư vấn pháp luật miễn phí", text: "Quầy tư vấn luật miễn phí được dựng ở chùa, đình, trung tâm hành chính: luật sư tình nguyện giải đáp về đất đai, lao động, hôn nhân — những vấn đề người dân hỏi nhiều nhất. Đây là hoạt động thiết thực nhất của ngày này." },
      { title: "Đố vui pháp luật ở trường học", text: "Trường học tổ chức cuộc thi 'Tìm hiểu pháp luật' với các câu đố tình huống gần gũi: đi xe máy không mũ bảo hiểm, hợp đồng lao động, cư xử trên mạng xã hội — học sinh học luật qua trò chơi thay vì bài giảng." },
      { title: "Vinh danh người làm luật", text: "Ngành tư pháp gặp mặt truyền thống: vinh danh người soạn luật, thẩm phán, luật sư, cán bộ pháp chế tiêu biểu — và nhắc lại ngày Quốc hội khóa I thông qua Hiến pháp đầu tiên ngày 9/11/1946." },
    ],
    wishes: [
      "9/11 — chúc bạn sống thật tự do trong khuôn khổ thật rõ ràng.",
      "Hiểu luật để bảo vệ mình, tôn trọng luật để bảo vệ nhau — chúc ngày pháp luật ý nghĩa.",
      "Chúc người làm luật luôn giữ được cán cân công bằng giữa đời.",
      "Pháp luật là tấm khiên của người yếu — chúc nó luôn được giơ đúng lúc.",
      "Chúc gia đình bạn một ngày bình an — thứ bình an mà chỉ xã hội thượng tôn pháp luật mới có.",
    ],
    gifts: [
      { title: "Sách pháp luật phổ thông", text: "Những cuốn 'luật cho người không học luật' — quà thiết thực bất ngờ." },
      { title: "Buổi tư vấn pháp luật", text: "Gói tư vấn của luật sư cho người đang vướng giấy tờ, hợp đồng hay đất đai." },
      { title: "Tham quan Di sản Quốc hội", text: "Ghé Bảo tàng Quốc hội hoặc Nhà Quốc hội — nơi bản hiến pháp đầu tiên được thông qua." },
    ],
    deep: {
      ongNguon: [
        "Ngày 9/11/1946, trong phiên họp tại Nhà hát Lớn Hà Nội, Quốc hội khóa I thông qua bản Hiến pháp đầu tiên của nước Việt Nam Dân chủ Cộng hòa — chỉ hơn một năm sau tuyên ngôn độc lập. Bản hiến pháp được viết trong tình thế 'ngàn cân treo sợi tóc', khẳng định các quyền tự do công dân, quyền lực của nhân dân và nền dân chủ — nền tảng pháp lý cho nhà nước non trẻ.",
        "Để kỷ niệm sự kiện lập hiến ấy, năm 2013, ngày 9/11 được chọn làm Ngày Pháp luật Việt Nam. Từ đó mỗi năm, các cơ quan, trường học, doanh nghiệp tổ chức phổ biến pháp luật: đưa những điều luật khô khan thành câu đố, tiểu phẩm, buổi tư vấn gần dân — vì mục tiêu cuối cùng của pháp luật không nằm trong sách mà trong đời sống.",
      ],
      phongTuc: [
        { title: "Phổ biến luật tới cơ sở", text: "Tổ pháp luật cộng đồng, hội nghị phường xã phổ biến luật mới có hiệu lực — đưa luật đến người ít tiếp cận giấy tờ nhất." },
        { title: "Tư vấn pháp luật miễn phí", text: "Trung tâm trợ giúp pháp lý, đoàn luật sư mở quầy tư vấn không thu phí — về đất đai, thừa kế, lao động, hôn nhân." },
        { title: "Truyền thông đại chúng", text: "Báo chí, truyền hình, mạng xã hội đẩy nội dung phổ biến pháp luật — từ phim tình huống đến infographic luật mới." },
        { title: "Giáo dục pháp luật trong trường học", text: "Sinh hoạt chủ đề, cuộc thi hiểu luật, tiểu phẩm tình huống — hình thành ý thức công dân từ ghế nhà trường." },
        { title: "Nghi thức tuyên thệ", text: "Nhiều cơ quan, trường học tổ chức tuyên thệ tôn trọng Hiến pháp và pháp luật — nghi thức gắn kết luật với lòng tự hào công dân." },
        { title: "Tọa đàm cải cách pháp luật", text: "Giới luật học, luật sư và người làm luật bàn về điểm mới các bộ luật — cầu nối giữa dự thảo và cuộc sống." },
      ],
      amThuc: [],
      facts: [
        "Hiến pháp 1946 gồm 7 chương 70 điều — được thông qua chỉ hơn một năm sau ngày độc lập, giữa bối cảnh chiến tranh sắp bùng nổ toàn quốc.",
        "Việt Nam hiện có năm bản hiến pháp: 1946, 1959, 1980, 1992 và 2013 — mỗi bản gắn một giai đoạn lịch sử.",
        "Hiến pháp 1946 khẳng định 'quyền lực thuộc về toàn thể nhân dân' — nguyên tắc dân chủ nền tảng từ ngày đầu lập quốc.",
        "Ngày Pháp luật Việt Nam bắt đầu từ 2013 — lấy mốc 9/11/1946 Quốc hội khóa I thông qua hiến pháp đầu tiên.",
        "Phiên họp Quốc hội thông qua Hiến pháp 1946 diễn ra tại Nhà hát Lớn Hà Nội — công trình Pháp vẫn đứng đến nay.",
      ],
    },
    faq: [
      { q: "Ngày Pháp luật Việt Nam là ngày nào?", a: "9/11 hằng năm — kỷ niệm ngày Quốc hội khóa I thông qua Hiến pháp 1946." },
      { q: "Việt Nam có mấy bản hiến pháp?", a: "Năm bản: 1946, 1959, 1980, 1992 và 2013 (đang hiện hành)." },
      { q: "9/11 có được nghỉ lễ không?", a: "Không — là ngày tuyên truyền, phổ biến pháp luật, không phải ngày nghỉ quốc gia." },
      { q: "Hiến pháp 1946 được thông qua ở đâu?", a: "Tại phiên họp Quốc hội khóa I ở Nhà hát Lớn Hà Nội, ngày 9/11/1946." },
    ],
  },
  {
    slug: "ngay-thuong-mai-viet-nam",
    heroStyle: "banner",
    signature: [
      {
        kind: "timeline",
        title: "Hành trình thương mại",
        beats: [
          { year: "13·7·1946", title: "Bộ Kinh tế ra đời", text: "Bác Hồ ký sắc lệnh thành lập Bộ Kinh tế — tiền thân của ngành Thương mại, giữa những ngày đầu non trẻ của nhà nước." },
          { year: "1986", title: "Đổi mới mở cửa", text: "Đại hội VI của Đảng mở ra thời đổi mới — kinh tế nhiều thành phần, buôn bán trở lại là nghề được tôn trọng." },
          { year: "2007", title: "Vào WTO", text: "Việt Nam chính thức gia nhập Tổ chức Thương mại Thế giới — sân chơi toàn cầu đầu tiên của nền thương mại." },
          { year: "2019–2020", title: "CPTPP & EVFTA", text: "Hiệp định thương mại thế hệ mới đưa hàng Việt tới châu Âu, châu Mỹ với thuế gần như bằng không." },
        ],
      },
    ],
    quotes: [
      { text: "Phú thương, phú quý.", author: "Ngạn ngữ", work: "Lời chúc buôn bán truyền thống" },
    ],
    motif: "star",
    name: "Ngày Thương mại Việt Nam",
    dateMark: "13·07",
    displayDate: "13 tháng 7",
    rule: { type: "solar", month: 7, day: 13 },
    categories: ["quoc-gia"],
    theme: { from: "#0f766e", to: "#0891b2", accent: "#2dd4bf" },
    tagline: "Ngày tôn vinh nghề buôn bán và hàng Việt vươn ra thế giới.",
    history: [
      "Ngày Thương mại Việt Nam gắn với mốc 13/7/1946 — khi Chính phủ thành lập cơ quan quản lý ngoại thương đầu tiên của nước non trẻ, đặt nền cho ngành thương mại quốc gia.",
      "Qua đổi mới từ 1986, thương mại Việt Nam vươn từ con số khiêm tốn thành một trong những nền kinh tế mở nhất châu Á — hàng trăm tỷ đô la xuất nhập khẩu mỗi năm, từ gạo cà phê đến điện thoại công nghệ.",
      "Được chính thức hóa thành ngày hội từ 2007, 13/7 là dịp vinh danh doanh nghiệp xuất nhập khẩu, các hội chợ thương mại và gửi lời chúc đến đội ngũ 'xách vali đi buôn' đưa hàng Việt ra thế giới.",
    ],
    meaning:
      "Vinh danh những người làm kinh tế — từ bà bán chợ đến doanh nghiệp xuất khẩu — nghề đã đưa hàng Việt và chữ 'Việt Nam' ra bản đồ thế giới.",
    traditions: [
      { title: "Hội chợ thương mại", text: "Quanh 13/7 và suốt mùa hè là mùa hội chợ: Vietnam Expo, VietFood và hội chợ cấp tỉnh — gian hàng 'hàng Việt' chính hiệu trưng bày sản phẩm xuất khẩu, đặc sản OCOP của từng địa phương. Đây là 'ngày hội' của mặt trận thương mại nước nhà." },
      { title: "Vinh danh doanh nghiệp", text: "Ngày Thương mại gắn với vinh danh doanh nghiệp xuất khẩu giỏi: giải 'doanh nghiệp xuất khẩu tin cậy', top doanh nghiệp FDI xuất khẩu lớn. Khác 13/10 vinh danh con người doanh nhân, ngày này vinh danh tổ chức làm thương mại." },
      { title: "Tọa đàm xuất nhập khẩu", text: "Bộ Công Thương và các hiệp hội chế biến xuất khẩu tổ chức tọa đàm quanh ngày này: xu hướng thị trường EU – Mỹ – Nhật, tận dụng EVFTA, thương mại điện tử xuyên biên giới — những chủ đề nóng của xuất khẩu Việt." },
      { title: "Tuần hàng Việt", text: "'Tuần lễ hàng Việt' cùng chương trình 'Người Việt ưu tiên dùng hàng Việt' diễn ra dịp 13/7: siêu thị giảm giá hàng nội, ngày hội mua sắm đặc sản vùng miền — đưa 'hàng Việt Nam' đến với người Việt trước tiên." },
    ],
    wishes: [
      "13/7 — chúc người làm ăn gặp nhiều may, mua may bán đắt, phát tài phát lộc.",
      "Chúc ngành thương mại Việt Nam ngày càng vươn xa — hàng Việt đến mọi châu lục.",
      "Chúc doanh nghiệp bạn đơn đầy kho, tiền về đều, đối tác tin cậy.",
      "Phú thương, phú quý — chúc bạn một năm buôn bán hanh thông.",
      "Từ sạp chợ quê đến container xuất khẩu — chúc mọi 'người bán' Việt đều vững vàng.",
    ],
    gifts: [
      { title: "Hàng Việt chất lượng", text: "Chọn một món quà 'made in Vietnam' thay đồ nhập — ủng hộ thương mại bằng chính cách tiêu tiền." },
      { title: "Cà phê, trà đặc sản", text: "Hai thứ hàng Việt nổi tiếng thế giới — quà tặng đối tác trong và ngoài nước." },
      { title: "Tham quan hội chợ", text: "Đưa người thân đi triển lãm thương mại — thấy tận mắt hàng Việt đã đi xa đến đâu." },
    ],
    deep: {
      ongNguon: [
        "Ngày 13/7/1946, Chủ tịch Hồ Chí Minh ký sắc lệnh thành lập Bộ Kinh tế — ngành quản lý hoạt động kinh tế, buôn bán của nước Việt Nam Dân chủ Cộng hòa non trẻ. Đó là gốc rễ của ngành Thương mại hôm nay: từ một bộ kinh tế với nhiệm vụ chống đói, tổ chức lưu thông hàng hóa giữa các vùng.",
        "Gần tám thập kỷ sau, 'thương mại' đã trở thành một trong những nền tảng của kinh tế Việt Nam. Sau đổi mới 1986, gia nhập WTO 2007 và loạt hiệp định thế hệ mới như CPTPP, EVFTA, Việt Nam lọt nhóm nền kinh tế thương mại mở nhất châu Á — với cà phê đứng thứ hai thế giới, gạo trong top đầu xuất khẩu và hàng điện tử chiếm phần lớn kim ngạch.",
      ],
      phongTuc: [
        { title: "Vietnam Expo & hội chợ ngành", text: "Triển lãm xúc tiến thương mại lớn nhất nước — nơi doanh nghiệp Việt gặp đối tác ngoại quốc, tổ chức định kỳ tại Hà Nội và TP.HCM." },
        { title: "Vinh danh xuất sắc thương mại", text: "Giải thương hiệu quốc gia, doanh nghiệp xuất khẩu uy tín và 'hàng Việt chất lượng cao' được trao dồn về các dịp ngành." },
        { title: "Diễn đàn chính sách thương mại", text: "Bộ Công Thương, hiệp hội ngành hàng và viện nghiên cứu tọa đàm về thị trường, FTA và cạnh tranh quốc tế." },
        { title: "Thương mại điện tử", text: "Online Friday, các ngày hội mua sắm số — mặt mới của thương mại Việt khi sàn điện tử đưa hàng quê lên cả nước." },
        { title: "Chiến dịch hàng Việt", text: "'Người Việt ưu tiên dùng hàng Việt' — phong trào tiêu dùng nội chạy song song với xuất khẩu." },
        { title: "Cửa khẩu và logistics", text: "Ngày thương mại cũng là dịp vinh danh cảng biển, logistics — hạ tầng 'máu thương mại' của cả nước." },
      ],
      amThuc: [],
      facts: [
        "Bộ Kinh tế được Bác Hồ ký sắc lệnh thành lập ngày 13/7/1946 — chỉ hơn mười tháng sau tuyên ngôn độc lập.",
        "Cà phê Việt Nam đứng thứ hai thế giới về xuất khẩu — vị trí giữ vững nhiều năm sau Brazil.",
        "Chợ Đồng Xuân ở Hà Nội xây từ 1889 — một trong những 'biểu tượng thương mại' lâu đời nhất vẫn hoạt động đến nay.",
        "Kim ngạch xuất nhập khẩu của Việt Nam những năm gần đây ở mức hơn 700 tỷ USD — lớn hơn cả GDP của chính mình, biểu tượng của nền kinh tế mở.",
        "Từ nước nhập khẩu gạo, Việt Nam trở thành một trong ba nước xuất khẩu gạo lớn nhất thế giới — cùng Ấn Độ và Thái Lan.",
      ],
    },
    faq: [
      { q: "Ngày Thương mại Việt Nam là ngày nào?", a: "13/7 hằng năm — kỷ niệm sắc lệnh thành lập Bộ Kinh tế năm 1946." },
      { q: "Ngày này khác Ngày Doanh nhân 13/10 không?", a: "Khác — 13/7 vinh danh ngành thương mại và nghề buôn bán; 13/10 tôn vinh doanh nhân, doanh nghiệp." },
      { q: "Việt Nam xuất khẩu mạnh nhất mặt hàng nào?", a: "Điện thoại và linh kiện, dệt may, giày dép — và nông sản như cà phê (đứng thứ hai thế giới), gạo, thủy sản." },
      { q: "13/7 có được nghỉ lễ không?", a: "Không — là ngày truyền thống của ngành, không phải ngày nghỉ quốc gia." },
    ],
  },
  {
    slug: "ngay-doan-thanh-nien",
    heroStyle: "poster",
    signature: [
      {
        kind: "timeline",
        title: "Chín mươi năm tuổi trẻ",
        beats: [
          { year: "26·3·1931", title: "Đoàn ra đời ở Vinh", text: "Đại hội lần thứ nhất của Đoàn Thanh niên Cộng sản họp tại Vinh — tổ chức thanh niên đầu tiên của cách mạng Việt Nam chính thức khai sinh." },
          { year: "20·11·1931", title: "Lý Tự Trọng hy sinh", text: "Đoàn viên 17 tuổi chịu xử bắn ở Sài Gòn — tấm gương đầu tiên về lòng tin vào lý tưởng của tuổi trẻ Việt." },
          { year: "15·7·1950", title: "Thanh niên xung phong", text: "Đội Thanh niên xung phong đầu tiên thành lập — từ đường Trường Sơn đến chiến trường Điện Biên, TNXP trở thành truyền thống xung kích của giới trẻ." },
          { year: "1970", title: "Mang tên Người", text: "Đoàn mang tên 'Thanh niên Lao động Hồ Chí Minh' — dòng chữ Hồ Chí Minh gắn với tổ chức thanh niên từ đây." },
          { year: "Hôm nay", title: "Tình nguyện & sáng tạo", text: "Hàng triệu đoàn viên làm tình nguyện hè, khởi nghiệp, chuyển đổi số — 'xung kích' hôm nay là dựng xây chứ không còn chiến trường." },
        ],
      },
    ],
    quotes: [
      { text: "Thanh niên là chủ nhân tương lai của nước nhà. Nước nhà thịnh hay suy, yếu hay mạnh một phần lớn ở thanh niên.", author: "Hồ Chí Minh" },
    ],
    motif: "star",
    name: "Ngày Thành lập Đoàn TNCS Hồ Chí Minh",
    dateMark: "26·03",
    displayDate: "26 tháng 3",
    rule: { type: "solar", month: 3, day: 26 },
    categories: ["quoc-gia"],
    theme: { from: "#b91c1c", to: "#b45309", accent: "#fbbf24" },
    tagline: "Ngày kỷ niệm ra đời tổ chức thanh niên lớn nhất Việt Nam.",
    history: [
      "Ngày 26/3/1931, tại Đại hội toàn quốc lần thứ nhất của Đảng tổ chức ở Mặc Ao, Đoàn Thanh niên Cộng sản Đông Dương chính thức ra đời — tổ chức thanh niên đầu tiên của dân tộc.",
      "Chỉ vài tháng sau, Lý Tự Trọng — đoàn viên đoàn đầu tiên bị địch bắt và xử bắn ở Sài Gòn tháng 11/1931 — để lại câu nói bất hủ 'Con đường của thanh niên chỉ là con đường cách mạng', trở thành hình mẫu thanh niên Việt.",
      "Đoàn đổi tên thành Đoàn TNCS Hồ Chí Minh năm 1962. Từ thanh niên xung phong đến tình nguyện viên hôm nay, 26/3 là ngày hội của tuổi trẻ Việt Nam — 'tuổi trẻ đáng giá bằng vàng'.",
    ],
    meaning:
      "Ngày nhắc tuổi trẻ về truyền thống xung kích hơn chín mươi năm — từ Lý Tự Trọng đến thanh niên xung phong, đến mùa hè xanh và khởi nghiệp hôm nay.",
    traditions: [
      { title: "Kết nạp đoàn viên mới", text: "Ngày Thành lập Đoàn là 'ngày đẹp nhất' để kết nạp đoàn viên: học sinh lớp 9 trở lên đứng trước lá cờ đoàn đọc lời hứa — khoảnh khắc 'trưởng thành đầu tiên' mà nhiều người nhớ cả đời." },
      { title: "Tháng Thanh niên", text: "Từ năm 2004, tháng 3 trở thành 'Tháng Thanh niên': tình nguyện xây dựng, hiến máu, trồng cây, làm sạch biển — tuổi trẻ cả nước ra quân cùng một màu áo xanh. Ngày 26/3 là đỉnh của tháng hoạt động này." },
      { title: "Mít tinh, gặp mặt truyền thống", text: "Lễ kỷ niệm trang trọng đọc lại lịch sử Đoàn từ ngày 26/3/1931 tại Vinh, nhớ Lý Tự Trọng — đoàn viên đầu tiên hy sinh khi mới 17 tuổi — và gặp mặt các thế hệ đoàn viên qua từng thời kỳ." },
      { title: "Tình nguyện xây dựng", text: "Tuyến đường thanh niên, cầu dân sinh, nhà văn hóa do đoàn viên tình nguyện xây dựng là 'sản phẩm' truyền thống của Đoàn: từ con đường Hồ Chí Minh huyền thoại đến những tuyến 'Đoàn về quê' làm đường làng ngày nay." },
    ],
    wishes: [
      "26/3 — chúc tuổi trẻ của bạn luôn có một chỗ đứng xung kích cho riêng mình.",
      "Chúc các đoàn viên giữ mãi ngọn lửa nhiệt huyết — dù ở giảng đường, phòng lab hay bản nghèo.",
      "Tuổi trẻ không chờ đợi — chúc bạn một ngày thành lập đoàn thật bận rộn và đáng nhớ.",
      "Chúc thanh niên Việt Nam tiếp tục viết truyền thống xung kích bằng sáng tạo và tình nguyện.",
      "Gửi đến đoàn viên cũ và mới: cảm ơn những mùa hè xanh, những chuyến xe tình nguyện — ngày 26/3 là của các bạn.",
    ],
    gifts: [
      { title: "Huy hiệu đoàn, sổ đoàn viên", text: "Kỷ vật nhỏ nhưng thiêng liêng với ai đang kết nạp đoàn." },
      { title: "Áo phông tình nguyện", text: "Chiếc áo xanh mùa hè xanh hay đỏ xuân tình nguyện — 'đồng phục' của tuổi trẻ xung kích." },
      { title: "Sách về anh hùng trẻ", text: "Truyện Lý Tự Trọng, Võ Thị Sáu — nhắc tuổi trẻ rằng tuổi 17–20 cũng đủ lớn để cống hiến." },
    ],
    deep: {
      ongNguon: [
        "Cuối tháng 3 năm 1931, trong những ngày cách mạng Việt Nam vừa vượt qua cơn khủng hoảng sau khi Đảng ra đời, đại hội thành lập Đoàn Thanh niên Cộng sản được tổ chức tại Vinh — tỉnh trung tâm của phong trào Xô viết Nghệ Tĩnh. Đây là tổ chức thanh niên cách mạng đầu tiên của Việt Nam, thu hút giới trẻ yêu nước vào hàng ngũ chung.",
        "Qua chín mươi năm, tổ chức ấy đổi tên nhiều lần theo từng giai đoạn lịch sử, nhưng một chữ 'xung kích' không đổi: từ Lý Tự Trọng đứng trước pháp trường năm 17 tuổi, đến hàng nghìn đội hình thanh niên xung phong mở đường Trường Sơn, đến sinh viên hôm nay mặc áo xanh tình nguyện vào vùng khó. Ngày 26/3 vì thế không chỉ là 'sinh nhật' của một tổ chức — là ngày của chính tuổi trẻ Việt Nam.",
      ],
      phongTuc: [
        { title: "Tháng Thanh niên", text: "Suốt tháng 3 mỗi năm, các cấp bộ đoàn triển khai chiến dịch tình nguyện toàn quốc — từ làm sạch đô thị, trồng cây đến hỗ trợ chuyển đổi số cho người già." },
        { title: "Lễ kết nạp đoàn viên", text: "Nghi thức trao huy hiệu đoàn, đọc lời hứa đoàn viên và đeo khăn quàng — nghi lễ 'trưởng thành' chính thức của tuổi trẻ Việt Nam." },
        { title: "Ngày hội việc làm", text: "Gắn với tháng thanh niên, các sàn việc làm, tư vấn khởi nghiệp và hội thảo kỹ năng mở đến sinh viên khắp nơi." },
        { title: "Vinh danh đoàn viên tiêu biểu", text: "Giải Lý Tự Trọng, giải Lương Định Của — danh hiệu cao nhất cho đoàn viên, cán bộ đoàn trẻ có thành tích nổi bật." },
        { title: "Xuân tình nguyện, hè tình nguyện", text: "Chiến dịch tình nguyện quanh năm: đón Tết cùng người nghèo (Xuân), mùa hè xanh vào vùng sâu vùng xa, tiếp sức mùa thi mỗi tháng 7." },
        { title: "Sinh hoạt truyền thống", text: "Tham quan địa chỉ đỏ, gặp cựu TNXP, đốt lửa trại sinh hoạt đoàn — 'tiết học truyền thống' sống động nhất của thế hệ sau." },
      ],
      amThuc: [],
      facts: [
        "Lý Tự Trọng — đoàn viên đầu tiên bị xử tử — chỉ mới 17 tuổi khi đứng trước pháp trường Sài Gòn ngày 20/11/1931.",
        "Câu nói gắn với Lý Tự Trọng trước tòa án đế quốc: 'Con đường của thanh niên chỉ có thể là con đường cách mạng'.",
        "Đội hình Thanh niên xung phong đầu tiên ra đời ngày 15/7/1950 tại chiến dịch Biên giới — sau này TNXP có mặt ở mọi chiến trường lớn.",
        "Bài ca chính thức của Đoàn là 'Thanh niên làm theo lời Bác' — do nhạc sĩ Hoàng Hà sáng tác, hát trong mọi sinh hoạt đoàn.",
        "'Tháng Thanh niên' hằng năm quy tụ hàng triệu lượt đoàn viên tham gia công trình — được xem là chiến dịch tình nguyện lớn nhất của giới trẻ Việt.",
      ],
    },
    faq: [
      { q: "Ngày thành lập Đoàn TNCS Hồ Chí Minh là ngày nào?", a: "26/3 hằng năm — kỷ niệm Đại hội thành lập Đoàn Thanh niên Cộng sản tại Vinh năm 1931." },
      { q: "Đoàn TNCS Hồ Chí Minh có bao nhiêu tuổi?", a: "Tính từ 26/3/1931 — tổ chức thanh niên cách mạng đầu tiên của Việt Nam." },
      { q: "Tháng Thanh niên là gì?", a: "Chiến dịch tình nguyện toàn quốc suốt tháng 3 gắn với ngày thành lập Đoàn — thi công công trình, môi trường, chuyển đổi số." },
      { q: "Lý Tự Trọng là ai?", a: "Đoàn viên đầu tiên của Đoàn TNCS bị xử tử năm 1931 ở tuổi 17 — tấm gương thanh niên anh hùng mà ngày 26/3 tôn vinh." },
    ],
  },
  {
    slug: "ngay-tho-viet-nam",
    heroStyle: "framed",
    signature: [
      {
        kind: "steps",
        title: "Một đêm thơ rằm Giêng",
        steps: [
          { icon: "fullmoon", title: "Trăng rằm tháng Giêng", text: "Ngày thơ Việt Nam chọn đúng đêm rằm đầu năm — trăng Nguyên tiêu soi sáng vườn thơ Văn Miếu." },
          { icon: "temple", title: "Thiên Quang trước đêm thơ", text: "Khuôn viên Văn Miếu — Quốc Tử Giám thắp đèn, giăng lọng — nơi đêm thơ đầu tiên diễn ra năm 2003." },
          { icon: "candle", title: "Đọc thơ dưới trăng", text: "Nhà thơ, sinh viên và khán giả đọc những bài thơ tiêu biểu của năm — từ ca dao đến thơ trẻ mới xuất bản." },
          { icon: "book", title: "Ra mắt tập thơ", text: "Nhiều tập thơ chọn đêm rằm để trình làng — nhà thơ ký tặng độc giả ngay dưới giếng Thiên Quang." },
          { icon: "star", title: "Chủ đề năm mới", text: "Mỗi năm một chủ đề — 'Quê hương', 'Cửa sông', 'Vượt biển'… — định hướng sáng tác thơ của cả năm." },
        ],
      },
    ],
    quotes: [
      { text: "Trăm năm trong cõi người ta, / Chữ tài chữ mệnh khéo là ghét nhau.", author: "Nguyễn Du", work: "Truyện Kiều" },
    ],
    motif: "fullmoon",
    name: "Ngày thơ Việt Nam",
    dateMark: "Rằm Giêng",
    displayDate: "Rằm tháng Giêng (âm lịch)",
    rule: { type: "lunar", month: 1, day: 15 },
    categories: ["truyen-thong"],
    theme: { from: "#3b0764", to: "#701a75", accent: "#c084fc" },
    tagline: "Đêm rằm tháng Giêng dành riêng cho thi ca Việt.",
    history: [
      "Ngày thơ Việt Nam được Hội Nhà văn Việt Nam khởi xướng năm 2003 — chọn rằm tháng Giêng, đêm trăng đầu năm đẹp nhất, tổ chức hội thơ tại Văn Miếu — Quốc Tử Giám, trường đại học đầu tiên của dân tộc.",
      "Đất nước này vốn là 'đất thơ': từ ca dao truyền miệng hàng nghìn năm, qua Truyện Kiều của Nguyễn Du được UNESCO vinh danh, đến những vần thơ chiến tranh viết trong hầm hào — thơ là linh hồn của tiếng Việt.",
      "Năm 2014, chính phủ chính thức công nhận Ngày thơ Việt Nam. Mỗi đêm rằm tháng Giêng, nhà thơ và công chúng yêu thơ lại tề tựu bên giếng Thiên Quang đọc thơ dưới trăng — đêm đẹp nhất của năm văn.",
    ],
    meaning:
      "Tôn vinh thi ca — loại hình nghệ thuật gắn bó lâu nhất với văn hóa Việt: từ ca dao ru con, thơ Đường luật đến Truyện Kiều và thơ mới.",
    traditions: [
      { title: "Đêm thơ Văn Miếu", text: "Đêm thơ Văn Miếu – Quốc Tử Giám tổ chức tối rằm tháng Giêng tại sân Giếng Văn dưới chân Khuê Văn Các: nhà thơ lớn, thiếu nhi, thi sĩ dân gian cùng đọc thơ dưới nến và trăng rằm đầu năm — đêm thi ca lớn nhất nước." },
      { title: "Đọc thơ cùng nhau", text: "Quán cà phê thơ, câu lạc bộ thi ca, trường học tổ chức 'giờ thơ' riêng: mỗi người mang một bài yêu thích đến đọc cho nhau nghe. Trong một đêm, thơ Việt trở về đúng nghĩa 'sinh hoạt cộng đồng'." },
      { title: "Chủ đề năm", text: "Mỗi năm Hội Nhà văn Việt Nam chọn một chủ đề cho Ngày thơ — 'Thơ và quê hương', 'Thơ mùa xuân' chẳng hạn — và các cuộc thi sáng tác, triển lãm thi pháp xoay quanh chủ đề ấy suốt tuần lễ." },
      { title: "Vinh danh nhà thơ", text: "Ngày này cũng là dịp tuyên dương những thi sĩ được yêu mến và trao giải thơ trong năm — Nguyễn Du, Xuân Quỳnh, thế hệ 'nhân văn giai nhân' được nhắc lại; nhiều trẻ em lần đầu nghe chính giọng mình đọc thơ trước đám đông." },
    ],
    wishes: [
      "Rằm Giêng — chúc bạn một năm sống chậm lại đủ để nghe thấy vần điệu của đời mình.",
      "Chúc trang thơ của bạn luôn trắng và đầy — như trăng đêm nay.",
      "Ngày thơ — chúc những ai viết thơ tiếp tục viết, những ai yêu thơ tiếp tục yêu.",
      "Chúc bạn tìm được một câu thơ trong năm nay mà chỉ mình bạn hiểu hết.",
      "Gửi các nhà thơ: cảm ơn vì đã làm tiếng Việt đẹp hơn từng chữ một — rằm Giêng này là của các bạn.",
    ],
    gifts: [
      { title: "Một tập thơ", text: "Truyện Kiều bản đẹp, tập thơ của nhà thơ bạn yêu — món quà đúng ngày nhất có thể." },
      { title: "Sổ tay & bút mực", text: "Để bắt đầu vần thơ đầu tiên — quà tặng cho ai đang muốn viết." },
      { title: "Vé đêm thơ Văn Miếu", text: "Trải nghiệm đọc thơ dưới trăng rằm — món quà không cần gói." },
    ],
    deep: {
      ongNguon: [
        "Thơ là nhịp chung của văn hóa Việt — từ những câu ca dao truyền miệng nghìn năm đến Nôm thư của Nguyễn Du, từ thơ Đường luật nghiêm ngặt đến Thơ mới của những năm 1930. Không dân tộc nào gần như khắp địa phương đều biết thuộc lòng một tác phẩm thơ như người Việt với Truyện Kiều.",
        "Năm 2003, Hội Nhà văn Việt Nam chọn đêm rằm tháng Giêng — đêm trăng đầu năm, đêm của Tết Nguyên tiêu — để dành trọn cho thi ca. Đêm thơ đầu tiên diễn ra ở Văn Miếu, trường đại học đầu tiên của nước — và kể từ đó, mỗi rằm Giêng lại trở thành ngày hội của thơ trên khắp nước, gắn với một chủ đề sáng tác mới.",
      ],
      phongTuc: [
        { title: "Đêm thơ Văn Miếu — Quốc Tử Giám", text: "Sự kiện trung tâm của Ngày thơ mỗi năm tại Hà Nội — sân vườn văn miếu rực đèn, nhà thơ đọc bài mới, thiếu nhi đọc ca dao." },
        { title: "Chủ đề sáng tác năm", text: "Hội Nhà văn công bố chủ đề Ngày thơ từng năm — chủ đề trở thành 'kim chỉ nam' cho giải thưởng và sáng tác thơ trong năm." },
        { title: "Đọc thơ trên khắp nước", text: "Từ câu lạc bộ thơ làng đến nhà hát lớn: buổi đọc, tiệc trà thơ, giao lưu nhà thơ diễn ra ở hầu hết tỉnh thành." },
        { title: "Thơ học sinh", text: "Trường học tổ chức đọc thơ, học thuộc lòng và sáng tác — đưa trẻ em đến gần thơ từ tuổi nhỏ." },
        { title: "Triển lãm & ra mắt sách", text: "Nhiều tập thơ, tuyển thơ chọn đúng đêm Ngày thơ để trình làng bạn đọc — biến ngày lễ thành 'hội chợ thơ' mini." },
        { title: "Thơ quốc tế", text: "Ngày thơ Việt Nam mở cửa đón nhà thơ nước ngoài — những năm gần đây có hàng chục thi nhân quốc tế về dự đêm thơ Văn Miếu." },
      ],
      amThuc: [
        { title: "Chè trôi nước", img: "amthuc-che-troi-nuoc", text: "Món ăn của Nguyên tiêu chia sẻ với Ngày thơ — viên trắng nổi trong nước gừng, giống câu thơ: đơn giản mà tròn vẹn." },
        { title: "Trà ngon tiệc thơ", img: "amthuc-tra", text: "Ấm trà nóng và vài câu thơ — 'tiệc' của đêm thơ là vậy, không cần gì hơn." },
        { title: "Bánh in", img: "amthuc-banh-in", text: "Viên bánh in bột đậu xanh tan ngay đầu lưỡi — bạn đồng hành ngàn năm của trà và thơ." },
      ],
      facts: [
        "Đêm thơ đầu tiên diễn ra ngày 24/2/2003 tại Văn Miếu — Quốc Tử Giám — đúng đêm rằm tháng Giêng.",
        "Ngày thơ Việt Nam trùng đúng đêm Tết Nguyên tiêu (rằm tháng Giêng) — đêm trăng đầu tiên của năm.",
        "Truyện Kiều của Nguyễn Du dài 3.254 câu lục bát — tác phẩm thơ được người Việt thuộc lòng nhiều nhất trong lịch sử.",
        "Ngày thơ Thế giới của UNESCO (21/3) được lập năm 1999 — Việt Nam là một trong những nước đầu tiên có ngày thơ riêng.",
        "Văn Miếu — Quốc Tử Giám xây năm 1070 là 'trường đại học đầu tiên' của Việt Nam — vì vậy được chọn làm nơi tổ chức đêm thơ.",
      ],
    },
    faq: [
      { q: "Ngày thơ Việt Nam là ngày nào?", a: "Rằm tháng Giêng âm lịch hằng năm — trùng đêm Tết Nguyên tiêu, ngày trăng đầu năm tròn nhất." },
      { q: "Ngày thơ do ai tổ chức?", a: "Hội Nhà văn Việt Nam khởi xướng từ năm 2003, hưởng ứng Ngày thơ Thế giới của UNESCO." },
      { q: "Đêm thơ Văn Miếu có gì?", a: "Đọc thơ, ca trù, hòa nhạc, triển lãm và ra mắt tập thơ mới — dưới ánh trăng rằm tại Văn Miếu — Quốc Tử Giám, Hà Nội." },
      { q: "Ngày thơ có chủ đề riêng không?", a: "Có — mỗi năm một chủ đề sáng tác, ví dụ 'Quê hương', 'Tuổi trẻ và biển' — do Hội Nhà văn công bố." },
    ],
  },
  {
    slug: "quoc-te-nam-gioi",
    heroStyle: "split",
    signature: [
      {
        kind: "meanings",
        title: "Bốn trụ cột của ngày nam giới",
        items: [
          { title: "Sức khỏe nam giới", text: "Nhắc kiểm tra sức khỏe định kỳ, chú ý sức khỏe tinh thần — nam giới vẫn ít đi khám và ít kể khi mệt.", swatch: "#0ea5e9" },
          { title: "Hình mẫu tích cực", text: "Tôn vinh những người đàn ông sống có trách nhiệm — cha, anh, thầy — để giới trẻ có gương gần.", swatch: "#6366f1" },
          { title: "Vai trò gia đình", text: "Nhìn nhận công lao thầm lặng của những người cha, người chồng, người con trai trong mỗi nhà.", swatch: "#f59e0b" },
          { title: "Công bằng & tôn trọng", text: "Bình đẳng giới không chỉ là của phụ nữ — ngày nam giới nhắc tôn trọng chéo giữa các giới.", swatch: "#10b981" },
        ],
      },
    ],
    quotes: [
      { text: "Một người cha có giá trị bằng một trăm thầy giáo.", author: "George Herbert", work: "Châm ngôn Anh" },
    ],
    motif: "medal",
    name: "Ngày Quốc tế Nam giới",
    dateMark: "19·11",
    displayDate: "19 tháng 11",
    rule: { type: "solar", month: 11, day: 19 },
    categories: ["quoc-te"],
    theme: { from: "#0c4a6e", to: "#075985", accent: "#38bdf8" },
    tagline: "Ngày tri ân những người đàn ông trong đời.",
    history: [
      "Ngày Quốc tế Nam giới 19/11 do giáo sư Jerome Teelucksingh ở Trinidad và Tobago khởi xướng năm 1999 — chọn ngày sinh của cha ông để tôn vinh những người đàn ông tử tế trong gia đình.",
      "Ngày lễ đặt ra bốn trụ cột: chăm sóc sức khỏe nam giới, tôn vinh hình mẫu đàn ông tích cực, cải thiện quan hệ giới và tôn vinh đóng góp của nam giới trong gia đình — cộng đồng địa phương.",
      "Đến nay được quan sát ở hơn 80 quốc gia, 19/11 du nhập vào Việt Nam những năm 2010 và nhanh chóng trở thành ngày phụ nữ gửi quà cho chồng, bố, anh em — 'ngày của phái mạnh' đối lập ngày 8/3.",
    ],
    meaning:
      "Bù lại cho những người đàn ông ít được nói lời cảm ơn — ngày nhắc chúng ta chú ý đến sức khỏe, cảm xúc và vai trò của nam giới.",
    traditions: [
      { title: "Lời chúc cho nam giới", text: "Con cái, vợ và người yêu gửi lời chúc ngày 19/11 cho bố, chồng, anh trai — ngày này chưa 'đậm nét' như 8/3 nhưng ngày càng được nhắc đến: 'chúc bố luôn khỏe' là tin nhắn quen thuộc nhất." },
      { title: "Chủ đề sức khỏe", text: "Mỗi năm Ngày Quốc tế Nam giới chọn một chủ đề về sức khỏe đàn ông: ung thư tiền liệt tuyến, sức khỏe tâm thần nam giới — gắn với phong trào Movember (nuôi râu xuyên tháng 11) gây quỹ sức khỏe nam toàn cầu." },
      { title: "Tôn vinh hình mẫu", text: "Ngày này tìm và kể những hình mẫu nam giới tích cực: bố đơn thân nuôi con, nam y tá tận tụy, người đàn ông hiến máu cả trăm lần — 'tấm gương đàn ông tốt' được nhắc lại và lan tỏa." },
      { title: "Cặp với 8/3", text: "Ở Việt Nam, 19/11 thường được nhắc như 'ngày đàn ông được đáp lễ' 8/3 — bữa cơm do chính đàn ông nấu, một món quà dành cho bố. Dù không chính thức như Quốc tế Phụ nữ, ngày này đang dần thành nét văn hóa mới." },
    ],
    wishes: [
      "19/11 — chúc người đàn ông của bạn khỏe mạnh, và đủ can đảm để kể khi mình mệt.",
      "Gửi người cha ít nói: cảm ơn những vai gánh thầm lặng suốt cả đời.",
      "Chúc các anh, các chú, các bạn nam — được yêu thương rõ ràng như các chị, các em.",
      "Chúc mọi người đàn ông tìm được giấc ngủ trọn đêm — và một người để trò chuyện khi cần.",
      "Ngày nam giới — chúc bạn sống đúng hình mẫu mà con trẻ quanh bạn sẽ muốn theo.",
    ],
    gifts: [
      { title: "Gói khám sức khỏe", text: "Lịch khám định kỳ hoặc gói xét nghiệm — món quà thiết thực nhất cho người ít đi khám." },
      { title: "Dụng cụ thể thao", text: "Giày chạy, găng gym, dây nhảy — khuyến khích thói quen vận động." },
      { title: "Đồ cá nhân chất lượng", text: "Đồng hồ, ví da, bộ dưỡng da — những thứ nam giới thường tự tiết kiệm." },
    ],
    deep: {
      ongNguon: [
        "Ngày Quốc tế Nam giới ra đời năm 1999 ở Trinidad & Tobago do Tiến sĩ Jerome Teelucksingh khởi xướng — ông chọn ngày 19/11, sinh nhật cha mình, vì cho rằng thế giới thiếu một ngày để nói về những vấn đề riêng của nam giới: sức khỏe thấp hơn, tuổi thọ ngắn hơn, tỷ lệ tự tử cao hơn và thói quen giấu cảm xúc.",
        "Mục tiêu của ngày không phải đối lập với nữ quyền mà là hoàn thiện bình đẳng: chú ý sức khỏe nam giới, tôn vinh hình mẫu tích cực, cải thiện quan hệ giới và giúp nam giới học cách chăm sóc mình. Đến nay, ngày 19/11 được ghi nhận ở khoảng 80 quốc gia — ở Việt Nam, nó dần phổ biến qua truyền thông và các sự kiện doanh nghiệp, trường học.",
      ],
      phongTuc: [
        { title: "Tặng quà cho nam giới", text: "Hoa, thiệp, đồ cá nhân — nhiều gia đình và công ty Việt xem 19/11 là 'đối ứng' của 8/3: ngày đàn ông cũng được tặng quà." },
        { title: "Chiến dịch sức khỏe nam", text: "Nhiều nước gắn ngày này với 'Movember' (râu tháng 11) — chiến dịch nâng cao ý thức ung thư tuyến tiền liệt và sức khỏe tâm thần nam giới." },
        { title: "Kể chuyện hình mẫu", text: "Báo chí, trường học chia sẻ những người đàn ông tử tế — thầy giáo, cha đơn thân, lính cứu hỏa — để giới trẻ có hình mẫu gần." },
        { title: "Sự kiện gia đình", text: "Bữa cơm, chuyến đi chơi, trận bóng cha-con — ngày khuyến khích nam giới dành thời gian cho gia đình." },
        { title: "Đối thoại giới", text: "Tọa đàm về vai trò nam giới hiện đại — áp lực kiếm tiền, việc nhà, quyền làm cha — những chủ đề ít được nói ra." },
        { title: "Vinh danh nam giới tiêu biểu", text: "Doanh nghiệp, tổ chức trao danh hiệu 'người đàn ông của năm' — người công nhân, bác sĩ, tình nguyện viên âm thầm." },
      ],
      amThuc: [],
      facts: [
        "Ngày 19/11 được chọn vì đó là sinh nhật của cha Tiến sĩ Jerome Teelucksingh — người sáng lập Ngày Quốc tế Nam giới năm 1999.",
        "Nam giới trung bình sống ngắn hơn nữ giới khoảng 5 năm — một trong những vấn đề sức khỏe mà ngày này muốn nhắc đến.",
        "Chiến dịch 'Movember' — để râu suốt tháng 11 — hưởng ứng nhận thức về ung thư và sức khỏe tâm thần nam giới, gắn liền với ngày 19/11.",
        "Khoảng 80 quốc gia ghi nhận ngày 19/11 — nhưng nó chưa phải ngày quốc tế chính thức của Liên Hợp Quốc như 8/3.",
        "Ở Việt Nam, truyền thông gần đây hay gọi 19/11 là 'Quốc tế Đàn ông' — dù chưa phải ngày lễ pháp lý, nó ngày càng phổ biến.",
      ],
    },
    faq: [
      { q: "Ngày Quốc tế Nam giới là ngày nào?", a: "19/11 hằng năm — ngày tri ân nam giới, sức khỏe nam và những hình mẫu tích cực." },
      { q: "Ngày này có chính thức của LHQ không?", a: "Chưa — được khoảng 80 quốc gia ghi nhận nhưng chưa phải ngày quốc tế chính thức của Liên Hợp Quốc như 8/3." },
      { q: "Ngày nam giới có phải 'đối ứng' của 8/3 không?", a: "Về mặt xã hội, nhiều nơi xem như vậy — nhưng trọng tâm chính là sức khỏe nam giới và hình mẫu tích cực." },
      { q: "Ở Việt Nam ngày này phổ biến không?", a: "Ngày càng phổ biến — báo chí, trường học và doanh nghiệp thường tổ chức tặng quà, sự kiện tri ân nam giới vào 19/11." },
    ],
  },
];

/** Holidays sorted by occurrence within a calendar year (approximate for lunar). */
export function getHoliday(slug: string): Holiday | undefined {
  return holidays.find((h) => h.slug === slug);
}
