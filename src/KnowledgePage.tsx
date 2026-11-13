import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight, BookOpen, GraduationCap, Mic2, CalendarDays } from 'lucide-react'

const newsletter='https://patricknaufel.substack.com/'
const research='https://dashboard-lages.vercel.app/'
const podcast='https://www.inpodcast.com.br/'
const tdc='https://thedevconf.com/tdc/2026/florianopolis/trilha-design-e-estrategia-de-produto'

function Eyebrow({children}:{children:React.ReactNode}){return <span className="phase-eyebrow">{children}</span>}
function External({href,children}:{href:string,children:React.ReactNode}){return <a href={href} target="_blank" rel="noopener noreferrer" className="phase-inline">{children}<ArrowUpRight size={18}/></a>}


type RecentPost = { title: string; url: string; date: string; excerpt: string }
function RecentArticles(){
  const [posts,setPosts]=useState<RecentPost[]>([])
  const [status,setStatus]=useState<'loading'|'ready'|'empty'|'unavailable'>('loading')
  useEffect(()=>{
    const controller=new AbortController()
    async function load(){
      try{
        const response=await fetch('/api/posts',{signal:controller.signal})
        if(!response.ok)throw new Error('RSS indisponível')
        const data:unknown=await response.json()
        if(!data || typeof data!=='object' || !('posts' in data) || !Array.isArray(data.posts)) throw new Error('Resposta inválida')
        const safe:RecentPost[]=data.posts.filter((p:unknown):p is RecentPost=> {
          if(!p || typeof p!=='object')return false
          const item=p as Record<string,unknown>
          return typeof item.title==='string' && typeof item.url==='string' &&
            item.url.startsWith('https://patricknaufel.substack.com/') &&
            typeof item.date==='string' && typeof item.excerpt==='string'
        }).slice(0,6)
        if(!controller.signal.aborted){setPosts(safe);setStatus(safe.length?'ready':'empty')}
      } catch {
        if(!controller.signal.aborted)setStatus('unavailable')
      }
    }
    void load()
    return ()=>controller.abort()
  },[])
  function formattedDate(date:string){
    if(!date)return 'PUBLICAÇÃO'
    const parsed=new Date(date)
    return Number.isNaN(parsed.getTime())?'PUBLICAÇÃO':parsed.toLocaleDateString('pt-BR',{day:'2-digit',month:'short',year:'numeric'})
  }
  return <section className="phase-section knowledge-articles" id="artigos-recentes"><div className="phase-inner">
    <div className="knowledge-articles-heading"><div><Eyebrow>ARTIGOS / ATUALIZADOS PELO SUBSTACK</Eyebrow><h2>Leituras e reflexões <em>recentes.</em></h2></div><a href={newsletter} className="phase-inline" target="_blank" rel="noopener noreferrer">Ver todos os textos <ArrowUpRight size={18}/></a></div>
    {status==='loading'&&<p className="knowledge-load" role="status">Carregando publicações recentes…</p>}
    {status==='ready'&&<div className="knowledge-article-grid">{posts.map((p,i)=><a className="knowledge-article" key={p.url} href={p.url} target="_blank" rel="noopener noreferrer"><div className="knowledge-article-top"><span>0{i+1} / {formattedDate(p.date)}</span><ArrowUpRight size={18}/></div><h3>{p.title}</h3>{p.excerpt&&<p>{p.excerpt}</p>}<span className="knowledge-article-link">Ler no Substack <ArrowUpRight size={16}/></span></a>)}</div>}
    {(status==='unavailable'||status==='empty')&&<div className="knowledge-unavailable"><p>Os artigos não puderam ser exibidos aqui no momento. O arquivo completo continua disponível no Substack.</p><a className="phase-inline" href={newsletter} target="_blank" rel="noopener noreferrer">Acessar a newsletter <ArrowUpRight size={18}/></a></div>}
  </div></section>
}

