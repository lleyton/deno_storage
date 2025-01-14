import { KeyValue } from "./key-value.ts";
import { join } from "https://deno.land/std/path/mod.ts";

export class LocalStorage<T> extends KeyValue<T> {
    constructor(private _path: string = join(Deno.cwd(), "local-storage.json")) {
        super();
        try {
            this.data = JSON.parse(Deno.readTextFileSync(this._path))
        } catch (err) {
            if (err instanceof Deno.errors.NotFound)
                Deno.writeTextFileSync(this._path, JSON.stringify(this.data))
            else
                throw err
        }
    }
    /**
     * Sava data from memory to disk. Use it only when program end. Don't overuse it.
     */
    save(replacer?: (this: any, key: string, value: any) => any, space?: string | number): void;
    save(replacer?: (number | string)[] | null, space?: string | number): void;
    save(replacer?: any, space?: any) {
        return Deno.writeTextFileSync(this._path, JSON.stringify(this.data, replacer, space))
    }
}
