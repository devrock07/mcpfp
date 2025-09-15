// src/lib/rendering/generateProfile.ts
import { getSkin } from "./mojang";
import { loadImage } from "skia-canvas";
const prefix = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://minecraftpfp.com";

async function generatePfp(username: string | null, ctx: any, uploadedSkin?: Buffer) {
	try {
		if (!username && !uploadedSkin) {
			await drawFailed(ctx);
			return;
		}

		let skinImage;
		if (uploadedSkin) {
			// load from uploaded buffer
			skinImage = await loadImage(uploadedSkin);
		} else {
			// old behaviour: username -> mojang -> url -> loadImage
			const skinURL = await getSkin(username as string);
			skinImage = await loadImage(skinURL);
		}

		const shading = await loadImage(`${prefix}/20x20pshading.png`);
		const backdrop = await loadImage(`${prefix}/backdropshading.png`);

		// --- Example drawing logic (simplified placeholder) ---
		ctx.drawImage(backdrop, 0, 0, 300, 300);
		ctx.drawImage(skinImage, 0, 0, 300, 300);
		ctx.drawImage(shading, 0, 0, 300, 300);

	} catch (err) {
		console.error(err);
		await drawFailed(ctx);
	}
}

async function drawFailed(ctx: any) {
	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, 300, 300);
	ctx.fillStyle = "white";
	ctx.font = "20px sans-serif";
	ctx.fillText("Failed to load skin", 30, 150);
}

export default generatePfp;
