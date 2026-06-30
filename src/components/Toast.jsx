import { useState, useEffect, useCallback } from 'react';

let toastId = 0;
const listeners = new Set();

function notify(type, message) {
  const id = ++toastId;
  listeners.forEach((fn) => fn({ id, type, message }));
  return id;
}

function remove(id) {
  listeners.forEach((fn) => fn({ id, remove: true }));
}

export const toast = {
  success: (msg) => notify('success', msg),
  error: (msg) => notify('error', msg),
  info: (msg) => notify('info', msg),
  warning: (msg) => notify('warning', msg),
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const handler = useCallback((evt) => {
    if (evt.remove) {
      setToasts((prev) => prev.filter((t) => t.id !== evt.id));
    } else {
      setToasts((prev) => [...prev, { id: evt.id, type: evt.type, message: evt.message }]);
    }
  }, []);

  useEffect(() => {
    listeners.add(handler);
    return () => listeners.delete(handler);
  }, [handler]);

  // 自动消失
  useEffect(() => {
    if (toasts.length === 0) return;
    const latest = toasts[toasts.length - 1];
    const timer = setTimeout(() => remove(latest.id), 3500);
    return () => clearTimeout(timer);
  }, [toasts]);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`} onClick={() => remove(t.id)}>
          <span className="toast-icon">
            {t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : t.type === 'warning' ? '⚠️' : 'ℹ️'}
          </span>
          <span className="toast-msg">{t.message}</span>
        </div>
      ))}
    </div>
  );
}
