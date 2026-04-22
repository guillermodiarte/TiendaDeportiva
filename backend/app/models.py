from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Numeric, JSON
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class SiteSetting(Base):
    __tablename__ = "site_settings"
    
    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, index=True, nullable=False)
    value = Column(JSON, nullable=False) # Guardará listas o diccionarios configurados desde el Frontend

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    slug = Column(String, unique=True, index=True)
    image_url = Column(String, nullable=True)

    products = relationship("Product", back_populates="category")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    price = Column(Numeric(10, 2))
    currency = Column(String, default='ARS')
    category_id = Column(Integer, ForeignKey("categories.id"))
    status = Column(String, default='active')

    category = relationship("Category", back_populates="products")
    variants = relationship("ProductVariant", back_populates="product", cascade="all, delete-orphan")
    images = relationship("ProductImage", back_populates="product", cascade="all, delete-orphan")


class ProductVariant(Base):
    """
    (Talle/Color/Stock)
    """
    __tablename__ = "product_variants"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    size = Column(String) # XS, S, M, L, XL
    color = Column(String, nullable=True)
    stock = Column(Integer, default=0)
    sku = Column(String, unique=True, index=True)

    product = relationship("Product", back_populates="variants")


class ProductImage(Base):
    __tablename__ = "product_images"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    url = Column(String)
    is_main = Column(Boolean, default=False)

    product = relationship("Product", back_populates="images")


# === ESTRUCTURAS LATENTES ===
# Preparadas para futura integración con Mercado Pago y Autenticación de Usuarios

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String, default="admin") # admin, editor, cliente
    name = Column(String, nullable=True)
    phone = Column(String, nullable=True)

    # orders = relationship("Order", back_populates="user")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String) # pending, paid, cancelled
    mp_preference_id = Column(String, nullable=True) # Para Mercado Pago
    total = Column(Numeric(10, 2))

    # user = relationship("User", back_populates="orders")
