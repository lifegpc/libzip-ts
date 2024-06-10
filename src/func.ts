import lib from "./ffi.ts";
import type { IntPointer, PointerObj, ZipErrorT, ZipStatT } from "./types.ts";
import { ZipFileT, ZipSourceT, ZipT } from "./types.ts";
import type {
    ZipArchiveGlobalFlags,
    ZipCM,
    ZipFlags,
    ZipLength,
    ZipOpenFlag,
} from "./consts.ts";

function getCString(p: Deno.PointerObject, offset?: number) {
    const v = new Deno.UnsafePointerView(p);
    return v.getCString(offset);
}

function toPointer<T extends PointerObj>(p?: T) {
    if (p === undefined) return Deno.UnsafePointer.create(0n);
    return p.obj;
}

const t = new TextEncoder();

/**
 * return run-time version of libzip library
 *
 * See https://libzip.org/documentation/zip_libzip_version.html
 * @returns {string} return run-time version of libzip library
 */
export function zip_libzip_version(): string {
    return getCString(lib.symbols.zip_libzip_version()!);
}

/**
 * Open a zip archive.
 *
 * See https://libzip.org/documentation/zip_open.html
 * @param path Path to zip archive.
 * @param flags Open flags. See {@linkcode ZipOpenFlag}.
 * @param errorp The pointer to receive the corresponding error code.
 * @returns A zip archive pointer if open successfully.
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
 *
 * Opens a zip archive encapsulated by the zip_source zs using the provided flags. In case of error, the zip_error ze is filled in.
 *
 * See https://libzip.org/documentation/zip_open_from_source.html
 * @param zs Source.
 * @param flags Open flags. See {@linkcode ZipOpenFlag}
 * @param ze The pointer to receive the corresponding error.
 * @returns A zip archive pointer if open successfully.
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
 *
 * The zip archive specified by the open file descriptor fd is opened and
 * a pointer to a struct zip, used to manipulate the archive, is returned.
 * In contrast to {@linkcode zip_open}, using {@linkcode zip_fdopen} the
 * archive can only be opened in read-only mode.
 * The fd argument may not be used any longer after calling zip_fdopen.
 * The flags are specified to {@linkcode ZipOpenFlag.CHECKCONS} or 0.
 *
 * See https://libzip.org/documentation/zip_fdopen.html
 * @param fd The file descriptor
 * @param flags Open flags. Can be {@linkcode ZipOpenFlag.CHECKCONS} or 0.
 * @param errorp The pointer to receive the corresponding error code.
 * @returns Upon successful completion {@linkcode zip_fdopen} returns a struct zip pointer,
 * and fd should not be used any longer, nor passed to close.
 * Otherwise, NULL is returned and *errorp is set to indicate the error.
 * In the error case, fd remains unchanged.
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
 *
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
 *
 * See https://libzip.org/documentation/zip_name_locate.html
 * @param archive Zip archive
 * @param fname File name
 * @param flags Flags. See {@linkcode ZipFlags}
 * @returns the index of the file named fname or -1, if archive does not contain an entry of that name.
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
 *
 * The {@linkcode zip_fopen} function opens the file name fname in archive.
 * The flags argument specifies how the name lookup should be done,
 * according to the values are described in {@linkcode zip_name_locate}.
 * Also, the following values may be or'ed to it: {@linkcode ZipFlags.COMPRESSED},
 * {@linkcode ZipFlags.UNCHANGED}.
 *
 * If encrypted data is encountered, the functions call {@linkcode zip_fopen_encrypted}
 * or {@linkcode zip_fopen_index_encrypted} respectively, using the default password
 * set with {@linkcode zip_set_default_password}.
 *
 * See https://libzip.org/documentation/zip_fopen.html
 * @param archive Zip archive
 * @param fname File name
 * @param flags Flags. See {@linkcode ZipFlags}
 * @returns Upon successful completion, a {@linkcode ZipFileT} pointer is returned.
 * Otherwise, null is returned and the error code in archive is set to indicate the error.
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
 *
 * The {@linkcode zip_fopen_index} function opens the file at position index.
 *
 * If encrypted data is encountered, the functions call {@linkcode zip_fopen_encrypted}
 * or {@linkcode zip_fopen_index_encrypted} respectively, using the default password
 * set with {@linkcode zip_set_default_password}.
 *
 * See https://libzip.org/documentation/zip_fopen_index.html
 * @param archive Zip archive
 * @param index File index
 * @param flags Flags. See {@linkcode ZipFlags}
 * @returns Upon successful completion, a {@linkcode ZipFileT} pointer is returned.
 * Otherwise, null is returned and the error code in archive is set to indicate the error.
 */
