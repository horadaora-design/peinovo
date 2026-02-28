import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Brain, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  CircleCheckBig, 
  CircleHelp, 
  Dna, 
  Lock, 
  PackageCheck, 
  Pencil, 
  Pin, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  Type as TypeIcon, 
  Zap 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CHECKOUT_URL = "https://www.ggcheckout.com/checkout/v5/xi498KPqTw2NpUI0Apzh";

const MATERIAL_SAMPLES = [
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/02/11.png",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/02/12.png",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/02/13.png",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/02/14.png",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/02/15.png"
];

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider ${className}`}>
    {children}
  </span>
);

const Section = ({ children, className = "", id = "", tight = false }: { children: React.ReactNode, className?: string, id?: string, tight?: boolean }) => (
  <section id={id} className={`${tight ? "py-8 md:py-16" : "py-12 md:py-24"} px-4 md:px-6 ${className}`}>
    <div className="max-w-4xl mx-auto">
      {children}
    </div>
  </section>
);

const Button = ({ children, onClick, href, className = "" }: { children: React.ReactNode, onClick?: () => void, href?: string, className?: string }) => {
  const content = (
    <button onClick={onClick} className={`w-full py-4 md:py-6 px-6 md:px-10 rounded-2xl font-extrabold text-base md:text-2xl transition-all active:scale-95 shadow-lg hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2 ${className}`}>
      {children}
    </button>
  );
  return href ? <a href={href} className="block w-full">{content}</a> : content;
};

const BonusCard = ({ children, title, subtitle, value }: { children?: React.ReactNode, title: string, subtitle: string, value: string }) => {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className="absolute top-0 right-0 bg-brand-yellow text-brand-blue font-bold px-4 py-1 rounded-bl-xl text-xs">
        VALIA R$ {value}
      </div>
      <div className="mb-4">
        <div className="w-12 h-12 bg-brand-cream rounded-xl flex items-center justify-center mb-4">
          <PackageCheck className="text-brand-blue" size={24} />
        </div>
        <h4 className="font-serif text-xl text-brand-blue mb-1">{title}</h4>
        <p className="text-slate-500 text-sm italic mb-4">{subtitle}</p>
      </div>
      <div className="text-slate-600 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-2 border-slate-100 rounded-2xl overflow-hidden bg-white mb-3">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-5 flex items-center justify-between text-left font-bold text-slate-800 gap-4 transition-colors hover:bg-slate-50">
        <span className="text-sm md:text-base leading-tight">{question}</span>
        <CircleHelp size={18} className={`shrink-0 transition-transform ${isOpen ? "rotate-180 text-blue-600" : "text-slate-300"}`} />
      </button>
      {isOpen && <div className="p-5 pt-0 text-sm md:text-base text-slate-600 border-t-2 border-slate-50 leading-relaxed">{answer}</div>}
    </div>
  );
};

const SampleCarousel = () => {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev + 1) % MATERIAL_SAMPLES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + MATERIAL_SAMPLES.length) % MATERIAL_SAMPLES.length);
  return (
    <div className="relative max-w-4xl mx-auto px-4">
      <div className="relative group">
        <div className="bg-white p-2 md:p-4 rounded-[2rem] shadow-2xl border-4 md:border-8 border-blue-500 overflow-hidden relative aspect-[3/4] md:aspect-[4/3] flex items-center justify-center">
          <img src={MATERIAL_SAMPLES[current]} alt={`Amostra ${current + 1}`} className="w-full h-full object-contain select-none transition-all duration-300" />
        </div>
        <button onClick={prev} className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 bg-white p-2 md:p-4 rounded-full shadow-xl hover:bg-blue-500 hover:text-white transition-all z-20">
          <ChevronLeft size={24} />
        </button>
        <button onClick={next} className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 bg-white p-2 md:p-4 rounded-full shadow-xl hover:bg-blue-500 hover:text-white transition-all z-20">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="mt-8 flex justify-center flex-wrap gap-2">
        {MATERIAL_SAMPLES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${current === i ? "bg-blue-600 w-6 md:w-8" : "bg-slate-300"}`} />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState(3599);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const scrollToOffer = () => {
    const element = document.getElementById("oferta");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-brand-cream text-[#1e293b] font-sans">
      {/* Top Banner */}
      <div className="bg-brand-blue text-white py-3 px-4 text-center font-bold text-[10px] md:text-sm sticky top-0 z-[60] flex justify-center items-center gap-2 shadow-lg">
        <Sparkles size={14} className="text-brand-yellow animate-pulse" />
        🚀 LANÇAMENTO 2026 — Único material do mercado atualizado com o Decreto nº 12.773/2025 e alinhado à BNCC
      </div>

      {/* Hero Section */}
      <header className="bg-brand-blue pt-12 md:pt-20 pb-16 md:pb-24 px-4 text-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black text-white leading-[1.1] md:leading-[1] tracking-tighter mb-4 text-balance uppercase px-2">
            150 PEIs prontos
            <br className="hidden sm:block" />
            para usar <span className="relative inline-block">
              <span className="relative z-10 text-red-500">HOJE MESMO.</span>
              <span className="absolute left-0 bottom-1 md:bottom-2 w-full h-1 md:h-8 bg-brand-yellow/80 -z-10 rounded-lg" />
            </span>
          </h1>
          
          <p className="text-white text-lg md:text-2xl font-bold max-w-4xl mx-auto mb-12 leading-relaxed text-balance">
            Planos Educacionais Individualizados completos, atualizados com o Decreto nº 12.773/2025 e totalmente alinhados à BNCC — para TEA, TDAH, Deficiência Intelectual e Deficiência Física/Motora.
          </p>

          <div className="flex justify-center mb-12">
            <div className="w-full max-w-6xl relative px-4">
              <img 
                src="https://digitallfp.wordpress.com/wp-content/uploads/2026/02/mockup-1.png" 
                alt="Mockup 150 PEIs" 
                className="w-full h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {[
              { label: "Autismo (TEA)", color: "bg-[#7c3aed]", icon: <Brain size={14} /> },
              { label: "TDAH", color: "bg-[#f59e0b]", icon: <Zap size={14} /> },
              { label: "Dislexia", color: "bg-[#0ea5e9]", icon: <TypeIcon size={14} /> },
              { label: "Intelectual", color: "bg-[#f472b6]", icon: <Dna size={14} /> },
              { label: "TOD", color: "bg-red-500", icon: <ShieldAlert size={14} /> },
              { label: "Down", color: "bg-emerald-500", icon: <Star size={14} /> },
              { label: "Física", color: "bg-blue-500", icon: <PackageCheck size={14} /> },
              { label: "Visual", color: "bg-indigo-500", icon: <Sparkles size={14} /> },
              { label: "Auditiva", color: "bg-orange-500", icon: <Pin size={14} /> },
              { label: "Altas Habilidades", color: "bg-yellow-500", icon: <Sparkles size={14} /> }
            ].map((tag, i) => (
              <div key={i} className={`${tag.color} text-white px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg md:rounded-xl font-black text-[10px] md:text-sm flex items-center gap-2 shadow-sm uppercase tracking-wide`}>
                {tag.icon} {tag.label}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6">
            <Button onClick={scrollToOffer} className="bg-brand-yellow text-brand-blue hover:bg-yellow-400 max-w-md border-none text-xl md:text-2xl py-6 rounded-full">
              QUERO MEUS PEIS PRONTOS AGORA <ArrowRight className="ml-2" />
            </Button>
            
            <div className="flex items-center gap-4 text-white/60 text-xs md:text-sm font-bold uppercase tracking-widest">
              <div className="flex items-center gap-1"><ShieldCheck size={16} className="text-brand-yellow" /> Compra Segura</div>
              <div className="w-1 h-1 bg-white/20 rounded-full" />
              <div className="flex items-center gap-1"><Zap size={16} className="text-brand-yellow" /> Acesso Imediato</div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-brand-blue-light py-8 md:py-12 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            <div>
              <div className="font-serif text-4xl md:text-6xl text-brand-yellow mb-1">150</div>
              <div className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest">Modelos de PEIs</div>
            </div>
            <div>
              <div className="font-serif text-4xl md:text-6xl text-brand-yellow mb-1">14</div>
              <div className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest">Tipos de Deficiências</div>
            </div>
            <div>
              <div className="font-serif text-4xl md:text-6xl text-brand-yellow mb-1">10</div>
              <div className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest">Competências BNCC</div>
            </div>
            <div>
              <div className="font-serif text-4xl md:text-6xl text-brand-yellow mb-1">04</div>
              <div className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest">Bônus Exclusivos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Value Props */}
      <Section className="bg-brand-cream border-b border-slate-200" tight>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-black text-brand-blue uppercase tracking-tight leading-none text-balance">
            Se você monta PEI do zero, está pagando com o seu tempo.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {[
            { text: "PEI não deveria levar horas", color: "border-blue-500" },
            { text: "Você não precisa reinventar tudo", color: "border-red-500" },
            { text: "Seu tempo vale mais", color: "border-green-500" }
          ].map((item, i) => (
            <div key={i} className={`bg-white border-2 ${item.color} p-6 md:p-10 rounded-3xl shadow-sm flex items-center gap-4 transition-transform hover:scale-105`}>
              <CircleCheckBig className="text-green-600 shrink-0" size={32} />
              <span className="text-lg md:text-xl font-black text-slate-800 leading-tight">{item.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-12 md:mt-16 text-center max-w-3xl mx-auto space-y-6">
          <p className="text-xl md:text-3xl font-black text-brand-blue leading-tight">
            Por isso, eu reuni mais de 150 modelos de PEIs, PDIs e PAEE prontos para usar.
          </p>
          <p className="text-lg md:text-2xl font-bold text-slate-600 leading-relaxed">
            São modelos pensados para você modelar, editar e entregar em poucos minutos, sem insegurança e sem retrabalho.
          </p>
          <div className="w-24 h-2 bg-brand-yellow mx-auto rounded-full opacity-30" />
        </div>
      </Section>

      {/* What you get */}
      <Section className="bg-white">
        <div className="text-center mb-16">
          <Badge className="bg-brand-blue text-white mb-6 !text-xs md:!text-lg py-2.5 px-6 shadow-md">
            O que você recebe ao adquirir o kit
          </Badge>
          <h2 className="text-3xl md:text-6xl font-black text-brand-blue uppercase tracking-tighter leading-[1] mb-6">
            Tudo o que você precisa para montar PEIs sem sofrimento em 2026
          </h2>
          <p className="text-xl md:text-2xl font-bold text-slate-500 max-w-2xl mx-auto">
            Não é só um modelo. É um kit completo para você nunca mais travar na hora de montar PEI, PDI ou PAEE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {[
            { 
              num: "1️⃣", 
              title: "150 MODELOS DE PEIs PRONTOS (EDITÁVEIS)", 
              list: ["Modelos completos", "Estrutura já validada", "Linguagem técnica aceita por coordenação", "Prontos para adaptar em poucos minutos"],
              footer: "Você só ajusta para a realidade do aluno e entrega."
            },
            { 
              num: "2️⃣", 
              title: "MODELOS DE PEI POR NECESSIDADE EDUCACIONAL", 
              list: ["Autismo (TEA)", "TDAH", "Dislexia", "Deficiência Intelectual", "Educação Infantil", "Ensino Fundamental"],
              footer: "Nada genérico. Modelos pensados para a sala de aula real."
            },
            { 
              num: "3️⃣", 
              title: "MODELOS DE PDI (PLANO DE DESENVOLVIMENTO INDIVIDUAL)", 
              list: ["Estrutura pronta", "Campos organizados", "Fácil de preencher", "Alinhado ao PEI"],
              footer: "Ideal para relatórios e acompanhamento individual."
            },
            { 
              num: "4️⃣", 
              title: "MODELO DE PAEE (ATENDIMENTO EDUCACIONAL ESPECIALIZADO)", 
              list: ["Estrutura completa", "Objetivos claros", "Estratégias organizadas", "Pronto para editar"],
              footer: "Você não precisa mais procurar modelo na internet."
            }
          ].map((item, i) => (
            <div key={i} className="bg-brand-cream border-2 border-slate-100 p-8 rounded-[2rem] hover:border-brand-blue transition-colors group">
              <h3 className="text-xl md:text-2xl font-black text-brand-blue uppercase leading-tight">{item.num} {item.title}</h3>
              <ul className="mt-4 space-y-3 mb-6">
                {item.list.map((li, j) => (
                  <li key={j} className="flex items-start gap-2 font-bold text-slate-600">
                    <Check className="text-green-600 shrink-0 mt-1" size={18} /> {li}
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <Pin className="text-brand-blue shrink-0 rotate-12" size={20} />
                <p className="text-sm font-black text-brand-blue">{item.footer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={scrollToOffer} className="bg-green-500 text-white border-b-8 border-green-700 hover:bg-green-400 max-w-2xl mx-auto shadow-xl">
            👉 Quero meu kit completo agora
          </Button>
        </div>
      </Section>

      {/* Samples */}
      <Section className="bg-blue-50 border-y border-blue-100">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-5xl font-black text-slate-800 uppercase px-4">Amostra do Material</h2>
          <p className="text-sm md:text-xl text-slate-600 mt-4 font-medium px-4">
            Confira a qualidade técnica do conteúdo: <span className="text-blue-600 font-black italic">Material em Word e 100% editável.</span>
          </p>
        </div>
        <SampleCarousel />
      </Section>

      {/* Bonus Section */}
      <Section className="bg-white">
        <div className="text-center mb-16">
          <Badge className="bg-brand-blue text-white mb-6 !text-xs md:!text-lg py-2.5 px-6 shadow-md">
            BÔNUS EXCLUSIVOS
          </Badge>
          <h2 className="text-3xl md:text-6xl font-black text-brand-blue uppercase tracking-tighter leading-[1] mb-6">
            Você leva muito mais <br className="hidden md:block" /> do que 150 PEIs
          </h2>
          <p className="text-xl md:text-2xl font-bold text-slate-500 max-w-3xl mx-auto">
            Junto com os 150 PEIs, você recebe 4 materiais extras — prontos para usar, sem custo adicional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <BonusCard title="🥇 BÔNUS 1" subtitle="Banco de Objetivos para cada deficiência Prontos" value="97,00">
            <p className="text-xs md:text-sm italic font-bold text-slate-600 mb-4">“Nunca mais trave na hora de escrever objetivos”</p>
            <div className="space-y-1.5 text-[10px] md:text-xs font-bold text-slate-700">
              <p className="uppercase text-brand-blue font-black">Inclui objetivos prontos por:</p>
              <div className="flex flex-wrap gap-x-2 text-brand-blue font-black">
                <span>TEA</span> <span>•</span> <span>TDAH</span> <span>•</span> <span>DI</span> <span>•</span> <span>Dislexia</span>
              </div>
            </div>
          </BonusCard>

          <BonusCard title="🥈 BÔNUS 2" subtitle="Frases Prontas (Copia e Cola)" value="67,00">
            <p className="text-xs md:text-sm italic font-bold text-slate-600 mb-4">“Copiar, colar e entregar”</p>
            <ul className="list-disc pl-4 space-y-1 text-[10px] md:text-xs font-bold text-slate-700">
              <li>Justificativa pedagógica</li>
              <li>Avaliação inicial</li>
              <li>Acompanhamento</li>
            </ul>
          </BonusCard>

          <BonusCard title="🥉 BÔNUS 3" subtitle="Checklist de PEI Aprovado" value="47,00">
            <p className="text-xs md:text-sm italic font-bold text-slate-600 mb-4">“Antes de entregar, confira isso”</p>
            <ul className="list-disc pl-4 space-y-1 text-[10px] md:text-xs font-bold text-slate-700">
              <li>O que não pode faltar</li>
              <li>Erros mais comuns</li>
              <li>O que a coordenação observa</li>
            </ul>
          </BonusCard>

          <BonusCard title="🏅 BÔNUS 4" subtitle="+100 Atividades para Autismo" value="57,00">
            <p className="text-xs md:text-sm italic font-bold text-slate-600 mb-4">“Aplicar sem precisar adaptar do zero”</p>
            <p className="text-[10px] md:text-xs font-bold text-slate-700">Material pronto para aplicar no AEE e sala regular.</p>
          </BonusCard>

          <BonusCard title="🏅 BÔNUS 5" subtitle="+240 relatórios descritivos prontos" value="77,00">
            <p className="text-xs md:text-sm italic font-bold text-slate-600 mb-4">“Economize dias de trabalho na escrita dos relatórios”</p>
            <p className="text-[10px] md:text-xs font-bold text-slate-700">Modelos prontos para preenchimento e entrega rápida.</p>
          </BonusCard>

          <BonusCard title="🎁 BÔNUS 6" subtitle="Checklist de Acessibilidade Escolar" value="47,00">
            <p className="text-xs md:text-sm italic font-bold text-slate-600 mb-4">“Garanta que sua escola seja inclusiva”</p>
            <p className="text-[10px] md:text-xs font-bold text-slate-700">Um guia prático para avaliar a acessibilidade física e pedagógica.</p>
          </BonusCard>

          <BonusCard title="🎁 BÔNUS 7" subtitle="Guia de Reunião com a Família" value="57,00">
            <p className="text-xs md:text-sm italic font-bold text-slate-600 mb-4">“Tenha reuniões mais produtivas e acolhedoras”</p>
            <p className="text-[10px] md:text-xs font-bold text-slate-700">Roteiro completo para conversar com os pais sobre o PEI.</p>
          </BonusCard>

          <BonusCard title="🎁 BÔNUS 8" subtitle="Modelos de Relatório de AEE" value="67,00">
            <p className="text-xs md:text-sm italic font-bold text-slate-600 mb-4">“Relatórios técnicos sem complicação”</p>
            <p className="text-[10px] md:text-xs font-bold text-slate-700">Modelos prontos para o Atendimento Educacional Especializado.</p>
          </BonusCard>

          <BonusCard title="🎁 BÔNUS 9" subtitle="Glossário da Legislação Educacional" value="37,00">
            <p className="text-xs md:text-sm italic font-bold text-slate-600 mb-4">“Entenda os termos técnicos da lei”</p>
            <p className="text-[10px] md:text-xs font-bold text-slate-700">Os principais termos e leis explicados de forma simples.</p>
          </BonusCard>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section className="bg-brand-cream border-y border-slate-200">
        <div className="text-center mb-16">
          <Badge className="bg-brand-blue text-white mb-4">O que dizem os educadores</Badge>
          <h2 className="text-3xl md:text-6xl font-black text-brand-blue uppercase tracking-tighter leading-tight">
            Aprovado por quem <br className="hidden md:block" /> está na sala de aula
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              initial: "M",
              name: "Mariana Costa",
              role: "Professora de AEE — Ensino Fundamental",
              text: "Economizei semanas de trabalho. Os PEIs já vêm com os objetivos alinhados à BNCC e referenciados ao Decreto 12.773. Só precisei ajustar os dados do aluno e personalizar algumas estratégias."
            },
            {
              initial: "F",
              name: "Fernanda Rocha",
              role: "Coordenadora Pedagógica — Rede Municipal",
              text: "Como coordenadora, precisava de um material que já viesse na conformidade legal mais recente. Este material está atualizado com o Decreto 12.773/2025 — algo que a maioria dos outros materiais do mercado ainda não tem."
            },
            {
              initial: "R",
              name: "Ricardo Alves",
              role: "Especialista em Educação Especial — UFRJ",
              text: "O fato de ter PEIs específicos para cada condição E cada nível de ensino faz toda a diferença. O PEI para TEA no Ensino Médio é completamente diferente do da Educação Infantil — como deveria ser."
            }
          ].map((testimonial, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col h-full">
              <div className="mb-6 text-brand-yellow">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
              </div>
              <p className="text-slate-600 font-bold italic mb-8 flex-grow leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white font-black text-xl">
                  {testimonial.initial}
                </div>
                <div>
                  <h4 className="font-black text-brand-blue leading-none mb-1">{testimonial.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing Section */}
      <Section id="oferta" className="bg-brand-blue pt-16 md:pt-24 pb-32 md:pb-48">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-24 md:w-40 h-10 md:h-16 bg-slate-200 border-x-4 border-t-4 border-slate-300 rounded-t-3xl z-20 flex items-center justify-center">
              <div className="w-12 md:w-20 h-2 md:h-3 bg-slate-400 rounded-full" />
            </div>
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(255,255,255,0.05)] border-4 border-slate-800 overflow-hidden relative z-10">
              <div className="bg-brand-blue py-8 md:py-12 px-6 text-center text-white">
                <Badge className="bg-white/20 text-white mb-4 border border-white/30">Oportunidade Única</Badge>
                <h3 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter leading-tight">OFERTA DE LANÇAMENTO</h3>
              </div>
              <div className="p-6 md:p-12">
                <div className="mb-10 md:mb-12 space-y-4">
                  <h4 className="text-brand-blue font-black text-lg md:text-2xl uppercase tracking-tight flex items-center gap-2 mb-6">
                    <Sparkles className="text-brand-yellow" fill="currentColor" /> O que você vai receber:
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { text: "150 PEIs, PDIs, PAEE e Estudo de Caso Editáveis", bold: true },
                      { text: "Totalmente editáveis no Word e Canva", bold: false },
                      { text: "Alinhados à BNCC com foco em educação regular e especial", bold: false },
                      { text: "BÔNUS 1: Banco de Objetivos Prontos", bold: true },
                      { text: "BÔNUS 2: Frases Prontas (Copia e Cola)", bold: true },
                      { text: "BÔNUS 3: Checklist de PEI Aprovado", bold: true },
                      { text: "BÔNUS 4: +100 Atividades para autismo", bold: true },
                      { text: "BÔNUS 5: +240 Relatórios Descritivos Prontos", bold: true },
                      { text: "BÔNUS 6: Checklist de Acessibilidade Escolar", bold: true },
                      { text: "BÔNUS 7: Guia de Reunião com a Família", bold: true },
                      { text: "BÔNUS 8: Modelos de Relatório de AEE", bold: true },
                      { text: "BÔNUS 9: Glossário da Legislação Educacional", bold: true },
                      { text: "Acesso Vitalício e atualizações mensais", bold: true }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-brand-blue transition-colors">
                        <CircleCheckBig className="text-green-500 shrink-0 mt-0.5" size={20} />
                        <span className={`text-sm md:text-base text-slate-700 leading-tight ${item.bold ? "font-black" : "font-bold"}`}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center bg-brand-cream rounded-3xl p-4 md:p-10 border-2 border-slate-200 mb-6">
                  <p className="text-lg md:text-3xl text-slate-400 line-through font-bold mb-1">De R$ 79,90</p>
                  <div className="flex flex-col md:flex-row justify-center items-center md:items-baseline gap-1 md:gap-4 mb-4">
                    <span className="text-xl md:text-4xl font-black text-brand-blue uppercase italic">Por</span>
                    <span className="text-5xl sm:text-6xl md:text-9xl font-black text-green-600 tracking-tighter leading-none">R$ 29,90</span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm text-green-700 font-black py-2 md:py-3 px-4 md:px-10 rounded-full inline-block text-[10px] md:text-lg border-2 border-green-100 uppercase tracking-widest">
                    PAGAMENTO ÚNICO NO PIX E NO CARTÃO
                  </div>
                </div>


                <Button href={CHECKOUT_URL} className="bg-green-500 text-white border-b-8 border-green-700 hover:bg-green-400 text-lg sm:text-xl md:text-4xl py-6 md:py-10 shadow-2xl">
                  QUERO MEU KIT AGORA <ArrowRight className="inline-block ml-2 w-5 h-5 md:w-10 md:h-10" />
                </Button>

                <div className="mt-10 pt-10 border-t border-slate-100 grid grid-cols-3 gap-2 md:gap-6 text-[8px] md:text-xs font-black text-slate-400 uppercase tracking-widest text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <ShieldCheck size={18} className="text-brand-blue" /> COMPRA 100% SEGURA
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <Zap size={18} className="text-brand-yellow" /> ACESSO IMEDIATO
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <PackageCheck size={18} className="text-green-500" /> VITALÍCIO
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Guarantee Section */}
      <Section className="bg-white">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="shrink-0">
            <img 
              src="https://digitallfp.wordpress.com/wp-content/uploads/2025/09/selo-bloco-08.png" 
              alt="Garantia de 7 Dias" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <h2 className="font-serif text-3xl md:text-5xl text-brand-blue mb-6">Sua satisfação garantida ou seu dinheiro de volta</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Fique tranquilo! Você tem <strong>7 dias de garantia incondicional</strong>. Se por qualquer motivo você achar que o material não é para você, basta nos enviar um e-mail e devolvemos 100% do seu investimento.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-6 py-3 bg-brand-cream rounded-full text-xs font-bold text-brand-blue uppercase tracking-widest">
                <Lock size={16} /> Compra 100% Segura
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-brand-cream rounded-full text-xs font-bold text-brand-blue uppercase tracking-widest">
                <ShieldCheck size={16} /> Acesso Imediato
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-brand-cream">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-brand-blue mb-4">Dúvidas Frequentes</h2>
          <p className="text-slate-600 text-lg">Tudo o que você precisa saber sobre o material.</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <FAQItem 
            question="Os PEIs são realmente editáveis?" 
            answer="Sim! Todos os 150 modelos são entregues em formato Word (.docx), permitindo que você altere qualquer informação e adapte para a sua realidade escolar." 
          />
          <FAQItem 
            question="O material está atualizado com o Decreto 12.773/2025?" 
            answer="Sim, totalmente. Todo o conteúdo foi revisado e atualizado de acordo com as novas diretrizes do Decreto nº 12.773/2025." 
          />
          <FAQItem 
            question="Posso usar esses PEIs para qualquer rede de ensino?" 
            answer="Sim. Os modelos foram desenvolvidos para serem aceitos tanto na rede pública quanto na rede privada em todo o Brasil." 
          />
          <FAQItem 
            question="Como funciona o alinhamento à BNCC?" 
            answer="Os PEIs já trazem os campos de objetivos e habilidades alinhados aos códigos e competências da BNCC (Base Nacional Comum Curricular)." 
          />
          <FAQItem 
            question="Recebo o arquivo imediatamente após a compra?" 
            answer="Sim! Assim que o seu pagamento for aprovado, você receberá o acesso imediato ao material no seu e-mail e também via WhatsApp." 
          />
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-brand-blue text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-serif text-3xl text-brand-yellow mb-8 italic">Super Kit PEI Premium</div>
          <p className="text-white/40 text-sm uppercase tracking-[0.3em] font-bold">
            © 2026 • TODOS OS DIREITOS RESERVADOS
          </p>
        </div>
      </footer>
    </div>
  );
}
