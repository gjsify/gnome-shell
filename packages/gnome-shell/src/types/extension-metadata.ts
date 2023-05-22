export interface ExtensionMetadata {
    uuid: string;
    name?: string;
    description?: string;
    version?: string;
    url?: string;
    "shell-version"?: string[];
    "settings-schema"?: string;
    "gettext-domain"?: string;
    "original-author"?: string[];
    "extension-id"?: string;
}