"use client";

import { Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { importPlayersCsv } from "../app/actions/admin-actions";

function splitCsvLine(line: string) {
  return line.includes(";") ? line.split(";") : line.split(",");
}

export function AdminPlayerImport() {
  const [csv, setCsv] = useState("");
  const preview = useMemo(
    () =>
      csv
        .trim()
        .split(/\r?\n/)
        .filter(Boolean)
        .slice(0, 6)
        .map((line, index) => {
          const [team, name, position, price, status, club] = splitCsvLine(line).map((value) => value.trim());
          return { index: index + 1, team, name, position, price, status: status || "AVAILABLE", club };
        }),
    [csv],
  );

  return (
    <form action={importPlayersCsv} className="form-stack">
      <label>
        Формат: team,name,position,price,status,club
        <textarea
          className="input textarea"
          name="playersCsv"
          placeholder={"Іспанія,Унаї Сімон,GK,5.5,AVAILABLE,Athletic Bilbao\nFRA,Кіліан Мбаппе,FWD,12,AVAILABLE,Real Madrid"}
          rows={7}
          value={csv}
          onChange={(event) => setCsv(event.target.value)}
        />
      </label>
      {preview.length > 0 ? (
        <table className="table compact-table">
          <thead><tr><th>#</th><th>Збірна</th><th>Гравець</th><th>Поз.</th><th>Ціна</th><th>Статус</th><th>Клуб</th></tr></thead>
          <tbody>
            {preview.map((row) => (
              <tr key={row.index}>
                <td>{row.index}</td>
                <td>{row.team || "-"}</td>
                <td>{row.name || "-"}</td>
                <td>{row.position || "-"}</td>
                <td>{row.price || "-"}</td>
                <td>{row.status}</td>
                <td>{row.club || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      <button className="button primary" type="submit">
        <Upload size={18} />
        Імпортувати гравців
      </button>
    </form>
  );
}
