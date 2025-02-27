import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Gauge from "../components/ui/gauge"; // HATA BURADAYDI! "@/.." yerine "../.." kullanıyoruz
import { Card, CardContent } from "../components/ui/card"; // HATA BURADAYDI! "@/.." yerine "../.." kullanıyoruz
import { BarChart, Bar } from "recharts";

const GrafanaStyleDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard-data") // API endpoint for fetching data
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold">Gerçek Zamanlı Araç Konumu</h2>
          <MapContainer center={[data.location.lat, data.location.lng]} zoom={15} className="h-64 w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[data.location.lat, data.location.lng]} />
          </MapContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold">Motor RPM</h2>
          <Gauge value={data.engine.rpm} max={3000} unit="RPM" />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold">Yakıt Tüketimi (L/h)</h2>
          <Gauge value={data.fuelConsumption} max={50} unit="L/h" />
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardContent>
          <h2 className="text-lg font-semibold">Motor Sıcaklığı</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.engineTemperature}>
              <XAxis dataKey="time" />
       
