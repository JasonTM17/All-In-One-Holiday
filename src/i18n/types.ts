import type { HolidayCategory } from "@/data/categories";

/** Supported site locales. VI stays at the site root; EN lives under /en/. */
export type Locale = "vi" | "en";

/**
 * Every user-facing UI string that is not holiday content itself.
 * One object per locale; components pick their slice via getStrings(locale).
 * Strings needing interpolation are small functions so call sites stay
 * type-safe and free of string concatenation.
 */
export interface Messages {
  /** Site chrome (layout metadata + skip link). */
  meta: {
    titleDefault: string;
    /** Title template containing a single "%s" placeholder. */
    titleTemplate: string;
    description: string;
    ogLocale: string;
    skipToContent: string;
    notFoundTitle: string;
    notFoundBack: string;
    notFoundSuggest: string;
  };
  /** Sticky header navigation + controls. */
  nav: {
    ariaMain: string;
    allHolidays: string;
    calendar: string;
    cardCta: string;
    search: string;
    themeToDark: string;
    themeToLight: string;
    installApp: string;
    /** aria-label for the VI|EN language switch. */
    langSwitch: string;
  };
  footer: {
    tagline: string;
    featured: string;
    featuredAria: string;
    explore: string;
    exploreAria: string;
    home: string;
    allHolidays: string;
    credits: string;
    calendar: string;
    cardMaker: string;
    birthday: string;
    accessibility: string;
    feed: string;
    disclaimer: string;
  };
  countdown: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    today: string;
    /** Screen-reader summary: "Còn X ngày Y giờ nữa" / "X days, Y hours left". */
    srLeft: (days: number, hours: number) => string;
  };
  /** Holiday grid filter chips + "N ngày nữa" labels. */
  grid: {
    filterAria: string;
    all: string;
    categories: Record<HolidayCategory, string>;
    today: string;
    daysLeft: (n: number) => string;
  };
  hero: {
    nextHoliday: string;
    viewDetails: string;
  };
  /** Sections and labels on a holiday page. */
  holiday: {
    countdown: string;
    origin: string;
    meaningCaption: string;
    traditions: string;
    deepEyebrow: string;
    deepTitle: (name: string) => string;
    customs: string;
    cuisine: string;
    facts: string;
    lessons: string;
    wishes: string;
    wishSuggest: string;
    gifts: string;
    images: string;
    related: string;
    toc: string;
    toTop: string;
    readTime: (m: number) => string;
    storyEyebrow: string;
    readMore: string;
    faqTitle: string;
    othersAria: string;
    prev: string;
    next: string;
    heroAlt: (name: string) => string;
    galleryAlt: (name: string, n: number) => string;
    /** aria-label on a photo trigger that opens the lightbox. */
    viewPhoto: (name: string) => string;
    /** aria-label on the lightbox close button and backdrop. */
    closePhoto: string;
    /** aria-label on the lightbox previous/next buttons. */
    prevPhoto: string;
    nextPhoto: string;
    /** "Photo n of total" counter template shown in the lightbox. */
    photoOf: string;
    /** Eyebrow labels for signature sections by kind. */
    signatureSteps: string;
    signatureMeanings: string;
    signatureTimeline: string;
    signatureLegend: string;
    /** Heading for the attributed-quotes section. */
    quoteTitle: string;
    /** sr-only text naming the nearest occurrence date. */
    nearest: (date: string) => string;
  };
  actions: {
    share: string;
    copiedLink: string;
    addToCalendar: string;
  };
  copy: {
    copy: string;
    copied: string;
    copyLink: string;
  };
  wishGen: {
    tones: { trong: string; vui: string; "lang-man": string; "gui-me": string; "gui-co": string };
    /** Wish template per tone; {name}, {holiday} and {rel} are substituted. */
    templates: { trong: string; vui: string; "lang-man": string; "gui-me": string; "gui-co": string };
    /** Fallback recipient name per tone when the field is left empty. */
    fallbackName: { trong: string; vui: string; "lang-man": string; "gui-me": string; "gui-co": string };
    /** Fallback relationship per tone when the field is left empty. */
    fallbackRel: { trong: string; vui: string; "lang-man": string; "gui-me": string; "gui-co": string };
    nameLabel: string;
    namePlaceholder: string;
    relLabel: string;
    relPlaceholder: string;
    sendToCard: string;
  };
  /** Home page copy. */
  home: {
    eyebrow: string;
    h1: string;
    intro: string;
    ctaHolidays: string;
    ctaBirthday: string;
    stats: [string, string, string]; // holidays, wishes, traditions
    toolsAria: string;
    tools: { t: string; d: string }[]; // lich, thiep, birthday
    sceneryEyebrow: string;
    sceneryH2: string;
    sceneryCaptions: string[];
    womenEyebrow: string;
    womenH2: string;
    next90Eyebrow: string;
    next90H2: string;
    gridH2: string;
    gridIntro: string;
    birthdayH2: string;
    birthdayIntro: string;
    birthdayCta: string;
  };
  /** /lich/ calendar tool. */
  calendar: {
    eyebrow: string;
    h1: string;
    intro: string;
    metaTitle: string;
    metaDescription: string;
    prevMonth: string;
    nextMonth: string;
    today: string;
    subscribe: string;
    subscribeWebcal: string;
    filterAria: string;
    monthTitle: (month: number, year: number) => string;
    gridAria: (month: number, year: number) => string;
    agendaAria: string;
    noHolidays: string;
    /** Short weekday column headers, Sunday first. */
    weekdays: string[];
    /** Abbreviation appended to lunar dates inside day cells. */
    lunarAbbr: string;
    all: string;
    categories: Record<HolidayCategory, string>;
  };
  /** /thiep/ card maker. */
  thiep: {
    eyebrow: string;
    h1: string;
    intro: string;
    metaTitle: string;
    metaDescription: string;
    holidayLabel: string;
    styleLabel: string;
    templates: string[]; // 6 template names, same order as TEMPLATES
    toLabel: string;
    fromLabel: string;
    msgLabel: string;
    pickWishLabel: string;
    chooseWish: string;
    download: string;
    share: string;
    copiedLink: string;
    fontsLoading: string;
    shareTitle: (name: string) => string;
  };
  /** /birthday/ personalized card. */
  birthday: {
    h1: string;
    metaTitle: string;
    metaDescription: string;
    cardAria: string;
    happyBirthday: string;
    turnsToday: (name: string, age: number) => string;
    todayNoAge: (name: string) => string;
    turnsOn: (age: number, date: string) => string;
    /** Birthday date line when no birth year is given: "Sinh nhật sắp tới — <date>". */
    nextOn: (date: string) => string;
    /** Dual-date line for lunar birthdays: "âm 15/8 — dương <date>". */
    lunarLine: (day: number, month: number, date: string) => string;
    daysLeft: (days: number) => string;
    fromSender: (from: string) => string;
    shareCard: string;
    copyLink: string;
    printCard: string;
    makeAnother: string;
    nameLabel: string;
    dateLabel: string;
    calLegend: string;
    calSolar: string;
    calLunar: string;
    lmonthLabel: string;
    ldayLabel: string;
    lyearLabel: string;
    msgLabel: string;
    fromLabel: string;
    themeLegend: string;
    themes: string[]; // 4 theme names, same order as THEMES
    submit: string;
    errName: string;
    errDate: string;
    errLunar: string;
    shareTitle: (name: string) => string;
    shareText: (name: string) => string;
  };
  /** Command palette (Ctrl+K). */
  search: {
    dialogAria: string;
    placeholder: string;
    empty: (q: string) => string;
    hint: string;
    footer: string;
    /** "khớp lời chúc" style match qualifiers for why-tags. */
    whyWish: string;
    whyDate: string;
  };
  /** /credits/ image attribution page. */
  credits: {
    eyebrow: string;
    h1: string;
    intro: string;
    metaTitle: string;
    metaDescription: string;
    homeLabel: string;
    birthdayLabel: string;
  };
  /** /accessibility/ statement page. */
  a11y: {
    eyebrow: string;
    h1: string;
    intro: string;
    metaTitle: string;
    metaDescription: string;
    intentTitle: string;
    intentText: string;
    doTitle: string;
    doItems: string[];
    limitsTitle: string;
    limitItems: string[];
    feedbackTitle: string;
    feedbackText: string;
    feedbackCta: string;
  };
}
