<script lang="ts">
  import { css, tw } from "twind/css";
  import data from "./data.json";
  import { onMount } from "svelte";
  import { randomIndex, shuffle } from "~/utils";
  import Timer from "~/libs/Timer.svelte";
  import type { TimerEvent } from "easytimer.js";
  import Scores from "~/libs/Scores.svelte";
  import Modal, { closeModal, openModal } from "~/libs/Modal";
  import PauseDialog from "./_PauseDialog.svelte";
  import { hscore, score } from "./scores";
  import { push } from "svelte-spa-router";
  import GameOverDialog from "./_GameOverDialog.svelte";

  const style = tw(css`
    z-index: 2;
    @apply w-full h-screen text-center relative select-none p-4 flex flex-col;

    .question {
      @apply w-full rounded-lg bg-white h-full flex-grow grid place-content-center text(lg sm:(2xl) red-900) shadow;
    }

    .choices {
      @apply flex space-y-4 w-full flex-col sm:(flex-row space(x-4 y-0)) flex-shrink-0 mt-4;

      button {
        @apply transition-transform transform duration-200;
        @apply w-full sm:w-1/3 rounded-lg bg-green-600 text(lg sm:(2xl) white) p-3 text-center;

        &:hover {
          @apply scale-105;
        }
      }
    }
  `);

  type Vocab = {
    id: number;
    key: string;
    val: string;
  };

  let reset = false;
  let isGameOver = false;
  let current: Vocab = {
    id: -1,
    key: "",
    val: "",
  };
  let original: Vocab[] = data.map((v, i) => ({ id: i, key: v[0], val: v[1] }));
  let vocabs: Vocab[] = [...original];

  function getRandVocab() {
    if (vocabs.length) {
      const idx = randomIndex(vocabs);
      return vocabs[idx];
    }
    vocabs = [...original]; // reset it
    const idx = randomIndex(vocabs);
    return vocabs[idx];
  }

  function randomChoices(length: number, except: string) {
    const filtered = original
      .filter((v) => v.key !== except)
      .slice(0, length - 1);
    filtered.push(current); // push the correct answer
    return shuffle<Vocab>(filtered);
  }

  onMount(() => {
    current = getRandVocab();
  });

  function handleStop(e: TimerEvent) {
    isGameOver = true;
  }

  let paused = false;

  function togglePause(state?: boolean) {
    paused = state ?? !paused;
  }

  function pauseGame() {
    togglePause(true);
    openModal();
  }

  function resumeGame() {
    togglePause(false);
    closeModal();
  }

  function handleAnswer(val: string) {
    if (current.val !== val) {
      return;
    }
    vocabs = vocabs.filter(({ key }) => key !== current.key);
    current = getRandVocab();
    $score += 10;
    if ($score >= $hscore) $hscore = $score;
  }

  function handleRestart() {
    vocabs = [...original];
    current = getRandVocab();
    reset = true;
    closeModal();
    isGameOver = false;
    $score = 0;
  }
</script>

<div class={style}>
  <div class={tw`flex items-center justify-between mb-4 relative`}>
    <button
      on:click={pauseGame}
      class={tw`px-4 rounded-md shadow bg-white text(red-900) font-medium h-full`}
      >Pause</button
    >
    <div class={tw`flex`}>
      <Scores score={$score} hscore={$hscore} />
      <Timer
        class="text-sm bg-red-900 text-white"
        seconds={60}
        on:stopped={handleStop}
        bind:paused
        bind:reset
      />
    </div>
  </div>
  {#key current.key}
    <div class="question">
      Apakah bahasa jawa dari kata: <br /><b>{current.key}</b>
    </div>
    <div class="choices">
      {#each randomChoices(3, current.key) as choice}
        <button
          type="button"
          on:click={() => handleAnswer(choice.val)}
          disabled={isGameOver}
        >
          {choice.val}
        </button>
      {/each}
    </div>
  {/key}

  {#if isGameOver}
    <GameOverDialog on:restart={handleRestart} />
  {/if}
</div>

<Modal dialogClass="max-w-sm">
  <PauseDialog on:restart={handleRestart} resumeAction={resumeGame} />
</Modal>
