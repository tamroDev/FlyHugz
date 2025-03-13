<script lang="ts">
	import Footer from '$lib/components/footer/footer.svelte';
	import { Header } from '$lib/components/header';
	import '../app.css';
	let { children } = $props();
</script>

<main>
	<Header />
	{@render children()}
	<Footer />
</main>
