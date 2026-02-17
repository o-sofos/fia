/**
 * Internationalization translations for Fia documentation
 * Supports: English (en), German (de), Greek (el)
 */

export type Language = "en" | "de" | "el";

export interface Translations {
  // Navbar
  nav: {
    docs: string;
    github: string;
    examples: string;
  };

  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    getStarted: string;
    viewDocs: string;
    features: {
      reactive: {
        title: string;
        desc: string;
      };
      performance: {
        title: string;
        desc: string;
      };
      typescript: {
        title: string;
        desc: string;
      };
      bundle: {
        title: string;
        desc: string;
      };
    };
  };

  // Features Section
  features: {
    title: string;
    subtitle: string;
    items: {
      noVdom: {
        title: string;
        desc: string;
      };
      signals: {
        title: string;
        desc: string;
      };
      typescript: {
        title: string;
        desc: string;
      };
      accessibility: {
        title: string;
        desc: string;
      };
      zeroDeps: {
        title: string;
        desc: string;
      };
      tiny: {
        title: string;
        desc: string;
      };
      delegation: {
        title: string;
        desc: string;
      };
      batching: {
        title: string;
        desc: string;
      };
    };
  };

  // Code Demo
  demo: {
    tryIt: string;
    interactive: string;
  };

  // Docs Section
  docs: {
    tableOfContents: string;
    introduction: string;
    whyFia: string;
    gettingStarted: string;
    elementApi: string;
    elementFactoryTypes: string;
    reactivity: string;
    immutability: string;
    controlFlow: string;
    components: string;
    performance: string;
    installation: {
      title: string;
      npm: string;
      bun: string;
      deno: string;
    };
    quickStart: {
      title: string;
    };
    coreApi: {
      title: string;
      signals: string;
      elements: string;
      control: string;
    };
    examples: {
      title: string;
      counter: string;
      todoList: string;
      form: string;
    };
    bundleSizes: {
      title: string;
      description: string;
      minimal: string;
      full: string;
      notes: string;
      tableHeaders: {
        framework: string;
        minimal: string;
        full: string;
        notes: string;
      };
    };
    copyCode: string;
    copied: string;
  };

  // Footer
  footer: {
    tagline: string;
    madeWith: string;
    by: string;
  };

  // Common
  common: {
    language: string;
    darkMode: string;
    lightMode: string;
  };
}

