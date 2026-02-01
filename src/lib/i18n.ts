export type Locale = "en" | "es";

export const translations = {
  en: {
    common: {
      confirm: "Confirm",
    },
    toast: {
      downloadStarted: "Download started",
      downloadFailed: "Download failed",
      downloadExpired: "Download expired. Convert again.",
      deleted: "Deleted",
      deletedAll: "All conversions deleted",
    },
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
      freeTrial: "Free (10 files)",
    },
    upload: {
      title: "Drag your PDF",
      subtitle1: "Extract tables automatically.",
      subtitle2: "Turn fixed documents into editable data.",
      selectFile: "SELECT FILE",
      converting: "Converting…",
      onlyPdf: "Only PDF files are accepted.",
      signInRequired: "Sign in to convert.",
      convertError: "Conversion failed. Try another PDF.",
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
      subtitle: "All your PDF to Excel conversions.",
      comingSoon: "History view coming soon.",
      delete: "Delete",
      deleteAll: "Delete all",
      deleteConfirm: "Delete this conversion?",
      deleteAllConfirm: "Delete all conversions? This cannot be undone.",
    },
  },
  es: {
    common: {
      confirm: "Confirmar",
    },
    toast: {
      downloadStarted: "Descarga iniciada",
      downloadFailed: "No se pudo descargar",
      downloadExpired: "La descarga expiró. Convierte de nuevo.",
      deleted: "Eliminado",
      deletedAll: "Se eliminaron todas las conversiones",
    },
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
      freeTrial: "Gratis (10 archivos)",
    },
    upload: {
      title: "Arrastra tu PDF",
      subtitle1: "Extrae tablas automáticamente.",
      subtitle2: "Transforma documentos fijos en datos editables.",
      selectFile: "SELECCIONAR ARCHIVO",
      converting: "Convirtiendo…",
      onlyPdf: "Solo se aceptan archivos PDF.",
      signInRequired: "Inicia sesión para convertir.",
      convertError: "Error al convertir. Prueba con otro PDF.",
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
      subtitle: "Todas tus conversiones de PDF a Excel.",
      comingSoon: "Vista de historial próximamente.",
      delete: "Eliminar",
      deleteAll: "Eliminar todo",
      deleteConfirm: "¿Eliminar esta conversión?",
      deleteAllConfirm: "¿Eliminar todas las conversiones? No se puede deshacer.",
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
