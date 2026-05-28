import type { Player } from "@fantasy/shared";

export const players: Player[] = [
  { id: "dovbyk", name: "Артем Довбик", position: "FWD", nationCode: "UKR", nationName: "Україна", price: 8.5, status: "AVAILABLE" },
  { id: "mudryk", name: "Михайло Мудрик", position: "MID", nationCode: "UKR", nationName: "Україна", price: 7.5, status: "AVAILABLE" },
  { id: "zinchenko", name: "Олександр Зінченко", position: "DEF", nationCode: "UKR", nationName: "Україна", price: 6.0, status: "AVAILABLE" },
  { id: "trubin", name: "Анатолій Трубін", position: "GK", nationCode: "UKR", nationName: "Україна", price: 5.0, status: "AVAILABLE" },
  { id: "mbappe", name: "Кіліан Мбаппе", position: "FWD", nationCode: "FRA", nationName: "Франція", price: 12.0, status: "AVAILABLE" },
  { id: "griezmann", name: "Антуан Грізманн", position: "MID", nationCode: "FRA", nationName: "Франція", price: 9.0, status: "AVAILABLE" },
  { id: "saliba", name: "Вільям Саліба", position: "DEF", nationCode: "FRA", nationName: "Франція", price: 6.5, status: "AVAILABLE" },
  { id: "maignan", name: "Майк Меньян", position: "GK", nationCode: "FRA", nationName: "Франція", price: 5.5, status: "AVAILABLE" },
  { id: "bellingham", name: "Джуд Беллінгем", position: "MID", nationCode: "ENG", nationName: "Англія", price: 10.0, status: "AVAILABLE" },
  { id: "kane", name: "Гаррі Кейн", position: "FWD", nationCode: "ENG", nationName: "Англія", price: 11.0, status: "AVAILABLE" },
  { id: "saka", name: "Букайо Сака", position: "MID", nationCode: "ENG", nationName: "Англія", price: 9.5, status: "AVAILABLE" },
  { id: "stones", name: "Джон Стоунз", position: "DEF", nationCode: "ENG", nationName: "Англія", price: 5.5, status: "AVAILABLE" },
  { id: "musiala", name: "Джамал Мусіала", position: "MID", nationCode: "GER", nationName: "Німеччина", price: 9.5, status: "AVAILABLE" },
  { id: "wirtz", name: "Флоріан Вірц", position: "MID", nationCode: "GER", nationName: "Німеччина", price: 9.0, status: "AVAILABLE" },
  { id: "rudiger", name: "Антоніо Рюдігер", position: "DEF", nationCode: "GER", nationName: "Німеччина", price: 6.0, status: "AVAILABLE" },
];

export const leaderboard = [
  { rank: 1, team: "Лівий Фланг", manager: "Олег", points: 184, stagePoints: 42 },
  { rank: 2, team: "Карпатський Пресинг", manager: "Марія", points: 179, stagePoints: 38 },
  { rank: 3, team: "xG Козаки", manager: "Денис", points: 172, stagePoints: 36 },
  { rank: 4, team: "Північна Трибуна", manager: "Іра", points: 168, stagePoints: 31 },
];

export const guideCards = [
  {
    label: "Швидкий старт",
    title: "Як зібрати команду за 2 хвилини",
    meta: "5 кроків",
  },
  {
    label: "Поради",
    title: "Капітан: коли ризикувати, а коли грати надійно",
    meta: "Перед дедлайном",
  },
  {
    label: "Правила",
    title: "Як рахуються очки у balanced scoring",
    meta: "Оновлено",
  },
];
