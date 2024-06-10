import { ZipStat } from "./consts.ts";

/**
 * A non-null pointer, represented as an object
 */
export class PointerObj {
    /**
     * A non-null pointer
     */
    readonly obj: Deno.PointerObject;
    constructor(obj: Deno.PointerObject) {
        this.obj = obj;
    }
}

/**
 * Zip archive pointer
 */
export class ZipT extends PointerObj {}
/**
 * Zip source pointer
 */
export class ZipSourceT extends PointerObj {
    #buffer?: BufferSource | null;
    constructor(obj: Deno.PointerObject, buffer?: BufferSource | null) {
        super(obj);
        this.#buffer = buffer;
    }
}
/**
 * Zip file pointer
 */
export class ZipFileT extends PointerObj {}

/**
 * Zip error pointer
 * @param obj A non-null pointer
 * @param buffer Do not use. Use {@linkcode new} instead.
 */
export class ZipErrorT extends PointerObj {
    #buffer?: Int32Array;
    constructor(obj: Deno.PointerObject, buffer?: Int32Array) {
        super(obj);
        this.#buffer = buffer;
    }

    /**libzip error code (ZIP_ER_*)*/
    get zip_err(): number {
        const p = new Deno.UnsafePointerView(this.obj);
        return p.getInt32();
    }

    /**copy of errno (E*) or zlib error code*/
    get sys_err(): number {
        const p = new Deno.UnsafePointerView(this.obj);
        return p.getInt32(4);
    }

    /**string representation*/
    get str(): string | null {
        const p = new Deno.UnsafePointerView(this.obj);
        const strp = p.getPointer(8);
        if (strp === null) return null;
        const str = new Deno.UnsafePointerView(strp);
        return str.getCString();
    }

    /**
     * Create a new pointer
     * @returns new pointer
     */
    // deno-lint-ignore no-misused-new
    static new(): ZipErrorT {
        const b = new Int32Array(4);
        const p = Deno.UnsafePointer.of(b)!;
        return new ZipErrorT(p, b);
    }
}

/**
 * A non-null pointer to a int(i32) value
 * @param obj A non-null pointer
 * @param buffer Do not use. Use {@linkcode new} instead.
 */
export class IntPointer extends PointerObj {
    #buffer?: Int32Array;
    constructor(obj: Deno.PointerObject, buffer?: Int32Array) {
        super(obj);
        this.#buffer = buffer;
    }

    /**
     * @returns value
     */
    get int(): number {
        const p = new Deno.UnsafePointerView(this.obj);
        return p.getInt32();
    }

    /**
     * Create a new int pointer
     * @param i value
     * @returns new pointer
     */
    // deno-lint-ignore no-misused-new
    static new(i?: number): IntPointer {
        const b = new Int32Array([i ?? 0]);
        const p = Deno.UnsafePointer.of(b)!;
        return new IntPointer(p, b);
    }
}

/**
 * Zip stat pointer
 * @param obj A non-null pointer
 * @param buffer Do not use. Use {@linkcode new} instead.
 */
export class ZipStatT extends PointerObj {
    #buffer?: Int32Array;
    constructor(obj: Deno.PointerObject, buffer?: Int32Array) {
        super(obj);
        this.#buffer = buffer;
    }

    /**which fields have valid values*/
    get valid(): bigint | number {
        const p = new Deno.UnsafePointerView(this.obj);
        return p.getBigUint64();
    }

    /**
     * Check field is valid or not
     * @param flag Field. See {@linkcode ZipStat}
     * @returns true if the field is valid
     */
    field_is_valid(flag: ZipStat): boolean {
        const p = this.valid;
        if (typeof p === "bigint") {
            return (p & (BigInt(flag))) != 0n;
        } else {
            return (p & flag) != 0;
        }
    }

    /**name of the file*/
    get name(): string | null {
        if (!this.field_is_valid(ZipStat.NAME)) return null;
        const p = new Deno.UnsafePointerView(this.obj);
        const strp = p.getPointer(8);
        if (strp === null) return null;
        const str = new Deno.UnsafePointerView(strp);
        return str.getCString();
    }

    /**index within archive*/
    get index(): number | bigint | null {
        if (!this.field_is_valid(ZipStat.INDEX)) return null;
        const p = new Deno.UnsafePointerView(this.obj);
        return p.getBigUint64(16);
    }

    /**size of file (uncompressed)*/
    get size(): number | bigint | null {
        if (!this.field_is_valid(ZipStat.SIZE)) return null;
        const p = new Deno.UnsafePointerView(this.obj);
        return p.getBigUint64(24);
    }

    /**size of file (compressed)*/
    get comp_size(): number | bigint | null {
        if (!this.field_is_valid(ZipStat.COMP_SIZE)) return null;
        const p = new Deno.UnsafePointerView(this.obj);
        return p.getBigUint64(32);
    }

    /**modification time*/
    get mtime(): number | bigint | null {
        if (!this.field_is_valid(ZipStat.MTIME)) return null;
        const p = new Deno.UnsafePointerView(this.obj);
        return p.getBigInt64(40);
    }

    /**crc of file data*/
    get crc(): number | null {
        if (!this.field_is_valid(ZipStat.CRC)) return null;
        const p = new Deno.UnsafePointerView(this.obj);
        return p.getUint32(48);
    }

    /**compression method used*/
    get comp_method(): number | null {
        if (!this.field_is_valid(ZipStat.COMP_METHOD)) return null;
        const p = new Deno.UnsafePointerView(this.obj);
        return p.getUint16(52);
    }

    /**encryption method used*/
    get encryption_method(): number | null {
        if (!this.field_is_valid(ZipStat.ENCRYPTION_METHOD)) return null;
        const p = new Deno.UnsafePointerView(this.obj);
        return p.getUint16(54);
    }

    /**reserved for future use*/
    get flags(): number | null {
        if (!this.field_is_valid(ZipStat.FLAGS)) return null;
        const p = new Deno.UnsafePointerView(this.obj);
        return p.getUint32(56);
    }

    /**
     * Create a new zip stat pointer
     * @returns new pointer
     */
    // deno-lint-ignore no-misused-new
    static new(): ZipStatT {
        const b = new Int32Array(15);
        const p = Deno.UnsafePointer.of(b)!;
        return new ZipStatT(p, b);
    }
}
