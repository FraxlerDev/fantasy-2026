import { readFile, writeFile } from "node:fs/promises";

const known = {
  Ajax: "Аякс",
  Arsenal: "Арсенал",
  "Aston Villa": "Астон Вілла",
  Atalanta: "Аталанта",
  "Athletic Bilbao": "Атлетік Більбао",
  "Atlético Madrid": "Атлетіко Мадрид",
  Barcelona: "Барселона",
  "Bayer Leverkusen": "Баєр Леверкузен",
  "Bayern Munich": "Баварія",
  Benfica: "Бенфіка",
  "Beşiktaş": "Бешикташ",
  Bologna: "Болонья",
  "Borussia Dortmund": "Боруссія Дортмунд",
  "Borussia Mönchengladbach": "Боруссія Менхенгладбах",
  Chelsea: "Челсі",
  "Crystal Palace": "Крістал Пелес",
  Everton: "Евертон",
  "Fenerbahçe": "Фенербахче",
  Feyenoord: "Феєнорд",
  Fiorentina: "Фіорентина",
  Flamengo: "Фламенго",
  Fulham: "Фулгем",
  Galatasaray: "Галатасарай",
  "Inter Milan": "Інтер",
  Juventus: "Ювентус",
  Liverpool: "Ліверпуль",
  Lyon: "Ліон",
  "Manchester City": "Манчестер Сіті",
  "Manchester United": "Манчестер Юнайтед",
  Milan: "Мілан",
  Monaco: "Монако",
  Napoli: "Наполі",
  "Newcastle United": "Ньюкасл Юнайтед",
  Nice: "Ніцца",
  "Nottingham Forest": "Ноттінгем Форест",
  "Paris Saint-Germain": "Парі Сен-Жермен",
  Porto: "Порту",
  "PSV Eindhoven": "ПСВ Ейндговен",
  "RB Leipzig": "РБ Лейпциг",
  "Real Betis": "Реал Бетіс",
  "Real Madrid": "Реал Мадрид",
  "Real Sociedad": "Реал Сосьєдад",
  Roma: "Рома",
  Sevilla: "Севілья",
  "Sporting CP": "Спортінг",
  "Tottenham Hotspur": "Тоттенгем Готспур",
  Valencia: "Валенсія",
  Villarreal: "Вільярреал",
  "West Ham United": "Вест Гем Юнайтед",
  "Wolverhampton Wanderers": "Вулвергемптон",
  "Zenit Saint Petersburg": "Зеніт Санкт-Петербург",
  "Dynamo Makhachkala": "Динамо Махачкала",
  Krasnodar: "Краснодар",
  "Spartak Moscow": "Спартак Москва",
  "Dinamo Zagreb": "Динамо Загреб",
  "Red Star Belgrade": "Црвена Звезда",
  Rijeka: "Рієка",
  "Slaven Belupo": "Славен Белупо",
  "Viktoria Plzeň": "Вікторія Пльзень",
  "Birmingham City": "Бірмінгем Сіті",
  "Brighton & Hove Albion": "Брайтон енд Гоув Альбіон",
  Brentford: "Брентфорд",
  Bournemouth: "Борнмут",
  Burnley: "Бернлі",
  "Leeds United": "Лідс Юнайтед",
  "Sheffield United": "Шеффілд Юнайтед",
  Sunderland: "Сандерленд",
  Southampton: "Саутгемптон",
  "Swansea City": "Свонсі Сіті",
  "Norwich City": "Норвіч Сіті",
  Watford: "Вотфорд",
  Wrexham: "Рексем",
  Rangers: "Рейнджерс",
  Celtic: "Селтік",
  Hibernian: "Гіберніан",
  Motherwell: "Мотервелл",
  "Heart of Midlothian": "Гарт оф Мідлотіан",
  Kilmarnock: "Кілмарнок",
  Copenhagen: "Копенгаген",
  Midtjylland: "Мідтьюлланн",
  Brøndby: "Брондбю",
  "Malmö FF": "Мальме",
  AIK: "АІК",
  Lille: "Лілль",
  Rennes: "Ренн",
  Lens: "Ланс",
  Nantes: "Нант",
  Strasbourg: "Страсбур",
  Montpellier: "Монпельє",
  Reims: "Реймс",
  Angers: "Анже",
  Auxerre: "Осер",
  Lorient: "Лор'ян",
  Bastia: "Бастія",
  "Saint-Étienne": "Сент-Етьєн",
  "Le Havre": "Гавр",
  Sochaux: "Сошо",
  Torino: "Торіно",
  Udinese: "Удінезе",
  Parma: "Парма",
  Sassuolo: "Сассуоло",
  Cagliari: "Кальярі",
  Genoa: "Дженоа",
  Como: "Комо",
  Cremonese: "Кремонезе",
  Sampdoria: "Сампдорія",
  Pisa: "Піза",
  Venezia: "Венеція",
  "Werder Bremen": "Вердер",
  "Hamburger SV": "Гамбург",
  "Mainz 05": "Майнц 05",
  "SC Freiburg": "Фрайбург",
  "VfB Stuttgart": "Штутгарт",
  "VfL Wolfsburg": "Вольфсбург",
  "TSG Hoffenheim": "Гоффенгайм",
  "Schalke 04": "Шальке 04",
  "Union Berlin": "Уніон Берлін",
  "Eintracht Frankfurt": "Айнтрахт Франкфурт",
  "Fortuna Düsseldorf": "Фортуна Дюссельдорф",
  "Hannover 96": "Ганновер 96",
  "Karlsruher SC": "Карлсруе",
  "FC Augsburg": "Аугсбург",
  "FC St. Pauli": "Санкт-Паулі",
  "Holstein Kiel": "Гольштайн Кіль",
  "Al-Hilal": "Аль-Гіляль",
  "Al-Nassr": "Аль-Наср",
  "Al-Ittihad": "Аль-Іттіхад",
  "Al-Ahli": "Аль-Аглі",
  "Al-Ettifaq": "Аль-Іттіфак",
  "Al Jazira": "Аль-Джазіра",
  "Al Bataeh": "Аль-Батаєх",
  Sharjah: "Шарджа",
  Palmeiras: "Палмейрас",
  Botafogo: "Ботафого",
  Santos: "Сантос",
  "Vasco da Gama": "Васко да Гама",
  Grêmio: "Греміо",
  "Athletico Paranaense": "Атлетіко Паранаенсе",
  "River Plate": "Рівер Плейт",
  Independiente: "Індепендьєнте",
  "Rosario Central": "Росаріо Сентраль",
  "Vélez Sarsfield": "Велес Сарсфілд",
  "Los Angeles FC": "Лос-Анджелес",
  "Orlando City": "Орландо Сіті",
  "Toronto FC": "Торонто",
  "Vancouver Whitecaps FC": "Ванкувер Вайткепс",
  "Philadelphia Union": "Філадельфія Юніон",
  "Columbus Crew": "Коламбус Крю",
  "Portland Timbers": "Портленд Тімберс",
  "Minnesota United FC": "Міннесота Юнайтед",
  "FC Dallas": "Даллас",
  "San Diego": "Сан-Дієго",
  "FC Tokyo": "Токіо",
  "Kashima Antlers": "Касіма Антлерс",
  "Sanfrecce Hiroshima": "Санфречче Хіросіма",
  "Ulsan HD": "Ульсан HD",
  "Jeonbuk Hyundai Motors": "Чонбук Хьонде Моторс",
  "Gangwon FC": "Канвон",
  "Daejeon Hana Citizen": "Теджон Хана Сітізен",
  "Zhejiang FC": "Чжецзян",
  "Club Brugge": "Брюгге",
  Genk: "Генк",
  Gent: "Гент",
  "Standard Liège": "Стандард Льєж",
  "Union Saint-Gilloise": "Юніон Сен-Жилуаз",
  Charleroi: "Шарлеруа",
  "Cercle Brugge": "Серкль Брюгге",
  Beveren: "Беверен",
  Zürich: "Цюрих",
  "Young Boys": "Янг Бойз",
  Servette: "Серветт",
  Lugano: "Лугано",
  "Club Africain": "Клуб Африкен",
  "Espérance de Tunis": "Есперанс Туніс",
  "Étoile du Sahel": "Етуаль дю Сахель",
  "CS Sfaxien": "Сфаксьєн",
  "US Monastir": "Монастір",
  Pyramids: "Пірамідз",
  "Maccabi Haifa": "Маккабі Хайфа",
  "Maccabi Tel Aviv": "Маккабі Тель-Авів",
  Ferencváros: "Ференцварош",
  FCSB: "ФКСБ",
  "Ludogorets Razgrad": "Лудогорець Разград",
  Maribor: "Марибор",
  "Slovan Liberec": "Слован Ліберець",
  "Puskás Akadémia": "Академія Пушкаша",
  "Jagiellonia Białystok": "Ягеллонія Білосток",
  "Widzew Łódź": "Відзев Лодзь",
  "Lechia Gdańsk": "Лехія Гданськ",
  Trabzonspor: "Трабзонспор",
  "İstanbul Başakşehir": "Істанбул Башакшехір",
  Kasımpaşa: "Касимпаша",
  Kayserispor: "Кайсеріспор",
  Gaziantep: "Газіантеп",
  Konyaspor: "Коньяспор",
  Alanyaspor: "Аланьяспор",
  "Çaykur Rizespor": "Різеспор",
  Iğdır: "Игдир",
  AEL: "АЕЛ",
  Omonia: "Омонія",
  Pafos: "Пафос",
  "Apollon Limassol": "Аполлон Лімасол",
  "Aris Limassol": "Аріс Лімасол",
  "Wellington Phoenix": "Веллінгтон Фінікс",
  "Newcastle Jets": "Ньюкасл Джетс",
  "Western Sydney Wanderers": "Вестерн Сідней Вондерерз",
  "Auckland FC": "Окленд",
};

