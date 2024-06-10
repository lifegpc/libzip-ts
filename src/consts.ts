/**
 * Constants of libzip
 */
/**
 * Flags when opening file
 *
 * See https://libzip.org/documentation/zip_open.html#DESCRIPTION
 */
export enum ZipOpenFlag {
    /**
     * Error if archive already exists.
     *
     * See https://libzip.org/documentation/zip_open.html#ZIP_EXCL
     */
    ZIP_CREATE = 1,
    /**
     * Error if archive already exists.
     *
     * See https://libzip.org/documentation/zip_open.html#ZIP_EXCL
     */
    EXCL = 2,
    /**
     * Perform additional stricter consistency checks on the archive, and error if they fail.
     *
     * See https://libzip.org/documentation/zip_open.html#ZIP_CHECKCONS
     */
    CHECKCONS = 4,
    /**
     * If archive exists, ignore its current contents. In other words, handle it the same way as an empty archive.
     *
     * See https://libzip.org/documentation/zip_open.html#ZIP_TRUNCATE
     */
    TRUNCATE = 8,
    /**
     * Open archive in read-only mode.
     *
     * See https://libzip.org/documentation/zip_open.html#ZIP_RDONLY
     */
    RDONLY = 16,
}

/**
 * archive global flags
 *
 * See https://libzip.org/documentation/zip_get_archive_flag.html#DESCRIPTION
 */
export enum ZipArchiveGlobalFlags {
    /**
     * read only -- cannot be cleared
     *
     * See https://libzip.org/documentation/zip_get_archive_flag.html#ZIP_AFL_RDONLY
     */
    RDONLY = 2,
    /**
     * current archive is torrentzipped
     *
     * See https://libzip.org/documentation/zip_get_archive_flag.html#ZIP_AFL_IS_TORRENTZIP
     */
    IS_TORRENTZIP = 4,
    /**
     * write archive in torrentzip format
     *
     * See https://libzip.org/documentation/zip_get_archive_flag.html#ZIP_AFL_WANT_TORRENTZIP
     */
    WANT_TORRENTZIP = 8,
    /**
     * don't remove file if archive is empty
     *
     * See https://libzip.org/documentation/zip_get_archive_flag.html#ZIP_AFL_CREATE_OR_KEEP_FILE_FOR_EMPTY_ARCHIVE
     */
    CREATE_OR_KEEP_FILE_FOR_EMPTY_ARCHIVE = 16,
}

/**
 * flags for zip_name_locate, zip_fopen, zip_stat, ...
 */
export enum ZipFlags {
    /**
     * ignore case on name lookup
     *
     * See https://libzip.org/documentation/zip_name_locate.html#ZIP_FL_NOCASE
     */
    NOCASE = 1,
    /**
     * ignore directory component
     *
     * See https://libzip.org/documentation/zip_name_locate.html#ZIP_FL_NODIR
     */
    NODIR = 2,
    /**
     * read compressed data
     *
     * See https://libzip.org/documentation/zip_fopen.html#ZIP_FL_COMPRESSED
     */
    COMPRESSED = 4,
    /**
     * use original data, ignoring changes
     *
     * See https://libzip.org/documentation/zip_fopen.html#ZIP_FL_UNCHANGED
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
     *
     * See https://libzip.org/documentation/zip_name_locate.html#ZIP_FL_ENC_GUESS
     */
    ENC_GUESS = 0,
    /**
     * get unmodified string
     *
     * See https://libzip.org/documentation/zip_name_locate.html#ZIP_FL_ENC_RAW
     */
    ENC_RAW = 64,
    /**
     * follow specification strictly
     *
     * See https://libzip.org/documentation/zip_name_locate.html#ZIP_FL_ENC_STRICT
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
     *
     * See https://libzip.org/documentation/zip_name_locate.html#ZIP_FL_ENC_UTF_8
     */
    ENC_UTF_8 = 2048,
    /**
     * string is CP437 encoded
     *
     * See https://libzip.org/documentation/zip_name_locate.html#ZIP_FL_ENC_CP437
     */
    ENC_CP437 = 4096,
    /**
     * zip_file_add: if file with name exists, overwrite (replace) it
     *
     * See https://libzip.org/documentation/zip_file_add.html#ZIP_FL_OVERWRITE
     */
    OVERWRITE = 8192,
}

