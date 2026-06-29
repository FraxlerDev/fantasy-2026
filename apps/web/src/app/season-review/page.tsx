import type { Metadata } from "next";
import { Crown, Medal, Sparkles, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { AnimatedNumber } from "../../components/animated-number";
import { AppShell } from "../../components/shell";
import { auth } from "../../auth";
import { getSeasonReviewData } from "../../lib/season-review";
import { createMetadata } from "../../lib/seo";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ preview?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  noStore();
  await searchParams;
  return createMetadata({
    title: "Фентезі до ЧС-2026: підсумки турніру",
    description: "Переможці, фінальний рейтинг, рекорди та команда турніру у Фентезі до ЧС-2026.",
    path: "/",
    noIndex: true,
  });
}

function TeamPhoto({ src, name }: { src: string | null; name: string }) {
  return src ? <img className="season-team-photo" src={src} alt="" /> : <span className="season-team-photo season-team-fallback">{name.slice(0, 1)}</span>;
}

function playerSurname(name: string) {
  return name.trim().split(/\s+/).at(-1) || name.trim();
}

function PositionGraph({ chart, cutoff }: { chart: Awaited<ReturnType<typeof getSeasonReviewData>>["chart"]; cutoff: number }) {
  if (!chart.length || !cutoff) return <p className="muted">Динаміка з’явиться після оновлення рейтингів.</p>;
  const colors = ["#136044", "#d2a91f", "#d15b35", "#356fb6", "#7d5aa6"];
  const maxRank = Math.max(5, ...chart.flatMap((row) => row.values));
  const x = (index: number) => 42 + (index * 640) / Math.max(1, cutoff - 1);
  const y = (rank: number) => 20 + ((rank - 1) * 190) / Math.max(1, maxRank - 1);
  return (
    <div className="season-chart-wrap">
      <svg className="season-chart" viewBox="0 0 720 250" role="img" aria-label="Динаміка місць топ-5 команд">
        {Array.from({ length: cutoff }, (_, index) => <text x={x(index)} y="242" textAnchor="middle" key={index}>GW{index + 1}</text>)}
        {chart.map((row, rowIndex) => {
          const points = row.values.slice(0, cutoff).map((rank, index) => `${x(index)},${y(rank)}`).join(" ");
          return <g key={row.id}><polyline points={points} fill="none" stroke={colors[rowIndex]} strokeWidth="4" />{row.values.slice(0, cutoff).map((rank, index) => <circle key={index} cx={x(index)} cy={y(rank)} r="5" fill={colors[rowIndex]} />)}</g>;
        })}
      </svg>
      <div className="season-chart-legend">{chart.map((row, index) => <span key={row.id}><i style={{ background: colors[index] }} />{row.name}</span>)}</div>
    </div>
  );
}

export default async function SeasonReviewPage({ searchParams }: Props) {
  noStore();
  const { preview } = await searchParams;
  const session = preview === "1" ? await auth() : null;
  const adminEmail = process.env.ADMIN_EMAIL ?? "terintention@gmail.com";
  if (preview !== "1" || session?.user?.email !== adminEmail) redirect("/");

  return <SeasonReviewView active="/" />;
}

