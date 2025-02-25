import React, { useEffect, useState } from 'react';
    import dynamic from 'next/dynamic';
    import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

    const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
    const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
    const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });

    const RobotDashboard = () => {
      const [robotData, setRobotData] = useState(null);

      useEffect(() => {
        fetch('/api/robot-data')
          .then((res) => res.json())
          .then((data) => setRobotData(data));
      }, []);

      if (!robotData) return <p>Loading...</p>;

      return (
        <div>
          <h2>Robot Konumu</h2>
          <MapContainer center={[robotData.location.lat, robotData.location.lng]} zoom={15} style={{ height: '300px', width: '100%' }}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <Marker position={[robotData.location.lat, robotData.location.lng]} />
          </MapContainer>
          <h2>Lazer Müdahale Sayısı</h2>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={robotData.laserHits}>
              <XAxis dataKey='time' />
              <YAxis />
              <Tooltip />
              <Line type='monotone' dataKey='hits' stroke='#f00' strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    };

    export default RobotDashboard;