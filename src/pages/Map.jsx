import React, { useState } from 'react';
import './css/map.css';
import image2D from '../../public/assets/image2D.png'; // 2D 지도 이미지
import image3D from '../../public/assets/image3D.png'; // 3D 지도 이미지

const MapView = () => {
  const [is3D, setIs3D] = useState(false);

  return (
    <div className="map-container">
      <div className="map-buttons">
        <button className={!is3D ? "active" : ""} onClick={() => setIs3D(false)}>평면</button>
        <button className={is3D ? "active" : ""} onClick={() => setIs3D(true)}>3D</button>
      </div>
      <img src={is3D ? image3D : image2D} alt="Campus Map" className="map-image" />
      <p className="map-description">소피아바리라(학생예외인계점) B208</p>
    </div>
  );
};

export default MapView;
