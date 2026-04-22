import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const CATEGORIAS_DEPORTIVAS = [
  {
    grupo: "Indumentaria Superior",
    opciones: ["Sujetadores Deportivos", "Remeras y Musculosas", "Buzos y Abrigo", "Térmicas"]
  },
  {
    grupo: "Indumentaria Inferior",
    opciones: ["Calzas Largas", "Calzas Cortas (Bikers)", "Shorts", "Pantalones y Joggers"]
  },
  {
    grupo: "Calzado Deportivo",
    opciones: ["Running", "Training / Funcional", "Outdoor / Trekking", "Ojotas y Recuperación"]
  },
  {
    grupo: "Accesorios de Indumentaria",
    opciones: ["Medias y Soquetes", "Gorras y Viseras", "Vinchas y Scrunchies", "Guantes", "Ropa Interior Deportiva"]
  },
  {
    grupo: "Equipamiento General",
    opciones: ["Bolsos y Gym Bags", "Mochilas y Riñoneras", "Botellas y Shakers", "Mats de Yoga", "Bandas Elásticas"]
  },
  {
    grupo: "Cuidado Personal y Belleza",
    opciones: ["Protección Solar", "Maquillaje Waterproof", "Cuidado Post-Entreno"]
  }
];

export const TABLA_TALLES_CALZADO = [
  { CM: "21", USA: "4", UK: "2", BR: "32.5", MER: "33.5", EUR: "34.5" },
  { CM: "21.5", USA: "4.5", UK: "2.5", BR: "33", MER: "34", EUR: "35" },
  { CM: "22", USA: "5", UK: "3", BR: "33.5", MER: "34.5", EUR: "35.5" },
  { CM: "22.5", USA: "5.5", UK: "3.5", BR: "34", MER: "35", EUR: "36" },
  { CM: "23", USA: "6", UK: "4", BR: "34.5", MER: "35.5", EUR: "36.5" },
  { CM: "23.5", USA: "6.5", UK: "4.5", BR: "35", MER: "36", EUR: "37" },
  { CM: "24", USA: "7", UK: "5", BR: "36", MER: "37", EUR: "38" },
  { CM: "24.5", USA: "7.5", UK: "5.5", BR: "36.5", MER: "37.5", EUR: "38.5" },
  { CM: "25", USA: "8", UK: "6", BR: "37", MER: "38", EUR: "39" },
  { CM: "25.5", USA: "8.5", UK: "6.5", BR: "38", MER: "39", EUR: "40" },
  { CM: "26", USA: "9", UK: "7", BR: "38.5", MER: "39.5", EUR: "40.5" },
  { CM: "26.5", USA: "9.5", UK: "7.5", BR: "39", MER: "40", EUR: "41" },
  { CM: "27", USA: "10", UK: "8", BR: "40", MER: "41", EUR: "42" },
  { CM: "27.5", USA: "10.5", UK: "8.5", BR: "40.5", MER: "41.5", EUR: "42.5" }
];

export const TABLA_TALLES_INFERIOR = [
  { ARG: "34", INT: "XS", USA: "24/25" },
  { ARG: "36", INT: "S", USA: "26/27" },
  { ARG: "38", INT: "S/M", USA: "28/29" },
  { ARG: "40", INT: "M", USA: "30" },
  { ARG: "42", INT: "M/L", USA: "31" },
  { ARG: "44", INT: "L", USA: "32/33" },
  { ARG: "46", INT: "XL", USA: "34/35" },
  { ARG: "48+", INT: "XXL+", USA: "36/38+" }
];

export const TABLA_TALLES_SUPERIOR = [
  { INT: "XXS", CM: "<80" },
  { INT: "XS", CM: "80-85" },
  { INT: "S", CM: "86-91" },
  { INT: "M", CM: "92-97" },
  { INT: "L", CM: "98-103" },
  { INT: "XL", CM: "104-109" },
  { INT: "XXL", CM: "110-115" },
  { INT: "XXXL", CM: "115+" }
];

export interface ProductVariant {
  id: string; // Unique ID for the variant
  size: string;
  color: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  purchasePrice: number;
  salePrice: number;
  imageUrls?: string[];
  variants: ProductVariant[];
}

export interface PurchaseRecord {
  id: string;
  date: string;
  productId: string;
  productName: string;
  variantId: string;
  size: string;
  color: string;
  quantity: number;
  unitPurchasePrice: number;
  totalCost: number;
}

export interface SaleRecord {
  id: string;
  date: string;
  productId: string;
  productName: string;
  variantId: string;
  size: string;
  color: string;
  clientName?: string;
  quantity: number;
  unitSalePrice: number;
  revenue: number;
}

export interface StockFlowState {
  globalMarkupPrc: number;
  products: Product[];
  purchases: PurchaseRecord[];
  sales: SaleRecord[];
  
