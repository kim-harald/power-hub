import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import SparkMD5 from 'spark-md5';

export class Payload<T> {
  /**
   * Array of Reading entries
   */
  public data: T[];

  /**
   * Hash of data for integrity purposes
   */
  public hash: string;
  constructor(data: T[]) {
    this.data = data;
    this.hash = '';
    this.setHash();
  }

  private computeHash(): string {
    return SparkMD5.hash(this.getDataForHash());
  }

  public setHash(): void {
    this.hash = this.computeHash();
  }

  public get isValid(): Observable<boolean> {
    return from(SparkMD5.hash(this.getDataForHash())).pipe(
      map((m) => {
        return m === this.hash;
      }),
    );
  }

  private getDataForHash(): string {
    const s = this.data
      .map(
        (m:any) => {
          let rowString = '';
          Object.values(m).map(v => rowString += v);
          return rowString;
        }
      )
      .reduce((a, b) => a + b, '');

    return s;
  }
}
