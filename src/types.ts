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
export class ZipSourceT extends PointerObj {}

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
    static new() {
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
    static new(i?: number) {
        const b = new Int32Array([i ?? 0]);
        const p = Deno.UnsafePointer.of(b)!;
        return new IntPointer(p, b);
    }
}
