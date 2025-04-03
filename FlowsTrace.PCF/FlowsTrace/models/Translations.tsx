import { error } from "console";
import { FilterExecutions } from "./Enums";

export const translations = {
    sq: {
      recordsPerPage: "Regjistrime për faqe",
      totalExecutions: "Gjithsej ekzekutime të lidhura të gjetura",
      date: "Data",
      flowName: "Emri i rrjedhës",
      flowStatus: "Statusi i rrjedhës",
      action: "Veprim",
      actionStatus: "Statusi i veprimit",
      showExecution: "Shfaq ekzekutimin",
      previous: "E mëparshme",
      next: "Tjetër",
      page: "Faqe",
      of: "nga ",
      flowStatusEnums: {
        failed: "Dështoi",
        succeeded: "Sukses",
        cancelled: "Anuluar",
        unknown: "I panjohur",
      },
      filterExecutions : "Filtro ekzekutimet",
      filterExecutionEnums : {
        LastHalfHour: "Gjashtëdhjetë minutat e fundit",
        LastHour: "Një orë e fundit",
        Today: "Sot",
        Yesterday: "Dje",
        Last48Hours: "48 orët e fundit",
        SinceLastWeek: "Që nga java e kaluar",
      },
      noFlows: "Asnjë ekzekutim në lidhje me këtë rekord dhe filtrin e zgjedhur nuk është gjetur.",
      errorLoadingFlows: "Ndodhi një gabim gjatë ngarkimit të ekzekutimeve të lidhura me regjistrin. Ju lutemi provoni përsëri më vonë.",
    },
    bs: {
      recordsPerPage: "Zapisi po stranici",
      totalExecutions: "Ukupno pronađenih povezanih izvršenja",
      date: "Datum",
      flowName: "Naziv toka",
      flowStatus: "Status toka",
      action: "Akcija",
      actionStatus: "Status akcije",
      showExecution: "Prikaži izvršenje",
      previous: "Prethodno",
      next: "Sljedeće",
      page: "Stranica",
      of: "od ",
      flowStatusEnums: {
        failed: "Neuspješno",
        succeeded: "Uspješno",
        cancelled: "Otkazano",
        unknown: "Nepoznato",
      },
      filterExecutions : "Filtrirajte izvršenja",
      filterExecutionEnums : {
        LastHalfHour: "Posljednjih pola sata",
        LastHour: "Posljednji sat",
        Today: "Danas",
        Yesterday: "Juče",
        Last48Hours: "Posljednjih 48 sati",
        SinceLastWeek: "Od prošlog tjedna",
      },
      noFlows: "Nema izvršenja povezanih sa ovim zapisom i odabranim filtrima.",
      errorLoadingFlows: "Došlo je do greške prilikom učitavanja izvršenja povezanih sa zapisom. Pokušajte ponovo kasnije.",
    },
    ca: {
      recordsPerPage: "Registres per pàgina",
      totalExecutions: "Total d'execucions relacionades trobades",
      date: "Data",
      flowName: "Nom del flux",
      flowStatus: "Estat del flux",
      action: "Acció",
      actionStatus: "Estat de l'acció",
      showExecution: "Mostra execució",
      previous: "Anterior",
      next: "Següent",
      page: "Pàgina",
      of: "de ",
      flowStatusEnums: {
        failed: "Fallit",
        succeeded: "Amb èxit",
        cancelled: "Cancel·lat",
        unknown: "Desconegut",
      },
      filterExecutions : "Filtrar execucions",
      filterExecutionEnums : {
        LastHalfHour: "Última mitja hora",
        LastHour: "Última hora",
        Today: "Avui",
        Yesterday: "Ahir",
        Last48Hours: "Últimes 48 hores",
        SinceLastWeek: "Des de la setmana passada",
      },
      noFlows: "No s'han trobat execucions relacionades amb aquest registre i els filtres seleccionats.",
      errorLoadingFlows: "S'ha produït un error en carregar les execucions relacionades amb el registre. Torneu-ho a provar més tard.",
    },
    bg: {
      recordsPerPage: "Записи на страница",
      totalExecutions: "Общо намерени свързани изпълнения",
      date: "Дата",
      flowName: "Име на потока",
      flowStatus: "Състояние на потока",
      action: "Действие",
      actionStatus: "Състояние на действието",
      showExecution: "Покажи изпълнение",
      previous: "Предишен",
      next: "Следващ",
      page: "Страница",
      of: "от ",
      flowStatusEnums: {
        failed: "Неуспешно",
        succeeded: "Успешно",
        cancelled: "Отменено",
        unknown: "Неизвестно",
      },
      filterExecutions : "Филтриране на изпълнения",
      filterExecutionEnums : {
        LastHalfHour: "Последния половин час",
        LastHour: "Последния час",
        Today: "Днес",
        Yesterday: "Вчера",
        Last48Hours: "Последните 48 часа",
        SinceLastWeek: "От миналата седмица",
      },
      noFlows: "Не са намерени изпълнения, свързани с този запис и избраните филтри.",
      errorLoadingFlows: "Възникна грешка при зареждане на изпълненията, свързани с записа. Моля, опитайте отново по-късно.",
    },
    zh: {
      recordsPerPage: "每页记录",
      totalExecutions: "找到的相关执行总数",
      date: "日期",
      flowName: "流程名称",
      flowStatus: "流程状态",
      action: "操作",
      actionStatus: "操作状态",
      showExecution: "显示执行",
      previous: "上一页",
      next: "下一页",
      page: "页",
      of: "的 ",
      flowStatusEnums: {
        failed: "失败",
        succeeded: "成功",
        cancelled: "取消",
        unknown: "未知",
      },
      filterExecutions : "过滤执行",
      filterExecutionEnums : {
        LastHalfHour: "过去半小时",
        LastHour: "过去一小时",
        Today: "今天",
        Yesterday: "昨天",
        Last48Hours: "过去48小时",
        SinceLastWeek: "自上周以来",
      },
      noFlows: "未找到与此记录和所选过滤器相关的执行。",
      errorLoadingFlows: "加载与记录相关的执行时发生错误。请稍后再试。",
    },
    hr: {
      recordsPerPage: "Zapisi po stranici",
      totalExecutions: "Ukupno pronađenih povezanih izvršenja",
      date: "Datum",
      flowName: "Naziv toka",
      flowStatus: "Status toka",
      action: "Akcija",
      actionStatus: "Status akcije",
      showExecution: "Prikaži izvršenje",
      previous: "Prethodno",
      next: "Sljedeće",
      page: "Stranica",
      of: "od ",
      flowStatusEnums: {
        failed: "Neuspješno",
        succeeded: "Uspješno",
        cancelled: "Otkazano",
        unknown: "Nepoznato",
      },
      filterExecutions : "Filtriraj izvršenja",
      filterExecutionEnums : {
        LastHalfHour: "Posljednjih pola sata",
        LastHour: "Posljednji sat",
        Today: "Danas",
        Yesterday: "Juče",
        Last48Hours: "Posljednjih 48 sati",
        SinceLastWeek: "Od prošlog tjedna",
      },
      noFlows: "Nema izvršenja povezanih sa ovim zapisom i odabranim filtrima.",
      errorLoadingFlows: "Došlo je do greške prilikom učitavanja izvršenja povezanih sa zapisom. Pokušajte ponovo kasnije.",
    },
    cs: {
      recordsPerPage: "Záznamy na stránku",
      totalExecutions: "Celkem nalezeno souvisejících provedení",
      date: "Datum",
      flowName: "Název toku",
      flowStatus: "Stav toku",
      action: "Akce",
      actionStatus: "Stav akce",
      showExecution: "Vidi ovrha",
      previous: "Předchozí",
      next: "Další",
      page: "Stránka",
      of: "z ",
      flowStatusEnums: {
        failed: "Selhalo",
        succeeded: "Úspěšné",
        cancelled: "Zrušeno",
        unknown: "Neznámé",
      },
      filterExecutions : "Filtrovat provedení",
      filterExecutionEnums : {
        LastHalfHour: "Poslední půl hodiny",
        LastHour: "Poslední hodina",
        Today: "Dnes",
        Yesterday: "Včera",
        Last48Hours: "Posledních 48 hodin",
        SinceLastWeek: "Od minulého týdne",
      },
      noFlows: "Nebyly nalezeny žádné provedení související s tímto záznamem a vybranými filtry.",
      errorLoadingFlows: "Při načítání provedení souvisejících se záznamem došlo k chybě. Zkuste to prosím znovu později.",
    },
    da: {
      recordsPerPage: "Poster pr. side",
      totalExecutions: "Samlede relaterede udførelser fundet",
      date: "Dato",
      flowName: "Flow-navn",
      flowStatus: "Flow-status",
      action: "Handling",
      actionStatus: "Handlingsstatus",
      showExecution: "Se udførelse",
      previous: "Forrige",
      next: "Næste",
      page: "Side",
      of: "af ",
      flowStatusEnums: {
        failed: "Mislykket",
        succeeded: "Vellykket",
        cancelled: "Annulleret",
        unknown: "Ukendt",
      },
      filterExecutions : "Filtrer udførelser",
      filterExecutionEnums : {
        LastHalfHour: "Sidste halve time",
        LastHour: "Sidste time",
        Today: "I dag",
        Yesterday: "I går",
        Last48Hours: "Sidste 48 timer",
        SinceLastWeek: "Siden sidste uge",
      },
      noFlows: "Ingen udførelser relateret til denne post og de valgte filtre blev fundet.",
      errorLoadingFlows: "Der opstod en fejl under indlæsningen af udførelser relateret til posten. Prøv venligst igen senere.",
    },
    nl: {
      recordsPerPage: "Records per pagina",
      totalExecutions: "Totaal aantal gerelateerde uitvoeringen gevonden",
      date: "Datum",
      flowName: "Naam van de stroom",
      flowStatus: "Status van de stroom",
      action: "Actie",
      actionStatus: "Status van de actie",
      showExecution: "Zie uitvoering",
      previous: "Vorige",
      next: "Volgende",
      page: "Pagina",
      of: "van ",
      flowStatusEnums: {
        failed: "Mislukt",
        succeeded: "Geslaagd",
        cancelled: "Geannuleerd",
        unknown: "Onbekend",
      },
      filterExecutions : "Filter uitvoeringen",
      filterExecutionEnums : {
        LastHalfHour: "Laatste half uur",
        LastHour: "Laatste uur",
        Today: "Vandaag",
        Yesterday: "Gisteren",
        Last48Hours: "Laatste 48 uur",
        SinceLastWeek: "Sinds vorige week",
      },
      noFlows: "Geen uitvoeringen gevonden die verband houden met deze registratie en de geselecteerde filters.",
      errorLoadingFlows: "Er is een fout opgetreden bij het laden van de uitvoeringen die verband houden met de registratie. Probeer het later opnieuw.",
    },
    en: {
      recordsPerPage: "Records per page",
      totalExecutions: "Total related executions found",
      date: "Date",
      flowName: "Flow Name",
      flowStatus: "Flow Status",
      action: "Action",
      actionStatus: "Action Status",
      showExecution: "Show Execution",
      previous: "Previous",
      next: "Next",
      page: "Page",
      of: "of ",
      flowStatusEnums: {
          failed: "Failed",
          succeeded: "Succeeded",
          cancelled: "Cancelled",
          unknown: "Unknown",
      },
      filterExecutions : "Filter executions",
      filterExecutionEnums : {
        LastHalfHour: "Last half hour",
        LastHour: "Last hour",
        Today: "Today",
        Yesterday: "Yesterday",
        Last48Hours: "Last 48 hours",
        SinceLastWeek: "Since last week",
      },
      noFlows: "No executions related to this record and the selected filters were found.",
      errorLoadingFlows: "An error occurred while loading executions related to the record. Please try again later.",
    },
    et: {
      recordsPerPage: "Kirjed lehe kohta",
      totalExecutions: "Leitud seotud täitmiste koguarv",
      date: "Kuupäev",
      flowName: "Voo nimi",
      flowStatus: "Voo olek",
      action: "Tegevus",
      actionStatus: "Tegevuse olek",
      showExecution: "Vaata teostamist",
      previous: "Eelmine",
      next: "Järgmine",
      page: "Leht",
      of: "kohta ",
      flowStatusEnums: {
        failed: "Ebaõnnestus",
        succeeded: "Õnnestus",
        cancelled: "Tühistatud",
        unknown: "Tundmatu",
      },
      filterExecutions : "Filtreeri täitmised",
      filterExecutionEnums : {
        LastHalfHour: "Viimased pool tundi",
        LastHour: "Viimase tunni jooksul",
        Today: "Täna",
        Yesterday: "Eile",
        Last48Hours: "Viimased 48 tundi",
        SinceLastWeek: "Eelmisest nädalast alates",
      },
      noFlows: "Seda kirjet ja valitud filtreid seostavaid täitmisi ei leitud.",
      errorLoadingFlows: "Kirjega seotud täitmiste laadimisel tekkis tõrge. Palun proovige hiljem uuesti.",
    },
    fi: {
      recordsPerPage: "Tietueita per sivu",
      totalExecutions: "Löydettyjen liittyvien suoritusten kokonaismäärä",
      date: "Päivämäärä",
      flowName: "Virran nimi",
      flowStatus: "Virran tila",
      action: "Toiminto",
      actionStatus: "Toiminnon tila",
      showExecution: "Katso toteutus",
      previous: "Edellinen",
      next: "Seuraava",
      page: "Sivu",
      of: " / ",
      flowStatusEnums: {
        failed: "Epäonnistui",
        succeeded: "Onnistui",
        cancelled: "Peruutettu",
        unknown: "Tuntematon",
      },
      filterExecutions : "Suodata suorituksia",
      filterExecutionEnums : {
        LastHalfHour: "Viimeinen puoli tuntia",
        LastHour: "Viimeinen tunti",
        Today: "Tänään",
        Yesterday: "Eilen",
        Last48Hours: "Viimeiset 48 tuntia",
        SinceLastWeek: "Viime viikosta lähtien",
      },
      noFlows: "Tätä tietuetta ja valittuja suodattimia ei löytynyt liittyviä suorituksia.",
      errorLoadingFlows: "Tapahtui virhe ladattaessa tietueeseen liittyviä suorituksia. Yritä myöhemmin uudelleen.",
    },
    fr: {
      recordsPerPage: "Enregistrements par page",
      totalExecutions: "Total des exécutions liées trouvées",
      date: "Date",
      flowName: "Nom du flux",
      flowStatus: "État du flux",
      action: "Action",
      actionStatus: "État de l'action",
      showExecution: "Voir l'exécution",
      previous: "Précédent",
      next: "Suivant",
      page: "Page",
      of: "de ",
      flowStatusEnums: {
        failed: "Échoué",
        succeeded: "Réussi",
        cancelled: "Annulé",
        unknown: "Inconnu",
      },
      filterExecutions: "Filtrer les exécutions",
      filterExecutionEnums: {
        LastHalfHour: "Dernière demi-heure",
        LastHour: "Dernière heure",
        Today: "Aujourd'hui",
        Yesterday: "Hier",
        Last48Hours: "Dernières 48 heures",
        SinceLastWeek: "Depuis la semaine dernière",
      },
      noFlows: "Aucune exécution liée à cet enregistrement et aux filtres sélectionnés n'a été trouvée.",
      errorLoadingFlows: "Une erreur s'est produite lors du chargement des exécutions liées à l'enregistrement. Veuillez réessayer plus tard.",
    },
    de: {
      recordsPerPage: "Datensätze pro Seite",
      totalExecutions: "Insgesamt gefundene verwandte Ausführungen",
      date: "Datum",
      flowName: "Flussname",
      flowStatus: "Flussstatus",
      action: "Aktion",
      actionStatus: "Aktionsstatus",
      showExecution: "Siehe Ausführung",
      previous: "Vorherige",
      next: "Nächste",
      page: "Seite",
      of: "von ",
      flowStatusEnums: {
        failed: "Fehlgeschlagen",
        succeeded: "Erfolgreich",
        cancelled: "Abgebrochen",
        unknown: "Unbekannt",
      },
      filterExecutions: "Ausführungen filtern",
      filterExecutionEnums: {
        LastHalfHour: "Letzte halbe Stunde",
        LastHour: "Letzte Stunde",
        Today: "Heute",
        Yesterday: "Gestern",
        Last48Hours: "Letzte 48 Stunden",
        SinceLastWeek: "Seit letzter Woche",
      },
      noFlows: "Keine Ausführungen gefunden, die mit diesem Datensatz und den ausgewählten Filtern verbunden sind.",
      errorLoadingFlows: "Beim Laden der mit dem Datensatz verbundenen Ausführungen ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
    },
    el: {
      recordsPerPage: "Εγγραφές ανά σελίδα",
      totalExecutions: "Συνολικές σχετικές εκτελέσεις που βρέθηκαν",
      date: "Ημερομηνία",
      flowName: "Όνομα ροής",
      flowStatus: "Κατάσταση ροής",
      action: "Ενέργεια",
      actionStatus: "Κατάσταση ενέργειας",
      showExecution: "Δείτε την εκτέλεση",
      previous: "Προηγούμενο",
      next: "Επόμενο",
      page: "Σελίδα",
      of: "από ",
      flowStatusEnums: {
        failed: "Απέτυχε",
        succeeded: "Επιτυχής",
        cancelled: "Ακυρώθηκε",
        unknown: "Άγνωστο",
      },
      filterExecutions: "Φιλτράρισμα εκτελέσεων",
      filterExecutionEnums: {
        LastHalfHour: "Τελευταία μισή ώρα",
        LastHour: "Τελευταία ώρα",
        Today: "Σήμερα",
        Yesterday: "Χθες",
        Last48Hours: "Τελευταίες 48 ώρες",
        SinceLastWeek: "Από την περασμένη εβδομάδα",
      },
      noFlows: "Δεν βρέθηκαν εκτελέσεις που σχετίζονται με αυτή την εγγραφή και τα επιλεγμένα φίλτρα.",
      errorLoadingFlows: "Παρουσιάστηκε σφάλμα κατά τη φόρτωση των εκτελέσεων που σχετίζονται με την εγγραφή. Δοκιμάστε ξανά αργότερα.",
    },
    hu: {
      recordsPerPage: "Rekordok oldalanként",
      totalExecutions: "Összes kapcsolódó végrehajtás megtalálva",
      date: "Dátum",
      flowName: "Folyamat neve",
      flowStatus: "Folyamat állapota",
      action: "Művelet",
      actionStatus: "Művelet állapota",
      showExecution: "Lásd a végrehajtást",
      previous: "Előző",
      next: "Következő",
      page: "Oldal",
      of: " / ",
      flowStatusEnums: {
        failed: "Sikertelen",
        succeeded: "Sikeres",
        cancelled: "Törölve",
        unknown: "Ismeretlen",
      },
      filterExecutions: "Szűrje a végrehajtásokat",
      filterExecutionEnums: {
        LastHalfHour: "Utolsó fél óra",
        LastHour: "Utolsó óra",
        Today: "Ma",
        Yesterday: "Tegnap",
        Last48Hours: "Utolsó 48 óra",
        SinceLastWeek: "A múlt hét óta",
      },
      noFlows: "Ehhez a rekordhoz és a kiválasztott szűrőkhöz kapcsolódó végrehajtásokat nem találtak.",
      errorLoadingFlows: "Hiba történt a rekordhoz kapcsolódó végrehajtások betöltésekor. Kérjük, próbálja újra később.",
    },
    is: {
      recordsPerPage: "Færslur á síðu",
      totalExecutions: "Heildarfjöldi tengdra keyrslna fundinn",
      date: "Dagsetning",
      flowName: "Nafn flæðis",
      flowStatus: "Staða flæðis",
      action: "Aðgerð",
      actionStatus: "Staða aðgerðar",
      showExecution: "Sjá framkvæmd",
      previous: "Fyrri",
      next: "Næsta",
      page: "Síða",
      of: "af ",
      flowStatusEnums: {
        failed: "Mistókst",
        succeeded: "Tókst",
        cancelled: "Hætt við",
        unknown: "Óþekkt",
      },
      filterExecutions: "Sía keyrslur",
      filterExecutionEnums: {
        LastHalfHour: "Síðasta hálftíma",
        LastHour: "Síðasta klukkustund",
        Today: "Í dag",
        Yesterday: "Í gær",
        Last48Hours: "Síðustu 48 klukkustundir",
        SinceLastWeek: "Frá síðustu viku",
      },
      noFlows: "Engar keyrslur tengdar þessari skráningu og valda síum fundust.",
      errorLoadingFlows: "Villa kom upp við að hlaða keyrslum tengdum skráningunni. Vinsamlegast reyndu aftur síðar.",
    },
    it: {
      recordsPerPage: "Record per pagina",
      totalExecutions: "Totale esecuzioni correlate trovate",
      date: "Data",
      flowName: "Nome del flusso",
      flowStatus: "Stato del flusso",
      action: "Azione",
      actionStatus: "Stato dell'azione",
      showExecution: "Vedi esecuzione",
      previous: "Precedente",
      next: "Prossimo",
      page: "Pagina",
      of: "di ",
      flowStatusEnums: {
        failed: "Fallito",
        succeeded: "Riuscito",
        cancelled: "Annullato",
        unknown: "Sconosciuto",
      },
      filterExecutions: "Filtra esecuzioni",
      filterExecutionEnums: {
        LastHalfHour: "Ultima mezz'ora",
        LastHour: "Ultima ora",
        Today: "Oggi",
        Yesterday: "Ieri",
        Last48Hours: "Ultime 48 ore",
        SinceLastWeek: "Dalla scorsa settimana",
      },
      noFlows: "Nessuna esecuzione trovata relativa a questo record e ai filtri selezionati.",
      errorLoadingFlows: "Si è verificato un errore durante il caricamento delle esecuzioni correlate al record. Si prega di riprovare più tardi.",
    },
    ja: {
      recordsPerPage: "ページごとの記録",
      totalExecutions: "関連する実行の合計が見つかりました",
      date: "日付",
      flowName: "フロー名",
      flowStatus: "フローステータス",
      action: "アクション",
      actionStatus: "アクションステータス",
      showExecution: "処刑を見る",
      previous: "前へ",
      next: "次へ",
      page: "ページ",
      of: "の ",
      flowStatusEnums: {
        failed: "失敗",
        succeeded: "成功",
        cancelled: "キャンセル",
        unknown: "不明",
      },
      filterExecutions: "実行をフィルタリング",
      filterExecutionEnums: {
        LastHalfHour: "過去30分",
        LastHour: "過去1時間",
        Today: "今日",
        Yesterday: "昨日",
        Last48Hours: "過去48時間",
        SinceLastWeek: "先週から",
      },
      noFlows: "このレコードと選択したフィルターに関連する実行は見つかりませんでした。",
      errorLoadingFlows: "レコードに関連する実行の読み込み中にエラーが発生しました。後でもう一度試してください。",
    },
    ko: {
      recordsPerPage: "페이지당 기록",
      totalExecutions: "관련 실행 총계",
      date: "날짜",
      flowName: "흐름 이름",
      flowStatus: "흐름 상태",
      action: "작업",
      actionStatus: "작업 상태",
      showExecution: "실행을 참조하세요",
      previous: "이전",
      next: "다음",
      page: "페이지",
      of: "의 ",
      flowStatusEnums: {
        failed: "실패",
        succeeded: "성공",
        cancelled: "취소됨",
        unknown: "알 수 없음",
      },
      filterExecutions: "실행 필터링",
      filterExecutionEnums: {
        LastHalfHour: "마지막 반 시간",
        LastHour: "마지막 시간",
        Today: "오늘",
        Yesterday: "어제",
        Last48Hours: "지난 48시간",
        SinceLastWeek: "지난주부터",
      },
      noFlows: "이 레코드 및 선택한 필터와 관련된 실행을 찾을 수 없습니다.",
      errorLoadingFlows: "레코드와 관련된 실행을 로드하는 동안 오류가 발생했습니다. 나중에 다시 시도하십시오.",
    },
    lv: {
      recordsPerPage: "Ieraksti vienā lapā",
      totalExecutions: "Kopējais atrasto izpildījumu skaits",
      date: "Datums",
      flowName: "Plūsmas nosaukums",
      flowStatus: "Plūsmas statuss",
      action: "Darbība",
      actionStatus: "Darbības statuss",
      showExecution: "Skatiet sadaļu Izpilde",
      previous: "Iepriekšējais",
      next: "Nākamais",
      page: "Lapa",
      of: "no ",
      flowStatusEnums: {
        failed: "Neizdevās",
        succeeded: "Izdevās",
        cancelled: "Atcelts",
        unknown: "Nezināms",
      },
      filterExecutions: "Filtrēt izpildes",
      filterExecutionEnums: {
        LastHalfHour: "Pēdējās pusstundas laikā",
        LastHour: "Pēdējā stundā",
        Today: "Šodien",
        Yesterday: "Vakar",
        Last48Hours: "Pēdējās 48 stundas",
        SinceLastWeek: "Kopš pagājušās nedēļas",
      },
      noFlows: "Nav atrastas izpildes, kas saistītas ar šo ierakstu un izvēlētajiem filtriem.",
      errorLoadingFlows: "Ieraksta izpildes ielādes laikā radās kļūda. Lūdzu, mēģiniet vēlreiz vēlāk.",
    },
    lt: {
      recordsPerPage: "Įrašai viename puslapyje",
      totalExecutions: "Iš viso rasta susijusių vykdymų",
      date: "Data",
      flowName: "Srauto pavadinimas",
      flowStatus: "Srauto būsena",
      action: "Veiksmas",
      actionStatus: "Veiksmo būsena",
      showExecution: "Žr. Vykdymas",
      previous: "Ankstesnis",
      next: "Kitas",
      page: "Puslapis",
      of: "iš ",
      flowStatusEnums: {
        failed: "Nepavyko",
        succeeded: "Pavyko",
        cancelled: "Atšaukta",
        unknown: "Nežinoma",
      },
      filterExecutions: "Filtruoti vykdymus",
      filterExecutionEnums: {
        LastHalfHour: "Paskutinį pusvalandį",
        LastHour: "Paskutinę valandą",
        Today: "Šiandien",
        Yesterday: "Vakar",
        Last48Hours: "Paskutines 48 valandas",
        SinceLastWeek: "Nuo praėjusios savaitės",
      },
      noFlows: "Nerasta vykdymų, susijusių su šiuo įrašu ir pasirinktais filtrais.",
      errorLoadingFlows: "Įvyko klaida, įkeliant vykdymus, susijusius su įrašu. Prašome bandyti vėl vėliau.",
    },
    mk: {
      recordsPerPage: "Записи по страница",
      totalExecutions: "Вкупно пронајдени поврзани извршувања",
      date: "Датум",
      flowName: "Име на текот",
      flowStatus: "Статус на текот",
      action: "Акција",
      actionStatus: "Статус на акцијата",
      showExecution: "Видете Извршување",
      previous: "Претходно",
      next: "Следно",
      page: "Страница",
      of: "од ",
      flowStatusEnums: {
        failed: "Неуспешно",
        succeeded: "Успешно",
        cancelled: "Откажано",
        unknown: "Непознато",
      },
      filterExecutions: "Филтрирајте извршувања",
      filterExecutionEnums: {
        LastHalfHour: "Последните половина час",
        LastHour: "Последниот час",
        Today: "Денес",
        Yesterday: "Вчера",
        Last48Hours: "Последните 48 часа",
        SinceLastWeek: "Од минатата недела",
      },
      noFlows: "Не се пронајдени извршувања поврзани со овој запис и избраните филтри.",
      errorLoadingFlows: "Настана грешка при вчитување на извршувањата поврзани со записот. Ве молиме обидете се повторно подоцна.",
    },
    nb: {
      recordsPerPage: "Poster per side",
      totalExecutions: "Totalt relaterte utførelser funnet",
      date: "Dato",
      flowName: "Flytnavn",
      flowStatus: "Flytstatus",
      action: "Handling",
      actionStatus: "Handlingsstatus",
      showExecution: "Se utførelse",
      previous: "Forrige",
      next: "Neste",
      page: "Side",
      of: "av ",
      flowStatusEnums: {
        failed: "Mislyktes",
        succeeded: "Vellykket",
        cancelled: "Avbrutt",
        unknown: "Ukjent",
      },
      filterExecutions: "Filtrer utførelser",
      filterExecutionEnums: {
        LastHalfHour: "Siste halve time",
        LastHour: "Siste time",
        Today: "I dag",
        Yesterday: "I går",
        Last48Hours: "Siste 48 timer",
        SinceLastWeek: "Siden forrige uke",
      },
      noFlows: "Ingen utførelser relatert til denne posten og de valgte filtrene ble funnet.",
      errorLoadingFlows: "Det oppstod en feil under lasting av utførelser relatert til posten. Vennligst prøv igjen senere.",
    },
    pl: {
      recordsPerPage: "Rekordy na stronę",
      totalExecutions: "Łączna liczba znalezionych powiązanych wykonania",
      date: "Data",
      flowName: "Nazwa przepływu",
      flowStatus: "Status przepływu",
      action: "Akcja",
      actionStatus: "Status akcji",
      showExecution: "Zobacz wykonanie",
      previous: "Poprzedni",
      next: "Następny",
      page: "Strona",
      of: "z ",
      flowStatusEnums: {
        failed: "Niepowodzenie",
        succeeded: "Sukces",
        cancelled: "Anulowano",
        unknown: "Nieznany",
      },
      filterExecutions: "Filtruj wykonania",
      filterExecutionEnums: {
        LastHalfHour: "Ostatnia pół godziny",
        LastHour: "Ostatnia godzina",
        Today: "Dziś",
        Yesterday: "Wczoraj",
        Last48Hours: "Ostatnie 48 godzin",
        SinceLastWeek: "Od zeszłego tygodnia",
      },
      noFlows: "Nie znaleziono wykonania związanych z tym rekordem i wybranymi filtrami.",
      errorLoadingFlows: "Wystąpił błąd podczas ładowania wykonania związanych z rekordem. Proszę spróbować ponownie później.",
    },
    pt: {
      recordsPerPage: "Registros por página",
      totalExecutions: "Total de execuções relacionadas encontradas",
      date: "Data",
      flowName: "Nome do fluxo",
      flowStatus: "Status do fluxo",
      action: "Ação",
      actionStatus: "Status da ação",
      showExecution: "Veja a execução",
      previous: "Anterior",
      next: "Próximo",
      page: "Página",
      of: "de ",
      flowStatusEnums: {
        failed: "Falhou",
        succeeded: "Bem-sucedido",
        cancelled: "Cancelado",
        unknown: "Desconhecido",
      },
      filterExecutions: "Filtrar execuções",
      filterExecutionEnums: {
        LastHalfHour: "Última meia hora",
        LastHour: "Última hora",
        Today: "Hoje",
        Yesterday: "Ontem",
        Last48Hours: "Últimas 48 horas",
        SinceLastWeek: "Desde a semana passada",
      },
      noFlows: "Nenhuma execução relacionada a este registro e aos filtros selecionados foi encontrada.",
      errorLoadingFlows: "Ocorreu um erro ao carregar as execuções relacionadas ao registro. Tente novamente mais tarde.",
    },
    ro: {
      recordsPerPage: "Înregistrări pe pagină",
      totalExecutions: "Total execuții conexe găsite",
      date: "Data",
      flowName: "Nume flux",
      flowStatus: "Stare flux",
      action: "Acțiune",
      actionStatus: "Stare acțiune",
      showExecution: "Vezi Execuție",
      previous: "Anterior",
      next: "Următor",
      page: "Pagină",
      of: "din ",
      flowStatusEnums: {
        failed: "Eșuat",
        succeeded: "Reușit",
        cancelled: "Anulat",
        unknown: "Necunoscut",
      },
      filterExecutions: "Filtrare execuții",
      filterExecutionEnums: {
        LastHalfHour: "Ultima jumătate de oră",
        LastHour: "Ultima oră",
        Today: "Astăzi",
        Yesterday: "Ieri",
        Last48Hours: "Ultimele 48 de ore",
        SinceLastWeek: "De săptămâna trecută",
      },
      noFlows: "Nu au fost găsite execuții legate de acest înregistrare și filtrele selectate.",
      errorLoadingFlows: "A apărut o eroare la încărcarea execuțiilor legate de înregistrare. Vă rugăm să încercați din nou mai târziu.",
    },
    ru: {
      recordsPerPage: "Записей на страницу",
      totalExecutions: "Всего найдено связанных выполнений",
      date: "Дата",
      flowName: "Имя потока",
      flowStatus: "Статус потока",
      action: "Действие",
      actionStatus: "Статус действия",
      showExecution: "Смотреть исполнение",
      previous: "Предыдущий",
      next: "Следующий",
      page: "Страница",
      of: "из ",
      flowStatusEnums: {
        failed: "Неудача",
        succeeded: "Успех",
        cancelled: "Отменено",
        unknown: "Неизвестно",
      },
      filterExecutions: "Фильтровать исполнения",
      filterExecutionEnums: {
        LastHalfHour: "Последние полчаса",
        LastHour: "Последний час",
        Today: "Сегодня",
        Yesterday: "Вчера",
        Last48Hours: "Последние 48 часов",
        SinceLastWeek: "С прошлой недели",
      },
      noFlows: "Не найдено исполнений, связанных с этой записью и выбранными фильтрами.",
      errorLoadingFlows: "Произошла ошибка при загрузке исполнений, связанных с записью. Пожалуйста, попробуйте еще раз позже.",
    },
    sr: {
      recordsPerPage: "Записи по страници",
      totalExecutions: "Укупно пронађених повезаних извршења",
      date: "Датум",
      flowName: "Назив тока",
      flowStatus: "Статус тока",
      action: "Акција",
      actionStatus: "Статус акције",
      showExecution: "Погледајте Извршење",
      previous: "Претходно",
      next: "Следеће",
      page: "Страница",
      of: "од ",
      flowStatusEnums: {
        failed: "Неуспешно",
        succeeded: "Успешно",
        cancelled: "Отказано",
        unknown: "Непознато",
      },
      filterExecutions: "Филтрирајте извршења",
      filterExecutionEnums: {
        LastHalfHour: "Последња пола сата",
        LastHour: "Последњи сат",
        Today: "Данас",
        Yesterday: "Јуче",
        Last48Hours: "Последњих 48 сати",
        SinceLastWeek: "Од прошле недеље",
      },
      noFlows: "Нису пронађена извршења повезана са овом евиденцијом и одабраним филтерима.",
      errorLoadingFlows: "Дошло је до грешке приликом учитавања извршења повезаних са евиденцијом. Молимо покушајте поново касније.",
    },
    sk: {
      recordsPerPage: "Záznamy na stránku",
      totalExecutions: "Celkový počet nájdených súvisiacich vykonaní",
      date: "Dátum",
      flowName: "Názov toku",
      flowStatus: "Stav toku",
      action: "Akcia",
      actionStatus: "Stav akcie",
      showExecution: "Pozri Vykonanie",
      previous: "Predchádzajúce",
      next: "Ďalšie",
      page: "Stránka",
      of: "z ",
      flowStatusEnums: {
        failed: "Zlyhalo",
        succeeded: "Úspešné",
        cancelled: "Zrušené",
        unknown: "Neznáme",
      },
      filterExecutions: "Filtrovať vykonania",
      filterExecutionEnums: {
        LastHalfHour: "Posledná polhodina",
        LastHour: "Posledná hodina",
        Today: "Dnes",
        Yesterday: "Včera",
        Last48Hours: "Posledných 48 hodín",
        SinceLastWeek: "Od minulého týždňa",
      },
      noFlows: "Nenašli sa žiadne vykonania súvisiace s týmto záznamom a vybranými filtrami.",
      errorLoadingFlows: "Pri načítaní vykonaní súvisiacich so záznamom došlo k chybe. Skúste to znova neskôr.",
    },
    sl: {
      recordsPerPage: "Zapisov na stran",
      totalExecutions: "Skupno število najdenih povezanih izvedb",
      date: "Datum",
      flowName: "Ime toka",
      flowStatus: "Stanje toka",
      action: "Dejanje",
      actionStatus: "Stanje dejanja",
      showExecution: "Glejte Izvedba",
      previous: "Prejšnje",
      next: "Naslednje",
      page: "Stran",
      of: "od ",
      flowStatusEnums: {
        failed: "Neuspešno",
        succeeded: "Uspešno",
        cancelled: "Preklicano",
        unknown: "Neznano",
      },
      filterExecutions: "Filtriraj izvedbe",
      filterExecutionEnums: {
        LastHalfHour: "Zadnja pol ure",
        LastHour: "Zadnja ura",
        Today: "Danes",
        Yesterday: "Včeraj",
        Last48Hours: "Zadnjih 48 ur",
        SinceLastWeek: "Od prejšnjega tedna",
      },
      noFlows: "Ni bilo najdenih izvedb, povezanih s tem zapisom in izbranimi filtri.",
      errorLoadingFlows: "Pri nalaganju izvedb, povezanih z zapisom, je prišlo do napake. Poskusite znova pozneje.",
    },
    es: {
      recordsPerPage: "Registros por página",
      totalExecutions: "Total de ejecuciones relacionadas encontradas",
      date: "Fecha",
      flowName: "Nombre del flujo",
      flowStatus: "Estado del flujo",
      action: "Acción",
      actionStatus: "Estado de la acción",
      showExecution: "Ver ejecución",
      previous: "Anterior",
      next: "Siguiente",
      page: "Página",
      of: "de ",
      flowStatusEnums: {
        failed: "Fallido",
        succeeded: "Exitoso",
        cancelled: "Cancelado",
        unknown: "Desconocido",
      },
      filterExecutions: "Filtrar ejecuciones",
      filterExecutionEnums: {
        LastHalfHour: "Última media hora",
        LastHour: "Última hora",
        Today: "Hoy",
        Yesterday: "Ayer",
        Last48Hours: "Últimas 48 horas",
        SinceLastWeek: "Desde la semana pasada",
      },
      noFlows: "No se encontraron ejecuciones relacionadas con este registro y los filtros seleccionados.",
      errorLoadingFlows: "Se produjo un error al cargar las ejecuciones relacionadas con el registro. Inténtelo de nuevo más tarde.",
    },
    sv: {
      recordsPerPage: "Poster per sida",
      totalExecutions: "Totalt antal relaterade körningar hittade",
      date: "Datum",
      flowName: "Flödesnamn",
      flowStatus: "Flödesstatus",
      action: "Åtgärd",
      actionStatus: "Åtgärdsstatus",
      showExecution: "Se utförande",
      previous: "Föregående",
      next: "Nästa",
      page: "Sida",
      of: "av ",
      flowStatusEnums: {
        failed: "Misslyckades",
        succeeded: "Lyckades",
        cancelled: "Avbruten",
        unknown: "Okänd",
      },
      filterExecutions: "Filtrera körningar",
      filterExecutionEnums: {
        LastHalfHour: "Senaste halvtimmen",
        LastHour: "Senaste timmen",
        Today: "Idag",
        Yesterday: "Igår",
        Last48Hours: "Senaste 48 timmarna",
        SinceLastWeek: "Sedan förra veckan",
      },
      noFlows: "Inga körningar relaterade till denna post och de valda filtren hittades.",
      errorLoadingFlows: "Ett fel inträffade när körningar relaterade till posten skulle laddas. Försök igen senare.",
    },
    th: {
      recordsPerPage: "ระเบียนต่อหน้า",
      totalExecutions: "การดำเนินการที่เกี่ยวข้องทั้งหมดที่พบ",
      date: "วันที่",
      flowName: "ชื่อโฟลว์",
      flowStatus: "สถานะโฟลว์",
      action: "การกระทำ",
      actionStatus: "สถานะการกระทำ",
      showExecution: "ดูการดำเนินการ",
      previous: "ก่อนหน้า",
      next: "ถัดไป",
      page: "หน้า",
      of: "ของ ",
      flowStatusEnums: {
        failed: "ล้มเหลว",
        succeeded: "สำเร็จ",
        cancelled: "ยกเลิก",
        unknown: "ไม่ทราบ",
      },
      filterExecutions: "กรองการดำเนินการ",
      filterExecutionEnums: {
        LastHalfHour: "ครึ่งชั่วโมงที่ผ่านมา",
        LastHour: "ชั่วโมงที่ผ่านมา",
        Today: "วันนี้",
        Yesterday: "เมื่อวาน",
        Last48Hours: "48 ชั่วโมงที่ผ่านมา",
        SinceLastWeek: "ตั้งแต่สัปดาห์ที่แล้ว",
      },
      noFlows: "ไม่พบการดำเนินการที่เกี่ยวข้องกับระเบียนนี้และตัวกรองที่เลือก",
      errorLoadingFlows: "เกิดข้อผิดพลาดขณะโหลดการดำเนินการที่เกี่ยวข้องกับระเบียน โปรดลองอีกครั้งในภายหลัง",
    },
    tr: {
      recordsPerPage: "Sayfa başına kayıt",
      totalExecutions: "Bulunan toplam ilgili yürütme",
      date: "Tarih",
      flowName: "Akış Adı",
      flowStatus: "Akış Durumu",
      action: "Eylem",
      actionStatus: "Eylem Durumu",
      showExecution: "İnfazı gör",
      previous: "Önceki",
      next: "Sonraki",
      page: "Sayfa",
      of: "nin ",
      flowStatusEnums: {
        failed: "Başarısız",
        succeeded: "Başarılı",
        cancelled: "İptal Edildi",
        unknown: "Bilinmiyor",
      },
      filterExecutions: "Yürütmeleri filtrele",
      filterExecutionEnums: {
        LastHalfHour: "Son yarım saat",
        LastHour: "Son saat",
        Today: "Bugün",
        Yesterday: "Dün",
        Last48Hours: "Son 48 saat",
        SinceLastWeek: "Geçen haftadan beri",
      },
      noFlows: "Bu kayıt ve seçilen filtrelerle ilgili yürütmeler bulunamadı.",
      errorLoadingFlows: "Kayıtla ilgili yürütmeleri yüklerken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    },
    uk: {
      recordsPerPage: "Записів на сторінку",
      totalExecutions: "Знайдено загальну кількість пов'язаних виконань",
      date: "Дата",
      flowName: "Назва потоку",
      flowStatus: "Статус потоку",
      action: "Дія",
      actionStatus: "Статус дії",
      showExecution: "Дивіться виконання",
      previous: "Попередній",
      next: "Наступний",
      page: "Сторінка",
      of: "з ",
      flowStatusEnums: {
        failed: "Не вдалося",
        succeeded: "Успішно",
        cancelled: "Скасовано",
        unknown: "Невідомо",
      },
      filterExecutions: "Фільтрувати виконання",
      filterExecutionEnums: {
        LastHalfHour: "Останні півгодини",
        LastHour: "Остання година",
        Today: "Сьогодні",
        Yesterday: "Вчора",
        Last48Hours: "Останні 48 годин",
        SinceLastWeek: "З минулого тижня",
      },
      noFlows: "Не знайдено виконань, пов'язаних з цим записом та вибраними фільтрами.",
      errorLoadingFlows: "Сталася помилка під час завантаження виконань, пов'язаних із записом. Будь ласка, спробуйте ще раз пізніше.",
    },
    vi: {
      recordsPerPage: "Bản ghi mỗi trang",
      totalExecutions: "Tổng số lần thực thi liên quan được tìm thấy",
      date: "Ngày",
      flowName: "Tên luồng",
      flowStatus: "Trạng thái luồng",
      action: "Hành động",
      actionStatus: "Trạng thái hành động",
      showExecution: "Xem thực hiện",
      previous: "Trước",
      next: "Tiếp theo",
      page: "Trang",
      of: "của ",
      flowStatusEnums: {
        failed: "Thất bại",
        succeeded: "Thành công",
        cancelled: "Đã hủy",
        unknown: "Không rõ",
      },
      filterExecutions: "Lọc thực thi",
      filterExecutionEnums: {
        LastHalfHour: "Nửa giờ trước",
        LastHour: "Giờ trước",
        Today: "Hôm nay",
        Yesterday: "Hôm qua",
        Last48Hours: "48 giờ trước",
        SinceLastWeek: "Kể từ tuần trước",
      },
      noFlows: "Không tìm thấy bất kỳ lần thực thi nào liên quan đến bản ghi này và các bộ lọc đã chọn.",
      errorLoadingFlows: "Đã xảy ra lỗi khi tải các lần thực thi liên quan đến bản ghi. Vui lòng thử lại sau.",
    }   
  };