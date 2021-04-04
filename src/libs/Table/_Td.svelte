<script lang="ts">
  import { tw } from "twind";

  export let overide = false;

  let className = "";
  export { className as class };

  $: style = tw(
    {
      "border-t px-5 py-3": !overide,
    },
    className
  );
</script>

<td {...$$restProps} class={style}> <slot /></td>
