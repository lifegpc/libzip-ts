import lib from "./ffi.ts";
import * as types from "./types.ts";
import type * as consts from "./consts.ts";

function getCString(p: Deno.PointerObject, offset?: number) {
    const v = new Deno.UnsafePointerView(p);
    return v.getCString(offset);
}

function toPointer<T extends types.PointerObj>(p?: T) {
    if (p === undefined) return Deno.UnsafePointer.create(0);
    return p.obj;
}

const t = new TextEncoder();

/**
 * return run-time version of libzip library
 * @returns {string} return run-time version of libzip library
 * @see https://libzip.org/documentation/zip_libzip_version.html
 */
export function zip_libzip_version(): string {
    return getCString(lib.symbols.zip_libzip_version()!);
}

/**
 * Open a zip archive.
 * @param path Path to zip archive.
 * @param flags Open flags. See {@linkcode consts.ZipOpenFlag}.
 * @param errorp The pointer to receive the corresponding error code.
 * @returns A zip archive pointer if open successfully.
 * @see https://libzip.org/documentation/zip_open.html
 */
export function zip_open(
    path: string | BufferSource,
    flags: number,
    errorp?: types.IntPointer,
): types.ZipT | null {
    if (typeof path === "string") {
        path = t.encode(path);
    }
    const re = lib.symbols.zip_open(path, flags, toPointer(errorp));
    return re ? new types.ZipT(re) : null;
}

/**
 * Open a zip archive.
 * @description
 * Opens a zip archive encapsulated by the zip_source zs using the provided flags. In case of error, the zip_error ze is filled in.
 * @param zs Source.
 * @param flags Open flags. See {@linkcode consts.ZipOpenFlag}
 * @param ze The pointer to receive the corresponding error.
 * @returns A zip archive pointer if open successfully.
 * @see https://libzip.org/documentation/zip_open_from_source.html
 */
export function zip_open_from_source(
    zs: types.ZipSourceT,
    flags: number,
    ze?: types.ZipErrorT,
): types.ZipT | null {
    const re = lib.symbols.zip_open_from_source(
        toPointer(zs),
        flags,
        toPointer(ze),
    );
    return re ? new types.ZipT(re) : null;
}

/**
 * Close zip archive
 * @description
 * Writes any changes made to archive to disk. If archive contains no files,
 * the file is completely removed (no empty archive is written), unless the
 * archive flag {@linkcode consts.ZIP_AFL_CREATE_OR_KEEP_FILE_FOR_EMPTY_ARCHIVE} is set.
 * If successful, archive is freed. Otherwise archive is left unchanged and must still be freed.
 *
 * To close and free a zip archive without saving changes, use {@linkcode zip_discard}.
 *
 * Progress updates for GUIs can be implemented using {@linkcode zip_register_progress_callback_with_state}.
 * Cancelling the write of an archive during {@linkcode zip_close} can be implemented using {@linkcode zip_register_cancel_callback_with_state}.
 * @param archive Zip archive pointer
 * @returns Upon successful completion true is returned. Otherwise, false is returned and the error code in archive is set to indicate the error.
 * @see https://libzip.org/documentation/zip_close.html
 */
export function zip_close(archive: types.ZipT): boolean {
    return lib.symbols.zip_close(toPointer(archive)) == 0;
}

/**
 * Close zip archive and discard changes
 * @description
 * Closes archive and frees the memory allocated for it.
 * Any changes to the archive are not written to disk and discarded.
 * @param archive Zip archive pointer
 * @see https://libzip.org/documentation/zip_discard.html
 */
export function zip_discard(archive: types.ZipT): void {
    return lib.symbols.zip_discard(toPointer(archive));
}
