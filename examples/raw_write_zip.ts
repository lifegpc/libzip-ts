import * as lib from "../src/raw.ts";

export function write_zip(path: string, name: string, content: string) {
    const zip = lib.zip_open(path, lib.ZipOpenFlag.ZIP_CREATE);
    if (!zip) {
        throw Error("Failed to open zip file.");
    }
    const data = (new TextEncoder).encode(content);
    const source = lib.zip_source_buffer(zip, data, data.length, 0);
    if (!source) {
        lib.zip_discard(zip);
        throw Error("Failed to create buffer.");
    }
    const ind = lib.zip_file_add(zip, name, source, lib.ZipFlags.ENC_UTF_8);
    if (ind == -1) {
        lib.zip_discard(zip);
        throw Error("Failed to add file to archive.");
    }
    if (!lib.zip_close(zip)) {
        lib.zip_discard(zip);
        throw Error("Failed to write changes to disk.");
    }
}

if (import.meta.main) {
    write_zip("hello.zip", "hello.txt", "hello world");
}
