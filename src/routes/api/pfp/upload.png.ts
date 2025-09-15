// src/routes/api/pfp/upload.png.ts
import generatePfp from "$lib/rendering/generateProfile";
import { Canvas } from "skia-canvas";

export async function post({ request }) {
	try {
		const form = await request.formData();
		const file = form.get('skin');

		if (!file) {
			return {
				status: 400,
				headers: { "Content-Type": "application/json" },
				body: { error: "No skin file uploaded. Field name must be 'skin'." }
			};
		}

		// In SvelteKit, file is a Blob-like object
		const arrayBuffer = await (file as Blob).arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const canvas = new Canvas(300, 300);
		const ctx = canvas.getContext("2d");

		await generatePfp(null, ctx, buffer);

		const pngBuffer = await canvas.toBuffer("image/png");

		return {
			status: 200,
			headers: {
				"Content-Type": "image/png",
				"Cache-Control": "public, max-age=0, must-revalidate"
			},
			body: pngBuffer
		};
	} catch (e) {
		console.error(e);
		return {
			status: 500,
			headers: { "Content-Type": "application/json" },
			body: { error: "Failed to generate PFP from uploaded skin" }
		};
	}
}
