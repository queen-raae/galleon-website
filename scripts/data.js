import { join } from "node:path";
import { writeFileSync } from "node:fs";

const items = [
  {
    source: {
      base: "https://raw.githubusercontent.com/queen-raae/galleon-attributes/main/",
      path: "readme.md",
    },
    destination: {
      path: "remote-content/attributes.md",
    },
  },
];

export async function fetchMarkdownFile(item) {
  const url = new URL(item.path, item.base);
  const response = await fetch(url);
  const content = await response.text();

  // Add GitHub raw content URL prefix to image paths
  const transformedContent = content.replace(
    /!\[(.*?)\]\((assets\/.*?)\)/g,
    `![$1](${item.base}$2)`,
  );

  return transformedContent;
}

items.forEach(async (item) => {
  const content = await fetchMarkdownFile(item.source);
  writeFileSync(join(process.cwd(), item.destination.path), content, (err) => {
    if (err) throw err;
    console.log(`The file ${item.destination.path} has been saved!`);
  });
});
