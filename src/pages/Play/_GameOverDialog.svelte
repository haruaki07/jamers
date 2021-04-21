<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { tw, css } from "twind/css";
  import Button from "~/libs/Button";
  import { score } from "./scores";

  const dispatch = createEventDispatcher();

  const style = tw(
    css({
      "@apply": "m-4 p-3 rounded-md bg-window-content",
      ".actions": {
        "@apply": "mt-3 space-y-3",
        button: {
          "@apply": "font-medium text-white rounded-md p-2 w-full",
        },
      },
    })
  );
</script>

<div class={style}>
  <center>
    <p class={tw`text(lg red-800) font-medium`}>
      Score kamu: {$score}
    </p>
  </center>
  <div class="actions">
    <Button class={tw`bg-blue-600`} on:click={() => dispatch("restart")}>
      Ulangi
    </Button>
    <Button class={tw`bg-red-600`} on:click={() => dispatch("exit")}>
      Keluar
    </Button>
  </div>
</div>
