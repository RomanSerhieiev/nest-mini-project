export class TransformHelper {
  public static toLowerCase({ value }: { value: string }): string {
    return value ? value.toString().toLowerCase() : value;
  }

  public static toLowerCaseArray({ value }: { value: string[] }): string[] {
    return Array.isArray(value) ? value.map((item) => item.toString().toLowerCase()) : value;
  }

  public static trim({ value }: { value: string }): string {
    return value ? value.toString().trim() : value;
  }

  public static trimArray({ value }: { value: string[] }): string[] {
    return Array.isArray(value) ? value.map((item) => item.toString().trim()) : value;
  }

  public static uniqueItems({ value }: { value: string | string[] }): string | string[] {
    return value ? Array.from(new Set(value)) : value;
  }
}
