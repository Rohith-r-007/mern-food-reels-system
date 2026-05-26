import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
	const [videos, setVideos] = useState([])

	useEffect(() => {
		axios.get('http://localhost:3000/api/food', { withCredentials: true })
			.then((response) => {
				setVideos(response.data.foodItems || [])
			})
			.catch(() => { /* noop */ })
	}, [])

	async function likeVideo(item) {
		try {
			const response = await axios.post('http://localhost:3000/api/food/like', { foodId: item._id }, { withCredentials: true })
			if (response.data.like) {
				setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) + 1 } : v))
			} else {
				setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: Math.max(0, (v.likeCount || 1) - 1) } : v))
			}
		} catch (e) {
			// ignore
		}
	}

	async function saveVideo(item) {
		try {
			const response = await axios.post('http://localhost:3000/api/food/save', { foodId: item._id }, { withCredentials: true })
			if (response.data.save) {
				setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: (v.savesCount || 0) + 1 } : v))
			} else {
				setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max(0, (v.savesCount || 1) - 1) } : v))
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
			emptyMessage="No videos available."
		/>
	)
}

export default Home

