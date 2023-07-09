interface Convertable {
  [key: string]: string | number;
}

type ConvertString<T extends Convertable, Group extends string> = {
  [P in keyof T]: P extends string ? (T[P] extends number ? `${Uppercase<Group>}_${T[P]}` : never) : never;
};

const codeGroup = new Set();

/**
 * 分组级别的枚举工具类
 * @param groupName
 * @param codeMapping
 */
export function groupEnum<T extends Convertable, G extends string>(groupName: G, codeMapping: T): ConvertString<T, G> {
  if (codeGroup.has(groupName)) {
    throw new Error(`Error group ${groupName} is duplicated, please check before adding.`);
  } else {
    codeGroup.add(groupName);
  }
  const newCodeEnum = {} as Convertable;
  for (const errKey in codeMapping) {
    newCodeEnum[errKey as string] = groupName.toUpperCase() + '_' + String(codeMapping[errKey]).toUpperCase();
  }
  return newCodeEnum as ConvertString<T, G>;
}
