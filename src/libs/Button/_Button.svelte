<script lang="ts">
  import { tw } from "twind";
  import { animation, css } from "twind/css";

  export let override = false;
  export let block = false;
  export let className = "";

  let customClass = "";
  export { customClass as class };

  const motion = animation(".15s ease-in", {
    "50%": {
      transform: "scale(.75)",
    },
    "100%": {
      transform: "scale(1)",
    },
  });

  $: style = tw(
    css({ "&:active": motion }),
    {
      [`text(white sm) font-medium`]: !override,
      "w-full": block,
    },
    customClass
  );
</script>

<button {...$$restProps} on:click class="{style} {className}">
  <slot />
</button>
