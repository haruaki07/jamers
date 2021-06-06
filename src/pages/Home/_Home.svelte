<script lang="ts">
  import { css } from "twind/css";
  import { theme, tw } from "twind";
  import PushButton from "~/libs/PushButton";
  import PageTitle from "~/libs/PageTitle.svelte";

  const style = tw(
    css({
      "@apply": "page-wrapper",
      ".menu": {
        "@apply":
          "place-self-center mt-16 space-y-10 flex flex(col grow) items-center justify-center",
      },
    })
  );
</script>

<div class={style}>
  <PageTitle />
  <div class="menu">
    <PushButton block variant="red" href="#/modes">Mulai</PushButton>
    <PushButton block variant="green" href="#/learn">Materi</PushButton>
    <PushButton block href="#/settings">Pengaturan</PushButton>
  </div>
</div>
