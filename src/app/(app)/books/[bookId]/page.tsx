'use client'
 
import { useParams } from 'next/navigation'
import { getBookById } from '@/lib/api/books'
import { useEffect, useState } from 'react'
import { BookData } from '@/lib/api/books'
import { useRouter } from 'next/navigation'

export default function BookOverview() {
    const params = useParams<{ bookId: string }>()
    const [book, setBook] = useState<BookData>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(true)

    const router = useRouter();

  useEffect(() => {
    async function loadBook() {
      try {
        const bookData = await getBookById(params.bookId)
        setBook(bookData)
      } catch (error) {
        console.error('Error loading book:', error)
        setError(true)

        router.push('/books')

      } finally {
        setLoading(false)
      }
    }

    if (params.bookId) {
      loadBook()
    }
  }, [params.bookId])

  if (loading) return <div className="mt-6 flex flex-col w-full justify-center items-center">Loading...</div>
  if (error) {
    return (
    <div className="mt-6 flex flex-col w-full justify-center items-center">
        <h1 className='font-bold text-lg'>Book not found</h1>
        <p>Redirecting to My Works...</p>
    </div>
    )
  }

  return (
    <div className="mt-6 flex flex-col w-full">
      <h1>{book?.title}</h1>
      <p>Book ID: {params.bookId}</p>
    </div>
  )
}