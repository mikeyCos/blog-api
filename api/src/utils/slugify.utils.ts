interface Slugify {
  (text: string): string;
}

/* Removes prohibited characters
 * Replaces specific characters to hyphens
 * Working example, https://lmno.lol/alvaro
 * slugify(`apples', strawberries, and bananas! ex--tap, version 1.2...`);
 *  Should return apples-strawberries-and-bananas-ex--tap-version-1-2
 */
const slugify: Slugify = (text: string) => {
  const prohibitedCharacters = new RegExp("[^A-Za-zA0-9\\s-]", "g");
  const slug = text.replace(prohibitedCharacters, "").replace(/[\.\s]/g, "-");
  return slug;
};

export default slugify;
