<script>
  import { selectedFolder } from "@stores/store.js";

  let filesList;

  function inputFilesList(files) {
    filesList = [...files];
    for (let file in filesList) {
      let fileName = filesList[file].name;
      if (fileName.indexOf("100_") > 0) {
        filesList.slice(file);
      }
    }
    $selectedFolder = filesList;
  }

  function reorderFilesList() {
    filesList.sort(function (a, b) {
      let _a = parseInt(a.name.replace("100_", "").replace(".jpg", ""));
      let _b = parseInt(b.name.replace("100_", "").replace(".jpg", ""));
      return _a - _b;
    });
    $selectedFolder = filesList;
  }
</script>

<header>
  <h1>👋 배경을 확인할 폴더를 알려 주세요!</h1>
  <label class="input-file-button" for="inputFile">📂 폴더 열기...</label>
  <input
    id="inputFile"
    type="file"
    style="display: none;"
    on:input={(e) => {
      inputFilesList(e.target.files);
      reorderFilesList();
    }}
    on:click={(e) => {
      $selectedFolder = null;
      e.target.value = null;
    }}
    webkitdirectory
  />
</header>

<style type="scss">
  header {
    box-sizing: border-box;
    padding: 48px 0;
    border-bottom: 1px solid lightgray;
    text-align: center;
    cursor: default;
    h1 {
      font-size: 36px;
    }
  }
  label.input-file-button {
    display: inline-block;
    width: 512px;
    height: 40px;
    line-height: 40px;
    margin: 32px 0 0;
    padding: 8px;
    border: 4px solid #1a1a1a;
    background-color: #ffc83d;
    border-radius: 16px;
    font-size: 24px;
    &:hover {
      background-color: rgb(255, 174, 0);
      cursor: pointer;
    }
    &:active {
      transition: transform 0.1s;
      transform: scale(0.96);
    }
  }
</style>
