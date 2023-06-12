const main = document.querySelector("main");
let page = 1;
const baseUrl = `https://www.episodate.com/api/`;
window.addEventListener("load", showMostPopular);
async function getShows(query) {
  const res = await fetch(`${baseUrl}${query}`);
  return await res.json();
}
async function showMostPopular() {
  const { tv_shows } = await getShows(`most-popular?page=${page}`);
  tv_shows.forEach((show) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src=${show.image_thumbnail_path} alt="" class="card-img">
      <div class="card-body">
          <h3 class="card-title">${show.name}</h3>
          <div class="card-text"><span class="indicators">Country:</span> ${show.country}</div>
          <div class="card-text"><span class="indicators">Start Date:</span> ${show.start_date}</div>
          <div class="card-text"><span class="indicators">Network:</span> ${show.network}</div>
          <div class="card-text"><span class="indicators">Running status:</span> ${show.status}</div>
      </div>

      `;

    main.appendChild(card);
  });
}
main.addEventListener("scroll", () => {
  if (main.scrollTop >= main.scrollHeight - 592) {
    page += 1;
    showMostPopular();
  }
});
