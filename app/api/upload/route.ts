import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file received.' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;

        // Save to public/uploads directory
        const uploadDir = join(process.cwd(), 'public', 'uploads');

        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        const path = join(uploadDir, filename);
        await writeFile(path, buffer);

        // Return the URL that will be stored in the database
        // Note: To migrate to S3/Firebase later, simply replace the writeFile logic
        // above with the respective cloud SDK upload call and return that public URL.
        return NextResponse.json({ url: `/uploads/${filename}` });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
    }
}
