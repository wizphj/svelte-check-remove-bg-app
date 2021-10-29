<script>
  import { selectedFolder, canvasToggle } from "@stores/store.js";
  import Toast from "@components/Toast.svelte";

  //재편집 체크 리스트
  let selectedImages = [];
  //캔버스 버튼 이미지
  let canvasBtnImg = $canvasToggle ? "🙊" : "🙈";

  let toasts = [];
  let item = 0;

  function setToast(msg) {
    //추가
    toasts.push({
      id: item++,
      message: msg,
    });
    //반응성
    toasts = toasts;
    //파괴
    setTimeout(() => {
      toasts = toasts.slice(1);
    }, 2700);
  }

  function clipboardCopy() {
    if (selectedImages.length != 0) {
      navigator.clipboard
        .writeText(selectedImages.join(", "))
        .then(() => {
          setToast(
            "클립보드에 재편집 요청이 필요한 이미지 리스트를 복사했습니다.<br>원하는 곳에서 Ctrl+V를 누르세요."
          );
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
    }
  }
</script>

<div class="toast-container">
  {#each toasts as toast (toast.id)}
    <Toast message={toast.message} />
  {/each}
</div>

<nav>
  <div class="sidebar-title">재편집❔</div>

  {#if $selectedFolder != null}
    <ul on:mousewheel>
      {#each $selectedFolder as imgFile (imgFile.name)}
        <li>
          <label>
            <input
              type="checkbox"
              value={imgFile.name}
              bind:group={selectedImages}
            />{imgFile.name.split(".")[0]}
          </label>
        </li>
      {/each}
    </ul>
  {/if}

  <div class="container-btn">
    <button
      class="on-top"
      title="맨 위로 이동"
      on:click={() => {
        if (!document.querySelector("main").scrollTop)
          setToast("지금도 맨 위에 있어요.");
        else document.querySelector("main").scrollTo({ top: 0 });
      }}>🔝</button
    >
    <button
      class="canvas-toggle"
      title="캔버스 이미지"
      on:click={() => {
        $canvasToggle = !$canvasToggle;
        if ($canvasToggle) {
          canvasBtnImg = "🙊";
          setToast("캔버스 이미지가 보여요 : ON");
        } else {
          canvasBtnImg = "🙈";
          setToast("캔버스 이미지를 숨겨요 : OFF");
        }
      }}>{canvasBtnImg}</button
    >
    <button
      class="done"
      title="확인 완료"
      on:click={() => {
        if ($selectedFolder != null) {
          //클립보드 처리
          clipboardCopy();
          //초기화 구문
          selectedImages = [];
          $selectedFolder = null;
          document.querySelector("#inputFile").value = null;
          setToast("초기화를 완료했어요.");
        } else {
          setToast("지금도 새로운 폴더를 열 수 있어요.");
        }
      }}>✔️</button
    >
  </div>
</nav>

<style type="scss">
  div.toast-container {
    position: absolute;
    bottom: 16px;
    left: 16px;
  }
  nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 100px;
    height: 100%;
    border-left: 1px solid lightgrey;
    box-sizing: border-box;
  }
  div.sidebar-title {
    padding: 16px;
    text-align: center;
  }
  ul {
    width: 100%;
    height: calc(100% - 320px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  li {
    font-size: 14px;
    padding: 0 12px;
    color: gray;
  }
  input[type="checkbox"],
  label {
    display: flex;
    height: 24px;
    align-items: center;
    margin: 0;
    padding: 0;
    cursor: pointer;
    &:hover {
      color: royalblue;
    }
  }
  input[type="checkbox"] {
    margin-right: 3px;
  }
  div.container-btn {
    position: absolute;
    bottom: 0;
    padding: 16px;
    button {
      width: 100%;
      height: 64px;
      margin-top: 16px;
      border: 0;
      border-radius: 16px;
      font-size: 32px;
      line-height: 1.2;
      color: #fff;
      cursor: pointer;
      &.on-top {
        background-color: royalblue;
      }
      &.canvas-toggle {
        background-color: tomato;
      }
      &.done {
        background-color: green;
      }
      &:active {
        transition: transform 0.1s;
        transform: scale(0.9);
      }
      &:hover:not(:disabled) {
        border: 4px solid black;
      }
    }
  }
</style>
