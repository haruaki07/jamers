<script lang="ts">
  import { tw } from "twind";

  export let overide = false;

  let className = "";
  export { className as class };

  $: style = tw(
    {
      "hover:bg-gray-200 focus-within:bg-gray-200": !overide,
    },
    className
  );
</script>

<tr {...$$restProps} class={style}> <slot /></tr>
