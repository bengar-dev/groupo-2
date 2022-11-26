export function deleteKeysFromData(
  data: any[],
  keys: string[],
  object: boolean = false
): any[] {
  if (!object) {
    data.forEach((data) => {
      keys.forEach((key) => {
        if (data[key]) delete data[key];
      });
    });
    return data;
  } else {
    const newObject = data[0];
    keys.forEach((key) => {
      if (newObject[key]) delete newObject[key];
    });
    return newObject;
  }
}
