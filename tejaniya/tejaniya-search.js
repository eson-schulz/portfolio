const MAX_RESULTS = 50;

async function loadDailyTejaniya() {
    // From https://dougmcgill.squarespace.com/tdt-2022
    const rawFetch = await fetch("./tejaniya/tejaniya-clips.json");
    return rawFetch.json();
}

const tejaniyaClips = loadDailyTejaniya();

function showResults() {
    var searchText = document.getElementById("search-text").value;
    var output = document.getElementById("output");
    output.innerText = "";

    tejaniyaClips.then((clips) => {
        var clipToShowCount = 0;
        clips.forEach(clip => {
            if (clipToShowCount > MAX_RESULTS) {
                return;
            }

            var cleanClipTitle = clip.title.toLowerCase();
            var cleanClipContent = clip.content.toLowerCase();
            var cleanSearchText = searchText.toLowerCase();

            if (cleanClipTitle.includes(cleanSearchText) || cleanClipContent.includes(cleanSearchText)) {
                const header = document.createElement("strong");
                header.textContent = clip.title + "\n";
                const body = document.createElement("p");
                body.textContent = clip.content;
                body.style = "margin-bottom: 30px;"

                output.appendChild(header);
                output.appendChild(body);
                clipToShowCount++;
            }
        });
    })
}