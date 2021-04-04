<script lang="ts">
  import { tw } from "twind";

  export let wrapperClass = "";
  export let tableClass = "";

  const style = {
    wrapper: tw`bg-white rounded shadow border overflow-x-auto ${wrapperClass}`,
    table: tw`w-full whitespace-no-wrap ${tableClass}`,
  };
</script>

<div class={style.wrapper}>
  <table {...$$restProps} class={style.table}>
    <slot />
  </table>
</div>