  setGlobalMarkup: (percentage: number) => void;
  
  registerPurchases: (newPurchases: {
    productId: string | 'NEW';
    newProductName?: string;
    newProductSku?: string;
    newProductImageUrls?: string[];
    categoryId: string;
    size: string;
    color: string;
    quantity: number;
    unitPurchasePrice: number;
    manualSalePrice: number;
  }[]) => void;

  registerSale: (clientName: string, items: { 
    productId: string; 
    variantId: string; 
    quantity: number; 
    salePrice: number 
  }[]) => void;

  deleteProduct: (productId: string) => void;
  deleteVariant: (productId: string, variantId: string) => void;
  updateProduct: (productId: string, data: Partial<Product>, variants?: ProductVariant[]) => void;
}

// Initial Mock Data with Variants
const MOCK_PRODUCTS: Product[] = [
  { 
    id: '1', name: 'Calza Deportiva Fit', sku: 'CLZ-01', categoryId: 'Calzas Largas', 
    purchasePrice: 5000, salePrice: 7500,
    variants: [
        { id: 'v1-1', size: 'S', color: 'Negro', stock: 5 },
        { id: 'v1-2', size: 'M', color: 'Negro', stock: 10 },
        { id: 'v1-3', size: 'M', color: 'Rosa', stock: 0 }
    ]
  },
  { 
    id: '2', name: 'Top Deportivo Pro', sku: 'TOP-02', categoryId: 'Sujetadores Deportivos', 
    purchasePrice: 3000, salePrice: 4500,
    variants: [
        { id: 'v2-1', size: 'Unico', color: 'Blanco', stock: 8 }
    ]
  },
];

