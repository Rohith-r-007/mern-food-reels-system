import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import "../../styles/profile.css";
import axios from "axios";


const Profile = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        axios.get(`/api/food-partner/${id}`, { withCredentials: true })
        .then((response) => {
            setProfile(response.data.foodPartner);
            setVideos(response.data.foodPartner.foodItems);
        })
        .catch((err) => {
            console.error('Profile fetch error', err.response || err.message);
        });
    }, [id])
    return (
        <div className="profile-page">
            <div className="partner-card">
                <div className="card-top">
                    <div aria-hidden="true" >
                        <img className="avatar" src="https://images.unsplash.com/photo-1778301981932-3a047a01eacd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MXx8fGVufDB8fHx8fA%3D%3D"/>
                    </div>
                    <div className="info">
                        <div className="business-name">Business Name: {profile?.name}</div>
                        <div className="address">Address: {profile?.address}</div>
                    </div>
                </div>

                <div className="stats">
                    <div className="stat">
                        <div className="label">total meals</div>
                        <div className="value">{profile?.totalMeals}</div>
                    </div>
                    <div className="stat">
                        <div className="label">customer served</div>
                        <div className="value">{profile?.customerServe}</div>
                    </div>
                </div>

                <div className="divider" />

                <div className="videos-grid">
                    {videos.map((v) => (
                        <div className="video-tile" key={v._id}>
                            <video className="video-label"
                            style={{ objectFit: "cover", width: "100%", height: "100%" }} src={v.video} muted></video>
                        </div>
                    ))}
                </div>
            </div>

            {/* styles moved to src/styles/profile.css */}
        </div>
    );
};

export default Profile;