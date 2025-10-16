import { toast, ToastOptions } from 'react-hot-toast';
import { Check, X, AlertTriangle, Info } from 'lucide-react';

const baseToastStyles: ToastOptions = {
  style: {
    background: '#1a1a1a',
    color: '#fff',
    padding: '12px 16px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '500',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    minWidth: '300px',
  },
  position: 'top-right',
  duration: 3000,
};

const iconStyles = {
  success: { background: '#059669', color: '#fff' },
  error: { background: '#DC2626', color: '#fff' },
  warning: { background: '#D97706', color: '#fff' },
  info: { background: '#2563EB', color: '#fff' },
};

const IconWrapper = ({ children, type }: { children: React.ReactNode; type: keyof typeof iconStyles }) => (
  <div
    style={{
      background: iconStyles[type].background,
      borderRadius: '6px',
      padding: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
);

export const showToast = {
  success: (message: string) => {
    toast.success(
      (t) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <IconWrapper type="success">
            <Check size={18} color="#fff" />
          </IconWrapper>
          <div>
            <div style={{ fontWeight: '600', marginBottom: '2px' }}>Success</div>
            <div style={{ opacity: 0.9 }}>{message}</div>
          </div>
        </div>
      ),
      {
        ...baseToastStyles,
        style: {
          ...baseToastStyles.style,
          borderLeft: '4px solid #059669',
        },
      }
    );
  },
  error: (message: string) => {
    toast.error(
      (t) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <IconWrapper type="error">
            <X size={18} color="#fff" />
          </IconWrapper>
          <div>
            <div style={{ fontWeight: '600', marginBottom: '2px' }}>Error</div>
            <div style={{ opacity: 0.9 }}>{message}</div>
          </div>
        </div>
      ),
      {
        ...baseToastStyles,
        style: {
          ...baseToastStyles.style,
          borderLeft: '4px solid #DC2626',
        },
      }
    );
  },
  warning: (message: string) => {
    toast(
      (t) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <IconWrapper type="warning">
            <AlertTriangle size={18} color="#fff" />
          </IconWrapper>
          <div>
            <div style={{ fontWeight: '600', marginBottom: '2px' }}>Warning</div>
            <div style={{ opacity: 0.9 }}>{message}</div>
          </div>
        </div>
      ),
      {
        ...baseToastStyles,
        style: {
          ...baseToastStyles.style,
          borderLeft: '4px solid #D97706',
        },
      }
    );
  },
  info: (message: string) => {
    toast(
      (t) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <IconWrapper type="info">
            <Info size={18} color="#fff" />
          </IconWrapper>
          <div>
            <div style={{ fontWeight: '600', marginBottom: '2px' }}>Info</div>
            <div style={{ opacity: 0.9 }}>{message}</div>
          </div>
        </div>
      ),
      {
        ...baseToastStyles,
        style: {
          ...baseToastStyles.style,
          borderLeft: '4px solid #2563EB',
        },
      }
    );
  },
};