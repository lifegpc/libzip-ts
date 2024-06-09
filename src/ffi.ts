const symbols = {
    zip_open: {
        parameters: [
            "buffer", // const char* path Nonnull
            "i32", // int flags
            "pointer", // int *errorp Nullable
        ],
        result: "pointer", // zip_t * Nullable
    },
    zip_open_from_source: {
        parameters: [
            "pointer", // zip_source_t *zs Nonnull
            "i32", // int flags
            "pointer", // zip_error_t *ze Nullable
        ],
        result: "pointer", // zip_t * Nullable
    },
    zip_fdopen: {
        parameters: [
            "i32", // int fd
            "i32", // int flags
            "pointer", // int *errorp Nullable
        ],
        result: "pointer", // zip_t * Nullable
    },
    zip_name_locate: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "buffer", // const char *fname Nonnull
            "u32", // zip_flags_t
        ],
        result: "i64",
    },
    zip_fopen: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "buffer", // const char *fname Nonnull
            "u32", // zip_flags_t flags
        ],
        result: "pointer", // zip_file_t * Nullable
    },
    zip_fopen_index: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "u32", // zip_flags_t flags
        ],
        result: "pointer", // zip_file_t * Nullable
    },
    zip_fopen_encrypted: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "buffer", // const char *fname Nonnull
            "u32", // zip_flags_t flags
            "buffer", // const char *password Nullable
        ],
        result: "pointer", // zip_file_t * Nullable
    },
    zip_fopen_index_encrypted: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "u32", // zip_flags_t flags
            "buffer", // const char *password Nullable
        ],
        result: "pointer", // zip_file_t * Nullable
    },
    zip_fread: {
        parameters: [
            "pointer", // zip_file_t *file Nonnull
            "pointer", // void* buf Nonnull
            "u64", // zip_uint64_t nbytes
        ],
        result: "i64",
    },
    zip_fseek: {
        parameters: [
            "pointer", // zip_file_t *file Nonnull
            "i64", // zip_int64_t offset
            "i32", // int whence
        ],
        result: "i8",
    },
    zip_file_is_seekable: {
        parameters: [
            "pointer", // zip_file_t *file Nonnull
        ],
        result: "i32",
    },
    zip_ftell: {
        parameters: [
            "pointer", // zip_file_t *file Nonnull
        ],
        result: "i64",
    },
    zip_fclose: {
        parameters: [
            "pointer", // zip_file_t *file Nonnull
        ],
        result: "i32",
    },
    zip_close: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
        ],
        result: "i32",
    },
    zip_stat: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "buffer", // const char *fname Nonnull
            "u32", // zip_flags_t flags
            "pointer", // zip_stat_t *sb Nonnull
        ],
        result: "i32",
    },
    zip_stat_index: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "u32", // zip_flags_t flags
            "pointer", // zip_stat_t *sb Nonnull
        ],
        result: "i32",
    },
    zip_compression_method_supported: {
        parameters: [
            "i32", // zip_int32_t method
            "i32", // int compress
        ],
        result: "i32",
    },
    zip_encryption_method_supported: {
        parameters: [
            "i16", // zip_int16_t method
            "i32", // int encrypt
        ],
        result: "i32",
    },
    zip_file_get_comment: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "pointer", // zip_uint32_t *lenp Nullable
            "u32", // zip_flags_t flags
        ],
        result: "buffer", // const char * Nullable
    },
    zip_file_get_external_attributes: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "u32", // zip_flags_t flags
            "pointer", // zip_uint8_t *opsys Nullable
            "pointer", // zip_uint32_t *attributes Nullable
        ],
        result: "i32",
    },
    zip_get_archive_comment: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "pointer", // int *lenp Nullable
            "u32", // zip_flags_t flags
        ],
        result: "buffer", // const char * Nullable
    },
    zip_get_archive_flag: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u32", // zip_flags_t flag
            "u32", // zip_flags_t flags
        ],
        result: "i32",
    },
    zip_get_name: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "u32", // zip_flags_t flags
        ],
        result: "buffer", // const char * Nullable
    },
    zip_get_num_entries: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u32", // zip_flags_t flags
        ],
        result: "i64",
    },
    zip_set_default_password: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "buffer", // const char *password Nullable
        ],
        result: "i32",
    },
    zip_dir_add: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "buffer", // const char *name Nonnull
            "u32", // zip_flags_t flags
        ],
        result: "i64",
    },
    zip_file_add: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "buffer", // const char *name Nonnull
            "pointer", // zip_source_t *source Nonnull
            "u32", // zip_flags_t flags
        ],
        result: "i64",
    },
    zip_file_replace: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "pointer", // zip_source_t *source Nonnull
            "u32", // zip_flags_t flags
        ],
        result: "i32",
    },
    zip_file_set_comment: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "buffer", // const char *comment Nullable
            "u16", // zip_uint16_t len
            "u32", // zip_flags_t flags
        ],
        result: "i32",
    },
    zip_file_set_dostime: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "u16", // zip_uint16_t dostime
            "u16", // zip_uint16_t dosdate
            "u32", // zip_flags_t flags
        ],
        result: "i32",
    },
    zip_file_set_mtime: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "i64", // time_t mtime
            "u32", // zip_flags_t flags
        ],
        result: "i32",
    },
    zip_set_file_compression: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "i32", // zip_int32_t comp
            "u32", // zip_uint32_t comp_flags
        ],
        result: "i32",
    },
    zip_source_buffer: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "pointer", // const void *data Nullable
            "u64", // zip_uint64_t len
            "i32", // int freep
        ],
        result: "pointer", // zip_source_t * Nullable
    },
    zip_source_buffer_create: {
        parameters: [
            "pointer", // const void *data Nullable
            "u64", // zip_uint64_t len
            "i32", // int freep
            "pointer", // zip_error_t *error Nullable
        ],
        result: "pointer", // zip_source_t * Nullable
    },
    zip_source_file: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "pointer", // const char *fname Nonnull
            "u64", // zip_uint64_t start
            "i64", // zip_int64_t len
        ],
        result: "pointer", // zip_source_t * Nullable
    },
    zip_source_file_create: {
        parameters: [
            "pointer", // const char *fname Nonnull
            "u64", // zip_uint64_t start
            "i64", // zip_int64_t len
            "pointer", // zip_error_t *error Nullable
        ],
        result: "pointer", // zip_source_t * Nullable
    },
    zip_source_filep: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "pointer", // FILE *file Nonnull
            "u64", // zip_uint64_t start
            "i64", // zip_int64_t len
        ],
        result: "pointer", // zip_source_t * Nullable
    },
    zip_source_filep_create: {
        parameters: [
            "pointer", // FILE *file Nonnull
            "u64", // zip_uint64_t start
            "i64", // zip_int64_t len
            "pointer", // zip_error_t *error Nullable
        ],
        result: "pointer", // zip_source_t * Nullable
    },
    zip_source_free: {
        parameters: [
            "pointer", // zip_source_t *source Nullable
        ],
        result: "void",
    },
    zip_source_function: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "function", // zip_source_callback fn Nonnull
            "pointer", // void *userdata Nullable
        ],
        result: "pointer", // zip_source_t * Nullable
    },
    zip_source_function_create: {
        parameters: [
            "function", // zip_source_callback fn Nonnull
            "pointer", // void *userdata Nullable
            "pointer", // zip_error_t *error Nullable
        ],
        result: "pointer", // zip_source_t * Nullable
    },
    zip_source_layered: {
        parameters: [
            "pointer", // zip_t *archive Nullable
            "pointer", // zip_source_t *source Nonnull
            "function", // zip_source_layered_callback fn Nonnull
            "pointer", // void *userdata Nullable
        ],
        result: "pointer", // zip_source_t * Nullable
    },
    zip_source_layered_create: {
        parameters: [
            "pointer", // zip_source_t *source Nonnull
            "function", // zip_source_layered_callback fn Nonnull
            "pointer", // void *userdata Nullable
            "pointer", // zip_error_t *error Nullable
        ],
        result: "pointer", // zip_source_t * Nullable
    },
    zip_source_zip_file: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "pointer", // zip_t *srcarchive Nonnull
            "u64", // zip_uint64_t srcidx
            "u32", // zip_flags_t flags
            "u64", // zip_uint64_t start
            "i64", // zip_int64_t length
            "buffer", // const char *password Nullable
        ],
        result: "pointer", // zip_source_t * Nullable
    },
    zip_source_zip_file_create: {
        parameters: [
            "pointer", // zip_t *srcarchive Nonnull
            "u64", // zip_uint64_t srcidx
            "u32", // zip_flags_t flags
            "u64", // zip_uint64_t start
            "i64", // zip_int64_t length
            "buffer", // const char *password Nullable
            "pointer", // zip_error_t *error Nullable
        ],
        result: "pointer", // zip_source_t * Nullable
    },
    zip_file_rename: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "buffer", // const char *name Nonnull
            "u32", // zip_flags_t flags
        ],
        result: "i32",
    },
    zip_delete: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
        ],
        result: "i32",
    },
    zip_unchange: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
        ],
        result: "i32",
    },
    zip_unchange_all: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
        ],
        result: "i32",
    },
    zip_unchange_archive: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
        ],
        result: "i32",
    },
    zip_file_extra_field_delete: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "u16", // zip_uint16_t extra_field_index
            "u32", // zip_flags_t flags
        ],
        result: "i32",
    },
    zip_file_extra_field_delete_by_id: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "u16", // zip_uint16_t extra_field_id
            "u16", // zip_uint16_t extra_field_index
            "u32", // zip_flags_t flags
        ],
        result: "i32",
    },
    zip_file_extra_field_get: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "u16", // zip_uint16_t extra_field_index
            "pointer", // zip_uint16_t *idp Nullable
            "pointer", // zip_uint16_t *lenp Nullable
            "u32", // zip_flags_t flags
        ],
        result: "buffer", // const zip_uint8_t * Nullable
    },
    zip_file_extra_field_get_by_id: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "u16", // zip_uint16_t extra_field_id
            "u16", // zip_uint16_t extra_field_index
            "pointer", // zip_uint16_t *lenp Nullable
            "u32", // zip_flags_t flags
        ],
        result: "buffer", // const zip_uint8_t * Nullable
    },
    zip_file_extra_field_set: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "u16", // zip_uint16_t extra_field_id
            "u16", // zip_uint16_t extra_field_index
            "buffer", // const zip_uint8_t *extra_field_data Nullable
            "u16", // zip_uint16_t len
            "u32", // zip_flags_t flags
        ],
        result: "i32",
    },
    zip_file_extra_fields_count: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "u32", // zip_flags_t flags
        ],
        result: "i16",
    },
    zip_file_extra_fields_count_by_id: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u64", // zip_uint64_t index
            "u16", // zip_uint16_t extra_field_id
            "u32", // zip_flags_t flags
        ],
        result: "i16",
    },
    zip_discard: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
        ],
        result: "void",
    },
    zip_file_attributes_init: {
        parameters: [
            "pointer", // zip_file_attributes_t *attributes Nonnull
        ],
        result: "void",
    },
    zip_libzip_version: {
        parameters: [],
        result: "buffer", // const char * Nonnull
    },
    zip_register_cancel_callback_with_state: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "function", // zip_cancel_callback callback Nullable
            "function", // void (*ud_free)(void *Nullable) Nullable
            "pointer", // void *ud Nullable
        ],
        result: "void",
    },
    zip_register_progress_callback_with_state: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "f64", // double precision
            "function", // zip_progress_callback callback Nullable
            "function", // void (*ud_free)(void *Nullable) Nullable
            "pointer", // void *ud Nullable
        ],
        result: "void",
    },
    zip_set_archive_comment: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "buffer", // const char *comment Nullable
            "u16", // zip_uint16_t len
        ],
        result: "i32",
    },
    zip_set_archive_flag: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
            "u32", // zip_flags_t flag
            "i32", // int value
        ],
        result: "i32",
    },
    zip_error_strerror: {
        parameters: [
            "pointer", // zip_error_t *ze Nonnull
        ],
        result: "buffer", // const char * Nonnull
    },
    zip_file_strerror: {
        parameters: [
            "pointer", // zip_file_t *file Nonnull
        ],
        result: "buffer", // const char * Nonnull
    },
    zip_strerror: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
        ],
        result: "buffer", // const char * Nonnull
    },
    zip_file_get_error: {
        parameters: [
            "pointer", // zip_file_t *zf Nonnull
        ],
        result: "pointer", // zip_error_t * Nonnull
    },
    zip_get_error: {
        parameters: [
            "pointer", // zip_t *archive Nonnull
        ],
        result: "pointer", // zip_error_t * Nonnull
    },
    zip_error_system_type: {
        parameters: [
            "pointer", // const zip_error_t *ze Nonnull
        ],
        result: "i32",
    },
} as const satisfies Deno.ForeignLibraryInterface;

let lib: Deno.DynamicLibrary<typeof symbols>;

function tryGetEnv(key: string): string | undefined {
    try {
        return Deno.env.get(key);
    } catch (e) {
        if (e instanceof Deno.errors.PermissionDenied) {
            return undefined;
        }
        throw e;
    }
}

try {
    const customPath = tryGetEnv("DENO_LIBZIP_PATH");
    if (!customPath) {
        throw Error("Libzip not found.");
    }
    lib = Deno.dlopen(customPath, symbols);
} catch (e) {
    if (e instanceof Deno.errors.PermissionDenied) {
        throw e;
    }

    throw new Error("Failed to load SQLite3 Dynamic Library", { cause: e });
}

export default lib;
