import { useState, useEffect } from 'react'
import './App.css'

interface Report {
  id: string
  label: string
  path: string
}

function App() {
  const [reports, setReports] = useState<Report[]>([])
  const [selectedId, setSelectedId] = useState<string>('')
  const [reportContent, setReportContent] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false)

  // Fetch report index on mount
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}reports/index.json`)
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(() => setError('Failed to load report list'))
  }, [])

  const handleSelectionChange = async (newId: string) => {
    setSelectedId(newId)

    if (!newId) {
      setReportContent('')
      return
    }

    const report = reports.find(r => r.id === newId)
    if (!report) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${import.meta.env.BASE_URL}${report.path}`)
      const text = await res.text()
      setReportContent(text)
    } catch {
      setError('Failed to load report')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reportContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Failed to copy')
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const selectedReport = reports.find(r => r.id === selectedId)

  return (
    <div className="container">
      <div className="header-row">
        <div className="header-text">
          <h1>The Incredible Machine</h1>
          <p className="subtitle">Select an encounter to view the student feedback report</p>
        </div>
        <img
          src={`${import.meta.env.BASE_URL}Jan.png`}
          alt="Uncle Jan"
          className="header-image"
        />
      </div>

      <div className="controls">
        <select
          value={selectedId}
          onChange={(e) => handleSelectionChange(e.target.value)}
        >
          <option value="">-- Select an encounter --</option>
          {reports.map(report => (
            <option key={report.id} value={report.id}>
              {report.label}
            </option>
          ))}
        </select>

        {reportContent && (
          <>
            <button onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={handlePrint}>Print</button>
          </>
        )}
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Loading report...</p>}

      {reportContent ? (
        <div className="report-card">
          <div className="report-header">
            <span>{selectedReport?.label || 'Report'}</span>
          </div>
          <textarea
            className="report-display"
            value={reportContent}
            readOnly
          />
        </div>
      ) : !loading && (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p>Select an encounter from the dropdown to view the report</p>
        </div>
      )}
    </div>
  )
}

export default App