export function zip_fopen_index(
    archive: ZipT,
    index: number | bigint,
    flags: ZipFlags | number,
): ZipFileT | null {
    const re = lib.symbols.zip_fopen_index(
        toPointer(archive),
        BigInt(index),
        flags,
    );
    return re ? new ZipFileT(re) : null;
}

/**
 * open encrypted file in zip archive for reading
 *
 * The {@linkcode zip_fopen_encrypted} function opens the encrypted file name fname
 * in archive using the password given in the password argument.
 * If password is null or the empty string, the default password is used (see
 * {@linkcode zip_set_default_password}).
 * The flags argument are the same as for {@linkcode zip_fopen}.
 *
 * See https://libzip.org/documentation/zip_fopen_encrypted.html
 * @param archive Zip archive.
 * @param fname File name.
 * @param flags Flags. See {@linkcode ZipFlags}
 * @param password Password.
 * @returns Upon successful completion, a {@linkcode ZipFileT} pointer is returned.
 * Otherwise, null is returned and the error code in archive is set to indicate the error.
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
 *
 * The {@linkcode zip_fopen_index_encrypted} function opens the file at position index,
 * see {@linkcode zip_fopen_index}.
 * These functions are called automatically by {@linkcode zip_fopen};
 * you only need to call them if you want to specify a non-default password
 * (see {@linkcode zip_set_default_password}).
 *
 * See https://libzip.org/documentation/zip_fopen_index_encrypted.html
 * @param archive Zip archive.
 * @param index File index.
 * @param flags Flags. See {@linkcode ZipFlags}
 * @param password Password.
 * @returns Upon successful completion, a {@linkcode ZipFileT} pointer is returned.
 * Otherwise, null is returned and the error code in archive is set to indicate the error.
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
        BigInt(index),
        flags,
        password,
    );
    return re ? new ZipFileT(re) : null;
}

/**
 * read from file
 *
 * The {@linkcode zip_fread} function read from file into buf from the current position in the
 * file (see {@linkcode zip_fseek}). After reading, the current position is updated by the
 * number of bytes read.
 *
 * See https://libzip.org/documentation/zip_fopen_index_encrypted.html
 * @param file Zip file
 * @param buf Buffer
 * @returns If successful, the number of bytes actually read is returned.
 * When {@linkcode zip_fread} is called after reaching the end of the file, 0 is returned.
 * In case of error, -1 is returned.
 */
export function zip_fread(file: ZipFileT, buf: Uint8Array): number | bigint {
    return lib.symbols.zip_fread(
        toPointer(file),
        Deno.UnsafePointer.of(buf),
        BigInt(buf.length),
    );
}

/**
 * seek in file
 *
 * The {@linkcode zip_fseek} function seeks to the specified offset relative to whence, just like
 * [fseek](https://man7.org/linux/man-pages/man3/ftell.3.html).
 * {@linkcode zip_fseek} only works on uncompressed (stored), unencrypted data.
 * When called on compressed or encrypted data it will return an error.
 *
 * See https://libzip.org/documentation/zip_fseek.html
 * @param file Zip file
 * @param offset Offset
 * @param whence Base position
 * @returns If successful, {@linkcode zip_fseek} returns true. Otherwise, false is returned.
 */
