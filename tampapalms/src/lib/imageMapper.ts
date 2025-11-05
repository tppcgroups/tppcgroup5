import fs from 'fs';
import path from 'path';

type ImageMap = {[key:string]: string[]};

/**
 * Reads the public/images directory and builds a map of image paths
 * keyed by the Building-Suite ID (e.g., 'Bldg5-Suite202').
 * * NOTE: This function relies on a specific file naming convention.
 */

export function buildImageMap(): ImageMap {
    const imageMap: ImageMap = {};

    // get the correct path to the images directory using process.cwd(), the root of the project
    const imagesDir = path.join(process.cwd(), 'public', 'images');

    try {
        const filenames = fs.readdirSync(imagesDir);

        for (const filename of filenames) {
            // Regex to match filenames like Bldg5-Suite202
            const match = filename.match(/^(Bldg\d+-Suite\d+)-\d{3}\.jpg$/);
            if (match) {
                const spaceKey = match[1];

                if (!imageMap[spaceKey]) {
                    imageMap[spaceKey] = []; // Initialize array if key doesn't exist
                }

                const clientPath = `/images/${filename}`;
                imageMap[spaceKey].push(clientPath);
            }
        }
    } catch (error) {
        console.error("Error building image map:", error);
        return {};
    }

    return imageMap;
}