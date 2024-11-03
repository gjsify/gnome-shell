/**
 * Fix up embedded markup so that it can be displayed correctly in
 * UI elements such as the message list. In some cases, we might want to
 * keep some of the embedded markup, so specify allowMarkup for that case
 *
 * @version 47
 *
 * @param {string} text containing markup to escape and parse
 * @param {boolean} allowMarkup to allow embedded markup or just escape it all
 * @returns the escaped string
 */
export function fixMarkup(text: string, allowMarkup?: boolean): string;
