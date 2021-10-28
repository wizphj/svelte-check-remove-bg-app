<script>
  export let message;
</script>

<div class="toast">
  {@html message}
</div>

<style type="scss">
  div.toast {
    background-color: #212121;
    color: #fff;
    padding: 24px 48px;
    margin-top: 16px;
    line-height: 1.2;
    font-size: 18px;
    font-weight: 400;
    border-radius: 16px;
    animation: fadeInLeft 700ms, fadeOutLeft 700ms 2000ms;
  }
  @keyframes fadeOutLeft {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
</style>
