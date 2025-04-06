// filepath: /home/cob23125a1/work/hakkason/camp2025_vol2/app/web/vite-project/src/App.jsx
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  const [geoData, setGeoData] = useState(null);

  //選択された都道府県名
  const [selectedPref, setSelectPref] = useState(null);
  const [ranking, setRanking] = useState([]);

  // 任意の都道府県名を受け取って、5件のランダムランキングを返す
  const getMockRanking = () => {
    const musicData = [
      { artist: "YOASOBI", song: "夜に駆ける", cover: "cover1.jpg" },
      { artist: "米津玄師", song: "Lemon", cover: "cover2.jpg" },
      { artist: "Aimer", song: "残響散歌", cover: "cover3.jpg" },
      { artist: "Official髭男dism", song: "Pretender", cover: "cover4.jpg" },
      { artist: "King Gnu", song: "白日", cover: "cover5.jpg" },
      { artist: "Mrs. GREEN APPLE", song: "ダンスホール", cover: "cover6.jpg" },
    ];

    //配列をシャッフル
    const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

    //セットをシャッフルして5件選び、ランク付け
    return shuffle(musicData).slice(0, 5).map((item, index) => ({
      rank: index + 1,
      ...item,
    }));

  }

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
    {selectedPref && (
    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
      <h2>{selectedPref} の音楽ランキング</h2>
      <ul style={{ marginTop: '1rem', textAlign: 'center' }}>
        {ranking.map((item) => (
          <li
            key={item.rank}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '1rem 0',
            }}
            >
            <span style={{ marginRight: '1rem' }}>{item.rank}位</span>
            <img
              src={item.cover}
              alt="cover"
              style={{ width: 50, height: 50, marginRight: '1rem' }}
            />
            <div>
              <div>{item.song}</div>
              <div style={{ fontSize: '0.8rem', color: '#555' }}>
                  {item.artist}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    )}
    </div>
  );
}

export default App;
