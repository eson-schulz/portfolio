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
            var cleanSearchText = searchText.toLowerCase();

            if (cleanClipTitle.includes(cleanSearchText)) {
                output.innerText += ("\n" + clip.title + "\n" + clip.content + "\n");
                clipToShowCount++;
            }
        });
    })
}