/**
 * localStorageの安全ラッパー。
 * Cookie全ブロックやプライベートモードではlocalStorageへのアクセス自体が
 * SecurityErrorを投げる環境があるため、読み書きは必ずここを通す
 * (保存できなくてもアプリは動き続けるのが正しい挙動)。
 */
export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // 保存不可の環境では単に永続化をあきらめる
  }
}
