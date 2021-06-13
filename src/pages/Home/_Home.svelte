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
          "place-self-center mt-16 space-y-10 flex flex(col grow) items-center justify-center font-nunito",
      },
    })
  );
</script>

<div class={style}>
  <PageTitle twClass="text-6xl!" />
  <div class="menu">
    <PushButton block variant="green" href="#/modes">Mulai</PushButton>
    <PushButton block variant="red" href="#/learn">Materi</PushButton>
    <PushButton block href="#/settings">Pengaturan</PushButton>
  </div>
</div>
