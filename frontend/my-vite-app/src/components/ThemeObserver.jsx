import { useEffect, useState } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Set initial value
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current);

    // Observe changes to data-theme
    const observer = new MutationObserver(() => {
      const updated = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(updated);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}