export const translations: Record<Language, Translations> = {
  // English
  en: {
    nav: {
      docs: "Docs",
      github: "GitHub",
      examples: "Examples",
    },
    hero: {
      title: "Bare Metal JavaScript",
      subtitle: "Value Native.",
      getStarted: "Get Started",
      viewDocs: "View Docs",
      features: {
        reactive: {
          title: "Fine-Grained",
          desc: "Signals update only what changes",
        },
        performance: {
          title: "Fast",
          desc: "Direct DOM, no virtual DOM overhead",
        },
        typescript: {
          title: "Type-Safe",
          desc: "Full TypeScript support with inference",
        },
        bundle: {
          title: "Tiny",
          desc: "~4KB gzipped, tree-shakeable",
        },
      },
    },
    features: {
      title: "Why Fia?",
      subtitle: "Everything you need, nothing you don't",
      items: {
        noVdom: {
          title: "Zero Virtual DOM",
          desc: "Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.",
        },
        signals: {
          title: "Fine-Grained Reactivity",
          desc: "Signals track dependencies automatically. Only what changes updates.",
        },
        typescript: {
          title: "Type Safe",
          desc: "Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.",
        },
        accessibility: {
          title: "Accessibility First",
          desc: "WCAG compliance built-in. Advanced ARIA types with literal values and role-specific attribute suggestions.",
        },
        zeroDeps: {
          title: "Zero Dependencies",
          desc: "No npm packages. No supply chain risk. No version conflicts. Just pure JavaScript.",
        },
        tiny: {
          title: "Tiny Bundle",
          desc: "Only ~4KB gzipped. Smaller than most utility libraries. Fast to download, fast to parse.",
        },
        delegation: {
          title: "Event Delegation",
          desc: "Single delegated listener per event type.",
        },
        batching: {
          title: "Fragment Batching",
          desc: "Automatic DocumentFragment batching. No more intermediate nodes or layout thrashing.",
        },
      },
    },
    demo: {
      tryIt: "Try it yourself",
      interactive: "Interactive counter demo",
    },
    docs: {
      tableOfContents: "Table of Contents",
      introduction: "Introduction",
      whyFia: "Why Fia?",
      gettingStarted: "Getting Started",
      elementApi: "Element API",
      elementFactoryTypes: "Element Factory Types",
      reactivity: "Reactivity",
      immutability: "Immutability",
      controlFlow: "Control Flow",
      components: "Component Composition",
      performance: "Performance",
      installation: {
        title: "Installation",
        npm: "npm",
        bun: "Bun",
        deno: "Deno",
      },
      quickStart: {
        title: "Quick Start",
      },
      coreApi: {
        title: "Core API",
        signals: "Signals",
        elements: "Elements",
        control: "Control Flow",
      },
      examples: {
        title: "Examples",
        counter: "Counter",
        todoList: "Todo List",
        form: "Form Validation",
      },
      bundleSizes: {
        title: "Bundle Sizes",
        description: "Fia is designed to be incredibly small while remaining feature-complete.",
        minimal: "Minimal",
        full: "Full App",
        notes: "Notes",
        tableHeaders: {
          framework: "Framework",
          minimal: "Minimal (gzip)",
          full: "Full App (gzip)",
          notes: "Notes",
        },
      },
      copyCode: "Copy",
      copied: "Copied!",
    },
    footer: {
      tagline: "Fine-grained reactivity for modern web",
      madeWith: "Made with",
      by: "by Evan",
    },
    common: {
      language: "Language",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
    },
  },

  // German (Deutsch)
  de: {
    nav: {
      docs: "Dokumentation",
      github: "GitHub",
      examples: "Beispiele",
    },
    hero: {
      title: "Feinkörnige Reaktivität für das moderne Web",
      subtitle: "Keine Abhängigkeiten. Reines TypeScript. Blitzschnell.",
      getStarted: "Loslegen",
      viewDocs: "Dokumentation",
      features: {
        reactive: {
          title: "Feinkörnig",
          desc: "Signals aktualisieren nur Änderungen",
        },
        performance: {
          title: "Schnell",
          desc: "Direktes DOM, kein Virtual DOM Overhead",
        },
        typescript: {
          title: "Typsicher",
          desc: "Vollständige TypeScript-Unterstützung",
        },
        bundle: {
          title: "Klein",
          desc: "~4KB gzipped, tree-shakeable",
        },
      },
    },
    features: {
      title: "Warum Fia?",
      subtitle: "Alles was Sie brauchen, nichts was Sie nicht brauchen",
      items: {
        noVdom: {
          title: "Kein Virtual DOM",
          desc: "Fia aktualisiert das DOM direkt. Kein Diffing, kein Overhead, keine Reconciliation-Kosten. Nur pure Performance.",
        },
        signals: {
          title: "Feinkörnige Reaktivität",
          desc: "Signals verfolgen Abhängigkeiten automatisch. Nur was sich ändert, wird aktualisiert.",
        },
        typescript: {
          title: "Typsicher",
          desc: "Mit TypeScript gebaut, für TypeScript. Genießen Sie vollständige Autovervollständigung und Typinferenz für alle HTML-Attribute und Events.",
        },
        accessibility: {
          title: "Barrierefreiheit Zuerst",
          desc: "WCAG-Konformität eingebaut. Erweiterte ARIA-Typen mit Literalwerten und rollenspezifischen Attributvorschlägen.",
        },
        zeroDeps: {
          title: "Keine Abhängigkeiten",
          desc: "Keine npm-Pakete. Kein Supply-Chain-Risiko. Keine Versionskonflikte. Nur pures JavaScript.",
        },
        tiny: {
          title: "Winziges Bundle",
          desc: "Nur ~4KB gzipped. Kleiner als die meisten Utility-Bibliotheken. Schnell zu laden, schnell zu parsen.",
        },
        delegation: {
          title: "Event-Delegation",
          desc: "Ein einziger delegierter Listener pro Event-Typ.",
        },
        batching: {
          title: "Fragment-Batching",
          desc: "Automatisches DocumentFragment-Batching. Keine Zwischenknoten oder Layout-Thrashing mehr.",
        },
      },
    },
    demo: {
      tryIt: "Probieren Sie es selbst aus",
      interactive: "Interaktive Zähler-Demo",
    },
    docs: {
      tableOfContents: "Inhaltsverzeichnis",
      introduction: "Einführung",
      whyFia: "Warum Fia?",
      gettingStarted: "Erste Schritte",
      elementApi: "Element-API",
      elementFactoryTypes: "Element-Factory-Typen",
      reactivity: "Reaktivität",
      immutability: "Unveränderlichkeit",
      controlFlow: "Kontrollfluss",
      components: "Komponentenkomposition",
      performance: "Leistung",
      installation: {
        title: "Installation",
        npm: "npm",
        bun: "Bun",
        deno: "Deno",
      },
      quickStart: {
        title: "Schnellstart",
      },
      coreApi: {
        title: "Kern-API",
        signals: "Signals",
        elements: "Elemente",
        control: "Kontrollfluss",
      },
      examples: {
        title: "Beispiele",
        counter: "Zähler",
        todoList: "Aufgabenliste",
        form: "Formularvalidierung",
      },
      bundleSizes: {
        title: "Bundle-Größen",
        description: "Fia ist so konzipiert, dass es unglaublich klein und dennoch funktional vollständig ist.",
        minimal: "Minimal",
        full: "Vollständige App",
        notes: "Hinweise",
        tableHeaders: {
          framework: "Framework",
          minimal: "Minimal (gzip)",
          full: "Vollständige App (gzip)",
          notes: "Hinweise",
        },
      },
      copyCode: "Kopieren",
      copied: "Kopiert!",
    },
    footer: {
      tagline: "Feinkörnige Reaktivität für das moderne Web",
      madeWith: "Gemacht mit",
      by: "von Evan",
    },
    common: {
      language: "Sprache",
      darkMode: "Dunkler Modus",
      lightMode: "Heller Modus",
    },
  },

  // Greek (Ελληνικά)
  el: {
    nav: {
      docs: "Τεκμηρίωση",
      github: "GitHub",
      examples: "Παραδείγματα",
    },
    hero: {
      title: "Λεπτομερής Αντιδραστικότητα για το Σύγχρονο Web",
      subtitle: "Χωρίς εξαρτήσεις. Καθαρό TypeScript. Αστραπιαία ταχύτητα.",
      getStarted: "Ξεκινήστε",
      viewDocs: "Τεκμηρίωση",
      features: {
        reactive: {
          title: "Λεπτομερής",
          desc: "Τα Signals ενημερώνουν μόνο τις αλλαγές",
        },
        performance: {
          title: "Γρήγορο",
          desc: "Άμεσο DOM, χωρίς Virtual DOM overhead",
        },
        typescript: {
          title: "Τυποασφαλές",
          desc: "Πλήρης υποστήριξη TypeScript",
        },
        bundle: {
          title: "Μικρό",
          desc: "~4KB gzipped, tree-shakeable",
        },
      },
    },
    features: {
      title: "Γιατί Fia;",
      subtitle: "Όλα όσα χρειάζεστε, τίποτα που δεν χρειάζεστε",
      items: {
        noVdom: {
          title: "Χωρίς Virtual DOM",
          desc: "Το Fia ενημερώνει το DOM απευθείας. Χωρίς diffing, χωρίς overhead, χωρίς κόστος συμφωνίας. Μόνο καθαρή απόδοση.",
        },
        signals: {
          title: "Λεπτομερής Αντιδραστικότητα",
          desc: "Τα Signals παρακολουθούν τις εξαρτήσεις αυτόματα. Μόνο αυτό που αλλάζει ενημερώνεται.",
        },
        typescript: {
          title: "Τυποασφαλές",
          desc: "Χτισμένο με TypeScript, για TypeScript. Απολαύστε πλήρη αυτόματη συμπλήρωση και συμπερασμό τύπων για όλα τα χαρακτηριστικά και συμβάντα HTML.",
        },
        accessibility: {
          title: "Προσβασιμότητα Πρώτα",
          desc: "Ενσωματωμένη συμμόρφωση WCAG. Προηγμένοι τύποι ARIA με κυριολεκτικές τιμές και προτάσεις χαρακτηριστικών ανά ρόλο.",
        },
        zeroDeps: {
          title: "Χωρίς Εξαρτήσεις",
          desc: "Χωρίς πακέτα npm. Χωρίς κίνδυνο εφοδιαστικής αλυσίδας. Χωρίς συγκρούσεις εκδόσεων. Μόνο καθαρό JavaScript.",
        },
        tiny: {
          title: "Μικροσκοπικό Bundle",
          desc: "Μόνο ~4KB gzipped. Μικρότερο από τις περισσότερες βιβλιοθήκες εργαλείων. Γρήγορο στη λήψη, γρήγορο στην ανάλυση.",
        },
        delegation: {
          title: "Ανάθεση Συμβάντων",
          desc: "Ένας μόνο ανατεθειμένος ακροατής ανά τύπο συμβάντος.",
        },
        batching: {
          title: "Ομαδοποίηση Fragment",
          desc: "Αυτόματη ομαδοποίηση DocumentFragment. Όχι άλλοι ενδιάμεσοι κόμβοι ή thrashing διάταξης.",
        },
      },
    },
    demo: {
      tryIt: "Δοκιμάστε το μόνοι σας",
      interactive: "Διαδραστική επίδειξη μετρητή",
    },
    docs: {
      tableOfContents: "Πίνακας Περιεχομένων",
      introduction: "Εισαγωγή",
      whyFia: "Γιατί Fia;",
      gettingStarted: "Ξεκινώντας",
      elementApi: "Element API",
      elementFactoryTypes: "Τύποι Element Factory",
      reactivity: "Αντιδραστικότητα",
      immutability: "Αμεταβλητότητα",
      controlFlow: "Ροή Ελέγχου",
      components: "Σύνθεση Στοιχείων",
      performance: "Απόδοση",
      installation: {
        title: "Εγκατάσταση",
        npm: "npm",
        bun: "Bun",
        deno: "Deno",
      },
      quickStart: {
        title: "Γρήγορη Έναρξη",
      },
      coreApi: {
        title: "Κύριο API",
        signals: "Signals",
        elements: "Στοιχεία",
        control: "Ροή Ελέγχου",
      },
      examples: {
        title: "Παραδείγματα",
        counter: "Μετρητής",
        todoList: "Λίστα Εργασιών",
        form: "Επικύρωση Φόρμας",
      },
      bundleSizes: {
        title: "Μεγέθη Bundle",
        description: "Το Fia είναι σχεδιασμένο να είναι απίστευτα μικρό ενώ παραμένει πλήρως λειτουργικό.",
        minimal: "Ελάχιστο",
        full: "Πλήρης Εφαρμογή",
        notes: "Σημειώσεις",
        tableHeaders: {
          framework: "Framework",
          minimal: "Ελάχιστο (gzip)",
          full: "Πλήρης Εφαρμογή (gzip)",
          notes: "Σημειώσεις",
        },
      },
      copyCode: "Αντιγραφή",
      copied: "Αντιγράφηκε!",
    },
    footer: {
      tagline: "Λεπτομερής αντιδραστικότητα για το σύγχρονο web",
      madeWith: "Φτιαγμένο με",
      by: "από τον Evan",
    },
    common: {
      language: "Γλώσσα",
      darkMode: "Σκοτεινή Λειτουργία",
      lightMode: "Φωτεινή Λειτουργία",
    },
  },
};

export const languageNames: Record<Language, string> = {
  en: "English",
  de: "Deutsch",
  el: "Ελληνικά",
};
