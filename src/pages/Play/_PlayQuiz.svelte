<script lang="ts">
  import { css, tw } from "twind/css";
  import { onMount } from "svelte";
  import { shuffle, sleep } from "~/utils";
  import Timer from "~/libs/Timer.svelte";
  import Scores from "~/libs/Scores.svelte";
  import Modal from "~/libs/Modal";
  import PauseDialog from "./_PauseDialog.svelte";
  import { hscore, score } from "./scores";
  import { push } from "svelte-spa-router";
  import GameOverDialog from "./_GameOverDialog.svelte";
  import Button from "~/libs/Button";
  import { playAudio } from "~/sounds";
  import { getCategory } from "~/stores";
  import type { Question } from "~/stores";
  import { fly } from "svelte/transition";

  export let params: { id?: string } = {};

  const style = tw(
    css({
      "@apply":
        "w-full h-screen text-center relative select-none p-4 flex flex-col",
      ".question": {
        "@apply":
          "w-full bg-window-content border(4 red-800) rounded-lg grid place-items-center text(base left md:lg lg:xl red-900) flex-grow p-5",
        height: "300px",
        overflowY: "auto",
      },
      ".choices": {
        "@apply": "flex(& col) space-y-4 w-full flex-shrink-0 mt-4",
        button: {
          "@apply":
            "transition-transform transform duration-200 w-full rounded-lg bg-red-900 text(sm sm:base white md:(center lg)) p-3 capitalize shadow font-medium",
          "&:hover": {
            "@apply": "scale-105",
          },
        },
      },
    })
  );

  //#region vars
  const category = getCategory("quiz", params.id);
  let timeLimit = 60; // seconds
  let isDataLoaded = false;
  let reset = false;
  let isGameOver = false;
  let paused = false;
  let current: Question = {
    id: -1,
    text: "",
    choices: [],
  };
  let currentIdx = 0;
  let original: Question[];
  let questions: Question[];
  let showPauseModal = false;
  $: highscore = $hscore[category.id];

  const closePauseModal = () => (showPauseModal = false);
  const openPauseModal = () => (showPauseModal = true);
  //#endregion
  onMount(() => {
    const data = category.questions;
    original = data;
    questions = [...original];
    isDataLoaded = true;
    getQuestion();
  });

  //#region functions
  function getQuestion() {
    const idx = currentIdx;

    if (!questions[idx]) {
      return handleStop(); //gameover
    }
    current = questions[idx];
    currentIdx++;
  }

  function randomChoices() {
    return shuffle(current.choices);
  }

  function handleStop() {
    isGameOver = true;
    if ($score >= $hscore[category.id]) {
      $hscore[category.id] = $score;
    }
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

  async function handleAnswer(e: any, correct: boolean) {
    if (!correct) {
      e.target.classList.add(tw("bg-red-600!"));
      const res = Math.max(0, $score - 10);
      $score = res;
      await sleep(100); // delay
      e.target.classList.remove(tw("bg-red-600!"));
      return;
    }
    e.target.classList.add(tw("bg-green-600!"));

    playAudio("correct");
    await sleep(100); // delay

    $score += 10; // add score
    if ($score >= highscore) highscore = $score; // if score >= highscore change it
    getQuestion(); // set next question
    e.target.classList.remove(tw("bg-green-600!"));
  }

  function handleRestart() {
    questions = [...original];
    currentIdx = 0;
    getQuestion();
    reset = true;
    closePauseModal();
    isGameOver = false;
    $score = 0;
  }

  function handleExit() {
    closePauseModal();
    $score = 0;
    push("/modes/quiz");
  }
  //#endregion
</script>

<svelte:window on:blur={() => !isGameOver && pauseGame()} />

<div class={style}>
  {#if isDataLoaded}
    <div class={tw`flex items-center justify-between mb-4 relative`}>
      <Button
        on:click={pauseGame}
        class={tw`px-4 rounded-md shadow bg-white text(red-900) font-medium h-full`}
      >
        Pause
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
    {#key current.id}
      <div class="question">
        <p in:fly={{ x: 100, duration: 150 }}>{@html current.text}</p>
      </div>
      <div class="choices">
        {#each randomChoices() as choice}
          <button
            on:click={async (e) => await handleAnswer(e, choice.correct)}
            disabled={isGameOver}
          >
            {choice.value}
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
