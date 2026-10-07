/* ------------------------------------------------------------------ */
/*  THE TRINITY — all content + theme config lives here.               */
/*  Stats as of October 2026 (assists vary Opta vs club).              */
/* ------------------------------------------------------------------ */

export type PlayerId = "messi" | "ronaldo" | "neymar";
export type ThemeId = PlayerId | "landing";
export type ParticleKind = "dust" | "embers" | "confetti" | "stardust";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  glow: string;
}

export interface ThemeConfig {
  id: ThemeId;
  /** Shown in the nav — the site literally renames itself per legend. */
  siteName: string;
  tagline: string;
  colors: ThemeColors;
  /** CSS font-family stack for display type. */
  fontFamily: string;
  particles: ParticleKind;
  preloaderNumber: number;
  marquee: string[];
  music: { title: string; url: string };
  confettiColors: string[];
}

export interface ClubStat {
  club: string;
  years: string;
  apps: number;
  goals: number;
  assists: number;
  trophies: number;
}

export interface TimelineEvent {
  year: string;
  title: string;
  text: string;
}

export interface Moment {
  title: string;
  text: string;
  /** Always-safe YouTube search URL so links never 404. */
  youtube: string;
}

export interface Quote {
  text: string;
  author: string;
  context?: string;
}

export interface KeyStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface Player {
  id: PlayerId;
  name: string;
  fullName: string;
  nickname: string;
  heroTitle: string;
  heroSubtitle: string;
  image: string;
  imageAlt: string;
  bgImage: string;
  totals: { apps: number; goals: number; assists: number; trophies: number };
  keyStats: KeyStat[];
  origins: {
    act: string;
    paragraphs: string[];
    facts: { label: string; value: string }[];
  };
  journey: { act: string; intro: string; clubs: ClubStat[]; peaks: { season: string; text: string }[] };
  timeline: { act: string; intro: string; events: TimelineEvent[] };
  moments: { act: string; intro: string; items: Moment[] };
  records: { label: string; value: string }[];
  quotes: Quote[];
  voices: Quote[];
  legacy: {
    act: string;
    trophies: { name: string; count: number }[];
    impact: string;
    whatIf: string;
  };
}

/* ------------------------------- THEMES ------------------------------- */

