import type { StoryEntry } from "./stories";

/**
 * English mirror of `stories.ts`. Same keys; English story titles/bodies,
 * English outlet labels and links to the corresponding English Wikipedia /
 * Britannica articles (the link checker validates every URL).
 */
const W = "https://en.wikipedia.org/wiki/";
const B = "https://www.britannica.com/";

export const storiesEn: Record<string, StoryEntry> = {
  "tet-duong-lich": {
    sources: [
      { outlet: "Wikipedia", title: "New Year's Day", url: `${W}New_Year%27s_Day`, summary: "January 1 on the Gregorian calendar — a public holiday in Vietnam, marked by midnight countdowns and fireworks in major cities." },
      { outlet: "Wikipedia", title: "New Year's Eve", url: `${W}New_Year%27s_Eve`, summary: "The night of December 31 — countdown parties and fireworks that open Vietnam's festive season ahead of Tết." },
      { outlet: "Britannica", title: "Gregorian calendar", url: `${B}topic/Gregorian-calendar`, summary: "The calendar reform of 1582 that gave the world January 1 as the modern New Year's Day." },
    ],
    story: { title: "The night before the new year", body: "New Year's Eve in Vietnam belongs to the young: crowds pour into city centers while families gather around a warm meal. In big cities fireworks bloom at the exact moment the clock touches midnight — the instant everyone turns to each other with wishes of a peaceful year. Unlike Tết, which belongs to ancestors and spirits, New Year's Day is a festival of beginnings: a fresh notebook, new plans, and a small promise made to oneself." },
  },
  "tet-nguyen-dan": {
    sources: [
      { outlet: "Wikipedia", title: "Tết", url: `${W}T%E1%BA%BFt`, summary: "Vietnam's most important celebration — the lunar new year, tied to ancestor worship, family reunion and age-old rites." },
      { outlet: "Wikipedia", title: "Bánh chưng", url: `${W}B%C3%A1nh_ch%C6%B0ng`, summary: "The square sticky-rice cake symbolizing the earth — inseparable from northern Tết and the legend of Prince Lang Liêu." },
      { outlet: "Britannica", title: "Chinese New Year", url: `${B}topic/Chinese-New-Year`, summary: "The lunisolar new year shared across East Asia — of which Vietnam's Tết is a distinct, beloved branch." },
    ],
    story: { title: "The cakes of earth and sky", body: "When the king opened a contest to choose his heir, the Hùng king asked each prince to bring an offering worthy of the ancestors. Lang Liêu, the poorest son, could offer only two rice cakes: a square one for the earth (bánh chưng) and a round one for the sky (bánh giầy), made of glutinous rice and mung beans — the grain that feeds a people. The Hùng king passed him the throne, and the two cakes became the emblems of Tết, reminding descendants to be grateful to earth, sky and ancestors." },
  },
  "tet-nguyen-tieu": {
    sources: [
      { outlet: "Wikipedia", title: "Lantern Festival", url: `${W}Lantern_Festival`, summary: "The first full moon of the lunar year — shared across East Asia, in Vietnam a night of pagoda visits and lanterns." },
      { outlet: "Wikipedia", title: "Tangyuan (food)", url: `${W}Tangyuan_(food)`, summary: "The round glutinous-rice balls eaten on the first full moon — Vietnam's chè trôi nước is their local kin." },
      { outlet: "Wikipedia", title: "Tết", url: `${W}T%E1%BA%BFt`, summary: "Vietnam's new-year season runs from day one to the first full moon, closing with the Nguyên Tiêu festival." },
    ],
    story: { title: "The year's first full moon", body: "Nguyên Tiêu is the first full-moon night of the year — its name means 'the night of the first fullness', when all things begin a new cycle. The ancients believed tonight's moon was the brightest and most sacred of the year. Folk wisdom says 'a year of Buddhist rites cannot match the first full moon': pagodas fill with people praying for peace, and in many towns the streets glow with lantern light." },
  },
  valentine: {
    sources: [
      { outlet: "Wikipedia", title: "Valentine's Day", url: `${W}Valentine%27s_Day`, summary: "February 14 — the feast of Saint Valentine that became the world's day of love, flowers and cards." },
      { outlet: "Wikipedia", title: "Saint Valentine", url: `${W}Saint_Valentine`, summary: "The 3rd-century Roman priest behind the legend — said to have secretly married young lovers." },
      { outlet: "Britannica", title: "Valentine's Day", url: `${B}topic/Valentines-Day`, summary: "How a Roman feast day became the modern festival of love — from Chaucer to commercial cards." },
    ],
    story: { title: "The saint and the little notes", body: "Legend tells of Saint Valentine, a Roman priest imprisoned for secretly wedding soldiers and young lovers. Before his execution, he supposedly sent a message to the girl he had cared for, signed 'your Valentine' — the first card. However much the tale has grown, from that day February 14 became the occasion when people trade secret, then open, words of love — turning a saint's feast into the festival of love itself." },
  },
  "quoc-te-phu-nu": {
    sources: [
      { outlet: "Wikipedia", title: "International Women's Day", url: `${W}International_Women%27s_Day`, summary: "March 8 — rooted in early 20th-century women's labor movements and marked by the UN since 1975." },
      { outlet: "Wikipedia", title: "Trưng sisters", url: `${W}Tr%C6%B0ng_sisters`, summary: "The sisters who led Vietnam's first independence uprising in 40 AD — remembered on March 8 as an early emblem of women's power." },
      { outlet: "Britannica", title: "International Women's Day", url: `${B}topic/International-Womens-Day`, summary: "The history of the day — from Clara Zetkin's 1910 proposal to global observance." },
    ],
    story: { title: "The Trưng sisters are still with us", body: "In the year 40, Trưng Trắc and Trưng Nhị rose in revolt and set up their court at Mê Linh, becoming the first women to hold power in Vietnamese history. Ancient records praised the Mê Linh women who 'carried the nation's mountains and rivers'. Nearly two thousand years later, every rose handed over on March 8 recalls that story: Vietnamese women have long been masters of their own land." },
  },
  "gio-to-hung-vuong": {
    sources: [
      { outlet: "Wikipedia", title: "Hùng Kings' Festival", url: `${W}H%C3%B9ng_Kings%27_Festival`, summary: "The festival on the 10th of the 3rd lunar month honoring the Hùng kings at the Hùng Temple in Phú Thọ — a Vietnamese public holiday." },
      { outlet: "Wikipedia", title: "Hùng king", url: `${W}H%C3%B9ng_king`, summary: "The legendary first dynasty of Vietnam — 18 generations who founded the state of Văn Lang." },
      { outlet: "Wikipedia", title: "Bánh chưng", url: `${W}B%C3%A1nh_ch%C6%B0ng`, summary: "The legend of Lang Liêu belongs to the Hùng era — the earth-and-sky cakes offered to the founding kings." },
    ],
    story: { title: "Back to the source", body: "Vietnamese people call themselves 'children of the Dragon, grandchildren of the Fairy', and call Nghĩa Lĩnh mountain 'the source'. On the 10th of the 3rd lunar month, people from every region travel upstream to Phú Thọ to burn incense before the Hùng Temple gates. The verse 'wherever you roam, remember the Ancestors' day — the tenth of the third month' lives in the culture as the most natural of reminders: one day when the whole nation turns its face back to a single beginning." },
  },
  "tet-thanh-minh": {
    sources: [
      { outlet: "Wikipedia", title: "Qingming Festival", url: `${W}Qingming_Festival`, summary: "The 'clear and bright' festival on the Qingming solar term — East Asia's tomb-sweeping season, kept in Vietnam as tảo mộ." },
      { outlet: "Wikipedia", title: "Solar term", url: `${W}Solar_term`, summary: "Thanh Minh is a solar term — which is why its Gregorian date shifts between April 4 and 6 each year." },
      { outlet: "Wikipedia", title: "The Tale of Kiều", url: `${W}The_Tale_of_Ki%E1%BB%81u`, summary: "Nguyễn Du's epic made the season immortal with the line 'in the third month comes the Thanh Minh season'." },
    ],
    story: { title: "A broom for the ancestors", body: "When Nguyễn Du wrote 'in the third month comes the Thanh Minh season — the grave-sweeping days, the farewell picnics', he fixed forever the image of this festival in the Vietnamese heart. Every spring, families carry brooms, paint and fresh flowers back to the graves of their grandparents. Grass is cleared, stones repainted, incense lit — and only then does the family stand in a row and bow. Tảo mộ asks nothing grand: it asks that the living return, once a year, to say to the departed — we have not forgotten." },
  },
  "giai-phong-mien-nam": {
    sources: [
      { outlet: "Wikipedia", title: "Reunification Day", url: `${W}Reunification_Day`, summary: "April 30 — the holiday marking the end of the Vietnam War in 1975 and the country's reunification." },
      { outlet: "Wikipedia", title: "Fall of Saigon", url: `${W}Fall_of_Saigon`, summary: "The events of April 30, 1975 — the Liberation Army's entry into Saigon and the end of more than twenty years of division." },
      { outlet: "Wikipedia", title: "Vietnam War", url: `${W}Vietnam_War`, summary: "The long conflict (1955–1975) that ended on the day now marked as Reunification Day." },
    ],
    story: { title: "The tank at the palace gate", body: "At noon on April 30, 1975, tank 390 of the Liberation Army broke through the gates of the Independence Palace; the liberation flag flew from its roof by 11:30. The country was one again after three decades of division. People in Hanoi still tell how, that day, they lit incense to tell their ancestors the news — 'the happiest day the country had ever known'. Since then April 30 has been the holiday of a nation at peace." },
  },
  "quoc-te-lao-dong": {
    sources: [
      { outlet: "Wikipedia", title: "International Workers' Day", url: `${W}International_Workers%27_Day`, summary: "May 1 — born of the 1886 movement for the eight-hour day, now a public holiday in more than 80 countries." },
      { outlet: "Wikipedia", title: "Haymarket affair", url: `${W}Haymarket_affair`, summary: "The 1886 Chicago events that made May 1 the world's symbol of labor struggle." },
      { outlet: "Britannica", title: "May Day", url: `${B}topic/May-Day-workers-holiday`, summary: "How the workers' holiday of May 1 grew out of the fight for shorter working hours." },
    ],
    story: { title: "Eight hours to live", body: "In May 1886, hundreds of thousands of Chicago workers stopped their machines to demand '8 hours of work — 8 hours of rest — 8 hours for what we will'. The Haymarket events showed the world the price of labor rights. Three years later the International chose May 1 as International Workers' Day. Today Vietnam's April 30–May 1 break still carries the shape of that right: the right to rest, and to have one's work honored." },
  },
  "ngay-cua-me": {
    sources: [
      { outlet: "Wikipedia", title: "Mother's Day", url: `${W}Mother%27s_Day`, summary: "Most widely kept on the second Sunday of May — started by Anna Jarvis's campaign in the United States in 1908." },
      { outlet: "Wikipedia", title: "Anna Jarvis", url: `${W}Anna_Jarvis`, summary: "The founder of Mother's Day — who later fought its commercialization." },
      { outlet: "Britannica", title: "Mother's Day", url: `${B}topic/Mothers-Day`, summary: "The origins and customs of the day honoring mothers, from America to the world." },
    ],
    story: { title: "Anna's carnation", body: "In 1905 Anna Jarvis lost her mother. Three years later she held a memorial service and handed out 500 white carnations — her mother's favorite flower. Her campaigning led President Wilson to proclaim Mother's Day on the second Sunday of May in 1914. Ironically, Anna spent her later years fighting the holiday's commercialization — she wanted it to remain a heartfelt thank-you, not a shopping spree." },
  },
  "quoc-te-thieu-nhi": {
    sources: [
      { outlet: "Wikipedia", title: "Children's Day", url: `${W}Children%27s_Day`, summary: "June 1 — chosen in 1949 to protect and care for the youngest generation, marked in many countries." },
      { outlet: "Wikipedia", title: "Lidice", url: `${W}Lidice`, summary: "The Czech village destroyed in 1942 — the tragedy that June 1 was chosen to remember." },
      { outlet: "Britannica", title: "Universal Children's Day", url: `${B}topic/Universal-Childrens-Day`, summary: "The world's days for children — and the rights they were created to protect." },
    ],
    story: { title: "For the little ones", body: "In June 1942, Nazi Germany killed 88 children in the Czech village of Lidice — one of the war's most chilling crimes. After the war, the Women's International Democratic Federation chose June 1 as the day for all humanity to remember: children have the right to live and to be loved. In Vietnam, every summer begins with candles for Lidice — and a season of celebration for the little ones." },
  },
  "ngay-gia-dinh-viet-nam": {
    sources: [
      { outlet: "Wikipedia", title: "International Day of Families", url: `${W}International_Day_of_Families`, summary: "The UN day honoring the family — while Vietnam keeps its own Family Day on June 28." },
      { outlet: "Wikipedia", title: "Family", url: `${W}Family`, summary: "The family as society's first cell — the theme at the heart of June 28." },
      { outlet: "Wikipedia", title: "Vietnamese people", url: `${W}Vietnamese_people`, summary: "The culture of family meals, filial devotion and three-generation households that June 28 celebrates." },
    ],
    story: { title: "A warm dinner table", body: "In Vietnamese, 'sum vầy' — gathering around the pot — is the most beautiful image of family: everyone coming home for dinner, a full tray however simple the dishes. In 2001 the state chose June 28 to honor those rooftops — a little-known decision worth cherishing, because most of us have a 'home' that is a kitchen fire and familiar questions. On that day, simply calling home is enough to keep the tradition alive." },
  },
  "thuong-binh-liet-si": {
    sources: [
      { outlet: "Wikipedia", title: "Public holidays in Vietnam", url: `${W}Public_holidays_in_Vietnam`, summary: "July 27 — Vietnam's day of gratitude to those wounded or killed for national independence, listed among the country's public observances." },
      { outlet: "Wikipedia", title: "Vietnam War", url: `${W}Vietnam_War`, summary: "The long wars whose fallen are remembered every July 27." },
      { outlet: "Wikipedia", title: "People's Army of Vietnam", url: `${W}People%27s_Army_of_Vietnam`, summary: "The armed force in which many of the honored invalids and martyrs served." },
    ],
    story: { title: "The candles of July 27", body: "In 1947, writer Hoài Thanh proposed a day for the whole nation to remember its wounded soldiers and its dead. July 27 was chosen after the first visits to wounded fighters at Từ Đũ, Thái Nguyên. Since then, every July 27 evening has become a night of candles — at martyrs' cemeteries and on family rooftops, Vietnamese people light small flames to tell those who are gone: the country has not forgotten." },
  },
  "vu-lan": {
    sources: [
      { outlet: "Wikipedia", title: "Ghost Festival", url: `${W}Ghost_Festival`, summary: "The 15th of the 7th lunar month across East Asia — in Vietnam it is the season of filial devotion to mothers." },
      { outlet: "Wikipedia", title: "Ullambana Sutra", url: `${W}Ullambana_Sutra`, summary: "The Buddhist sutra of Maudgalyāyana saving his mother — the scriptural root of Vu Lan." },
      { outlet: "Wikipedia", title: "Obon", url: `${W}Obon`, summary: "Japan's sister festival on the same full moon — welcoming ancestors home with lanterns." },
    ],
    story: { title: "Mục Kiền Liên and the rose on the chest", body: "The sutra tells how the disciple Mục Liên used his powers to descend and rescue his mother from the realm of hungry ghosts, and how the Buddha taught him the Vu Lan offering of filial devotion. The 7th-month full moon became the day of gratitude. Vietnamese folk custom adds the ritual of pinning a rose to one's chest: red for those whose mother lives, white for those whose mother has passed. In a Vu Lan crowd, one small rose is the gentlest possible answer to the question 'is your mother still with you?'" },
  },
  "quoc-khanh": {
    sources: [
      { outlet: "Wikipedia", title: "National Day (Vietnam)", url: `${W}National_Day_(Vietnam)`, summary: "September 2 — the day Hồ Chí Minh read the Declaration of Independence at Ba Đình Square in 1945." },
      { outlet: "Wikipedia", title: "Proclamation of Independence of the Democratic Republic of Vietnam", url: `${W}Proclamation_of_Independence_of_the_Democratic_Republic_of_Vietnam`, summary: "The 1945 document that opened with a quotation from the American Declaration of Independence." },
      { outlet: "Wikipedia", title: "Ba Đình Square", url: `${W}Ba_%C4%90%C3%ACnh_Square`, summary: "The square where independence was proclaimed — now the site of the Hồ Chí Minh Mausoleum." },
    ],
    story: { title: "Ba Đình, the afternoon of September 2", body: "On the afternoon of September 2, 1945, before hundreds of thousands at Ba Đình Square, Hồ Chí Minh read a short Declaration of Independence: 'All men are created equal.' The voice came through a small loudspeaker, but the words rang across a nation just freed from decades of colonial rule. That day the red flag with the gold star flew before the people for the first time — and September 2 forever became the day the nation stood up." },
  },
  "trung-thu": {
    sources: [
      { outlet: "Wikipedia", title: "Mid-Autumn Festival", url: `${W}Mid-Autumn_Festival`, summary: "The full moon of the 8th lunar month — in Vietnam a children's festival of lanterns, lion dances and mooncakes." },
      { outlet: "Wikipedia", title: "Mooncake", url: `${W}Mooncake`, summary: "The dense, rich cakes shared under the full moon — baked and snow-skin styles in Vietnam." },
      { outlet: "Wikipedia", title: "Chang'e", url: `${W}Chang%27e`, summary: "The moon goddess of East Asian lore — Hằng Nga to Vietnamese children." },
    ],
    story: { title: "Cuội on the moon", body: "Legend says Cuội saved a magical banyan tree and treated it like a divine medicine. One day, while he was away, his wife forgot his warning and watered it with dirty water; the sacred tree pulled up its roots and flew skyward. Cuội came home just in time to grab the last branch — and was carried to the moon with it. Ever since, on the 8th-month full moon, people say you can see Cuội's shape under his tree — and children parade their lanterns asking if he'd like a taste of mooncake." },
  },
  "phu-nu-viet-nam": {
    sources: [
      { outlet: "Wikipedia", title: "Vietnam Women's Union", url: `${W}Vietnam_Women%27s_Union`, summary: "Founded October 20, 1930 — the origin of Vietnamese Women's Day." },
      { outlet: "Wikipedia", title: "Women in Vietnam", url: `${W}Women_in_Vietnam`, summary: "The tradition of 'heroic, indomitable, loyal, capable' women that October 20 honors." },
      { outlet: "Wikipedia", title: "Trưng sisters", url: `${W}Tr%C6%B0ng_sisters`, summary: "The ancient heroines at the head of the tradition Vietnamese Women's Day continues." },
    ],
    story: { title: "The day the Union was born", body: "On the afternoon of October 20, 1930, a group of women founded the Anti-Imperialist Women's Union — opening a force of solidarity never before seen in Vietnam's movements. Thirty-five years later, that day was chosen as Vietnamese Women's Day. When young people today send flowers to their mothers, sisters and wives on October 20, they are not only honoring beauty — they are continuing the story of women who helped build a nation." },
  },
  "nha-giao-viet-nam": {
    sources: [
      { outlet: "Wikipedia", title: "World Teachers' Day", url: `${W}World_Teachers%27_Day`, summary: "UNESCO's global day for teachers — while Vietnam keeps its own on November 20." },
      { outlet: "Wikipedia", title: "Teacher", url: `${W}Teacher`, summary: "The profession Vietnam honors with the ancient maxim 'a teacher for life, for even half a word taught'." },
      { outlet: "Wikipedia", title: "Education in Vietnam", url: `${W}Education_in_Vietnam`, summary: "The tradition of learning and respect for teachers at the core of November 20." },
    ],
    story: { title: "The way of those who came before", body: "In Vietnamese custom, a teacher was once honored with the saying 'one letter taught, a teacher for life' — even half a word makes a master. From Chu Văn An's lecture halls to poor village schools, the teaching profession has always put duty before ease. November 20 is no holiday to sleep through amid flowers; it is the day old schools echo again with wedding-day greetings, the day former students return to aging teachers with a sentence that never grows old: 'I'm doing well, teacher.'" },
  },
  "quan-doi-nhan-dan": {
    sources: [
      { outlet: "Wikipedia", title: "People's Army of Vietnam", url: `${W}People%27s_Army_of_Vietnam`, summary: "Founded December 22, 1944 as a 34-soldier propaganda unit — the origin of Army Day." },
      { outlet: "Wikipedia", title: "Võ Nguyên Giáp", url: `${W}V%C3%B5_Nguy%C3%AAn_Gi%C3%A1p`, summary: "The general who led the first 34 soldiers — and later commanded at Điện Biên Phủ." },
      { outlet: "Wikipedia", title: "Battle of Điện Biên Phủ", url: `${W}Battle_of_%C4%90i%E1%BB%87n_Bi%C3%AAn_Ph%E1%BB%A7`, summary: "The 1954 victory that made the army's reputation worldwide." },
    ],
    story: { title: "The first 34", body: "On December 22, 1944, in the Trần Hưng Đạo forest, 34 soldiers assembled as the Vietnam Propaganda Liberation Army under Võ Nguyên Giáp — 'a small but mighty army' as the instruction went. Only days later the unit won its first two battles at Phai Khắt and Nà Ngần, opening a tradition of victory. Eight decades later, that day remains the birthday of the Vietnamese soldier." },
  },
  "giang-sinh": {
    sources: [
      { outlet: "Wikipedia", title: "Christmas", url: `${W}Christmas`, summary: "December 24–25 — the celebration of the birth of Jesus that became a global festival of light." },
      { outlet: "Wikipedia", title: "Santa Claus", url: `${W}Santa_Claus`, summary: "The gift-bringer descended from Saint Nicholas of Myra." },
      { outlet: "Britannica", title: "Christmas", url: `${B}topic/Christmas`, summary: "The history of the holiday — from the first recorded celebration in 336 to today's worldwide festival." },
    ],
    story: { title: "A Bethlehem night in the city", body: "Hanoi's Hàng Mã street turns into a river of light at year's end; the great cathedral glows on the night of December 24 as tens of thousands arrive at the same hour. Many are not religious, but Christmas in Vietnam long ago became a festival of family — and of young people wanting one warm night at the end of the year. Pagoda and cathedral stand near each other like that — and Noel has become a holiday everyone may enter." },
  },
  "ong-cong-ong-tao": {
    sources: [
      { outlet: "Wikipedia", title: "Kitchen God", url: `${W}Kitchen_God`, summary: "The hearth deity of East Asian folk belief — Vietnam's Táo quân, sent to heaven on the 23rd of the last lunar month." },
      { outlet: "Wikipedia", title: "Little New Year", url: `${W}Little_New_Year`, summary: "The year-end festival around the 23rd–24th of the last lunar month — the Kitchen Gods' farewell in East Asia." },
      { outlet: "Wikipedia", title: "Common carp", url: `${W}Common_carp`, summary: "The fish that carries the gods to heaven — Vietnam's distinctive carp-releasing rite." },
    ],
    story: { title: "The hearth fire and a pair of carp", body: "Legend tells of three people — Trọng Cao, Thị Nhi and Phạm Lang — bound by a twist of fate, appointed by the Jade Emperor as the Táo quân governing every household's hearth. Since then, each afternoon of the 23rd of the last month, homemakers clean the kitchen spotless, set an offering tray, then carry live carp to the ponds to release — the mounts that carry the gods to heaven to report. Vietnamese people believe: a house with a warm hearth is a house full of blessing; and the tale of the three who saved one another turns this festival into a lesson in everyday kindness." },
  },
  "tet-han-thuc": {
    sources: [
      { outlet: "Wikipedia", title: "Cold Food Festival", url: `${W}Cold_Food_Festival`, summary: "The ancient fire-ban festival honoring Jie Zitui — softened in Vietnam into the festival of bánh trôi bánh chay." },
      { outlet: "Wikipedia", title: "Jie Zitui", url: `${W}Jie_Zitui`, summary: "The Spring-and-Autumn loyalist whose death in the flames of Mount Mianshan began the cold-food custom." },
      { outlet: "Wikipedia", title: "Tangyuan (food)", url: `${W}Tangyuan_(food)`, summary: "The family of round glutinous-rice cakes to which Vietnam's bánh trôi belongs." },
    ],
    story: { title: "Jie Zitui and the cakes of purity", body: "Jie Zitui, a loyal man of the Spring-and-Autumn state of Jin, kept his integrity and died with his mother in the flames of Mount Mianshan. Grieving, Duke Wen forbade fire on that day — every house had to eat cold food, called Hàn thực. The custom reached Vietnam but was softened into a vegetarian festival: no fire ban remains, only round bánh trôi like the sky and flat bánh chay like the earth offered to the ancestors. In the old quarters people still pass down the line 'the third of the third month — bánh trôi bánh chay' like a sweet appointment of spring." },
  },
  "tet-doan-ngo": {
    sources: [
      { outlet: "Wikipedia", title: "Dragon Boat Festival", url: `${W}Dragon_Boat_Festival`, summary: "The 5th of the 5th lunar month across East Asia — remade in Vietnam as the 'pest-killing festival'." },
      { outlet: "Wikipedia", title: "Qu Yuan", url: `${W}Qu_Yuan`, summary: "The poet-statesman said to have drowned himself on this day — the legend behind the festival." },
      { outlet: "Wikipedia", title: "Traditional Vietnamese medicine", url: `${W}Traditional_Vietnamese_medicine`, summary: "The folk-medicine roots of 'killing the pests' and gathering herbs at noon." },
    ],
    story: { title: "The pest-killing festival", body: "In the old deltas, the turn of the 5th month brought flies, mosquitoes and disease. The ancients had no modern medicine — only experience: sour fruits, glutinous wine, fermented rice and mugwort leaves. At exactly noon on the 5th of the 5th month, the whole family ate sour things before the meal — a shared act of protection for the whole people. The old Hanoi saying 'Hanoi cannot be hurried' is often told of this festival: families prepared trays of lychee, plum and golden-flower sticky-rice wine from early morning. The pest-killing festival is therefore not superstition but folk wisdom for summer health — and a day for children to ask after their parents' health." },
  },
  "ngay-thay-thuoc": {
    sources: [
      { outlet: "Wikipedia", title: "National Doctors' Day", url: `${W}National_Doctors%27_Day`, summary: "The days nations set aside to honor their physicians — Vietnam's falls on February 27." },
      { outlet: "Wikipedia", title: "Traditional Vietnamese medicine", url: `${W}Traditional_Vietnamese_medicine`, summary: "The medical tradition Vietnamese healers inherit alongside modern medicine." },
      { outlet: "Wikipedia", title: "Physician", url: `${W}Physician`, summary: "The profession February 27 honors — demanding both knowledge and a mother's heart." },
    ],
    story: { title: "A good physician, a loving mother", body: "Hồ Chí Minh's letter to health workers of February 27, 1955 ran only a few dozen lines but carried a standard beyond its time: 'lương y như từ mẫu' — a good physician must love patients as a mother loves her child. Since then February 27 has belonged to the people in white coats: surgeons on night duty, nurses bringing medicine to the bedside, mountain doctors walking a whole day to reach a village. Each year hospitals exchange bouquets and letters of thanks — and a quiet profession is spoken by name." },
  },
  "ngay-bao-chi": {
    sources: [
      { outlet: "Wikipedia", title: "Mass media in Vietnam", url: `${W}Mass_media_in_Vietnam`, summary: "The history of the Vietnamese press — from the 1925 Thanh Niên paper to today's multimedia newsrooms." },
      { outlet: "Wikipedia", title: "World Press Freedom Day", url: `${W}World_Press_Freedom_Day`, summary: "The UN's May 3 reminder of the press's role in society — a companion to Vietnam's own June 21." },
      { outlet: "Wikipedia", title: "Journalism", url: `${W}Journalism`, summary: "The craft honored on June 21 — recording truth and carrying the people's voice." },
    ],
    story: { title: "The newspaper born in Guangzhou", body: "In 1925, in a small room in Guangzhou, Nguyễn Ái Quốc and his comrades printed the first issue of Thanh Niên — Vietnam's first revolutionary newspaper. Thin roneo sheets and an old press, yet the words raced home faster than any battlefield news. From then on, Vietnamese journalism crossed the war years with Cứu Quốc and the renovation era with online papers — and it remains the profession of running faster than others to tell the people the truth. Every June 21, journalists remember that day of beginnings." },
  },
  "nguoi-cao-tuoi": {
    sources: [
      { outlet: "Wikipedia", title: "International Day of Older Persons", url: `${W}International_Day_of_Older_Persons`, summary: "October 1 — chosen by the UN in 1991 and marked by Vietnam as its own day for the elderly." },
      { outlet: "Wikipedia", title: "Old age", url: `${W}Old_age`, summary: "The season of life October 1 honors — and the care societies owe it." },
      { outlet: "Wikipedia", title: "Vietnamese people", url: `${W}Vietnamese_people`, summary: "The 'respect the old, receive long life' ethic woven through Vietnamese family life." },
    ],
    story: { title: "The silver hair of the village", body: "In the countryside, an 80-year-old grandfather still sits on the porch telling stories of the bombing years; a grandmother still remembers the planting seasons of three generations. The old are not only people to be cared for — they are the living library of the family and the village. When the UN chose October 1 as the day for older persons, Vietnam met again a core part of itself: 'respect the old, receive long life' was already the ethic of every longevity feast at 70, 80, 90. On that day, one phone call home — 'have you eaten, grandmother?' — is enough to keep the tradition." },
  },
  "doanh-nhan": {
    sources: [
      { outlet: "Wikipedia", title: "Entrepreneurship", url: `${W}Entrepreneurship`, summary: "The spirit October 13 honors — daring to begin, and creating work for others." },
      { outlet: "Wikipedia", title: "Economy of Vietnam", url: `${W}Economy_of_Vietnam`, summary: "The economy that Vietnam's entrepreneurs have built since the Đổi Mới reforms." },
      { outlet: "Wikipedia", title: "Đổi Mới", url: `${W}%C4%90%E1%BB%95i_M%E1%BB%9Bi`, summary: "The 1986 reforms that first recognized entrepreneurs as a force of the nation." },
    ],
    story: { title: "Those who dare to begin", body: "In 2004 the state chose October 13 as a day of its own for entrepreneurs — the first time in history that the trading profession was recognized as nation-building work. From a small alley café to an exporting tech company, every Vietnamese entrepreneur carries a story of beginning: some left state jobs in the renovation years, some started in a student rented room. Entrepreneurs' Day reminds us that commerce is not only money — it is jobs for hundreds of families, trust on every invoice, and the courage to be responsible for a whole team." },
  },
};
