# Royal Parfume

Ətir mağazası üçün statik sayt — HTML, CSS, Bootstrap 5 və modul əsaslı vanilla JavaScript.

## İşə salmaq

JavaScript ES modulları ilə yazıldığı üçün sayt **server üzərindən** açılmalıdır
(faylı birbaşa iki dəfə klikləyib açanda `file://` modulları bloklayır):

- VS Code → **Live Server** → `index.html` üzərində *Open with Live Server*, və ya
- `npx serve .`

## Qovluq strukturu

```
├── index.html            Ana səhifə
├── about.html            Haqqımızda
├── blog.html             Bloq
├── categories.html       Kateqoriyalar (filtr + axtarış)
├── product.html          Məhsul detalı (product.html?id=…)
└── assets/
    ├── data/
    │   └── products.json   Bütün məhsullar, kateqoriyalar, brendlər
    ├── css/
    │   ├── base.css        Rəng/şrift dəyişənləri, düymələr, ümumi köməkçilər
    │   ├── layout.css      Header, menyu, səhifə başlığı, footer
    │   ├── components.css  Məhsul kartı, səbət paneli, filtr, toast
    │   └── pages.css       Yalnız bir səhifəyə aid bölmələr
    ├── js/
    │   ├── layout.js       Hər səhifədə ortaq olanları qurur
    │   ├── data/           products.js — JSON-u yükləyir və hamıya paylaşır
    │   ├── core/           cart.js (localStorage ilə səbət), utils.js
    │   ├── components/     header, footer, cart-drawer, product-card, toast
    │   ├── effects/        reveal, typewriter, counter
    │   └── pages/          Hər HTML səhifənin öz giriş faylı
    └── img/
        ├── brand/ hero/ banners/ about/ blog/
        └── products/       Məhsul şəkilləri (adı məhsulun adı ilə)
```

## Necə edilir?

- **Yeni məhsul əlavə etmək:** şəkli `assets/img/products/` qovluğuna qoyun və
  `assets/data/products.json` faylındakı `products` siyahısına yeni obyekt əlavə edin
  (`id`, `name`, `price`, `volume`, `category`, `image`, `description`, `notes`).
  Hər məhsulun öz səhifəsi avtomatik olur: `product.html?id=1`.
- **Menyu linkini dəyişmək:** `assets/js/components/header.js` → `NAV_LINKS`.
- **Rəngləri dəyişmək:** `assets/css/base.css` → `:root` dəyişənləri.
- **Kateqoriyaya birbaşa link:** `categories.html?category=women`, axtarış üçün `categories.html?q=dior`.
