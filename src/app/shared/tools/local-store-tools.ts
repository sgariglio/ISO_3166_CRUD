export class LocalStoreTools {

  static clearList(key: string) {
    localStorage.setItem(key, JSON.stringify(null));
  }

  static saveList(key: string, object: any) {
    let list = this.readList(key, object) as object[]
    if (list == null) {
      list = [] as object[]
    }
    list.push(object)
    localStorage.setItem(key, JSON.stringify(list));
  }

  static save(key: string, object: any) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  static read<T>(key: string, typeClue: T): any {
    var localSavedObject = localStorage.getItem(key);
    let object = JSON.parse(localSavedObject!) as T
    return object
  }

  static readList<T>(key: string, typeClue: T): any {
    var localSavedObject = localStorage.getItem(key);

    let object = JSON.parse(localSavedObject!) as T[]
    return object
  }

  static randomId(): number {
    return Math.floor(Math.random() * (9999 - 1)) + 1;
  }

}
