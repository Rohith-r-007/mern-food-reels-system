import React, { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// Reusable feed for vertical reels
// Props:
// - items: Array of video items { _id, video, description, likeCount, savesCount, commentsCount, comments, foodPartner }
// - onLike: (item) => void | Promise<void>
// - onSave: (item) => void | Promise<void>
// - emptyMessage: string
const ReelFeed = ({ items = [], onLike, onSave, emptyMessage = 'No videos yet.' }) => {
  const videoRefs = useRef(new Map())
  const navigate = useNavigate()
  const location = useLocation()
  const activeTab = location.pathname === '/saved' ? 'saved' : 'home'
  const activeReels = useRef(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return

          const id = video.dataset.reelId

          // When a reel becomes the focused item (first time crossing threshold),
          // mark it active and restart+play. When it leaves below threshold,
          // remove active flag and pause+reset. This avoids multiple resets
          // from multiple intersection changes while still visible.
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            if (!activeReels.current.has(id)) {
              activeReels.current.add(id)
              try { video.currentTime = 0 } catch (e) {}
              video.play().catch(() => { /* ignore autoplay errors */ })
            }
          } else {
            if (activeReels.current.has(id)) {
              activeReels.current.delete(id)
              try { video.pause() } catch (e) {}
              try { video.currentTime = 0 } catch (e) {}
            }
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    )

    // Observe all current video elements
    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [items])

  const setVideoRef = (id) => (el) => {
    if (!el) { videoRefs.current.delete(id); return }
    // store the id on the element for observer callbacks
    el.dataset.reelId = id
    videoRefs.current.set(id, el)
  }

  return (
    <div className="reels-page">
      <div className="reels-feed" role="list">
        {items.length === 0 && (
          <div className="empty-state">
            <p>{emptyMessage}</p>
          </div>
        )}

        {items.map((item) => {
          const isLiked = Boolean(item.isLiked ?? item.liked)
          const isSaved = Boolean(item.isSaved ?? item.saved ?? item.isBookmarked)

          return (
            <section key={item._id} className="reel" role="listitem">
            <video
              ref={setVideoRef(item._id)}
              className="reel-video"
              src={item.video}
              muted
              playsInline
              loop
              preload="metadata"
            />

            <div className="reel-overlay">
              <div className="reel-overlay-gradient" aria-hidden="true" />
              <div className="reel-actions">
                <div className="reel-action-group">
                  <button
                    onClick={onLike ? () => onLike(item) : undefined}
                    className={`reel-action ${isLiked ? 'is-liked' : ''}`}
                    aria-label="Like"
                    type="button"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill={isLiked ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                    </svg>
                  </button>
                  <div className="reel-action__count">
                    {item.likeCount ?? item.likesCount ?? item.likes ?? 0}
                  </div>
                </div>

                <div className="reel-action-group">
                  <button
                    className={`reel-action ${isSaved ? 'is-saved' : ''}`}
                    onClick={onSave ? () => onSave(item) : undefined}
                    aria-label="Bookmark"
                    type="button"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill={isSaved ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                    </svg>
                  </button>
                  <div className="reel-action__count">
                    {item.saveCount ?? item.savesCount ?? item.bookmarks ?? item.saves ?? 0}
                  </div>
                </div>

                <div className="reel-action-group">
                  <button className="reel-action" aria-label="Comments" type="button">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="reel-content">
                <p className="reel-description" title={item.description}>{item.description}</p>
                {item.foodPartner && (
                  <button
                    type="button"
                    className="reel-btn"
                    aria-label="Visit store"
                    onClick={() => navigate(`/food-partner/${item.foodPartner}`)}
                  >
                    Visit store
                  </button>
                )}
              </div>
            </div>
          </section>
          )
        })}
      </div>

      <nav className="bottom-nav" aria-label="Bottom navigation">
        <button
          type="button"
          className={`bottom-nav__item ${activeTab === 'home' ? 'is-active' : ''}`}
          aria-label="Home videos"
          onClick={() => navigate('/home')}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 11.5 12 4l9 7.5" />
            <path d="M5 10.8V20h14v-9.2" />
          </svg>
          <span>Home</span>
        </button>

        <button
          type="button"
          className={`bottom-nav__item ${activeTab === 'saved' ? 'is-active' : ''}`}
          aria-label="Saved videos"
          onClick={() => navigate('/saved')}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
          </svg>
          <span>Saved</span>
        </button>
      </nav>
    </div>
  )
}

export default ReelFeed
