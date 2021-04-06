<script lang="ts">
  import { tw } from "twind";
  import Button from "~/libs/Button";
  import Input from "~/libs/Input";
  import Lazy from "~/libs/Lazy.svelte";
  import Modal, { openModal } from "~/libs/Modal";
  import { formField } from "~/libs/styles";
</script>

<div class={tw`container mx-auto mt-4`}>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <form on:submit|preventDefault>
    <label class={formField}>
      Title
      <Input block />
    </label>
    <label class={formField}>
      Description
      <Input textarea block />
    </label>
    <Button color="gray-800" type="submit" class="mt-1">Save</Button>
  </form>
  <Button on:click={openModal}>Modal</Button>
</div>

<Modal dialogClass="max-w-md my-12">
  <Lazy component={import("./modaladd.svelte")} />
</Modal>
