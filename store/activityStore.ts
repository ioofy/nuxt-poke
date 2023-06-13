export const useActivity = defineStore("activity", {
  state: () => ({
    isModalOpen: false,
  }),
  actions: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
});
