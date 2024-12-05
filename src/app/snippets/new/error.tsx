'use client'

interface ErrorPageProps {
  error: Error,
  reset: () => void
}

export default function errorPage({ error }: ErrorPageProps) {

  return (
    <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
      sorry something went wrong
    </div>
  )

}
