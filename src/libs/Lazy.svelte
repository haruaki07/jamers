<script lang="ts">
  import type { SvelteComponent } from "svelte";

  export let component: any;
  export let loadingContent: string | SvelteComponent = "Loading...";
  export let errorContent: string | SvelteComponent = "An error occurred";
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
{:catch}
  {#if typeof errorContent === "string"}
    {errorContent}
  {:else}
    <svelte:component this={errorContent} />
  {/if}
{/await}
