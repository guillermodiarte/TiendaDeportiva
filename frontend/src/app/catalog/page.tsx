import Image from 'next/image'
import Link from 'next/link'

// Simulación de fetch a FastAPI
async function getProducts() {
  try {
    const API_URL = process.env.API_URL_INTERNAL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
    const res = await fetch(`${API_URL}/api/products`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Error fetching products:", e);
    return [];
  }
}

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 lg:px-20 py-4 bg-background-light dark:bg-background-dark sticky top-0 z-50">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined text-3xl">exercise</span>
              <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">LyG Indumentaria Deportiva</h2>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="/catalog">Colecciones</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="#">Nuestra Historia</Link>
            </nav>
          </div>
          <div className="flex flex-1 justify-end gap-4">
            <label className="hidden sm:flex flex-col min-w-40 h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full bg-primary/5 dark:bg-primary/10">
                <div className="text-primary flex items-center justify-center pl-4">
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
                <input className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 h-full placeholder:text-slate-400 px-4 text-base font-normal" placeholder="Buscar productos..." />
              </div>
            </label>
            <div className="flex gap-2 items-center hidden lg:flex">
              <a href="https://wa.me/5493704048860" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-xl h-10 w-10 text-slate-500 hover:text-green-500 hover:bg-green-500/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-xl h-10 w-10 text-slate-500 hover:text-pink-500 hover:bg-pink-500/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center rounded-xl h-10 w-10 text-slate-500 hover:text-blue-600 hover:bg-blue-600/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
            <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-xl">filter_list</span>
            </button>
          </div>
        </header>

        <main className="flex flex-1 px-6 lg:px-20 py-8 gap-10">
          {/* Sidebar Filters */}
          <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold">Categorías</h3>
                <p className="text-slate-500 text-sm">Explora nuestra indumentaria</p>
              </div>
              <div className="flex flex-col gap-1">
                <Link className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white font-medium" href="/catalog">
                  <span className="material-symbols-outlined">grid_view</span>
                  <span>Todos los Productos</span>
                </Link>
                <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors text-slate-700 dark:text-slate-300" href="/catalog?category=leggings">
                  <span className="material-symbols-outlined">fitness_center</span>
                  <span>Calzas</span>
                </Link>
                <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors text-slate-700 dark:text-slate-300" href="/catalog?category=tops">
                  <span className="material-symbols-outlined">apparel</span>
                  <span>Tops y Remeras</span>
                </Link>
                <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors text-slate-700 dark:text-slate-300" href="/catalog?category=accessories">
                  <span className="material-symbols-outlined">checkroom</span>
                  <span>Medias y Accesorios</span>
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="text-slate-900 dark:text-slate-100 text-sm font-bold uppercase tracking-wider">Filtrar por</h3>
              <div className="flex flex-col gap-3">
                <button className="flex items-center justify-between w-full px-4 py-2 border border-primary/10 rounded-lg text-sm text-slate-600 dark:text-slate-400">
                  Talle <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
                <button className="flex items-center justify-between w-full px-4 py-2 border border-primary/10 rounded-lg text-sm text-slate-600 dark:text-slate-400">
                  Color <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
                <button className="flex items-center justify-between w-full px-4 py-2 border border-primary/10 rounded-lg text-sm text-slate-600 dark:text-slate-400">
                  Precio <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Product Grid Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Colección</h1>
                <p className="text-slate-500 mt-1">{products.length} artículos de alto rendimiento encontrados</p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-primary/10 rounded-lg text-sm font-medium">
                  Ordenar: Destacados <span className="material-symbols-outlined text-sm">swap_vert</span>
                </button>
              </div>
            </div>

            {/* Grid Layout (API Rendering) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product: any) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group flex flex-col gap-4">
                  <div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-primary/5">
                    {product.image_url ? (
                      <div 
                        className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105" 
                        style={{ backgroundImage: `url(${product.image_url.startsWith('http') ? product.image_url : `http://localhost:8001${product.image_url}`})` }}
                      ></div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 transition-transform duration-500 group-hover:scale-105">
                        <span className="material-symbols-outlined text-5xl opacity-50 mb-2">image</span>
                        <span className="text-sm font-medium">Sin imagen</span>
                      </div>
                    )}
                    
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                      Nuevo
                    </div>
                    
                    <button className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <span className="material-symbols-outlined text-xl">favorite</span>
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-slate-900 dark:text-slate-100 text-base font-semibold group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-slate-500 text-sm">{product.sku}</p>
                    <p className="text-primary font-bold mt-1">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Placeholder */}
            {products.length > 0 && (
              <div className="mt-16 flex justify-center items-center gap-4">
                <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-primary/20 text-slate-400 cursor-not-allowed">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <div className="flex gap-2">
                  <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
                </div>
                <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-primary/20 text-slate-400 cursor-not-allowed">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
            
            {products.length === 0 && (
              <div className="mt-10 p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4 block">inventory_2</span>
                <h3 className="text-xl font-bold dark:text-white mb-2">No hay productos aún</h3>
                <p className="text-slate-500 mb-6">Agrega ropa deportiva desde tu panel de administrador.</p>
                <Link href="/admin" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
                  <span className="material-symbols-outlined">add</span> Ir a Panel Admin
                </Link>
              </div>
            )}
          </div>
        </main>

        {/* Footer Section */}
        <footer className="mt-20 border-t border-primary/10 bg-white dark:bg-background-dark/50 px-6 lg:px-20 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">exercise</span>
                <h2 className="text-xl font-bold">LyG Indumentaria Deportiva</h2>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Empoderando a las mujeres a través de ropa deportiva sustentable y orientada al máximo rendimiento. Diseñada para seguir tu propio ritmo.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Tienda</h4>
              <ul className="flex flex-col gap-2 text-sm text-slate-500">
                <li><Link className="hover:text-primary" href="#">Calzas</Link></li>
                <li><Link className="hover:text-primary" href="#">Tops Deportivos</Link></li>
                <li><Link className="hover:text-primary" href="#">Abrigos</Link></li>
                <li><Link className="hover:text-primary" href="#">Accesorios</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Soporte</h4>
              <ul className="flex flex-col gap-2 text-sm text-slate-500">
                <li><Link className="hover:text-primary" href="#">Guía de Talles</Link></li>
                <li><Link className="hover:text-primary" href="#">Política de Envíos</Link></li>
                <li><Link className="hover:text-primary" href="#">Cambios y Devoluciones</Link></li>
                <li><Link className="hover:text-primary" href="#">Contáctanos</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Mantente Inspirada</h4>
              <div className="flex flex-col gap-4">
                <div className="flex rounded-xl overflow-hidden">
                  <input className="bg-primary/5 border-none focus:ring-1 focus:ring-primary text-sm px-4 py-2 w-full" placeholder="Tu correo electrónico" type="email" />
                  <button className="bg-primary text-white px-4 py-2"><span className="material-symbols-outlined text-sm">send</span></button>
                </div>
                <div className="flex gap-4">
                  <Link className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></Link>
                  <Link className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">share</span></Link>
                  <Link className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">photo_camera</span></Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-primary/5 text-center text-slate-400 text-xs">
            © 2024 LyG Indumentaria Deportiva. Todos los derechos reservados.
          </div>
        </footer>
      </div>
    </div>
  )
}
