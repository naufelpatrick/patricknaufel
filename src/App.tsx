import { useState } from 'react'
import SecondaryPage from './SecondaryPage'
import { ArrowUpRight, ArrowRight, Menu, X, Layers3, Users2, BookOpen, Linkedin, Mail } from 'lucide-react'

const projects = [
  { num: '01', tag: 'DESENVOLVIMENTO PROFISSIONAL', name: 'Raio X do Designer', text: 'Uma experiência de autoconhecimento para designers identificarem e desenvolverem suas competências comportamentais.', url: 'https://www.raioxdodesigner.com', symbol: 'RX', variant: 'light' },
  { num: '02', tag: 'EDUCAÇÃO + TECNOLOGIA', name: 'PraxIA', text: 'Uma iniciativa para desenvolver a fluência digital docente e explorar o uso crítico e intencional da inteligência artificial.', url: 'https://radarpraxia.com', symbol: 'IA', variant: 'dark' },
  { num: '03', tag: 'UX + VISÃO ESTRATÉGICA', name: 'Fóton UX/UI Assessment', text: 'Diagnóstico estratégico de UX/UI voltado a compreender oportunidades de evolução em equipes e produtos.', url: '#contato', symbol: 'UX', variant: 'soft' },
]
const services = [
  { number: '01', title: 'Estratégia de produto & UX', description: 'Discovery, pesquisa, visão de produto e experiências orientadas às necessidades das pessoas e dos negócios.' },
  { number: '02', title: 'Mentorias & desenvolvimento', description: 'Acompanhamento de profissionais e equipes em design, estratégia e competências para o futuro.' },
  { number: '03', title: 'Palestras & workshops', description: 'Conversas e experiências de aprendizagem sobre design, inovação, produto e tecnologia.' },
]

