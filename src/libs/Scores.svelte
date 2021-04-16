<script lang="ts">
  import { tw } from "twind";

  export let hscore = 0;
  export let score = 0;
</script>

<div
  class={tw`bg-white p-1.5 w-[140px] font-medium divide-y text(red-900) rounded(bl-md tl-md)`}
>
  <div class={tw`text-sm flex items-center justify-between`}>
    <span>Score :</span>
    {score}
  </div>
  <div class={tw`text-xs flex items-center justify-between`}>
    <span>Highscore :</span>
    {hscore}
  </div>
</div>
