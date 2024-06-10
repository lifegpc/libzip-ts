/**
 * Constants of libzip
 */
/**
 * Flags when opening file
 * @see https://libzip.org/documentation/zip_open.html#DESCRIPTION
 */
export enum ZipOpenFlag {
    /**
     * Error if archive already exists.
     * @see https://libzip.org/documentation/zip_open.html#ZIP_EXCL
     */
    ZIP_CREATE = 1,
    /**
     * Error if archive already exists.
     * @see https://libzip.org/documentation/zip_open.html#ZIP_EXCL
     */
    EXCL = 2,
    /**
     * Perform additional stricter consistency checks on the archive, and error if they fail.
     * @see https://libzip.org/documentation/zip_open.html#ZIP_CHECKCONS
     */
    CHECKCONS = 4,
    /**
     * If archive exists, ignore its current contents. In other words, handle it the same way as an empty archive.
     * @see https://libzip.org/documentation/zip_open.html#ZIP_TRUNCATE
     */
    TRUNCATE = 8,
    /**
     * Open archive in read-only mode.
     * @see https://libzip.org/documentation/zip_open.html#ZIP_RDONLY
     */
    RDONLY = 16,
}

/**
 * archive global flags
 * @see https://libzip.org/documentation/zip_get_archive_flag.html#DESCRIPTION
*/
export enum ZipArchiveGlobalFlags {
    /**
     * read only -- cannot be cleared
     * @see https://libzip.org/documentation/zip_get_archive_flag.html#ZIP_AFL_RDONLY
     */
    RDONLY = 2,
    /**
     * current archive is torrentzipped
     * @see https://libzip.org/documentation/zip_get_archive_flag.html#ZIP_AFL_IS_TORRENTZIP
     */
    IS_TORRENTZIP = 4,
    /**
     * write archive in torrentzip format
     * @see https://libzip.org/documentation/zip_get_archive_flag.html#ZIP_AFL_WANT_TORRENTZIP
     */
    WANT_TORRENTZIP = 8,
    /**
     * don't remove file if archive is empty
     * @see https://libzip.org/documentation/zip_get_archive_flag.html#ZIP_AFL_CREATE_OR_KEEP_FILE_FOR_EMPTY_ARCHIVE
     */
    CREATE_OR_KEEP_FILE_FOR_EMPTY_ARCHIVE = 16,
}

/**
 * flags for zip_name_locate, zip_fopen, zip_stat, ...
 */
export enum ZipFlags {
    /**
     * ignore case on name lookup
     * @see https://libzip.org/documentation/zip_name_locate.html#ZIP_FL_NOCASE
     */
    NOCASE = 1,
    /**
     * ignore directory component
     * @see https://libzip.org/documentation/zip_name_locate.html#ZIP_FL_NODIR
     */
    NODIR = 2,
    /**
     * read compressed data
     * @see https://libzip.org/documentation/zip_fopen.html#ZIP_FL_COMPRESSED
     */
    COMPRESSED = 4,
    /**
     * use original data, ignoring changes
     * @see https://libzip.org/documentation/zip_fopen.html#ZIP_FL_UNCHANGED
     */
    UNCHANGED = 8,
    /**
     * @deprecated
     */
    RECOMPRESS = 16,
    /**
     * read encrypted data (implies {@linkcode COMPRESSED})
     */
    ENCRYPTED = 32,
    /**
     * guess string encoding (is default)
     * @see https://libzip.org/documentation/zip_name_locate.html#ZIP_FL_ENC_GUESS
     */
    ENC_GUESS = 0,
    /**
     * get unmodified string
     * @see https://libzip.org/documentation/zip_name_locate.html#ZIP_FL_ENC_RAW
     */
    ENC_RAW = 64,
    /**
     * follow specification strictly
     * @see https://libzip.org/documentation/zip_name_locate.html#ZIP_FL_ENC_STRICT
     */
    ENC_STRICT = 128,
    /**
     * in local header
     */
    LOCAL = 256,
    /**
     * in central directory
     */
    CENTRAL = 512,
    /**
     * string is UTF-8 encoded
     * @see https://libzip.org/documentation/zip_name_locate.html#ZIP_FL_ENC_UTF_8
     */
    ENC_UTF_8 = 2048,
    /**
     * string is CP437 encoded
     * @see https://libzip.org/documentation/zip_name_locate.html#ZIP_FL_ENC_CP437
     */
    ENC_CP437 = 4096,
    /**
     * zip_file_add: if file with name exists, overwrite (replace) it
     * @see https://libzip.org/documentation/zip_file_add.html#ZIP_FL_OVERWRITE
     */
    OVERWRITE = 8192,
}

