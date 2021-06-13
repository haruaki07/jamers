<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { tw } from "twind/css";
  import PushButton from "~/libs/PushButton";
  import { score } from "./scores";

  const dispatch = createEventDispatcher();
</script>

<div class={tw`m-4 p-3 rounded-md bg-window-content`}>
  <center>
    <p class={tw`text(lg red-800) font-medium`}>Score kamu:</p>
    <p class={tw`text(3xl red-800) font-black`}>{$score}</p>
  </center>
  <div class={tw`mt-4 space-y-3`}>
    <PushButton
      variant="blue"
      block
      twClass="text-base py-2"
      on:click={() => dispatch("restart")}
    >
      Ulangi
    </PushButton>
    <PushButton
      variant="red"
      block
      twClass="text-base py-2"
      on:click={() => dispatch("exit")}
    >
      Keluar
    </PushButton>
  </div>
</div>