export function zip_fseek(
    file: ZipFileT,
    offset: number | bigint,
    whence: number,
): boolean {
    return lib.symbols.zip_fseek(toPointer(file), BigInt(offset), whence) == 0;
}

/**
 * Check if a file is seekable
 *
 * See https://libzip.org/documentation/zip_file_is_seekable.html
 * @param file Zip file
 * @returns 1 if a file is seekable and 0 if not. On an invalid argument, it returns -1.
 */
export function zip_file_is_seekable(file: ZipFileT): number {
    return lib.symbols.zip_file_is_seekable(toPointer(file));
}

/**
 * tell position in file
 *
 * The {@linkcode zip_ftell} function reports the current offset in the file.
 *
 * See https://libzip.org/documentation/zip_ftell.html
 * @param file Zip file
 * @returns If successful, {@linkcode zip_ftell} returns the current file position.
 * Otherwise, -1 is returned.
 */
export function zip_ftell(file: ZipFileT): number | bigint {
    return lib.symbols.zip_ftell(toPointer(file));
}

/**
 * close file in zip archive
 *
 * The {@linkcode zip_fclose} function closes file and frees the memory allocated for it.
 *
 * See https://libzip.org/documentation/zip_fclose.html
 * @param file Zip file
 * @returns Upon successful completion 0 is returned. Otherwise, the error code is returned.
 */
export function zip_fclose(file: ZipFileT): number {
    return lib.symbols.zip_fclose(toPointer(file));
}

/**
 * get information about file
 *
 * The {@linkcode zip_stat} function obtains information about the file named fname in archive.
 * The flags argument specifies how the name lookup should be done.
 * Its values are described in {@linkcode zip_name_locate}.
 * Also, {@linkcode ZipFlags.UNCHANGED} may be or'ed to it to request information about the
 * original file in the archive, ignoring any changes made.
 *
 * See https://libzip.org/documentation/zip_stat.html
 * @param archive Zip archive
 * @param fname File name
 * @param flags Flags. See {@linkcode ZipFlags}
 * @param sb A pointer to receive stats.
 * @returns Upon successful completion true is returned. Otherwise, false is returned and the error information in archive is set to indicate the error.
 */
export function zip_stat(
    archive: ZipT,
    fname: string | BufferSource,
    flags: ZipFlags | number,
    sb: ZipStatT,
): boolean {
    if (typeof fname === "string") {
        fname = t.encode(fname);
    }
    return lib.symbols.zip_stat(
        toPointer(archive),
        fname,
        flags,
        toPointer(sb),
    ) == 0;
}

/**
 * get information about file
 *
 * The {@linkcode zip_stat_index} function obtains information about the file at position index.
 *
 * See https://libzip.org/documentation/zip_stat_index.html
 * @param archive Zip archive
 * @param index file index
 * @param flags {@linkcode ZipFlags.UNCHANGED} may be or'ed to it to request information about the original file in the archive, ignoring any changes made.
 * @param sb A pointer to receive stats.
 * @returns Upon successful completion true is returned. Otherwise, false is returned and the error information in archive is set to indicate the error.
 */
export function zip_stat_index(
    archive: ZipT,
    index: number | bigint,
    flags: ZipFlags | number,
    sb: ZipStatT,
): boolean {
    return lib.symbols.zip_stat_index(
        toPointer(archive),
        BigInt(index),
        flags,
        toPointer(sb),
    ) == 0;
}

/**
 * return if a compression method is supported
 *
 * The zip_compression_method_supported() returns if the compression method method is supported for compression (if compress is true) or decompression (otherwise).
 *
 * See https://libzip.org/documentation/zip_compression_method_supported.html
 * @param method Compression method
 * @param compress check compression or decompression.
 * @returns true if the method is supported, false otherwise.
 */
export function zip_compression_method_supported(
    method: ZipCM,
    compress: boolean,
): boolean {
    return lib.symbols.zip_compression_method_supported(
        method,
        compress ? 0 : 1,
    ) == 1;
}

