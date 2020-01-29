import { load, save } from "./editor";

const saveButtonElement = document.querySelector("#save");

const loadButtonElement = document.querySelector("#load");

export function setup() {
  saveButtonElement.addEventListener("click", async () => {
    await save();
  });
  loadButtonElement.addEventListener("change", () => {
    load(loadButtonElement.files[0]);
  });
}
