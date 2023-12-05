import React, { useEffect } from 'react'

/**
 * @typedef {InfiniteScrollProps}
 * @description Describes props for InfiniteScroll component
 * @property {boolean} loading - Loading state. Used for showing loading indicator
 * @property {() => void} onNextPage - Callback fires when user scrolls down to the end of the list
 * @property {React.ReactNode[]} children - Children to render
 * @property {IntersectionObserverInit} observerOptions - Options for IntersectionObserver. See [documentation](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)
 */
export interface InfiniteScrollProps {
  loading: boolean
  onNextPage: () => void
  children: React.ReactNode[]
  observerOptions?: IntersectionObserverInit
}

/**
 * @type {IntersectionObserverInit}
 * @description Default options for IntersectionObserver. Used to determine when to load next page
 * @property {Element | null} root - The element that is used as the viewport for checking visibility of the target.
 * @property {string} rootMargin - Margin around the root. Values are similar to CSS property margin.
 * @property {number | number[]} threshold - Either a single number or an array of numbers which indicate at what
 * percentage of the target's visibility the observer's callback should be executed.
 */
const defaultObserverOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
}

/**
 * @description InfiniteScroll component. Renders children and invokes the callback when
 * user scrolls down to the end of the list to load next page
 * @param {InfiniteScrollProps} props
 * @returns {React.FC}
 */
export const InfiniteScroll: React.FC<InfiniteScrollProps> = (props) => {
  const { loading, children, onNextPage } = props

  /**
   * @type {IntersectionObserverInit}
   * @description Options for IntersectionObserver.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
   */
  const observerOptions = { ...defaultObserverOptions, ...props.observerOptions }

  /**
   * @type {React.MutableRefObject<HTMLDivElement>}
   * @description Ref for loader container. The latest element in the list.
   * When user scrolls down to this element, next page should be loaded
   */
  const loaderContainerRef = React.useRef<HTMLDivElement>(null)

  /**
   * @type {IntersectionObserverCallback}
   * @description Callback for IntersectionObserver. When user scrolls down to the loader container,
   * next page should be loaded, so we call onNextPage callback
   */
  const intersectionCallback = React.useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && !loading) {
      onNextPage()
    }
  }, [onNextPage])

  /**
   * @description Effect for IntersectionObserver. Creates IntersectionObserver instance
   * and observes loader container
   */
  useEffect(() => {
    /**
     * @type {IntersectionObserver}
     * @description IntersectionObserver instance. Used to determine when to load next page
     */
    const observer = new IntersectionObserver(intersectionCallback, observerOptions)

    /**
     * @description If there are no children, we don't need to observe anything as there is nothing to load
     */
    if (children.length > 0) {
      observer.observe(loaderContainerRef.current as Element)
    }

    /**
     * @description Cleanup function. Cancels IntersectionObserver subscription
     */
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