/**
 * get name of file by index
 *
 * The {@linkcode zip_get_name} function returns the name of the file at position index in archive.
 * The name is in UTF-8 encoding unless {@linkcode ZipFlags.ENC_RAW} was specified.
 * If flags is set to {@linkcode ZipFlags.UNCHANGED}, the original unchanged filename is returned.
 * The returned string must not be modified or freed, and becomes invalid when archive is closed.
 *
 * See https://libzip.org/documentation/zip_get_name.html
 * @param archive Zip archive
 * @param index File index
 * @param flags Flags. See {@linkcode ZipFlags}
 * @returns Upon successful completion, the name is returned. Otherwise, null and the error code in archive is set to indicate the error.
 */
export function zip_get_name(
    archive: ZipT,
    index: number | bigint,
    flags: ZipFlags | number,
): string | null {
    const re = lib.symbols.zip_get_name(
        toPointer(archive),
        BigInt(index),
        flags,
    );
    return re ? getCString(re) : null;
}

/**
 * get number of entries in archive
 *
 * The {@linkcode zip_get_num_entries} function returns the number of entries in archive.
 * Entries are all files that are present in the original archive or that were added while
 * the archive is open. This includes deleted files, since indices are not renumbered until
 * the archive is closed. (This allows to refer to deleted files, e. g. to undelete them.)
 * If flags is set to {@linkcode ZipFlags.UNCHANGED}, the original number of files is returned.
 *
 * See https://libzip.org/documentation/zip_get_num_entries.html
 * @param archive Zip archive
 * @param flags Flags. See {@linkcode ZipFlags}
 * @returns the number of entries in the zip archive.
 */
export function zip_get_num_entries(
    archive: ZipT,
    flags: ZipFlags | number,
): number | bigint {
    return lib.symbols.zip_get_num_entries(toPointer(archive), flags);
}

/**
 * set default password for encrypted files in zip
 *
 * The {@linkcode zip_set_default_password} function sets the default password used when accessing
 * encrypted files. If password is null or the empty string, the default password is unset.
 * If you prefer a different password for single files, use {@linkcode zip_fopen_encrypted} instead
 * of {@linkcode zip_fopen}. Usually, however, the same password is used for every file in
 * an zip archive.
 *
 * The password is not verified when calling this function.
 * See the [CAVEATS](https://libzip.org/documentation/zip_fopen_encrypted.html#CAVEATS) section
 * in {@linkcode zip_fopen_encrypted} for more details about password handling.
 *
 * See https://libzip.org/documentation/zip_set_default_password.html
 * @param archive Zip archive
 * @param password Password
 * @returns Upon successful completion true is returned.
 * Otherwise, false is returned and the error information in archive is set to indicate the error.
 */
export function zip_set_default_password(
    archive: ZipT,
    password: string | BufferSource | null,
): boolean {
    if (typeof password === "string") {
        password = t.encode(password);
    }
    return lib.symbols.zip_set_default_password(toPointer(archive), password) ==
        0;
}

/**
 * add directory to zip archive
 *
 * The function {@linkcode zip_dir_add} adds a directory to a zip archive.
 * The argument archive specifies the zip archive to which the directory should be added.
 * name is the directory's name in the zip archive.
 * This function adds an entry to the archive. It does not check whether a directory with
 * that name exists in the file system, nor does it add its contents if it does.
 *
 * See https://libzip.org/documentation/zip_dir_add.html
 * @param archive Zip archive
 * @param name Directory's name
 * @param flags Flags. See {@linkcode ZipFlags}
 * @returns Upon successful completion, the index of the new entry in the archive is returned.
 * Otherwise, -1 is returned and the error code in archive is set to indicate the error.
 */
export function zip_dir_add(
    archive: ZipT,
    name: string | BufferSource,
    flags: ZipFlags | number,
): number | bigint {
    if (typeof name === "string") {
        name = t.encode(name);
    }
    return lib.symbols.zip_dir_add(toPointer(archive), name, flags);
}

