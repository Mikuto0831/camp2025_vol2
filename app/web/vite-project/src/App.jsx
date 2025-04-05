import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  const [geoData, setGeoData] = useState(null);
  const [map, setMap] = useState(null);
  const [currentData, setCurrentData] = useState("municipality"); // デフォルトは市区町村データ

  useEffect(() => {
    // 地図を初期化
    const initializedMap = L.map("map").setView([35.6895, 139.6917], 5); // 日本を中心に設定
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(initializedMap);
    setMap(initializedMap);

    return () => {
      initializedMap.remove();
    };
  }, []);

  useEffect(() => {
    // GeoJSONデータを取得
    const dataPath =
      currentData === "municipality"
        ? "/N03-21_210101.json"
        : currentData === "prefecture"
        ? "/prefectures.geojson"
        : "/yubinbango.geojson";

    fetch(dataPath)
      .then((response) => response.json())
      .then((data) => {
        setGeoData(data);
      })
      .catch((error) => console.error("GeoJSONの読み込みエラー:", error));
  }, [currentData]);

  useEffect(() => {
    if (geoData && map) {
      // 既存のレイヤーを削除
      map.eachLayer((layer) => {
        if (layer instanceof L.GeoJSON) {
          map.removeLayer(layer);
        }
      });

      // GeoJSONレイヤーを追加
      L.geoJSON(geoData, {
        style: {
          color: "#3388ff",
          weight: 1,
          opacity: 0.8,
          fillOpacity: 0.4,
        },
        onEachFeature: (feature, layer) => {
          const name =
            currentData === "municipality"
              ? feature.properties.N03_004 || "不明"
              : currentData === "prefecture"
              ? feature.properties.name || "不明"
              : feature.properties.shichoson || "不明";
          layer.on("click", () => {
            alert(`名前: ${name}`);
          });
        },
      }).addTo(map);
    }
  }, [geoData, map, currentData]);

  return (
    <div>
      <h1>日本地図</h1>
      <div>
        <div>
          <input
            type="radio"
            id="municipality"
            name="dataType"
            value="municipality"
            checked={currentData === "municipality"}
            onChange={() => setCurrentData("municipality")}
          />
          <label htmlFor="municipality">市区町村データ</label>
        </div>
        <div>
          <input
            type="radio"
            id="prefecture"
            name="dataType"
            value="prefecture"
            checked={currentData === "prefecture"}
            onChange={() => setCurrentData("prefecture")}
          />
          <label htmlFor="prefecture">都道府県データ</label>
        </div>
        <div>
          <input
            type="radio"
            id="postal"
            name="dataType"
            value="postal"
            checked={currentData === "postal"}
            onChange={() => setCurrentData("postal")}
          />
          <label htmlFor="postal">郵便番号データ</label>
        </div>
      </div>
      <div id="map" style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
}

export default App;