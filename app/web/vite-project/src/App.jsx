import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    // Fetch GeoJSON data
    fetch("/prefectures.geojson")
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  useEffect(() => {
    if (geoData) {
      // Initialize the map
      const map = L.map("map").setView([35.6895, 139.6917], 5); // Centered on Japan

      // Add a tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add GeoJSON layer with mouseover event
      L.geoJSON(geoData, {
        onEachFeature: (feature, layer) => {
          // Add a mouseover event to each feature
          layer.on("mouseover", () => {
            const prefectureName = feature.properties.name || "不明な県";
            layer.bindPopup(`ここは ${prefectureName} です`).openPopup();
          });

          // Optional: Remove popup on mouseout
          layer.on("mouseout", () => {
            layer.closePopup();
          });
        },
      }).addTo(map);

      // Cleanup on component unmount
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
