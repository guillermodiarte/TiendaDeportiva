import Image from 'next/image'
import Link from 'next/link'

async function getProduct(id: string) {
  try {
    const API_URL = process.env.API_URL_INTERNAL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
    const res = await fetch(`${API_URL}/api/products/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Error fetching product", e);
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    return (
      <div className="flex h-screen w-full items-center justify-center flex-col gap-4 text-slate-900 bg-background-light dark:bg-background-dark dark:text-slate-100 font-display">
        <span className="material-symbols-outlined text-6xl text-slate-300">error</span>
        <h1 className="text-2xl font-black">Producto no encontrado</h1>
        <Link href="/catalog" className="px-6 py-3 bg-primary text-white font-bold rounded-xl mt-4">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
  const images = product.image_url ? [product.image_url] : [];
  // Agregamos imágenes dummy adicionales para llenar la grilla según el HTML si solo hay 1 imagen.
  while (images.length < 4) {
    images.push(product.image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuD2joFBI5X0kEPhfS9BUeH6jAO5h2gmnMo3U1ZgAF4CPk-4gdxLAw_vxspvOBg1w-eC5tE0gk1vMD4rrtNWCj4YOpspoI6FXBoCo0bFoXO5W2x7bQoIWda4I2THdklRAXe82JKyD6_Lk2NT72o8xOikPHrQAHMfzJycbH4tqjt6At_QAEhMETQ3TUbHjSQs9JxrAIxvxZSFjOEVfQBowpCtUJ-vKSlMkv_IlAiIIGUB5jes7P_fNqTZBWTFXjy8t3lHv-l2kb4ZpnU");
  }

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5493704048860";
  const whatsappUrl = `https://wa.me/${phone}?text=Hola,%20quisiera%20consultar%20disponibilidad%20sobre%20el%20producto:%20${encodeURIComponent(product.name)}%20(SKU:%20${product.sku})`;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Top Navigation */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 lg:px-20 py-4 bg-background-light dark:bg-background-dark sticky top-0 z-50">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined text-3xl font-bold">bolt</span>
              <h2 className="text-slate-900 dark:text-slate-100 text-xl font-black leading-tight tracking-tighter italic">LyG Indumentaria Deportiva</h2>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-bold" href="/catalog">Colecciones</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-bold" href="#">Nuestra Historia</Link>
            </nav>
          </div>
          <div className="flex flex-1 justify-end gap-4">
            <div className="flex gap-2 items-center">
              <a href="https://wa.me/5493704048860" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center justify-center rounded-xl h-10 w-10 text-slate-500 hover:text-green-500 hover:bg-green-500/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center justify-center rounded-xl h-10 w-10 text-slate-500 hover:text-pink-500 hover:bg-pink-500/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center justify-center rounded-xl h-10 w-10 text-slate-500 hover:text-blue-600 hover:bg-blue-600/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <button className="flex items-center justify-center rounded-xl h-10 w-10 text-slate-900 dark:text-white hover:bg-primary/5 transition-all">
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>
        </header>

        {/* Breadcrumbs */}
        <div className="px-6 lg:px-20 py-4 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest hidden md:flex">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <Link href="/catalog" className="hover:text-primary transition-colors">Colección</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-slate-900 dark:text-slate-300">Rendimiento</span>
        </div>

        <main className="flex-1 px-4 lg:px-20 py-6 lg:py-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Image Gallery (Left Side) */}
            <div className="w-full lg:w-3/5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 aspect-[4/5] sm:aspect-auto sm:h-[600px] relative group">
                  <img src={images[0].startsWith('http') ? images[0] : `http://${API_URL.split('://')[1]}${images[0]}`} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    Recomendado
                  </div>
                </div>
                {images.slice(1, 4).map((img, i) => (
                   <div key={i} className={`overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 aspect-square group ${i===2 ? 'col-span-2 aspect-[2/1] sm:aspect-auto sm:h-64' : ''}`}>
                    <img src={img.startsWith('http') ? img : `http://${API_URL.split('://')[1]}${img}`} alt={`${product.name} detail`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                   </div>
                ))}
              </div>
            </div>

            {/* Product Info (Right Side) */}
            <div className="w-full lg:w-2/5 flex flex-col">
              <div className="sticky top-24 flex flex-col gap-8">
                
                {/* Header Info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
                    <span className="material-symbols-outlined text-sm">local_fire_department</span>
                    Alta Demanda
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">{product.name}</h1>
                  <p className="text-slate-500 font-mono text-sm">SKU: {product.sku}</p>
                  <p className="text-2xl font-black text-primary mt-2 flex items-center gap-3">
                    ${product.price ? product.price.toFixed(2) : "0.00"} 
                    <span className="text-sm font-medium text-slate-400 line-through">${(product.price * 1.3).toFixed(2)}</span>
                  </p>
                </div>

                {/* Color Selection */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-900 dark:text-white">Color Seleccionado</span>
                    <span className="text-slate-500">Único</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="h-12 w-12 rounded-full border-2 border-slate-900 dark:border-white p-1 flex items-center justify-center">
                      <span className="w-full h-full rounded-full bg-slate-900 block"></span>
                    </button>
                    <button className="h-12 w-12 rounded-full border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center hover:border-slate-400 transition-colors">
                      <span className="w-full h-full rounded-full bg-slate-400 block"></span>
                    </button>
                  </div>
                </div>

                {/* Size Selection */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-900 dark:text-white">Talle</span>
                    <button className="text-slate-500 underline underline-offset-4 hover:text-primary transition-colors">Guía de talles</button>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {['S', 'M', 'L', 'XL'].map(s => (
                      <button key={s} className={`h-12 rounded-xl border flex items-center justify-center font-bold transition-all ${s === product.size ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20' : 'border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-slate-900 dark:hover:border-slate-400'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col gap-4 mt-2 border-t border-slate-200 dark:border-slate-800 pt-8">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg rounded-2xl hover:scale-[1.02] transition-transform shadow-xl shadow-slate-900/20 dark:shadow-white/10 group">
                    <span className="material-symbols-outlined">forum</span>
                    Consultar Disponibilidad
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </a>
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
                    <span className="material-symbols-outlined text-[16px] text-green-500">check_circle</span>
                    Respuesta inmediata por nuestros asesores premium
                  </div>
                </div>

                {/* Product Description Expandable */}
                <div className="flex flex-col mt-4">
                  <div className="border-t border-slate-200 dark:border-slate-800 py-4">
                    <button className="flex items-center justify-between w-full text-left font-bold text-slate-900 dark:text-white">
                      Descripción Premium
                      <span className="material-symbols-outlined">expand_more</span>
                    </button>
                    <div className="mt-4 text-slate-500 text-sm leading-relaxed space-y-4">
                      <p>{product.description || "Diseñada para brindar el máximo confort y soporte durante tus entrenamientos más exigentes. Su tejido de compresión inteligente se adapta a tu cuerpo como una segunda piel."}</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Tejido elástico en 4 direcciones.</li>
                        <li>Secado ultrarrápido y control de humedad.</li>
                        <li>Sensación de sujeción inigualable.</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
          <div className="px-6 lg:px-20 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col gap-4">
               <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-2 text-lg italic"><span className="material-symbols-outlined text-primary">bolt</span> LyG Indumentaria Deportiva</h3>
               <p className="text-slate-500 text-sm leading-relaxed max-w-sm">Rendimiento, diseño y sustentabilidad. Equipamiento creado para desafiar tus límites todos los días.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">Ayuda</h4>
              <ul className="flex flex-col gap-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-primary transition-colors">Seguimiento de Orden</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cambios y Devoluciones</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Envíos a todo el país</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">Newsletter</h4>
              <p className="text-slate-500 text-sm mb-4">Únete para acceso anticipado a nuestras colecciones.</p>
              <div className="flex h-10 border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                <input className="bg-transparent border-none px-4 text-sm w-full outline-none" placeholder="Tu Email" type="email" />
                <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 font-bold text-sm">Unirte</button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
