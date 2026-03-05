function SectionTitle({ overline, title, subtitle, align = 'center' }) {
  return (
    <div className={`section-title ${align === 'left' ? 'left' : ''}`}>
      {overline && <p className="overline">{overline}</p>}
      <h2>{title}</h2>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  )
}

export default SectionTitle
