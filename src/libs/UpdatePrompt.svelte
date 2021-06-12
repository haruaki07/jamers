<script lang="ts">
  import { registerSW } from "virtual:pwa-register";

  let offlineReady = false,
    needRefresh = false;

  const updateSw = registerSW({
    onNeedRefresh() {
      offlineReady = true;
    },
    onOfflineReady() {
      needRefresh = true;
    },
  });

  function close() {
    offlineReady = false;
    needRefresh = false;
  }
</script>

{#if needRefresh}
  <div class="pwa-toast" role="alert">
    <div class="message">
      <span> New content available, click on reload button to update. </span>
    </div>
    <button on:click={() => updateSw(true)}> Update and Reload </button>
    <button on:click={close}> Close </button>
  </div>
{/if}

<style>
  .pwa-toast {
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 16px;
    padding: 12px;
    border: 1px solid #8885;
    border-radius: 4px;
    z-index: 99990;
    text-align: left;
    box-shadow: 3px 4px 5px 0px #8885;
    background: white;
  }
  .pwa-toast .message {
    margin-bottom: 8px;
  }
  .pwa-toast button {
    border: 1px solid #8885;
    outline: none;
    margin-right: 5px;
    border-radius: 2px;
    padding: 3px 10px;
  }
</style>
