# Cesta

Gemeinsame Einkaufsliste mit Vorrat für einen Haushalt, umschaltbar Deutsch/Spanisch. Reine Web-App (HTML/CSS/JS, kein Build), ausgeliefert über GitHub Pages; die Daten liegen im Supabase-Projekt der Schichterfassung (`pltjkedvinvllmlivbsn`) in eigenen Tabellen `cesta_*`.

## Funktionen

- **Liste:** oben suchen (Deutsch oder Spanisch) und antippen; unbekannte Produkte direkt neu anlegen. Abhaken, Menge ändern, „Einkauf abschließen“ räumt Erledigtes ab und bucht es in den Vorrat.
- **Vorrat:** Bestand per +/− pflegen. Fällt er auf oder unter die Mindestmenge, kommt das Produkt automatisch auf die Liste.
- **Sortiment:** Produkte (Name de/es, Symbol, Kategorie, Einheit, Mindestmenge) und Kategorien bearbeiten.
- **Haushalt:** Einladungscode erstellen (7 Tage, einmalig); die andere Person tritt damit bei und sieht alles live.
- **Sicherung:** Export/Import im bisherigen Format `cesta-backup` Version 1.

## Einrichtung

1. `supabase/schema.sql` im SQL Editor des Schichterfassung-Projekts ausführen (mehrfach ausführbar).
2. In Authentication → URL Configuration `https://analogguy-sudo.github.io/Cesta/**` als Redirect URL ergänzen, damit „Passwort vergessen“ zurück zu Cesta führt.
3. Registrierungen sind im Projekt abgeschaltet: neue Personen unter Authentication → Users → „Invite user“ einladen. Danach in Cesta mit dem Code dem Haushalt beitreten.

Beim ersten Anmelden ohne Haushalt legt die App einen an und füllt ihn mit dem Startsortiment aus `defaults.js` (16 Kategorien, 110 Produkte).

## Lokal ausprobieren

```
python3 -m http.server 8765
```

`http://localhost:8765/?demo` läuft ohne Konto; die Daten liegen dann nur im Browser.
