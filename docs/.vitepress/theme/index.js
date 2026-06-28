import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', (e) => {
        // Ignore if user is typing in a search box or input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        // Navigation shortcuts
        const isNext = e.key === 'j' || e.key === 'ArrowDown';
        const isPrev = e.key === 'k' || e.key === 'ArrowUp';

        if (isNext || isPrev) {
          const details = Array.from(document.querySelectorAll('details.custom-block'));
          if (details.length === 0) return;

          // Find which details block is currently focused
          const currentFocus = document.activeElement;
          let currentIndex = -1;
          for (let i = 0; i < details.length; i++) {
            if (details[i].contains(currentFocus)) {
              currentIndex = i;
              break;
            }
          }

          e.preventDefault(); // Prevent default scroll so we can control focus scrolling
          
          if (isNext) {
            // Next block (or loop to top)
            const nextIndex = currentIndex < details.length - 1 ? currentIndex + 1 : 0;
            const summary = details[nextIndex].querySelector('summary');
            if (summary) {
              summary.focus();
              summary.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          } else if (isPrev) {
            // Previous block (or loop to bottom)
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : details.length - 1;
            const summary = details[prevIndex].querySelector('summary');
            if (summary) {
              summary.focus();
              summary.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        }
        
        // Use 'o' or 'f' to toggle all flashcards on the page
        if (e.key === 'o' || e.key === 'f') {
           const details = Array.from(document.querySelectorAll('details.custom-block'));
           if (details.length === 0) return;
           e.preventDefault();
           
           // Check if first is open to decide whether to open all or close all
           const isFirstOpen = details[0].hasAttribute('open');
           details.forEach(d => {
             if (isFirstOpen) {
               d.removeAttribute('open');
             } else {
               d.setAttribute('open', '');
             }
           });
        }
      });
    }
  }
}
