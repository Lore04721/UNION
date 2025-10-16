import csv, os, time, smtplib, ssl
from email.message import EmailMessage
import random
# ====== CONFIG ======
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT   = 587

# Metti qui le credenziali, oppure usa le variabili d'ambiente SMTP_USER/SMTP_PASS
FROM_EMAIL  = os.environ.get("SMTP_USER") or "union.edu095@gmail.com"
APP_PASSWORD= os.environ.get("SMTP_PASS") or "vpoa vatp lzum ghix"

FROM_NAME   = "UNION EDU"
SUBJECT     = "Proposta di collaborazione – Progetto UNION per la prevenzione dell’abbandono scolastico (Start Cup Catania 2025)"
CSV_FILE    = "file_parte1.csv"           # CSV con intestazione: email
THROTTLE_MIN = 20     # pausa minima in secondi
THROTTLE_MAX = 35     # pausa massima in secondi
BATCH_SIZE   = 80     # quante email inviare prima di riconnettersi
MAX_SEND= 80
DRY_RUN     = False                 # True=prova (non invia), False=invia
USE_SENT_LOG= True
SENT_LOG    = "sent_log.csv"

# Corpo email (testo + HTML)
TEXT_BODY = f"""Alla cortese attenzione della Dirigente / del Dirigente e dei Gentili Docenti,

siamo UNION, startup innovativa a vocazione sociale candidata alla Start Cup Catania 2025.

La nostra missione è ridurre l’abbandono scolastico in Sicilia attraverso l’impiego etico e responsabile dell’intelligenza artificiale.
In una Regione in cui quasi 1 giovane su 5 non consegue il diploma, vogliamo intervenire prima che il disagio diventi abbandono:
usare la tecnologia per non perdere più nessuno.

[...accorciato...]
— {FROM_NAME}
"""

HTML_BODY = f"""<p><strong>Alla cortese attenzione della Dirigente / del Dirigente</strong></p>

<p><strong>e dei Gentili Docenti,</strong></p>

<p>siamo <strong>UNION</strong>, startup innovativa a vocazione sociale candidata alla <strong>Start Cup Catania 2025</strong>. La nostra missione è <strong>ridurre l’abbandono scolastico in Sicilia</strong> attraverso l’<strong>impiego etico e responsabile dell’intelligenza artificiale</strong>.</p>

<p>In una Regione in cui <strong>quasi 1 giovane su 5</strong> non consegue il diploma, vogliamo intervenire <strong>prima</strong> che il disagio diventi abbandono: <strong>usare la tecnologia per non perdere più nessuno</strong>.</p>

<p><strong>Chi siamo</strong></p>

<p>Un team multidisciplinare interno a <strong>UNION</strong> che integra competenze accademiche, legali, tecniche ed economiche:</p>

<ul>
  <li><strong>Prof. Giovanni M. Farinella</strong> – Docente e ricercatore in AI e Informatica</li>
  <li><strong>Dott. Giuseppe Trovato</strong> –  Laureato in Giurisprudenza e con forte dedizione nel supporto degli studenti</li>
  <li><strong>Nicolò Cambria</strong> – Studente di Informatica e professionista IT</li>
  <li><strong>Dott. Federico Motta</strong> – Economista, appassionato di startup e impatto sociale</li>
  <li><strong>Unità interna di Sviluppo &amp; Data Science (UNION)</strong> – sviluppatori, data scientist e ML engineer che curano progettazione, addestramento, validazione e messa in produzione del sistema</li>
</ul>

<p><strong>Cosa proponiamo</strong></p>

<p>Stiamo sviluppando un sistema di <strong>AI predittiva</strong> che individua <strong>segnali precoci di rischio</strong> (assenze ricorrenti, cali di rendimento, trasferimenti, ecc.) per fornire <strong>alert tempestivi</strong> e supportare <strong>interventi mirati</strong>.</p>

<p>Per addestrare e validare il modello chiediamo la collaborazione dell’Istituto nel fornire <strong>dati esclusivamente anonimi e aggregati</strong> (quindi <strong>non riconducibili al singolo studente</strong>), tra cui a titolo esemplificativo:</p>

<ul>
  <li><strong>Frequenza/Assenze</strong> e andamento nel tempo</li>
  <li><strong>Voti medi e rendimento</strong>, ripetenze, cambi di scuola</li>
  <li><strong>Indicatori socio-economici aggregati</strong> (ISEE per fasce, occupazione genitori per classi, aree non identificative)</li>
  <li><strong>Età, genere</strong> e <strong>titolo di studio dei genitori</strong> in forma statistica</li>
  <li><strong>Partecipazione a progetti</strong> e note di comportamento in forma aggregata</li>
  <li><strong>Distanza da scuola</strong></li>
  <li><strong>Esiti anonimi</strong> di questionari di autovalutazione (se presenti)</li>
</ul>

<p><strong>Privacy e conformità</strong></p>

<ul>
  <li>Trattiamo <strong>solo dati anonimi/aggregati</strong> per fini di ricerca e valutazione d’impatto sociale.</li>
  <li><strong>Nessuna identificazione individuale</strong>: non richiediamo nominativi né codici.</li>
  <li>Disponibili <strong>informativa tecnica</strong>, <strong>misure di anonimizzazione</strong>, ed eventualmente <strong>accordo di collaborazione</strong> e <strong>DPA</strong> (ove applicabile).</li>
</ul>

<p><strong>Perché partecipare</strong></p>

<ul>
  <li><strong>Prevenzione mirata</strong>: evidenze precoci per attivare tutoraggi e percorsi personalizzati.</li>
  <li><strong>Supporto decisionale</strong>: cruscotti sintetici per Dirigenza e Docenti.</li>
  <li><strong>Impatto sociale misurabile</strong>: contributo a una scuola più equa e inclusiva nel territorio.</li>
</ul>

<p>Saremmo lieti di <strong>presentare il progetto</strong> (anche online) e di illustrare metodologia, flussi dati e garanzie. Su richiesta invieremo una <strong>scheda tecnica</strong> di dettaglio.</p>

<p><strong>Cordiali saluti,</strong></p>

<p><strong>Team UNION</strong><br>
<strong>Dott. Federico Motta</strong> – Economista | 📞 342 047 1102<br>
<strong>Dott. Giuseppe Trovato</strong> – Laureato in Giurisprudenza  | 📞 345 026 8100<br>
<strong>Nicolò Cambria</strong> – Informatico | 📞 351 580 5972<br>
<strong>Prof. Giovanni M. Farinella</strong> – Docente/Ricercatore in AI e Informatica</p>
"""

