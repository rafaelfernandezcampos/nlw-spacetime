export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="w-[360px] text-center leading-relaxed">
        You haven&apos;t registered any memories yet, start{' '}
        <a href="/memories/new" className="underline hover:text-gray-50">
          creating now
        </a>
        !
      </p>
    </div>
  )
}
