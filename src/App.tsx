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

const WHATSAPP_PROOFS = [
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/whatsapp-image-2026-01-16-at-22.30.23.jpeg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/1.jpeg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/whatsapp-image-2026-01-04-at-19.28.56.jpeg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/whatsapp-image-2026-01-04-at-11.36.58-1.jpeg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/whatsapp-image-2026-01-04-at-11.36.58.jpeg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/whatsapp-image-2026-01-04-at-11.36.58-2.jpeg"
];

const MATERIAL_SAMPLES = [
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/amostra.png",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/1.jpg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/2.jpg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/3.jpg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/4.jpg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/5.jpg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/6.jpg"
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

const BonusCard = ({ children, color = "yellow", rotation = "rotate-1", value = "" }: { children: React.ReactNode, color?: 'yellow' | 'pink' | 'blue', rotation?: string, value?: string }) => {
  const colors = {
    yellow: "bg-yellow-100 border-yellow-200 text-yellow-900",
    pink: "bg-pink-100 border-pink-200 text-pink-900",
    blue: "bg-blue-100 border-blue-200 text-blue-900"
  };
  return (
    <div className={`p-6 md:p-8 border-b-4 shadow-md ${rotation} ${colors[color]} relative rounded-sm h-full flex flex-col`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-4 bg-white/50 blur-sm rounded-full" />
      {value && <span className="absolute -top-3 -right-2 bg-red-600 text-white text-[10px] md:text-xs font-black px-2 py-1 rounded-lg rotate-6 shadow-md z-10">VALIA R$ {value}</span>}
      {children}
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

const ProofCarousel = () => {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev + 1) % WHATSAPP_PROOFS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + WHATSAPP_PROOFS.length) % WHATSAPP_PROOFS.length);
  return (
    <div className="relative max-w-lg mx-auto px-4">
      <div className="relative">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border-4 md:border-[12px] border-white overflow-hidden relative aspect-[9/18.5] flex items-center justify-center bg-slate-100">
          <img src={WHATSAPP_PROOFS[current]} alt={`WhatsApp Proof ${current + 1}`} className="w-full h-full object-cover select-none transition-opacity duration-300" />
        </div>
        <button onClick={prev} className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 bg-white p-3 md:p-4 rounded-full shadow-2xl hover:bg-blue-500 hover:text-white transition-all z-20 text-slate-800">
          <ChevronLeft size={28} />
        </button>
        <button onClick={next} className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 bg-white p-3 md:p-4 rounded-full shadow-2xl hover:bg-blue-500 hover:text-white transition-all z-20 text-slate-800">
          <ChevronRight size={28} />
        </button>
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {WHATSAPP_PROOFS.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${current === i ? "bg-blue-600 w-8" : "bg-slate-300 w-2"}`} />
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
    <div className="min-h-screen bg-grid text-[#1e293b]">
      {/* Sticky Timer */}
      <div className="bg-red-600 text-white py-2.5 px-4 text-center font-bold text-[10px] md:text-sm sticky top-0 z-[60] flex justify-center items-center gap-2 shadow-lg">
        <Zap size={14} className="animate-pulse" />
        PROMOÇÃO TERMINA EM:
        <span className="font-black text-yellow-300 ml-1">{formatTime(timeLeft)}</span>
      </div>

      {/* Header */}
      <header className="pt-4 md:pt-6 pb-8 md:pb-16 px-4 text-center bg-white border-b-8 border-yellow-400 relative overflow-hidden">
        <div className="absolute top-10 left-10 opacity-10 pointer-events-none hidden md:block">
          <Star size={48} className="text-yellow-400 rotate-12" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none hidden md:block">
          <Pencil size={48} className="text-blue-400 -rotate-12" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black text-[#1e293b] leading-[1.1] md:leading-[1] tracking-tighter mb-4 text-balance uppercase px-2">
            RECEBA <span className="text-blue-600">+70 PEIS PRONTOS</span> E EDITÁVEIS NO WORD
            <br className="hidden sm:block" />
            E FAÇA PEIS EM <span className="relative inline-block">
              <span className="relative z-10 text-red-600">15 MINUTOS.</span>
              <span className="absolute left-0 bottom-1 md:bottom-2 w-full h-2 md:h-8 bg-yellow-400/80 -z-10 rounded-lg" />
            </span>
          </h1>
          <p className="text-slate-500 font-bold text-xs md:text-sm uppercase tracking-widest mb-6">Veja o que você vai receber (ative o som)</p>
          
          <div className="flex justify-center mb-6 md:mb-10">
            <div className="w-full max-w-4xl rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-4 md:border-8 border-slate-100 bg-black aspect-video flex items-center justify-center relative">
              <iframe 
                className="w-full h-full" 
                src="https://www.youtube.com/embed/o7XQBKbekok?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3&fs=0" 
                title="MATERIAL PEIS" 
                frameBorder="0" 
                allow="autoplay; encrypted-media; picture-in-picture" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen 
              />
            </div>
          </div>

          <div className="bg-[#facc15] border-2 border-[#1e293b] rounded-2xl px-6 md:px-12 py-4 md:py-8 inline-block shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] mb-8 -rotate-1 hover:rotate-0 transition-transform duration-300 max-w-4xl">
            <h2 className="text-base sm:text-xl md:text-3xl font-black text-[#1e293b] leading-tight text-balance">
              +70 MODELOS de PEIs prontos, completos e editáveis para Educação Infantil, Fundamental e Ensino Médio. Você edita, adapta e entrega.
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
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

          <div className="relative inline-block w-full max-w-md">
            <Button onClick={scrollToOffer} className="bg-green-500 text-white border-b-8 border-green-700 hover:bg-green-400">
              QUERO MEUS PEIS PRONTOS AGORA
            </Button>
            <div className="mt-4 flex flex-col items-center gap-1">
              <p className="text-slate-900 font-black text-xl md:text-3xl">Apenas R$ 19,90</p>
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">
                <ShieldCheck size={14} className="text-green-600" /> Compra Segura | Acesso Imediato
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Value Props */}
      <Section className="bg-blue-50 border-b border-blue-100" tight>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 uppercase tracking-tight leading-none text-balance">
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
          <p className="text-xl md:text-3xl font-black text-slate-900 leading-tight">
            Por isso, eu reuni mais de 70 páginas de PEIs, PDIs e PAEE prontos para usar.
          </p>
          <p className="text-lg md:text-2xl font-bold text-slate-600 leading-relaxed">
            São modelos pensados para você modelar, editar e entregar em poucos minutos, sem insegurança e sem retrabalho.
          </p>
          <div className="w-24 h-2 bg-blue-500 mx-auto rounded-full opacity-30" />
        </div>
      </Section>

      {/* What you get */}
      <Section className="bg-white">
        <div className="text-center mb-16">
          <Badge className="bg-blue-600 text-white mb-6 !text-xs md:!text-lg py-2.5 px-6 shadow-md">
            O que você recebe ao adquirir o kit
          </Badge>
          <h2 className="text-3xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-[1] mb-6">
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
              title: "+70 PÁGINAS DE PEIs PRONTOS (EDITÁVEIS)", 
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
            <div key={i} className="bg-slate-50 border-2 border-slate-100 p-8 rounded-[2rem] hover:border-blue-500 transition-colors group">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase leading-tight">{item.num} {item.title}</h3>
              <ul className="mt-4 space-y-3 mb-6">
                {item.list.map((li, j) => (
                  <li key={j} className="flex items-start gap-2 font-bold text-slate-600">
                    <Check className="text-green-600 shrink-0 mt-1" size={18} /> {li}
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <Pin className="text-blue-600 shrink-0 rotate-12" size={20} />
                <p className="text-sm font-black text-slate-800">{item.footer}</p>
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

      {/* Bonus */}
      <Section className="bg-white relative overflow-hidden">
        <div className="text-center mb-16">
          <h3 className="text-[1.75rem] sm:text-[2.5rem] md:text-[3.5rem] font-extrabold text-[#1e293b] mb-4 uppercase leading-[1.1] tracking-tighter text-balance">
            ALÉM DOS PEIS PRONTOS, VOCÊ RECEBE FERRAMENTAS PARA NÃO ERRAR
          </h3>
          <p className="text-lg md:text-[1.75rem] font-medium text-slate-500 mb-16 px-4 leading-relaxed">
            Tudo pensado para você montar, revisar e entregar com segurança.
          </p>
          <div className="space-y-4">
            <h2 className="text-[2.5rem] sm:text-[4rem] md:text-[6.5rem] font-black text-[#1e293b] uppercase leading-none tracking-tighter">PRESENTES EXCLUSIVOS</h2>
            <p className="text-base md:text-[1.5rem] font-extrabold text-[#1e293b] px-4 uppercase tracking-[0.15em]">VÁLIDOS APENAS PARA AS COMPRAS DE HOJE!</p>
          </div>
        </div>

        <div className="mb-20 flex justify-center">
          <img src="https://digitallfp.wordpress.com/wp-content/uploads/2026/01/bonus5.png" alt="Mockup Bônus" className="w-full max-w-4xl h-auto transform hover:scale-105 transition-transform duration-700" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <BonusCard color="blue" rotation="rotate-1" value="97,00">
            <h4 className="text-lg md:text-xl font-black mb-1">🥇 BÔNUS 1</h4>
            <p className="font-black text-sm md:text-lg mb-2 text-slate-900">Banco de Objetivos para cada deficiência Prontos</p>
            <p className="text-xs md:text-sm italic font-bold text-slate-600 mb-4">“Nunca mais trave na hora de escrever objetivos”</p>
            <div className="space-y-1.5 text-[10px] md:text-xs font-bold text-slate-700">
              <p className="uppercase text-blue-600 font-black">Inclui objetivos prontos por:</p>
              <div className="flex flex-wrap gap-x-2 text-blue-700 font-black">
                <span>TEA</span> <span>•</span> <span>TDAH</span> <span>•</span> <span>DI</span> <span>•</span> <span>Dislexia</span>
              </div>
            </div>
          </BonusCard>

          <BonusCard color="pink" rotation="-rotate-1" value="67,00">
            <h4 className="text-lg md:text-xl font-black mb-1">🥈 BÔNUS 2</h4>
            <p className="font-black text-sm md:text-lg mb-2 text-slate-900">Frases Prontas (Copia e Cola)</p>
            <p className="text-xs md:text-sm italic font-bold text-slate-600 mb-4">“Copiar, colar e entregar”</p>
            <ul className="list-disc pl-4 space-y-1 text-[10px] md:text-xs font-bold text-slate-700">
              <li>Justificativa pedagógica</li>
              <li>Avaliação inicial</li>
              <li>Acompanhamento</li>
            </ul>
          </BonusCard>

          <BonusCard color="yellow" rotation="rotate-1" value="47,00">
            <h4 className="text-lg md:text-xl font-black mb-1">🥉 BÔNUS 3</h4>
            <p className="font-black text-sm md:text-lg mb-2 text-slate-900">Checklist de PEI Aprovado</p>
            <p className="text-xs md:text-sm italic font-bold text-slate-600 mb-4">“Antes de entregar, confira isso”</p>
            <ul className="list-disc pl-4 space-y-1 text-[10px] md:text-xs font-bold text-slate-700">
              <li>O que não pode faltar</li>
              <li>Erros mais comuns</li>
              <li>O que a coordenação observa</li>
            </ul>
          </BonusCard>

          <BonusCard color="blue" rotation="-rotate-1" value="57,00">
            <h4 className="text-lg md:text-xl font-black mb-1">🏅 BÔNUS 4</h4>
            <p className="font-black text-sm md:text-lg mb-1 text-slate-900">+100 Atividades para Autismo</p>
            <p className="text-xs md:text-sm italic font-bold text-slate-600 mb-4">“Aplicar sem precisar adaptar do zero”</p>
            <p className="text-[10px] md:text-xs font-bold text-slate-700">Material pronto para aplicar no AEE e sala regular.</p>
          </BonusCard>

          <BonusCard color="pink" rotation="rotate-1" value="77,00">
            <h4 className="text-lg md:text-xl font-black mb-1">🏅 BÔNUS 5</h4>
            <p className="font-black text-sm md:text-lg mb-1 text-slate-900">+240 relatórios descritivos prontos</p>
            <p className="text-xs md:text-sm italic font-bold text-slate-600 mb-4">“Economize dias de trabalho na escrita dos relatórios”</p>
            <p className="text-[10px] md:text-xs font-bold text-slate-700">Modelos prontos para preenchimento e entrega rápida.</p>
          </BonusCard>
        </div>
      </Section>

      {/* Social Proof */}
      <Section className="bg-blue-50 border-t border-blue-100">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-5xl font-black text-slate-800 uppercase px-4 leading-tight">ENTREGA DO MATERIAL VIA WHATSAPP:</h2>
          <p className="text-sm md:text-xl text-slate-500 mt-4 font-bold px-4 italic">Resultados reais de quem já adquiriu e aprovou!</p>
        </div>
        <ProofCarousel />
      </Section>

      {/* Final Offer */}
      <Section id="oferta" className="bg-black pt-16 md:pt-24 pb-32 md:pb-48">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-24 md:w-40 h-10 md:h-16 bg-slate-200 border-x-4 border-t-4 border-slate-300 rounded-t-3xl z-20 flex items-center justify-center">
              <div className="w-12 md:w-20 h-2 md:h-3 bg-slate-400 rounded-full" />
            </div>
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(255,255,255,0.05)] border-4 border-slate-800 overflow-hidden relative z-10">
              <div className="bg-blue-600 py-8 md:py-12 px-6 text-center text-white">
                <Badge className="bg-white/20 text-white mb-4 border border-white/30">Oportunidade Única</Badge>
                <h3 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter leading-tight">OFERTA DE LANÇAMENTO</h3>
              </div>
              <div className="p-6 md:p-12">
                <div className="mb-10 md:mb-12 space-y-4">
                  <h4 className="text-slate-900 font-black text-lg md:text-2xl uppercase tracking-tight flex items-center gap-2 mb-6">
                    <Sparkles className="text-yellow-400" fill="currentColor" /> O que você vai receber:
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { text: "+70 PEIs, PDIs, PAEE e Estudo de Caso Editáveis", bold: true },
                      { text: "Totalmente editáveis no Word e Canva", bold: false },
                      { text: "Alinhados à BNCC com foco em educação regular e especial", bold: false },
                      { text: "BÔNUS 1: Banco de Objetivos Prontos", bold: true },
                      { text: "BÔNUS 2: Frases Prontas (Copia e Cola)", bold: true },
                      { text: "BÔNUS 3: Checklist de PEI Aprovado", bold: true },
                      { text: "BÔNUS 4: +100 Atividades para autismo", bold: true },
                      { text: "BÔNUS 5: +240 Relatórios Descritivos Prontos", bold: true },
                      { text: "Acesso Vitalício e atualizações mensais", bold: true }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-blue-200 transition-colors">
                        <CircleCheckBig className="text-green-500 shrink-0 mt-0.5" size={20} />
                        <span className={`text-sm md:text-base text-slate-700 leading-tight ${item.bold ? "font-black" : "font-bold"}`}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center bg-yellow-50 rounded-3xl p-6 md:p-10 border-2 border-yellow-200 mb-6">
                  <p className="text-lg md:text-3xl text-slate-400 line-through font-bold mb-1">De R$ 79,90</p>
                  <div className="flex flex-col md:flex-row justify-center items-center md:items-baseline gap-1 md:gap-4 mb-4">
                    <span className="text-xl md:text-4xl font-black text-slate-900 uppercase italic">Por</span>
                    <span className="text-6xl md:text-9xl font-black text-green-600 tracking-tighter leading-none">R$ 19,90</span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm text-green-700 font-black py-2 md:py-3 px-6 md:px-10 rounded-full inline-block text-[10px] md:text-lg border-2 border-green-100 uppercase tracking-widest">
                    PAGAMENTO ÚNICO NO PIX E NO CARTÃO
                  </div>
                </div>
                <p className="text-center text-red-600 font-black mb-10 text-sm md:text-xl italic animate-pulse">
                  "Ou você compra hoje esse kit ou vai continuar sofrendo para fazer pei do zero"
                </p>

                <Button href={CHECKOUT_URL} className="bg-green-500 text-white border-b-8 border-green-700 hover:bg-green-400 text-xl md:text-4xl py-6 md:py-10 shadow-2xl">
                  QUERO MEU KIT AGORA <ArrowRight className="inline-block ml-2 w-6 h-6 md:w-10 md:h-10" />
                </Button>

                <div className="mt-10 pt-10 border-t border-slate-100 grid grid-cols-3 gap-2 md:gap-6 text-[8px] md:text-xs font-black text-slate-400 uppercase tracking-widest text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <ShieldCheck size={18} className="text-blue-500" /> COMPRA 100% SEGURA
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <Zap size={18} className="text-yellow-500" /> ACESSO IMEDIATO
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

      {/* Guarantee */}
      <Section className="bg-white">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="relative shrink-0">
            <div className="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center">
              <img 
                src="https://digitallfp.wordpress.com/wp-content/uploads/2025/09/selo-bloco-08.png" 
                alt="Garantia de 7 Dias" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl md:text-5xl font-black text-[#1e293b] leading-[1.1] uppercase tracking-tighter">
              SUA SATISFAÇÃO GARANTIDA OU SEU DINHEIRO DE VOLTA
            </h2>
            <p className="text-base md:xl font-medium text-slate-600 leading-relaxed">
              Fique tranquilo! Você tem <strong>7 dias de garantia incondicional</strong>. Se por qualquer motivo você achar que o material não é para você, basta nos enviar um e-mail e devolvemos 100% do seu investimento. Sem perguntas e sem letras miúdas.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 border-2 border-slate-100 rounded-full text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">
                <Lock size={14} /> SSL CRYPTOGRAPHY
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border-2 border-slate-100 rounded-full text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">
                <ShieldCheck size={14} /> SAFE ENVIRONMENT
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-white border-t border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-6xl font-black text-slate-800 uppercase tracking-tighter">
            Dúvidas Frequentes (FAQ)
          </h2>
        </div>
        <div className="max-w-2xl mx-auto">
          <FAQItem 
            question="Esse material é aceito pela coordenação e secretaria?" 
            answer={
              <>
                <p><strong>Sim.</strong></p>
                <p>Os PEIs foram elaborados com linguagem técnica pedagógica, seguindo práticas utilizadas em escolas públicas e privadas e alinhados à BNCC.</p>
                <p>São modelos pensados justamente para evitar devoluções, correções e retrabalho.</p>
              </>
            } 
          />
          <FAQItem 
            question="Serve para alunos com quais necessidades?" 
            answer={
              <>
                <p>O material atende alunos com:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>TEA (Autismo)</li>
                  <li>TDAH</li>
                  <li>Deficiência Intelectual</li>
                  <li>Dislexia</li>
                  <li>Deficiência Física</li>
                </ul>
                <p className="mt-2">Além disso, os modelos são adaptáveis, permitindo personalização conforme cada aluno.</p>
              </>
            } 
          />
          <FAQItem 
            question="Sou iniciante no AEE. Vou conseguir usar?" 
            answer={
              <>
                <p><strong>Sim, principalmente se você está começando.</strong></p>
                <p>Os PEIs são guiados, organizados e editáveis, feitos para quem ainda se sente insegura na escrita, nos objetivos e nos relatórios.</p>
                <p className="mt-2">Você não precisa “saber escrever bonito”. É só adaptar, ajustar e entregar com segurança.</p>
              </>
            } 
          />
          <FAQItem 
            question="Preciso saber mexer em computador?" 
            answer="Não. Os arquivos são em Word e PDF, fáceis de editar, mesmo para quem tem pouca familiaridade com tecnologia." 
          />
          <FAQItem 
            question="Em quanto tempo consigo montar um PEI?" 
            answer="Na maioria dos casos, entre 10 e 15 minutos. O que antes levava horas agora vira um processo rápido e sem estresse." 
          />
          <FAQItem 
            question="Esse material substitui a avaliação do aluno?" 
            answer={
              <>
                <p><strong>Não.</strong></p>
                <p>Ele facilita a escrita e a organização, mas respeita a individualidade do aluno. Você continua sendo a profissional — o material apenas acelera e orienta.</p>
              </>
            } 
          />
          <FAQItem 
            question="Vou receber tudo na hora?" 
            answer="Sim. Acesso imediato. Após o pagamento, você recebe o link para baixar todo o material instantaneamente." 
          />
          <FAQItem 
            question="E se eu não gostar?" 
            answer="Você tem garantia. Se dentro do prazo você sentir que o material não é para você, basta solicitar o reembolso." 
          />
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-slate-50 border-t border-slate-100" tight>
        <div className="max-w-2xl mx-auto text-center">
          <Badge className="bg-yellow-400 text-slate-900 mb-4">OFERTA DE LANÇAMENTO</Badge>
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-2 uppercase tracking-tighter">
            Oferta Especial
          </h2>
          <p className="text-lg md:text-xl font-bold text-slate-600 mb-8">
            Garanta seu KIT DE PEIS PRONTOS agora mesmo.
          </p>
          <Button onClick={scrollToOffer} className="bg-green-500 text-white border-b-8 border-green-700 hover:bg-green-400">
            QUERO MEU ACESSO AGORA <ArrowRight className="ml-2" />
          </Button>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <Pencil size={40} className="mx-auto text-blue-400" />
          <p className="text-lg md:text-3xl font-medium text-slate-300 leading-relaxed italic px-4">
            "Este material foi criado para <span className="text-white font-black">facilitar sua rotina</span>, te dar segurança técnica e <span className="text-white font-black">devolver o seu tempo livre</span>."
          </p>
          <div className="pt-12 border-t border-white/10 text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-slate-500">
            © 2026 SUPER KIT PEI PREMIUM • AEE E EDUCAÇÃO ESPECIAL
          </div>
        </div>
      </footer>
    </div>
  );
}
