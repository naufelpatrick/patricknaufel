type BrandLockupProps = {
  href: string
  className?: string
  onClick?: () => void
}

/**
 * Assinatura tipográfica baseada na direção A1 do branding pessoal.
 * Manrope + IBM Plex Mono; nome próprio e eixo editorial em laranja.
 * Não cria um símbolo ou monograma novo.
 */
export default function BrandLockup({ href, className = '', onClick }: BrandLockupProps) {
  return (
    <a href={href} className={`brand-lockup ${className}`.trim()} onClick={onClick} aria-label="Patrick Naufel — Arquitetura do Conhecimento">
      <span className="brand-lockup__name">Patrick Naufel</span>
      <span className="brand-lockup__descriptor"><span className="brand-lockup__rule" aria-hidden="true" />Arquitetura do Conhecimento</span>
    </a>
  )
}
