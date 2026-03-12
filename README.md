# 📚 Λεξιλόγειον v5.0

> **Συνεργατικό Wiki Λεξικό Τάξης** — Δεύτερη γέννηση με Next.js + Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/lexilogeion)

---

## 🆕 Τι νέο στο v5

| # | Χαρακτηριστικό | Περιγραφή |
|---|---|---|
| 1 | 🔴 Firebase Connection Dot | Live ένδειξη σύνδεσης στο navbar |
| 2 | 📡 Offline Banner | Αυτόματο banner όταν χαθεί σύνδεση |
| 3 | 🔊 Text-to-Speech | Ανάγνωση ορισμών φωναχτά (el-GR) |
| 4 | 🎙️ Voice Search | Φωνητική αναζήτηση (Web Speech API) |
| 5 | 📝 Auto-save Drafts | Αυτόματη αποθήκευση πρόχειρου λήμματος |
| 6 | 📋 Copy to Clipboard | Κουμπί αντιγραφής σε ορισμούς/συνώνυμα |
| 7 | 📲 QR Code Sharing | Κοινοποίηση λήμματος με QR code |
| 8 | ⚠️ Duplicate Detection | Προειδοποίηση αν λήμμα υπάρχει ήδη |
| 9 | 🟢 Difficulty Badge | Δείκτης δυσκολίας λήμματος (αυτόματος) |
| 10 | 🔥 Daily Streak | Ημερήσιο streak εισόδου |
| 11 | ⌨️ Keyboard Shortcuts | ? = help, / = search, N = νέο λήμμα |
| 12 | 💀 Skeleton Loading | Placeholder animations κατά φόρτωση |
| 13 | 👨‍🏫 Teacher Annotations | Inline σχόλια εκπαιδευτικού ανά λήμμα |
| 14 | 🖨️ Print Study Sheet | Εκτύπωση φύλλου μελέτης ανά θεματική |
| 15 | 🏷️ Bulk Tag Operations | Μαζική μετονομασία tag σε όλα τα λήμματα |
| 16 | 🛡️ Global Error Handler | Ενημερωτικά μηνύματα σφαλμάτων |
| 17 | 🔐 Security Headers | CSP, X-Frame-Options, κλπ. μέσω Next.js |

### 🐛 Bug Fixes

- **Firebase config** μετακινήθηκε σε env vars (δεν εκτίθεται πλέον hardcoded)
- **Profanity filter** διορθώθηκε για ελληνικούς τόνους (ά, έ, ή, ί, ό, ύ, ώ)
- **validateEntryInput** — μέτρηση plain text, όχι HTML για το πεδίο σημασίες
- **sanitizeHTML** — μπλοκ `javascript:` και `data:` URLs σε href
- **SM-2 algorithm** — σωστή υλοποίηση του EF (Easiness Factor)
- **formatDate(0)** — δεν εμφανίζεται πλέον η ημερομηνία epoch
- **showToast** — κουμπί X, max 5 ταυτόχρονα, pause on hover
- **loadWordOfDay** — ντετερμινιστική επιλογή βάσει ημερομηνίας
- **Service Worker** — σωστό path (`/sw.js`), network-first strategy, versioning
- **CSS duplicate** `.unread-card` αφαιρέθηκε

---

## 🚀 Deployment στο Vercel

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/lexilogeion.git
cd lexilogeion
npm install
```

### 2. Environment Variables

```bash
cp .env.local.example .env.local
# Επεξεργαστείτε το .env.local με τις Firebase τιμές σας
```

### 3. Τοπική εκτέλεση

```bash
npm run dev
# → http://localhost:3000
```

### 4. Deploy στο Vercel

```bash
# Εγκατάσταση Vercel CLI
npm i -g vercel

# First deploy
vercel

# Production deploy
vercel --prod
```

**Ή:** Συνδέστε το GitHub repo στο [vercel.com](https://vercel.com) και κάντε αυτόματο deploy.

### 5. Environment Variables στο Vercel

Πηγαίνετε: **Settings → Environment Variables** και προσθέστε όλες τις `NEXT_PUBLIC_FIREBASE_*` μεταβλητές.

---

## 🔥 Firebase Setup

### Realtime Database Rules

Αντιγράψτε το περιεχόμενο του `FIREBASE_RULES.json` στο **Firebase Console → Realtime Database → Rules**.

### Authentication

Ενεργοποιήστε **Email/Password** στο **Firebase Console → Authentication → Sign-in method**.

### Storage Rules (αν χρησιμοποιείτε αρχεία)

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

---

## 📁 Δομή Project

```
lexilogeion/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← CI/CD με GitHub Actions
├── public/
│   ├── app-v5.js               ← Κύρια εφαρμογή (fixed + enhanced)
│   ├── sw.js                   ← Service Worker (PWA)
│   ├── manifest.json           ← PWA manifest
│   └── icons/                  ← App icons (προσθέστε εδώ)
├── src/
│   └── app/
│       ├── layout.tsx          ← Κεφαλίδα + scripts + Firebase config injection
│       ├── page.tsx            ← SPA shell (navbar + app-container)
│       └── globals.css         ← Όλα τα styles
├── .env.local.example          ← Template για env vars
├── .gitignore
├── FIREBASE_RULES.json         ← Firebase security rules
├── next.config.js              ← Security headers, Next.js config
├── package.json
├── README.md
├── tsconfig.json
└── vercel.json
```

---

## ⌨️ Συντομεύσεις Πληκτρολογίου

| Πλήκτρο | Ενέργεια |
|---------|---------|
| `?` | Εμφάνιση βοήθειας συντομεύσεων |
| `/` | Εστίαση στην αναζήτηση |
| `N` | Νέο λήμμα |
| `1` | Λήμματα |
| `2` | Μελέτη |
| `3` | Gamification |
| `Ctrl+D` | Dark mode toggle |
| `Esc` | Κλείσιμο modal |

---

## 🛡️ Ασφάλεια

- API keys σε **environment variables** (ποτέ στον κώδικα)
- **Firebase Rules** ελέγχουν πρόσβαση ανά ρόλο (teacher/student)
- **DOMPurify** για XSS protection σε όλα τα HTML fields
- **CSP headers** μέσω Next.js
- **Rate limiting** client-side για anti-spam

---

## 📜 Άδεια

MIT License — Ελεύθερη χρήση για εκπαιδευτικούς σκοπούς.
