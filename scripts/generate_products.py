"""Generate 500 realistic Persian real-estate listings for SobhanAmlak.

No DB — outputs src/data/products.json consumed directly by the Next.js app and
served via GET /api/products. Deterministic (fixed seed) so reruns are stable.

Each product keeps the original display fields the UI relies on (price, area,
rooms, year as Persian strings) AND adds structured numeric fields (priceValue,
areaValue, roomsValue, yearValue, city) so avalagent's sales agent can ingest,
filter and answer natural-language questions after syncing into its DB.
"""

from __future__ import annotations

import json
import random
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "data" / "products.json"

FA_DIGITS = str.maketrans("0123456789", "۰۱۲۳۴۵۶۷۸۹")


def fa(n) -> str:
    return str(n).translate(FA_DIGITS)


# --- Catalog config ---------------------------------------------------------

# district -> (city, pricePerM range in Toman, tier)
TEHRAN_DISTRICTS = {
    "نیاوران": (85_000_000, 175_000_000),
    "الهیه": (90_000_000, 180_000_000),
    "زعفرانیه": (95_000_000, 190_000_000),
    "فرمانیه": (80_000_000, 165_000_000),
    "محمودیه": (85_000_000, 170_000_000),
    "سعادت آباد": (55_000_000, 110_000_000),
    "ولنجک": (60_000_000, 130_000_000),
    "دروس": (75_000_000, 150_000_000),
    "فرشته": (70_000_000, 145_000_000),
    "اقدسیه": (55_000_000, 115_000_000),
    "قیطریه": (50_000_000, 105_000_000),
    "تجریش": (60_000_000, 120_000_000),
    "پاسداران": (55_000_000, 115_000_000),
    "ونک": (45_000_000, 90_000_000),
    "میرداماد": (45_000_000, 95_000_000),
    "جردن": (50_000_000, 100_000_000),
    "شهرک غرب": (40_000_000, 85_000_000),
    "پونک": (32_000_000, 70_000_000),
    "شیان": (30_000_000, 62_000_000),
    "هروی": (28_000_000, 58_000_000),
}

MAZANDARAN_DISTRICTS = {
    "چالوس": (18_000_000, 42_000_000),
    "کلاردشت": (15_000_000, 38_000_000),
    "نمک آبرود": (20_000_000, 46_000_000),
    "رامسر": (17_000_000, 40_000_000),
    "نوشهر": (22_000_000, 50_000_000),
    "محمودآباد": (18_000_000, 44_000_000),
    "تنکابن": (15_000_000, 36_000_000),
    "عباس آباد": (16_000_000, 40_000_000),
    "سلمان شهر": (19_000_000, 45_000_000),
}

# type -> (area range m², rooms range, allowed in which city)
TYPES = {
    "آپارتمان": (70, 280, 1, 3, "both"),
    "آپارتمان لوکس": (150, 340, 2, 4, "tehran"),
    "آپارتمان باغی": (120, 260, 2, 4, "both"),
    "پنت هاوس": (200, 450, 3, 5, "tehran"),
    "ویلا": (180, 700, 3, 6, "both"),
}

BADGES = ["فایل ویژه", "جدید", "زیر قیمت", "قابل مذاکره", "فوری", "فایل بازدید"]

FEATURES_COMMON = [
    "پارکینگ", "آسانسور", "انباری", "بالکن", "نور جنوب", "نور شرقی",
    "پلان باز", "کابینت MDF", "کف پارکت", "پکیج", "شومینه", "لابی",
    "نگهبان", "دوربین مداربسته", "درب ریموت", "سیستم هوشمند",
]
FEATURES_VILLA = [
    "استخر", "سونا", "جکوزی", "فضای سبز", "آبنما", "باربیکیو",
    "پارکینگ روباز", "آلاچیق", "زمین ورزشی", "اتاق مستر",
]
FEATURES_MAZ = [
    "دید دریا", "نزدیک جنگل", "حاشیه جاده", "فنس کشی شده",
    "آب و برق روستایی", "دسترسی به ساحل", "آب شرب روستایی",
]

