<script lang="ts">
  import { tw, css, theme } from "twind/css";

  let className = "";
  export { className as class };
  export let twClass = "";

  $: style = [
    tw(
      css({
        "@apply": "text(white 4xl lg:6xl) font-black place-self-center",
        textShadow: `0 4px 1px ${tw(theme("colors", ["red", "900"]))}`,
      }),
      twClass
    ),
    className,
  ].join(" ");
</script>

<h1 class={style}>
  <slot>Jamers</slot>
</h1>
