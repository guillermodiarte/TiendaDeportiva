'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_URL}/api/settings`);
        if (res.ok) {
          const data = await res.json();
          const settingsMap: Record<string, any> = {};
          data.forEach((item: any) => {
            settingsMap[item.key] = item.value;
          });
          setSettings(settingsMap);
        }
      } catch (e) {
        console.error("No se pudieron cargar las configuraciones", e);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const banner = settings['home_banner'] || { 
    title: 'NUEVA TEMPORADA', 
    subtitle: 'PODER EN MOVIMIENTO',
    videoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0cxK746v83ROJL7hs8CnHSC06y6FO_5BKKIjT17wYw5iCb8ERHKzIaDlv-Dh0C0xP_Xg7bv0hXxYqiJEcv2ISnb5GrrEIMFmlutU99JtFdOlebmD1X719ZSdiRC_pM5a_Qr9CF1MAPjtCAkFYPhz-auhf_zoyn6Rl4DmWoS8qt6C2dV6KaY8kXQzWUu4Ebnv4i0_-w4wUJ2cPMIGYzcWqZdCiShlsecf-MJriGEfBEV14OmFlIloeItI3stHip3RrRDu6PTuOG10" 
  };
  
  const header = settings['site_header'] || {
    logoUrl: "",
    facebookUrl: "#",
    instagramUrl: "#",
    whatsapp: "5493704048860"
  };

  const footer = settings['site_footer'] || {
    logoUrl: "",
    copyRight: "© 2024 LyG Indumentaria Deportiva. Todos los derechos reservados."
  };

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center dark:bg-slate-900"><div className="animate-spin text-primary material-symbols-outlined text-4xl">autorenew</div></div>;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Navigation */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 md:px-20 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl font-bold">bolt</span>
              <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-black leading-tight tracking-tighter italic">LyG Indumentaria Deportiva</h2>
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              <Link className="text-slate-700 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors" href="/catalog">Colecciones</Link>
              <Link className="text-slate-700 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors" href="#">Nuestra Historia</Link>
            </nav>
          </div>
          <div className="flex flex-1 justify-end gap-4 md:gap-6 items-center">
            <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full bg-slate-200/50 dark:bg-slate-800/50">
                <div className="text-slate-500 flex items-center justify-center pl-4">
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
                <input className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 text-sm font-medium placeholder:text-slate-500 px-2" placeholder="Busca tu estilo..." />
              </div>
            </label>
            <div className="flex gap-2 items-center">
              <a href="https://wa.me/5493704048860" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-full h-10 w-10 text-slate-500 hover:text-green-500 hover:bg-green-500/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
              <a href={header.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-full h-10 w-10 text-slate-500 hover:text-pink-500 hover:bg-pink-500/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href={header.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-full h-10 w-10 text-slate-500 hover:text-blue-600 hover:bg-blue-600/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <button className="lg:hidden flex items-center justify-center rounded-full h-10 w-10 bg-slate-200/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex flex-col flex-1">
          {/* Hero Section */}
          <section className="px-4 md:px-10 py-6 relative">
            
            <div 
              className="relative min-h-[600px] w-full flex flex-col items-start justify-end overflow-hidden rounded-3xl p-8 md:p-16"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%), url('${banner.videoUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#1E293B' // Fallback
              }}
            >
              <div className="relative z-10 max-w-2xl flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <span className="text-primary font-bold tracking-widest uppercase text-sm">LyG Indumentaria</span>
                  <h1 className="text-white text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter">
                   {banner.title.toUpperCase()} <br /> <span className="text-primary italic font-serif">{banner.subtitle.toUpperCase()}</span>
                  </h1>
                  <p className="text-slate-200 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
                    Diseñado para el máximo rendimiento. Indumentaria de alto impacto que se mueve con vos, te sostiene y te da poder en cada paso.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link href="/catalog" className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-primary text-white text-base font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/30">
                    Comprar Colección
                  </Link>
                  <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-white/10 backdrop-blur-md border border-white/20 text-white text-base font-bold hover:bg-white/20 transition-all">
                    Ver Video
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Categories */}
          <section className="px-4 md:px-20 py-12">
            <div className="flex items-end justify-between mb-10">
              <div className="flex flex-col gap-2">
                <h2 className="text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight">Comprar por Categoría</h2>
                <div className="h-1 w-20 bg-primary rounded-full"></div>
              </div>
              <Link className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all" href="/catalog">
                Ver Todo <span className="material-symbols-outlined">trending_flat</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category 1 */}
              <Link href="/catalog?category=leggings" className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                     style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvT2uCk1UIUIHS8kB0cnUTmgfnzG7RfWbhgLEfCgMfP7KmSULsUDHiYAYkYV4P0l3rFY3XYUjl9O2tLCeS6H0wluKDBnA96-yDIUeD_CS1g7LTQlFUv8j8Cm84Oo2__qZD67HGCYM-YdMuhPyATBYXHG4ZkP7Ik-wusZE1oZmlE-ZV2bGIv8ykh6DqHMXjb_vDsCv7ZbEMbcUKMzysylxA_l69aRnZ5bl7iDiB0Eo_zYd7dYar_lhQi31C4r558wHgTinHzrbcw0c')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-white text-2xl font-bold mb-2">Calzas Largas</h3>
                  <p className="text-slate-300 text-sm mb-4">Compresión y Comodidad</p>
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white text-slate-900 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </span>
                </div>
              </Link>
              {/* Category 2 */}
              <Link href="/catalog?category=tops" className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                     style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPoIdLrl2BW1plNYBKTAQPYhjosb882hogTs5Av75AHEb_bX6mx3f0kEGGhDb3rqetc_VPiCIVI0qgauy_Qw5IgrVh4IQ1f63Nq_FCurQv0Uzyyrm2gv8IhTo8_rb76RU55fIzM5J4VfX7WiSjKz7a2CUmzOQ9i10rkYjll9hbrBv_qn6YoYOKrp3w5DBz_y-jX1IxBhdHPqgLSYg2Jg9gmr-h4-UiePk_zQ1FWkW3cUXXHV88eQThhfM7GbmN59doJ__RR8ovNE4')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-white text-2xl font-bold mb-2">Tops Deportivos</h3>
                  <p className="text-slate-300 text-sm mb-4">Ligeros y Transpirables</p>
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white text-slate-900 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </span>
                </div>
              </Link>
              {/* Category 3 */}
              <Link href="/catalog?category=accessories" className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                     style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCsrPBt8ItQ8kj9pfrz4UTg4CtlHXIgJdqeXYnoAGHusls7tLvh_VYnGn_TQ1-A0OdbiaIE81CUIZTW7IOySIOqwibdzoe-xXA7Xh6f-KZSuAbwV_ZzYxdulkjqigyUyCUQ2kl1Xh_TFJHvJD2vgFKT9LjGFwU1Rrn2UCP98A4fHl64gS0GzN7TTfBFxg_5aa8yFeHdjvuLe1QGpqQ3FORNUuqPsbh4W0AcBbZRGwnbaWcdiygkcxYNDVBKLltStvQqB-y9GANvPUk')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-white text-2xl font-bold mb-2">Bolsos y Accesorios</h3>
                  <p className="text-slate-300 text-sm mb-4">Soporte Esencial</p>
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white text-slate-900 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </span>
                </div>
              </Link>
            </div>
          </section>

          {/* Latest Arrivals */}
          <section className="px-4 md:px-20 py-16 bg-white dark:bg-slate-900/40">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex flex-col items-center text-center mb-12">
                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2">Lanzamientos</span>
                <h2 className="text-slate-900 dark:text-white text-4xl font-black tracking-tight mb-4">Últimos Ingresos</h2>
                <p className="text-slate-500 max-w-md">Nuestros estilos más frescos acaban de llegar. Experimenta la próxima generación de ropa deportiva.</p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {/* Product 1 */}
                <div className="flex flex-col gap-4 group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                    <img alt="Calza Aero-Dry" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2joFBI5X0kEPhfS9BUeH6jAO5h2gmnMo3U1ZgAF4CPk-4gdxLAw_vxspvOBg1w-eC5tE0gk1vMD4rrtNWCj4YOpspoI6FXBoCo0bFoXO5W2x7bQoIWda4I2THdklRAXe82JKyD6_Lk2NT72o8xOikPHrQAHMfzJycbH4tqjt6At_QAEhMETQ3TUbHjSQs9JxrAIxvxZSFjOEVfQBowpCtUJ-vKSlMkv_IlAiIIGUB5jes7P_fNqTZBWTFXjy8t3lHv-l2kb4ZpnU" />
                    <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">Nuevo</div>
                    <button className="absolute bottom-4 right-4 h-10 w-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-xl">add</span>
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-slate-900 dark:text-white font-bold text-base">Calza Aero-Dry</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Negro Carbón</p>
                    <p className="text-primary font-black mt-1">$84.00</p>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="flex flex-col gap-4 group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                    <img alt="Top Velocity Crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD15jTbCjQUJ9nPeBgeg5NteHhFo9zNkOZZEFdb90LKrEAKYas4uVPGJm09Oj_C87eiWuDtLk5sXkwCtfSzH7xwihbYag9OecEfigqj8f1FJhGodGSakouZvrjl3Gskd9mLsnXVJpN3HyEumjEH6jUc_IeFP-Pu4Va7d4P_vLBwE3JSofy91xmIMGzLaC4f-w4WSqA5gJ_YMOUxVDEA8PN4bvjdoQa6atOMTzI525wqHE-o-nX_D6XkOasU4rpDzyADU7bhtni8Y4" />
                    <button className="absolute bottom-4 right-4 h-10 w-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-xl">add</span>
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-slate-900 dark:text-white font-bold text-base">Top Velocity Crop</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Rosa Cuarzo</p>
                    <p className="text-primary font-black mt-1">$52.00</p>
                  </div>
                </div>

                {/* Product 3 */}
                <div className="flex flex-col gap-4 group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                    <img alt="Short Zen Flow" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9HreyRoT5gB2JL36rNvsroVE4ylxbZvJwNrXPLoVfm3fNWvY14uWyBqphgVn0lY2V0wn7eVdybqVPeC41ogVgCzGC0ZPCumhZPDIkfFg3qnCTWsPsidQ0ZudeJNeJDg36BRD8IZyOF2aNrX08sOLrlwPPoBnaXBAF_KrvAfzdsgL4VPjtMkJQV7dGiPjepQGzVHgYVdupMPlpVztRWcB_9ZnHAJzUWSOfLDjkC05eeiodjbpBCYRZxA0Ywph07MxQLX_UCQX3cNY" />
                    <button className="absolute bottom-4 right-4 h-10 w-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-xl">add</span>
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-slate-900 dark:text-white font-bold text-base">Short Zen Flow</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Azul Medianoche</p>
                    <p className="text-primary font-black mt-1">$48.00</p>
                  </div>
                </div>

                {/* Product 4 */}
                <div className="flex flex-col gap-4 group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                    <img alt="Corpiño Deportivo Impact" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvIK-0rKPy4r4HZUUUSldIf4kNzLWeACLW5HbLT5roRQDeUY3pS9bRlZakp4VwaUX0Ryw_8IwabGHjowSt1QhmLiU1UGRm-GnxstfHoTYqUJnn0tySv8CyfuEOSKEIBA4I78-4gBAj06QSFawEMzcIzVZbdOLYjJEzBAKHRPUjesEyBCyo5A3kOluUzaGM8DEi5QAWYMwcb66tMYIgpf-8uB9CljNKPRoG1dpf5LZ_7VzOYkrCYWk1DAebRut2PPWPnbzDdmbJTEY" />
                    <button className="absolute bottom-4 right-4 h-10 w-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-xl">add</span>
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-slate-900 dark:text-white font-bold text-base">Corpiño Deportivo Impact</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Blanco Ártico</p>
                    <p className="text-primary font-black mt-1">$65.00</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 flex justify-center">
                <Link href="/catalog" className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary/80 transition-colors">
                  Ver colección completa <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Quality/Features Banner */}
          <section className="px-4 md:px-20 py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">air</span>
                </div>
                <h3 className="text-xl font-bold">Control Climático</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Tejidos avanzados que absorben la transpiración y te mantienen fresca durante tu hora más intensa.</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">all_inclusive</span>
                </div>
                <h3 className="text-xl font-bold">Elasticidad Infinita</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Tecnología elástica en cuatro direcciones para una libertad total de movimiento en cada pose.</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">eco</span>
                </div>
                <h3 className="text-xl font-bold">Fuerza Sustentable</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Fabricado con textiles reciclados, combinando el mayor rendimiento con el cuidado del planeta.</p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-white px-6 md:px-20 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-3xl font-bold">bolt</span>
                <h2 className="text-white text-2xl font-black italic tracking-tighter">LyG Indumentaria Deportiva</h2>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Empoderando mujeres a través del diseño de calidad y el rendimiento sin concesiones desde 2018.
              </p>
              <div className="flex gap-4">
                <a className="h-10 w-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-all" href="#">
                  <span className="material-symbols-outlined text-lg">share</span>
                </a>
                <a className="h-10 w-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-all" href="#">
                  <span className="material-symbols-outlined text-lg">public</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Tienda</h4>
              <ul className="flex flex-col gap-4 text-slate-400 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Más Vendidos</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Calzas y Shorts</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Tops Deportivos</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Accesorios</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Ayuda</h4>
              <ul className="flex flex-col gap-4 text-slate-400 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Política de Envíos</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Cambios y Devoluciones</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Guía de Talles</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Contáctanos</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Únete al Club</h4>
              <p className="text-slate-400 text-sm mb-4">Suscríbete para recibir novedades, ofertas exclusivas y lanzamientos.</p>
              <div className="flex h-12 bg-slate-800 rounded-lg overflow-hidden p-1">
                <input className="bg-transparent border-none flex-1 focus:ring-0 text-sm px-3" placeholder="Correo electrónico" type="email" />
                <button className="bg-primary text-white font-bold px-4 rounded-md text-sm">Unirme</button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
            <p>{footer.copyRight}</p>
            <div className="flex gap-8">
              <a className="hover:text-white transition-colors" href="#">Política de Privacidad</a>
              <a className="hover:text-white transition-colors" href="#">Términos de Servicio</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
