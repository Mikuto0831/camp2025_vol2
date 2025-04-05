// filepath: /home/cob23125a1/work/hakkason/camp2025_vol2/app/web/vite-project/src/App.jsx
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    // GeoJSONデータを取得
    fetch("/N03-21_210101.json") // GeoJSONファイルのパスを指定
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error("GeoJSONの読み込みエラー:", error));
  }, []);

  useEffect(() => {
    if (geoData) {
      // 地図を初期化
      const map = L.map("map").setView([35.6895, 139.6917], 5); // 日本を中心に設定

      // タイルレイヤーを追加
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // GeoJSONレイヤーを追加
      L.geoJSON(geoData, {
        style: {
          color: "#3388ff",
          weight: 1,
          opacity: 0.8,
          fillOpacity: 0.4,
        },
        onEachFeature: (feature, layer) => {
          // 各市区町村をクリックしたときに名前を表示
          const cityName = feature.properties.N03_004 || "不明";
          layer.on("click", () => {
            alert(`市区町村: ${cityName}`);
          });
        },
      }).addTo(map);

      // コンポーネントがアンマウントされたときに地図をクリーンアップ
      return () => {
        map.remove();
      };
    }
  }, [geoData]);

  return (
    <div>
      <h1>日本地図</h1>
      <div id="map" style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
}

export default App;