export const useStockFlowStore = create<StockFlowState>()(
  persist(
    (set) => ({
      globalMarkupPrc: 50, // 50% por defecto
      products: MOCK_PRODUCTS,
      purchases: [],
      sales: [
        {
          id: 's-mock-1', date: new Date(Date.now() - 86400000 * 2).toISOString(),
          productId: '1', productName: 'Calza Deportiva Fit',
          variantId: 'v1-2', size: 'M', color: 'Negro',
          clientName: 'María Gómez', quantity: 2, unitSalePrice: 7500, revenue: 15000
        },
        {
          id: 's-mock-2', date: new Date(Date.now() - 86400000 * 5).toISOString(),
          productId: '2', productName: 'Top Deportivo Pro',
          variantId: 'v2-1', size: 'Unico', color: 'Blanco',
          clientName: 'Consumidor Final', quantity: 1, unitSalePrice: 4500, revenue: 4500
        }
      ],

      setGlobalMarkup: (percentage) => set({ globalMarkupPrc: percentage }),

      registerPurchases: (newPurchases) => {
        set((state) => {
          const updatedProducts = JSON.parse(JSON.stringify(state.products)) as Product[];
          const newPurchaseRecords: PurchaseRecord[] = [];

          newPurchases.forEach(purchase => {
            let targetProductId = purchase.productId;
            let targetProductName = purchase.newProductName || 'Producto Desconocido';
            let targetVariantId = Math.random().toString(36).substr(2, 9);

            if (purchase.productId === 'NEW') {
              const existingIndex = updatedProducts.findIndex(p =>
                  p.name.trim().toLowerCase() === purchase.newProductName!.trim().toLowerCase() ||
                  (purchase.newProductSku && purchase.newProductSku.trim() !== '' && p.sku === purchase.newProductSku)
              );

              if (existingIndex !== -1) {
                  const prod = updatedProducts[existingIndex];
                  targetProductId = prod.id;
                  targetProductName = prod.name;
                  prod.purchasePrice = purchase.unitPurchasePrice;
                  prod.salePrice = purchase.manualSalePrice;
                  prod.categoryId = purchase.categoryId;
                  if (purchase.newProductImageUrls && purchase.newProductImageUrls.length > 0) {
                      prod.imageUrls = purchase.newProductImageUrls; // server URLs
                  }

                  const varIndex = prod.variants.findIndex(v => v.size === purchase.size && v.color === purchase.color);
                  if (varIndex !== -1) {
                      prod.variants[varIndex].stock += purchase.quantity;
                      targetVariantId = prod.variants[varIndex].id;
                  } else {
                      prod.variants.push({
                          id: targetVariantId, size: purchase.size, color: purchase.color, stock: purchase.quantity
                      });
                  }
              } else {
                  targetProductId = Math.random().toString(36).substr(2, 9);
                  updatedProducts.push({
                    id: targetProductId,
                    name: purchase.newProductName!,
                    sku: purchase.newProductSku!,
                    categoryId: purchase.categoryId,
                    imageUrls: purchase.newProductImageUrls || [],
                    purchasePrice: purchase.unitPurchasePrice,
                    salePrice: purchase.manualSalePrice,
                    variants: [
                        { id: targetVariantId, size: purchase.size, color: purchase.color, stock: purchase.quantity }
                    ]
                  });
              }
            } else {
              // Update existing product
              const productIndex = updatedProducts.findIndex(p => p.id === purchase.productId);
              if (productIndex !== -1) {
                const prod = updatedProducts[productIndex];
                targetProductName = prod.name;
                prod.purchasePrice = purchase.unitPurchasePrice;
                prod.salePrice = purchase.manualSalePrice;
                
                // Find if variant exists
                const varIndex = prod.variants.findIndex(v => v.size === purchase.size && v.color === purchase.color);
                if (varIndex !== -1) {
                    prod.variants[varIndex].stock += purchase.quantity;
                    targetVariantId = prod.variants[varIndex].id;
                } else {
                    prod.variants.push({
                        id: targetVariantId, size: purchase.size, color: purchase.color, stock: purchase.quantity
                    });
                }
              }
            }
            
            newPurchaseRecords.push({
              id: Math.random().toString(36).substr(2, 9),
              date: new Date().toISOString(),
              productId: targetProductId,
              productName: targetProductName,
              variantId: targetVariantId,
              size: purchase.size,
              color: purchase.color,
              quantity: purchase.quantity,
              unitPurchasePrice: purchase.unitPurchasePrice,
              totalCost: purchase.quantity * purchase.unitPurchasePrice
            });
          });

          return {
            products: updatedProducts,
            purchases: [...state.purchases, ...newPurchaseRecords]
          };
        });
      },

      registerSale: (clientName, items) => {
        set((state) => {
          const updatedProducts = JSON.parse(JSON.stringify(state.products)) as Product[];
          const newSaleRecords: SaleRecord[] = [];

          items.forEach(item => {
            const productIndex = updatedProducts.findIndex(p => p.id === item.productId);
            let pName = 'Producto Eliminado';
            let pSize = 'N/A';
            let pColor = 'N/A';

            if (productIndex !== -1) {
              pName = updatedProducts[productIndex].name;
              const varIndex = updatedProducts[productIndex].variants.findIndex(v => v.id === item.variantId);
              if(varIndex !== -1) {
                  updatedProducts[productIndex].variants[varIndex].stock -= item.quantity;
                  pSize = updatedProducts[productIndex].variants[varIndex].size;
                  pColor = updatedProducts[productIndex].variants[varIndex].color;
              }
            }

            newSaleRecords.push({
              id: Math.random().toString(36).substr(2, 9),
              date: new Date().toISOString(),
              productId: item.productId,
              productName: pName,
              variantId: item.variantId,
              size: pSize,
              color: pColor,
              clientName,
              quantity: item.quantity,
              unitSalePrice: item.salePrice,
              revenue: item.quantity * item.salePrice
            });
          });

          return {
            products: updatedProducts,
            sales: [...state.sales, ...newSaleRecords]
          };
        });
      },

      deleteProduct: (productId) => {
        set((state) => ({
             products: state.products.filter(p => p.id !== productId),
             purchases: state.purchases.filter(p => p.productId !== productId),
             sales: state.sales.filter(s => s.productId !== productId)
        }));
      },

      deleteVariant: (productId, variantId) => {
           set((state) => {
               const newProducts = [...state.products];
               const pIdx = newProducts.findIndex(p => p.id === productId);
               if(pIdx !== -1) {
                   newProducts[pIdx] = { 
                     ...newProducts[pIdx], 
                     variants: newProducts[pIdx].variants.filter(v => v.id !== variantId) 
                   };
               }
               return {
                   products: newProducts,
                   purchases: state.purchases.filter(p => p.variantId !== variantId),
                   sales: state.sales.filter(s => s.variantId !== variantId)
               };
           });
      },

      updateProduct: (productId, data, variants) => {
         set((state) => {
            const newProducts = [...state.products];
            const pIdx = newProducts.findIndex(p => p.id === productId);
            if(pIdx !== -1) {
              newProducts[pIdx] = { ...newProducts[pIdx], ...data };
              if (variants) {
                newProducts[pIdx].variants = variants;
              }
            }
            
            let newPurchases = state.purchases;
            if(data.purchasePrice !== undefined) {
               newPurchases = newPurchases.map(p => 
                  p.productId === productId ? { ...p, unitPurchasePrice: data.purchasePrice!, totalCost: p.quantity * data.purchasePrice! } : p
               );
            }
            
            let newSales = state.sales;
            if(data.salePrice !== undefined) {
               newSales = newSales.map(s => 
                  s.productId === productId ? { ...s, unitSalePrice: data.salePrice!, revenue: s.quantity * data.salePrice! } : s
               );
            }

            return { products: newProducts, purchases: newPurchases, sales: newSales };
         });
      }
    }),
    {
      name: 'stockflow-data-v4',
    }
  )
);