# ====== FUNZIONI ======
def read_emails(csv_path: str) -> list[str]:
    """Legge la colonna 'email' (CSV con header 'email')."""
    if not os.path.exists(csv_path):
        raise SystemExit(f"❌ CSV non trovato: {csv_path}")
    with open(csv_path, "r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        return [row["email"].strip() for row in reader if row.get("email")]

def load_sent():
    if not USE_SENT_LOG or not os.path.exists(SENT_LOG): return set()
    with open(SENT_LOG, encoding="utf-8") as f:
        return {line.strip().lower() for line in f if line.strip()}

def save_sent(addr: str):
    if USE_SENT_LOG:
        with open(SENT_LOG, "a", encoding="utf-8") as f:
            f.write(addr + "\n")

def build_msg(to_email: str) -> EmailMessage:
    msg = EmailMessage()
    msg["From"] = f"{FROM_NAME} <{FROM_EMAIL}>"
    msg["To"] = to_email
    msg["Subject"] = SUBJECT
    msg.set_content(TEXT_BODY)
    msg.add_alternative(HTML_BODY, subtype="html")
    return msg

def connect():
    s = smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=60)
    s.ehlo()
    s.starttls(context=ssl.create_default_context())
    s.ehlo()
    s.login(FROM_EMAIL, APP_PASSWORD)  # App Password di Gmail (NON la password normale)
    return s

# ====== MAIN ======
def main():
    if not FROM_EMAIL or not APP_PASSWORD:
        raise SystemExit("Imposta FROM_EMAIL e APP_PASSWORD (o le variabili d'ambiente SMTP_USER/SMTP_PASS).")

    rows = read_emails(CSV_FILE)
    already = load_sent()
    to_send = [e for e in rows if e and e.lower() not in already]
    to_send = to_send[:MAX_SEND]
    print(f"Nel CSV: {len(rows)} | già inviati: {len(already)} | da inviare ora: {len(to_send)}")

    if DRY_RUN:
        for i, addr in enumerate(to_send, 1):
            print(f"[{i}] DRY-RUN -> {addr}")
        return

    smtp = connect()
    try:
        for i, addr in enumerate(to_send, 1):
            try:
                smtp.send_message(build_msg(addr))
                print(f"[{i}] OK  -> {addr}")
                save_sent(addr)
            except Exception as e:
                print(f"[{i}] ERR -> {addr} | {e}")

            # Pausa casuale tra un invio e l'altro
            delay = random.uniform(THROTTLE_MIN, THROTTLE_MAX)
            time.sleep(delay)

            # Riconnessione periodica ogni X email
            if i % BATCH_SIZE == 0:
                try:
                    smtp.quit()
                except Exception:
                    pass
                smtp = connect()
                print(f"🔄 Riconnesso dopo {i} invii...")

    finally:
        try: smtp.quit()
        except Exception: pass

if __name__ == "__main__":
    main()
