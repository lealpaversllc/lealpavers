import * as React from 'react'

import type { ContactSchema } from '@/lib/schemas/contact'

// Email clients ignore <style> and utility classes, so everything here is
// inline. This template used to render Tailwind classes and arrived unstyled.
const wrapper: React.CSSProperties = {
  margin: 0,
  padding: '24px',
  backgroundColor: '#f2f0ed',
  fontFamily: 'Arial, Helvetica, sans-serif',
  color: '#1c1917',
}

const card: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  overflow: 'hidden',
  border: '1px solid #e7e5e4',
}

const header: React.CSSProperties = {
  backgroundColor: '#961914',
  padding: '20px 24px',
}

const headerText: React.CSSProperties = {
  margin: 0,
  color: '#ffffff',
  fontSize: '18px',
  letterSpacing: '0.02em',
}

const labelCell: React.CSSProperties = {
  padding: '10px 24px 2px',
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: '#78716c',
}

const valueCell: React.CSSProperties = {
  padding: '0 24px 12px',
  fontSize: '16px',
  lineHeight: 1.5,
  color: '#1c1917',
  whiteSpace: 'pre-wrap',
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <>
      <tr>
        <td style={labelCell}>{label}</td>
      </tr>
      <tr>
        <td style={valueCell}>{value}</td>
      </tr>
    </>
  )
}

export const EmailTemplate = ({
  name,
  email,
  phone,
  address,
  description,
}: ContactSchema) => {
  return (
    <div style={wrapper}>
      <table role="presentation" cellPadding={0} cellSpacing={0} style={card}>
        <tbody>
          <tr>
            <td style={header}>
              <h1 style={headerText}>New quote request</h1>
            </td>
          </tr>
          <Row label="Name" value={name} />
          <Row label="Email" value={email} />
          <Row label="Phone" value={phone} />
          {address ? <Row label="Address" value={address} /> : null}
          {description ? <Row label="Project" value={description} /> : null}
        </tbody>
      </table>
    </div>
  )
}
