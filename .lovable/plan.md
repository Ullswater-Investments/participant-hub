

## Internationalization (i18n) - English and Spanish Bilingual Portal

Add full bilingual support (English/Spanish) across the entire portal: UI labels, document definitions, templates, guides, and all static content. Users can switch language with a toggle in the header.

---

### 1. Language Context and Toggle

Create a `LanguageContext` (`src/contexts/LanguageContext.tsx`) that:
- Stores the current language (`en` or `es`) in React context and `localStorage`
- Defaults to Spanish (`es`)
- Provides a `t()` helper function to retrieve translated strings
- Exposes a language toggle function

Add a language toggle button (EN/ES) in the `AppLayout.tsx` header bar, next to the sidebar trigger.

### 2. Translation Files

Create a translations directory with two files:

**`src/i18n/es.ts`** - All Spanish strings (current content)
**`src/i18n/en.ts`** - All English translations

These files will contain ALL UI text organized by section:
- `login` - Login page (password, access button, error messages)
- `sidebar` - Navigation labels (Dashboard, Participants, Consortium)
- `dashboard` - Summary cards, progress labels, status names
- `documents` - Status labels (Pending/Uploaded/Verified), upload buttons, notes
- `participant` - Folder page titles, tabs (Administrative/Technical)
- `common` - Common folder page
- `guides` - All guide content (titles, steps, links)
- `general` - Shared labels (close session, search, etc.)

### 3. Bilingual Document Definitions

Update `src/data/documentDefinitions.ts` to include both languages for each document:

```
{
  key: 'pic_number',
  name: { es: 'PIC Number y datos de registro', en: 'PIC Number and Registration Data' },
  description: { es: '...', en: '...' },
  guide: { es: '...', en: '...' },
  category: 'administrative',
}
```

Update the `DocumentDefinition` interface to use `{ en: string; es: string }` for `name`, `description`, and `guide` fields.

### 4. Bilingual Templates (pending feature)

When the Templates page is created, it will use the same bilingual pattern. The plan from the previous message already defines template content -- all that content will be provided in both languages.

### 5. Component Updates

Every component with hardcoded Spanish text will be updated to use the `t()` function:

| Component | Changes |
|-----------|---------|
| `Login.tsx` | Title, description, password label, placeholder, button, error |
| `AppSidebar.tsx` | Portal title, section labels, participant names, menu items, logout |
| `AppLayout.tsx` | Header subtitle, add language toggle |
| `Dashboard.tsx` | Page title, card labels, status text, section headers |
| `ParticipantFolder.tsx` | Title, tab labels, progress text |
| `CommonFolder.tsx` | Title, description |
| `Guides.tsx` | All guide titles, steps, link labels, useful links section |
| `DocumentChecklist.tsx` | Status labels, upload button, notes label, placeholder |
| `NotFound.tsx` | 404 text |

### 6. Guides Content in English

Full English translations for all 4 guides and useful links:
- "How to register and obtain your PIC"
- "How to download and manage mandates"
- "How to fill in the Lump Sum budget Excel"
- "General Erasmus+ checklist"

---

### Technical approach

- No external i18n library needed -- a simple React Context with typed translation objects keeps things lightweight
- The `t()` function takes a dot-notation key (e.g., `t('login.title')`) and returns the string for the current language
- Document definitions use inline bilingual objects so a helper `tDoc(def.name)` returns the right language
- Language preference persists in `localStorage`
- No database changes required

### Files to create
- `src/contexts/LanguageContext.tsx`
- `src/i18n/en.ts`
- `src/i18n/es.ts`

### Files to modify
- `src/data/documentDefinitions.ts` (bilingual fields)
- `src/App.tsx` (wrap with LanguageProvider)
- `src/components/AppLayout.tsx` (language toggle)
- `src/components/AppSidebar.tsx` (translated labels)
- `src/components/DocumentChecklist.tsx` (translated labels)
- `src/pages/Login.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/ParticipantFolder.tsx`
- `src/pages/CommonFolder.tsx`
- `src/pages/Guides.tsx`
- `src/pages/NotFound.tsx`

