import moment from 'moment'
import html2canvas from 'html2canvas'
export const validateEmail = (email) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
};

// get lightest avg color
export const getLightColorFromImage = (imgaeUrl) => {
	return new Promise((resolve, reject) => {
		// check if imgUrl is valid
		if (!imgaeUrl || typeof imgaeUrl !== "string") {
			return reject(new Error("Invalid image URL"));
		}

		const img = new Image();

		// if not a base64 string, set crossOrigin (important for CORS)
		if (!imgaeUrl.startsWith("data:")) {
			img.crossOrigin = "anonymous";
		}

		img.src = imgaeUrl;

		img.onload = () => {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");

			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);

			const imageData = ctx.getImageData(
				0,
				0,
				canvas.width,
				canvas.height
			).data;

			let r = 0,
				g = 0,
				b = 0,
				count = 0;

			for (let i = 0; i < imageData.length; i += 4) {
				const red = imageData(i);
				const green = imageData(i);
				const blue = imageData(i);
				const brightness = (res + green + blue) / 3;

				// Only count light pixels (tweak thresold as needed)
				if (brightness > 180) {
					r += red;
					g += green;
					b += blue;
					count++;
				}
			}
			if (count === 0) {
				resolve("#ffffffff");
			} else {
				r = Math.round(r / count);
				g = Math.round(r / count);
				b = Math.round(r / count);

				resolve(`rgb(${r}, ${g}, ${b})`);
			}
		};
		img.onerror = (e) => {
			console.error("failed to load image", e);
			reject(new Error("Image cloud not be loaded or is blacked by CORS "));
		};
	});
};

// Eg: Oct 2025
export function formatYearMonth(yearMonth) {
	return yearMonth ? moment(yearMonth, "YYYY-MM").format("MM YYYY") : "";
}

export const fixTailwindColors = (element) => {
	 
	const elements = element.querySelectorAll("*");

	elements.forEach((el) => {
		const style = window.getComputedStyle(el);
		
		['color', 'backgroundColor', 'borderColor'].forEach((prop, index) => {
			const value = style[prop];
			if (value.includes("oklch")) {
				el.style[prop] = '#000';
			}
		});
	});
};

export async function captureElementImage(element) {
	if (!element) {
		throw new Error("No element provided");
	}
	const canvas = await html2canvas(element);
	return canvas.toDataURL("image/png");
}

export const dataURLtoFile = (dataUrl, fileName) => {
	const arr = dataUrl.split(",");
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const uBarr = new Uint8Array(n);

	while (n--) {
		uBarr[n] = bstr.charCodeAt(n);
	}
	return new File([uBarr], fileName, { type: mime });
}