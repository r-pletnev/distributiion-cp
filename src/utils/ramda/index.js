import R from "ramda";

export const filterById = R.curry((ids, state) =>
  R.evolve({
    entities: R.filter(elm => !ids.includes(elm.id))
  })(state));

export const sortById = R.sortBy(R.prop("id"));

// dotted path for take deep nested fields from objects
const dotPath = R.useWith(R.path, [R.split(".")]);
export const propsDotPath = R.useWith(R.ap, [R.map(dotPath), R.of]);
export const getProp = R.compose(R.head, propsDotPath);
