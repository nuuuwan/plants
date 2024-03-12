// import { LayerGroup } from "react-leaflet";
import { PlantPhotoMarker } from "../atoms";

export default function PlantView({ eppIdx, onClickPlantPhoto, activeEPP }) {
  if (!eppIdx) {
    return null;
  }



  let eppList = Object.values(eppIdx);

  eppList = eppList.sort(function (a, b) {
    return a.getDistance(activeEPP) - b.getDistance(activeEPP);
  });

  const distanceToEppList = eppList.reduce(function (distanceToEppList, epp) {
    const distance = 100 - epp.getDistance(activeEPP);
    if (!distanceToEppList[distance]) {
      distanceToEppList[distance] = [];
    }
    distanceToEppList[distance].push(epp);
    return distanceToEppList;
  }, {});

  return Object.entries(distanceToEppList).map(function ([
    distance,
    eppListForDistance,
  ]) {
    return eppListForDistance.map(function (epp) {
        return (
          <PlantPhotoMarker
            key={"plant-photo-" + epp.id}
            epp={epp}
            onClick={onClickPlantPhoto}
            activeEPP={activeEPP}
          />
        );
      })
  });
}

// const layerName = "layer-distance-" + distance;
    

// return (
//     <LayerGroup key={"layer-group-" + distance} name={layerName}>
//       {eppListForDistance.map(function (epp) {
//         return (
//           <PlantPhotoMarker
//             key={"plant-photo-" + epp.id}
//             epp={epp}
//             onClick={onClickPlantPhoto}
//             activeEPP={activeEPP}
//           />
//         );
//       })}
//     </LayerGroup>
//   );