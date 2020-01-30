import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Table from "@editorjs/table";

const configurations = {
  holderId: "codex-editor",
  // placeholder: "Let`s write an awesome story!",
  autofocus: true,
  tools: {
    header: {
      class: Header,
      inlineToolbar: ["link"]
    },
    list: {
      class: List,
      inlineToolbar: true
    },
    table: {
      class: Table
    },
    image: {
      class: ImageTool,
      config: {
        uploader: {
          async uploadByFile(file) {
            // your own uploading logic here
            console.log("ccc");
            const blob = new Blob([file], { type: file.type });
            const url = URL.createObjectURL(blob);
            return {
              success: 1,
              file: {
                url: url,
                path: `YOUR_PATH/${file.name}`,
                filename: file.name,
                type: file.type
                // any other image data you want to store, such as width, height, color, extension, etc
              }
            };
          }
        }
      }
    }
  }
};

let editor = new EditorJS({ ...configurations });

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
  console.log(configurations);
  const loadFileJson = new FileReader();
  loadFileJson.readAsText(file);
  loadFileJson.addEventListener("load", () => {
    configurations.data = JSON.parse(loadFileJson.result);
    editor.destroy();
    editor = new EditorJS(configurations);
  });
}

async function promise() {
  return new Promise(() => {});
}
