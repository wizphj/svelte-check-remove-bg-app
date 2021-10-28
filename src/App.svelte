<script>
  import Header from "@components/Header.svelte";
  import ViewerContainer from "@components/ViewContainer.svelte";
  import Footer from "@components/Footer.svelte";
  import SideNav from "@components/SideNav.svelte";
</script>

<main>
  <Header />
  <ViewerContainer />
  <Footer />
</main>
<SideNav />

<style>
  main {
    width: calc(100% - 100px);
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>
