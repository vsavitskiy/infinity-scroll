import React, { useEffect } from 'react'

interface InfiniteScrollProps {
  loading: boolean
  onNextPage: () => void
  children: React.ReactNode[]
  observerOptions?: IntersectionObserverInit
}

const defaultObserverOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = (props) => {
  const { loading, children, onNextPage } = props
  const observerOptions = { ...defaultObserverOptions, ...props.observerOptions }
  const loaderContainerRef = React.useRef<HTMLDivElement>(null)

  const intersectionCallback = React.useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && !loading) {
      onNextPage()
    }
  }, [onNextPage])

  useEffect(() => {
    const observer = new IntersectionObserver(intersectionCallback, observerOptions)

    if (children.length > 0) {
      observer.observe(loaderContainerRef.current as Element)
    }

    return () => {
      observer.unobserve(loaderContainerRef.current as Element)
    }
  }, [loaderContainerRef, children, observerOptions, intersectionCallback])

  return (
    <div className="flex flex-col items-center">
      {children}
      <div ref={loaderContainerRef}>
        {loading ? <div className="text-center">Loading...</div> : null}
      </div>
    </div>
  )
}
