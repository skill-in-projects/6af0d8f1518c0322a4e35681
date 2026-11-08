import { useMemo, useState } from 'react'
import { HashRouter, Link, NavLink, Route, Routes } from 'react-router-dom'

const JOBS = [
  { id: 1, title: 'Frontend Developer', company: 'Brightline Labs', place: 'Remote', type: 'Full-time', pay: '$90k–$110k', tags: ['React', 'CSS'], posted: '2 days ago' },
  { id: 2, title: 'Junior Data Analyst', company: 'Northwind Health', place: 'Lisbon', type: 'Full-time', pay: '€32k–€38k', tags: ['SQL', 'Excel'], posted: '1 day ago' },
  { id: 3, title: 'Customer Success Lead', company: 'Harbor Books', place: 'Hybrid, Berlin', type: 'Full-time', pay: '€45k–€52k', tags: ['Support', 'Writing'], posted: '5 days ago' },
  { id: 4, title: 'Part-time UX Designer', company: 'Little Fern Studio', place: 'Remote', type: 'Part-time', pay: '$30/hour', tags: ['Figma', 'Research'], posted: 'Today' },
  { id: 5, title: 'Backend Engineer (.NET)', company: 'Keystone Logistics', place: 'Dublin', type: 'Contract', pay: '€550/day', tags: ['C#', 'PostgreSQL'], posted: '3 days ago' },
]

const TYPES = ['All types', 'Full-time', 'Part-time', 'Contract']

function Header() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#4f46e5' : '#374151',
    fontWeight: isActive ? 600 : 500,
    textDecoration: 'none',
  })
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.brand}>JobTrail</Link>
      <nav style={{ display: 'flex', gap: 20 }}>
        <NavLink to="/" end style={linkStyle}>Home</NavLink>
        <NavLink to="/jobs" style={linkStyle}>Job board</NavLink>
      </nav>
    </header>
  )
}

function HomePage() {
  const features = [
    { title: 'Search by skill', text: 'Type a skill like React or SQL and see only the jobs that ask for it.' },
    { title: 'Keep your shortlist', text: 'Save the jobs you like so you can come back to them later.' },
    { title: 'Track applications', text: 'Mark the jobs you have applied to and see where each one stands.' },
  ]
  return (
    <>
      <section style={styles.hero}>
        <p style={styles.kicker}>Your job search, in one place</p>
        <h1 style={styles.heroTitle}>Find your next job, faster</h1>
        <p style={styles.heroText}>
          JobTrail helps job seekers browse open roles, save the ones that fit, and keep track of every application.
        </p>
        <Link to="/jobs" style={styles.primaryButton}>Browse jobs</Link>
      </section>
      <section style={styles.features}>
        {features.map((f) => (
          <article key={f.title} style={styles.card}>
            <h3 style={styles.cardTitle}>{f.title}</h3>
            <p style={styles.muted}>{f.text}</p>
          </article>
        ))}
      </section>
    </>
  )
}

function JobBoardPage() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All types')
  const [saved, setSaved] = useState([])
  const [applied, setApplied] = useState([])
  const [note, setNote] = useState('')

  const jobs = useMemo(() => {
    const q = query.trim().toLowerCase()
    return JOBS.filter((job) => {
      const matchesType = type === 'All types' || job.type === type
      const matchesText =
        q === '' ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.tags.some((tag) => tag.toLowerCase().includes(q))
      return matchesType && matchesText
    })
  }, [query, type])

  const toggle = (list, setList, id) => {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id])
    setNote('Not saved yet: upgrade to keep your changes')
  }

  return (
    <section style={styles.page}>
      <h1 style={styles.pageTitle}>Job board</h1>
      <p style={styles.muted}>Browse open roles and save the ones you want to follow up on.</p>

      <div style={styles.filters}>
        <input
          type="search"
          placeholder="Search title, company or skill"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
          aria-label="Search jobs"
        />
        <select value={type} onChange={(e) => setType(e.target.value)} style={styles.input} aria-label="Job type">
          {TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {note && <p style={styles.note}>{note}</p>}

      {jobs.length === 0 && <p style={styles.muted}>No jobs match your search yet.</p>}

      <div style={{ display: 'grid', gap: 14 }}>
        {jobs.map((job) => {
          const isSaved = saved.includes(job.id)
          const isApplied = applied.includes(job.id)
          return (
            <article key={job.id} style={styles.jobCard}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <h3 style={styles.cardTitle}>{job.title}</h3>
                <p style={styles.muted}>
                  {job.company} · {job.place} · {job.type}
                </p>
                <p style={styles.muted}>
                  {job.pay} · Posted {job.posted.toLowerCase()}
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                  {job.tags.map((tag) => (
                    <span key={tag} style={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => toggle(saved, setSaved, job.id)}
                  style={isSaved ? styles.activeButton : styles.secondaryButton}
                >
                  {isSaved ? 'Saved' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => toggle(applied, setApplied, job.id)}
                  style={isApplied ? styles.activeButton : styles.secondaryButton}
                >
                  {isApplied ? 'Applied' : 'Mark applied'}
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div style={styles.app}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobBoardPage />} />
        </Routes>
        <footer style={styles.footer}>JobTrail · Sample job listings for preview</footer>
      </div>
    </HashRouter>
  )
}

const INDIGO = '#4f46e5'

const styles = {
  app: { minHeight: '100vh', background: '#f8fafc', color: '#111827', fontFamily: 'system-ui, sans-serif' },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    padding: '16px 24px',
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
  },
  brand: { fontWeight: 700, fontSize: 20, color: INDIGO, textDecoration: 'none' },
  hero: { padding: '72px 24px 48px', textAlign: 'center', maxWidth: 720, margin: '0 auto' },
  kicker: { color: '#0d9488', fontWeight: 600, margin: 0 },
  heroTitle: { fontSize: 44, lineHeight: 1.15, margin: '12px 0' },
  heroText: { fontSize: 18, color: '#4b5563', margin: '0 0 28px' },
  primaryButton: {
    display: 'inline-block',
    background: INDIGO,
    color: '#ffffff',
    padding: '12px 22px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 600,
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 16,
    maxWidth: 960,
    margin: '0 auto',
    padding: '0 24px 56px',
  },
  card: { background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20 },
  cardTitle: { margin: '0 0 6px', fontSize: 18 },
  page: { maxWidth: 880, margin: '0 auto', padding: '40px 24px 56px' },
  pageTitle: { fontSize: 32, margin: '0 0 6px' },
  muted: { color: '#6b7280', margin: '4px 0' },
  filters: { display: 'flex', gap: 12, flexWrap: 'wrap', margin: '24px 0 12px' },
  input: {
    flex: 1,
    minWidth: 180,
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #d1d5db',
    fontSize: 15,
    background: '#ffffff',
  },
  note: {
    background: '#fef9c3',
    color: '#854d0e',
    padding: '8px 12px',
    borderRadius: 8,
    fontSize: 14,
    margin: '8px 0 16px',
  },
  jobCard: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    padding: 20,
  },
  tag: { background: '#eef2ff', color: INDIGO, borderRadius: 999, padding: '3px 10px', fontSize: 13 },
  secondaryButton: {
    padding: '9px 14px',
    borderRadius: 8,
    border: '1px solid #d1d5db',
    background: '#ffffff',
    cursor: 'pointer',
    fontWeight: 600,
  },
  activeButton: {
    padding: '9px 14px',
    borderRadius: 8,
    border: `1px solid ${INDIGO}`,
    background: INDIGO,
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: 600,
  },
  footer: { textAlign: 'center', color: '#9ca3af', fontSize: 13, padding: 24 },
}
