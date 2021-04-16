<script lang="ts">
  import { Timer } from "easytimer.js";
  import { createEventDispatcher, onDestroy } from "svelte";
  import { tw } from "twind";

  export let seconds = 0;
  export let paused = false;
  export let reset = false;
  let className = "";
  export { className as class };

  const dispatch = createEventDispatcher();
  let timer = new Timer({ countdown: true, startValues: { seconds } });
  let timeString: string;

  const formatTimer = (timer: Timer) =>
    timer.getTimeValues().toString(["minutes", "seconds"]);

  timer.addEventListener("targetAchieved", (e) => {
    dispatch("stopped", e.detail);
    timeString = formatTimer(e.detail.timer);
  });

  timer.addEventListener("secondsUpdated", (e) => {
    dispatch("updated", e.detail);
    timeString = formatTimer(e.detail.timer);
  });

  timer.addEventListener("reset", (e) => {
    dispatch("reset", e.detail);
    reset = false;
    paused = false;
    timeString = formatTimer(e.detail.timer);
  });

  onDestroy(() => {
    timer.stop();
    timer = null;
  });

  $: !paused ? timer.start() : timer.pause();
  $: style = tw(
    "rounded(br-md tr-md) items-center flex justify-center flex-shrink-0 p-1.5 font-medium w-14",
    className
  );
  $: reset && timer.reset();
</script>

<div class={style}>
  {timeString
    ? timeString
    : timer.getTimeValues().toString(["minutes", "seconds"])}
</div>