export const THEMES: Record<ThemeId, ThemeConfig> = {
  landing: {
    id: "landing",
    siteName: "THE TRINITY",
    tagline: "Father · Son · Holy Spirit of the beautiful game",
    colors: {
      primary: "#FFD700",
      secondary: "#8b8b9e",
      accent: "#FFDF00",
      bg: "#07070d",
      glow: "rgba(255,215,0,0.35)",
    },
    fontFamily: "var(--font-inter)",
    particles: "stardust",
    preloaderNumber: 3,
    marquee: ["THE TRINITY", "CHOOSE YOUR LEGEND", "MESSI · RONALDO · NEYMAR", "THE HOLY TRINITY OF FOOTBALL"],
    music: { title: "Trinity Overture (placeholder)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
    confettiColors: ["#75AADB", "#DA291C", "#FFDF00", "#FFD700", "#ffffff"],
  },
  messi: {
    id: "messi",
    siteName: "LA PULGA — The Flea's Tale",
    tagline: "Genius doesn't shout",
    colors: {
      primary: "#75AADB",
      secondary: "#dfe9f5",
      accent: "#FFD700",
      bg: "#0A1931",
      glow: "rgba(117,170,219,0.45)",
    },
    fontFamily: "var(--font-playfair)",
    particles: "dust",
    preloaderNumber: 10,
    marquee: ["LA PULGA", "THE FLEA", "GENIUS DOESN'T SHOUT", "ROSARIO · BARCELONA · MIAMI", "91 GOALS · ONE YEAR"],
    music: { title: "Encara Messi — stadium hymn (placeholder)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    confettiColors: ["#75AADB", "#FFD700", "#ffffff", "#bfe0ff"],
  },
  ronaldo: {
    id: "ronaldo",
    siteName: "SIUUU — The Champion's Code",
    tagline: "Hard work beats talent",
    colors: {
      primary: "#DA291C",
      secondary: "#c8ccd4",
      accent: "#FFDE00",
      bg: "#0B0B0E",
      glow: "rgba(218,41,28,0.55)",
    },
    fontFamily: "var(--font-bebas)",
    particles: "embers",
    preloaderNumber: 7,
    marquee: ["SIUUU", "CR7", "HARD WORK BEATS TALENT", "THE ROAD TO 1000", "MADEIRA · MADRID · RIYADH"],
    music: { title: "The Champion — epic orchestral (placeholder)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    confettiColors: ["#DA291C", "#FFDE00", "#c8ccd4", "#ffffff"],
  },
  neymar: {
    id: "neymar",
    siteName: "JOGA BONITO — The Samba Prince",
    tagline: "Play to make people happy",
    colors: {
      primary: "#FFDF00",
      secondary: "#c9ffe9",
      accent: "#00D1A1",
      bg: "#04180F",
      glow: "rgba(0,209,161,0.4)",
    },
    fontFamily: "var(--font-fredoka)",
    particles: "confetti",
    preloaderNumber: 10,
    marquee: ["JOGA BONITO", "THE SAMBA PRINCE", "MENINOS DA VILA", "PLAY TO MAKE PEOPLE HAPPY", "SANTOS · MSN · PARIS"],
    music: { title: "Samba Funk — carnival session (placeholder)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    confettiColors: ["#FFDF00", "#009C3B", "#00D1A1", "#ff6fa5", "#ffffff"],
  },
};

/* ------------------------------- PLAYERS ------------------------------ */

const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

export const PLAYERS: Record<PlayerId, Player> = {
  messi: {
    id: "messi",
    name: "MESSI",
    fullName: "Lionel Andrés Messi",
    nickname: "La Pulga — The Flea",
    heroTitle: "THE FLEA",
    heroSubtitle: "Genius doesn't shout",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lionel_Messi_NE_Revolution_Inter_Miami_7.9.25-178.jpg?width=900",
    imageAlt: "Lionel Messi playing for Inter Miami (Wikimedia Commons, CC BY-SA)",
    bgImage: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1920&auto=format&fit=crop",
    totals: { apps: 1174, goals: 930, assists: 425, trophies: 46 },
    keyStats: [
      { label: "Career Goals", value: 930 },
      { label: "Ballon d'Or", value: 8 },
      { label: "World Cup", value: 2022, suffix: " ★" },
    ],
    origins: {
      act: "I. The Boy from Rosario",
      paragraphs: [
        "Born 24 June 1987 in Rosario, Argentina, Lionel Messi was kicking a ball almost before he could walk. At five he joined Grandoli, coached by his father Jorge; at eight, Newell's Old Boys — where he scored nearly 240 goals for the youth sides and earned a nickname that would follow him forever: La Pulga, The Flea. Small, impossible to catch, always stinging.",
        "Then came the diagnosis: growth hormone deficiency. Treatment cost roughly $1,000 a month — money the family didn't have. FC Barcelona offered what no one else would: a contract (famously sketched on a napkin), the medical care, and a place at La Masia. At thirteen, Messi boarded a plane to Catalonia with his father and a bag full of homesickness.",
        "He grew — into the shoes he'd always belonged in. Youth coaches remember a quiet kid who never spoke in the dressing room and said everything on the grass: slaloming past entire teams, scoring at will, and learning the Barcelona religion of the ball while Rosario taught him the street.",
      ],
      facts: [
        { label: "First senior game", value: "16 Oct 2004 — vs Espanyol, aged 17" },
        { label: "First senior goal", value: "1 May 2005 — vs Albacete (lob, Ronaldinho assist)" },
        { label: "Youth stations", value: "Grandoli → Newell's (~240 goals) → La Masia" },
        { label: "The napkin", value: "First Barça contract signed on a napkin, Dec 2000" },
      ],
    },
    journey: {
      act: "II. La Masia Dreams",
      intro:
        "Twenty-one seasons, four shirts, one constant: the ball glued to his left foot. Every club became his stage — Barcelona his cathedral, Paris his interlude, Miami his sunset, Argentina his destiny.",
      clubs: [
        { club: "FC Barcelona", years: "2004 – 2021", apps: 778, goals: 672, assists: 269, trophies: 35 },
        { club: "Paris Saint-Germain", years: "2021 – 2023", apps: 75, goals: 32, assists: 34, trophies: 3 },
        { club: "Inter Miami", years: "2023 – now", apps: 117, goals: 102, assists: 56, trophies: 2 },
        { club: "Argentina", years: "2005 – 2026", apps: 207, goals: 125, assists: 65, trophies: 6 },
      ],
      peaks: [
        { season: "2011/12 — 73G + 30A in 60 games", text: "The most devastating club season ever played. Fifty La Liga goals, fourteen in Europe, five against Leverkusen in one night." },
        { season: "2012 — 91 calendar goals", text: "A record that may outlive the sport itself. Gerd Müller's 85 fell in December; Messi simply kept scoring." },
        { season: "2022 — World Cup coronation", text: "Seven goals, three assists, Player of the Tournament, two in the final. The last argument ended in Doha." },
      ],
    },
    timeline: {
      act: "III. The God of Barcelona",
      intro: "A career told in miracles — from a 17-year-old substitute to the king of the 2022 final.",
      events: [
        { year: "2000", title: "The napkin", text: "Barcelona signs a 13-year-old Messi — on a napkin — agreeing to pay his growth-hormone treatment." },
        { year: "2004", title: "The debut", text: "16 October, vs Espanyol. The youngest Barça debutant in La Liga history at the time." },
        { year: "2005", title: "The first goal", text: "A delicate lob over Albacete after a Ronaldinho assist. The master hands the apprentice the torch." },
        { year: "2007", title: "Getafe solo", text: "Picks up the ball in his own half and dribbles the entire Getafe team — Maradona's 1986 goal, reborn in a Flea." },
        { year: "2009", title: "The Sextuple", text: "Six trophies in one year under Guardiola, capped by the header in Rome no one saw coming from a 5'7\" man." },
        { year: "2012", title: "91 goals", text: "The impossible year: 91 goals in a calendar year. Five in one game vs Leverkusen along the way." },
        { year: "2017", title: "The Remontada + Bernabéu", text: "Architects the 6–1 miracle vs PSG, then silences the Bernabéu with a 93rd-minute winner and that shirt held high." },
        { year: "2021", title: "Finally, Argentina", text: "Copa América at the Maracanã. The tears, the monkey off the back — a nation exhales." },
        { year: "2022", title: "The crown", text: "World Cup in Qatar. Two goals in the greatest final ever played (3–3 vs France). Complete." },
        { year: "2023 →", title: "Miami Sunset", text: "Inter Miami: sold-out stadiums, Leagues Cup glory, and football's greatest teacher enjoying the game like a kid in Rosario again." },
      ],
    },
    moments: {
      act: "IV. Miami Sunset",
      intro: "Nights that bent physics — and the evenings that completed him.",
      items: [
        { title: "The Getafe Slalom (2007)", text: "Sixty metres, seven defenders, one small genius. Twenty years old and already painting.", youtube: yt("messi getafe solo goal 2007 full") },
        { title: "Five vs Leverkusen (2012)", text: "First player ever to score five in a Champions League game. The record books needed a new page overnight.", youtube: yt("messi 5 goals leverkusen 2012") },
        { title: "Bernabéu 93' (2017)", text: "El Clásico, 2–2, dying seconds — Messi strokes home the winner and holds his shirt to 80,000 silenced Madridistas.", youtube: yt("messi bernabeu winner 2017 last minute celebration") },
        { title: "The 2022 Final (2 goals vs France)", text: "Two goals, a shootout, and the trophy lift in Doha. The single greatest individual World Cup ever.", youtube: yt("messi world cup final 2022 highlights goals") },
      ],
    },
    records: [
      { label: "Ballon d'Or titles", value: "8 — most ever" },
      { label: "Goals in a calendar year", value: "91 (2012)" },
      { label: "Goals in a La Liga season", value: "50 (2011/12)" },
      { label: "Most goals for one club", value: "672 for Barcelona" },
      { label: "Argentina caps / goals", value: "207 / 125" },
      { label: "Major trophies", value: "46 — most in history" },
    ],
    quotes: [
      { text: "You have to fight to reach your dream. You have to sacrifice and work hard for it.", author: "Lionel Messi" },
      { text: "I prefer to win titles with the team ahead of individual awards.", author: "Lionel Messi" },
      { text: "I never think about the play or visualize. I do it by instinct.", author: "Lionel Messi" },
    ],
    voices: [
      { text: "Don't write about him, don't try to describe him. Just watch him.", author: "Pep Guardiola", context: "former Barcelona coach" },
      { text: "He is the best player of all time — by a distance.", author: "Gary Lineker", context: "pundit" },
      { text: "Messi is a joke. The best ever. The best in the world? He could play for Mars!", author: "Wayne Rooney", context: "England legend" },
    ],
    legacy: {
      act: "V. Legacy",
      trophies: [
        { name: "World Cup", count: 1 },
        { name: "Copa América", count: 2 },
        { name: "Champions League", count: 4 },
        { name: "La Liga", count: 10 },
        { name: "Ballon d'Or", count: 8 },
        { name: "European Golden Shoe", count: 6 },
      ],
      impact:
        "Messi ended the greatest debate in sport — not with words, but with Doha. He turned playmaking into an art form, made 91 goals in a year feel inevitable, and carried the humility of Rosario through every coronation. An entire generation of kids doesn't dribble past cones — they dribble past ghosts, pretending the ball is glued to their left foot.",
      whatIf:
        "What if the napkin had never been signed? What if Rosario's doctors had found the money at home? Football's butterfly effect: one untreated growth condition away from losing its greatest artist. Instead, the Flea grew — and the game grew with him.",
    },
  },

  ronaldo: {
    id: "ronaldo",
    name: "RONALDO",
    fullName: "Cristiano Ronaldo dos Santos Aveiro",
    nickname: "CR7 — The Champion",
    heroTitle: "THE CHAMPION",
    heroSubtitle: "Hard work beats talent",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cristiano_Ronaldo_Madrid.jpg?width=900",
    imageAlt: "Cristiano Ronaldo playing for Real Madrid (Wikimedia Commons, CC BY-SA)",
    bgImage: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=1920&auto=format&fit=crop",
    totals: { apps: 1338, goals: 979, assists: 291, trophies: 35 },
    keyStats: [
      { label: "Career Goals", value: 979, suffix: " →1000" },
      { label: "UCL Goals", value: 140, suffix: " ✦" },
      { label: "Portugal Goals", value: 146, suffix: " ✦" },
    ],
    origins: {
      act: "I. Madeira Hunger",
      paragraphs: [
        "Born 5 February 1985 in Funchal, Madeira, Cristiano Ronaldo grew up in a tin-roofed house with football as the only way out. At Andorinha, where his father was kit man, then Nacional, coaches saw a skinny kid with an absurd engine — and a hunger that bordered on fury.",
        "Sporting CP's academy polished the diamond: at 17 he was tormenting Manchester United in a friendly so badly that United's players begged Ferguson to sign him on the flight home. Days later he was a Red Devil, handed the sacred No. 7 shirt — and told to fill it.",
        "What followed was the most ruthless self-sculpting project in sports history: a boy turned into a machine through thousands of extra training hours, until talent had no choice but to bow to work.",
      ],
      facts: [
        { label: "First senior game", value: "14 Aug 2002 — Sporting vs Inter (UCL qualifier)" },
        { label: "First senior goals", value: "7 Oct 2002 — brace vs Moreirense" },
        { label: "Youth stations", value: "Andorinha → Nacional → Sporting Academy" },
        { label: "The United friendly", value: "Tormented Man Utd in 2003; signed days later for ~£12.24M" },
      ],
    },
    journey: {
      act: "II. Manchester Rise",
      intro:
        "Six clubs, one creed: score, win, repeat. From Madeira to Manchester to the throne of Madrid — 979 goals and counting, with 1000 in the crosshairs.",
      clubs: [
        { club: "Sporting CP", years: "2002 – 2003", apps: 31, goals: 5, assists: 6, trophies: 1 },
        { club: "Manchester United", years: "2003 – 2009", apps: 292, goals: 118, assists: 69, trophies: 9 },
        { club: "Real Madrid", years: "2009 – 2018", apps: 438, goals: 450, assists: 131, trophies: 16 },
        { club: "Juventus", years: "2018 – 2021", apps: 134, goals: 101, assists: 22, trophies: 5 },
        { club: "Manchester United", years: "2021 – 2022", apps: 54, goals: 27, assists: 5, trophies: 0 },
        { club: "Al Nassr", years: "2023 – now", apps: 155, goals: 132, assists: 23, trophies: 1 },
        { club: "Portugal", years: "2003 – 2026", apps: 234, goals: 146, assists: 35, trophies: 2 },
      ],
      peaks: [
        { season: "2014/15 — 61 goals", text: "Peak athletic destruction: 48 league goals, a five-goal game vs Granada, and a Pichichi on pure violence." },
        { season: "2013–2018 — the three-peat engine", text: "Three straight Champions Leagues with Madrid, UCL top scorer every single season along the way." },
        { season: "2024 — 900 goals", text: "The first human to 900 official goals. The thousandth is not a dream; it's a calendar entry." },
      ],
    },
    timeline: {
      act: "III. Galactico Era",
      intro: "The relentless march — every record sighted, hunted, broken.",
      events: [
        { year: "2002", title: "Hello, Sporting", text: "Senior debut at 17 vs Inter; first goals — a brace — vs Moreirense that October." },
        { year: "2003", title: "The No. 7", text: "Signs for Manchester United. Stepovers, tears, triumph — Ferguson forges the mentality monster." },
        { year: "2008", title: "First Ballon d'Or", text: "Champions League winner with THAT headerless final campaign — 8 goals, European crown, first Ballon d'Or." },
        { year: "2009", title: "£80M Galáctico", text: "World-record move to Real Madrid. 80,000 people greet him at the Bernabéu." },
        { year: "2014", title: "La Décima", text: "Scores in the final as Madrid win their 10th European Cup; 17 goals in that single UCL campaign — a record." },
        { year: "2016", title: "Euro champion", text: "Drags Portugal to Euro 2016 glory — then coaches the final from the touchline, injured, screaming." },
        { year: "2018", title: "The bicycle", text: "3 April, vs Juventus: an overhead kick so perfect Turin gave him a standing ovation. Then THAT game vs Spain: a hat-trick (15 June)." },
        { year: "2019", title: "The Atlético hat-trick", text: "12 March: single-handedly overturns a 2–0 deficit vs Atlético. 'This is Juventus' — no, this is Ronaldo." },
        { year: "2022", title: "The 6th World Cup", text: "First man ever to score at SIX World Cups. Longevity as a weapon." },
        { year: "2023 →", title: "Road to 1000", text: "Al Nassr's Riyadh nights: 132 goals and counting. 979 down, 21 to history. SIUUU." },
      ],
    },
    moments: {
      act: "IV. Juve & Return",
      intro: "Goals that froze stadiums — and one that made an entire enemy crowd applaud.",
      items: [
        { title: "The Bicycle vs Juve (2018)", text: "Two metres in the air, perfectly horizontal, top corner. Buffon just watched. Turin stood and clapped.", youtube: yt("ronaldo bicycle kick juventus 2018 full") },
        { title: "Hat-trick vs Spain (2018)", text: "World Cup opener, 88th minute, 25-yard free-kick, top bins. One of the great single-game carries.", youtube: yt("ronaldo hat trick spain world cup 2018 free kick") },
        { title: "Hat-trick vs Atlético (2019)", text: "Juventus down 2–0, season on the line — Ronaldo scores all three. Header, header, penalty. Ice.", youtube: yt("ronaldo hat trick atletico madrid 2019 juventus comeback") },
        { title: "SIUUU vs ...everyone", text: "66 career hat-tricks, 140 UCL goals, 146 for Portugal. The celebration heard on every continent.", youtube: yt("cristiano ronaldo best goals real madrid compilation") },
      ],
    },
    records: [
      { label: "Official career goals", value: "979 — chasing 1000" },
      { label: "Champions League goals", value: "140 — all-time record" },
      { label: "International goals / caps", value: "146 / 234 — both world records" },
      { label: "Ballon d'Or titles", value: "5" },
      { label: "Career hat-tricks", value: "66" },
      { label: "World Cups scored at", value: "6 — first ever" },
    ],
    quotes: [
      { text: "Your love makes me strong, your hate makes me unstoppable.", author: "Cristiano Ronaldo" },
      { text: "I'm not a perfectionist, but I like to feel that things are done well. More than that, I feel an endless need to learn.", author: "Cristiano Ronaldo" },
      { text: "Hard work will always overcome natural talent when natural talent does not work hard enough.", author: "Cristiano Ronaldo" },
    ],
    voices: [
      { text: "He is the best player I ever coached. He surpassed all the others.", author: "Sir Alex Ferguson", context: "former Manchester United manager" },
      { text: "Cristiano is the most professional player I have ever seen. He lives for football.", author: "Carlo Ancelotti", context: "Real Madrid coach" },
      { text: "The numbers speak for him. Scoring 450 goals for one club is inhuman.", author: "Zinedine Zidane", context: "former Real Madrid coach" },
    ],
    legacy: {
      act: "V. Legacy",
      trophies: [
        { name: "European Championship", count: 1 },
        { name: "Champions League", count: 5 },
        { name: "League titles (ENG/ESP/ITA)", count: 7 },
        { name: "Ballon d'Or", count: 5 },
        { name: "European Golden Shoe", count: 4 },
        { name: "Club World Cup", count: 4 },
      ],
      impact:
        "Ronaldo industrialised greatness. He proved that willpower is a skill — that headers, free-kicks, both feet and big-game nerves can all be manufactured through obsession. A generation now trains like professionals at twelve because one boy from Madeira refused to accept a ceiling. 1000 goals isn't a fantasy; it's accounting.",
      whatIf:
        "What if Ferguson had never taken that flight home from Lisbon? What if the Madeira kid had settled for talent alone? The scariest thought in football history: Cristiano Ronaldo was never the most gifted — and became the most inevitable anyway.",
    },
  },

  neymar: {
    id: "neymar",
    name: "NEYMAR",
    fullName: "Neymar da Silva Santos Júnior",
    nickname: "The Samba Prince",
    heroTitle: "THE SAMBA PRINCE",
    heroSubtitle: "Play to make people happy",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Neymar_at_2026_FIFA_World_Cup_by_YantsImages.jpg?width=900",
    imageAlt: "Neymar at the 2026 FIFA World Cup (Wikimedia Commons, CC BY-SA)",
    bgImage: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1920&auto=format&fit=crop",
    totals: { apps: 773, goals: 459, assists: 283, trophies: 28 },
    keyStats: [
      { label: "Career Goals", value: 459 },
      { label: "Brazil Goals", value: 80, suffix: " ✦" },
      { label: "Record Transfer", value: 222, suffix: "M €" },
    ],
    origins: {
      act: "I. Meninos da Vila",
      paragraphs: [
        "Born 5 February 1992 in Mogi das Cruzes, São Paulo, Neymar inherited the ball from his father — a former footballer who became his first coach, manager and shield. At Portuguesa Santista and then Santos' famed academy, he was pure street football distilled: elasticos, rainbow flicks, and a grin that never left.",
        "He debuted for Santos at seventeen and turned the Vila Belmiro into a weekly carnival. By nineteen he'd won the Copa Libertadores and the Puskás Award in the same breath — a boy playing football the way music sounds.",
        "Brazil had been waiting for its next joy-bringer since Ronaldinho. In Neymar, the Menino da Vila, the samba finally had a new prince.",
      ],
      facts: [
        { label: "First senior game", value: "7 Mar 2009 — Santos vs Oeste" },
        { label: "First senior goal", value: "15 Mar 2009 — Santos vs Mogi Mirim" },
        { label: "Youth stations", value: "Portuguesa Santista → Santos Academy" },
        { label: "The breakout", value: "Libertadores 2011 + Puskás 2011 (vs Flamengo)" },
      ],
    },
    journey: {
      act: "II. MSN — The Dream Trio",
      intro:
        "From the Vila to the world: the €222M man, one third of the greatest trio ever assembled, and Brazil's eternal No. 10 — a career of joy, pain and comebacks.",
      clubs: [
        { club: "Santos", years: "2009 – 2013", apps: 225, goals: 136, assists: 64, trophies: 6 },
        { club: "FC Barcelona", years: "2013 – 2017", apps: 186, goals: 105, assists: 76, trophies: 9 },
        { club: "Paris Saint-Germain", years: "2017 – 2023", apps: 173, goals: 118, assists: 69, trophies: 13 },
        { club: "Al Hilal", years: "2023 – 2025", apps: 7, goals: 1, assists: 3, trophies: 1 },
        { club: "Santos (return)", years: "2025 – now", apps: 52, goals: 19, assists: 12, trophies: 0 },
        { club: "Brazil", years: "2010 – 2026", apps: 130, goals: 80, assists: 59, trophies: 2 },
      ],
      peaks: [
        { season: "2014/15 — Treble + MSN 122", text: "One third of the deadliest trio in history: 39 goals and the assist for the UCL final's clincher in Berlin." },
        { season: "2016 — Olympic gold", text: "The winning penalty in the Maracanã shootout vs Germany. A nation's only missing title, delivered by its prince." },
        { season: "2023 — passing Pelé", text: "Two goals vs Bolivia (Sep 2023) take him to 79 Brazil goals — past the King's 77. Immortality, confirmed." },
      ],
    },
    timeline: {
      act: "III. Paris & Pain",
      intro: "The brightest joy and the deepest heartbreak — often in the same season.",
      events: [
        { year: "2009", title: "Menino da Vila", text: "Santos debut at 17 (7 March vs Oeste); first goal eight days later. The carnival begins." },
        { year: "2011", title: "Libertadores + Puskás", text: "Wins South America's crown with Santos, then the Puskás Award for that Flamengo goal. World, meet Neymar." },
        { year: "2013", title: "Barça + Confed Cup", text: "Moves to Barcelona, wins the Confederations Cup with Brazil — Golden Ball, tournament's best." },
        { year: "2014", title: "The vertebra", text: "Zúñiga's knee in the World Cup quarter-final fractures his vertebra. A nation's dream carried off on a stretcher." },
        { year: "2015", title: "The Treble", text: "MSN score 122 goals. Neymar nets in the UCL final vs Juventus. European champion at 23." },
        { year: "2016", title: "Olympic gold", text: "Scores the winning penalty in the Maracanã final shootout vs Germany. Brazil's missing title, found." },
        { year: "2017", title: "Remontada + €222M", text: "8 March: 2 goals + the winning assist in the 6–1 miracle vs PSG. Months later, PSG pay his €222M clause — still the world record." },
        { year: "2018–19", title: "The metatarsals", text: "Two cruel foot fractures, two birthdays in recovery. The body starts billing the brilliance." },
        { year: "2023", title: "ACL + the King passed", text: "Passes Pelé as Brazil's all-time scorer in September — then ruptures his ACL in October. 340 days in the dark." },
        { year: "2025 →", title: "The Comeback", text: "Home to Santos, to the Vila, to joy. 52 games of samba and counting — the prince dances again." },
      ],
    },
    moments: {
      act: "IV. The Comeback",
      intro: "Flicks that broke physics, nights that broke hearts — and the return that healed them.",
      items: [
        { title: "Puskás vs Flamengo (2011)", text: "A slalom through half of Flamengo capped with the coolest of finishes. FIFA's Goal of the Year.", youtube: yt("neymar puskas flamengo 2011 goal") },
        { title: "The Remontada (2017)", text: "6–1 vs PSG: two goals and the assist for Sergi Roberto's winner. Neymar's personal masterpiece of chaos.", youtube: yt("neymar remontada psg 6-1 highlights 2017") },
        { title: "Passing Pelé (2023)", text: "Goals 78 and 79 vs Bolivia. The King applauds from history; the Prince takes Brazil's scoring crown.", youtube: yt("neymar passes pele brazil record goals bolivia") },
        { title: "Olympic Gold Pen (2016)", text: "Maracanã, shootout, sudden death — Neymar steps up and buries it. Gold for Brazil, at last.", youtube: yt("neymar winning penalty olympics 2016 final germany") },
      ],
    },
    records: [
      { label: "Most expensive transfer ever", value: "€222M (2017)" },
      { label: "Brazil all-time top scorer", value: "80 goals (passed Pelé's 77)" },
      { label: "MSN trio season", value: "122 goals (2014/15)" },
      { label: "Assists for Brazil", value: "59 — Seleção record" },
      { label: "Olympic football gold", value: "2016 — winning penalty" },
      { label: "UCL knockout magic", value: "6–1 Remontada icon (2G+1A)" },
    ],
    quotes: [
      { text: "I play to make people happy. That is my football.", author: "Neymar Jr" },
      { text: "I never want to be a hero. I want to be part of the team that wins.", author: "Neymar Jr" },
      { text: "Every time I step on the pitch, I remember the kid from Mogi who just loved the ball.", author: "Neymar Jr" },
    ],
    voices: [
      { text: "Neymar is the best Brazilian player of his generation. His talent is pure joy.", author: "Pelé", context: "Brazilian legend" },
      { text: "He sees passes nobody else sees. Playing with him was a gift.", author: "Lionel Messi", context: "former Barcelona teammate" },
      { text: "When Neymar dances with the ball, defending him is impossible.", author: "Dani Alves", context: "former teammate" },
    ],
    legacy: {
      act: "V. Legacy",
      trophies: [
        { name: "Copa Libertadores", count: 1 },
        { name: "Champions League", count: 1 },
        { name: "Olympic Gold", count: 1 },
        { name: "Confederations Cup", count: 1 },
        { name: "League titles (ESP/FRA)", count: 7 },
        { name: "Domestic cups", count: 12 },
      ],
      impact:
        "Neymar kept the street alive in the age of systems. While football turned to pressing patterns and data, he insisted on the elastico, the rainbow, the grin — proof that joy is a tactic. Brazil's all-time top scorer, the most expensive player ever, and the reason a million kids try the flick before the pass.",
      whatIf:
        "What if the vertebra had held in 2014? What if the metatarsals, the ACL, the hamstrings had spared him? Neymar's career is football's most beautiful 'almost' — and yet: 459 goals, a crown past Pelé, and a game that smiles whenever he touches the ball.",
    },
  },
};

export const PLAYER_ORDER: PlayerId[] = ["messi", "ronaldo", "neymar"];

/* ------------------------------ COMPARISON ----------------------------- */

export interface CompareRow {
  label: string;
  messi: number;
  ronaldo: number;
  neymar: number;
  suffix?: string;
  note?: string;
}

export const COMPARISON: CompareRow[] = [
  { label: "Career goals", messi: 930, ronaldo: 979, neymar: 459 },
  { label: "Career assists", messi: 425, ronaldo: 291, neymar: 283 },
  { label: "Appearances", messi: 1174, ronaldo: 1338, neymar: 773 },
  { label: "Ballon d'Or", messi: 8, ronaldo: 5, neymar: 0 },
  { label: "International goals", messi: 125, ronaldo: 146, neymar: 80 },
  { label: "Major trophies", messi: 46, ronaldo: 35, neymar: 28 },
];

/* --------------------------------- VOTES -------------------------------- */

export const VOTE_SEED: Record<PlayerId, number> = {
  messi: 128430,
  ronaldo: 139215,
  neymar: 84512,
};

export const VOTE_STORAGE_KEY = "trinity-goat-vote-v1";
