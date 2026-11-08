// Skill-in solo workspace (platform file): keep it loaded (the script tag in index.html, and the import in main.jsx).
// In the free trial the database is read-only; this explains a refused save and offers the upgrade.
const CODE = 'saving_data_needs_paid_workspace'

function showUpgrade() {
  if (document.getElementById('skillin-upgrade')) return
  const bar = document.createElement('div')
  bar.id = 'skillin-upgrade'
  bar.setAttribute('role', 'alert')
  bar.style.cssText = 'position:fixed;left:50%;top:12px;transform:translateX(-50%);z-index:2147483647;display:flex;gap:12px;align-items:center;padding:10px 14px;background:#1a2235;color:#fff;border-radius:10px;font:14px/1.3 system-ui,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.2)'
  const text = document.createElement('span')
  text.textContent = 'Saving data needs a paid workspace.'
  const upgrade = document.createElement('button')
  upgrade.textContent = 'Upgrade'
  upgrade.style.cssText = 'background:#3b82f6;color:#fff;border:0;border-radius:6px;padding:6px 12px;cursor:pointer;font:inherit'
  upgrade.onclick = () => window.parent.postMessage({ type: 'skillin:upgrade' }, '*')
  const close = document.createElement('button')
  close.textContent = 'x'
  close.setAttribute('aria-label', 'Close')
  close.style.cssText = 'background:none;color:#fff;border:0;cursor:pointer;font:inherit'
  close.onclick = () => bar.remove()
  bar.append(text, upgrade, close)
  document.body.appendChild(bar)
}

// Once per page, however many times the file is loaded.
if (!window.__skillinSolo) {
  window.__skillinSolo = true
  const originalFetch = window.fetch.bind(window)
  window.fetch = async (...args) => {
    const response = await originalFetch(...args)
    if (response.status === 403) {
      response.clone().json().then((body) => { if (body?.code === CODE) showUpgrade() }).catch(() => {})
    }
    return response
  }
}
