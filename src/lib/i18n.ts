export type Locale = "en" | "es";

export const translations = {
  en: {
    header: {
      account: "Account",
    },
    nav: {
      convert: "CONVERT",
      history: "HISTORY",
      account: "ACCOUNT",
    },
    sidebar: {
      plan: "PLAN",
      free: "FREE",
    },
    upload: {
      title: "Drag your PDF",
      subtitle1: "Extract tables automatically.",
      subtitle2: "Turn fixed documents into editable data.",
      selectFile: "SELECT FILE",
    },
    files: {
      recentFiles: "Recent Files",
      total: "TOTAL",
      id: "ID",
      name: "NAME",
      date: "DATE",
      size: "SIZE",
      status: "STATUS",
    },
    status: {
      ready: "READY",
      processing: "PROCESSING",
      download: "DOWNLOAD",
    },
    account: {
      hero: {
        membership: "PRO MEMBERSHIP",
      },
      usage: {
        title: "API Usage (Monthly)",
        calls: "Calls",
        cycleResets: "* Cycle resets monthly.",
        peakReached: "",
      },
      team: {
        title: "Team",
        addMember: "+ ADD MEMBER",
      },
      billing: {
        title: "Billing History",
        date: "DATE",
        reference: "REFERENCE",
        amount: "AMOUNT",
        receipt: "RECEIPT",
      },
    },
    history: {
      title: "History",
      comingSoon: "History view coming soon.",
    },
  },
  es: {
    header: {
      account: "Cuenta",
    },
    nav: {
      convert: "CONVERTIR",
      history: "HISTORIAL",
      account: "CUENTA",
    },
    sidebar: {
      plan: "PLAN",
      free: "GRATUITO",
    },
    upload: {
      title: "Arrastra tu PDF",
      subtitle1: "Extrae tablas automáticamente.",
      subtitle2: "Transforma documentos fijos en datos editables.",
      selectFile: "SELECCIONAR ARCHIVO",
    },
    files: {
      recentFiles: "Archivos Recientes",
      total: "TOTAL",
      id: "ID",
      name: "NOMBRE",
      date: "FECHA",
      size: "TAMAÑO",
      status: "ESTADO",
    },
    status: {
      ready: "LISTO",
      processing: "PROCESANDO",
      download: "DESCARGAR",
    },
    account: {
      hero: {
        membership: "MEMBRESÍA PRO",
      },
      usage: {
        title: "Consumo API (Mensual)",
        calls: "Llamadas",
        cycleResets: "* El ciclo se reinicia cada mes.",
        peakReached: "",
      },
      team: {
        title: "Equipo",
        addMember: "+ AÑADIR MIEMBRO",
      },
      billing: {
        title: "Historial de Facturación",
        date: "FECHA",
        reference: "REFERENCIA",
        amount: "MONTO",
        receipt: "RECIBO",
      },
    },
    history: {
      title: "Historial",
      comingSoon: "Vista de historial próximamente.",
    },
  },
} as const;

export function getNested(obj: object, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    current = (current as Record<string, unknown>)?.[key];
  }
  return typeof current === "string" ? current : path;
}
