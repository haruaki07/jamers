<script lang="ts">
  import { tw, css, theme } from "twind/css";
  import Button from "../Button";

  let className = "";
  export { className as class };
  export let twClass = "";
  export let variant = "gray";
  export let block = false;
  export let icon = false;
  export let disabled = false;

  let pressed = false;

  let bgColor = "bg-gray-100",
    shadowColor = "bg-gray-300",
    textColor = "text-gray-800";

  $: switch (variant) {
    case "red":
      bgColor = "bg-red-600";
      shadowColor = "bg-red-800";
      textColor = "white";
      break;
    case "green":
      bgColor = "bg-green-600";
      shadowColor = "bg-green-800";
      textColor = "white";
      break;
    case "blue":
      bgColor = "bg-blue-600";
      shadowColor = "bg-blue-800";
      textColor = "white";
      break;
    default:
      bgColor = "bg-gray-100";
      shadowColor = "bg-gray-300";
      textColor = "gray-700";
      break;
  }

  $: style = [
    tw(
      css({
        "@apply": `rounded-lg outline-none! border-0 select-none ${shadowColor}`,
        ".content": {
          "@apply": `text(xl ${textColor}) uppercase block font-semibold rounded-lg transform -translate-y-[6px] ${bgColor} ${twClass}`,
          "&.pressed": {
            "@apply": "-translate-y-[2px]",
          },
          "&:not(.icon)": {
            "@apply": "px-14 py-3 sm:(py-2 px-10)",
          },
          "&.icon": {
            "@apply": "p-2 flex items-center justify-center",
          },
        },
        "&:disabled": {
          cursor: "not-allowed",
          filter: "brightness(60%)",
          ".content": {
            "@apply": "-translate-y-[2px]",
          },
        },
      }),
      {
        "w-full": block,
      }
    ),
    className,
  ].join(" ");

  function handlePointerDown() {
    pressed = true;
  }

  function handlePointerUp() {
    pressed = false;
  }
</script>

<Button
  {...$$restProps}
  on:pointerdown={handlePointerDown}
  on:pointerleave={handlePointerUp}
  on:pointerup={handlePointerUp}
  on:click
  {disabled}
  class={style}
>
  <div class="content" class:pressed class:icon class:disabled>
    <slot />
  </div>
</Button>
