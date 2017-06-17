import R from "ramda";

export const filterById = R.curry((ids, state) =>
  R.evolve({
    entities: R.filter(elm => !ids.includes(elm.id))
  })(state)
);

export const sortById = R.sortBy(R.prop("id"));
export const sortByName = R.sortBy(R.prop("name"));
export const sortDescByName = R.sort(R.compose(R.descend, R.prop("name")));
export const sortDescById = R.sortBy(R.compose(R.descend, R.prop("id")));

// dotted path for take deep nested fields from objects
const dotPath = R.useWith(R.path, [R.split(".")]);
export const propsDotPath = R.useWith(R.ap, [R.map(dotPath), R.of]);
export const getProp = R.compose(R.head, propsDotPath);
export const renameKeys = R.curry((keysMap, obj) =>
  R.reduce(
    (acc, key) => R.assoc(keysMap[key] || key, obj[key], acc),
    {},
    R.keys(obj)
  )
);

export const defaultToZero = R.defaultTo(0);
export const defaultToNull = R.defaultTo(null);
export const defaultToOne = R.defaultTo(1);
export const defaultToFalse = R.defaultTo(false);
export const defaultToEmptyString = R.defaultTo("");
export const defaultToEmptyArray = R.defaultTo([]);
export const defaultToEmptyObject = R.defaultTo({});

export const byId = (id, list) => R.find(R.propEq("id", id), list);
export const mapById = (list, infoList) =>
  list.map(elm => {
    const ourElm = defaultToEmptyObject(byId(elm.id, infoList));
    return { ...ourElm, ...elm };
  });
