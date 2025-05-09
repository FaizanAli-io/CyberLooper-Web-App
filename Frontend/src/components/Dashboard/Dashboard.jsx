import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const DashboardPage = () => {
    const isLoggedIn = !!localStorage.getItem("user_token");
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [showPlanStatus, setShowPlanStatus] = useState(true);

    // Sample data for charts
    const monthlyData = [
        { name: 'Jan', growth: 65 },
        { name: 'Feb', growth: 59 },
        { name: 'Mar', growth: 80 },
        { name: 'Apr', growth: 81 },
        { name: 'May', growth: 56 },
        { name: 'Jun', growth: 55 },
        { name: 'Jul', growth: 40 },
        { name: 'Aug', growth: 70 },
        { name: 'Sep', growth: 90 }
    ];

    const dailyActivityData = [
        { name: 'Mon', value: 20 },
        { name: 'Tue', value: 35 },
        { name: 'Wed', value: 25 },
        { name: 'Thu', value: 45 },
        { name: 'Fri', value: 30 },
        { name: 'Sat', value: 15 },
        { name: 'Sun', value: 10 }
    ];

    return (

        <>
            <div className="dashboard-main">
                {/* Header */}
                <div className="home-logo-container">
                    <img src={logo} alt="Cyberlooper Logo" className="home-logo" />
                </div>
                {isLoggedIn ? (
                    <p className="home-login-btn">
                        {/* Logged in UI elements could go here */}
                    </p>
                ) : (
                    <>
                        <button className="home-login-btn" onClick={() => navigate("/login")}>
                            Log in
                        </button>
                        <div className="home-try-button" onClick={() => navigate("/signup")}>
                            <span className="try-text">Try it free</span>
                            <i className="pi pi-arrow-up-right icon-arrow"></i>
                        </div>
                    </>
                )}
                {/* Welcome Banner */}
                <div className="dashboard-welcome-banner">
                    <div className="dashboard-welcome-text">

                        Welcome to Cyberlooper.AI!
                    </div>
                </div>

                {/* Plan Status */}


                {/* Dashboard Content */}

                <div className="dashboard-second-background">
                    <div className="dashboard-content">
                        {/* Main Dashboard Area */}
                        <div className="dashboard-main-area">
                            {showPlanStatus && (
                                <div className="dashboard-plan-status">
                                    <div className="dashboard-plan-icon">
                                        <i className="dashboard-energy-icon"></i>
                                    </div>
                                    <p className="dashboard-plan-text">
                                        You are currently on a free plan. Enjoy it free!
                                    </p>
                                    <button className="dashboard-plan-close" onClick={() => setShowPlanStatus(false)}>✕</button>
                                </div>
                            )}
                            {/* Stats Cards Row */}
                            <div className="dashboard-stats-row">
                                <div className="dashboard-stat-card">
                                    <div className="dashboard-stat-header">
                                        <h3 className="dashboard-stat-title">AI Responses</h3>
                                        <div className="dashboard-stat-icon order-icon"></div>
                                    </div>
                                    <p className="dashboard-stat-value">10293</p>
                                    <p className="dashboard-stat-change positive">
                                        <span className="dashboard-trend-icon up"></span>
                                        1.3% Up from past week
                                    </p>
                                </div>
                                <div className="dashboard-stat-card">
                                    <div className="dashboard-stat-header">
                                        <h3 className="dashboard-stat-title">Active Conversation</h3>
                                        <div className="dashboard-stat-icon sales-icon"></div>
                                    </div>
                                    <p className="dashboard-stat-value">20</p>
                                    <p className="dashboard-stat-change negative">
                                        <span className="dashboard-trend-icon down"></span>
                                        4.3% Down from yesterday
                                    </p>
                                </div>

                                <div className="dashboard-stat-card">
                                    <div className="dashboard-stat-header">
                                        <h3 className="dashboard-stat-title">Avg. Response Time</h3>
                                        <div className="dashboard-stat-icon pending-icon"></div>
                                    </div>
                                    <p className="dashboard-stat-value">2040</p>
                                    <p className="dashboard-stat-change positive">
                                        <span className="dashboard-trend-icon up"></span>
                                        1.8% Up from yesterday
                                    </p>
                                </div>
                            </div>

                            {/* Charts Row */}
                            <div className="dashboard-charts-row">
                                <div className="dashboard-chart-container">
                                    <h3 className="dashboard-chart-title">Monthly Growth</h3>
                                    <div className="dashboard-chart">
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                                <XAxis dataKey="name" stroke="#8F8D8D" />
                                                <YAxis stroke="#8F8D8D" />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#030B0C', border: '1px solid #444' }}
                                                    labelStyle={{ color: '#fff' }}
                                                />
                                                <Bar
                                                    dataKey="growth"
                                                    fill="#131b1d99"
                                                    barSize={40}
                                                    radius={[5, 5, 0, 0]}
                                                    stroke="#FFFFFF"
                                                    strokeWidth={0.2}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    );
};

export default DashboardPage;