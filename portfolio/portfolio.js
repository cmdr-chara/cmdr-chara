// Contenuti del portfolio, in italiano e in inglese. Modifica questo file per
// personalizzare testi e link: le due lingue devono dire le stesse cose.
// `summary` compare nel riquadro dello shop: massimo 4 righe da 13 caratteri.
// `description` compare nella conferma (circa 120 caratteri); `story` sono le
// pagine raccontate prima della conferma, un argomento per paragrafo.
// Fonti pubbliche e limiti delle affermazioni: docs/github-content-sources.md.
export const profile = {
  name: 'Chara',
  handle: 'cmdr-chara',
  github: 'https://github.com/cmdr-chara',
  // Personaggio giocabile. 'frisk': sprite originali del gioco, ombrello
  // compreso. 'chara': sprite della community (RynoTheGameGuy) e pose con
  // l'ombrello di tools/build-chara-umbrella.py, tenuti come riserva.
  character: 'frisk',
  about: {
    it: [
      'Mi chiamo Chara. Se mi cerchi su GitHub, il nome è cmdr-chara.',
      'Sviluppo app desktop e strumenti per chi programma. Qui si passa dalle mod dei giochi ai workspace per agenti.',
      'Lavoro anche su progetti altrui: sul mio profilo trovi contributi a Synara, Zed e TestSprite CLI.',
      'In Synara ho corretto anche un problema di salvataggi concorrenti: due aggiornamenti delle credenziali potevano intralciarsi.',
      'Scegli pure qualcosa dallo scaffale. Ti racconto cosa fa, poi puoi aprire il repository e guardare il codice.',
    ],
    en: [
      'My name is Chara. If you look for me on GitHub, the handle is cmdr-chara.',
      'I build desktop apps and tools for developers. This shelf goes from game mods to workspaces for coding agents.',
      'I also contribute to other projects: my profile links to work on Synara, Zed and TestSprite CLI.',
      'In Synara, I also fixed concurrent saves: two credential updates could interfere with each other.',
      'Pick something from the shelf. I will explain what it does, then you can open the repository and look at the code.',
    ],
  },
  stack: {
    it: [
      'Rust è il linguaggio di Speedtest-Cli e compare anche in Deltamod Community, che usa Tauri per l\'app desktop.',
      'Nel mio stack ci sono anche TypeScript, Flutter, Python e C#, come puoi vedere sul profilo GitHub.',
      'Con Speedtest-Cli il lavoro passa dall\'interfaccia alle misure di rete: risultati, storico locale e dati per gli script.',
      'Chara\'s Toolkit raccoglie invece istruzioni per gli agenti: leggere il repository, scegliere un intervento e verificarlo.',
    ],
    en: [
      'Rust is the language of Speedtest-Cli and also appears in Deltamod Community, which uses Tauri for its desktop app.',
      'My stack also includes TypeScript, Flutter, Python and C#, as listed on my GitHub profile.',
      'With Speedtest-Cli, the work goes from the interface to network measurements: results, local history and data for scripts.',
      'Chara\'s Toolkit collects instructions for agents: read the repository, choose a change and verify it.',
    ],
  },
  projects: [
    {
      name: 'Deltamod',
      url: 'https://github.com/cmdr-chara/deltamod-community',
      description: {
        it: 'Mod manager per giochi GameMaker come DELTARUNE e UNDERTALE, mantenuto dalla community.',
        en: 'A community mod manager for supported GameMaker games, including DELTARUNE and UNDERTALE.',
      },
      summary: {it: ['Mod manager', 'per GameMaker', 'curato dalla', 'community.'], en: ['Mod manager', 'for GameMaker', 'kept by the', 'community.']},
      story: {
        it: [
          'Deltamod era soggetto a censura, così ho deciso di farne un fork e migliorarlo.',
          'Deltamod Community è il mio fork indipendente di deltamodders/deltamod. Il lavoro degli autori originali resta riconosciuto.',
          'Gestisce mod per giochi GameMaker supportati, fra cui DELTARUNE e UNDERTALE. Si parte dalla propria installazione del gioco.',
          'Puoi cercare contenuti su GameBanana, ModDB e Nexus Mods, oppure importare un archivio che hai già scaricato.',
          'Profili e collezioni tengono separate le configurazioni. Non devi spostare ogni volta i file del gioco a mano.',
          'La vista delle mod installate mostra versioni, file, conflitti e cronologia delle operazioni: puoi capire cosa è cambiato.',
          'Le operazioni supportate preparano i file e verificano le modifiche. Se qualcosa va storto, sono previsti percorsi di ripristino.',
          'Ci sono pacchetti per Windows, Linux e macOS. Il supporto è stabile su Windows, sperimentale su Linux e macOS.',
        ],
        en: [
          'Deltamod was subject to censorship, so I decided to fork it and improve it.',
          'Deltamod Community is my independent fork of deltamodders/deltamod. The original authors keep credit for their work.',
          'It manages mods for supported GameMaker games, including DELTARUNE and UNDERTALE. You start with your own game installation.',
          'You can browse GameBanana, ModDB and Nexus Mods, or import an archive you have already downloaded.',
          'Profiles and collections keep setups separate. You do not have to keep moving game files by hand.',
          'The installed mods view shows versions, files, conflicts and operation history, so you can see what changed.',
          'Supported operations prepare files and verify changes. If something goes wrong, there are recovery paths.',
          'Packages are available for Windows, Linux and macOS. Support is stable on Windows, and experimental on Linux and macOS.',
        ],
      },
    },
    {
      name: 'Synara',
      url: 'https://github.com/Emanuele-web04/synara',
      description: {
        it: 'I miei contributi a Synara: correzioni e verifiche per il workspace desktop di agenti di programmazione.',
        en: 'My contributions to Synara: fixes and verification for the desktop workspace for coding agents.',
      },
      summary: {it: ['Contributi a', 'Synara:', 'correzioni e', 'verifiche.'], en: ['Contributions', 'to Synara:', 'fixes and', 'verification.']},
      story: {
        it: [
          'A Synara contribuisco sul progetto originale di Emanuele-web04. Il collegamento qui porta a quel repository.',
          'È un workspace per agenti di programmazione: conversazioni, file, terminale, browser, Git e revisione delle modifiche stanno insieme.',
          'Una mia correzione evita che due salvataggi delle credenziali usino lo stesso file temporaneo e si ostacolino a vicenda.',
          'Ho aggiunto un test che forza scritture contemporanee, controlla il risultato finale e cerca eventuali file temporanei rimasti.',
          'Ho curato anche integrazione e verifiche di una modifica alle schede browser: testo nei moduli e posizione della pagina restano durante il cambio scheda.',
          'Un\'altra continuazione su cui ho lavorato recupera errori di connessione senza reinviare automaticamente richieste dal risultato incerto.',
          'Nelle relative pull request trovi i problemi di partenza, i test e i limiti delle verifiche. Puoi seguire il lavoro fino al codice integrato.',
        ],
        en: [
          'I contribute to the original Synara project by Emanuele-web04. The link here takes you to that repository.',
          'It is a workspace for coding agents: conversations, files, a terminal, a browser, Git and change review stay together.',
          'One of my fixes prevents two credential saves from using the same temporary file and interfering with each other.',
          'I added a test that forces concurrent writes, checks the final result and looks for temporary files left behind.',
          'I also handled integration and verification of a browser tab change: form input and page position survive ordinary tab switching.',
          'Another continuation I worked on recovers connection failures without automatically resending requests whose outcome is uncertain.',
          'The related pull requests show the original problems, tests and verification limits. You can follow the work through to the merged code.',
        ],
      },
    },
    {
      name: 'Speedtest-Cli',
      url: 'https://github.com/cmdr-chara/speedtest-cli',
      description: {
        it: 'Laboratorio di rete da terminale in Rust: misura la connessione che usi davvero.',
        en: 'A terminal network lab in Rust: it measures the connection you actually use.',
      },
      summary: {it: ['Laboratorio', 'di rete da', 'terminale', 'in Rust.'], en: ['Terminal', 'network lab', 'in Rust.', '']},
      story: {
        it: [
          'Speedtest-Cli è un laboratorio di rete da terminale scritto in Rust. Il risultato non si ferma a download e upload.',
          'Misura anche latenza a riposo e sotto carico, jitter e bufferbloat: il comportamento della connessione mentre la usi.',
          'Puoi confrontare servizi di test Internet o misurare il collegamento fra due computer nella tua rete locale fidata.',
          'Ci sono strumenti per esaminare il Wi-Fi e confrontare i resolver DNS, anche con protocolli DNS cifrati.',
          'Lo storico resta sul computer. Puoi cercare vecchie misure, fissare un riferimento e confrontare due risultati anche offline.',
          'Per gli script esporta JSON, CSV o JSONL e controlla risultati già salvati rispetto alle soglie che scegli tu.',
          'Il codice è consultabile con una licenza source-available personalizzata. Non è un client ufficiale di Cloudflare o LibreSpeed.',
        ],
        en: [
          'Speedtest-Cli is a terminal network lab written in Rust. Its results go beyond download and upload.',
          'It also measures idle and loaded latency, jitter and bufferbloat: how the connection behaves while you use it.',
          'You can compare Internet test services or measure the link between two computers on your trusted local network.',
          'There are tools to inspect Wi-Fi and compare DNS resolvers, including encrypted DNS protocols.',
          'History stays on your computer. You can find old measurements, pin a baseline and compare two results offline.',
          'For scripts, it exports JSON, CSV or JSONL and checks saved results against thresholds you choose.',
          'The code is available under a custom source-available license. It is not an official Cloudflare or LibreSpeed client.',
        ],
      },
    },
    {
      name: "Chara’s Toolkit",
      url: 'https://github.com/cmdr-chara/chara-toolkit',
      description: {
        it: 'Skill di ingegneria per agenti AI, installabili singolarmente, con integrazione opzionale per Codex.',
        en: 'Engineering skills for AI agents, installable individually, with an optional Codex integration.',
      },
      summary: {it: ['Skill per', 'agenti AI.', 'Leggi, cambia', 'verifica.'], en: ['Skills for', 'AI agents.', 'Read, change,', 'verify.']},
      story: {
        it: [
          'Chara\'s Toolkit raccoglie skill per agenti di programmazione. Ogni skill dà istruzioni mirate per un tipo di lavoro.',
          'Si parte dal repository: capire com\'è organizzato, cosa dipende dal codice interessato e dove può arrivare una modifica.',
          'Cercare un bug sconosciuto e diagnosticare un errore già osservato sono lavori diversi. Il toolkit li affida a percorsi distinti.',
          'Puoi installare anche una sola skill. Le cartelle SKILL.md sono utilizzabili nei client che supportano quel formato.',
          'L\'integrazione completa per Codex aggiunge la scelta delle skill, i workflow, ruoli opzionali e aggiornamenti dalle release.',
          'Le istruzioni non concedono permessi extra. Accesso ai file, rete, strumenti e approvazioni restano controllati dall\'ambiente.',
          'Trovi una guida in italiano e indicazioni per verificare il lavoro. Una risposta convincente dell\'agente non è una prova che il codice funzioni.',
        ],
        en: [
          'Chara\'s Toolkit collects skills for coding agents. Each skill gives focused instructions for a particular kind of work.',
          'It starts with the repository: understand its structure, what depends on the affected code and how far a change can reach.',
          'Finding an unknown bug and diagnosing an observed failure are different jobs. The toolkit gives them separate paths.',
          'You can install just one skill. SKILL.md folders work in clients that support that format.',
          'The full Codex integration adds skill routing, workflows, optional roles and updates from published releases.',
          'The instructions do not grant extra permissions. The host still controls files, network access, tools and approvals.',
          'There is an Italian guide and guidance for checking the work. A convincing answer from an agent is not proof that the code works.',
        ],
      },
    },
  ],
};
