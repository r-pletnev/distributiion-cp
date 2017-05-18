import R from "ramda";

export const filterById = R.curry((ids, state) =>
  R.evolve({
    entities: R.filter(elm => !ids.includes(elm.id))
  })(state));

export const sortById = R.sortBy(R.prop("id"));