/**
 * add file to zip archive
 *
 * See https://libzip.org/documentation/zip_file_add.html
 * @param archive specifies the zip archive to which the file should be added
 * @param name the file's name in the zip archive.
 * @param source Data source.
 * @param flags Flags. see {@linkcode ZipFlags}
 * @returns Upon successful completion, returns the index of the new file in the archive.
 * Otherwise, -1 is returned and the error code in archive is set to indicate the error.
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
 * replace file in zip archive
 *
 * replaces an existing file in a zip archive.
 *
 * See https://libzip.org/documentation/zip_file_replace.html
 * @param archive Zip archive
 * @param index Which file should be replaced
 * @param source Data source.
 * @param flags Flags. see {@linkcode ZipFlags}
 * @returns Upon successful completion, returns true.
 * Otherwise, false is returned and the error code in archive is set to indicate the error.
 */
export function zip_file_replace(
    archive: ZipT,
    index: number | bigint,
    source: ZipSourceT,
    flags: ZipFlags | number,
): boolean {
    return lib.symbols.zip_file_replace(
        toPointer(archive),
        BigInt(index),
        toPointer(source),
        flags,
    ) == 0;
}

/**
 * set comment for file in zip
 *
 * The {@linkcode zip_file_set_comment} function sets the comment for the file at position index
 * in the zip archive to comment of length len. If comment is null and len is 0, the file comment
 * will be removed.
 *
 * See https://libzip.org/documentation/zip_file_set_comment.html
 * @param archive Zip archive
 * @param index File index
 * @param comment Comment
 * @param len The length for comment
 * @param flags Flags. see {@linkcode ZipFlags}
 * @returns Upon successful completion true is returned.
 * Otherwise, false is returned and the error information in archive is set to indicate the error.
 */
export function zip_file_set_comment(
    archive: ZipT,
    index: number | bigint,
    comment: BufferSource | null,
    len: number,
    flags: ZipFlags | number,
): boolean {
    return lib.symbols.zip_file_set_comment(
        toPointer(archive),
        BigInt(index),
        comment,
        len,
        flags,
    ) == 0;
}

/**
 * set compression method for file in zip
 *
 * The {@linkcode zip_set_file_compression} function sets the compression method for the file at
 * position index in the zip archive to comp with the compression method specific comp_flags.
 *
 * See https://libzip.org/documentation/zip_set_file_compression.html
 * @param archive Zip archive
 * @param index File index
 * @param comp is the same as returned by {@linkcode zip_stat}. See {@linkcode ZipCM}
 * @param comp_flags The compression level.
 * @returns Upon successful completion true is returned.
 * Otherwise, false is returned and the error information in archive is set to indicate the error.
 */
export function zip_set_file_compression(
    archive: ZipT,
    index: number | bigint,
    comp: ZipCM,
    comp_flags: number,
): boolean {
    return lib.symbols.zip_set_file_compression(
        toPointer(archive),
        BigInt(index),
        comp,
        comp_flags,
    ) == 0;
}

/**
 * get status flags for zip
 *
 * The {@linkcode zip_get_archive_flag} function returns if the flag flag is set
 * for the archive archive. The archive flags might have been changed with
 * {@linkcode zip_set_archive_flag}; if flags is set to {@linkcode ZipFlags.UNCHANGED},
 * the original unchanged flags are tested.
 *
 * See https://libzip.org/documentation/zip_get_archive_flag.html
 * @param archive Zip archive
 * @param flag Zip status flags. See {@linkcode ZipArchiveGlobalFlags}
 * @param flags Zip flags.
 * @returns 1 if flag is set for archive, 0 if not, and -1 if an error occurred.
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
 *
 * The functions {@linkcode zip_source_buffer} and {@linkcode zip_source_buffer_create}
 * create a zip source from the buffer data of size len. If freep is non-zero, the buffer
 * will be freed when it is no longer needed. data must remain valid for the lifetime of
 * the created source.
 *
 * The source can be used to open a zip archive from.
 *
 * See https://libzip.org/documentation/zip_source_buffer.html
 * @param archive Zip archive
 * @param data Buffer
 * @param len Data length
 * @param freep non-zero if the buffer will be freed when it is no longer needed.
 * @returns Upon successful completion, the created source is returned.
 * Otherwise, null is returned and the error code in archive is set to indicate the error.
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
        BigInt(len),
        freep,
    );
    return r ? new ZipSourceT(r, data) : null;
}

/**
 * create zip data source from buffer
 *
 * The functions {@linkcode zip_source_buffer} and {@linkcode zip_source_buffer_create}
 * create a zip source from the buffer data of size len. If freep is non-zero, the buffer
 * will be freed when it is no longer needed. data must remain valid for the lifetime of
 * the created source.
 *
 * The source can be used to open a zip archive from.
 *
 * See https://libzip.org/documentation/zip_source_buffer_create.html
 * @param data Buffer
 * @param len Data length
 * @param freep non-zero if the buffer will be freed when it is no longer needed.
 * @param error The pointer to receive the corresponding error.
 * @returns Upon successful completion, the created source is returned.
 * Otherwise, null is returned and the error is set is set to indicate the error.
 */
