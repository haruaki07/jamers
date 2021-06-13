<script lang="ts">
  import { css, tw } from "twind/css";
  import { onMount } from "svelte";
  import { randomIndex, shuffle, sleep } from "~/utils";
  import Timer from "~/libs/Timer.svelte";
  import type { TimerEvent } from "easytimer.js";
  import Scores from "~/libs/Scores.svelte";
  import Modal from "~/libs/Modal";
  import PauseDialog from "./_PauseDialog.svelte";
  import { hscore, score } from "./scores";
  import { push } from "svelte-spa-router";
  import GameOverDialog from "./_GameOverDialog.svelte";
  import Button from "~/libs/Button";
  import { playAudio } from "~/sounds";
  import { getCategory } from "~/stores";
  import { fly } from "svelte/transition";
  import { Pause as PauseIcon } from "~/libs/Icons";

  export let params: { id?: string } = {};

  const style = tw(
    css({
      "@apply":
        "w-full h-full text-center relative p-4 flex(& col) font-nunito",
      ".question": {
        "@apply":
          "w-full h-full bg-window-content border(4 red-800) rounded-lg flex-grow grid place-content-center text(lg sm:2xl red-900) overflow-x-hidden",
        span: {
          "@apply": "lowercase inline",
        },
      },
      ".choices": {
        "@apply":
          "flex space-y-4 w-full flex-col sm:(flex-row space(x-4 y-0)) flex-shrink-0 mt-4",
        button: {
          "@apply":
            "transition-transform transform duration-200 w-full sm:w-1/3 rounded-lg bg-red-900 text(lg sm:2xl white center) p-3 capitalize shadow",
          "&:hover": {
            "@apply": "scale-105",
          },
        },
      },
    })
  );

  type Vocab = {
    id: number;
    key: string;
    val: string;
  };

  //#region vars
  const category = getCategory("vocabs", params.id);
  let timeLimit = 60; // seconds
  let isDataLoaded = false;
  let reset = false;
  let isGameOver = false;
  let paused = false;
  let current: Vocab = {
    id: -1,
    key: "",
    val: "",
  };
  let original: Vocab[];
  let vocabs: Vocab[];
  let showPauseModal = false;
  $: highscore = $hscore[category.id];

  const closePauseModal = () => (showPauseModal = false);
  const openPauseModal = () => (showPauseModal = true);
  //#endregion
  onMount(() => {
    const data = category.vocabs;
    original = data.map((v, i) => ({ id: i, key: v[0], val: v[1] }));
    vocabs = [...original];
    isDataLoaded = true;
    current = getRandVocab();
  });

  //#region functions
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
    const filtered = original.filter((v) => v.key !== except); // without correct answer
    const choices = shuffle(filtered).slice(0, length - 1);
    choices.push(current); // push the correct answer
    return shuffle(choices);
  }

  function handleStop(e: TimerEvent) {
    isGameOver = true;
    $hscore[category.id] = highscore;
  }

  function togglePause(state?: boolean) {
    paused = state ?? !paused;
  }

  function pauseGame() {
    togglePause(true);
    openPauseModal();
  }

  function handleResume() {
    togglePause(false);
    closePauseModal();
  }

  async function handleAnswer(e: any, val: string) {
    if (current.val !== val) {
      e.target.classList.add(tw("bg-red-600!"));
      await sleep(100); // delay
      e.target.classList.remove(tw("bg-red-600!"));
      return;
    }
    e.target.classList.add(tw("bg-green-600!"));

    playAudio("correct");
    await sleep(100); // delay

    vocabs = vocabs.filter(({ key }) => key !== current.key); // remove from array
    $score += 10; // add score
    if ($score >= highscore) highscore = $score; // if score >= highscore change it
    current = getRandVocab(); // set next question
    e.target.classList.remove(tw("bg-green-600!"));
  }

  function handleRestart() {
    vocabs = [...original];
    current = getRandVocab();
    reset = true;
    closePauseModal();
    isGameOver = false;
    $score = 0;
  }

  function handleExit() {
    closePauseModal();
    $score = 0;
    push("/modes/vocabs");
  }
  //#endregion
</script>

<svelte:window on:blur={() => !isGameOver && pauseGame()} />

<div class={style}>
  {#if isDataLoaded}
    <div class={tw`flex items-center justify-between mb-4 relative`}>
      <Button
        on:click={pauseGame}
        class={tw`text(white 2xl lg:4xl) bg-transparent`}
      >
        <PauseIcon />
      </Button>
      <div class={tw`flex`}>
        <Scores score={$score} hscore={highscore} />
        <Timer
          class="text-sm bg-red-900 text-white"
          seconds={timeLimit}
          on:stopped={handleStop}
          bind:paused
          bind:reset
        />
      </div>
    </div>
    {#key current.key}
      <div class="question">
        <div in:fly={{ x: 100, duration: 150 }}>
          <p>
            Apakah <span>{category.name}</span> dari kata:
          </p>
          <b>{current.key}</b>
        </div>
      </div>
      <div class="choices">
        {#each randomChoices(3, current.key) as choice}
          <button
            on:click={async (e) => await handleAnswer(e, choice.val)}
            disabled={isGameOver}
          >
            {choice.val}
          </button>
        {/each}
      </div>
    {/key}
  {/if}
</div>

<Modal dialogClass="max-w-sm" title="game over" bind:open={isGameOver}>
  <GameOverDialog on:exit={handleExit} on:restart={handleRestart} />
</Modal>

<Modal dialogClass="max-w-sm" title="pause" bind:open={showPauseModal}>
  <PauseDialog
    on:exit={handleExit}
    on:restart={handleRestart}
    on:resume={handleResume}
  />
</Modal>
