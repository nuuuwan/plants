import { LayerGroup , Pane} from "react-leaflet";
import { PlantPhotoMarker } from "../atoms";

export default function PlantView({ eppIdx, onClickPlantPhoto, activeEPP }) {
  if (!eppIdx) {
    return null;
  }

  const eppList = Object.values(eppIdx);

  const distanceToEppList = eppList.reduce(function (distanceToEppList, epp) {
    const distance = epp.getDistance(activeEPP);
    if (!distanceToEppList[distance]) {
      distanceToEppList[distance] = [];
    }
    distanceToEppList[distance].push(epp);
    return distanceToEppList;
  }, {});

  return Object.entries(distanceToEppList).sort(
    function(entryA, entryB) {
      return entryB[0] - entryA[0];
    }
  ).map(function ([
    distance,
    eppListForDistance,
  ]) {
    const invDistance = 9 - distance;
    const layerName = "layer-distance-" + invDistance;

    return (
      <LayerGroup key={layerName} name={layerName}>
        <Pane name={layerName} >
        {eppListForDistance.map(function (epp) {
          return (
            <PlantPhotoMarker
              key={"plant-photo-" + epp.id}
              epp={epp}
              onClick={onClickPlantPhoto}
              activeEPP={activeEPP}
              distance={distance}
            />
          );
        })}
        </Pane>
      </LayerGroup>
    );
  });
}
