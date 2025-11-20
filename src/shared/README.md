# Shared Resources for QuizAcademy

This folder contains shared TypeScript types and utilities used by both `academyStudio` and `academyStudy` apps.

## 📁 Structure

```
shared/
├── types/
│   ├── quiz.types.ts      # JSONB quiz content interfaces
│   └── app.types.ts       # Application models & enums
├── lib/
│   └── supabase.config.ts # Supabase client & helpers (THIS IS YOUR BACKEND API)
├── utils/
│   ├── spacedRepetition.ts # 1d/7d/30d interval logic
│   └── gamification.ts     # XP/level/badge calculations
└── examples/
    └── USAGE_EXAMPLES.md   # How to use Supabase in Vue components
```

## 🚀 Usage in Apps

Both `academyStudio` and `academyStudy` should copy files from this folder:

### Method 1: Copy files (Simple)
```bash
# Copy to academyStudio
cp -r shared/* academyStudio/src/

# Copy to academyStudy  
cp -r shared/* academyStudy/src/
```

### Method 2: Symlinks (Advanced)
```bash
# Windows (requires admin)
mklink /D academyStudio\src\shared ..\shared
mklink /D academyStudy\src\shared ..\shared
```

## 🔑 Key Concept: Supabase IS Your Backend

**You don't need to generate a backend API!**

The `supabase.config.ts` file provides the Supabase client, which acts as your complete backend:
- ✅ Database queries (SELECT, INSERT, UPDATE, DELETE)
- ✅ Authentication (sign in, sign up, Google OAuth)
- ✅ File storage (upload images, avatars)
- ✅ Real-time subscriptions
- ✅ Row-Level Security (automatic permission checks)

## 📖 Learn More

See `examples/USAGE_EXAMPLES.md` for detailed code examples showing:
- How to fetch data from Supabase
- How to create/update records
- How to handle authentication
- How to upload files
- How to use real-time subscriptions
