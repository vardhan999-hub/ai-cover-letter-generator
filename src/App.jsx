import { useState, useRef } from 'react'
import { extractPDFText } from './utils/extractPDF'

const API_KEY = import.meta.env.VITE_GROQ_KEY

export default function App() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [skills, setSkills] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [resumeText, setResumeText] = useState('')
  const [fileName, setFileName] = useState('')
  const [letter, setLetter] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef(null)

  async function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setFileName(file.name)
    if (file.type === 'text/plain') {
      setResumeText(await file.text())
    } else if (file.type === 'application/pdf') {
      setResumeText(await extractPDFText(file))
    }
  }

  async function handleGenerate() {
    setError('')
    if (!API_KEY) {
      setError('Missing API key. Check your .env file.')
      return
    }
    if (!name.trim() || !role.trim() || !company.trim()) {
      setError('Please fill in your name, role, and company name.')
      return
    }
    if (!skills && !jobDesc && !resumeText) {
      setError('Please add at least skills, a job description, or a resume.')
      return
    }

    const prompt = `Write a professional, warm, and highly personalized cover letter for the following candidate.

Candidate Name: ${name}
Applying For: ${role} at ${company}
Key Skills: ${skills || 'Not specified'}
Job Description: ${jobDesc || 'Not provided'}
${resumeText ? `\nResume Content:\n${resumeText.slice(0, 3000)}` : ''}

Instructions:
- Write in a confident but genuine tone — not robotic or generic.
- Structure it into 4 clear paragraphs: Opening hook, Why them (skills match), Why this company, Closing CTA.
- Reference specific skills and the company name naturally.
- Keep it under 350 words.
- Do NOT use bullet points inside the letter.
- Output ONLY the letter text, no subject line, no "Here is your letter:" preamble.`

    setLoading(true)
    setLetter('')

    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 800,
            temperature: 0.8,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error?.message || 'API request failed.')
      }

      const raw = data.choices?.[0]?.message?.content
      if (!raw) throw new Error('No response received. Please try again.')

      const formatted = raw
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean)
        .join('\n\n')

      setLetter(formatted)
    } catch (err) {
      if (err.message?.toLowerCase().includes('api key') || err.message?.toLowerCase().includes('auth')) {
        setError('Invalid API key. Check your .env file and restart the dev server.')
      } else {
        setError(err.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    if (!letter) return
    navigator.clipboard.writeText(letter)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      })
      .catch(() => setError('Copy failed. Please copy manually.'))
  }

  return (
    <div className="app">
      <div className="blob" />
      <div className="blob2" />

      <div className="wrapper">
        <header>
          <div className="badge"><span className="dot" /> Powered by Groq AI</div>
          <h1>Cover Letter <em>Generator</em></h1>
          <p className="subtitle">Enter your details, upload your resume, and get a personalized AI-crafted cover letter in seconds.</p>
        </header>

        <div className="card">
          <div className="section-label">Your Details</div>

          <div className="grid-2">
            <div className="field">
              <label htmlFor="name">Full Name</label>
              <input id="name" type="text" name="name" autoComplete="name" placeholder="e.g. Priya Sharma" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="role">Job Role</label>
              <input id="role" type="text" name="role" autoComplete="off" placeholder="e.g. Frontend Developer" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="company">Company Name</label>
              <input id="company" type="text" name="company" autoComplete="organization" placeholder="e.g. Google" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="skills">Key Skills</label>
              <input id="skills" type="text" name="skills" autoComplete="off" placeholder="e.g. React, JavaScript, REST APIs" value={skills} onChange={(e) => setSkills(e.target.value)} />
            </div>
          </div>

          <div className="field" style={{ marginTop: '16px' }}>
            <label htmlFor="jobDesc">Job Description</label>
            <textarea id="jobDesc" placeholder="Paste the full job description here. The more detail, the better the letter..." value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} />
          </div>

          <div className="divider">Resume Upload (Optional)</div>

          <div className="upload-area" onClick={() => fileInputRef.current.click()}>
            <input ref={fileInputRef} type="file" accept=".pdf,.txt" hidden onChange={handleFileChange} />
            <div className="upload-icon">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
              </svg>
            </div>
            <div className="upload-text">
              <strong>Click to upload</strong> or drag & drop your resume
              <br /><span style={{ fontSize: '12px' }}>PDF or TXT — parsed automatically</span>
            </div>
            {fileName && <div className="file-chosen">Done: {fileName}</div>}
          </div>

          <button className="btn-generate" onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Cover Letter'}
          </button>

          {error && <div className="error-box">{error}</div>}
        </div>

        {loading && (
          <div className="loading-state">
            <div className="loader-ring" />
            <div>
              <div className="loading-title">Generating your letter<span className="loading-dots" /></div>
              <div className="loading-text">AI is crafting a personalized cover letter for you</div>
            </div>
          </div>
        )}

        {letter && (
          <div className="output-card">
            <div className="output-header">
              <div className="output-title">Your Cover Letter</div>
              <button className={`btn-copy ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                {copied ? (
                  <>
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg> Copied!
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg> Copy to Clipboard
                  </>
                )}
              </button>
            </div>
            <div className="letter-body">{letter}</div>
          </div>
        )}
      </div>
    </div>
  )
}