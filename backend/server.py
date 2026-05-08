from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="DERINER API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: str = Field(..., min_length=2, max_length=120)
    phone: str = Field(..., min_length=5, max_length=40)
    email: Optional[EmailStr] = None
    service: Optional[str] = Field(None, max_length=80)
    message: str = Field(..., min_length=3, max_length=2000)
    # honeypot - if filled, it's a bot
    website: Optional[str] = Field(None, max_length=200)


class ContactRecord(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    service: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ServiceItem(BaseModel):
    slug: str
    title: str
    short: str
    highlights: List[str]


# ---------- Static data ----------
SERVICES: List[ServiceItem] = [
    ServiceItem(
        slug="yatay-sondaj",
        title="Yatay Sondaj",
        short="Yüzeye zarar vermeden yatay hat açma ve altyapı geçişleri.",
        highlights=[
            "Yüksek basınçlı su + hava sistemi",
            "Kaya, beton ve sert zeminde hassas ilerleme",
            "Altyapı ve boru geçişlerinde minimum hasar",
        ],
    ),
    ServiceItem(
        slug="kuyu-derinlestirme",
        title="Kuyu Derinleştirme",
        short="Mevcut kuyuyu su damarına ulaşana dek profesyonel ekipmanla derinleştiriyoruz.",
        highlights=[
            "Hava hiltisi ile kaya katmanı kırma",
            "Katman bazlı ilerleme raporu",
            "Su seviyesi ve debi doğrulama",
        ],
    ),
    ServiceItem(
        slug="kuyu-guclendirme",
        title="Kuyu Güçlendirme",
        short="Çökme riski olan kuyularda demir destekli beton muhafaza.",
        highlights=[
            "Yuvarlak kalıp sistemi",
            "Demir donatılı beton muhafaza",
            "Uzun ömürlü yapısal dayanım",
        ],
    ),
    ServiceItem(
        slug="kuyu-temizleme",
        title="Kuyu Temizleme",
        short="Tortulaşmış kuyularda debi ve su berraklığını yeniden kazandırma.",
        highlights=[
            "Çamur, tortu ve tıkanıklık temizliği",
            "Debi yeniden devreye alma",
            "Öncesi/sonrası ölçümleme",
        ],
    ),
    ServiceItem(
        slug="su-kuyusu-acma",
        title="Su Kuyusu Açma",
        short="Arazi etüdünden teslime, tam süreç kuyu açma hizmeti.",
        highlights=[
            "Arazi etüdü ve konumlandırma",
            "Uygun çaplı sondaj ve muhafaza",
            "Debi / kalite testleri",
        ],
    ),
    ServiceItem(
        slug="tuvalet-kuyusu-kanal",
        title="Tuvalet Kuyusu ve Kanal Bağlantısı",
        short="Fosseptik, tuvalet kuyusu ve kanalizasyon bağlantıları.",
        highlights=[
            "Standartlara uygun fosseptik",
            "Yerel yönetmeliğe uyumlu kanal bağlantısı",
            "Temiz ve hızlı saha teslimi",
        ],
    ),
]


# ---------- Helpers ----------
def _serialize_dt(doc: dict) -> dict:
    for k, v in list(doc.items()):
        if isinstance(v, datetime):
            doc[k] = v.isoformat()
    return doc


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "DERINER API", "status": "ok"}


@api_router.get("/health")
async def health():
    try:
        await db.command("ping")
        return {"status": "ok", "db": "connected"}
    except Exception as e:  # pragma: no cover
        return {"status": "degraded", "db": "error", "detail": str(e)}


@api_router.get("/services", response_model=List[ServiceItem])
async def list_services():
    return SERVICES


@api_router.post("/contact", response_model=ContactRecord)
async def submit_contact(payload: ContactRequest):
    # Honeypot check - silently accept but don't persist
    if payload.website:
        raise HTTPException(status_code=400, detail="Invalid submission")

    record = ContactRecord(
        name=payload.name.strip(),
        phone=payload.phone.strip(),
        email=(payload.email or None),
        service=(payload.service or None),
        message=payload.message.strip(),
    )
    doc = record.model_dump()
    doc = _serialize_dt(doc)
    try:
        await db.contact_submissions.insert_one(doc)
    except Exception as e:
        logger.exception("Failed to insert contact submission")
        raise HTTPException(status_code=500, detail="Could not save submission") from e
    return record


@api_router.get("/contact", response_model=List[ContactRecord])
async def list_contacts(limit: int = 100):
    limit = max(1, min(500, limit))
    docs = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for d in docs:
        if isinstance(d.get("created_at"), str):
            try:
                d["created_at"] = datetime.fromisoformat(d["created_at"])
            except Exception:
                d["created_at"] = datetime.now(timezone.utc)
    return docs


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            try:
                check['timestamp'] = datetime.fromisoformat(check['timestamp'])
            except Exception:
                check['timestamp'] = datetime.now(timezone.utc)
    return status_checks


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
