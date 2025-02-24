import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './css/map.css';
import image2D from '../../public/assets/image2D.png'; // 2D 지도 이미지
import image3D from '../../public/assets/image3D.png'; // 3D 지도 이미지
import NavigationBar from '../components/NavigationBar/NavigationBar';

const MapView = () => {
  const [is3D, setIs3D] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // 클릭된 이미지 저장

  return (
    <div>
      <NavigationBar title="회의실/과방 위치" />
      <div  className="map-container">
      <div className="map-buttons">
        <motion.button
          className={!is3D ? "active" : ""}
          onClick={() => setIs3D(false)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          평면
        </motion.button>

        <motion.button
          className={is3D ? "active" : ""}
          onClick={() => setIs3D(true)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          3D
        </motion.button>
      </div>

      {/* 이미지 클릭 시 확대 */}
      <motion.img
        key={is3D ? "3D" : "2D"}
        src={is3D ? image3D : image2D}
        alt="Campus Map"
        className="map-image"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        onClick={() => setSelectedImage(is3D ? image3D : image2D)} // 클릭 시 이미지 저장
      />

      <motion.p
        className="map-description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        소피아바리라(학생예외인계점) B208
      </motion.p>

      {/* 확대된 이미지 모달 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)} // 배경 클릭하면 닫힘
          >
            <motion.img
              src={selectedImage}
              alt="Expanded"
              className="modal-image"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default MapView;
