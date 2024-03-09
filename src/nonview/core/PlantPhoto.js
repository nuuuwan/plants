import { WWW, LngLat, Color, Random } from "../base";
import PlantNetResult from "./PlantNetResult";
import { NAME_TRANSLATIONS } from "../constants";

export default class PlantPhoto {
  constructor(ut, lngLat, direction, imagePath, plantResults) {
    this.ut = ut;
    this.lngLat = lngLat;
    this.direction = direction;
    this.imagePath = imagePath;
    this.plantResults = plantResults;
  }

  get id() {
    return this.imagePath;
  }

  get urlImage() {
    return (
      "https://raw.githubusercontent.com" +
      "/nuuuwan/lk_plants/main/" +
      this.imagePath
    );
  }

  get bounds() {
    const SPAN = 0.001;
    return [
      [this.lngLat.lat - SPAN, this.lngLat.lng - SPAN],
      [this.lngLat.lat + SPAN, this.lngLat.lng + SPAN],
    ];
  }

  get position() {
    return [this.lngLat.lat - 0.001, this.lngLat.lng];
  }

  get latlng() {
    return {
      lat: this.lngLat.lat,
      lng: this.lngLat.lng,
    };
  }

  get bestGuess() {
    return this.plantResults[0];
  }

  get confidenceStr() {
    const MIN_CONFIDENCE = 0.1;
    return this.plantResults
      .filter(function (plantResult, iPlantResult) {
        return (
          iPlantResult < 3 &&
          (iPlantResult < 1 || plantResult.confidence > MIN_CONFIDENCE)
        );
      })
      .map(function (plantResult) {
        return plantResult.scientificNameAndConfidence;
      })
      .join(", ");
  }

  get scientificName() {
    return this.bestGuess.scientificName;
  }

  get family() {
    return this.bestGuess.family;
  }

  get genus() {
    return this.bestGuess.genus;
  }

  get species() {
    return this.bestGuess.scientificName.split(" ")[1];
  }

  get authorship() {
    return this.bestGuess.authorship;
  }

  get shortText() {
    return this.genus.substring(0, 1) + this.species.substring(0, 1);
  }

  get commonNames() {
    return this.bestGuess.commonNames;
  }

  get commonNames2() {
    const nameTranslations = NAME_TRANSLATIONS[this.scientificName];
    if (!nameTranslations) {
      return [];
    }
    return Object.entries(nameTranslations).filter(([k,_]) => ['sinhala', 'tamil'].includes(k)).map(([k,v]) => v);
  }

  get commonNamesCombined() {
    return [].concat(this.commonNames2, this.commonNames);
  }

  get commonNamesStr() {
    const MAX_LEN = 80;
    const s =  this.commonNamesCombined.join(", ");
    if (s.length > MAX_LEN) {
      return s.substring(0, MAX_LEN) + "…";
    }
    return s;
  }

  get timeStr() {
    const date = new Date(this.ut * 1000);
    let dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    let timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

    let formattedDate = date.toLocaleDateString("en-US", dateOptions);
    let formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    return `${formattedTime} · ${formattedDate}`;
  }

  get latLngStr() {
    return `${this.latlng.lat.toFixed(4)}°N ${this.latlng.lng.toFixed(4)}°E`;
  }

  get directionStr() {
    const DIRECTIONS = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const directionHumanized =
      DIRECTIONS[Math.round(this.direction / 22.5) % 16];

    return `${directionHumanized} (${this.direction}°)`;
  }

  get photoInfoStr() {
    return `${this.timeStr} · ${this.latLngStr} · Facing ${this.directionStr}`;
  }

  get color() {
    const key = this.family.charCodeAt(0);
    const RANDOM_PRIME = 100001;
    const MAX_HUE = 360;
    const hue = (key * RANDOM_PRIME) % MAX_HUE;
    return Color.getHexFromHue(hue);
  }

  get cmp() {
    return this.ut;
  }

  getDistance(other) {
    if (this.scientificName === other.scientificName) {
      return 0;
    }

    if (this.genus === other.genus) {
      return 1;
    }

    if (this.family === other.family) {
      return 2;
    }
    return 3;
  }

  getRelativeColor(other) {
    const distance = this.getDistance(other);

    return ["#082", "#f80", "#800", "#888"][distance];
  }

  // Static

  static fromDict(d) {
    const ut = parseInt(d["ut"]);

    const [latRaw, lngRaw] = d["latlng"];
    const lat = parseFloat(latRaw);
    const lng = parseFloat(lngRaw);
    const lngLat = new LngLat(lng, lat);

    const direction = parseInt(d["direction"]);

    const imagePath = d["image_path"];

    const plantResults = d["plantnet_results"].map(PlantNetResult.fromDict);

    return new PlantPhoto(ut, lngLat, direction, imagePath, plantResults);
  }

  static async getRandomId() {
    const idx = await PlantPhoto.idx();
    const ids = Object.keys(idx);
    return Random.choice(ids);
  }

  static async listAll() {
    const rawDataList = await PlantPhoto.getRawDataList();
    return rawDataList
      .map(function (d) {
        return PlantPhoto.fromDict(d);
      })
      .sort(function (a, b) {
        return a.cmp - b.cmp;
      });
  }

  static async idx() {
    const arr = await PlantPhoto.listAll();
    return Object.fromEntries(
      arr.map(function (plantPhoto) {
        return [plantPhoto.id, plantPhoto];
      })
    );
  }

  static async getRawDataList() {
    const metadataPathList = await PlantPhoto.getMetaDataPathList();
    return await Promise.all(
      metadataPathList.map(async function (metadataPath) {
        const URL =
          "https://raw.githubusercontent.com" +
          "/nuuuwan/lk_plants/main/" +
          metadataPath;
        return await WWW.json(URL);
      })
    );
  }

  static async getMetaDataPathList() {
    const idxByFamily = await PlantPhoto.getIdxSummary();
    return Object.values(idxByFamily).reduce(function (arr, idxByGenus) {
      return Object.values(idxByGenus).reduce(function (arr, idxBySpecies) {
        return Object.values(idxBySpecies).reduce(function (
          arr,
          arrForSpecies
        ) {
          return arr.concat(arrForSpecies);
        },
        arr);
      }, arr);
    }, []);
  }

  static async getIdxSummary() {
    const URL =
      "https://raw.githubusercontent.com" +
      "/nuuuwan/lk_plants/main/data" +
      "/metadata.idx_summary.json";
    return await WWW.json(URL);
  }

  static sortBy(arr, activePlantPhoto) {
    return arr.sort(function (a, b) {
      return b.getDistance(activePlantPhoto) - a.getDistance(activePlantPhoto);
    });
  }
}