export async function SeasonReviewView({ active = "/" }: { active?: string }) {
  const data = await getSeasonReviewData();
  const winner = data.podium[0];
  return (
    <AppShell active={active}>
      <div className="season-review-page">
        <header className="season-review-hero season-reveal">
          <p className="eyebrow">ФІНАЛЬНИЙ СВИСТОК</p>
          <h1>Фентезі до ЧС-2026:<br />підсумки турніру</h1>
          <p>Один чемпіонат, сім ігрових турів і десятки рішень, які сформували фінальну таблицю.</p>
          {winner ? <div className="season-winner"><Crown size={42} /><span>Переможець</span><strong>{winner.name}</strong><small>{winner.manager} · {winner.total} очок</small><div className="season-confetti" aria-hidden="true">✦ · ✧ · ✦</div></div> : null}
        </header>

        <section className="season-section season-reveal">
          <div className="season-heading"><Medal /><div><p className="eyebrow">П’ЄДЕСТАЛ</p><h2>Трійка найкращих</h2></div></div>
          <div className="season-podium">
            {data.podium.map((team) => <Link className={`season-podium-card place-${team.rank}`} href={`/teams/${team.id}`} key={team.id}>
              <span className="season-place">{team.rank}</span><TeamPhoto src={team.photo} name={team.name} /><strong>{team.name}</strong><span>{team.manager}</span><b>{team.total} очок</b>
            </Link>)}
          </div>
        </section>

        <section className="season-stats season-reveal">
          {[['Команд', data.stats.teams], ['Учасників', data.stats.users], ['Трансферів', data.stats.transfers], ['Автозамін', data.stats.autoSubs], ['Очок командам', data.stats.points]].map(([label, value]) => <div key={String(label)}><strong><AnimatedNumber value={Number(value)} /></strong><span>{label}</span></div>)}
        </section>

        <div className="season-two-column">
          <section className="season-section season-reveal">
            <div className="season-heading"><Trophy /><div><p className="eyebrow">ФІНАЛ</p><h2>ТОП-10 команд</h2></div></div>
            <ol className="season-ranking">{data.topTen.map((team) => <li key={team.id}><span>{team.rank}</span><Link href={`/teams/${team.id}`}>{team.name}<small>{team.manager}</small></Link><strong>{team.total}</strong></li>)}</ol>
          </section>
          <section className="season-section season-reveal">
            <div className="season-heading"><Sparkles /><div><p className="eyebrow">СІМ ЕТАПІВ</p><h2>Переможці GW</h2></div></div>
            <div className="season-gw-winners">{data.gameweekWinners.map((winner) => winner && <Link href={`/teams/${winner.id}`} key={winner.gameweek}><b>GW{winner.gameweek}</b><span>{winner.name}</span><strong>{winner.total}</strong></Link>)}</div>
          </section>
        </div>

        <section className="season-section season-reveal">
          <div className="season-heading"><Users /><div><p className="eyebrow">ГОНКА ЛІДЕРІВ</p><h2>Динаміка місць фінального ТОП-5</h2></div></div>
          <PositionGraph chart={data.chart} cutoff={data.cutoff} />
        </section>

        <section className="season-section season-reveal">
          <div className="season-heading"><Trophy /><div><p className="eyebrow">СХЕМА 4-3-3</p><h2>Команда сезону</h2></div></div>
          <div className="season-dream-team">{['FWD','MID','DEF','GK'].map((position) => <div className={`season-dream-line ${position.toLowerCase()}`} key={position}>{data.dreamTeam.filter((player) => player.position === position).map((player) => <div className="season-player" key={player.id}>{player.photoUrl ? <img src={player.photoUrl} alt="" /> : <span />}{player.flagPath ? <img className="season-player-flag" src={player.flagPath} alt="" /> : null}<strong title={player.name}>{playerSurname(player.name)}</strong><b>{player.points}</b></div>)}</div>)}</div>
          <div className="season-position-leaders">{data.positionLeaders.map(({ position, label, player }) => <div key={position}><span>{label}</span><strong>{player?.name ?? "—"}</strong><b>{player?.points ?? 0} оч.</b></div>)}</div>
        </section>

        <section className="season-section season-reveal">
          <div className="season-heading"><Sparkles /><div><p className="eyebrow">РЕКОРДИ</p><h2>Цифри, що запам’яталися</h2></div></div>
          <div className="season-records">
            <div><span>Найкращий результат GW</span><strong>{data.records.bestGw?.name ?? "—"}</strong><b>{data.records.bestGw ? `${data.records.bestGw.total} оч. · GW${data.records.bestGw.gameweek}` : "—"}</b></div>
            <div><span>Найбільший стрибок</span><strong>{data.records.bestJump?.team ?? "—"}</strong><b>{data.records.bestJump ? `+${data.records.bestJump.jump} місць · GW${data.records.bestJump.gameweek}` : "—"}</b></div>
            <div><span>Найкращий капітан</span><strong>{data.records.bestCaptain?.player.name ?? "—"}</strong><b>{data.records.bestCaptain ? `${data.records.bestCaptain.points} оч. · GW${data.records.bestCaptain.gameweek}` : "—"}</b></div>
            <div><span>Найкраща автозаміна</span><strong>{data.records.bestAutoSub?.inPlayer.name ?? "—"}</strong><b>{data.records.bestAutoSub ? `+${data.records.bestAutoSub.points} оч.` : "—"}</b></div>
          </div>
        </section>

        <footer className="season-thanks season-reveal"><p className="eyebrow">ДЯКУЮ ЗА ГРУ</p><h2>Цей турнір створили не лише результати, а й люди</h2><p>Дякую кожному, хто збирав склад, ризикував із капітаном, сперечався про правила, помічав неточності та допомагав грі ставати кращою. Саме ваша участь перетворила маленький задум на живий український фентезі-турнір.</p><Link className="button primary" href="/leaderboard">Переглянути фінальний рейтинг</Link></footer>
      </div>
    </AppShell>
  );
}
