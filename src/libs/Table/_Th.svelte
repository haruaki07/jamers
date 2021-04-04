<script lang="ts">
  import { tw } from "twind";

  export let overide = false;

  let className = "";
  export { className as class };

  $: style = tw(
    {
      "px-5 py-3 font-semibold": !overide,
    },
    className
  );
</script>

<th {...$$restProps} class={style}> <slot /></th>
