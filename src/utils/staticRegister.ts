export const collection = new Map<string, Map<string, any>>();

export default function staticRegister<T = any>(namespace = 'common') {
  if (!collection.has(namespace)) {
    collection.set(namespace, new Map<string, T>());
  }
  const subCollection = collection.get(namespace) as Map<string, T>;

  /**
   * Register an item to the collection. If the item under the same was exist earlier then this item will be replaced with new one.
   *
   * @param {String} name Identification of the item.
   * @param {*} item Item to save in the collection.
   */
  function register(name: string, item: T) {
    subCollection.set(name, item);
  }

  /**
   * Retrieve the item from the collection.
   *
   * @param {String} name Identification of the item.
   * @returns {*} Returns item which was saved in the collection.
   */
  function getItem(name: string): T | undefined {
    return subCollection.get(name);
  }

  /**
   * Check if item under specyfied name is exists.
   *
   * @param {String} name Identification of the item.
   * @returns {Boolean} Returns `true` or `false` depends on if element exists in the collection.
   */
  function hasItem(name: string): boolean {
    return subCollection.has(name);
  }

  /**
   * Retrieve list of names registered from the collection.
   *
   * @returns {Array} Returns an array of strings with all names under which objects are stored.
   */
  function getNames(): string[] {
    return [...subCollection.keys()];
  }

  /**
   * Retrieve all registered values from the collection.
   *
   * @returns {Array} Returns an array with all values stored in the collection.
   */
  function getValues(): T[] {
    return [...subCollection.values()];
  }

  return {
    register,
    getItem,
    hasItem,
    getNames,
    getValues,
  };
}
