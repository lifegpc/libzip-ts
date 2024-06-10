import lib from "./ffi.ts";
import type { IntPointer, PointerObj, ZipErrorT } from "./types.ts";
import { ZipFileT, ZipSourceT, ZipT } from "./types.ts";
import type { ZipArchiveGlobalFlags, ZipFlags, ZipOpenFlag } from "./consts.ts";

function getCString(p: Deno.PointerObject, offset?: number) {
    const v = new Deno.UnsafePointerView(p);
    return v.getCString(offset);
}

function toPointer<T extends PointerObj>(p?: T) {
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
 * @param flags Open flags. See {@linkcode ZipOpenFlag}.
 * @param errorp The pointer to receive the corresponding error code.
 * @returns A zip archive pointer if open successfully.
 * @see https://libzip.org/documentation/zip_open.html
 */
export function zip_open(
    path: string | BufferSource,
    flags: ZipOpenFlag | number,
    errorp?: IntPointer,
): ZipT | null {
    if (typeof path === "string") {
        path = t.encode(path);
    }
    const re = lib.symbols.zip_open(path, flags, toPointer(errorp));
    return re ? new ZipT(re) : null;
}

/**
 * Open a zip archive.
 * @description
 * Opens a zip archive encapsulated by the zip_source zs using the provided flags. In case of error, the zip_error ze is filled in.
 * @param zs Source.
 * @param flags Open flags. See {@linkcode ZipOpenFlag}
 * @param ze The pointer to receive the corresponding error.
 * @returns A zip archive pointer if open successfully.
 * @see https://libzip.org/documentation/zip_open_from_source.html
 */
export function zip_open_from_source(
    zs: ZipSourceT,
    flags: ZipOpenFlag | number,
    ze?: ZipErrorT,
): ZipT | null {
    const re = lib.symbols.zip_open_from_source(
        toPointer(zs),
        flags,
        toPointer(ze),
    );
    return re ? new ZipT(re) : null;
}

/**
 * open zip archive using open file descriptor
 * @description
 * The zip archive specified by the open file descriptor fd is opened and
 * a pointer to a struct zip, used to manipulate the archive, is returned.
 * In contrast to {@linkcode zip_open}, using {@linkcode zip_fdopen} the
 * archive can only be opened in read-only mode.
 * The fd argument may not be used any longer after calling zip_fdopen.
 * The flags are specified to {@linkcode ZipOpenFlag.CHECKCONS} or 0.
 * @param fd The file descriptor
 * @param flags Open flags. Can be {@linkcode ZipOpenFlag.CHECKCONS} or 0.
 * @param errorp The pointer to receive the corresponding error code.
 * @returns Upon successful completion {@linkcode zip_fdopen} returns a struct zip pointer,
 * and fd should not be used any longer, nor passed to close.
 * Otherwise, NULL is returned and *errorp is set to indicate the error.
 * In the error case, fd remains unchanged.
 * @see https://libzip.org/documentation/zip_fdopen.html
 */
export function zip_fdopen(
    fd: number,
    flags: ZipOpenFlag | number,
    errorp?: IntPointer,
): ZipT | null {
    const re = lib.symbols.zip_fdopen(fd, flags, toPointer(errorp));
    return re ? new ZipT(re) : null;
}

/**
 * get index of file by name
 * @description
 * The {@linkcode zip_name_locate} function returns the index of the file named fname in archive.
 * If archive does not contain a file with that name, -1 is returned.
 * If neither {@linkcode ZipFlags.ENC_RAW} nor {@linkcode ZipFlags.ENC_STRICT} are specified,
 * guess the encoding of the name in the ZIP archive and convert it to UTF-8,
 * if necessary, before comparing.
 *
 * If neither {@linkcode ZipFlags.ENC_CP437} nor {@linkcode ZipFlags.ENC_UTF_8} are specified,
 * guess the encoding of fname.
 *
 * Only CP-437 and UTF-8 are recognized.
 * @param archive Zip archive
 * @param fname File name
 * @param flags Flags. See {@linkcode ZipFlags}
 * @returns the index of the file named fname or -1, if archive does not contain an entry of that name.
 * @see https://libzip.org/documentation/zip_name_locate.html
 */
export function zip_name_locate(
    archive: ZipT,
    fname: string | BufferSource,
    flags: ZipFlags | number,
): number | bigint {
    if (typeof fname === "string") {
        fname = t.encode(fname);
    }
    return lib.symbols.zip_name_locate(toPointer(archive), fname, flags);
}

/**
 * open file in zip archive for reading
 * @description
 * The {@linkcode zip_fopen} function opens the file name fname in archive.
 * The flags argument specifies how the name lookup should be done,
 * according to the values are described in {@linkcode zip_name_locate}.
 * Also, the following values may be or'ed to it: {@linkcode ZipFlags.COMPRESSED},
 * {@linkcode ZipFlags.UNCHANGED}.
 *
 * If encrypted data is encountered, the functions call {@linkcode zip_fopen_encrypted}
 * or {@linkcode zip_fopen_index_encrypted} respectively, using the default password
 * set with {@linkcode zip_set_default_password}.
 * @param archive Zip archive
 * @param fname File name
 * @param flags Flags. See {@linkcode ZipFlags}
 * @returns Upon successful completion, a {@linkcode ZipFileT} pointer is returned.
 * Otherwise, null is returned and the error code in archive is set to indicate the error.
 * @see https://libzip.org/documentation/zip_fopen.html
 */
export function zip_fopen(
    archive: ZipT,
    fname: string | BufferSource,
    flags: ZipFlags | number,
): ZipFileT | null {
    if (typeof fname === "string") {
        fname = t.encode(fname);
    }
    const re = lib.symbols.zip_fopen(toPointer(archive), fname, flags);
    return re ? new ZipFileT(re) : null;
}

/**
 * open file in zip archive for reading
 * @description
 * The {@linkcode zip_fopen_index} function opens the file at position index.
 *
 * If encrypted data is encountered, the functions call {@linkcode zip_fopen_encrypted}
 * or {@linkcode zip_fopen_index_encrypted} respectively, using the default password
 * set with {@linkcode zip_set_default_password}.
 * @param archive Zip archive
 * @param index File index
 * @param flags Flags. See {@linkcode ZipFlags}
 * @returns Upon successful completion, a {@linkcode ZipFileT} pointer is returned.
 * Otherwise, null is returned and the error code in archive is set to indicate the error.
 * @see https://libzip.org/documentation/zip_fopen_index.html
 */
export function zip_fopen_index(
    archive: ZipT,
    index: number | bigint,
    flags: ZipFlags | number,
): ZipFileT | null {
    const re = lib.symbols.zip_fopen_index(toPointer(archive), index, flags);
    return re ? new ZipFileT(re) : null;
}

/**
 * open encrypted file in zip archive for reading
 * @description
 * The {@linkcode zip_fopen_encrypted} function opens the encrypted file name fname
 * in archive using the password given in the password argument.
 * If password is null or the empty string, the default password is used (see
 * {@linkcode zip_set_default_password}).
 * The flags argument are the same as for {@linkcode zip_fopen}.
 * @param archive Zip archive.
 * @param fname File name.
 * @param flags Flags. See {@linkcode ZipFlags}
 * @param password Password.
 * @returns Upon successful completion, a {@linkcode ZipFileT} pointer is returned.
 * Otherwise, null is returned and the error code in archive is set to indicate the error.
 * @see https://libzip.org/documentation/zip_fopen_encrypted.html
 */
export function zip_fopen_encrypted(
    archive: ZipT,
    fname: string | BufferSource,
    flags: ZipFlags | number,
    password: string | BufferSource | null,
): ZipFileT | null {
    if (typeof fname === "string") {
        fname = t.encode(fname);
    }
    if (typeof password === "string") {
        password = t.encode(password);
    }
    const re = lib.symbols.zip_fopen_encrypted(
        toPointer(archive),
        fname,
        flags,
        password,
    );
    return re ? new ZipFileT(re) : null;
}

/**
 * open encrypted file in zip archive for reading
 * @description
 * The {@linkcode zip_fopen_index_encrypted} function opens the file at position index,
 * see {@linkcode zip_fopen_index}.
 * These functions are called automatically by {@linkcode zip_fopen};
 * you only need to call them if you want to specify a non-default password
 * (see {@linkcode zip_set_default_password}).
 * @param archive Zip archive.
 * @param index File index.
 * @param flags Flags. See {@linkcode ZipFlags}
 * @param password Password.
 * @returns Upon successful completion, a {@linkcode ZipFileT} pointer is returned.
 * Otherwise, null is returned and the error code in archive is set to indicate the error.
 * @see https://libzip.org/documentation/zip_fopen_index_encrypted.html
 */
export function zip_fopen_index_encrypted(
    archive: ZipT,
    index: number | bigint,
    flags: ZipFlags | number,
    password: string | BufferSource | null,
): ZipFileT | null {
    if (typeof password === "string") {
        password = t.encode(password);
    }
    const re = lib.symbols.zip_fopen_index_encrypted(
        toPointer(archive),
        index,
        flags,
        password,
    );
    return re ? new ZipFileT(re) : null;
}

/**
 * read from file
 * @description
 * The {@linkcode zip_fread} function read from file into buf from the current position in the
 * file (see {@linkcode zip_fseek}). After reading, the current position is updated by the
 * number of bytes read.
 * @param file Zip file
 * @param buf Buffer
 * @returns If successful, the number of bytes actually read is returned.
 * When {@linkcode zip_fread} is called after reaching the end of the file, 0 is returned.
 * In case of error, -1 is returned.
 * @see https://libzip.org/documentation/zip_fread.html
 */
export function zip_fread(file: ZipFileT, buf: Uint8Array): number | bigint {
    return lib.symbols.zip_fread(
        toPointer(file),
        Deno.UnsafePointer.of(buf),
        buf.length,
    );
}

/**
 * close file in zip archive
 * @description
 * The {@linkcode zip_fclose} function closes file and frees the memory allocated for it.
 * @param file Zip file
 * @returns Upon successful completion 0 is returned. Otherwise, the error code is returned.
 * @see https://libzip.org/documentation/zip_fclose.html
 */
export function zip_fclose(file: ZipFileT): number {
    return lib.symbols.zip_close(toPointer(file));
}

/**
 * add file to zip archive
 * @param archive specifies the zip archive to which the file should be added
 * @param name the file's name in the zip archive.
 * @param source Data source.
 * @param flags Flags. see {@linkcode ZipFlags}
 * @returns Upon successful completion, returns the index of the new file in the archive.
 * Otherwise, -1 is returned and the error code in archive is set to indicate the error.
 * @see https://libzip.org/documentation/zip_file_add.html
 */
export function zip_file_add(
    archive: ZipT,
    name: string | BufferSource,
    source: ZipSourceT,
    flags: ZipFlags | number,
): number | bigint {
    if (typeof name === "string") {
        name = t.encode(name);
    }
    return lib.symbols.zip_file_add(
        toPointer(archive),
        name,
        toPointer(source),
        flags,
    );
}

/**
 * get status flags for zip
 * @description
 * The {@linkcode zip_get_archive_flag} function returns if the flag flag is set
 * for the archive archive. The archive flags might have been changed with
 * {@linkcode zip_set_archive_flag}; if flags is set to {@linkcode ZipFlags.UNCHANGED},
 * the original unchanged flags are tested.
 * @param archive Zip archive
 * @param flag Zip status flags. See {@linkcode ZipArchiveGlobalFlags}
 * @param flags Zip flags.
 * @returns 1 if flag is set for archive, 0 if not, and -1 if an error occurred.
 * @see https://libzip.org/documentation/zip_get_archive_flag.html
 */
export function zip_get_archive_flag(
    archive: ZipT,
    flag: ZipArchiveGlobalFlags,
    flags: ZipFlags | number,
): number {
    return lib.symbols.zip_get_archive_flag(toPointer(archive), flag, flags);
}

/**
 * create zip data source from buffer
 * @description
 * The functions {@linkcode zip_source_buffer} and {@linkcode zip_source_buffer_create}
 * create a zip source from the buffer data of size len. If freep is non-zero, the buffer
 * will be freed when it is no longer needed. data must remain valid for the lifetime of
 * the created source.
 *
 * The source can be used to open a zip archive from.
 * @param archive Zip archive
 * @param data Buffer
 * @param len Data length
 * @param freep non-zero if the buffer will be freed when it is no longer needed.
 * @returns Upon successful completion, the created source is returned.
 * Otherwise, null is returned and the error code in archive is set to indicate the error.
 * @see https://libzip.org/documentation/zip_source_buffer.html
 */
export function zip_source_buffer(
    archive: ZipT,
    data: BufferSource | null,
    len: number | bigint,
    freep: number,
): ZipSourceT | null {
    const r = lib.symbols.zip_source_buffer(
        toPointer(archive),
        data,
        len,
        freep,
    );
    return r ? new ZipSourceT(r, data) : null;
}

/**
 * create zip data source from buffer
 * @description
 * The functions {@linkcode zip_source_buffer} and {@linkcode zip_source_buffer_create}
 * create a zip source from the buffer data of size len. If freep is non-zero, the buffer
 * will be freed when it is no longer needed. data must remain valid for the lifetime of
 * the created source.
 *
 * The source can be used to open a zip archive from.
 * @param data Buffer
 * @param len Data length
 * @param freep non-zero if the buffer will be freed when it is no longer needed.
 * @param error The pointer to receive the corresponding error.
 * @returns Upon successful completion, the created source is returned.
 * Otherwise, null is returned and the error is set is set to indicate the error.
 * @see https://libzip.org/documentation/zip_source_buffer_create.html
 */
export function zip_source_buffer_create(
    data: BufferSource | null,
    len: number | bigint,
    freep: number,
    error?: ZipErrorT,
): ZipSourceT | null {
    const r = lib.symbols.zip_source_buffer_create(
        data,
        len,
        freep,
        toPointer(error),
    );
    return r ? new ZipSourceT(r, data) : null;
}

/**
 * Close zip archive
 * @description
 * Writes any changes made to archive to disk. If archive contains no files,
 * the file is completely removed (no empty archive is written), unless the
 * archive flag {@linkcode ZipArchiveGlobalFlags.CREATE_OR_KEEP_FILE_FOR_EMPTY_ARCHIVE} is set.
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
export function zip_close(archive: ZipT): boolean {
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
export function zip_discard(archive: ZipT): void {
    return lib.symbols.zip_discard(toPointer(archive));
}