DESCRIPTORS_ANY = [
    "حاشیه‌ای", "مرکز محله", "ساکنین خاص", "بازسازی شده",
    "نوساز", "پلان اصولی", "کوچه باز", "دوبلکس",
]
DESCRIPTORS_FLOOR = ["طبقه نورگیر", "با تراس بزرگ", "با دید شهری", "طبقه آخر"]


def pick_descriptor(rng: random.Random, ptype: str) -> str:
    if ptype in ("آپارتمان", "آپارتمان لوکس", "آپارتمان باغی", "پنت هاوس"):
        return rng.choice(DESCRIPTORS_ANY + DESCRIPTORS_FLOOR)
    # villa: floor-style descriptors don't fit
    return rng.choice(DESCRIPTORS_ANY + ["با فضای سبز", "با استخر", "حیاط بزرگ"])

# Real-estate Unsplash photos (whitelisted domain in next.config.ts)
IMAGES = [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&q=85",
    "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=1100&q=85",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1100&q=85",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1100&q=85",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1100&q=85",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1100&q=85",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1100&q=85",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1100&q=85",
    "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1100&q=85",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1100&q=85",
    "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&w=1100&q=85",
]

DISTRICT_SLUG = {
    "نیاوران": "niavaran", "الهیه": "elahiyeh", "زعفرانیه": "zafaraniyeh",
    "فرمانیه": "farmaniyeh", "محمودیه": "mahmoudiyeh", "سعادت آباد": "saadatabad",
    "ولنجک": "velenjak", "دروس": "davous", "فرشته": "fereshteh",
    "اقدسیه": "aghdasieh", "قیطریه": "gheytarieh", "تجریش": "tajrish",
    "پاسداران": "pasdaran", "ونک": "vanak", "میرداماد": "mirdamad",
    "جردن": "jordan", "شهرک غرب": "shahrak-gharb", "پونک": "punak",
    "شیان": "shiyan", "هروی": "heravi",
    "چالوس": "chalus", "کلاردشت": "kelardasht", "نمک آبرود": "namak-abrud",
    "رامسر": "ramsar", "نوشهر": "noushahr", "محمودآباد": "mahmudabad",
    "تنکابن": "tonekabon", "عباس آباد": "abbasabad", "سلمان شهر": "salman-shahr",
}
TYPE_SLUG = {
    "آپارتمان": "apartment", "آپارتمان لوکس": "luxury-apartment",
    "آپارتمان باغی": "garden-apartment", "پنت هاوس": "penthouse", "ویلا": "villa",
}


def format_price(value: int) -> tuple[str, str]:
    """Return (display string, unit). >=1e9 -> میلیارد تومان, else میلیون تومان."""
    if value >= 1_000_000_000:
        bill = value / 1_000_000_000
        shown = f"{bill:.1f}".rstrip("0").rstrip(".") if bill < 100 else str(int(bill))
        return f"{fa(shown)} میلیارد تومان", "میلیارد تومان"
    million = round(value / 1_000_000)
    return f"{fa(million)} میلیون تومان", "میلیون تومان"


def make_features(rng: random.Random, ptype: str, city: str) -> list[str]:
    pool = FEATURES_COMMON.copy()
    if ptype in ("ویلا", "پنت هاوس", "آپارتمان باغی"):
        pool += FEATURES_VILLA
    if city == "مازندران":
        pool += FEATURES_MAZ
    k = rng.randint(4, 7)
    return rng.sample(pool, min(k, len(pool)))


def make_summary(ptype: str, district: str, city: str, area: int, rooms: int) -> str:
    loc = f"{district}، {city}" if city == "مازندران" else district
    if city == "مازندران":
        return (
            f"{ptype} در {loc} با متراژ {fa(area)} متر و {fa(rooms)} خواب؛ "
            f"مناسب اقامت دوم و سرمایه‌گذاری با دسترسی آسان به جنگل و ساحل."
        )
    return (
        f"{ptype} در {loc} با {fa(area)} متر زیر بنا و {fa(rooms)} خواب؛ "
        f"پلان اصولی، نور مناسب و دسترس به بازار، مدارس و اتوبان‌های اصلی."
    )


