'use client';

import { useAuth } from "@/context/AuthContext";
import { getUserBooks } from "@/lib/api/books";
import { useEffect, useState } from "react";

import { type User } from "@supabase/supabase-js";
import type { Book } from "@/lib/api/books";

type TestCategory = "books" | "chapters" | "versions";

export default function TestPage() {
  const [activeCategory, setActiveCategory] = useState<TestCategory>("books");

  const categories = [
    { id: "books" as TestCategory, label: "Books" },
    { id: "chapters" as TestCategory, label: "Chapters" },
    { id: "versions" as TestCategory, label: "Versions" },
  ];

  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-white-light">
      {/* Header */}
      <header className="bg-white-base border-b-2 border-outline-light sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-secondary-dark">
            API Testing Lab
          </h1>
          <p className="text-sm text-secondary-dark/70 mt-1">
            Test and preview all api utilities
          </p>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white-base border-r-2 border-outline-light min-h-screen sticky top-[73px] self-start">
          <nav className="p-4">
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-md transition-colors ${
                      activeCategory === category.id
                        ? "bg-primary-base text-white-base font-medium"
                        : "text-secondary-dark hover:bg-neutral-light"
                    }`}
                  >
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <BookTests user={user}/>
        </main>
      </div>
    </div>
  );
}

// Utility Tests Component (Placeholder for future)
function BookTests({user}: {user: User | null}) {

    const [loading, setLoading] = useState(true)
    const [books, setBooks] = useState<Book[]>([] as Book[])

    useEffect(() => {
        async function loadData() {
            if (!user) return

            try {
                const booksData:Book[] = await getUserBooks(user.id)
                setBooks(booksData)
            } catch (error) {
                console.log('Error loading books data: ', error)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [user])

    return (
        <div className="space-y-12">
        <TestSection title="Coming Soon">
            <div className="bg-neutral-light p-8 rounded-lg text-center">
            <p className="text-secondary-dark text-lg mb-4">
                Utility functions will be tested here
            </p>
            <div className="space-y-2 text-secondary-dark/70">
                <p>• Date formatting</p>
                <p>• String manipulation</p>
                <p>• Validation helpers</p>
                <p>• API utilities</p>
                <p>• Form helpers</p>
            </div>
            </div>
        </TestSection>
        <TestSection title="Book API">
            <div className="space-y-6">
            <SubSection title="Get User Books">
                {books.map((book, idx) => (
                    <p key={book.id}>{JSON.stringify(book)}</p>
                ))}
            </SubSection>
            </div>
        </TestSection>
        </div>
    );
}

// Reusable Section Components
function TestSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white-base rounded-lg p-6 border-2 border-outline-light">
      <h2 className="text-xl font-semibold text-secondary-dark mb-6 pb-3 border-b-2 border-outline-light">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-secondary-dark/80 mb-3 uppercase tracking-wide">
        {title}
      </h3>
      {children}
    </div>
  );
}
