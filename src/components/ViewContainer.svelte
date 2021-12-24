<script>
  import { afterUpdate } from "svelte";
  import { selectedFolder } from "@stores/store.js";
  import Viewer from "@components/Viewer.svelte";
  afterUpdate(() => {
    if ($selectedFolder != null) {
      let scrollArea = document.querySelector("main"); 
      let location = document.querySelector(".viewer-container").offsetTop;
      scrollArea.scrollTo({ top: location, behavior: "smooth" });
    }
  });
</script>

<div class="viewer-container">
  {#if $selectedFolder != null}
    <p class="loading result">
      🖼️ 총 {$selectedFolder.length}장의 이미지를 찾았습니다!
    </p>
    {#each $selectedFolder as file}
      <Viewer {file} />
    {/each}
  {:else}
    <p class="loading">이미지 업로드를 기다리는 중입니다...🚀</p>

    <p class="tip">파일명에 문자열 '100_'이 포함된 이미지만 보여줍니다.</p>

    <p class="tip">
      알림과 달리 이미지를 외부 서버로 전송하지 않습니다. 사이트를 신뢰하셔도 됩니다.
      😇
    </p>

    <p class="tip">
      캔버스 🙊/🙈버튼을 클릭하면 캔버스 이미지(좌측, 실루엣)를 숨기거나 보이게
      할 수 있습니다.
    </p>

    <p class="tip">
      재편집이 필요한 이미지는 사이드바 재편집❔에서 체크를 하고, 확인 완료
      ✔️버튼을 클릭하면 내용을 클립보드에 복사해 줍니다.
    </p>

    <p class="tip">
      사이드바 재편집❔에는 사실 투명한 스크롤바가 있습니다. 내용이 많을 때는
      휠을 굴려 보세요.
    </p>

    <p class="tip">
      사이드바 재편집❔의 이미지 이름을 클릭하면 해당 이미지로 바로 이동합니다.
    </p>

    <p class="tip important">
      ❗❗ 최종 확인이 끝나면 확인 완료 ✔️버튼을 클릭해서 페이지를 초기화하세요.
      ❗❗
    </p>
  {/if}
</div>

<style type="scss">
  p {
    text-align: center;
    &.loading {
      padding: 48px 0;
      font-size: 24px;
      color: royalblue;
      &.result {
        color: green;
      }
    }
    &.tip {
      margin-bottom: 16px;
      font-size: 16px;
      font-weight: 400;
      color: gray;
      &.important {
        margin-top: 48px;
        font-size: 20px;
        color: tomato;
        font-weight: bold;
      }
    }
  }
  .viewer-container {
    padding-bottom: 64px;
  }
</style>
