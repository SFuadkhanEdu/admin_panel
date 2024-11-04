const overlay = document.querySelector("#overlay");
const loading = document.querySelector(".loader-container");
function loader() {
    overlay.classList.toggle("overlay-active");
    loading.classList.toggle("loading-active");
    setTimeout(() => {
      loading.classList.toggle("loading-active");
      overlay.classList.toggle("overlay-active");
    }, 2000);
}
export { loader };