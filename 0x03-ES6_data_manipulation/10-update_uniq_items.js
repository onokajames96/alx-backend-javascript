function updateUniqueItems(map) {
  if (!(map instanceof Map)) {
    throw new Error('Cannot process');
  }

  map.forEach((value, key, map) => {
    if (value === 1) {
      map.set(key, 100);
    }
  });

  return map;
}

export default updateUniqueItems;
