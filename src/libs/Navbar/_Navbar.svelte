<script lang="ts">
  import { tw } from "twind";

  const style = {
    navbar: tw`w-full p-3 shadow flex items-center justify-between bg-gray-800`,
    brand: tw`text(lg white) font-semibold`,
  };
</script>

<div class={style.navbar}>
  <div class={tw`container mx-auto`}>
    <a href="#/" class={style.brand}> Zoneminder </a>
  </div>
</div>
