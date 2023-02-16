/**
 * Принимает два объекта, должна вернуть или true или false, если объекты идентичны внутри, возвращает
 * true, если есть различие, false. То есть проверяет каждое свойство, вне зависимости от вложенности,
 * делаем через рекурсию(а других вариантов и нет)
 */
export const deepEqual = (obj, anotherObject) => {
  if (Object.keys(obj).length !== Object.keys(anotherObject).length) {
    return false;
  }

  return Object.keys(obj).every((key) => {
    if (
      typeof obj[key] === 'object' &&
      typeof anotherObject[key] === 'object'
    ) {
      return deepEqual(obj[key], anotherObject[key]);
    } else {
      return obj[key] === anotherObject[key];
    }
  });
};

/**
 * Принимает объект, возвращает его глубокую копию, то есть ни одно свойство
 * не является ссылочным у другого объекта, точно возвращает новое.
 * Если это массив, возвращает новый массив(map) и если элемент массива не простого типа,
 * то тогда в рекурсию. С объектом также. Поскольку массив при typeof возвращает object, чтобы
 * их различить берем метод Array.isArray и он на массивах вернет тру
 */
export const deepCopy = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((element) => {
      if (typeof element === 'object') {
        return deepCopy(element);
      }
      return element;
    });
  } else {
    const copyObj = {};
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object') {
        copyObj[key] = deepCopy(obj[key]);
      } else {
        copyObj[key] = obj[key];
      }
    });
    return copyObj;
  }
};

/**
 * Мы передаем объект, и должны вернуть массив уникальных названий свойств
 * То есть если у нас объект { name: { bohdan: { name: 'test' } } } вернет ['name', 'bohdan']
 */
export const getAllObjectKeys = (obj) => {
  const keys = new Set();

  Object.entries(obj).forEach(([key, value]) => {
    keys.add(key);
    if (typeof value === 'object') {
      getAllObjectKeys(value).forEach((k) => keys.add(k));
    }
  });
  const result = [];
  keys.forEach((key) => {
    result.push(key);
  });
  return result;
};