/**
 * Zip stat fields
 *
 * See https://libzip.org/documentation/zip_stat.html#DESCRIPTION
 */
export enum ZipStat {
    /**
     * name of the file
     *
     * See https://libzip.org/documentation/zip_stat.html#ZIP_STAT_NAME
     */
    NAME = 0x0001,
    /**
     * index within archive
     *
     * See https://libzip.org/documentation/zip_stat.html#ZIP_STAT_INDEX
     */
    INDEX = 0x0002,
    /**
     * size of file (uncompressed)
     *
     * See https://libzip.org/documentation/zip_stat.html#ZIP_STAT_SIZE
     */
    SIZE = 0x0004,
    /**
     * size of file (compressed)
     *
     * See https://libzip.org/documentation/zip_stat.html#ZIP_STAT_COMP_SIZE
     */
    COMP_SIZE = 0x0008,
    /**
     * modification time
     *
     * See https://libzip.org/documentation/zip_stat.html#ZIP_STAT_MTIME
     */
    MTIME = 0x0010,
    /**
     * crc of file data
     *
     * See https://libzip.org/documentation/zip_stat.html#ZIP_STAT_CRC
     */
    CRC = 0x0020,
    /**
     * compression method used
     *
     * See https://libzip.org/documentation/zip_stat.html#ZIP_STAT_COMP_METHOD
     */
    COMP_METHOD = 0x0040,
    /**
     * encryption method used
     *
     * See https://libzip.org/documentation/zip_stat.html#ZIP_STAT_ENCRYPTION_METHOD
     */
    ENCRYPTION_METHOD = 0x0080,
    /**
     * flags - reserved for future use
     *
     * See https://libzip.org/documentation/zip_stat.html#ZIP_STAT_FLAGS
     */
    FLAGS = 0x0100,
}

/**
 * Zip compression methods
 */
export enum ZipCM {
    /**better of deflate or store*/
    DEFAULT = -1,
    /**stored (uncompressed)*/
    STORE = 0,
    /**shrunk*/
    SHRINK = 1,
    /**reduced with factor 1*/
    REDUCE_1 = 2,
    /**reduced with factor 2*/
    REDUCE_2 = 3,
    /**reduced with factor 3*/
    REDUCE_3 = 4,
    /**reduced with factor 4*/
    REDUCE_4 = 5,
    /**imploded*/
    IMPLODE = 6,
    /**deflated*/
    DEFLATE = 8,
    /**deflate64*/
    DEFLATE64 = 9,
    /**PKWARE imploding*/
    PKWARE_IMPLODE = 10,
    /**compressed using BZIP2 algorithm*/
    BZIP2 = 12,
    /**LZMA (EFS)*/
    LZMA = 14,
    /**compressed using IBM TERSE (new)*/
    TERSE = 18,
    /**IBM LZ77 z Architecture (PFS)*/
    LZ77 = 19,
    /**LZMA 2*/
    LZMA2 = 33,
    /**Zstandard compressed data*/
    ZSTD = 93,
    /**XZ compressed data*/
    XZ = 95,
    /**Compressed Jpeg data*/
    JPEG = 96,
    /**WavPack compressed data*/
    WAVPACK = 97,
    /**PPMd version I, Rev 1*/
    PPMD = 98,
}

/**
 * length parameter to various functions
 */
export enum ZipLength {
    /**Assume length are size when functions are called*/
    TO_END = 0,
    /**
     * only supported by zip_source_file and its variants
     *
     * See https://libzip.org/documentation/zip_source_file.html
     */
    UNCHECKED = -2,
}
