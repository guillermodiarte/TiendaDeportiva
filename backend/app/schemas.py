from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class ProductImageSchema(BaseModel):
    id: int
    url: str
    is_main: bool

    model_config = ConfigDict(from_attributes=True)


class ProductVariantSchema(BaseModel):
    id: int
    size: str
    color: Optional[str] = None
    stock: int
    sku: str

    model_config = ConfigDict(from_attributes=True)


class CategorySchema(BaseModel):
    id: int
    name: str
    slug: str
    image_url: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class ProductSchema(BaseModel):
    id: int
    name: str
    description: str
    price: float
    currency: str
    status: str
    category: Optional[CategorySchema] = None
    variants: List[ProductVariantSchema] = []
    images: List[ProductImageSchema] = []

    model_config = ConfigDict(from_attributes=True)


class ProductCreateSchema(BaseModel):
    name: str
    description: str
    price: float
    category_id: int
    sku: str
    size: str
    stock: int = 0
    image_url: str = ""


from typing import Optional

class UserBaseSchema(BaseModel):
    email: str
    role: str = "admin"
    name: Optional[str] = None
    phone: Optional[str] = None

class UserCreateSchema(UserBaseSchema):
    password: str

class UserUpdateSchema(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None
    password: Optional[str] = None
    name: Optional[str] = None
    phone: Optional[str] = None

class UserSchema(UserBaseSchema):
    id: int
    model_config = ConfigDict(from_attributes=True)

class TokenData(BaseModel):
    email: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str

class SiteSettingSchema(BaseModel):
    id: int
    key: str
    value: dict | list | str | int | bool | float | None

    model_config = ConfigDict(from_attributes=True)

class SiteSettingUpdateSchema(BaseModel):
    value: dict | list | str | int | bool | float | None

class MediaMoveSchema(BaseModel):
    new_category: str
