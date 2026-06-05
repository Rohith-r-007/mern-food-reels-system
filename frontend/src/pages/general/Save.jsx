import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'
import api from '../../utils/api'

const isSavedItem = (item) => Boolean(item.isSaved ?? item.saved ?? item.isBookmarked)

const Save = () => {
	const [videos, setVideos] = useState([])

	useEffect(() => {
		api.get('/api/food/saved')
			.then((response) => {
				const items = response.data.foodItems || []
				setVideos(items.filter(isSavedItem))
			})
			.catch(() => { /* noop */ })
	}, [])

	async function likeVideo(item) {
		try {
			const response = await api.post('/api/food/like', { foodId: item._id })
			const { like, likeCount } = response.data || {}
			setVideos((prev) =>
				prev.map((v) =>
					v._id === item._id
						? { ...v, likeCount: typeof likeCount === 'number' ? likeCount : (v.likeCount || 0), isLiked: like }
						: v
				)
			)
		} catch (e) {
			// ignore
		}
	}

	async function saveVideo(item) {
		try {
			const response = await api.post('/api/food/save', { foodId: item._id })
			const { save, saveCount } = response.data || {}
			if (save) {
				setVideos((prev) =>
					prev.map((v) =>
						v._id === item._id
							? {
								...v,
								isSaved: true,
								saved: true,
								saveCount: typeof saveCount === 'number' ? saveCount : (v.saveCount || 0),
								savesCount: typeof saveCount === 'number' ? saveCount : (v.savesCount || 0)
							}
							: v
					)
				)
			} else {
				// removed from saved list
				setVideos((prev) => prev.filter((v) => v._id !== item._id))
			}
		} catch (e) {
			// ignore
		}
	}

	return (
		<ReelFeed
			items={videos}
			onLike={likeVideo}
			onSave={saveVideo}
			emptyMessage="No saved videos yet."
		/>
	)
}

export default Save
