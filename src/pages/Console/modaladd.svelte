<script lang="ts">
  import Button from "~/libs/Button";

  import { closeModal, modalEscape, trapFocus } from "~/libs/Modal";
</script>

<div use:modalEscape use:trapFocus>
  <Button on:click={closeModal}>Close</Button>
</div>
