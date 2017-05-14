import R from "ramda";

export const filterById = R.curry((ids, state) =>
  R.evolve({
    entities: R.filter(elm => !ids.includes(elm.id))
  })(state)
);
