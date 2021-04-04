<script lang="ts">
  import Button from "~/libs/Button";

  import { closeModal, modalEscape } from "~/libs/Modal";
</script>

<div use:modalEscape>
  <Button on:click={closeModal}>Close</Button>
</div>
