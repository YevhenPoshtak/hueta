(function() {
  'use strict';

  try {
    Object.defineProperty(window, 'top', {
      get: function() { return window.self; },
      configurable: false
    });

    Object.defineProperty(window, 'parent', {
      get: function() { return window.self; },
      configurable: false
    });

    Object.defineProperty(window, 'frameElement', {
      get: function() { return null; },
      configurable: false
    });

    if (window.location.ancestorOrigins) {
      Object.defineProperty(window.location, 'ancestorOrigins', {
        get: function() { return { length: 0 }; },
        configurable: false
      });
    }
  } catch(e) {
  }

  const HIDDEN_TEXTS = [
    'відповісти зараз',
    'answer now',
    'відповісти',
  ];

  function hideByText(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walker.nextNode())) {
      const text = node.textContent.trim().toLowerCase();
      if (HIDDEN_TEXTS.some(t => text === t)) {
        let el = node.parentElement;
        while (el && el !== document.body) {
          const tag = el.tagName.toLowerCase();
          if (tag === 'button' || tag === 'a' || el.getAttribute('role') === 'button' || el.getAttribute('role') === 'option') {
            el.style.setProperty('display', 'none', 'important');
            break;
          }
          if ((tag === 'div' || tag === 'span') && el.textContent.trim().toLowerCase() === text) {
            el.style.setProperty('display', 'none', 'important');
            break;
          }
          el = el.parentElement;
        }
      }
    }
  }

  function onMutation() {
    hideByText(document.body);
  }

  if (document.body) {
    hideByText(document.body);
  }

  const observer = new MutationObserver(onMutation);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
