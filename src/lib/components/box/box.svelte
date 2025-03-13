<script context="module" lang="ts">
	export type BoxType = 'center' | 'between' | 'around' | 'evenly' | 'start' | 'end';
</script>

<script lang="ts">
	import type { BoxType } from './index.svelte';

	export let style = '';
	export let typeBox: BoxType = 'center';

	const boxStyles: Record<BoxType, string> = {
		center: 'justify-center items-center',
		between: 'justify-between items-center',
		around: 'justify-around items-center',
		evenly: 'justify-evenly items-center',
		start: 'justify-start items-start',
		end: 'justify-end items-end'
	};

	$: computedClass = boxStyles[typeBox];
</script>

<div class={`flex ${computedClass} ${style}`}>
	<slot />
</div>