function Portrait() {
  const [loaded, setLoaded] = useState(true)
  return <div className="portrait" aria-label="Retrato de Patrick Naufel">
    {loaded && <img src="/patrick-hero-cutout.webp" alt="Patrick Naufel, retrato com camiseta preta" loading="eager" onError={() => setLoaded(false)} />}
    <div className="portrait-label"><span>PATRICK NAUFEL</span><span>DESIGN & PRODUCT STRATEGIST</span></div>
  </div>
}
function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="eyebrow"><span>{number}</span><span className="slash">/</span><span>{children}</span></div>
}
export default function App() {
  const route = window.location.pathname.replace(/\/$/, '') || '/'
  if (route !== '/') return <SecondaryPage />
  return <Home />
}
function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)
  return <>
    <header className="site-header">
      <div className="container nav">
        <a href="#inicio" className="brand" onClick={close}>patrick naufel<span>.</span></a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Navegação principal">
          <a href="/sobre" onClick={close}>Sobre</a><a href="/projetos" onClick={close}>Projetos</a><a href="#atuacao" onClick={close}>Atuação</a><a href="#conhecimento" onClick={close}>Conhecimento</a>
          <a href="#contato" className="nav-contact" onClick={close}>Contato <ArrowUpRight size={14}/></a>
        </nav>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(v=>!v)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>
    <main>
      <section id="inicio" className="hero container">
        <div className="hero-copy">
          <SectionLabel number="PATRICK NAUFEL">DESIGN / PRODUTO / ESTRATÉGIA</SectionLabel>
          <h1>Design, Produto <br/>e Pessoas <em>—</em></h1>
          <p>Transformo problemas complexos em soluções que combinam experiência, estratégia e impacto real para pessoas, produtos e organizações.</p>
          <div className="hero-actions"><a className="button button-dark" href="/projetos">Conheça meus projetos <ArrowUpRight size={18}/></a><a className="text-link" href="/sobre">Sobre mim <ArrowUpRight size={17}/></a></div>
          <div className="hero-mini"><span>UX & RESEARCH</span><span>PRODUCT STRATEGY</span><span>DESIGN LEADERSHIP</span></div>
        </div>
        <Portrait/>
      </section>
      <div className="ticker"><div className="container ticker-items"><span>ESTRATÉGIA DE PRODUTO</span><span>EXPERIÊNCIA DO USUÁRIO</span><span>INOVAÇÃO</span><span>EDUCAÇÃO</span></div></div>
      <section id="sobre" className="section container about">
        <div className="about-meta"><SectionLabel number="01">SOBRE / PERSPECTIVA</SectionLabel><span className="vertical-rule" /></div>
        <div className="about-main"><h2>Design não é uma disciplina isolada. <span>É uma forma de conectar perspectivas.</span></h2><p>Minha trajetória reúne design, estratégia de produto, pesquisa, educação e inovação. Ao longo dela, aprendi que boas soluções começam com perguntas melhores — e evoluem quando diferentes áreas trabalham em torno de um propósito comum.</p><a className="inline-cta" href="/sobre">Conheça minha trajetória <ArrowUpRight size={18}/></a></div>
      </section>
      <section id="projetos" className="section projects-section"><div className="container">
        <div className="section-heading"><div><SectionLabel number="02">PROJETOS & INICIATIVAS</SectionLabel><h2>Ideias que <em>ganham forma.</em></h2></div><p>Algumas iniciativas que conectam conhecimento, diagnóstico, experiência e criação de valor.</p></div>
        <div className="project-grid">{projects.map(p=><article className="project-card" key={p.num}><a href={"/projetos/" + (p.num === "01" ? "raio-x-do-designer" : p.num === "02" ? "praxia" : "foton-ux-ui-assessment")}  className={`project-art ${p.variant}`} aria-label={`Conhecer ${p.name}`}><span className="art-top">{p.num} / {p.tag}</span><strong>{p.symbol}</strong><ArrowUpRight className="art-arrow" size={27}/></a><div className="project-detail"><div className="project-number">{p.num} / PROJETO</div><h3>{p.name}</h3><p>{p.text}</p><a href={p.url} target={p.url.startsWith('http') ? '_blank' : undefined} rel={p.url.startsWith('http') ? 'noopener noreferrer' : undefined}>Explorar iniciativa <ArrowUpRight size={16}/></a></div></article>)}</div>
      </div></section>
      <section id="atuacao" className="section services-section"><div className="container"><SectionLabel number="03">COMO POSSO CONTRIBUIR</SectionLabel><div className="services-intro"><h2>Da reflexão <em>à ação.</em></h2><p>Atuo ao lado de profissionais e organizações em desafios que pedem estratégia, clareza e novas perspectivas.</p></div><div className="service-list">{services.map(s=><div className="service-row" key={s.number}><span className="service-number">{s.number}</span><h3>{s.title}</h3><p>{s.description}</p><ArrowUpRight size={22}/></div>)}</div><a href="#contato" className="button button-outline">Vamos construir algo juntos <ArrowUpRight size={18}/></a></div></section>
      <section id="conhecimento" className="section container knowledge"><div><SectionLabel number="04">CONHECIMENTO EM MOVIMENTO</SectionLabel><h2>Pensar, compartilhar, <em>transformar.</em></h2></div><div className="knowledge-content"><p>Na <strong>Arquitetura do Conhecimento</strong>, exploro ideias sobre design, tecnologia, comportamento e as transformações que moldam nosso trabalho. Compartilho também vivências de sala de aula, pesquisa e conversas no InPodcast.</p><div className="knowledge-links"><a href="https://patricknaufel.substack.com/" target="_blank" rel="noopener noreferrer"><BookOpen size={20}/> Arquitetura do Conhecimento <ArrowUpRight size={18}/></a><a href="https://www.inpodcast.com.br" target="_blank" rel="noopener noreferrer"><Layers3 size={20}/> InPodcast <ArrowUpRight size={18}/></a><a href="https://dashboard-lages.vercel.app" target="_blank" rel="noopener noreferrer"><Users2 size={20}/> Pesquisa sobre maturidade digital <ArrowUpRight size={18}/></a></div></div></section>
      <section id="contato" className="contact-section"><div className="container"><SectionLabel number="05">PRÓXIMAS CONVERSAS</SectionLabel><h2>Tem um desafio, uma ideia <em>ou uma oportunidade?</em></h2><p>Vamos conversar sobre projetos, consultorias, mentorias, palestras e oportunidades profissionais.</p><div className="contact-actions"><a className="button button-dark" href="https://www.linkedin.com/in/patricknaufel/" target="_blank" rel="noopener noreferrer">Entre em contato pelo LinkedIn <ArrowUpRight size={19}/></a><a className="button button-email" href="mailto:naufelpatrick@gmail.com">Mande um e-mail <Mail size={19}/></a></div></div></section>
    </main>
    <footer className="footer"><div className="container footer-inner"><a href="#inicio" className="brand brand-white">patrick naufel<span>.</span></a><span>DESIGN & PRODUCT STRATEGIST</span><div><a href="https://www.linkedin.com/in/patricknaufel/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20}/></a><a href="https://www.inpodcast.com.br" target="_blank" rel="noopener noreferrer" aria-label="InPodcast"><ArrowUpRight size={20}/></a><a href="mailto:naufelpatrick@gmail.com" aria-label="Enviar e-mail"><Mail size={20}/></a></div><a href="#inicio" className="back-top">Voltar ao topo <ArrowRight size={15}/></a></div></footer>
  </>
}
