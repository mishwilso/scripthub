# ScriptHub

A writing application with Git-style version control for authors. Organize your stories, track changes, and explore alternate narratives—all in one place.

## About

ScriptHub helps writers manage their creative projects with features inspired by version control systems. Branch your narrative to explore alternate endings, commit changes to chapters, and keep all your drafts organized without the "final_draft_v3_ACTUAL_final.docx" hellscape.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Icons:** React Icons

## Features (In Development)

- [ ] User authentication (signup, login, email verification)
- [ ] Book/project management
- [ ] Chapter organization
- [ ] Version control for chapters
- [ ] Branch narratives (alternate storylines)
- [ ] World building notes
- [ ] Collaborator support

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/scripthub.git
cd scripthub
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                 # Reusable UI components
│   └── layout/             # Layout components
├── context/                # React context providers
├── lib/                    # Utilities and configurations
└── assets/                 # Images and vectors
```

## Dev Log

Follow the development journey on [Hashnode](https://code-n-quill.hashnode.dev/?source=top_nav_blog_home).

## License

This project is for portfolio/educational purposes.

## Author

**M** - CS Graduate & Web Developer

---

_Built with ☕ and a love for storytelling_
