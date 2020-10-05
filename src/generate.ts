import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

var files: any = [];

async function main() {
  let dirs = await getDirs();

  await dirs.forEach(async (dir: string) => {
    let file = await readFileSync(
      join(__dirname, "..", "redirects", dir, "_redirects"),
      {
        encoding: "utf8",
      }
    );

    await files.push("https://" + dir + file);
  });

  await write(files.join("\n"));
}

function getDirs() {
  return readdirSync(join(__dirname, "..", "redirects")).filter((dir: string) =>
    dir.endsWith("emindpire.com")
  );
}

function write(data: string) {
  try {
    writeFileSync(join(__dirname, "..", "public", "_redirects"), data);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

main();
