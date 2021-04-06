<script lang="ts">
  import type { SvelteComponent } from "svelte";

  export let component: any;
  export let loadingContent: string | SvelteComponent = "Loading...";
</script>

{#await component.then ? component : component()}
  <div class="text-center">
    {#if typeof loadingContent === "string"}
      {loadingContent}
    {:else}
      <svelte:component this={loadingContent} />
    {/if}
  </div>
{:then cmp}
  <svelte:component this={cmp.default} />
{/await}
