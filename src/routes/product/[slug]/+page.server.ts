import { STORE_ID, DOMAIN_ID, BACKEND_ENDPOINT } from "$env/static/private";


export const load = async ({params}) => {
  const slug = params.slug;
	const data = await fetch(`${BACKEND_ENDPOINT}/${STORE_ID}/products/${slug}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-DOMAIN_ID": DOMAIN_ID
		}
	});

	return {
		data: await data.json()
	};
};