export default function KnowledgePage(){return <>
<section className="phase-hero"><div className="phase-inner"><a className="phase-back" href="/"><ArrowLeft size={16}/> Voltar ao início</a><Eyebrow>04 / CONHECIMENTO & PRESENÇA</Eyebrow><h1>Ideias que circulam. <em>Conhecimento que se transforma.</em></h1><p className="phase-lead">Escrevo, ensino, pesquiso e converso sobre design, estratégia de produto, inovação, comportamento e tecnologia. Este é o espaço onde essas perspectivas se encontram.</p></div></section>
<section className="phase-section knowledge-feature"><div className="phase-inner knowledge-feature-grid">
 <div className="knowledge-feature-intro"><Eyebrow>NEWSLETTER / ARQUITETURA DO CONHECIMENTO</Eyebrow><h2>Boas ideias pedem <em>tempo para pensar.</em></h2><p>Na Arquitetura do Conhecimento, compartilho reflexões e leituras sobre design, produto, pensamento crítico, tecnologia e as mudanças que atravessam o trabalho contemporâneo.</p><p>O Substack reúne os textos e é o lugar para acompanhar novas publicações e participar da conversa.</p><External href={newsletter}>Ler e assinar a newsletter</External></div>
 <a className="knowledge-cover" href={newsletter} target="_blank" rel="noopener noreferrer" aria-label="Conhecer a newsletter Arquitetura do Conhecimento"><span>PUBLICAÇÃO INDEPENDENTE</span><strong>Arquitetura<br/>do<br/><em>Conhecimento.</em></strong><span>DESIGN / PRODUTO / TECNOLOGIA ↗</span></a>
</div></section>
<RecentArticles/>
<section className="phase-section phase-soft"><div className="phase-inner"><Eyebrow>EIXOS EDITORIAIS</Eyebrow><h2>O que costumo <em>investigar e compartilhar.</em></h2><div className="knowledge-themes">
 <article><span>01 / DESIGN & PRODUTO</span><h3>Experiência, valor e decisões</h3><p>O que torna uma experiência útil? Como transformar pesquisa e visão estratégica em decisões melhores?</p></article>
 <article><span>02 / COMPORTAMENTO</span><h3>Pessoas antes das ferramentas</h3><p>Habilidades comportamentais, pensamento crítico, aprendizagem e colaboração em ambientes complexos.</p></article>
 <article><span>03 / TECNOLOGIA</span><h3>IA, inovação e transformação digital</h3><p>Uma leitura crítica sobre as possibilidades e os limites da tecnologia quando aplicada à vida e ao trabalho.</p></article>
</div><div className="knowledge-browse"><External href={newsletter}>Explorar todos os artigos no Substack</External></div></div></section>
<section className="phase-section"><div className="phase-inner phase-split"><div><Eyebrow>PESQUISA ACADÊMICA</Eyebrow><h2>Investigar para <em>compreender.</em></h2><div className="knowledge-topic-mark"><GraduationCap size={37}/><span>MESTRADO / UNIPLAC</span></div></div><div className="phase-prose"><p>Minha pesquisa de mestrado em Engenharia e Gestão de Sistemas Produtivos analisa a relação entre maturidade digital e inovatividade em organizações de Lages, Santa Catarina.</p><p>O trabalho envolve a coleta e análise de dados e busca contribuir para uma compreensão mais aplicada das capacidades digitais e da inovação no contexto organizacional local.</p><p className="knowledge-caveat"><strong>Pesquisa em andamento.</strong> Os resultados exibidos no painel de acompanhamento são preliminares e não devem ser interpretados como conclusões finais da dissertação.</p><External href={research}>Conhecer o painel da pesquisa</External></div></div></section>
<section className="phase-section phase-soft"><div className="phase-inner"><Eyebrow>CONVERSAS / IDEIAS / ENCONTROS</Eyebrow><h2>Conhecimento também se constrói <em>em diálogo.</em></h2><div className="knowledge-participations">
 <article><div className="knowledge-part-icon"><Mic2 size={27}/></div><div><span>INPODCAST / CONVERSAS</span><h3>InPodcast</h3><p>Conversas com Giovani Letti e convidados sobre ideias, cultura, educação, negócios e tecnologia, exploradas sob perspectivas diferentes.</p><External href={podcast}>Conhecer episódios</External></div></article>
 <article><div className="knowledge-part-icon"><CalendarDays size={27}/></div><div><span>COMUNIDADE / EVENTOS</span><h3>The Developers Conference (TDC)</h3><p>Participação na coordenação da trilha de Design e Estratégia de Produto do TDC Florianópolis 2026, além de atividades anteriores em comunidades de UX e produto.</p><External href={tdc}>Ver programação e coordenação</External></div></article>
 <article><div className="knowledge-part-icon"><BookOpen size={27}/></div><div><span>FORMAÇÃO / FLUÊNCIA DIGITAL</span><h3>PraxIA para instituições</h3><p>Formações e workshops com foco em fluência digital docente, inteligência artificial e integração pedagógica responsável da tecnologia.</p><External href="https://www.radarpraxia.com/para-instituicoes">Conhecer a proposta</External></div></article>
</div></div></section>
<section className="phase-section phase-ink"><div className="phase-inner"><Eyebrow>COMPARTILHAR CONHECIMENTO</Eyebrow><h2>Uma conversa pode abrir <em>novas perspectivas.</em></h2><p>Para convites de palestras, participações em eventos, entrevistas ou projetos de pesquisa, entre em contato.</p><div className="phase-actions"><a className="phase-button" href="mailto:naufelpatrick@gmail.com?subject=Convite%20-%20palestra%2C%20evento%20ou%20pesquisa">Enviar convite por e-mail <ArrowUpRight size={18}/></a><a className="phase-outline" href="/atuacao/palestras-workshops">Palestras e workshops <ArrowUpRight size={18}/></a></div></div></section>
</>}
