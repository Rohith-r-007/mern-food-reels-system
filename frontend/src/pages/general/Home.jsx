import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'
import api from '../../utils/api'

const Home = () => {
	const [videos, setVideos] = useState([])

	useEffect(() => {
		api.get('/api/food')
			.then((response) => {
				setVideos(response.data.foodItems || [])
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
			setVideos((prev) =>
				prev.map((v) =>
					v._id === item._id
						? {
							...v,
							isSaved: save,
							saved: save,
							saveCount: typeof saveCount === 'number' ? saveCount : (v.saveCount || 0),
							savesCount: typeof saveCount === 'number' ? saveCount : (v.savesCount || 0)
						}
						: v
				)
			)
		} catch (e) {
			// ignore
		}
	}

	return (
		<ReelFeed
			items={videos}
			onLike={likeVideo}
			onSave={saveVideo}
			emptyMessage="No videos available."
		/>
	)
}

export default Home
