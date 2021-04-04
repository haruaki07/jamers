<script lang="ts">
  import { tw } from "twind";
  import Button from "~/libs/Button";
  import Modal, {
    modalOpen,
    modalContent,
    modalDialogClass,
  } from "~/libs/Modal";
  import { Table, Td, Th, Tr } from "~/libs/Table";
  // import Modaladd from "./modaladd.svelte";

  const openModal = () => {
    modalOpen.set(true);
    modalContent.set(import("./modaladd.svelte"));
    modalDialogClass.set("sm:max-w-md");
  };
</script>

<div class={tw`container mx-auto`}>
  <Table wrapperClass="rounded-xl">
    <thead>
      <Tr overide class="text-left bg-gray-100">
        <Th>Name</Th>
        <Th>Source</Th>
      </Tr>
    </thead>
    <tbody>
      <Tr class="text-left">
        <Td colspan="2">No results.</Td>
      </Tr>
    </tbody>
  </Table>

  <Button on:click={openModal}>Open Modal</Button>
</div>

<Modal />