def build() -> list[dict]:
    rng = random.Random(1403)
    products: list[dict] = []
    used_ids: set[str] = set()

    # Weighting: ~62% Tehran, ~38% Mazandaran -> realistic agency split with a
    # strong second-home/coastal book (common for Tehran amlak agencies).
    tehran_keys = list(TEHRAN_DISTRICTS.keys())
    maz_keys = list(MAZANDARAN_DISTRICTS.keys())

    while len(products) < 500:
        if rng.random() < 0.62:
            district = rng.choice(tehran_keys)
            city = "تهران"
            lo, hi = TEHRAN_DISTRICTS[district]
        else:
            district = rng.choice(maz_keys)
            city = "مازندران"
            lo, hi = MAZANDARAN_DISTRICTS[district]

        # pick a type allowed for this city
        candidates = [
            t for t, (_, _, _, _, scope) in TYPES.items()
            if scope == "both" or (city == "تهران" and scope == "tehran")
        ]
        # Mazandaran favours villas / garden apartments
        if city == "مازندران":
            weights = []
            for t in candidates:
                weights.append(5 if t in ("ویلا", "آپارتمان باغی") else 1)
            ptype = rng.choices(candidates, weights=weights, k=1)[0]
        else:
            ptype = rng.choice(candidates)

        area_min, area_max, rmin, rmax, _ = TYPES[ptype]
        area = rng.randint(area_min, area_max)
        # round area to a realistic step (5 m²)
        area = round(area / 5) * 5
        rooms = rng.randint(rmin, rmax)

        price_per_m = rng.randint(lo, hi)
        # luxury types command a premium, apartments a small discount
        if ptype in ("آپارتمان لوکس", "پنت هاوس"):
            price_per_m = int(price_per_m * rng.uniform(1.05, 1.25))
        if ptype == "آپارتمان" and city == "تهران":
            price_per_m = int(price_per_m * rng.uniform(0.85, 1.0))
        price_value = area * price_per_m
        # round price to a clean step (10M Toman)
        price_value = round(price_value / 10_000_000) * 10_000_000

        price_str, unit = format_price(price_value)

        if rng.random() < 0.30:
            year_str = "نوساز"
            year_val = 1403
        else:
            year_val = rng.randint(1375, 1403)
            year_str = fa(year_val)

        badge = rng.choice(BADGES)
        is_featured = rng.random() < 0.08

        descriptor = pick_descriptor(rng, ptype)
        title = f"{ptype} {district} - {descriptor}"

        base = f"{DISTRICT_SLUG[district]}-{TYPE_SLUG[ptype]}"
        i = 1
        slug = f"{base}-{i}"
        while slug in used_ids:
            i += 1
            slug = f"{base}-{i}"
        used_ids.add(slug)

        products.append({
            "id": slug,
            "title": title,
            "type": ptype,
            "city": city,
            "district": district,
            "price": price_str,
            "priceValue": price_value,
            "priceUnit": unit,
            "area": f"{fa(area)} متر",
            "areaValue": area,
            "rooms": f"{fa(rooms)} خواب",
            "roomsValue": rooms,
            "year": year_str,
            "yearValue": year_val,
            "badge": badge,
            "isFeatured": is_featured,
            "image": rng.choice(IMAGES),
            "summary": make_summary(ptype, district, city, area, rooms),
            "features": make_features(rng, ptype, city),
        })

    # keep a deterministic order: city, district, then price desc
    products.sort(key=lambda p: (p["city"], p["district"], -p["priceValue"]))
    return products


def main() -> None:
    products = build()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(products, ensure_ascii=False, indent=2), encoding="utf-8")
    tehran = sum(1 for p in products if p["city"] == "تهران")
    maz = len(products) - tehran
    print(f"wrote {len(products)} products -> {OUT.relative_to(ROOT)}")
    print(f"tehran={tehran}  mazandaran={maz}")
    print(f"price range: {min(p['priceValue'] for p in products):,} - {max(p['priceValue'] for p in products):,} Toman")


if __name__ == "__main__":
    main()