export function zip_source_buffer_create(
    data: BufferSource | null,
    len: number | bigint,
    freep: number,
    error?: ZipErrorT,
): ZipSourceT | null {
    const r = lib.symbols.zip_source_buffer_create(
        data,
        BigInt(len),
        freep,
        toPointer(error),
    );
    return r ? new ZipSourceT(r, data) : null;
}

/**
 * create data source from a file
 *
 * See https://libzip.org/documentation/zip_source_file.html
 * @param archive Zip archive
 * @param fname The path to the file.
 * @param start Offset
 * @param len Length of data. See {@linkcode ZipLength}
 * @returns Upon successful completion, the created source is returned.
 * Otherwise, null is returned and the error code in archive is set to indicate the error.
 */
export function zip_source_file(
    archive: ZipT,
    fname: string | BufferSource,
    start: number | bigint,
    len: number | bigint | ZipLength,
): ZipSourceT | null {
    if (typeof fname === "string") {
        fname = t.encode(fname);
    }
    const r = lib.symbols.zip_source_file(
        toPointer(archive),
        fname,
        BigInt(start),
        BigInt(len),
    );
    return r ? new ZipSourceT(r) : null;
}

/**
 * create data source from a file
 *
 * See https://libzip.org/documentation/zip_source_file_create.html
 * @param fname The path to the file.
 * @param start Offset
 * @param len Length of data. See {@linkcode ZipLength}
 * @param error The pointer to receive the corresponding error.
 * @returns Upon successful completion, the created source is returned.
 * Otherwise, null is returned and the error is set to indicate the error.
 */
export function zip_source_file_create(
    fname: string | BufferSource,
    start: number | bigint,
    len: number | bigint | ZipLength,
    error?: ZipErrorT,
): ZipSourceT | null {
    if (typeof fname === "string") {
        fname = t.encode(fname);
    }
    const r = lib.symbols.zip_source_file_create(
        fname,
        BigInt(start),
        BigInt(len),
        toPointer(error),
    );
    return r ? new ZipSourceT(r) : null;
}

/**
 * free zip data source
 *
 * Decrements the reference count of source and frees it if the reference count drops to 0.
 * If source is null, it does nothing.
 *
 * NOTE: This function should not be called on a source after it was used successfully in a
 * {@linkcode zip_open_from_source}, {@linkcode zip_file_add}, or {@linkcode zip_file_replace} call.
 *
 * https://libzip.org/documentation/zip_source_free.html
 * @param source Data source
 */
export function zip_source_free(source?: ZipSourceT): void {
    lib.symbols.zip_source_free(toPointer(source));
}

/**
 * delete file from zip archive
 *
 * The file at position index in the zip archive archive is marked as deleted.
 *
 * See https://libzip.org/documentation/zip_delete.html
 * @param archive Zip archive
 * @param index File index
 * @returns Upon successful completion true is returned.
 * Otherwise, false is returned and the error code in archive is set to indicate the error.
 */
