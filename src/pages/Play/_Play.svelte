<script lang="ts">
  import { css, tw } from "twind/css";
  import { push } from "svelte-spa-router";
  import data from "~/data";

  const style = tw(css`
    z-index: 2;
    @apply w-full h-screen text-center relative select-none p-4 flex flex-col;

    .question {
      @apply w-full rounded-lg bg-white h-full flex-grow flex items-center justify-center text(2xl red-900);
    }

    .choices {
      @apply flex flex-col w-full space-y-4 flex-shrink-0 mt-4;

      button {
        @apply w-full rounded-lg bg-blue-700 text(2xl white) p-3 text-center focus:(outline-none ring) ring-blue-300;

        &.true {
          @apply bg-green-700;
        }

        &.false {
          @apply bg-red-700;
        }
      }
    }
  `);

  let idx = 0;

  const nextQuestion = (cb) => {
    if (data[idx + 1]) {
      setTimeout(() => {
        idx++;
        cb();
      }, 1000);
      return;
    }
    setTimeout(() => push("/"), 1000);
  };

  const handleClick = (e: MouseEvent, id: any) => {
    const node = e.target as HTMLButtonElement;
    if (id === data[idx].rightAnswerId) {
      nextQuestion(() => node.classList.remove("true"));
      node.classList.add("true");
    } else {
      nextQuestion(() => node.classList.remove("false"));
      node.classList.add("false");
    }
  };
</script>

<div class={style}>
  <div class="question">
    {data[idx].question}
  </div>
  <div class="choices">
    {#each data[idx].choices as choice (choice.id)}
      <button type="button" on:click={(e) => handleClick(e, choice.id)}>
        <span>
          {choice.answer}
        </span>
      </button>
    {/each}
  </div>
</div>
