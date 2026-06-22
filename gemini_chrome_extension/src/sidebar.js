(function () {
  'use strict';

  if (document.getElementById('gemini-sidebar-root')) return;

  const DEFAULT_WIDTH = 380;
  const VISIBLE_KEY = 'gemini_sidebar_visible';

  const root = document.createElement('div');
  root.id = 'gemini-sidebar-root';

  const wrap = document.createElement('div');
  wrap.id = 'gemini-sidebar-frame-wrap';

  const iframe = document.createElement('iframe');
  iframe.id = 'gemini-sidebar-iframe';
  iframe.src = 'https://gemini.google.com/';
  iframe.allowTransparency = true;
  iframe.style.background = 'transparent';
  iframe.allow = 'clipboard-read; clipboard-write; microphone; camera';

  wrap.appendChild(iframe);
  root.appendChild(wrap);
  document.body.appendChild(root);

  let isVisible = false;

  try {
    const vis = localStorage.getItem(VISIBLE_KEY);
    if (vis === 'true') {
      isVisible = true;
    }
  } catch (e) {}

  function applyWidth() {
    root.style.width = DEFAULT_WIDTH + 'px';
  }

  function show() {
    isVisible = true;
    root.style.display = 'flex';
    applyWidth();
    try { localStorage.setItem(VISIBLE_KEY, 'true'); } catch (e) {}
  }

  function hide() {
    isVisible = false;
    root.style.display = 'none';
    try { localStorage.setItem(VISIBLE_KEY, 'false'); } catch (e) {}
  }

  function toggle() {
    if (isVisible) hide(); else show();
  }

  if (isVisible) {
    show();
  } else {
    root.style.display = 'none';
  }

  chrome.runtime.onMessage.addListener(function (msg) {
    if (msg.action === 'toggle-gemini-sidebar') {
      toggle();
    }
  });
})();