const translitPairs = [
  ["shch", "щ"], ["sch", "щ"], ["ch", "ч"], ["sh", "ш"], ["zh", "ж"], ["kh", "х"],
  ["ts", "ц"], ["yu", "ю"], ["ya", "я"], ["ye", "є"], ["yi", "ї"], ["jo", "йо"], ["yo", "йо"],
  ["ph", "ф"], ["th", "т"], ["ck", "к"], ["qu", "кв"], ["w", "в"], ["x", "кс"],
  ["a", "а"], ["b", "б"], ["c", "к"], ["d", "д"], ["e", "е"], ["f", "ф"], ["g", "г"],
  ["h", "г"], ["i", "і"], ["j", "дж"], ["k", "к"], ["l", "л"], ["m", "м"], ["n", "н"],
  ["o", "о"], ["p", "п"], ["q", "к"], ["r", "р"], ["s", "с"], ["t", "т"], ["u", "у"],
  ["v", "в"], ["y", "й"], ["z", "з"],
];

function transliterateWord(word) {
  let lower = word.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  let result = "";
  while (lower.length) {
    const pair = translitPairs.find(([latin]) => lower.startsWith(latin));
    if (pair) {
      result += pair[1];
      lower = lower.slice(pair[0].length);
    } else {
      result += lower[0];
      lower = lower.slice(1);
    }
  }
  return result ? result[0].toUpperCase() + result.slice(1) : result;
}

function fallbackClub(name) {
  return name
    .split(/(\s+|-|\/|&)/)
    .map((part) => {
      if (/^\s+$|^-|^\/|^&$/.test(part)) return part === "&" ? "енд" : part;
      if (/^(FC|SC|FK|IFK|AIK|LASK|LDU|NEC|PEC|PSV|RKC|SJK|TSG|VVV)$/i.test(part)) return part.toUpperCase();
      if (/^\d+$/.test(part)) return part;
      return transliterateWord(part);
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

const squads = JSON.parse(await readFile("data/final_squads_2026.json", "utf8"));
const clubTranslations = {};

for (const squad of squads.squads) {
  for (const player of squad.players) {
    const original = player.clubOriginal || player.club;
    player.clubOriginal = original;
    player.club = known[original] || fallbackClub(original);
    clubTranslations[original] = player.club;
  }
}

await writeFile("data/final_squads_2026.json", `${JSON.stringify(squads, null, 2)}\n`, "utf8");
await writeFile("data/club_translations_uk.json", `${JSON.stringify(clubTranslations, null, 2)}\n`, "utf8");
console.log(`Translated ${Object.keys(clubTranslations).length} clubs.`);
