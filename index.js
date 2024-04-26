let category = 1000

const handleCategory = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");

  const data = await response.json();
  const tabContainer = document.getElementById('tab-container');
  data?.data?.forEach((category) => {
    const div = document.createElement('div');
    div.innerHTML = `
        <a onclick="handleLoadVideo('${category?.category_id}')" class="tab bg-slate-300 m-2 rounded-sm">${category?.category}</a>
        `;
    tabContainer.appendChild(div);
  })

}

async function handleLoadVideo(categoryId) {
  category = categoryId
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const data = await response.json();

  console.log(data);

  if (data.data.length == 0) {
    const notFound = document.getElementById('not-found');
    notFound.classList.remove('hidden');

  }

  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = "";

  data?.data?.forEach((video) => {
    var hours = Math.floor(video?.others?.posted_date / (60 * 60));

    var divisor_for_minutes = video?.others?.posted_date % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    const div = document.createElement('div');
    div.innerHTML = `
        <div class="w-72 bg-base-100">
        <img class="w-72 h-48 rounded-md" src="${video?.thumbnail}" alt="Shoes" />

        <div class="m-4 relative" >
            <h2 class="card-title">${video?.title}</h2>
            <div class="flex gap-3">
            <img class="w-14 h-12 mt-2 rounded-full" src=${video?.authors?.[0]?.profile_picture} />
            <p class="mt-4">${video?.authors?.[0]?.profile_name}</P>
            ${video?.authors?.[0]?.verified ? '<img class="mt-5 w-4 h-4" src="./check-verified.gif">' : ''}
            </div >
             <p class="mt-2">${video?.others?.views} views </p>
             <p class="mt-2 h-6 bg-black text-white w-6/12 rounded-md text-center absolute -top-14 -right-1">${hours} hrs ${minutes} min ago</p>

        </div >
    </div >
    `;
    cardContainer.appendChild(div);
    const notFound = document.getElementById('not-found');
    notFound.classList.add('hidden');
  });
}







async function sortingLoadVideo(categoryId) {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const data = await response.json();

  const sort = data.data.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views));

  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = "";

  sort.forEach((video) => {

    var hours = Math.floor(video?.others?.posted_date / (60 * 60));

    var divisor_for_minutes = video?.others?.posted_date % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="w-72 bg-base-100">
          <img class="w-72 h-48 rounded-md" src="${video?.thumbnail}" alt="Video Thumbnail" />
          <div class="m-4 relative">
            <h2 class="card-title">${video?.title}</h2>
            <div class="flex gap-3">
              <img class="w-14 h-12 mt-2 rounded-full" src="${video?.authors?.[0]?.profile_picture}" />
              <p class="mt-4">${video?.authors?.[0]?.profile_name}</p>
              ${video?.authors?.[0]?.verified ? '<img class="mt-5 w-4 h-4" src="./check-verified.gif">' : ''}
            </div>
            <p class="mt-2">${video?.others?.views} views </p>
            <p class="mt-2 h-6 bg-black text-white w-6/12 rounded-md text-center absolute -top-14 -right-1">${hours} hrs ${minutes} min ago</p>
          </div>
        </div>
      `;
    cardContainer.appendChild(div);
  });
}

document.getElementById('sortByViewButton').addEventListener('click', () => {
  sortingLoadVideo(category);
});

handleCategory();
handleLoadVideo(1000);
