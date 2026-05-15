"use client";

export type AlertType = "success" | "error" | "warning" | "info";

export type ActionAlertState = {
  type: AlertType;
  title: string;
  message: string;
};

export default function ActionAlert({
  alert,
  onClose,
}: {
  alert: ActionAlertState | null;
  onClose: () => void;
}) {
  if (!alert) return null;

  const styles = {
    success: {
      border: "1px solid rgba(52,211,153,0.35)",
      background:
        "linear-gradient(135deg, rgba(6,78,59,0.98), rgba(16,185,129,0.18))",
      title: "#6ee7b7",
      icon: "✓",
    },
    error: {
      border: "1px solid rgba(248,113,113,0.35)",
      background:
        "linear-gradient(135deg, rgba(127,29,29,0.98), rgba(239,68,68,0.18))",
      title: "#fecaca",
      icon: "!",
    },
    warning: {
      border: "1px solid rgba(251,191,36,0.35)",
      background:
        "linear-gradient(135deg, rgba(113,63,18,0.98), rgba(251,191,36,0.18))",
      title: "#fde68a",
      icon: "!",
    },
    info: {
      border: "1px solid rgba(96,165,250,0.35)",
      background:
        "linear-gradient(135deg, rgba(30,58,138,0.98), rgba(59,130,246,0.18))",
      title: "#bfdbfe",
      icon: "i",
    },
  }[alert.type];

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        width: "360px",
        maxWidth: "calc(100vw - 32px)",
        zIndex: 9999,
        borderRadius: "18px",
        border: styles.border,
        background: styles.background,
        boxShadow: "0 24px 70px rgba(0,0,0,0.45)",
        padding: "16px",
        color: "#ffffff",
        backdropFilter: "blur(16px)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.12)",
            color: styles.title,
            fontSize: "18px",
            fontWeight: 900,
            flexShrink: 0,
          }}
        >
          {styles.icon}
        </div>

        <div style={{ flex: 1 }}>
          <h4
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: 900,
              color: styles.title,
            }}
          >
            {alert.title}
          </h4>

          <p
            style={{
              marginTop: "6px",
              marginBottom: 0,
              fontSize: "13px",
              lineHeight: 1.6,
              color: "#e2e8f0",
            }}
          >
            {alert.message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            border: "none",
            background: "rgba(255,255,255,0.10)",
            color: "#ffffff",
            width: "28px",
            height: "28px",
            borderRadius: "999px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}