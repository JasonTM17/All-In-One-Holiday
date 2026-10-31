export interface StorySource {
  outlet: string;
  title: string;
  url: string;
  summary: string;
}

export interface HolidayStory {
  title: string;
  body: string;
}

export interface StoryEntry {
  sources: StorySource[];
  story: HolidayStory;
}

const W = "https://vi.wikipedia.org/wiki/";

export const stories: Record<string, StoryEntry> = {
  "tet-duong-lich": {
    sources: [
      { outlet: "Wikipedia", title: "Tết Dương lịch", url: `${W}T%E1%BA%BFt_D%C6%B0%C6%A1ng_l%E1%BB%8Bch`, summary: "Tết Dương lịch kỷ niệm ngày đầu năm mới theo lịch Gregorius, được Việt Nam đưa vào danh sách ngày nghỉ lễ quốc gia. Đêm giao thừa thường gắn với pháo hoa và các sự kiện đếm ngược tại đô thị lớn." },
      { outlet: "Wikipedia", title: "Tết", url: `${W}T%E1%BA%BFt`, summary: "Bài viết tổng quan về nền văn hóa Tết Việt, trong đó Tết Dương lịch là ngày lễ mở đầu mùa lễ hội đầu năm trước khi Tết Nguyên Đán đến." },
      { outlet: "Báo Chính phủ", title: "Cổng thông tin Chính phủ", url: "https://baochinhphu.vn/", summary: "Cổng thông tin chính thức của Chính phủ, nơi công bố lịch nghỉ lễ hằng năm và các văn bản về ngày nghỉ Tết Dương lịch." },
    ],
    story: { title: "Đêm trước năm mới", body: "Giao thừa dương lịch ở Việt Nam là đêm người trẻ đổ ra phố, còn gia đình quây quần quanh mâm cơm ấm. Ở nhiều đô thị, pháo hoa nở trên bầu trời đúng lúc đồng hồ chạm mốc 0 giờ — khoảnh khắc người ta quay sang nhau, chúc một năm bình an. Khác với Tết Nguyên Đán gắn với tổ tiên và thần linh, Tết Dương lịch là lễ của sự khởi đầu: trang nhật ký mới, những kế hoạch mới, và lời hứa nhỏ gửi cho chính mình." },
  },
  "tet-nguyen-dan": {
    sources: [
      { outlet: "Wikipedia", title: "Tết Nguyên Đán", url: `${W}T%E1%BA%BFt`, summary: "Tết Nguyên Đán là ngày lễ trọng đại nhất của Việt Nam, bắt đầu từ đêm giao thừa cuối năm âm lịch, gắn với thờ cúng tổ tiên, lễ độ và phong tục hút lộc." },
      { outlet: "Wikipedia", title: "Bánh chưng", url: `${W}B%C3%A1nh_ch%C6%B0ng`, summary: "Bánh chưng là chiếc bánh vuông tượng trưng cho đất, không thể thiếu trong mâm cỗ Tết miền Bắc và gắn với truyền thuyết Lang Liêu thời vua Hùng." },
      { outlet: "Thanh Niên", title: "Chuyên mục Tết", url: "https://thanhnien.vn/tet.htm", summary: "Chuyên mục tổng hợp tin tức, câu chuyện và không khí Tết hằng năm của báo Thanh Niên." },
    ],
    story: { title: "Bánh chưng, bánh giầy", body: "Khi triều đình mở hội để chọn người thừa ngôi, vua Hùng Vương yêu cầu các hoàng tử mang lễ vật dâng tổ tiên. Lang Liêu, người con nghèo, chỉ mang được chiếc bánh vuông tượng trưng đất (bánh chưng) và bánh tròn tượng trưng trời (bánh giầy), làm từ gạo nếp, đỗ xanh — thức gạo nuôi dưỡng đời người. Vua Hùng truyền ngôi cho Lang Liêu, và từ đó hai chiếc bánh trở thành biểu tượng của Tết, nhắc con cháu nhớ ơn trời đất và tổ tiên." },
  },
  "tet-nguyen-tieu": {
    sources: [
      { outlet: "Wikipedia", title: "Tết Nguyên Tiêu", url: `${W}T%E1%BA%BFt_Nguy%C3%AAn_Ti%C3%AAu`, summary: "Tết Nguyên Tiêu vào rằm tháng Giêng là đêm trăng đầu tiên của năm mới, người Việt thường đi chùa cầu an và xem hoa đăng." },
      { outlet: "Wikipedia", title: "Trăng rằm", url: `${W}Tr%C4%83ng_r%E1%BA%B1m`, summary: "Rằm là ngày trăng tròn giữa tháng âm lịch; đêm Nguyên Tiêu được coi là đêm trăng đẹp và quan trọng nhất trong năm." },
      { outlet: "Wikipedia", title: "Tết", url: `${W}T%E1%BA%BFt`, summary: "Chuỗi lễ Tết Việt kéo dài từ mùng một tới rằm tháng Giêng, khép lại bằng lễ hội hoa đăng Nguyên Tiêu." },
    ],
    story: { title: "Đêm trăng đầu năm", body: "Nguyên Tiêu là đêm rằm đầu tiên của năm mới — cái tên có nghĩa là đêm thượng nguyên, thời khắc vạn vật bắt đầu một chu trình mới. Người xưa tin trăng đêm nay sáng nhất, linh thiêng nhất trong năm. Dân gian có câu “lễ Phật quanh năm không bằng rằm tháng Giêng”: chùa chiền đông nghịt người thắp hương cầu bình an cho cả năm, và ở nhiều đô thị phố phường rực rỡ hoa đăng." },
  },
  valentine: {
    sources: [
      { outlet: "Wikipedia", title: "Lễ tình nhân", url: `${W}L%E1%BB%85_t%C3%ACnh_nh%C3%A2n`, summary: "Lễ Valentine 14/2 có nguồn gốc từ lễ tôn vinh thánh Valentine tại phương Tây, sau trở thành ngày bày tỏ tình yêu qua hoa và thiệp trên toàn thế giới." },
      { outlet: "Wikipedia", title: "Tết", url: `${W}T%E1%BA%BFt`, summary: "Ở Việt Nam, Valentine thường rơi vào gần dịp Tết âm lịch, khiến ngày lễ này thêm phần náo nhiệt với chợ hoa và quà tặng." },
      { outlet: "Báo Chính phủ", title: "Cổng thông tin Chính phủ", url: "https://baochinhphu.vn/", summary: "Trang tin chính thức thường xuyên có bài về văn hóa lễ hội và tiêu dùng dịp 14/2 tại Việt Nam." },
    ],
    story: { title: "Vị thánh và những lời nhắn", body: "Truyền thuyết kể về thánh Valentine, linh mục Roma bị giam vì bí mật làm phép cưới cho binh sĩ và người trẻ. Trước giờ hành hình, ông được cho là đã gửi lời nhắn cho cô gái ông hằng nâng đỡ, ký “Valentine của con” — tấm thiệp đầu tiên. Dù câu chuyện nhiều màu sắc truyền thuyết, từ đó 14/2 trở thành ngày người ta trao nhau những lời nhắn ẩn danh rồi công khai, biến lễ giỗ thánh thành lễ của tình yêu." },
  },
  "quoc-te-phu-nu": {
    sources: [
      { outlet: "Wikipedia", title: "Ngày Quốc tế Phụ nữ", url: `${W}Ng%C3%A0y_Qu%E1%BB%91c_t%E1%BA%BF_Ph%E1%BB%A5_n%E1%BB%AF`, summary: "Ngày 8/3 kỷ niệm phong trào đấu tranh của phụ nữ công nhân đầu thế kỷ 20, được LHQ tổ chức kỷ niệm từ 1975." },
      { outlet: "Wikipedia", title: "Hai Bà Trưng", url: `${W}Hai_B%C3%A0_Tr%C6%B0ng`, summary: "Khởi nghĩa Hai Bà Trưng năm 40 là dấu mốc độc lập đầu tiên do phụ nữ Việt Nam lãnh đạo, được nhắc đến như biểu tượng nữ quyền sớm." },
      { outlet: "Wikipedia", title: "Bảo tàng Phụ nữ Việt Nam", url: `${W}B%E1%BA%A3o_t%C3%A0ng_Ph%E1%BB%A5_n%E1%BB%AF_Vi%E1%BB%87t_Nam`, summary: "Bảo tàng tại Hà Nội trưng bày vai trò phụ nữ Việt qua các thời kỳ — địa chỉ tham khảo giàu tư liệu về chủ đề này." },
    ],
    story: { title: "Hai Bà Trưng còn sống", body: "Năm 40, Trưng Trắc và Trưng Nhị đứng lên khởi nghĩa, lập triều đình tại Mê Linh, trở thành những người phụ nữ đầu tiên nắm quyền trong lịch sử Việt Nam. Sử cũ ghi lại tấm gương “gánh vác việc sơn hà” của phụ nữ Mê Linh. Gần hai nghìn năm sau, mỗi mùa 8/3 bông hồng trao tay nhắc lại câu chuyện ấy: phụ nữ Việt từ lâu đã là chủ nhân của đất trời mình." },
  },
  "gio-to-hung-vuong": {
    sources: [
      { outlet: "Wikipedia", title: "Giỗ Tổ Hùng Vương", url: `${W}Gi%E1%BB%97_T%E1%BB%95_H%C3%B9ng_V%C6%B0%C6%A1ng`, summary: "Lễ hội mồng 10 tháng 3 âm lịch tưởng nhớ các vua Hùng tại đền Hùng, Phú Thọ — ngày lễ được Nhà nước công nhận là ngày nghỉ lễ." },
      { outlet: "Wikipedia", title: "Đền Hùng", url: `${W}%C4%90%E1%BB%81n_H%C3%B9ng`, summary: "Khu đền Hùng trên núi Nghĩa Lĩnh, Phú Thọ là nơi thờ 18 đời vua Hùng và tâm điểm chính của lễ Giỗ Tổ." },
      { outlet: "Wikipedia", title: "Bánh chưng", url: `${W}B%C3%A1nh_ch%C6%B0ng`, summary: "Truyền thuyết Lang Liêu gắn với thời vua Hùng, giải thích nguồn gốc văn hóa tâm linh trong hình tượng đất trời." },
    ],
    story: { title: "Về nguồn", body: "Người Việt tự gọi mình là “con Rồng cháu Tiên”, gọi núi Nghĩa Lĩnh là “cội nguồn”. Ngày 10/3 âm lịch, người từ khắp miền đất nước ngược về Phú Thọ dâng hương trước sơn môn đền Hùng. Câu “Dù ai đi ngược về xuôi, nhớ ngày Giỗ Tổ mùng mười tháng ba” đi vào văn hóa như lời nhắc tự nhiên nhất — một ngày để cả dân tộc cùng ngoảnh mặt về một điểm bắt đầu." },
  },
  "tet-thanh-minh": {
    sources: [
      { outlet: "Wikipedia", title: "Thanh minh", url: `${W}Thanh_minh`, summary: "Tiết Thanh minh — tiết khí thứ năm trong 24 tiết khí và lễ tảo mộ đầu tháng tư của các dân tộc Á Đông." },
      { outlet: "Wikipedia", title: "Nghĩa trang", url: `${W}Ngh%C4%A9a_trang`, summary: "Nghĩa trang — nơi diễn ra tục tảo mộ, quét dọn và viếng thăng phần mộ tổ tiên vào Tết Thanh minh." },
      { outlet: "Wikipedia", title: "Truyện Kiều", url: `${W}Truy%E1%BB%87n_Ki%E1%BB%81u`, summary: "Truyện Kiều của Nguyễn Du với câu thơ bất hủ 'Thanh minh trong tiết tháng ba' — làm mùa lễ thành bất tử trong văn học Việt." },
    ],
    story: { title: "Chiếc chổi đưa về cội nguồn", body: "Khi Nguyễn Du viết 'Thanh minh trong tiết tháng ba / Lễ là tảo mộ, hội là đạp thanh', ông đã khắc mãi mãi hình ảnh mùa lễ này vào tâm trí người Việt. Mỗi độ xuân về, các gia đình lại mang chổi, sơn và hoa tươi quay về mồ mả ông bà. Cỏ được nhổ, bia được phủi mới, hương được thắp — và chỉ khi ấy cả nhà mới đứng thành hàng mà cúi đầu. Tảo mộ không đòi điều gì lớn lao: nó chỉ đòi người sống quay về mỗi năm một lần để nói với người đã khuất rằng — chúng con chưa quên." },
  },
  "giai-phong-mien-nam": {
    sources: [
      { outlet: "Wikipedia", title: "Ngày 30 tháng 4", url: `${W}Ng%C3%A0y_30_th%C3%A1ng_4`, summary: "Ngày 30/4/1975 đánh dấu sự kết thúc của Chiến tranh Việt Nam, mở ra giai đoạn thống nhất đất nước." },
      { outlet: "Wikipedia", title: "Chiến tranh Việt Nam", url: `${W}Chi%E1%BA%BFn_tranh_Vi%E1%BB%87t_Nam`, summary: "Bài viết chi tiết về cuộc chiến kéo dài 1955-1975 và những sự kiện dẫn tới ngày giải phóng Sài Gòn." },
      { outlet: "Wikipedia", title: "Tuyên ngôn độc lập (Việt Nam)", url: `${W}Tuy%C3%AAn_ng%C3%B4n_%C4%91%E1%BB%99c_l%E1%BA%ADp_(Vi%E1%BB%87t_Nam)`, summary: "Bản Tuyên ngôn 1945 đặt nền móng chính trị mà 30/4/1975 hoàn tất — dài dòng một chặng đường từ tuyên bố độc lập tới thống nhất." },
    ],
    story: { title: "Chiếc xe tăng vào Dinh", body: "Trưa 30/4/1975, xe tăng 390 của quân giải phóng phá cổng Dinh Độc Lập; lá cờ mặt trận tung bay trên nóc dinh đúng 11h30 trưa. Toàn quốc thống nhất sau ba thập kỷ chia cắt. Người Hà Nội vẫn kể: hôm ấy họ thắp hương kể chuyện với tổ tiên, gọi đó là “ngày đất nước vui chưa từng có” — và từ đó 30/4 trở thành ngày lễ của một nước bình yên." },
  },
  "quoc-te-lao-dong": {
    sources: [
      { outlet: "Wikipedia", title: "Quốc tế Lao động", url: `${W}Qu%E1%BB%91c_t%E1%BA%BF_Lao_%C4%91%E1%BB%99ng`, summary: "Ngày 1/5 có gốc từ biến cố Haymarket 1886 tại Chicago, khi công nhân đấu tranh cho ngày làm 8 giờ." },
      { outlet: "Wikipedia", title: "Tết", url: `${W}T%E1%BA%BFt`, summary: "Ở Việt Nam, 1/5 liền sau 30/4 tạo thành kỳ nghỉ lễ dài đầu hè quen thuộc của người lao động." },
      { outlet: "Báo Chính phủ", title: "Cổng thông tin Chính phủ", url: "https://baochinhphu.vn/", summary: "Cổng chính phủ nơi công bố lịch nghỉ và các hoạt động kỷ niệm ngày 1/5 tại Việt Nam." },
    ],
    story: { title: "Tám giờ để sống", body: "Tháng 5 năm 1886, hàng trăm nghìn công nhân Chicago ngừng máy để đòi “8 giờ lao động — 8 giờ nghỉ ngơi — 8 giờ làm việc mình muốn”. Vụ Haymarket khiến thế giới chú ý tới giá phải trả của quyền lao động. Ba năm sau, Đại hội Quốc tế chọn 1/5 làm Ngày Quốc tế Lao động. Hôm nay, kỳ nghỉ 30/4–1/5 của người Việt vẫn mang hình bóng phát triển của quyền ấy: được nghỉ, được tôn vinh công sức." },
  },
  "ngay-cua-me": {
    sources: [
      { outlet: "Wikipedia", title: "Ngày của Mẹ", url: `${W}Ng%C3%A0y_c%E1%BB%A7a_M%E1%BA%B9`, summary: "Ngày của Mẹ phổ biến nhất rơi vào Chủ nhật thứ hai tháng 5, bắt đầu từ sáng kiến của Anna Jarvis tại Mỹ năm 1908." },
      { outlet: "Wikipedia", title: "Gia đình", url: `${W}Gia_%C4%91%C3%ACnh`, summary: "Khái niệm gia đình — bối cảnh xã hội mà ngày của Mẹ tôn vinh trung tâm đạo lý mẹ-con." },
      { outlet: "Báo Chính phủ", title: "Cổng thông tin Chính phủ", url: "https://baochinhphu.vn/", summary: "Thông tin chính thức về văn hóa, gia đình và những ngày kỷ niệm của Việt Nam." },
    ],
    story: { title: "Bông cẩm chướng của Anna", body: "Năm 1905, mẹ của Anna Jarvis qua đời. Ba năm sau, cô tổ chức buổi lễ tưởng nhớ tại nhà thờ và phát 500 bông cẩm chướng trắng — hoa mẹ cô từng yêu. Nỗ lực vận động của Anna khiến Tổng thống Mỹ Wilson ban hành Ngày của Mẹ vào Chủ nhật thứ hai tháng 5 từ năm 1914. Ironic là Anna sau chiến đấu phản đối thương mại hóa ngày lễ — bà muốn ngày ấy là lời cảm ơn thật lòng, không phải một cuộc mua sắm." },
  },
  "quoc-te-thieu-nhi": {
    sources: [
      { outlet: "Wikipedia", title: "Ngày Quốc tế Thiếu nhi", url: `${W}Ng%C3%A0y_Qu%E1%BB%91c_t%E1%BA%BF_Thi%E1%BA%BFu_nhi`, summary: "Ngày 1/6 được Quốc tế Phụ nữ chọn năm 1949 để bảo vệ và chăm sóc thế hệ trẻ, được kỷ niệm ở nhiều nước." },
      { outlet: "Wikipedia", title: "Gia đình", url: `${W}Gia_%C4%91%C3%ACnh`, summary: "Gia đình là môi trường đầu tiên bảo vệ trẻ — tinh thần chính của ngày Quốc tế Thiếu nhi." },
      { outlet: "Báo Chính phủ", title: "Cổng thông tin Chính phủ", url: "https://baochinhphu.vn/", summary: "Chính phủ Việt Nam luôn ban hành chỉ thị về Tết Trung thu và ngày 1/6 cho trẻ em." },
    ],
    story: { title: "Vì trẻ thơ", body: "Tháng 6 năm 1942, lũ phát xít Đức giết 88 trẻ em trong làng Lidice, Séc — một trong những tội ác rùng mình nhất thời chiến. Sau chiến tranh, Liên đoàn Phụ nữ Dân chủ Quốc tế chọn 1/6 làm ngày để cả nhân loại nhớ: trẻ em có quyền được sống và được yêu thương. Ở Việt Nam, mỗi hè người ta lại thắp nến tưởng nhớ Lidice và mở mùa vui cho trẻ thơ." },
  },
  "ngay-gia-dinh-viet-nam": {
    sources: [
      { outlet: "Wikipedia", title: "Ngày Gia đình Việt Nam", url: `${W}Ng%C3%A0y_Gia_%C4%91%C3%ACnh_Vi%E1%BB%87t_Nam`, summary: "Ngày 28/6 được Thủ tướng quyết định năm 2001, là ngày tôn vinh vai trò gia đình trong đời sống xã hội Việt Nam." },
      { outlet: "Wikipedia", title: "Gia đình", url: `${W}Gia_%C4%91%C3%ACnh`, summary: "Gia đình là tế bào của xã hội — chủ đề trung tâm ngày 28/6." },
      { outlet: "Báo Chính phủ", title: "Cổng thông tin Chính phủ", url: "https://baochinhphu.vn/", summary: "Cổng thông tin nơi đăng các văn bản và hoạt động kỷ niệm Ngày Gia đình Việt Nam." },
    ],
    story: { title: "Bữa cơm đầm ấm", body: "Trong tiếng Việt, “sum vầy” là hình ảnh đẹp nhất của gia đình: cơm tối tất cả cùng quay về, mâm đầy dù đạm bạc. Năm 2001, Nhà nước chọn 28/6 làm ngày vinh danh những mái nhà ấy — một quyết định ít biết nhưng đáng quý, vì hầu hết chúng ta đều có một “quê nhà” là một bếp lửa và những câu hỏi thân quen. Ngày ấy, chỉ cần gọi về nhà là đã giữ được phong tục." },
  },
  "thuong-binh-liet-si": {
    sources: [
      { outlet: "Wikipedia", title: "Chiến tranh Việt Nam", url: `${W}Chi%E1%BA%BFn_tranh_Vi%E1%BB%87t_Nam`, summary: "Bối cảnh các cuộc chiến kéo dài mà ngày 27/7 tưởng nhớ những người đã ngã xuống." },
      { outlet: "Wikipedia", title: "Ngày 30 tháng 4", url: `${W}Ng%C3%A0y_30_th%C3%A1ng_4`, summary: "Ngày kết thúc chiến tranh — kết quả mà nhiều liệt sĩ được tưởng nhớ vào 27/7 đã không kịp chứng kiến." },
      { outlet: "Wikipedia", title: "Quân đội nhân dân Việt Nam", url: `${W}Qu%C3%A2n_%C4%91%E1%BB%99i_nh%C3%A2n_d%C3%A2n_Vi%E1%BB%87t_Nam`, summary: "Lực lượng vũ trang mà nhiều thương binh, liệt sĩ từng phục vụ trong suốt lịch sử dựng nước." },
    ],
    story: { title: "Ngọn nến 27/7", body: "Năm 1947, nhà văn Hoài Thanh đề xuất một ngày để cả nước cùng nhớ thương binh và người đã hy sinh. Ngày 27/7 được chọn từ chuyến thăm những chiến sĩ bị thương đầu tiên tại Từ Đũ, Thái Nguyên. Từ đó, mỗi tối 27/7 lại thành đêm nến — tại nghĩa trang liệt sĩ, tại từng nóc nhà, người Việt thắp lên thứ ánh sáng nhỏ để nói với người đã khuất: đất nước chưa quên." },
  },
  "vu-lan": {
    sources: [
      { outlet: "Wikipedia", title: "Lễ Vu Lan", url: `${W}L%E1%BB%85_Vu_Lan`, summary: "Lễ Vu Lan rằm tháng 7 là ngày báo hiếu của Phật giáo, từ kinh Mục Liên cứu mẹ, sau trở thành ngày lễ gia đình phổ biến." },
      { outlet: "Wikipedia", title: "Vu lan", url: `${W}Vu_lan`, summary: "Trang định hướng về ý nghĩa, nguồn gốc Đại Thừa và phong tục gắn bông hồng cài áo." },
      { outlet: "Wikipedia", title: "Tết Trung thu", url: `${W}T%E1%BA%BFt_Trung_thu`, summary: "Lễ Vu Lan và Trung thu là hai ngày rằm lớn tiếp theo nhau trong văn hóa dân gian Việt." },
    ],
    story: { title: "Mục Kiền Liên và bông hồng cài áo", body: "Kinh kể bồ tát Mục Liên dùng thần thông xuống âm ty cứu mẹ khỏi kiếp ngạ quỷ, được Phật chỉ cách cúng Vu Lan báo hiếu. Lễ rằm tháng 7 từ đó trở thành ngày của lòng hiếu. Phong tục dân gian Việt lưu truyền nghi thức cài hoa hồng lên áo: đỏ cho người còn mẹ, trắng cho người đã mất. Trong đám đông Vu Lan, một bông hồng nhỏ là câu trả lời êm nhất cho câu hỏi “Mẹ còn không?”." },
  },
  "quoc-khanh": {
    sources: [
      { outlet: "Wikipedia", title: "Quốc khánh Việt Nam", url: `${W}Qu%E1%BB%91c_kh%C3%A1nh_Vi%E1%BB%87t_Nam`, summary: "Ngày 2/9/1945 Chủ tịch Hồ Chí Minh đọc Tuyên ngôn độc lập tại quảng trường Ba Đình, thành lập nước Việt Nam Dân chủ Cộng hòa." },
      { outlet: "Wikipedia", title: "Tuyên ngôn độc lập (Việt Nam)", url: `${W}Tuy%C3%AAn_ng%C3%B4n_%C4%91%E1%BB%99c_l%E1%BA%ADp_(Vi%E1%BB%87t_Nam)`, summary: "Văn kiện lịch sử mở đầu bằng lời Tuyên ngôn Hoa Kỳ 1776, được đọc trước hàng trăm nghìn người ở Ba Đình." },
      { outlet: "Wikipedia", title: "Quân đội nhân dân Việt Nam", url: `${W}Qu%C3%A2n_%C4%91%E1%BB%99i_nh%C3%A2n_d%C3%A2n_Vi%E1%BB%87t_Nam`, summary: "Lực lượng vũ trang gắn bó với các kỳ diễu binh mừng Quốc khánh trong suốt lịch sử nước Việt Nam Dân chủ Cộng hòa." },
    ],
    story: { title: "Ba Đình chiều 2/9", body: "Chiều 2/9/1945, trước hàng trăm nghìn người ở quảng trường Ba Đình, Hồ Chí Minh đọc bản Tuyên ngôn độc lập ngắn gọn: “Tất cả mọi người đều sinh ra có quyền bình đẳng”. Âm thanh qua loa nhỏ, nhưng câu nói vang đi khắp một quốc gia vừa thoát khỏi hàng chục năm thuộc địa. Hôm ấy, quốc kỳ đỏ sao vàng tung bay lần đầu trước nhân dân — và 2/9 mãi mãi là ngày dân tộc đứng dậy." },
  },
  "trung-thu": {
    sources: [
      { outlet: "Wikipedia", title: "Tết Trung thu", url: `${W}T%E1%BA%BFt_Trung_thu`, summary: "Tết Trung thu rằm tháng 8 là lễ của trẻ em, lồng đèn và bánh nướng bánh dẻo, đậm nét dân gian Đông Á." },
      { outlet: "Wikipedia", title: "Chú Cuội", url: `${W}Ch%C3%BA_Cu%E1%BB%99i`, summary: "Truyền thuyết chú Cuội bay lên trăng theo cây đa — giải thích bóng người trên mặt trăng trong văn hóa Việt." },
      { outlet: "Wikipedia", title: "Trăng rằm", url: `${W}Tr%C4%83ng_r%E1%BA%B1m`, summary: "Rằm tháng 8 là trăng đẹp nhất năm, tâm điểm của lễ Trung thu." },
    ],
    story: { title: "Chú Cuội ngồi trăng", body: "Truyền thuyết kể: chú Cuội cứu cây đa tiên nên được xem như thần dược. Một hôm, khi Cuội đi xa, vợ chàng quên lời dặn đã tưới nước bẩn lên cây; cây đa tiên bỏ rễ bay lên trời. Cuội về, chỉ kịp ôm cành cuối và bị cuốn lên trăng cùng cây. Từ đó, nhìn đêm rằm tháng 8, người ta bảo thấy bóng Cuội và cây đa — và trẻ em rước đèn hỏi chàng có thèm bánh nướng không." },
  },
  "phu-nu-viet-nam": {
    sources: [
      { outlet: "Wikipedia", title: "Ngày Phụ nữ Việt Nam", url: `${W}Ng%C3%A0y_Ph%E1%BB%A5_n%E1%BB%AF_Vi%E1%BB%87t_Nam`, summary: "Ngày 20/10/1930 Hội Phụ nữ Phản đế Việt Nam (nay là Hội LHPN VN) thành lập — chọn làm ngày Phụ nữ Việt Nam." },
      { outlet: "Wikipedia", title: "Hội Liên hiệp phụ nữ Việt Nam", url: `${W}H%E1%BB%99i_Li%C3%AAn_hi%E1%BB%87p_ph%E1%BB%A5_n%E1%BB%AF_Vi%E1%BB%87t_Nam`, summary: "Tổ chức hội phụ nữ lớn nhất Việt Nam, tiền thân chính là ngày 20/10/1930." },
      { outlet: "Wikipedia", title: "Bảo tàng Phụ nữ Việt Nam", url: `${W}B%E1%BA%A3o_t%C3%A0ng_Ph%E1%BB%A5_n%E1%BB%AF_Vi%E1%BB%87t_Nam`, summary: "Bảo tàng chuyên biệt về phụ nữ Việt tại Hà Nội, nơi có tư liệu về lịch sử Hội LHPN." },
    ],
    story: { title: "Ngày Hội ra đời", body: "Chiều 20/10/1930, tại nhà bà Nghệ Tĩnh, một nhóm phụ nữ thành lập Hội Phụ nữ Phản đế — mở ra một lực lượng đoàn kết chưa từng có trong lịch sử phong trào Việt Nam. Ba mươi lăm năm sau, ngày ấy được chọn làm Ngày Phụ nữ Việt Nam. Khi người trẻ hôm nay gửi hoa cho mẹ, chị, vợ dịp 20/10, họ không chỉ chúc vẻ đẹp — họ tiếp tục câu chuyện về một phái đẹp từng tham gia dựng nước." },
  },
  "nha-giao-viet-nam": {
    sources: [
      { outlet: "Wikipedia", title: "Ngày Nhà giáo Việt Nam", url: `${W}Ng%C3%A0y_Nh%C3%A0_gi%C3%A1o_Vi%E1%BB%87t_Nam`, summary: "Ngày 20/11 là ngày tôn vinh giáo viên, kỷ niệm Hiến chương nhà giáo quốc tế 1982 và ngày thành lập nghiệp đoàn giáo dục Việt Nam." },
      { outlet: "Wikipedia", title: "Nhà giáo", url: `${W}Nh%C3%A0_gi%C3%A1o`, summary: "Vai trò nhà giáo — nghề mang tính tri ân đặc biệt trong văn hóa tôn sư trọng đạo của người Việt." },
      { outlet: "Báo Chính phủ", title: "Cổng thông tin Chính phủ", url: "https://baochinhphu.vn/", summary: "Chỉ thị và tin tức chính thức về các hoạt động ngày 20/11 tại trường học." },
    ],
    story: { title: "Đạo của những người đến trước", body: "Trong phong tục Việt, thầy giáo từng được tôn xưng như “nhất tự vi sư, bán tự vi sư” — một chữ cũng là thầy. Từ giảng đường Chu Văn An tới trường làng nghèo, nghề dạy học luôn đặt cái nghiêm lên trước cái vui. Ngày 20/11 không phải lễ ngủ quên trong hoa; đó là ngày trường xưa vãn lại điệu cưới, ngày cựu học trò trở về thầy cũ với một câu vẫn không già: “con đỡ khỏe”." },
  },
  "quan-doi-nhan-dan": {
    sources: [
      { outlet: "Wikipedia", title: "Quân đội nhân dân Việt Nam", url: `${W}Qu%C3%A2n_%C4%91%E1%BB%99i_nh%C3%A2n_d%C3%A2n_Vi%E1%BB%87t_Nam`, summary: "Lực lượng vũ trang nhân dân thành lập 22/12/1944 từ Đội Việt Nam tuyên truyền giải phóng quân, 34 chiến sĩ đầu tiên." },
      { outlet: "Wikipedia", title: "Chiến tranh Việt Nam", url: `${W}Chi%E1%BA%BFn_tranh_Vi%E1%BB%87t_Nam`, summary: "Bối cảnh cuộc chiến mà Quân đội nhân dân Việt Nam trưởng thành và bảo vệ đất nước." },
      { outlet: "Wikipedia", title: "Tuyên ngôn độc lập (Việt Nam)", url: `${W}Tuy%C3%AAn_ng%C3%B4n_%C4%91%E1%BB%99c_l%E1%BA%ADp_(Vi%E1%BB%87t_Nam)`, summary: "Lực lượng được thành lập chỉ vài tháng trước Tuyên ngôn 1945 — gắn chặt với lịch sử độc lập." },
    ],
    story: { title: "34 người đầu tiên", body: "Ngày 22/12/1944, trong rừng Hoàng Hoa Thám, 34 chiến sĩ tụ họp thành Đội Việt Nam tuyên truyền giải phóng quân do Võ Nguyên Giáp chỉ huy — “đội quân nhỏ mà hùng” theo lời dặn của Người. Chỉ vài ngày sau, đội thắng trận Phai Khắt và Nà Ngần mở đầu truyền thống “trận nào cũng thắng”. Tám thập kỷ sau, ngày ấy vẫn là ngày sinh nhật của người lính Việt." },
  },
  "giang-sinh": {
    sources: [
      { outlet: "Wikipedia", title: "Giáng sinh", url: `${W}Gi%C3%A1ng_sinh`, summary: "Giáng sinh 24-25/12 kỷ niệm Chúa Giêsu ra đời, trở thành lễ hội toàn cầu của mọi tôn giáo và văn hóa." },
      { outlet: "Wikipedia", title: "Tết", url: `${W}T%E1%BA%BFt`, summary: "Ở Việt Nam, Giáng sinh là dấu mốc cuối năm trước Tết Dương lịch và Tết âm lịch, khiến phố phường đông vui nhất năm." },
      { outlet: "Báo Chính phủ", title: "Cổng thông tin Chính phủ", url: "https://baochinhphu.vn/", summary: "Tin tức chính thức về lễ hội cuối năm và đời sống văn hóa tôn giáo." },
    ],
    story: { title: "Đêm Bethlehem ở phố phái", body: "Phố Hàng Mã Hà Nội cuối năm biến thành con phố của ánh sáng; nhà thờ lớn rực sáng đêm 24/12 khiến hàng chục nghìn người kéo đến cùng một giờ. Nhiều người không theo đạo, nhưng Giáng sinh ở Việt Nam từ lâu thành lễ của gia đình và của những người trẻ muốn một đêm ấm cuối năm. Chùa và nhà thờ gần nhau như thế — và Noel trở thành ngày lễ mà ai cũng được vào." },
  },
"ong-cong-ong-tao": {
    sources: [
      { outlet: "Wikipedia", title: "Táo quân", url: "https://vi.wikipedia.org/wiki/T%C3%A1o_qu%C3%A2n", summary: "Bài viết về thần Táo quân — ba vị thần bếp trong tín ngưỡng dân gian Việt Nam, được tiễn về trời ngày 23 tháng Chạp." },
      { outlet: "Wikipedia", title: "Cá chép", url: "https://vi.wikipedia.org/wiki/C%C3%A1_ch%C3%A9p", summary: "Cá chép — loài cá từ lâu gắn với văn hóa phương Đông, và đặc biệt là tục tiễn Táo quân của người Việt." },
      { outlet: "Wikipedia", title: "Tết", url: "https://vi.wikipedia.org/wiki/T%E1%BA%BFt", summary: "Ông Công Ông Táo là lễ mở đầu chuỗi cúng cuối năm trước Tết Nguyên Đán trong hệ thống lễ hội Việt." },
    ],
    story: { title: "Bếp lửa và đôi cá chép", body: "Truyền thuyết kể: ba người — Trọng Cao, Thị Nhi và Phạm Lang — chung sống thuận hòa đến cuối đời, được Ngọc Hoàng phong làm Táo quân cai quản bếp nhà người. Từ đó, mỗi chiều 23 tháng Chạp, bà nội trợ lại dọn bếp thật sạch, dâng mâm cỗ, rồi mang cá chép ra ao hồ thả — đưa Táo quân cưỡi lưng về trời báo cáo việc nhà. Người Việt tin: nhà nào bếp ấm thì nhà ấy đầy phúc; và câu chuyện cứu nhau khó khăn của ba người khiến ngày lễ này thành bài học về nhân nghĩa giữa đời thường." },
  },
  "tet-han-thuc": {
    sources: [
      { outlet: "Wikipedia", title: "Tết Hàn thực", url: "https://vi.wikipedia.org/wiki/T%E1%BA%BFt_H%C3%A0n_th%E1%BB%B1c", summary: "Tết Hàn thực 3/3 âm lịch — nguồn gốc tục ăn lạnh tưởng nhớ Giới Tử Thôi, được dân gian Việt biến thành tết bánh trôi chay." },
      { outlet: "Wikipedia", title: "Bánh trôi", url: "https://vi.wikipedia.org/wiki/B%C3%A1nh_tr%C3%B4i", summary: "Bánh trôi nước — viên bánh nếp nhân đường nấu trong nước gừng, biểu tượng của tết Hàn thực." },
      { outlet: "Wikipedia", title: "Bánh chay", url: "https://vi.wikipedia.org/wiki/B%C3%A1nh_chay", summary: "Bánh chay — viên bánh đậu xanh ngọt thanh, người bạn đồng hành của bánh trôi trong mâm cúng Hàn thực." },
    ],
    story: { title: "Giới Tử Thôi và chiếc bánh thanh tịnh", body: "Giới Tử Thôi, hiền sĩ nước Tấn thời Xuân Thu, vì giữ khí tiết đã ôm cây chết cháy cùng mẹ già trên núi Miên Sơn. Vua Tấn Văn Công đau xót, lập tục cấm lửa ngày đó — mọi nhà phải ăn đồ lạnh, gọi là Hàn thực. Tục này du nhập Việt Nam nhưng được dân gian làm dịu thành tết ăn chay: không còn cấm lửa, chỉ còn bánh trôi tròn như trời và bánh chay dẹt như đất dâng lên tổ tiên. Ở phố cũ, người ta còn truyền tay nhau câu 'mùng ba tháng ba — bánh trôi bánh chay' như một lời hẹn ngọt ngào của mùa xuân." },
  },
  "tet-doan-ngo": {
    sources: [
      { outlet: "Wikipedia", title: "Tết Đoan Ngọ", url: "https://vi.wikipedia.org/wiki/T%E1%BA%BFt_%C4%90oan_ng%E1%BB%8D", summary: "Tết Đoan Ngọ 5/5 âm lịch — tết giết sâu bọ của dân gian Việt, khi người ta ăn hoa quả chua và rượu nếp thanh lọc cơ thể." },
      { outlet: "Wikipedia", title: "Gia đình", url: "https://vi.wikipedia.org/wiki/Gia_%C4%91%C3%ACnh", summary: "Bối cảnh gia đình — mâm cơm Đoan Ngọ truyền thống của nhà Việt với cơm rượu và trái cây đầu mùa." },
      { outlet: "Wikipedia", title: "Đông y", url: "https://vi.wikipedia.org/wiki/%C4%90%C3%B4ng_y", summary: "Y học cổ truyền — nền tảng của tục 'giết sâu bọ' và hái thuốc ngọ trong dân gian." },
    ],
    story: { title: "Tết giết sâu bọ", body: "Ngày xưa ở đồng bằng, tháng 5 sang hè là lúc ruồi muỗi, dịch bệnh rộ lên. Người xưa chẳng có thuốc tây — chỉ có kinh nghiệm: hoa quả chua, rượu nếp, cơm rượu và lá ngải. Mùng 5 tháng 5, đúng giờ ngọ, cả nhà ăn đồ chua trước khi ăn cơm — như một cách bảo vệ chung của cả dân tộc. 'Hà Nội không vội được đâu' vẫn hay nói về tết này: người thủ đô chuẩn bị từ sớm mâm vải, mận, cơm rượu hoa vàng. Tết giết sâu bọ vì thế không phải lễ mê tín mà là trí tuệ dân gian phòng bệnh mùa hè — và cũng là ngày con cháu hỏi thăm sức khỏe cha mẹ." },
  },
  "ngay-thay-thuoc": {
    sources: [
      { outlet: "Wikipedia", title: "Ngày Thầy thuốc Việt Nam", url: "https://vi.wikipedia.org/wiki/Ng%C3%A0y_th%E1%BA%A7y_thu%E1%BB%91c_Vi%E1%BB%87t_Nam", summary: "Ngày Thầy thuốc Việt Nam 27/2 — kỷ niệm bức thư năm 1955 của Chủ tịch Hồ Chí Minh gửi cán bộ y tế." },
      { outlet: "Wikipedia", title: "Đông y", url: "https://vi.wikipedia.org/wiki/%C4%90%C3%B4ng_y", summary: "Đông y — truyền thống y học mà thầy thuốc Việt Nam kế thừa cùng y học hiện đại." },
      { outlet: "Wikipedia", title: "Nghĩa trang Hàng Dương", url: "https://vi.wikipedia.org/wiki/Ngh%C4%A9a_trang_H%C3%A0ng_D%C6%B0%C6%A1ng", summary: "Nơi yên nghỉ của nhiều anh hùng cách mạng — gợi nhớ đạo lý phụng sự quê hương mà nghề thầy thuốc cũng mang." },
    ],
    story: { title: "Lương y như từ mẫu", body: "Bức thư gửi cán bộ y tế ngày 27/2/1955 của Bác Hồ chỉ ngắn vài chục dòng nhưng chứa một chuẩn mực vượt thời đại: 'Lương y như từ mẫu' — thầy thuốc phải yêu thương bệnh nhân như mẹ yêu con. Từ đó, 27/2 trở thành ngày của những người áo trắng: bác sĩ đêm trực phòng mổ, điều dưỡng đưa thuốc tận giường, thầy thuốc vùng cao đi bộ cả ngày đến bản. Mỗi năm, bệnh viện lại trao bó hoa và lá thư cảm ơn — và một nghề lặng lẽ được nói tên." },
  },
  "ngay-bao-chi": {
    sources: [
      { outlet: "Wikipedia", title: "Báo chí Việt Nam", url: "https://vi.wikipedia.org/wiki/B%C3%A1o_ch%C3%AD_Vi%E1%BB%87t_Nam", summary: "Lịch sử báo chí Việt Nam — từ Thanh Niên 1925, Cứu Quốc thời kháng chiến đến báo mạng hiện đại." },
      { outlet: "Wikipedia", title: "Thanh Niên (báo)", url: "https://vi.wikipedia.org/wiki/Thanh_Ni%C3%AAn_(b%C3%A1o)", summary: "Báo Thanh Niên — tờ báo hiện nay của T.Ư Đoàn, mang tên tờ báo tiền thân do Nguyễn Ái Quốc sáng lập năm 1925." },
      { outlet: "Wikipedia", title: "Tết", url: "https://vi.wikipedia.org/wiki/T%E1%BA%BFt", summary: "Bối cảnh văn hóa — báo chí định hình cách người Việt hiểu lễ hội và lịch sử của mình." },
    ],
    story: { title: "Tờ báo khởi nguồn ở Quảng Châu", body: "Năm 1925, trong một căn phòng nhỏ ở Quảng Châu, Nguyễn Ái Quốc cùng đồng chí in tờ Thanh Niên số đầu tiên — tờ báo Việt Nam đầu tiên mang tinh thần cách mạng. Giấy mỏng, máy in cũ, nhưng lời báo chạy về nước nhanh hơn cả tin chiến trường. Từ đó, báo chí Việt Nam đi qua thời chiến với Cứu Quốc, qua đổi mới với báo điện tử — và vẫn là nghề chạy nhanh hơn người khác để kể cho dân nghe sự thật. 21/6 mỗi năm, những người làm báo nhắc lại ngày khởi nguồn ấy." },
  },
  "nguoi-cao-tuoi": {
    sources: [
      { outlet: "Wikipedia", title: "Ngày quốc tế người cao tuổi", url: "https://vi.wikipedia.org/wiki/Ng%C3%A0y_qu%E1%BB%91c_t%E1%BA%BF_ng%C6%B0%E1%BB%9Di_cao_tu%E1%BB%95i", summary: "Ngày Quốc tế Người cao tuổi 1/10 do LHQ chọn năm 1991 — Việt Nam cũng kỷ niệm cùng ngày." },
      { outlet: "Wikipedia", title: "Gia đình", url: "https://vi.wikipedia.org/wiki/Gia_%C4%91%C3%ACnh", summary: "Gia đình Việt — nơi người cao tuổi giữ vai trò cột trụ tinh thần và truyền thống." },
      { outlet: "Wikipedia", title: "Tết", url: "https://vi.wikipedia.org/wiki/T%E1%BA%BFt", summary: "Lễ mừng thọ trong văn hóa Việt thường gắn với dịp Tết và các ngày lễ trong năm." },
    ],
    story: { title: "Mái tóc bạc của làng", body: "Ở quê, cụ ông 80 tuổi vẫn ngồi gác hiên kể chuyện ngày đánh bom; cụ bà vẫn nhớ từng mùa cấy của ba đời nhà. Người già không chỉ là người cần chăm sóc — họ là thư viện sống của gia đình và của làng. Khi LHQ chọn 1/10 làm Ngày Người cao tuổi, Việt Nam gặp lại một phần cốt lõi của mình: 'kính lão đắc thọ' vốn đã là đạo lý trong từng mâm cỗ mừng thọ 70, 80, 90 tuổi. Ngày ấy chỉ cần một cú điện thoại về quê — hỏi ông bà ăn cơm chưa — là đã giữ được phong tục." },
  },
  "doanh-nhan": {
    sources: [
      { outlet: "Wikipedia", title: "Doanh nhân", url: "https://vi.wikipedia.org/wiki/Doanh_nh%C3%A2n", summary: "Khái niệm doanh nhân — vai trò người khởi tạo, điều hành và chịu trách nhiệm trong doanh nghiệp." },
      { outlet: "Wikipedia", title: "Khởi nghiệp", url: "https://vi.wikipedia.org/wiki/Kh%E1%BB%9Fi_nghi%E1%BB%87p", summary: "Khởi nghiệp — phong trào mà Ngày Doanh nhân Việt Nam khuyến khích, đặc biệt với giới trẻ." },
      { outlet: "Wikipedia", title: "Báo chí Việt Nam", url: "https://vi.wikipedia.org/wiki/B%C3%A1o_ch%C3%AD_Vi%E1%BB%87t_Nam", summary: "Báo chí là nơi lưu lại câu chuyện khởi nghiệp và những thương hiệu Việt đi lên." },
    ],
    story: { title: "Người dám bắt đầu", body: "Năm 2004, Nhà nước chọn 13/10 làm ngày riêng cho doanh nhân — lần đầu trong lịch sử, nghề buôn được công nhận là một vai trò xây dựng đất nước. Từ quán cà phê hẻm nhỏ đến công ty công nghệ xuất khẩu, mỗi doanh nhân Việt đều mang một câu chuyện bắt đầu: có người bỏ việc nhà nước năm đổi mới, có người khởi nghiệp từ phòng trọ sinh viên. Ngày Doanh nhân là lời nhắc rằng thương trường không chỉ là tiền — mà là việc làm cho hàng trăm gia đình, là chữ tín trên hóa đơn, là khi dám chịu trách nhiệm với cả một đội ngũ." },
  },
  "ngay-thanh-lap-dang": {
    sources: [
      { outlet: "Wikipedia", title: "Đảng Cộng sản Việt Nam", url: "https://vi.wikipedia.org/wiki/%C4%90%E1%BA%A3ng_C%E1%BB%99ng_s%E1%BA%A3n_Vi%E1%BB%87t_Nam", summary: "Toàn cảnh lịch sử Đảng — từ hội nghị hợp nhất 1930 qua các lần đổi tên và các kỳ đại hội." },
      { outlet: "Wikipedia", title: "Nguyễn Ái Quốc", url: "https://vi.wikipedia.org/wiki/Nguy%E1%BB%85n_%C3%81i_Qu%E1%BB%91c", summary: "Người chủ trì hội nghị hợp nhất — phái viên Quốc tế Cộng sản từ Xiêm về Hồng Kông đầu năm 1930." },
      { outlet: "Đảng Cộng sản Việt Nam", title: "Cổng thông tin điện tử", url: "https://dangcongsan.vn/", summary: "Trang tin chính thức của Đảng — nguồn tư liệu về lịch sử và các kỳ kỷ niệm ngày thành lập." },
    ],
    story: { title: "Căn phòng ở Cửu Long", body: "Đầu năm 1930, trong một căn phòng thuê ở Cửu Long, Nguyễn Ái Quốc đặt ba phái đoàn cộng sản đang cãi nhau về đường lối ngồi vào một bàn. Câu hỏi đặt ra chỉ một: hay là cùng một tổ chức? Ngày 3/2, ba dòng chảy ấy hợp thành một — Đảng Cộng sản Việt Nam ra đời, với Chính cương vắn tắt ông soạn đêm trước. Từ căn phòng nước ngoài ấy, một đường dài bắt đầu: năm tháng sau Đảng đổi tên Đông Dương, mười lăm năm sau là Tổng khởi nghĩa tháng Tám. Ngày 3/2 hằng năm, người ta nhắc lại căn phòng nhỏ nơi lịch sử rẽ hướng." },
  },
  "ngay-dien-bien-phu": {
    sources: [
      { outlet: "Wikipedia", title: "Chiến dịch Điện Biên Phủ", url: "https://vi.wikipedia.org/wiki/Chi%E1%BA%BFn_d%E1%BB%8Bch_%C4%90i%E1%BB%87n_Bi%C3%AAn_Ph%E1%BB%A7", summary: "56 ngày đêm của chiến dịch — từ trận mở màn đồn Beatrice đến lá cờ trên nóc hầm De Castries." },
      { outlet: "Wikipedia", title: "Võ Nguyên Giáp", url: "https://vi.wikipedia.org/wiki/V%C3%B5_Nguy%C3%AAn_Gi%C3%A1p", summary: "Đại tướng chỉ huy chiến dịch — từ nhà giáo dạy sử đến tư lệnh trận quyết chiến chiến lược." },
      { outlet: "Wikipedia", title: "Hiệp định Genève 1954", url: "https://vi.wikipedia.org/wiki/Hi%E1%BB%87p_%C4%91%E1%BB%8Bnh_Gen%C3%A8ve,_1954", summary: "Hiệp định kết thúc chiến tranh Đông Dương — được ký sau khi Điện Biên Phủ thất thủ." },
    ],
    story: { title: "Đường kéo pháo qua rừng", body: "Người Pháp tính rằng không ai đưa pháo lớn qua được những con đèo Tây Bắc. Họ không tính đến hàng trăm nghìn vai người: dân công gùi gạo, xe đạp thồ chở đạn, đội kéo pháo lê từng mét qua đêm mưa đất đỏ. Đến khi trận mở màn nổ 13/3/1954, pháo Việt Minh đã ngắm thẳng xuống lưu vực từ bốn phía núi. 56 ngày đêm sau, chiều 7/5, lá cờ 'Quyết chiến quyết thắng' tung trên nóc hầm De Castries — và thế giới bắt đầu gọi đó là 'Điện Biên Phủ'. Ngày ấy là bằng chứng: bàn tay trần có thể chuyển cả núi." },
  },
  "ngay-sinh-nhat-bac": {
    sources: [
      { outlet: "Wikipedia", title: "Hồ Chí Minh", url: "https://vi.wikipedia.org/wiki/H%E1%BB%93_Ch%C3%AD_Minh", summary: "Cuộc đời Người — từ làng Hoàng Trù, Nghệ An đến ba mươi năm bôn ba tìm đường cứu nước." },
      { outlet: "Wikipedia", title: "Lăng Chủ tịch Hồ Chí Minh", url: "https://vi.wikipedia.org/wiki/L%C4%83ng_Ch%E1%BB%A7_t%E1%BB%8Bch_H%E1%BB%93_Ch%C3%AD_Minh", summary: "Nơi hàng vạn người vào viếng mỗi dịp 19/5 — công trình khánh thành 1975 tại quảng trường Ba Đình." },
      { outlet: "Wikipedia", title: "Bảo tàng Hồ Chí Minh", url: "https://vi.wikipedia.org/wiki/B%E1%BA%A3o_t%C3%A0ng_H%E1%BB%93_Ch%C3%AD_Minh", summary: "Bảo tàng lớn nhất về Người — nơi lưu giữ tư liệu cuộc đời và sự nghiệp cách mạng." },
    ],
    story: { title: "Chuyến đò rời Bến Nhà Rồng", body: "Sáng 5/6/1911, một phụ bếp trẻ 21 tuổi tên Văn Ba bước lên tàu Amiral Latouche-Tréville rời Sài Gòn — mang theo vài đồng tiền tiết kiệm và một câu hỏi lớn: làm sao để đất nước được độc lập? Ba mươi năm sau người ấy trở về với cái tên Hồ Chí Minh, và thế giới biết đến ông như biểu tượng của cả một dân tộc. Mỗi 19/5, từ trường làng đến thành phố, người Việt nhắc nhau câu chuyện chuyến đò năm ấy — rằng một người đi tìm đường, và cả dân tộc theo sau." },
  },
  "ngay-cach-mang-thang-tam": {
    sources: [
      { outlet: "Wikipedia", title: "Cách mạng tháng Tám", url: "https://vi.wikipedia.org/wiki/C%C3%A1ch_m%E1%BA%A1ng_th%C3%A1ng_T%C3%A1m", summary: "Tổng khởi nghĩa 14–25/8/1945 — cuộc cách mạng giành chính quyền trên cả nước gần như không đổ máu." },
      { outlet: "Wikipedia", title: "Việt Minh", url: "https://vi.wikipedia.org/wiki/Vi%E1%BB%87t_Minh", summary: "Mặt trận đoàn kết dẫn đầu Tổng khởi nghĩa — từ căn cứ Tân Trào ra lệnh khởi nghĩa toàn quốc." },
      { outlet: "Wikipedia", title: "Tuyên ngôn độc lập", url: "https://vi.wikipedia.org/wiki/Tuy%C3%AAn_ng%C3%B4n_%C4%91%E1%BB%99c_l%E1%BA%ADp_(Vi%E1%BB%87t_Nam_D%C3%A2n_ch%E1%BB%A7_C%E1%BB%99ng_h%C3%B2a)", summary: "Bản Tuyên ngôn 2/9/1945 — lời kết tinh của Cách mạng tháng Tám tại quảng trường Ba Đình." },
    ],
    story: { title: "Buổi trưa quảng trường Nhà hát Lớn", body: "Trưa 19/8/1945, quảng trường trước Nhà hát Lớn chật kín người. Cờ đỏ sao vàng phủ lên dòng người, khẩu hiệu vang từng đợt. Chỉ vài giờ sau, đoàn quân cách mạng tiến vào Ty Bắc bộ — trung tâm quyền lực thực dân ở Bắc Kỳ — và lá cờ Việt Minh thay cờ cũ trên nóc tòa nhà. Gần như không một viên đạn. Từ Hà Nội, sóng khởi nghĩa lan ra Huế, Sài Gòn; hai tuần sau vua Bảo Đại thoái vị. Người Hà Nội kể lại: hôm ấy cả thành phố như cùng đứng dậy một lúc." },
  },
  "ngay-giai-phong-thu-do": {
    sources: [
      { outlet: "Wikipedia", title: "Giải phóng Thủ đô", url: "https://vi.wikipedia.org/wiki/Gi%E1%BA%A3i_ph%C3%B3ng_Th%E1%BB%A7_%C4%91%C3%B4", summary: "Ngày 10/10/1954 — quân tiếp quản vào Hà Nội qua năm cửa ô sau Hiệp định Genève." },
      { outlet: "Wikipedia", title: "Chiến tranh Đông Dương", url: "https://vi.wikipedia.org/wiki/Chi%E1%BA%BFn_tranh_%C4%90%C3%B4ng_D%C6%B0%C6%A1ng", summary: "Chín năm kháng chiến 1946–1954 kết thúc bằng ngày tiếp quản Thủ đô." },
      { outlet: "Wikipedia", title: "Hà Nội", url: "https://vi.wikipedia.org/wiki/H%C3%A0_N%E1%BB%99i", summary: "Thủ đô ngàn năm — nơi ngày 10/10 trở thành một trong những dấu son lớn nhất của thành phố." },
    ],
    story: { title: "Năm cửa ô một buổi sáng", body: "Sáng 10/10/1954, cùng một giờ, quân đội tiến vào Hà Nội từ năm hướng: Cầu Giấy, Ô Cầu Dền, Hàng Đậu, Long Biên, Bạch Mai. Người dân đứng hai bên đường từ trước bình minh, tay cầm hoa, mắt đỏ vì chờ đợi chín năm. Chiều hôm ấy, trước sân vận động Cộng hòa, lá cờ đỏ sao vàng chậm rãi kéo lên cột cờ thành — người già thấy lại lá cờ họ từng chào năm 1945, người trẻ lần đầu được thấy Thủ đô hoàn toàn của mình. Ngày ấy, Hà Nội chính thức về nhà." },
  },
};
