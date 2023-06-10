enum Cardinality {
  Characters = "characters",
  Objects = "objects",
  Locations = "locations",
  Events = "event",
}

interface CardinalityInfo {
  name: string;
  icon: string;
  count?: number;
}

const cardinalities: { [key: string]: CardinalityInfo } = {
  [Cardinality.Characters]: {
    name: "characters",
    icon: "bx bxs-face",
  },
  [Cardinality.Objects]: {
    name: "objects",
    icon: "bx bxs-cuboid",
  },
  [Cardinality.Locations]: {
    name: "locations",
    icon: "bx bxs-landscape",
  },
  [Cardinality.Events]: {
    name: "event",
    icon: "bx bxs-calendar-event",
  },
};

const newCardinality = (tag: string, count?: number): CardinalityInfo => {
  const cardinality = cardinalities[tag] ?? {
    name: tag,
    icon: "bx bx-question-mark",
  };

  cardinality.count = count;
  return cardinality;
};

export { Cardinality, CardinalityInfo, newCardinality };
