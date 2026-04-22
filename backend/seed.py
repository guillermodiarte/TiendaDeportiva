import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base, User, Category, Product, ProductVariant, ProductImage, SiteSetting

# Database Setup para el Seed
SQLALCHEMY_DATABASE_URL = os.environ.get("SQLALCHEMY_DATABASE_URL", "sqlite:///./mundo_sport.db")
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def seed():
    # Inicializar Base de datos
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 1. Configuración de Acceso y Contacto (Super Admin)
        admin_email = "guillermo.diarte@gmail.com"
        admin_pass = "Gad33224122" # Temporal mock
        
        admin_user = db.query(User).filter(User.email == admin_email).first()
        if not admin_user:
            print("Creando Admin Inicial...")
            from app.auth import get_password_hash
            hashed = get_password_hash(admin_pass)
            new_admin = User(email=admin_email, password_hash=hashed, role="admin", name="Super Admin")
            db.add(new_admin)
            db.commit()

        # 2. Productos Iniciales si no existen
        if db.query(Category).count() == 0:
            print("Poblando Catálogo...")
            
            c_leggings = Category(name="Leggings", slug="leggings", image_url="")
            c_tops = Category(name="Tops", slug="tops", image_url="")
            db.add_all([c_leggings, c_tops])
            db.commit()

            p1 = Product(name="Aura Sculpt Performance", description="Protección UV 50+. Tecnología Dry-Core.", price=89000, category_id=c_leggings.id)
            db.add(p1)
            db.commit()

            v1 = ProductVariant(product_id=p1.id, size="M", color="Midnight Rose", stock=15, sku="AUR-SCU-M")
            i1 = ProductImage(product_id=p1.id, url="https://lh3.googleusercontent.com/aida-public/AB6AXuBnl7XEpRDqkPXzqzPSCEBtk-QMo44QJXmjNp85kPVzXexMbaU2wJogYNmNGVfSibXUt9_xI7MlrQVx6YyyKDqTM1773-msBP5noS6JUWg-cgw1RGlE4ram76Q8M6XVqKatDKR8xy1v9BKamaqnzTlcYD40hPmUxhl1wZZN9tdF0iTPIgJwf4SeMJyAm0_lUW5BCg3drq4e_6ZdBfUBCsr-qWN3ClnEV1_iy17ueExy9hfA3QOeCtMe5BWqDNDwcA0_muuTLUKXGEY", is_main=True)
            db.add_all([v1, i1])
            db.commit()
            
            print("Seed de catálogo finalizado.")
        else:
            print("La base de datos ya contiene información del catálogo.")

        # 3. Configuraciones Dinamicas del Sitio (Secciones)
        print("Verificando configuraciones del sitio...")
        default_settings = {
            'home_banner': { 
                "title": "NUEVA TEMPORADA", 
                "subtitle": "PODER EN MOVIMIENTO",
                "videoUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuB0cxK746v83ROJL7hs8CnHSC06y6FO_5BKKIjT17wYw5iCb8ERHKzIaDlv-Dh0C0xP_Xg7bv0hXxYqiJEcv2ISnb5GrrEIMFmlutU99JtFdOlebmD1X719ZSdiRC_pM5a_Qr9CF1MAPjtCAkFYPhz-auhf_zoyn6Rl4DmWoS8qt6C2dV6KaY8kXQzWUu4Ebnv4i0_-w4wUJ2cPMIGYzcWqZdCiShlsecf-MJriGEfBEV14OmFlIloeItI3stHip3RrRDu6PTuOG10" 
            },
            'home_categories': { "categoryIds": [] },
            'home_latest': { "useAuto": True, "productIds": [] },
            'site_header': { 
                "logoUrl": "", 
                "showSocials": True, 
                "facebookUrl": "#", 
                "instagramUrl": "#",
                "whatsapp": "5493704048860"
            },
            'site_footer': { 
                "logoUrl": "", 
                "copyRight": "© 2024 LyG Indumentaria Deportiva. Todos los derechos reservados." 
            }
        }
        
        for key, value in default_settings.items():
            existing = db.query(SiteSetting).filter(SiteSetting.key == key).first()
            if not existing:
                print(f"Creando preconfiguracion de seccion: {key}")
                new_setting = SiteSetting(key=key, value=value)
                db.add(new_setting)
                
        db.commit()
        print("¡Seed finalizado con éxito!")

    finally:
        db.close()

if __name__ == "__main__":
    seed()