export function zip_delete(archive: ZipT, index: number | bigint): boolean {
    return lib.symbols.zip_delete(toPointer(archive), BigInt(index)) == 0;
}

/**
 * Close zip archive
 *
 * Writes any changes made to archive to disk. If archive contains no files,
 * the file is completely removed (no empty archive is written), unless the
 * archive flag {@linkcode ZipArchiveGlobalFlags.CREATE_OR_KEEP_FILE_FOR_EMPTY_ARCHIVE} is set.
 * If successful, archive is freed. Otherwise archive is left unchanged and must still be freed.
 *
 * To close and free a zip archive without saving changes, use {@linkcode zip_discard}.
 *
 * Progress updates for GUIs can be implemented using {@linkcode zip_register_progress_callback_with_state}.
 * Cancelling the write of an archive during {@linkcode zip_close} can be implemented using {@linkcode zip_register_cancel_callback_with_state}.
 *
 * See https://libzip.org/documentation/zip_close.html
 * @param archive Zip archive pointer
 * @returns Upon successful completion true is returned. Otherwise, false is returned and the error code in archive is set to indicate the error.
 */
export function zip_close(archive: ZipT): boolean {
    return lib.symbols.zip_close(toPointer(archive)) == 0;
}

/**
 * Close zip archive and discard changes
 *
 * Closes archive and frees the memory allocated for it.
 * Any changes to the archive are not written to disk and discarded.
 *
 * See https://libzip.org/documentation/zip_discard.html
 * @param archive Zip archive pointer
 */
export function zip_discard(archive: ZipT): void {
    return lib.symbols.zip_discard(toPointer(archive));
}

/**
 * create human-readable string for {@linkcode ZipErrorT}
 *
 * The {@linkcode zip_error_strerror} function returns an error message string corresponding
 * to ze like [strerror](https://man7.org/linux/man-pages/man3/strerror.3.html).
 * This string will stay valid until the next call to {@linkcode zip_error_strerror} or
 * until {@linkcode zip_error_fini} is called.
 *
 * See https://libzip.org/documentation/zip_error_strerror.html
 * @param ze error
 * @returns error message
 */
export function zip_error_strerror(ze: ZipErrorT): string {
    const re = lib.symbols.zip_error_strerror(toPointer(ze));
    return getCString(re!);
}

/**
 * get string representation for a zip error
 *
 * returns a string describing the last error for a zip file.
 *
 * See https://libzip.org/documentation/zip_file_strerror.html
 * @param file Zip file
 * @returns error string
 */
export function zip_file_strerror(file: ZipFileT): string {
    const re = lib.symbols.zip_file_strerror(toPointer(file));
    return getCString(re!);
}

/**
 * get string representation for a zip error
 *
 * returns a string describing the last error for the zip archive
 *
 * See https://libzip.org/documentation/zip_strerror.html
 * @param archive Zip archive
 * @returns error string
 */
export function zip_strerror(archive: ZipT): string {
    const re = lib.symbols.zip_strerror(toPointer(archive));
    return getCString(re!);
}

/**
 * initialize {@linkcode ZipErrorT} structure
 *
 * See https://libzip.org/documentation/zip_error_init.html
 * @param error Error
 */
export function zip_error_init(error: ZipErrorT): void {
    lib.symbols.zip_error_init(toPointer(error));
}

/**
 * initialize {@linkcode ZipErrorT} structure
 *
 * See https://libzip.org/documentation/zip_error_init_with_code.html
 * @param error Error
 * @param ze zip error code
 */
export function zip_error_init_with_code(error: ZipErrorT, ze: number): void {
    lib.symbols.zip_error_init_with_code(toPointer(error), ze);
}

/**
 * clean up {@linkcode ZipErrorT} structure
 *
 * See https://libzip.org/documentation/zip_error_fini.html
 * @param error error
 */
export function zip_error_fini(error: ZipErrorT): void {
    lib.symbols.zip_error_fini(toPointer(error));
}
