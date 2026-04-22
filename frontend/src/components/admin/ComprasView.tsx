'use client';
import { useState } from 'react';
import { useStockFlowStore, CATEGORIAS_DEPORTIVAS, TABLA_TALLES_CALZADO, TABLA_TALLES_INFERIOR, TABLA_TALLES_SUPERIOR } from '@/store/useStockStore';

export default function ComprasView({ showAlert, apiKey, apiUrl }: { showAlert: (msg: string) => void; apiKey: string; apiUrl: string }) {
  const globalMarkupPrc = useStockFlowStore(s => s.globalMarkupPrc);
  const registerPurchases = useStockFlowStore(s => s.registerPurchases);
  const products = useStockFlowStore(s => s.products);

  const [items, setItems] = useState([{
    productId: 'NEW', newProductName: '', newProductSku: '', categoryId: 'Remeras y Musculosas', 
    size: 'M', color: 'Negro',
    quantity: 1, unitPurchasePrice: 0, manualSalePrice: 0, autoCalculated: true,
    shoeMetric: 'MER', shoeSizeIndex: 8,
    inferiorMetric: 'ARG', inferiorSizeIndex: 0,
    superiorMetric: 'INT', superiorSizeIndex: 3,
    newProductImageUrls: [] as string[]
  }]);

  const addLine = () => setItems([...items, {
    productId: 'NEW', newProductName: '', newProductSku: '', categoryId: 'Remeras y Musculosas', 
    size: 'M', color: 'Negro',
    quantity: 1, unitPurchasePrice: 0, manualSalePrice: 0, autoCalculated: true,
    shoeMetric: 'MER', shoeSizeIndex: 8,
    inferiorMetric: 'ARG', inferiorSizeIndex: 0,
    superiorMetric: 'INT', superiorSizeIndex: 3,
    newProductImageUrls: [] as string[]
  }]);

  const updateItem = (index: number, field: keyof typeof items[0], value: any) => {
    const newItems = [...items];
    const item = newItems[index] as any;
    item[field] = value;

    if (field === 'unitPurchasePrice' && item.autoCalculated) {
      item.manualSalePrice = Number((value * (1 + (globalMarkupPrc / 100))).toFixed(2));
    }
    
    if (field === 'manualSalePrice') {
      item.autoCalculated = false;
    }

    setItems(newItems);
  };

  const removeItem = (idx: number) => {
      if(items.length > 1) {
          setItems(items.filter((_, i) => i !== idx));
      }
  };

  const handleSave = () => {
      if(items.some(i => i.productId === 'NEW' && !i.newProductName)) {
          showAlert("Asegúrate de rellenar el Nombre para los productos.");
          return;
      }
      if(items.some(i => !i.size || !i.color)) {
          showAlert("Asegúrate de rellenar Talle y Color en todas las líneas.");
          return;
      }

      const formattedItems = items.map(item => {
          const group = CATEGORIAS_DEPORTIVAS.find(g => g.opciones.includes(item.categoryId));
          const isCalzado = group?.grupo === 'Calzado Deportivo';
          const isInferior = group?.grupo === 'Indumentaria Inferior';
          const isSuperior = group?.grupo === 'Indumentaria Superior';
          const isSinTalle = group?.grupo === 'Equipamiento General' || group?.grupo === 'Cuidado Personal y Belleza';
          
          let finalSize = item.size;
          if (isSinTalle) {
              finalSize = 'Unico';
          } else if (isCalzado) {
              const row = TABLA_TALLES_CALZADO[item.shoeSizeIndex];
              if (row) {
                  finalSize = `MER:${row.MER} CM:${row.CM} US:${row.USA} UK:${row.UK} BR:${row.BR} EU:${row.EUR}`;
              }
          } else if (isInferior) {
              const row = TABLA_TALLES_INFERIOR[item.inferiorSizeIndex];
              if (row) {
                  finalSize = `ARG:${row.ARG} INT:${row.INT} USA:${row.USA}`;
              }
          } else if (isSuperior) {
              const row = TABLA_TALLES_SUPERIOR[item.superiorSizeIndex];
              if (row) {
                  finalSize = `INT:${row.INT} CM:${row.CM}`;
              }
          }

          return { ...item, size: finalSize };
      });

      registerPurchases(formattedItems);
      showAlert("Compras registradas con éxito. Las variantes y el stock fueron actualizados.");
      setItems([{
        productId: 'NEW', newProductName: '', newProductSku: '', categoryId: 'Remeras y Tops', 
        size: 'M', color: 'Negro',
        quantity: 1, unitPurchasePrice: 0, manualSalePrice: 0, autoCalculated: true,
        shoeMetric: 'MER', shoeSizeIndex: 8,
        inferiorMetric: 'ARG', inferiorSizeIndex: 0,
        superiorMetric: 'INT', superiorSizeIndex: 3,
        newProductImageUrls: [] as string[]
      }]);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">local_shipping</span>
            Ingreso de Mercadería
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Ingresa stock seleccionando una <span className="font-bold">variante específica (Talle y Color)</span>. PV calculado al {globalMarkupPrc}%.
          </p>
        </div>
        <button onClick={handleSave} className="w-full md:w-auto bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition shadow-lg shadow-primary/20 shrink-0">
            <span className="material-symbols-outlined">save</span> Finalizar Compra
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-4 items-end relative">
              
            <button onClick={() => removeItem(idx)} className="absolute -top-3 -right-3 bg-red-100 text-red-600 rounded-full size-8 flex items-center justify-center border border-red-200 hover:bg-red-200 z-10 transition-colors">
                <span className="material-symbols-outlined text-[18px]">close</span>
            </button>  

            {/* PRODUCT SELECTOR */}
            <div className="col-span-1 md:col-span-5 space-y-2">
                <label className="block text-xs font-bold text-slate-500">1. Producto Padre</label>
                <select 
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white font-bold h-10"
                    value={item.categoryId} onChange={e => updateItem(idx, 'categoryId', e.target.value)}
                >
                    {CATEGORIAS_DEPORTIVAS.map(g => (
                        <optgroup key={g.grupo} label={g.grupo} className="font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900">
                             {g.opciones.map(opt => (
                                 <option key={opt} value={opt} className="font-medium text-slate-900 dark:text-slate-300 bg-white dark:bg-slate-800">
                                     {opt}
                                 </option>
                             ))}
                        </optgroup>
                    ))}
                </select>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <input 
                       list={`product-names-${idx}`}
                       placeholder="Nombre de Producto" 
                       className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white" 
                       value={item.newProductName} 
                       onChange={e => {
                           const val = e.target.value;
                           updateItem(idx, 'newProductName', val);
                           const existing = products.find(p => p.name.toLowerCase() === val.toLowerCase());
                           if (existing) {
                               updateItem(idx, 'categoryId', existing.categoryId);
                               updateItem(idx, 'newProductSku', existing.sku);
                               updateItem(idx, 'unitPurchasePrice', existing.purchasePrice);
                               updateItem(idx, 'manualSalePrice', existing.salePrice);
                               updateItem(idx, 'newProductImageUrls', existing.imageUrls || []);
                           }
                       }} 
                    />
                    <datalist id={`product-names-${idx}`}>
                        {products.map(p => <option key={p.id} value={p.name} />)}
                    </datalist>

                    <input placeholder="SKU (Opcional)" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white" value={item.newProductSku} onChange={e => updateItem(idx, 'newProductSku', e.target.value)} />
                </div>
            </div>

            {/* VARIANTS */}
            <div className="col-span-1 md:col-span-3 space-y-2">
                 <label className="block text-xs font-bold text-slate-500">2. Variantes (Ítem Físico)</label>
                 <div className="flex flex-col gap-2 h-full">
                   {CATEGORIAS_DEPORTIVAS.find(g => g.opciones.includes(item.categoryId))?.grupo === 'Calzado Deportivo' ? (
                       <div className="flex gap-2">
                           <select className="w-1/3 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50 rounded-lg px-2 py-2 text-xs text-purple-900 dark:text-purple-300 font-bold h-10" value={item.shoeMetric} onChange={e => updateItem(idx, 'shoeMetric', e.target.value)}>
                               <option value="MER">MER</option>
                               <option value="CM">CM</option>
                               <option value="USA">USA</option>
                               <option value="UK">UK</option>
                               <option value="BR">BR</option>
                               <option value="EUR">EUR</option>
                           </select>
                           <select className="w-2/3 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50 rounded-lg px-3 py-2 text-sm text-purple-900 dark:text-purple-300 font-bold h-10" value={item.shoeSizeIndex} onChange={e => updateItem(idx, 'shoeSizeIndex', Number(e.target.value))}>
                               {TABLA_TALLES_CALZADO.map((row, rIdx) => (
                                   <option key={rIdx} value={rIdx}>{row[item.shoeMetric as keyof typeof row]}</option>
                               ))}
                           </select>
                       </div>
                   ) : CATEGORIAS_DEPORTIVAS.find(g => g.opciones.includes(item.categoryId))?.grupo === 'Indumentaria Inferior' ? (
                       <div className="flex gap-2">
                           <select className="w-1/3 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50 rounded-lg px-2 py-2 text-xs text-purple-900 dark:text-purple-300 font-bold h-10" value={item.inferiorMetric} onChange={e => updateItem(idx, 'inferiorMetric', e.target.value)}>
                               <option value="ARG">ARG</option>
                               <option value="INT">INT</option>
                               <option value="USA">USA</option>
                           </select>
                           <select className="w-2/3 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50 rounded-lg px-3 py-2 text-sm text-purple-900 dark:text-purple-300 font-bold h-10" value={item.inferiorSizeIndex} onChange={e => updateItem(idx, 'inferiorSizeIndex', Number(e.target.value))}>
                               {TABLA_TALLES_INFERIOR.map((row, rIdx) => (
                                   <option key={rIdx} value={rIdx}>{row[item.inferiorMetric as keyof typeof row]}</option>
                               ))}
                           </select>
                       </div>
                   ) : CATEGORIAS_DEPORTIVAS.find(g => g.opciones.includes(item.categoryId))?.grupo === 'Indumentaria Superior' ? (
                       <div className="flex gap-2">
                           <select className="w-1/3 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50 rounded-lg px-2 py-2 text-xs text-purple-900 dark:text-purple-300 font-bold h-10" value={item.superiorMetric} onChange={e => updateItem(idx, 'superiorMetric', e.target.value)}>
                               <option value="INT">INT</option>
                               <option value="CM">CM</option>
                           </select>
                           <select className="w-2/3 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50 rounded-lg px-3 py-2 text-sm text-purple-900 dark:text-purple-300 font-bold h-10" value={item.superiorSizeIndex} onChange={e => updateItem(idx, 'superiorSizeIndex', Number(e.target.value))}>
                               {TABLA_TALLES_SUPERIOR.map((row, rIdx) => (
                                   <option key={rIdx} value={rIdx}>{row[item.superiorMetric as keyof typeof row]}</option>
                               ))}
                           </select>
                       </div>
                   ) : CATEGORIAS_DEPORTIVAS.find(g => g.opciones.includes(item.categoryId))?.grupo === 'Equipamiento General' || CATEGORIAS_DEPORTIVAS.find(g => g.opciones.includes(item.categoryId))?.grupo === 'Cuidado Personal y Belleza' ? (
                       <select className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-400 font-bold h-10 opacity-60 pointer-events-none cursor-not-allowed text-center" value="Unico" onChange={() => {}}>
                          <option value="Unico">Sin Talle (Medida Estándar)</option>
                       </select>
                   ) : (
                       <select className="w-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50 rounded-lg px-3 py-2 text-sm text-purple-900 dark:text-purple-300 font-bold h-10" value={item.size} onChange={e => updateItem(idx, 'size', e.target.value)}>
                          <option value="S">Talle S</option>
                          <option value="M">Talle M</option>
                          <option value="L">Talle L</option>
                          <option value="XL">Talle XL</option>
                          <option value="Unico">Talle Único</option>
                       </select>
                   )}
                   <select className="w-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50 rounded-lg px-3 py-2 text-sm text-purple-900 dark:text-purple-300 font-bold h-10" value={item.color} onChange={e => updateItem(idx, 'color', e.target.value)}>
                      <option value="Negro">Negro</option>
                      <option value="Blanco">Blanco</option>
                      <option value="Rosa">Rosa</option>
                      <option value="Gris">Gris</option>
                      <option value="Azul">Azul</option>
                   </select>
                </div>
            </div>

            {/* FINANCIALS */}
            <div className="col-span-1 md:col-span-4 grid grid-cols-3 gap-2 items-end">
                <div>
                   <label className="block text-xs text-center font-bold text-slate-500 mb-1">Stock</label>
                   <input type="number" step="1" className="w-full text-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-2 text-sm text-slate-900 dark:text-white font-bold h-10" value={item.quantity} onChange={e => updateItem(idx, 'quantity', Number(e.target.value))} />
                </div>
                <div>
                   <label className="block text-xs text-center font-bold text-slate-500 mb-1">Costo</label>
                   <input type="number" className="w-full text-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-2 text-sm text-red-600 font-bold h-10" value={item.unitPurchasePrice} onChange={e => updateItem(idx, 'unitPurchasePrice', Number(e.target.value))} />
                </div>
                <div>
                   <label className="block text-xs text-center font-bold text-slate-500 mb-1 truncate" title="P. Venta sugerido">PV ({globalMarkupPrc}%)</label>
                   <input type="number" className={`w-full text-center bg-white dark:bg-slate-800 border rounded-lg px-2 py-2 text-sm font-black h-10 transition-colors ${!item.autoCalculated ? 'border-yellow-400 text-yellow-600' : 'border-green-300 dark:border-green-800 text-green-600 dark:text-green-400'}`} value={item.manualSalePrice} onChange={e => updateItem(idx, 'manualSalePrice', Number(e.target.value))} />
                </div>
            </div>

            {/* PHOTOS — full-width bottom strip */}
            <div className="col-span-1 md:col-span-12 flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                <label className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors text-sm font-bold h-10 whitespace-nowrap ${
                    (item as any)._uploading
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 text-blue-600 cursor-wait'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer'
                }`}>
                    <span className="material-symbols-outlined text-[18px]">
                        {(item as any)._uploading ? 'sync' : 'add_photo_alternate'}
                    </span>
                    {(item as any)._uploading ? 'Subiendo...' : 'Subir Fotos del Producto'}
                    <input
                       type="file"
                       accept="image/*"
                       multiple
                       disabled={(item as any)._uploading}
                       className="hidden"
                       onChange={async e => {
                           const files = Array.from(e.target.files || []);
                           if (files.length === 0) return;
                           if (!apiKey) { showAlert('Sin conexión con el servidor. Intenta de nuevo.'); return; }

                           updateItem(idx, '_uploading' as any, true);
                           const uploadedUrls: string[] = [];

                           for (const file of files) {
                               const formData = new FormData();
                               formData.append('file', file);
                               try {
                                   const res = await fetch(
                                       `${apiUrl}/api/admin/product-image?subcategory=${encodeURIComponent(item.categoryId)}`,
                                       { method: 'POST', headers: { 'X-API-KEY': apiKey }, body: formData }
                                   );
                                   if (res.ok) {
                                       const data = await res.json();
                                       uploadedUrls.push(data.url);
                                   } else {
                                       showAlert(`Error subiendo ${file.name}`);
                                   }
                               } catch {
                                   showAlert(`Error de red subiendo ${file.name}`);
                               }
                           }

                           const current = (item as any).newProductImageUrls || [];
                           updateItem(idx, 'newProductImageUrls', [...current, ...uploadedUrls]);
                           updateItem(idx, '_uploading' as any, false);
                           e.target.value = '';
                       }}
                    />
                </label>

                {/* thumbnails flow to the right */}
                <div className="flex gap-2 overflow-x-auto flex-1 min-w-0">
                    {(item.newProductImageUrls || []).map((imgUrl, imgIdx) => (
                        <div
                            key={imgIdx}
                            className="size-10 rounded-md flex-shrink-0 border border-slate-200 dark:border-slate-700 overflow-hidden relative group/img cursor-pointer"
                            onClick={() => {
                                const arr = [...item.newProductImageUrls];
                                arr.splice(imgIdx, 1);
                                updateItem(idx, 'newProductImageUrls', arr);
                            }}
                            title="Quitar"
                        >
                            <img src={imgUrl} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-red-500/80 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-[14px]">close</span>
                            </div>
                        </div>
                    ))}
                    {(item.newProductImageUrls || []).length === 0 && (
                        <p className="text-xs text-slate-400 italic self-center">Sin fotos aún — las imágenes se guardarán en el servidor</p>
                    )}
                </div>
            </div>
            
          </div>
        ))}

        <button onClick={addLine} className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-xl">add_circle</span> Añadir nueva variante a esta factura
        </button>

      </div>
    </div>
  );
}
