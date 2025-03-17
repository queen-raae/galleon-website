import { join } from "node:path";
import { writeFile } from "node:fs";

const items = [
  {
    url: "https://raw.githubusercontent.com/queen-raae/galleon-attributes/main/readme.md",
    path: "remote-content/attributes.md",
  },
];

export async function fetchMarkdownFile(url) {
  const response = await fetch(url);
  const content = await response.text();

  return content;
}

items.forEach(async (item) => {
  const content = await fetchMarkdownFile(item.url);
  await writeFile(join(process.cwd(), item.path), content, (err) => {
    if (err) throw err;
    console.log(`The file ${item.path} has been saved!`);
  });
});
