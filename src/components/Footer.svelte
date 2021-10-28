<script>
  import { selectedFolder } from "@stores/store.js";
</script>

{#if $selectedFolder != null}
  <footer>
    <p>마지막 이미지입니다! 👏</p>
    <br />
    <p>·</p>
    <p>·</p>
    <p>·</p>
    <p class="copyright">ⓒ WIZCOMPANY - Designer Heejin Park</p>
  </footer>
{/if}

<style type="scss">
  p {
    text-align: center;
    font-size: 24px;
    color: grey;
    &.copyright {
      font-size: 16px;
      padding: 32px;
      color: lightgrey;
      font-weight: 400;
    }
  }
</style>
