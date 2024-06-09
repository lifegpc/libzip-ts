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
    ZIP_EXCL = 2,
    /**
     * Perform additional stricter consistency checks on the archive, and error if they fail.
     * @see https://libzip.org/documentation/zip_open.html#ZIP_CHECKCONS
     */
    ZIP_CHECKCONS = 4,
    /**
     * If archive exists, ignore its current contents. In other words, handle it the same way as an empty archive.
     * @see https://libzip.org/documentation/zip_open.html#ZIP_TRUNCATE
     */
    ZIP_TRUNCATE = 8,
    /**
     * Open archive in read-only mode.
     * @see https://libzip.org/documentation/zip_open.html#ZIP_RDONLY
     */
    ZIP_RDONLY = 16,
}

/**
 * don't remove file if archive is empty
 */
export const ZIP_AFL_CREATE_OR_KEEP_FILE_FOR_EMPTY_ARCHIVE = 16;
