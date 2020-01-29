import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

let configuration = {
  holderId: "codex-editor",
  // placeholder: "Let`s write an awesome story!",
  autofocus:true,
  tools: {
    header: {
      class: Header,
      inlineToolbar: ["link"]
    },
    list: {
      class: List,
      inlineToolbar: true
    }
  },
  /**
   * Previously saved data that should be rendered
   */
  data: {}
};

let editor = new EditorJS(configuration);

export async function save() {
  // 入力内容を保存
  const outputData = await editor.save().catch(error => {
    console.warn(error);
  });
  // 入力内容をJson化
  const outputJson = JSON.stringify(outputData);
  // ダウンロード用のblobを作る
  const blob = new Blob([outputJson], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const downloadElement = document.createElement("a");
  downloadElement.download = "index.json";
  downloadElement.href = url;
  downloadElement.click();
  URL.revokeObjectURL(url);
}

export function load(file) {
  const loadFileJson = new FileReader();
  loadFileJson.readAsText(file);
  loadFileJson.addEventListener("load", () => {
    const json = JSON.parse(loadFileJson.result);
    const newConfig = {
      holderId: "codex-editor",
      // placeholder: "Let`s write an awesome story!",
      autofocus:true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: ["link"]
        },
        list: {
          class: List,
          inlineToolbar: true
        }
      },
      /**
       * Previously saved data that should be rendered
       */ data: json
    };
    console.log(json);
    console.log("new", newConfig);
    editor.destroy();
    editor = new EditorJS(newConfig);
  });
}
