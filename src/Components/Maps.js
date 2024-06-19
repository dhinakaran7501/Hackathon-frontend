import React, { useEffect, useState } from 'react';
import "../App.css";
import { SVGMap } from 'react-svg-map';
import India from '@svg-maps/india';
import 'react-svg-map/lib/index.css';
import $ from 'jquery';
import 'jquery.ripples';

const Maps = () => {
  const [selectedState, setSelectedState] = useState();

  const onLocationClick = (event) => {
    const name = event.target.getAttribute("name");
    setSelectedState(name);
    console.log("Name:", name);
  };

  useEffect(() => {
    $('.india-map').ripples({
      resolution: 812,
      dropRadius: 5,
      perturbance: 0.01,
    });

    return () => {
      $('.india-map').ripples('destroy');
    };
  }, []);

  useEffect(() => {
    document.querySelectorAll('.svg-map__location').forEach(el => {
      el.classList.remove('selected');
    });

    if (selectedState) {
      const selectedElement = document.querySelector(`[name="${selectedState}"]`);
      if (selectedElement) {
        selectedElement.classList.add('selected');
      }
    }
  }, [selectedState]);

  return (
    <section>
      <div className="container flex">
        <div className="content"></div>
        <div className='map'>
          <div className="map-outer-shadow"></div>
          <div className="india-map">
            <div className="ripple-effect-background">
              <SVGMap
                map={India}
                onLocationClick={onLocationClick}
                className="svg-map"
              />
              {/* {selectedState && (
                <div className="selected-state-overlay">
                  <h2>{selectedState}</h2>
                  <button onClick={() => setSelectedState(null)}>Close</button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Maps;